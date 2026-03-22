import type { NormalizedEvent } from "../events/types";
import type { MatchedAction, Rule, RuleEngine, SimulationResult } from "./types";

function includesAny(haystack: string, needles: string[]): boolean {
  const normalized = haystack.toLowerCase();
  return needles.some((needle) => normalized.includes(needle.toLowerCase()));
}

export function simulateRule(event: NormalizedEvent, rule: Rule): SimulationResult {
  const reasons: string[] = [];
  const title = event.title ?? "";
  const body = [event.title, event.contentText].filter(Boolean).join("\n");

  if (rule.condition.sourceType && rule.condition.sourceType !== event.sourceType) {
    reasons.push("sourceType mismatch");
  }
  if (rule.condition.sourceId && rule.condition.sourceId !== event.sourceId) {
    reasons.push("sourceId mismatch");
  }
  if (
    rule.condition.includeKeywords?.length &&
    !includesAny(body, rule.condition.includeKeywords)
  ) {
    reasons.push("missing required keyword");
  }
  if (
    rule.condition.excludeKeywords?.length &&
    includesAny(body, rule.condition.excludeKeywords)
  ) {
    reasons.push("contains excluded keyword");
  }
  if (rule.condition.includeTags?.length) {
    const eventTags = new Set(event.tags.map((tag) => tag.toLowerCase()));
    const hasTag = rule.condition.includeTags.some((tag) =>
      eventTags.has(tag.toLowerCase()),
    );
    if (!hasTag) reasons.push("missing required tag");
  }
  if (rule.condition.titleRegex) {
    const regex = new RegExp(rule.condition.titleRegex, "i");
    if (!regex.test(title)) reasons.push("title regex mismatch");
  }
  if (rule.condition.minPublishedAtIso && event.publishedAt) {
    const min = new Date(rule.condition.minPublishedAtIso).getTime();
    const actual = new Date(event.publishedAt).getTime();
    if (actual < min) reasons.push("publishedAt is before minimum");
  }

  return { matched: reasons.length === 0, reasons };
}

export const defaultRuleEngine: RuleEngine = {
  evaluate(event: NormalizedEvent, rules: Rule[]): MatchedAction[] {
    return rules
      .filter((rule) => rule.enabled)
      .sort((a, b) => a.priority - b.priority)
      .filter((rule) => simulateRule(event, rule).matched)
      .map((rule) => ({ ruleId: rule.id, outputIds: rule.action.outputIds }));
  },
  simulate(event: NormalizedEvent, rule: Rule): SimulationResult {
    return simulateRule(event, rule);
  },
};
