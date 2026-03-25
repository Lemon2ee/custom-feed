import { afterEach, describe, expect, it, vi } from "vitest";
import { steamNewsInputConnector } from "@/src/plugins/input/steam-news";
import type { InputPollContext } from "@/src/core/connectors/types";

function makeContext(cursor?: string): InputPollContext {
  return { workspaceId: "w1", sourceId: "s1", cursor };
}

function steamApiResponse(appid: number, newsitems: Array<{
  gid: string;
  title: string;
  url: string;
  author?: string;
  contents?: string;
  date: number;
  feedlabel?: string;
  feedname?: string;
  tags?: string[];
}>) {
  return new Response(JSON.stringify({
    appnews: {
      appid,
      newsitems: newsitems.map((n) => ({
        author: "",
        contents: "",
        ...n,
      })),
    },
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

describe("steamNewsInputConnector", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("validateConfig", () => {
    it("accepts numeric app ID", () => {
      expect(steamNewsInputConnector.validateConfig({ newsUrl: "2868840", limit: 10 }).valid).toBe(true);
    });

    it("accepts full store URL", () => {
      expect(steamNewsInputConnector.validateConfig({
        newsUrl: "https://store.steampowered.com/app/730/Counter-Strike_2/",
        limit: 10,
      }).valid).toBe(true);
    });

    it("accepts news URL", () => {
      expect(steamNewsInputConnector.validateConfig({
        newsUrl: "https://store.steampowered.com/news/app/2868840",
        limit: 10,
      }).valid).toBe(true);
    });

    it("rejects empty string", () => {
      expect(steamNewsInputConnector.validateConfig({ newsUrl: "", limit: 10 }).valid).toBe(false);
    });

    it("rejects non-numeric non-URL", () => {
      expect(steamNewsInputConnector.validateConfig({ newsUrl: "not-a-valid-id", limit: 10 }).valid).toBe(false);
    });
  });

  describe("poll — basic functionality", () => {
    it("returns news items with correct fields", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          {
            gid: "5001",
            title: "CS2 Update",
            url: "https://store.steampowered.com/news/5001",
            author: "Valve",
            contents: "Bug fixes and improvements",
            date: 1711000000,
            feedlabel: "Community Announcements",
            tags: ["patchnotes"],
          },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), {
        newsUrl: "730",
        limit: 10,
      });

      expect(result.items).toHaveLength(1);
      const item = result.items[0];
      expect(item.externalItemId).toBe("5001");
      expect(item.title).toBe("CS2 Update");
      expect(item.url).toBe("https://store.steampowered.com/news/5001");
      expect(item.author).toBe("Valve");
      expect(item.contentText).toBe("Bug fixes and improvements");
      expect(item.publishedAt).toBe(new Date(1711000000 * 1000).toISOString());
      expect(item.tags).toContain("patchnotes");
      expect(item.tags).toContain("Community Announcements");
    });

    it("resolves app ID from store URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, []),
      );

      await steamNewsInputConnector.poll(makeContext(), {
        newsUrl: "https://store.steampowered.com/app/730/Counter-Strike_2/",
        limit: 10,
      });

      const calledUrl = fetchSpy.mock.calls[0][0] as string;
      expect(calledUrl).toContain("appid=730");
    });

    it("resolves app ID from news URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(2868840, []),
      );

      await steamNewsInputConnector.poll(makeContext(), {
        newsUrl: "https://store.steampowered.com/news/app/2868840",
        limit: 5,
      });

      const calledUrl = fetchSpy.mock.calls[0][0] as string;
      expect(calledUrl).toContain("appid=2868840");
    });
  });

  describe("poll — cursor filtering", () => {
    it("filters out items older than cursor timestamp", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          { gid: "old", title: "Old News", url: "https://a.com/old", date: 1710000000 },
          { gid: "new", title: "New News", url: "https://a.com/new", date: 1712000000 },
        ]),
      );

      const result = await steamNewsInputConnector.poll(
        makeContext("1711000000"),
        { newsUrl: "730", limit: 10 },
      );

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("new");
    });

    it("returns all items when no cursor is set", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          { gid: "1", title: "A", url: "https://a.com/1", date: 1710000000 },
          { gid: "2", title: "B", url: "https://a.com/2", date: 1711000000 },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), {
        newsUrl: "730",
        limit: 10,
      });
      expect(result.items).toHaveLength(2);
    });

    it("advances cursor to newest item date", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          { gid: "1", title: "A", url: "https://a.com/1", date: 1710000000 },
          { gid: "2", title: "B", url: "https://a.com/2", date: 1712000000 },
          { gid: "3", title: "C", url: "https://a.com/3", date: 1711000000 },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), {
        newsUrl: "730",
        limit: 10,
      });

      expect(result.nextCursor).toBe("1712000000");
    });

    it("keeps cursor when no new items exist", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          { gid: "old", title: "Old", url: "https://a.com/old", date: 1710000000 },
        ]),
      );

      const result = await steamNewsInputConnector.poll(
        makeContext("1711000000"),
        { newsUrl: "730", limit: 10 },
      );

      expect(result.items).toHaveLength(0);
      expect(result.nextCursor).toBe("1711000000");
    });
  });

  describe("poll — image extraction", () => {
    it("extracts image from BBCode [img] tag in contents", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          {
            gid: "1",
            title: "Update",
            url: "https://a.com/1",
            date: 1712000000,
            contents: "Check this: [img]https://cdn.steam.com/screenshot.jpg[/img]",
          },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items[0].imageUrl).toBe("https://cdn.steam.com/screenshot.jpg");
    });

    it("extracts image from HTML img tag in contents", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          {
            gid: "1",
            title: "Update",
            url: "https://a.com/1",
            date: 1712000000,
            contents: '<img src="https://cdn.steam.com/banner.png" />',
          },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items[0].imageUrl).toBe("https://cdn.steam.com/banner.png");
    });

    it("falls back to game header image when no image in contents", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          {
            gid: "1",
            title: "Update",
            url: "https://a.com/1",
            date: 1712000000,
            contents: "Just text, no images.",
          },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items[0].imageUrl).toBe(
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
      );
    });
  });

  describe("poll — edge cases", () => {
    it("handles empty author as undefined", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          { gid: "1", title: "A", url: "https://a.com/1", date: 1712000000, author: "" },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items[0].author).toBeUndefined();
    });

    it("returns empty items when API returns no newsitems", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ appnews: { appid: 730 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items).toHaveLength(0);
    });

    it("handles missing appnews entirely", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items).toHaveLength(0);
    });

    it("merges tags and feedlabel", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        steamApiResponse(730, [
          {
            gid: "1",
            title: "A",
            url: "https://a.com/1",
            date: 1712000000,
            tags: ["patchnotes", "mod_reviewed"],
            feedlabel: "Community Announcements",
          },
        ]),
      );

      const result = await steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 });
      expect(result.items[0].tags).toEqual(["patchnotes", "mod_reviewed", "Community Announcements"]);
    });
  });

  describe("poll — API errors", () => {
    it("throws on non-200 response", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response("Server Error", { status: 500 }),
      );

      await expect(
        steamNewsInputConnector.poll(makeContext(), { newsUrl: "730", limit: 10 }),
      ).rejects.toThrow("Steam news API returned 500");
    });
  });
});
