import { describe, expect, it } from "vitest";
import { defaultRuleEngine } from "@/src/core/rules/engine";
import { normalizeEvent } from "@/src/core/events/normalize";
import type { Rule } from "@/src/core/rules/types";

describe("rule engine", () => {
  it("supports include and exclude keyword logic", () => {
    const event = normalizeEvent({
      workspaceId: "w1",
      sourceId: "s1",
      sourceType: "youtube",
      externalItemId: "vid-1",
      title: "Weekly vlog update",
      contentText: "travel vlog and city guides",
      rawPayload: {},
    });

    const rules: Rule[] = [
      {
        id: "match",
        workspaceId: "w1",
        name: "include vlog",
        priority: 1,
        enabled: true,
        condition: { includeKeywords: ["vlog"] },
        action: { outputIds: ["out-1"] },
      },
      {
        id: "exclude",
        workspaceId: "w1",
        name: "exclude politics",
        priority: 2,
        enabled: true,
        condition: { includeKeywords: ["vlog"], excludeKeywords: ["politics"] },
        action: { outputIds: ["out-2"] },
      },
    ];

    const matched = defaultRuleEngine.evaluate(event, rules);
    expect(matched).toHaveLength(2);
  });
});
