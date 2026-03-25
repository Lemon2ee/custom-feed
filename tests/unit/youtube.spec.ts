import { afterEach, describe, expect, it, vi } from "vitest";
import { youtubeInputConnector } from "@/src/plugins/input/youtube";
import type { InputPollContext } from "@/src/core/connectors/types";

vi.mock("rss-parser", () => {
  const MockParser = vi.fn();
  MockParser.prototype.parseURL = vi.fn();
  return { default: MockParser };
});

import Parser from "rss-parser";

const mockParseURL = Parser.prototype.parseURL as ReturnType<typeof vi.fn>;

function makeContext(cursor?: string): InputPollContext {
  return { workspaceId: "w1", sourceId: "s1", cursor };
}

function channelHtml(channelId: string, avatarUrl = "https://yt.com/avatar.jpg") {
  return [
    `<meta itemprop="channelId" content="${channelId}">`,
    `<meta property="og:image" content="${avatarUrl}">`,
  ].join("\n");
}

function ytFeedItems(items: Array<{
  id?: string;
  guid?: string;
  link?: string;
  title?: string;
  pubDate?: string;
  contentSnippet?: string;
  creator?: string;
}>) {
  return { items };
}

describe("youtubeInputConnector", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("validateConfig", () => {
    it("accepts config with channel", () => {
      expect(youtubeInputConnector.validateConfig({ channel: "UC_x5XG1OV2P6uZZ5FSM9Ttw", limit: 20 }).valid).toBe(true);
    });

    it("accepts config with channelId", () => {
      expect(youtubeInputConnector.validateConfig({ channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw", limit: 20 }).valid).toBe(true);
    });

    it("accepts URL-style channel", () => {
      expect(youtubeInputConnector.validateConfig({ channel: "https://www.youtube.com/@mkbhd", limit: 5 }).valid).toBe(true);
    });

    it("rejects config with neither channel nor channelId", () => {
      expect(youtubeInputConnector.validateConfig({ limit: 20 }).valid).toBe(false);
    });

    it("rejects empty channel string", () => {
      expect(youtubeInputConnector.validateConfig({ channel: "", limit: 20 }).valid).toBe(false);
    });
  });

  describe("poll — channel ID resolution", () => {
    it("uses raw channel ID directly when it matches UC pattern", async () => {
      const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));

      mockParseURL.mockResolvedValueOnce(ytFeedItems([]));

      await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 5 });

      expect(mockParseURL).toHaveBeenCalledWith(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      );
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("extracts channel ID from /channel/ URL", async () => {
      const channelId = "UCddiUEpeqJcYeBxX1IVBKvQ";
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));

      mockParseURL.mockResolvedValueOnce(ytFeedItems([]));

      await youtubeInputConnector.poll(makeContext(), {
        channel: `https://www.youtube.com/channel/${channelId}`,
        limit: 5,
      });

      expect(mockParseURL).toHaveBeenCalledWith(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      );
    });

    it("resolves @ handle by fetching the page HTML", async () => {
      const channelId = "UCBJycsmduvYEL83R_U4JriQ";
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }))
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));

      mockParseURL.mockResolvedValueOnce(ytFeedItems([]));

      await youtubeInputConnector.poll(makeContext(), { channel: "@mkbhd", limit: 5 });

      expect(mockParseURL).toHaveBeenCalledWith(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      );
    });

    it("throws when channel page returns non-200", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response("Not Found", { status: 404 }));

      await expect(
        youtubeInputConnector.poll(makeContext(), { channel: "@nonexistent", limit: 5 }),
      ).rejects.toThrow("unable to resolve YouTube channel URL: 404");
    });

    it("throws when HTML has no channel ID", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response("<html><body>No meta</body></html>", { status: 200 }));

      await expect(
        youtubeInputConnector.poll(makeContext(), { channel: "@mystery", limit: 5 }),
      ).rejects.toThrow("unable to resolve channelId from provided YouTube input");
    });
  });

  describe("poll — feed items", () => {
    const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";

    function setupResolvedChannel() {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId, "https://yt.com/avatar.jpg"), { status: 200 }));
    }

    it("returns video items with correct fields", async () => {
      setupResolvedChannel();
      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        {
          id: "yt:video:dQw4w9WgXcQ",
          guid: "yt:video:dQw4w9WgXcQ",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Never Gonna Give You Up",
          pubDate: "2026-03-20T10:00:00Z",
          contentSnippet: "A classic video",
          creator: "Rick Astley",
        },
      ]));

      const result = await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 10 });

      expect(result.items).toHaveLength(1);
      const item = result.items[0];
      expect(item.title).toBe("Never Gonna Give You Up");
      expect(item.url).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      expect(item.contentText).toBe("A classic video");
      expect(item.author).toBe("Rick Astley");
      expect(item.publishedAt).toBe("2026-03-20T10:00:00.000Z");
      expect(item.imageUrl).toBe("https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
      expect(item.authorImageUrl).toBe("https://yt.com/avatar.jpg");
      expect(item.tags).toContain("video");
    });

    it("tags videos with 'vlog' when title contains the word", async () => {
      setupResolvedChannel();
      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        { id: "yt:video:abc", title: "My Daily Vlog #42", pubDate: "2026-03-20T00:00:00Z" },
      ]));

      const result = await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 10 });
      expect(result.items[0].tags).toContain("vlog");
    });

    it("generates thumbnail URL from yt:video: ID", async () => {
      setupResolvedChannel();
      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        { id: "yt:video:xyz123", title: "A Video", pubDate: "2026-03-20T00:00:00Z" },
      ]));

      const result = await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 10 });
      expect(result.items[0].imageUrl).toBe("https://i.ytimg.com/vi/xyz123/hqdefault.jpg");
    });

    it("falls back to 'Untitled video' when title is missing", async () => {
      setupResolvedChannel();
      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        { id: "yt:video:notitle", pubDate: "2026-03-20T00:00:00Z" },
      ]));

      const result = await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 10 });
      expect(result.items[0].title).toBe("Untitled video");
    });
  });

  describe("poll — cursor filtering", () => {
    const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";

    it("filters out items published before the cursor date", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));

      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        { id: "yt:video:old", title: "Old", pubDate: "2026-03-01T00:00:00Z" },
        { id: "yt:video:new", title: "New", pubDate: "2026-03-20T00:00:00Z" },
      ]));

      const cursor = "2026-03-10T00:00:00.000Z";
      const result = await youtubeInputConnector.poll(makeContext(cursor), { channel: channelId, limit: 10 });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("New");
    });

    it("includes items without pubDate when cursor is set", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));

      mockParseURL.mockResolvedValueOnce(ytFeedItems([
        { id: "yt:video:nodate", title: "No Date" },
      ]));

      const cursor = "2026-03-10T00:00:00.000Z";
      const result = await youtubeInputConnector.poll(makeContext(cursor), { channel: channelId, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe("poll — empty feed", () => {
    it("returns empty items for empty feed", async () => {
      const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response(channelHtml(channelId), { status: 200 }));
      mockParseURL.mockResolvedValueOnce(ytFeedItems([]));

      const result = await youtubeInputConnector.poll(makeContext(), { channel: channelId, limit: 10 });
      expect(result.items).toHaveLength(0);
    });
  });
});
