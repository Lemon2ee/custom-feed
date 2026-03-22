import { afterEach, describe, expect, it, vi } from "vitest";
import { rssInputConnector } from "@/src/plugins/input/rss";
import { youtubeInputConnector } from "@/src/plugins/input/youtube";
import { hackerNewsInputConnector } from "@/src/plugins/input/hackernews";
import { steamNewsInputConnector } from "@/src/plugins/input/steam-news";
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
        channel: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        limit: 20,
      }).valid,
    ).toBe(true);
    expect(
      youtubeInputConnector.validateConfig({
        channel: "https://www.youtube.com/@elliotpage_",
        limit: 20,
      }).valid,
    ).toBe(true);
    expect(youtubeInputConnector.validateConfig({ channel: "", limit: 20 }).valid).toBe(false);
  });

  it("hackernews connector validates config shape", () => {
    expect(hackerNewsInputConnector.validateConfig({}).valid).toBe(true);
  });

  it("steam-news connector validates config shape", () => {
    expect(
      steamNewsInputConnector.validateConfig({
        newsUrl: "https://store.steampowered.com/news/app/2868840",
        limit: 10,
      }).valid,
    ).toBe(true);
    expect(
      steamNewsInputConnector.validateConfig({
        newsUrl: "2868840",
        limit: 10,
      }).valid,
    ).toBe(true);
    expect(
      steamNewsInputConnector.validateConfig({
        newsUrl: "https://store.steampowered.com/app/730/Counter-Strike_2/",
        limit: 10,
      }).valid,
    ).toBe(true);
    expect(
      steamNewsInputConnector.validateConfig({
        newsUrl: "not-a-valid-id",
        limit: 10,
      }).valid,
    ).toBe(false);
    expect(
      steamNewsInputConnector.validateConfig({
        newsUrl: "",
        limit: 10,
      }).valid,
    ).toBe(false);
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
      { serverUrl: "https://api.day.app", deviceKey: "abc", encryptionAlgorithm: "aes-256-cbc" },
    );
    expect(result.status).toBe("retryable_error");
  });

  it("bark treats API-level rejection as permanent error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ code: 400, message: "invalid device key" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await barkOutputConnector.send(
      event,
      { workspaceId: "w1", outputId: "o1" },
      { serverUrl: "https://api.day.app", deviceKey: "abc", encryptionAlgorithm: "aes-256-cbc" },
    );
    expect(result.status).toBe("permanent_error");
  });
});
