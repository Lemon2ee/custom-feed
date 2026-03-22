import { describe, expect, it } from "vitest";
import { defaultRuleEngine } from "@/src/core/rules/engine";
import { normalizeEvent } from "@/src/core/events/normalize";
import type { Rule } from "@/src/core/rules/types";

describe("pipeline integration", () => {
  it("matches vlog keyword and routes outputs", () => {
    const event = normalizeEvent({
      workspaceId: "default-workspace",
      sourceId: "youtube-1",
      sourceType: "youtube",
      externalItemId: "video-1",
      title: "My vlog episode",
      contentText: "travel vlog",
      rawPayload: {},
    });

    const rules: Rule[] = [
      {
        id: "rule-1",
        workspaceId: "default-workspace",
        name: "vlog",
        priority: 10,
        enabled: true,
        condition: {
          includeKeywords: ["vlog"],
        },
        action: {
          outputIds: ["out-1"],
        },
      },
    ];

    const actions = defaultRuleEngine.evaluate(event, rules);
    expect(actions).toHaveLength(1);
    expect(actions[0]?.outputIds).toEqual(["out-1"]);
  });
});
