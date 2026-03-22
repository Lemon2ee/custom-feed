import { randomUUID } from "node:crypto";
import { z } from "zod";
import type {
  InputConnector,
  ExternalItem,
} from "@/src/core/connectors/types";

const configSchema = z
  .object({
    spaceUrl: z.string().min(1).optional(),
    mid: z.string().min(1).optional(),
    limit: z.number().int().positive().max(50).default(30),
  })
  .refine((v) => Boolean(v.spaceUrl || v.mid), {
    message: "Provide spaceUrl or mid",
    path: ["spaceUrl"],
  });

type BilibiliConfig = z.infer<typeof configSchema>;

const FEED_URL = "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space";
const SPI_URL = "https://api.bilibili.com/x/frontend/finger/spi";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// ── Cookie cache ───────────────────────────────────────────────────

let cachedCookie: string | undefined;
let cookieExpiresAt = 0;
const COOKIE_TTL_MS = 30 * 60 * 1000;

async function getCookie(): Promise<string> {
  if (cachedCookie && Date.now() < cookieExpiresAt) return cachedCookie;

  try {
    const res = await fetch(SPI_URL, { headers: { "User-Agent": UA } });
    if (res.ok) {
      const json = (await res.json()) as { data?: { b_3?: string; b_4?: string } };
      const b3 = json.data?.b_3;
      const b4 = json.data?.b_4;
      if (b3) {
        cachedCookie = `buvid3=${b3}; buvid4=${b4 ?? ""}; b_nut=100`;
        cookieExpiresAt = Date.now() + COOKIE_TTL_MS;
        return cachedCookie;
      }
    }
  } catch {
    // fall through to generated cookie
  }

  cachedCookie = `buvid3=${randomUUID()}infoc; b_nut=100`;
  cookieExpiresAt = Date.now() + COOKIE_TTL_MS;
  return cachedCookie;
}

// ── UID resolution ─────────────────────────────────────────────────

function resolveUid(config: BilibiliConfig): string {
  const raw = (config.spaceUrl ?? config.mid ?? "").trim();

  if (/^\d+$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    const segments = url.pathname.split("/").filter(Boolean);
    const numeric = segments.find((s) => /^\d+$/.test(s));
    if (numeric) return numeric;
  } catch {
    // not a URL – fall through
  }

  throw new Error(
    `Cannot resolve Bilibili UID from "${raw}". Provide a numeric mid or a space URL like https://space.bilibili.com/12345`,
  );
}

// ── Dynamic feed response types ────────────────────────────────────

interface ArchiveItem {
  title: string;
  bvid: string;
  cover: string;
  desc: string;
  duration_text: string;
  stat: { play: string; danmaku: string };
}

interface DynamicItem {
  id_str: string;
  type: string;
  modules: {
    module_author?: {
      name?: string;
      mid?: number;
      face?: string;
      pub_ts?: number;
    };
    module_dynamic?: {
      major?: {
        type?: string;
        archive?: ArchiveItem;
      };
    };
  };
}

interface DynamicFeedResponse {
  code: number;
  message: string;
  data?: {
    items?: DynamicItem[];
    has_more?: boolean;
    offset?: string;
  };
}

// ── Connector ──────────────────────────────────────────────────────

export const bilibiliInputConnector: InputConnector<BilibiliConfig> = {
  kind: "input",
  id: "bilibili",

  validateConfig(config) {
    const parsed = configSchema.safeParse(config);
    return parsed.success
      ? { valid: true }
      : {
          valid: false,
          errors: parsed.error.issues.map((i) => i.message),
        };
  },

  async poll(context, config) {
    const parsed = configSchema.parse(config);
    const mid = resolveUid(parsed);
    const cookie = await getCookie();
    const limit = parsed.limit;
    const MAX_PAGES = 5;

    const items: ExternalItem[] = [];
    let offset: string | undefined = context.cursor;

    for (let page = 0; page < MAX_PAGES; page++) {
      const params = new URLSearchParams({
        host_mid: mid,
        timezone_offset: "-480",
      });
      if (offset) {
        params.set("offset", offset);
      }

      const res = await fetch(`${FEED_URL}?${params}`, {
        headers: {
          "User-Agent": UA,
          Referer: `https://space.bilibili.com/${mid}/dynamic`,
          Cookie: cookie,
        },
      });

      if (!res.ok) {
        throw new Error(`bilibili dynamic feed API returned ${res.status}`);
      }

      const json = (await res.json()) as DynamicFeedResponse;
      if (json.code !== 0) {
        throw new Error(`bilibili API error ${json.code}: ${json.message}`);
      }

      const dynamicItems = json.data?.items ?? [];

      for (const item of dynamicItems) {
        if (item.type !== "DYNAMIC_TYPE_AV") continue;
        const archive = item.modules.module_dynamic?.major?.archive;
        if (!archive) continue;

        const author = item.modules.module_author;
        const publishedAt = author?.pub_ts
          ? new Date(author.pub_ts * 1000).toISOString()
          : undefined;
        const cover = archive.cover
          ? archive.cover.startsWith("//") ? `https:${archive.cover}` : archive.cover
          : undefined;
        const face = author?.face
          ? author.face.startsWith("//") ? `https:${author.face}` : author.face
          : undefined;

        items.push({
          externalItemId: archive.bvid,
          title: archive.title,
          url: `https://www.bilibili.com/video/${archive.bvid}`,
          contentText: archive.desc,
          author: author?.name,
          publishedAt,
          imageUrl: cover,
          authorImageUrl: face,
          tags: ["video"],
          rawPayload: item,
        });

        if (items.length >= limit) break;
      }

      offset = json.data?.offset;

      if (items.length >= limit || !json.data?.has_more || !offset) break;
    }

    return {
      items,
      nextCursor: offset,
    };
  },
};
