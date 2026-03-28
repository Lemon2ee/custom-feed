import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const STEAM_NEWS_API =
  "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/";

function gameHeaderUrl(appId: string): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;
}

function extractFirstImage(contents: string): string | undefined {
  const bbcodeMatch = contents.match(/\[img\](https?:\/\/[^\s\]]+)\[\/img\]/i);
  if (bbcodeMatch) return bbcodeMatch[1];

  const htmlMatch = contents.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch) return htmlMatch[1];

  return undefined;
}

function resolveAppId(input: string): string {
  const trimmed = input.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const segments = url.pathname.split("/").filter(Boolean);
    const appIdx = segments.indexOf("app");
    if (appIdx !== -1 && segments[appIdx + 1]) {
      const candidate = segments[appIdx + 1];
      if (/^\d+$/.test(candidate)) return candidate;
    }
    const numeric = segments.find((s) => /^\d+$/.test(s));
    if (numeric) return numeric;
  } catch {
    // not a URL
  }

  throw new Error(
    `Cannot resolve Steam App ID from "${trimmed}". Provide a numeric ID or a URL like https://store.steampowered.com/app/2868840`,
  );
}

const configSchema = z.object({
  newsUrl: z.string().min(1),
  limit: z.number().int().positive().max(50).default(10),
});

type SteamNewsConfig = z.infer<typeof configSchema>;

interface SteamNewsItem {
  gid: string;
  title: string;
  url: string;
  author: string;
  contents: string;
  date: number;
  feedlabel?: string;
  feedname?: string;
  tags?: string[];
}

interface SteamNewsResponse {
  appnews?: {
    appid: number;
    newsitems?: SteamNewsItem[];
  };
}

export const steamNewsInputConnector: InputConnector<SteamNewsConfig> = {
  kind: "input",
  id: "steam-news",

  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    if (!parsed.success) {
      return { valid: false, errors: parsed.error.issues.map((i) => i.message) };
    }
    try {
      resolveAppId(parsed.data.newsUrl);
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: [err instanceof Error ? err.message : String(err)] };
    }
  },

  async poll(context, config) {
    const parsed = configSchema.parse(config);
    const appId = resolveAppId(parsed.newsUrl);

    const params = new URLSearchParams({
      appid: appId,
      count: String(parsed.limit),
      maxlength: "0",
      format: "json",
    });

    const res = await fetch(`${STEAM_NEWS_API}?${params}`);
    if (!res.ok) throw new Error(`Steam news API returned ${res.status}`);

    const json = (await res.json()) as SteamNewsResponse;
    const newsItems = json.appnews?.newsitems ?? [];

    const cursorTs = context.cursor ? Number(context.cursor) : 0;
    const headerImg = gameHeaderUrl(appId);

    const items = newsItems
      .filter((n) => n.date > cursorTs)
      .map((n) => ({
        externalItemId: n.gid,
        title: n.title,
        url: n.url,
        contentText: n.contents,
        author: n.author || undefined,
        publishedAt: new Date(n.date * 1000).toISOString(),
        imageUrl: extractFirstImage(n.contents) ?? headerImg,
        tags: [...(n.tags ?? []), ...(n.feedlabel ? [n.feedlabel] : [])],
        rawPayload: n,
      }));

    const newestDate = newsItems.length > 0
      ? Math.max(...newsItems.map((n) => n.date))
      : cursorTs;

    return {
      items,
      nextCursor: String(Math.max(newestDate, cursorTs)),
      details: {
        appId,
        totalFetched: newsItems.length,
        returnedAfterCursor: items.length,
      },
    };
  },
};
