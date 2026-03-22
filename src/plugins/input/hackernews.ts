import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const HN_API = "https://hacker-news.firebaseio.com/v0";

const configSchema = z.object({});

type HackerNewsConfig = z.infer<typeof configSchema>;

interface HNItem {
  id: number;
  by?: string;
  score?: number;
  title?: string;
  url?: string;
  text?: string;
  time?: number;
  type?: string;
  descendants?: number;
}

export const hackerNewsInputConnector: InputConnector<HackerNewsConfig> = {
  kind: "input",
  id: "hackernews",

  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },

  async poll(context) {
    const topRes = await fetch(`${HN_API}/topstories.json`);
    if (!topRes.ok) throw new Error(`HN topstories returned ${topRes.status}`);
    const topIds = (await topRes.json()) as number[];

    if (!topIds.length) return { items: [], nextCursor: context.cursor };

    const topId = topIds[0];

    if (context.cursor && String(topId) === context.cursor) {
      return { items: [], nextCursor: context.cursor };
    }

    const itemRes = await fetch(`${HN_API}/item/${topId}.json`);
    if (!itemRes.ok) throw new Error(`HN item ${topId} returned ${itemRes.status}`);
    const item = (await itemRes.json()) as HNItem;

    const hnUrl = `https://news.ycombinator.com/item?id=${item.id}`;

    return {
      items: [
        {
          externalItemId: String(item.id),
          title: item.title ?? "Untitled",
          url: item.url ?? hnUrl,
          contentText: item.text,
          author: item.by,
          publishedAt: item.time
            ? new Date(item.time * 1000).toISOString()
            : undefined,
          tags: ["hackernews", item.type ?? "story"],
          rawPayload: item,
        },
      ],
      nextCursor: String(topId),
    };
  },
};
