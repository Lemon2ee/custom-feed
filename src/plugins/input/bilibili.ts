import { randomUUID, createHash } from "node:crypto";
import { z } from "zod";
import type {
  InputConnector,
  InputPollContext,
  ExternalItem,
} from "@/src/core/connectors/types";
import { logger } from "@/src/core/observability/logger";

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

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// ── Shared helpers ──────────────────────────────────────────────────

function resolveUid(config: BilibiliConfig): string {
  const raw = (config.spaceUrl ?? config.mid ?? "").trim();
  if (/^\d+$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    const segments = url.pathname.split("/").filter(Boolean);
    const numeric = segments.find((s) => /^\d+$/.test(s));
    if (numeric) return numeric;
  } catch {
    // not a URL
  }
  throw new Error(
    `Cannot resolve Bilibili UID from "${raw}". Provide a numeric mid or a space URL like https://space.bilibili.com/12345`,
  );
}

function prefixUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  return raw.startsWith("//") ? `https:${raw}` : raw;
}

function generateBuvid(): string {
  const id = randomUUID();
  return `buvid3=${id}infoc; buvid4=${id}infoc; b_nut=100`;
}

let cachedCookie: string | undefined;
let cookieExpiresAt = 0;
const COOKIE_TTL_MS = 25 * 60 * 1000;

async function getOrCreateCookie(): Promise<string> {
  if (cachedCookie && Date.now() < cookieExpiresAt) return cachedCookie;

  try {
    const res = await fetch("https://api.bilibili.com/x/frontend/finger/spi", {
      headers: {
        "User-Agent": UA,
        Origin: "https://www.bilibili.com",
        Referer: "https://www.bilibili.com/",
      },
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: { b_3?: string; b_4?: string } };
      if (json.data?.b_3) {
        cachedCookie = `buvid3=${json.data.b_3}; buvid4=${json.data.b_4 ?? ""}; b_nut=100`;
        cookieExpiresAt = Date.now() + COOKIE_TTL_MS;
        return cachedCookie;
      }
    }
  } catch {
    // fall through
  }

  cachedCookie = generateBuvid();
  cookieExpiresAt = Date.now() + COOKIE_TTL_MS;
  return cachedCookie;
}

// ── User face cache ─────────────────────────────────────────────
// Space Arc Search and App Archive don't reliably return the author
// avatar. We fetch it once via a lightweight card API and cache it.

let cachedFaceUrl: string | undefined;
let cachedFaceMid: string | undefined;

async function fetchUserFace(mid: string): Promise<string | undefined> {
  if (cachedFaceMid === mid && cachedFaceUrl !== undefined) return cachedFaceUrl;

  try {
    const cookie = await getOrCreateCookie();
    const res = await fetch(
      `https://api.bilibili.com/x/web-interface/card?mid=${encodeURIComponent(mid)}`,
      {
        headers: {
          "User-Agent": UA,
          Referer: "https://www.bilibili.com/",
          Cookie: cookie,
        },
      },
    );
    if (res.ok) {
      const json = (await res.json()) as {
        code?: number;
        data?: { card?: { face?: string } };
      };
      if (json.code === 0 && json.data?.card?.face) {
        cachedFaceUrl = prefixUrl(json.data.card.face);
        cachedFaceMid = mid;
        return cachedFaceUrl;
      }
    }
  } catch {
    // non-critical — notification just won't have an avatar icon
  }

  return undefined;
}

function backfillAuthorImage(
  items: ExternalItem[],
  faceUrl: string | undefined,
): void {
  if (!faceUrl) return;
  for (const item of items) {
    if (!item.authorImageUrl) item.authorImageUrl = faceUrl;
  }
}

// ═══════════════════════════════════════════════════════════════════
// Strategy 1 — Space Arc Search (lightest, single request)
// Uses order_avoided=true to bypass WBI requirement.
// ═══════════════════════════════════════════════════════════════════

const SPACE_SEARCH_URL = "https://api.bilibili.com/x/space/arc/search";

interface SpaceSearchVideo {
  aid: number;
  bvid: string;
  title: string;
  description: string;
  pic: string;
  author: string;
  mid: number;
  face?: string;
  created: number;
  length: string;
  comment: number;
  play: number;
}

interface SpaceSearchResponse {
  code: number;
  message: string;
  data?: {
    list?: { vlist?: SpaceSearchVideo[] };
    page?: { count: number; pn: number; ps: number };
  };
}

async function pollViaSpaceSearch(
  mid: string,
  limit: number,
): Promise<{ items: ExternalItem[]; nextCursor?: string }> {
  const cookie = await getOrCreateCookie();

  const params = new URLSearchParams({
    mid,
    ps: String(Math.min(limit, 50)),
    tid: "0",
    pn: "1",
    order: "pubdate",
    order_avoided: "true",
    platform: "web",
    web_location: "1550101",
  });

  const res = await fetch(`${SPACE_SEARCH_URL}?${params}`, {
    headers: {
      "User-Agent": UA,
      Origin: "https://www.bilibili.com",
      Referer: `https://space.bilibili.com/${mid}/video`,
      Cookie: cookie,
    },
  });

  if (!res.ok) throw new Error(`space search returned ${res.status}`);

  const json = (await res.json()) as SpaceSearchResponse;
  if (json.code !== 0) {
    throw new Error(`space search error ${json.code}: ${json.message}`);
  }

  const items: ExternalItem[] = [];
  for (const v of json.data?.list?.vlist ?? []) {
    items.push({
      externalItemId: v.bvid || String(v.aid),
      title: v.title,
      url: v.bvid
        ? `https://www.bilibili.com/video/${v.bvid}`
        : `https://www.bilibili.com/video/av${v.aid}`,
      contentText: v.description,
      author: v.author,
      publishedAt: v.created
        ? new Date(v.created * 1000).toISOString()
        : undefined,
      imageUrl: prefixUrl(v.pic),
      authorImageUrl: prefixUrl(v.face),
      tags: ["video"],
      rawPayload: v,
    });
    if (items.length >= limit) break;
  }

  return { items };
}

// ═══════════════════════════════════════════════════════════════════
// Strategy 2 — App Archive Cursor API
// App-level endpoint. No WBI, no cookie, but needs app params.
// Tries both app.biliapi.com and app.bilibili.com hosts.
// ═══════════════════════════════════════════════════════════════════

const APP_HOSTS = [
  "https://app.biliapi.com",
  "https://app.bilibili.com",
];

const APP_KEY = "4409e2ce8ffd12b8";
const APP_SEC = "59b43e04ad6965f34319062b478f83dd";

function signAppParams(params: URLSearchParams): void {
  params.set("appkey", APP_KEY);
  params.set("build", "7700300");
  params.set("mobi_app", "android");
  params.set("platform", "android");
  params.set("ts", String(Math.floor(Date.now() / 1000)));
  const sorted = new URLSearchParams([...params.entries()].sort());
  const sign = createHash("md5")
    .update(sorted.toString() + APP_SEC)
    .digest("hex");
  params.set("sign", sign);
}

interface AppArchiveItem {
  title?: string;
  param?: string;
  cover?: string;
  uri?: string;
  goto?: string;
  play?: number;
  danmaku?: number;
  author?: string;
  mid?: number;
  face?: string;
  ctime?: number;
  duration?: number;
  bvid?: string;
  desc?: string;
  [key: string]: unknown;
}

interface AppArchiveResponse {
  code: number;
  message: string;
  data?: {
    item?: AppArchiveItem[];
    has_next?: boolean;
    next_aid?: number;
  };
}

async function pollViaAppArchive(
  mid: string,
  limit: number,
): Promise<{ items: ExternalItem[]; nextCursor?: string }> {
  const MAX_PAGES = 5;
  const items: ExternalItem[] = [];
  let nextAid: number | undefined;
  let lastError: Error | undefined;

  for (const host of APP_HOSTS) {
    items.length = 0;
    nextAid = undefined;
    lastError = undefined;

    try {
      for (let page = 0; page < MAX_PAGES; page++) {
        const params = new URLSearchParams({ vmid: mid });
        if (nextAid) params.set("aid", String(nextAid));
        signAppParams(params);

        const res = await fetch(`${host}/x/v2/space/archive/cursor?${params}`, {
          headers: { "User-Agent": "Mozilla/5.0 BiliDroid/7.70.0 (bbcallen@gmail.com) os/android" },
        });

        if (!res.ok) throw new Error(`app archive returned ${res.status} (${host})`);

        const json = (await res.json()) as AppArchiveResponse;
        if (json.code !== 0) {
          throw new Error(`app archive error ${json.code}: ${json.message} (${host})`);
        }

        for (const entry of json.data?.item ?? []) {
          if (!entry.title) continue;

          const bvid = entry.bvid || entry.param;
          items.push({
            externalItemId: bvid ?? String(entry.param ?? randomUUID()),
            title: entry.title,
            url: bvid ? `https://www.bilibili.com/video/${bvid}` : undefined,
            contentText: typeof entry.desc === "string" ? entry.desc : undefined,
            author: typeof entry.author === "string" ? entry.author : undefined,
            publishedAt: entry.ctime
              ? new Date(entry.ctime * 1000).toISOString()
              : undefined,
            imageUrl: prefixUrl(entry.cover),
            authorImageUrl: prefixUrl(
              typeof entry.face === "string" ? entry.face : undefined,
            ),
            tags: ["video"],
            rawPayload: entry,
          });
          if (items.length >= limit) break;
        }

        nextAid = json.data?.next_aid;
        if (items.length >= limit || !json.data?.has_next || !nextAid) break;
      }

      return { items };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      logger.warn("app archive host failed, trying next", { host, error: lastError.message });
    }
  }

  throw lastError ?? new Error("app archive failed on all hosts");
}

// ═══════════════════════════════════════════════════════════════════
// Strategy 3 — Web Dynamic Feed API (heaviest, most fragile)
// Requires a buvid cookie. Prone to 412 blocks.
// ═══════════════════════════════════════════════════════════════════

const FEED_URL = "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space";

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

async function pollViaDynamicFeed(
  mid: string,
  limit: number,
  cursor?: string,
): Promise<{ items: ExternalItem[]; nextCursor?: string }> {
  const cookie = await getOrCreateCookie();
  const items: ExternalItem[] = [];
  let offset: string | undefined = cursor;
  const MAX_PAGES = 5;

  for (let page = 0; page < MAX_PAGES; page++) {
    const params = new URLSearchParams({
      host_mid: mid,
      timezone_offset: "-480",
    });
    if (offset) params.set("offset", offset);

    const res = await fetch(`${FEED_URL}?${params}`, {
      headers: {
        "User-Agent": UA,
        Origin: "https://www.bilibili.com",
        Referer: `https://space.bilibili.com/${mid}/dynamic`,
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      if (res.status === 412) {
        cachedCookie = undefined;
        cookieExpiresAt = 0;
      }
      throw new Error(`dynamic feed returned ${res.status}`);
    }

    const json = (await res.json()) as DynamicFeedResponse;
    if (json.code !== 0) {
      throw new Error(`dynamic feed error ${json.code}: ${json.message}`);
    }

    for (const dyn of json.data?.items ?? []) {
      if (dyn.type !== "DYNAMIC_TYPE_AV") continue;
      const archive = dyn.modules.module_dynamic?.major?.archive;
      if (!archive) continue;

      const author = dyn.modules.module_author;
      items.push({
        externalItemId: archive.bvid,
        title: archive.title,
        url: `https://www.bilibili.com/video/${archive.bvid}`,
        contentText: archive.desc,
        author: author?.name,
        publishedAt: author?.pub_ts
          ? new Date(author.pub_ts * 1000).toISOString()
          : undefined,
        imageUrl: prefixUrl(archive.cover),
        authorImageUrl: prefixUrl(author?.face),
        tags: ["video"],
        rawPayload: dyn,
      });
      if (items.length >= limit) break;
    }

    offset = json.data?.offset;
    if (items.length >= limit || !json.data?.has_more || !offset) break;
  }

  return { items, nextCursor: offset };
}

// ═══════════════════════════════════════════════════════════════════
// Connector — tries strategies in order, falls back on failure
// ═══════════════════════════════════════════════════════════════════

type PollStrategy = (
  mid: string,
  limit: number,
  cursor?: string,
) => Promise<{ items: ExternalItem[]; nextCursor?: string }>;

const strategies: { name: string; fn: PollStrategy }[] = [
  { name: "space-search", fn: (mid, limit) => pollViaSpaceSearch(mid, limit) },
  { name: "app-archive", fn: (mid, limit) => pollViaAppArchive(mid, limit) },
  { name: "dynamic-feed", fn: pollViaDynamicFeed },
];

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

  async poll(context: InputPollContext, config: unknown) {
    const parsed = configSchema.parse(config);
    const mid = resolveUid(parsed);
    const limit = parsed.limit;
    const errors: string[] = [];

    for (const strategy of strategies) {
      try {
        const result = await strategy.fn(mid, limit, context.cursor);
        if (errors.length > 0) {
          logger.info("bilibili poll succeeded with fallback", {
            strategy: strategy.name,
            previousErrors: errors,
          });
        }

        const needsFace = result.items.some((i) => !i.authorImageUrl);
        if (needsFace) {
          const face = await fetchUserFace(mid);
          backfillAuthorImage(result.items, face);
        }

        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${strategy.name}: ${msg}`);
        logger.warn("bilibili poll strategy failed, trying next", {
          strategy: strategy.name,
          error: msg,
        });
      }
    }

    throw new Error(`all bilibili strategies failed: ${errors.join(" → ")}`);
  },
};
