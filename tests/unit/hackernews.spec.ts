import { afterEach, describe, expect, it, vi } from "vitest";
import { hackerNewsInputConnector } from "@/src/plugins/input/hackernews";
import type { InputPollContext } from "@/src/core/connectors/types";

function makeContext(cursor?: string): InputPollContext {
  return { workspaceId: "w1", sourceId: "s1", cursor };
}

function mockTopStories(ids: number[]) {
  return new Response(JSON.stringify(ids), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function mockItem(overrides: Partial<{
  id: number;
  title: string;
  url: string;
  by: string;
  text: string;
  time: number;
  type: string;
  score: number;
  descendants: number;
}> = {}) {
  const item = {
    id: overrides.id ?? 1001,
    title: overrides.title ?? "Show HN: My Project",
    url: overrides.url ?? "https://example.com",
    by: overrides.by ?? "pg",
    text: overrides.text ?? undefined,
    time: overrides.time ?? 1700000000,
    type: overrides.type ?? "story",
    score: overrides.score ?? 100,
    descendants: overrides.descendants ?? 50,
  };
  return new Response(JSON.stringify(item), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function makeCursor(currentId: number, notifiedIds: number[]): string {
  return JSON.stringify({ currentId, notifiedIds });
}

describe("hackerNewsInputConnector", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("validateConfig", () => {
    it("accepts empty config", () => {
      expect(hackerNewsInputConnector.validateConfig({}).valid).toBe(true);
    });
  });

  describe("poll — first poll (no cursor)", () => {
    it("returns the #1 story and sets initial cursor", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001, 1002, 1003]))
        .mockResolvedValueOnce(mockItem({ id: 1001, title: "First #1" }));

      const result = await hackerNewsInputConnector.poll(makeContext(), {});

      expect(fetchSpy).toHaveBeenCalledTimes(2);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("1001");
      expect(result.items[0].title).toBe("First #1");

      const cursor = JSON.parse(result.nextCursor!);
      expect(cursor.currentId).toBe(1001);
      expect(cursor.notifiedIds).toContain(1001);
    });

    it("populates all item fields correctly", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([42]))
        .mockResolvedValueOnce(mockItem({
          id: 42,
          title: "Ask HN: Something",
          url: "https://example.com/ask",
          by: "dang",
          time: 1700000000,
          type: "story",
        }));

      const result = await hackerNewsInputConnector.poll(makeContext(), {});
      const item = result.items[0];

      expect(item.externalItemId).toBe("42");
      expect(item.title).toBe("Ask HN: Something");
      expect(item.url).toBe("https://example.com/ask");
      expect(item.author).toBe("dang");
      expect(item.publishedAt).toBe(new Date(1700000000 * 1000).toISOString());
      expect(item.tags).toEqual(["hackernews", "story"]);
      expect(item.rawPayload).toBeDefined();
    });

    it("uses HN discussion URL when story has no external URL", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([99]))
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({ id: 99, title: "Ask HN: No URL", time: 1700000000, type: "story" }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
        );

      const result = await hackerNewsInputConnector.poll(makeContext(), {});
      expect(result.items[0].url).toBe("https://news.ycombinator.com/item?id=99");
    });

    it("falls back to 'Untitled' when title is missing", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([88]))
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({ id: 88, time: 1700000000, type: "story" }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
        );

      const result = await hackerNewsInputConnector.poll(makeContext(), {});
      expect(result.items[0].title).toBe("Untitled");
    });
  });

  describe("poll — same #1 story (no change)", () => {
    it("returns no items when #1 hasn't changed", async () => {
      const cursor = makeCursor(1001, [1001]);
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001, 1002, 1003]));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});

      expect(result.items).toHaveLength(0);
      expect(result.nextCursor).toBe(cursor);
    });

    it("does NOT fetch the item detail when #1 is unchanged", async () => {
      const cursor = makeCursor(1001, [1001]);
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001]));

      await hackerNewsInputConnector.poll(makeContext(cursor), {});

      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("poll — genuinely new #1 story", () => {
    it("notifies and updates cursor when a new story reaches #1", async () => {
      const cursor = makeCursor(1001, [1001]);
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([2002, 1001, 999]))
        .mockResolvedValueOnce(mockItem({ id: 2002, title: "Brand New #1" }));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});

      expect(result.items).toHaveLength(1);
      expect(result.items[0].externalItemId).toBe("2002");
      expect(result.items[0].title).toBe("Brand New #1");

      const newCursor = JSON.parse(result.nextCursor!);
      expect(newCursor.currentId).toBe(2002);
      expect(newCursor.notifiedIds).toContain(2002);
      expect(newCursor.notifiedIds).toContain(1001);
    });
  });

  describe("poll — flip-flop prevention (core bug fix)", () => {
    it("does NOT re-notify when a previously-seen story returns to #1", async () => {
      const cursor = makeCursor(2002, [2002, 1001]);
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001, 2002, 999]));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});

      expect(result.items).toHaveLength(0);
      const newCursor = JSON.parse(result.nextCursor!);
      expect(newCursor.currentId).toBe(1001);
    });

    it("still updates the currentId even when suppressing notification", async () => {
      const cursor = makeCursor(2002, [2002, 1001]);
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001, 2002]));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});
      const newCursor = JSON.parse(result.nextCursor!);

      expect(newCursor.currentId).toBe(1001);
      expect(newCursor.notifiedIds[0]).toBe(1001);
    });

    it("handles A→B→A→C sequence correctly", async () => {
      // Poll 1: A is #1 (first poll)
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([100]))
        .mockResolvedValueOnce(mockItem({ id: 100, title: "Story A" }));

      const r1 = await hackerNewsInputConnector.poll(makeContext(), {});
      expect(r1.items).toHaveLength(1);
      expect(r1.items[0].title).toBe("Story A");

      // Poll 2: B is #1 (new story)
      fetchSpy
        .mockResolvedValueOnce(mockTopStories([200, 100]))
        .mockResolvedValueOnce(mockItem({ id: 200, title: "Story B" }));

      const r2 = await hackerNewsInputConnector.poll(makeContext(r1.nextCursor), {});
      expect(r2.items).toHaveLength(1);
      expect(r2.items[0].title).toBe("Story B");

      // Poll 3: A returns to #1 — should NOT re-notify
      fetchSpy.mockResolvedValueOnce(mockTopStories([100, 200]));

      const r3 = await hackerNewsInputConnector.poll(makeContext(r2.nextCursor), {});
      expect(r3.items).toHaveLength(0);

      // Poll 4: C is #1 (genuinely new)
      fetchSpy
        .mockResolvedValueOnce(mockTopStories([300, 100, 200]))
        .mockResolvedValueOnce(mockItem({ id: 300, title: "Story C" }));

      const r4 = await hackerNewsInputConnector.poll(makeContext(r3.nextCursor), {});
      expect(r4.items).toHaveLength(1);
      expect(r4.items[0].title).toBe("Story C");

      const finalCursor = JSON.parse(r4.nextCursor!);
      expect(finalCursor.notifiedIds).toContain(100);
      expect(finalCursor.notifiedIds).toContain(200);
      expect(finalCursor.notifiedIds).toContain(300);
    });
  });

  describe("poll — notifiedIds bounded size", () => {
    it("keeps notifiedIds bounded to prevent unbounded cursor growth", async () => {
      const bigList = Array.from({ length: 250 }, (_, i) => i + 1);
      const cursor = makeCursor(250, bigList);

      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([9999]))
        .mockResolvedValueOnce(mockItem({ id: 9999, title: "Overflow" }));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});
      const newCursor = JSON.parse(result.nextCursor!);

      expect(newCursor.notifiedIds.length).toBeLessThanOrEqual(200);
      expect(newCursor.notifiedIds[0]).toBe(9999);
    });
  });

  describe("poll — legacy cursor migration", () => {
    it("migrates a plain numeric string cursor", async () => {
      const legacyCursor = "1001";
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([2002]))
        .mockResolvedValueOnce(mockItem({ id: 2002, title: "After Legacy" }));

      const result = await hackerNewsInputConnector.poll(makeContext(legacyCursor), {});

      expect(result.items).toHaveLength(1);
      const newCursor = JSON.parse(result.nextCursor!);
      expect(newCursor.notifiedIds).toContain(1001);
      expect(newCursor.notifiedIds).toContain(2002);
    });

    it("does not re-notify legacy cursor story when it's still #1", async () => {
      const legacyCursor = "1001";
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001, 999]));

      const result = await hackerNewsInputConnector.poll(makeContext(legacyCursor), {});
      expect(result.items).toHaveLength(0);
    });

    it("handles legacy cursor story returning to #1 after new story", async () => {
      const legacyCursor = "1001";
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([2002]))
        .mockResolvedValueOnce(mockItem({ id: 2002, title: "New" }));

      const r1 = await hackerNewsInputConnector.poll(makeContext(legacyCursor), {});
      expect(r1.items).toHaveLength(1);

      // Legacy story returns to #1 — should NOT re-notify
      fetchSpy.mockResolvedValueOnce(mockTopStories([1001, 2002]));
      const r2 = await hackerNewsInputConnector.poll(makeContext(r1.nextCursor), {});
      expect(r2.items).toHaveLength(0);
    });
  });

  describe("poll — empty / error responses", () => {
    it("returns empty items when topstories is empty", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([]));

      const result = await hackerNewsInputConnector.poll(makeContext(), {});
      expect(result.items).toHaveLength(0);
    });

    it("preserves existing cursor when topstories is empty", async () => {
      const cursor = makeCursor(1001, [1001]);
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([]));

      const result = await hackerNewsInputConnector.poll(makeContext(cursor), {});
      expect(result.nextCursor).toBe(cursor);
    });

    it("throws on topstories API failure", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(new Response("error", { status: 503 }));

      await expect(
        hackerNewsInputConnector.poll(makeContext(), {}),
      ).rejects.toThrow("HN topstories returned 503");
    });

    it("throws on item detail API failure", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([1001]))
        .mockResolvedValueOnce(new Response("error", { status: 404 }));

      await expect(
        hackerNewsInputConnector.poll(makeContext(), {}),
      ).rejects.toThrow("HN item 1001 returned 404");
    });
  });

  describe("poll — cursor corruption resilience", () => {
    it("treats garbage cursor as no cursor", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([5000]))
        .mockResolvedValueOnce(mockItem({ id: 5000, title: "Fresh Start" }));

      const result = await hackerNewsInputConnector.poll(makeContext("not-json-or-number"), {});
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Fresh Start");
    });

    it("treats malformed JSON cursor as no cursor", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([5000]))
        .mockResolvedValueOnce(mockItem({ id: 5000, title: "Fresh Start" }));

      const result = await hackerNewsInputConnector.poll(makeContext("{invalid json}"), {});
      expect(result.items).toHaveLength(1);
    });

    it("treats JSON without currentId as no cursor", async () => {
      vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(mockTopStories([5000]))
        .mockResolvedValueOnce(mockItem({ id: 5000, title: "Fresh Start" }));

      const result = await hackerNewsInputConnector.poll(
        makeContext(JSON.stringify({ wrong: "shape" })),
        {},
      );
      expect(result.items).toHaveLength(1);
    });
  });
});
