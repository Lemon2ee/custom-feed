import type { InputConnector } from "@/src/core/connectors/types";

const HN_API = "https://hacker-news.firebaseio.com/v0";
const MAX_NOTIFIED = 200;

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

interface Cursor {
  currentId: number;
  notifiedIds: number[];
}

function parseCursor(raw: string | undefined): Cursor | null {
  if (!raw) return null;

  // Legacy: plain numeric string from v1 connector
  const num = Number(raw);
  if (!isNaN(num) && String(num) === raw) {
    return { currentId: num, notifiedIds: [num] };
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.currentId === "number" && Array.isArray(parsed?.notifiedIds)) {
      return parsed as Cursor;
    }
  } catch {
    // fall through
  }

  return null;
}

export const hackerNewsInputConnector: InputConnector = {
  kind: "input",
  id: "hackernews",

  validateConfig() {
    return { valid: true };
  },

  async poll(context) {
    const topRes = await fetch(`${HN_API}/topstories.json`);
    if (!topRes.ok) throw new Error(`HN topstories returned ${topRes.status}`);
    const topIds = (await topRes.json()) as number[];

    if (!topIds.length) {
      return { items: [], nextCursor: context.cursor };
    }

    const topId = topIds[0];
    const cursor = parseCursor(context.cursor);
    const notifiedIds = cursor?.notifiedIds ?? [];

    // #1 hasn't changed — nothing to do
    if (cursor && cursor.currentId === topId) {
      return { items: [], nextCursor: context.cursor };
    }

    // Already notified about this story (flip-flop prevention)
    if (notifiedIds.includes(topId)) {
      const newCursor: Cursor = {
        currentId: topId,
        notifiedIds: [topId, ...notifiedIds.filter((id) => id !== topId)].slice(0, MAX_NOTIFIED),
      };
      return { items: [], nextCursor: JSON.stringify(newCursor) };
    }

    // Genuinely new #1 — fetch and return it
    const itemRes = await fetch(`${HN_API}/item/${topId}.json`);
    if (!itemRes.ok) throw new Error(`HN item ${topId} returned ${itemRes.status}`);
    const item = (await itemRes.json()) as HNItem;

    const hnUrl = `https://news.ycombinator.com/item?id=${item.id}`;
    const newCursor: Cursor = {
      currentId: topId,
      notifiedIds: [topId, ...notifiedIds].slice(0, MAX_NOTIFIED),
    };

    return {
      items: [
        {
          externalItemId: String(item.id),
          title: item.title ?? "Untitled",
          url: item.url ?? hnUrl,
          contentText: item.text,
          author: item.by,
          publishedAt: item.time ? new Date(item.time * 1000).toISOString() : undefined,
          tags: ["hackernews", item.type ?? "story"],
          rawPayload: item,
        },
      ],
      nextCursor: JSON.stringify(newCursor),
    };
  },
};
