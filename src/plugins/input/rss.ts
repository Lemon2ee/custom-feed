import Parser from "rss-parser";
import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const configSchema = z.object({
  feedUrl: z.string().url(),
  limit: z.number().int().positive().max(100).default(20),
});

type RssConfig = z.infer<typeof configSchema>;

const parser = new Parser();

export const rssInputConnector: InputConnector<RssConfig> = {
  kind: "input",
  id: "rss",
  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },
  async poll(context, config) {
    const parsed = configSchema.parse(config);
    const feed = await parser.parseURL(parsed.feedUrl);
    const cutoff = context.cursor ? new Date(context.cursor).getTime() : 0;

    const items = (feed.items ?? [])
      .slice(0, parsed.limit)
      .map((item) => ({
        externalItemId: item.guid ?? item.id ?? item.link ?? item.title ?? crypto.randomUUID(),
        title: item.title ?? "Untitled item",
        url: item.link,
        contentText: item.contentSnippet ?? item.content,
        author: item.creator ?? item.author,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : undefined,
        tags: item.categories ?? [],
        rawPayload: item,
      }))
      .filter((item) =>
        item.publishedAt ? new Date(item.publishedAt).getTime() > cutoff : true,
      );

    return {
      items,
      nextCursor: new Date().toISOString(),
      details: {
        feedTitle: feed.title,
        feedUrl: parsed.feedUrl,
        totalInFeed: (feed.items ?? []).length,
        returnedAfterCursor: items.length,
      },
    };
  },
};
