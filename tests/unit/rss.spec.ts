import { afterEach, describe, expect, it, vi } from "vitest";
import { rssInputConnector } from "@/src/plugins/input/rss";
import type { InputPollContext } from "@/src/core/connectors/types";

vi.mock("rss-parser", () => {
  const MockParser = vi.fn();
  MockParser.prototype.parseURL = vi.fn();
  return { default: MockParser };
});

import Parser from "rss-parser";

function makeContext(cursor?: string): InputPollContext {
  return { workspaceId: "w1", sourceId: "s1", cursor };
}

const mockParseURL = Parser.prototype.parseURL as ReturnType<typeof vi.fn>;

function makeFeedItems(items: Array<{
  guid?: string;
  id?: string;
  link?: string;
  title?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  creator?: string;
  author?: string;
  categories?: string[];
}>) {
  return { items };
}

describe("rssInputConnector", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("validateConfig", () => {
    it("accepts valid config", () => {
      expect(rssInputConnector.validateConfig({ feedUrl: "https://example.com/feed.xml", limit: 20 }).valid).toBe(true);
    });

    it("rejects non-URL feedUrl", () => {
      expect(rssInputConnector.validateConfig({ feedUrl: "not-a-url", limit: 20 }).valid).toBe(false);
    });

    it("rejects zero limit", () => {
      expect(rssInputConnector.validateConfig({ feedUrl: "https://example.com/feed.xml", limit: 0 }).valid).toBe(false);
    });

    it("rejects limit over 100", () => {
      expect(rssInputConnector.validateConfig({ feedUrl: "https://example.com/feed.xml", limit: 101 }).valid).toBe(false);
    });
  });

  describe("poll — first poll (no cursor)", () => {
    it("returns all feed items up to limit", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "1", title: "Post 1", link: "https://a.com/1", pubDate: "2026-03-01T00:00:00Z" },
        { guid: "2", title: "Post 2", link: "https://a.com/2", pubDate: "2026-03-02T00:00:00Z" },
      ]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed.xml",
        limit: 20,
      });

      expect(result.items).toHaveLength(2);
      expect(result.items[0].externalItemId).toBe("1");
      expect(result.items[0].title).toBe("Post 1");
      expect(result.items[0].url).toBe("https://a.com/1");
      expect(result.nextCursor).toBeDefined();
    });

    it("populates all item fields correctly", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        {
          guid: "abc-123",
          title: "Full Post",
          link: "https://blog.com/full",
          pubDate: "2026-03-15T12:00:00Z",
          contentSnippet: "A summary of the post",
          creator: "Alice",
          categories: ["tech", "news"],
        },
      ]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://blog.com/feed",
        limit: 10,
      });

      const item = result.items[0];
      expect(item.externalItemId).toBe("abc-123");
      expect(item.title).toBe("Full Post");
      expect(item.url).toBe("https://blog.com/full");
      expect(item.contentText).toBe("A summary of the post");
      expect(item.author).toBe("Alice");
      expect(item.publishedAt).toBe("2026-03-15T12:00:00.000Z");
      expect(item.tags).toEqual(["tech", "news"]);
      expect(item.rawPayload).toBeDefined();
    });

    it("falls back to content when contentSnippet is missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "1", title: "Post", content: "<p>Full HTML content</p>" },
      ]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      expect(result.items[0].contentText).toBe("<p>Full HTML content</p>");
    });

    it("uses author field when creator is missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "1", title: "Post", author: "Bob" },
      ]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      expect(result.items[0].author).toBe("Bob");
    });

    it("falls back to 'Untitled item' when title is missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "1" },
      ]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      expect(result.items[0].title).toBe("Untitled item");
    });
  });

  describe("poll — externalItemId fallback chain", () => {
    it("prefers guid", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "g1", id: "i1", link: "https://a.com", title: "T1" },
      ]));
      const result = await rssInputConnector.poll(makeContext(), { feedUrl: "https://a.com/feed", limit: 10 });
      expect(result.items[0].externalItemId).toBe("g1");
    });

    it("falls back to id when guid is missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { id: "i1", link: "https://a.com", title: "T1" },
      ]));
      const result = await rssInputConnector.poll(makeContext(), { feedUrl: "https://a.com/feed", limit: 10 });
      expect(result.items[0].externalItemId).toBe("i1");
    });

    it("falls back to link when guid and id are missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { link: "https://a.com/post", title: "T1" },
      ]));
      const result = await rssInputConnector.poll(makeContext(), { feedUrl: "https://a.com/feed", limit: 10 });
      expect(result.items[0].externalItemId).toBe("https://a.com/post");
    });

    it("falls back to title when guid, id, and link are missing", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { title: "Only Title" },
      ]));
      const result = await rssInputConnector.poll(makeContext(), { feedUrl: "https://a.com/feed", limit: 10 });
      expect(result.items[0].externalItemId).toBe("Only Title");
    });
  });

  describe("poll — cursor filtering", () => {
    it("filters out items published before the cursor date", async () => {
      const cursor = "2026-03-10T00:00:00.000Z";
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "old", title: "Old Post", pubDate: "2026-03-05T00:00:00Z" },
        { guid: "new", title: "New Post", pubDate: "2026-03-15T00:00:00Z" },
      ]));

      const result = await rssInputConnector.poll(makeContext(cursor), {
        feedUrl: "https://example.com/feed",
        limit: 20,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("new");
    });

    it("includes items without pubDate regardless of cursor", async () => {
      const cursor = "2026-03-10T00:00:00.000Z";
      mockParseURL.mockResolvedValueOnce(makeFeedItems([
        { guid: "no-date", title: "No Date Post" },
        { guid: "old", title: "Old Post", pubDate: "2026-03-01T00:00:00Z" },
      ]));

      const result = await rssInputConnector.poll(makeContext(cursor), {
        feedUrl: "https://example.com/feed",
        limit: 20,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("no-date");
    });

    it("sets nextCursor to a current ISO timestamp", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([]));
      const before = Date.now();
      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      const after = Date.now();

      const cursorTime = new Date(result.nextCursor!).getTime();
      expect(cursorTime).toBeGreaterThanOrEqual(before);
      expect(cursorTime).toBeLessThanOrEqual(after);
    });
  });

  describe("poll — limit enforcement", () => {
    it("respects the limit config", async () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        guid: String(i),
        title: `Post ${i}`,
        pubDate: `2026-03-${String(i + 1).padStart(2, "0")}T00:00:00Z`,
      }));
      mockParseURL.mockResolvedValueOnce(makeFeedItems(manyItems));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 3,
      });

      expect(result.items.length).toBeLessThanOrEqual(3);
    });
  });

  describe("poll — empty feed", () => {
    it("returns empty items for empty feed", async () => {
      mockParseURL.mockResolvedValueOnce(makeFeedItems([]));

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      expect(result.items).toHaveLength(0);
    });

    it("handles feed with undefined items array", async () => {
      mockParseURL.mockResolvedValueOnce({ items: undefined });

      const result = await rssInputConnector.poll(makeContext(), {
        feedUrl: "https://example.com/feed",
        limit: 10,
      });
      expect(result.items).toHaveLength(0);
    });
  });

  describe("poll — parser errors", () => {
    it("throws when parser fails", async () => {
      mockParseURL.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        rssInputConnector.poll(makeContext(), {
          feedUrl: "https://example.com/feed",
          limit: 10,
        }),
      ).rejects.toThrow("Network error");
    });
  });
});
