import { z } from "zod";
import type { InputConnector } from "@/src/core/connectors/types";

const HN_API = "https://hacker-news.firebaseio.com/v0";

const configSchema = z.object({
  minScore: z.coerce.number().min(0).optional().default(100),
  topN: z.coerce.number().min(1).max(200).optional().default(30),
});

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

const CURSOR_PREFIX = "v2:";

export const hackerNewsInputConnector: InputConnector<HackerNewsConfig> = {
  kind: "input",
  id: "hackernews",

  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : { valid: false, errors: parsed.error.issues.map((issue) => issue.message) };
  },

  async poll(context, config) {
    const { minScore, topN } = configSchema.parse(config ?? {});

    // Old cursor was a bare numeric story ID from the v1 "#1 only" connector.
    // Skip one cycle to seed the new cursor format and avoid a notification burst.
    if (context.cursor && !context.cursor.startsWith(CURSOR_PREFIX)) {
      return { items: [], nextCursor: `${CURSOR_PREFIX}${Date.now()}` };
    }

    const topRes = await fetch(`${HN_API}/topstories.json`);
    if (!topRes.ok) throw new Error(`HN topstories returned ${topRes.status}`);
    const topIds = (await topRes.json()) as number[];

    if (!topIds.length) return { items: [], nextCursor: context.cursor };

    const candidateIds = topIds.slice(0, topN);

    const details = await Promise.all(
      candidateIds.map(async (id) => {
        const res = await fetch(`${HN_API}/item/${id}.json`);
        if (!res.ok) return null;
        return (await res.json()) as HNItem;
      }),
    );

    const qualifying = details.filter(
      (item): item is HNItem => item !== null && (item.score ?? 0) >= minScore,
    );

    const items = qualifying.map((item) => {
      const hnUrl = `https://news.ycombinator.com/item?id=${item.id}`;
      return {
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
      };
    });

    return {
      items,
      nextCursor: `${CURSOR_PREFIX}${Date.now()}`,
    };
  },
};
