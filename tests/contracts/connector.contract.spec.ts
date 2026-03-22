import { afterEach, describe, expect, it, vi } from "vitest";
import { rssInputConnector } from "@/src/plugins/input/rss";
import { youtubeInputConnector } from "@/src/plugins/input/youtube";
import { ntfyOutputConnector } from "@/src/plugins/output/ntfy";
import { barkOutputConnector } from "@/src/plugins/output/bark";
import { normalizeEvent } from "@/src/core/events/normalize";

describe("input connector contract", () => {
  it("rss connector validates config shape", () => {
    expect(
      rssInputConnector.validateConfig({
        feedUrl: "https://example.com/feed.xml",
        limit: 20,
      }).valid,
    ).toBe(true);
    expect(
      rssInputConnector.validateConfig({ feedUrl: "not-url", limit: 20 }).valid,
    ).toBe(false);
  });

  it("youtube connector validates config shape", () => {
    expect(
      youtubeInputConnector.validateConfig({
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        limit: 20,
      }).valid,
    ).toBe(true);
    expect(youtubeInputConnector.validateConfig({ channelId: "", limit: 20 }).valid).toBe(
      false,
    );
  });
});

describe("output connector contract", () => {
  const event = normalizeEvent({
    workspaceId: "w1",
    sourceId: "s1",
    sourceType: "rss",
    externalItemId: "a1",
    title: "hello world",
    rawPayload: {},
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ntfy returns sent on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("ok", { status: 200 }),
    );

    const result = await ntfyOutputConnector.send(
      event,
      { workspaceId: "w1", outputId: "o1" },
      { baseUrl: "https://ntfy.sh", topic: "hello" },
    );
    expect(result.status).toBe("sent");
  });

  it("bark marks server errors retryable", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("error", { status: 503 }),
    );

    const result = await barkOutputConnector.send(
      event,
      { workspaceId: "w1", outputId: "o1" },
      { serverUrl: "https://api.day.app", deviceKey: "abc" },
    );
    expect(result.status).toBe("retryable_error");
  });
});
