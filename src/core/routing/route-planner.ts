import type { MatchedAction } from "@/src/core/rules/types";

export interface PlannedRoute {
  outputId: string;
  ruleId: string;
}

export function planRoutes(actions: MatchedAction[]): PlannedRoute[] {
  const routes: PlannedRoute[] = [];
  const seen = new Set<string>();
  for (const action of actions) {
    for (const outputId of action.outputIds) {
      const key = `${action.ruleId}:${outputId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      routes.push({ outputId, ruleId: action.ruleId });
    }
  }
  return routes;
}
