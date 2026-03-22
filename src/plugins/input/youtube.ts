import Parser from "rss-parser";
import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const configSchema = z.object({
  channelId: z.string().min(6),
  limit: z.number().int().positive().max(50).default(20),
});

type YouTubeConfig = z.infer<typeof configSchema>;

const parser = new Parser();

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
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${parsed.channelId}`;
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
