import type { NormalizedEvent } from "../events/types";

export interface RuleCondition {
  sourceType?: string;
  sourceId?: string;
  includeKeywords?: string[];
  excludeKeywords?: string[];
  includeTags?: string[];
  titleRegex?: string;
  minPublishedAtIso?: string;
}

export interface RuleAction {
  outputIds: string[];
}

export interface Rule {
  id: string;
  workspaceId: string;
  name: string;
  priority: number;
  enabled: boolean;
  condition: RuleCondition;
  action: RuleAction;
}

export interface SimulationResult {
  matched: boolean;
  reasons: string[];
}

export interface MatchedAction {
  ruleId: string;
  outputIds: string[];
}

export interface RuleEngine {
  evaluate(event: NormalizedEvent, rules: Rule[]): MatchedAction[];
  simulate(event: NormalizedEvent, rule: Rule): SimulationResult;
}
