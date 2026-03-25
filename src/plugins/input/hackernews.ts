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

interface HNCursor {
  currentId: number;
  notifiedIds: number[];
}

const MAX_NOTIFIED_IDS = 200;

function parseCursor(raw: string | undefined): HNCursor | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.currentId === "number"
    ) {
      return parsed as HNCursor;
    }
  } catch {
    // Legacy format: plain numeric ID string
  }
  const num = Number(raw);
  if (!Number.isNaN(num) && num > 0) {
    return { currentId: num, notifiedIds: [num] };
  }
  return null;
}

function serializeCursor(cursor: HNCursor): string {
  return JSON.stringify(cursor);
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
    const prev = parseCursor(context.cursor);

    if (prev && topId === prev.currentId) {
      return { items: [], nextCursor: context.cursor };
    }

    const notifiedIds = prev?.notifiedIds ?? [];
    const newCursor: HNCursor = {
      currentId: topId,
      notifiedIds: [topId, ...notifiedIds].slice(0, MAX_NOTIFIED_IDS),
    };
    const nextCursorStr = serializeCursor(newCursor);

    if (notifiedIds.includes(topId)) {
      return { items: [], nextCursor: nextCursorStr };
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
      nextCursor: nextCursorStr,
    };
  },
};
