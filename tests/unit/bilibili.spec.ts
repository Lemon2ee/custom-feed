import { afterEach, describe, expect, it, vi } from "vitest";
import type { InputPollContext } from "@/src/core/connectors/types";

function makeContext(cursor?: string): InputPollContext {
  return { workspaceId: "w1", sourceId: "s1", cursor };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function makeSpaceSearchBody(videos: Array<{
  aid?: number;
  bvid?: string;
  title?: string;
  description?: string;
  pic?: string;
  author?: string;
  mid?: number;
  face?: string;
  created?: number;
}>) {
  return {
    code: 0,
    message: "0",
    data: {
      list: {
        vlist: videos.map((v) => ({
          aid: v.aid ?? 100000,
          bvid: v.bvid ?? "BV1test",
          title: v.title ?? "Test Video",
          description: v.description ?? "",
          pic: v.pic ?? "//i0.hdslb.com/test.jpg",
          author: v.author ?? "TestUser",
          mid: v.mid ?? 12345,
          face: v.face,
          created: v.created ?? 1711000000,
          length: "10:00",
          comment: 42,
          play: 1000,
        })),
      },
    },
  };
}

function makeAppArchiveBody(items: Array<{
  title?: string;
  param?: string;
  bvid?: string;
  cover?: string;
  author?: string;
  ctime?: number;
}>) {
  return {
    code: 0,
    message: "0",
    data: {
      item: items.map((i) => ({
        title: i.title ?? "App Video",
        param: i.param ?? i.bvid ?? "BV1app",
        bvid: i.bvid ?? i.param ?? "BV1app",
        cover: i.cover ?? "//i0.hdslb.com/app.jpg",
        author: i.author ?? "AppUser",
        ctime: i.ctime ?? 1711000000,
      })),
      has_next: false,
    },
  };
}

interface MockRoutes {
  spi?: unknown;
  spaceSearch?: unknown | "fail";
  appArchive?: unknown | "fail";
  dynamicFeed?: unknown | "fail";
  card?: { face: string } | "fail";
  videoView?: { desc: string } | "fail";
}

function setupFetchRouter(routes: MockRoutes) {
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
    const url = typeof input === "string" ? input : (input as Request).url;

    if (url.includes("/x/frontend/finger/spi")) {
      const body = routes.spi ?? { code: 0, data: { b_3: "buvid3-mock", b_4: "buvid4-mock" } };
      return jsonResponse(body);
    }

    if (url.includes("/x/space/arc/search")) {
      if (routes.spaceSearch === "fail") return new Response("", { status: 412 });
      return jsonResponse(routes.spaceSearch ?? makeSpaceSearchBody([]));
    }

    if (url.includes("/x/v2/space/archive/cursor")) {
      if (routes.appArchive === "fail") return new Response("", { status: 412 });
      return jsonResponse(routes.appArchive ?? makeAppArchiveBody([]));
    }

    if (url.includes("/x/polymer/web-dynamic/v1/feed/space")) {
      if (routes.dynamicFeed === "fail") return new Response("", { status: 412 });
      return jsonResponse(routes.dynamicFeed ?? { code: 0, data: { items: [] } });
    }

    if (url.includes("/x/web-interface/card")) {
      if (routes.card === "fail") return new Response("", { status: 500 });
      const face = (routes.card as { face: string })?.face ?? "https://i0.hdslb.com/bfs/face/default.jpg";
      return jsonResponse({ code: 0, data: { card: { face } } });
    }

    if (url.includes("/x/web-interface/view")) {
      if (routes.videoView === "fail") return new Response("", { status: 500 });
      const desc = (routes.videoView as { desc: string })?.desc ?? "Default description";
      return jsonResponse({ code: 0, data: { desc } });
    }

    return new Response("Not Found", { status: 404 });
  });
}

describe("bilibiliInputConnector", () => {
  let bilibiliInputConnector: typeof import("@/src/plugins/input/bilibili").bilibiliInputConnector;

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  async function loadConnector() {
    const mod = await import("@/src/plugins/input/bilibili");
    bilibiliInputConnector = mod.bilibiliInputConnector;
  }

  describe("validateConfig", () => {
    it("accepts numeric mid", async () => {
      await loadConnector();
      expect(bilibiliInputConnector.validateConfig({ mid: "12345", limit: 30 }).valid).toBe(true);
    });

    it("accepts spaceUrl", async () => {
      await loadConnector();
      expect(bilibiliInputConnector.validateConfig({
        spaceUrl: "https://space.bilibili.com/12345",
        limit: 30,
      }).valid).toBe(true);
    });

    it("rejects config with neither spaceUrl nor mid", async () => {
      await loadConnector();
      expect(bilibiliInputConnector.validateConfig({ limit: 30 }).valid).toBe(false);
    });
  });

  describe("poll — space search strategy (primary)", () => {
    it("returns video items with correct fields", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([
          {
            bvid: "BV1abc",
            title: "My Video",
            description: "A cool video",
            pic: "//i0.hdslb.com/cover.jpg",
            author: "TestUser",
            mid: 12345,
            face: "//i0.hdslb.com/face.jpg",
            created: 1711000000,
          },
        ]),
        card: { face: "https://i0.hdslb.com/bfs/face/test.jpg" },
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), {
        spaceUrl: "12345",
        limit: 30,
      });

      expect(result.items).toHaveLength(1);
      const item = result.items[0];
      expect(item.externalItemId).toBe("BV1abc");
      expect(item.title).toBe("My Video");
      expect(item.url).toBe("https://www.bilibili.com/video/BV1abc");
      expect(item.author).toBe("TestUser");
      expect(item.publishedAt).toBe(new Date(1711000000 * 1000).toISOString());
      expect(item.tags).toEqual(["video"]);
    });

    it("normalizes protocol-relative cover URLs to https", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([
          { bvid: "BV1abc", pic: "//i0.hdslb.com/cover.jpg", face: "//i0.hdslb.com/face.jpg" },
        ]),
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items[0].imageUrl).toBe("https://i0.hdslb.com/cover.jpg");
    });

    it("resolves UID from space URL", async () => {
      const fetchSpy = setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([{ bvid: "BV1abc" }]),
      });
      await loadConnector();

      await bilibiliInputConnector.poll(makeContext(), {
        spaceUrl: "https://space.bilibili.com/67890/video",
        limit: 30,
      });

      const searchCall = fetchSpy.mock.calls.find(
        (c) => (c[0] as string).includes("/x/space/arc/search"),
      );
      expect(searchCall).toBeDefined();
      expect(searchCall![0] as string).toContain("mid=67890");
    });
  });

  describe("poll — strategy fallback", () => {
    it("falls back to app-archive when space-search fails", async () => {
      setupFetchRouter({
        spaceSearch: "fail",
        appArchive: makeAppArchiveBody([
          { bvid: "BV1fallback", title: "App Archive Video" },
        ]),
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("BV1fallback");
      expect(result.items[0].title).toBe("App Archive Video");
    });

    it("falls back to dynamic-feed when both space-search and app-archive fail", async () => {
      setupFetchRouter({
        spaceSearch: "fail",
        appArchive: "fail",
        dynamicFeed: {
          code: 0,
          data: {
            items: [
              {
                id_str: "dyn1",
                type: "DYNAMIC_TYPE_AV",
                modules: {
                  module_author: { name: "DynUser", pub_ts: 1711000000 },
                  module_dynamic: {
                    major: {
                      type: "MAJOR_TYPE_ARCHIVE",
                      archive: {
                        bvid: "BV1dyn",
                        title: "Dynamic Video",
                        cover: "//i0.hdslb.com/dyn.jpg",
                        desc: "Dynamic desc",
                        duration_text: "5:00",
                        stat: { play: "100", danmaku: "10" },
                      },
                    },
                  },
                },
              },
            ],
            has_more: false,
          },
        },
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("BV1dyn");
      expect(result.items[0].title).toBe("Dynamic Video");
    });

    it("throws when all strategies fail", async () => {
      setupFetchRouter({
        spaceSearch: "fail",
        appArchive: "fail",
        dynamicFeed: "fail",
      });
      await loadConnector();

      await expect(
        bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 }),
      ).rejects.toThrow("all bilibili strategies failed");
    });
  });

  describe("poll — space-search error codes", () => {
    it("falls back when space search returns API error code", async () => {
      setupFetchRouter({
        spaceSearch: { code: -352, message: "anti-spider", data: null },
        appArchive: makeAppArchiveBody([
          { bvid: "BV1fb", title: "Fallback Video" },
        ]),
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("BV1fb");
    });
  });

  describe("poll — author image backfill", () => {
    it("backfills author image from card API when missing from strategy", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([
          { bvid: "BV1abc", face: undefined },
        ]),
        card: { face: "https://i0.hdslb.com/bfs/face/avatar.jpg" },
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items[0].authorImageUrl).toBe("https://i0.hdslb.com/bfs/face/avatar.jpg");
    });
  });

  describe("poll — description backfill", () => {
    it("backfills empty descriptions from video view API", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([
          { bvid: "BV1empty", description: "" },
        ]),
        videoView: { desc: "Backfilled description" },
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items[0].contentText).toBe("Backfilled description");
    });

    it("keeps existing description when present", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([
          { bvid: "BV1has", description: "Already has description" },
        ]),
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });

      expect(result.items[0].contentText).toBe("Already has description");
    });
  });

  describe("poll — UID resolution edge cases", () => {
    it("throws for non-numeric, non-URL input", async () => {
      await loadConnector();
      await expect(
        bilibiliInputConnector.poll(makeContext(), { spaceUrl: "not-a-uid", limit: 30 }),
      ).rejects.toThrow("Cannot resolve Bilibili UID");
    });

    it("extracts UID from URL with trailing path", async () => {
      const fetchSpy = setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([{ bvid: "BV1test" }]),
      });
      await loadConnector();

      await bilibiliInputConnector.poll(makeContext(), {
        spaceUrl: "https://space.bilibili.com/99999/dynamic",
        limit: 30,
      });

      const searchCall = fetchSpy.mock.calls.find(
        (c) => (c[0] as string).includes("/x/space/arc/search"),
      );
      expect(searchCall).toBeDefined();
      expect(searchCall![0] as string).toContain("mid=99999");
    });
  });

  describe("poll — empty results", () => {
    it("returns empty items when no videos exist", async () => {
      setupFetchRouter({
        spaceSearch: makeSpaceSearchBody([]),
      });
      await loadConnector();

      const result = await bilibiliInputConnector.poll(makeContext(), { mid: "12345", limit: 30 });
      expect(result.items).toHaveLength(0);
    });
  });
});
