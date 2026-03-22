import Parser from "rss-parser";
import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const channelIdPattern = /^UC[a-zA-Z0-9_-]{22}$/;

const configSchema = z
  .object({
    channel: z.string().min(1).optional(),
    channelId: z.string().min(6).optional(),
    limit: z.number().int().positive().max(50).default(20),
  })
  .refine((value) => Boolean(value.channel || value.channelId), {
    message: "Provide channel or channelId",
    path: ["channel"],
  });

type YouTubeConfig = z.infer<typeof configSchema>;

const parser = new Parser();

function tryExtractChannelIdFromUrl(raw: string): string | undefined {
  try {
    const url = new URL(raw);
    const fromQuery = url.searchParams.get("channel_id");
    if (fromQuery && channelIdPattern.test(fromQuery)) return fromQuery;

    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0] === "channel" && segments[1] && channelIdPattern.test(segments[1])) {
      return segments[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function tryExtractChannelIdFromHtml(html: string): string | undefined {
  const channelIdFromMeta = html.match(
    /<meta\s+itemprop=["']channelId["']\s+content=["'](UC[a-zA-Z0-9_-]{22})["']/i,
  )?.[1];
  if (channelIdFromMeta) return channelIdFromMeta;

  const channelIdFromJson = html.match(
    /"channelId":"(UC[a-zA-Z0-9_-]{22})"/,
  )?.[1];
  if (channelIdFromJson) return channelIdFromJson;

  const channelIdFromCanonical = html.match(
    /https:\/\/www\.youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/,
  )?.[1];
  if (channelIdFromCanonical) return channelIdFromCanonical;

  return undefined;
}

async function resolveChannelId(config: YouTubeConfig): Promise<string> {
  const raw = (config.channel ?? config.channelId ?? "").trim();

  if (channelIdPattern.test(raw)) {
    return raw;
  }

  const fromUrl = tryExtractChannelIdFromUrl(raw);
  if (fromUrl) {
    return fromUrl;
  }

  const urlCandidate = (() => {
    try {
      return new URL(raw).toString();
    } catch {
      if (raw.startsWith("@")) return `https://www.youtube.com/${raw}`;
      return `https://www.youtube.com/@${raw}`;
    }
  })();

  const response = await fetch(urlCandidate, {
    redirect: "follow",
    headers: {
      // User-Agent helps avoid lightweight bot blocks on some endpoints.
      "User-Agent": "custom-feed-bot/1.0 (+https://github.com)",
    },
  });
  if (!response.ok) {
    throw new Error(`unable to resolve YouTube channel URL: ${response.status}`);
  }

  const html = await response.text();
  const resolved = tryExtractChannelIdFromHtml(html);
  if (!resolved) {
    throw new Error("unable to resolve channelId from provided YouTube input");
  }
  return resolved;
}

export const youtubeInputConnector: InputConnector<YouTubeConfig> = {
  kind: "input",
  id: "youtube",
  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },
  async poll(context, config) {
    const parsed = configSchema.parse(config);
    const channelId = await resolveChannelId(parsed);
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const feed = await parser.parseURL(feedUrl);
    const cutoff = context.cursor ? new Date(context.cursor).getTime() : 0;

    const items = (feed.items ?? [])
      .slice(0, parsed.limit)
      .map((item) => {
        const publishedAt = item.pubDate
          ? new Date(item.pubDate).toISOString()
          : undefined;
        const title = item.title ?? "Untitled video";
        const tags = title.toLowerCase().includes("vlog") ? ["vlog"] : ["video"];
        return {
          externalItemId: item.guid ?? item.id ?? item.link ?? title,
          title,
          url: item.link,
          contentText: item.contentSnippet ?? item.content,
          author: item.creator ?? item.author,
          publishedAt,
          tags,
          rawPayload: item,
        };
      })
      .filter((item) =>
        item.publishedAt ? new Date(item.publishedAt).getTime() > cutoff : true,
      );

    return {
      items,
      nextCursor: new Date().toISOString(),
    };
  },
};
