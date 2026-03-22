import { NextResponse } from "next/server";
import { z } from "zod";
import { defaultRuleEngine } from "@/src/core/rules/engine";
import type { Rule } from "@/src/core/rules/types";
import { normalizeEvent } from "@/src/core/events/normalize";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const requestSchema = z.object({
  event: z.object({
    sourceId: z.string(),
    sourceType: z.enum(["rss", "youtube", "stock", "webhook", "custom"]),
    externalItemId: z.string(),
    title: z.string(),
    contentText: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
  rule: z.object({
    id: z.string(),
    name: z.string(),
    priority: z.number().int(),
    enabled: z.boolean(),
    condition: z.object({
      sourceType: z.string().optional(),
      sourceId: z.string().optional(),
      includeKeywords: z.array(z.string()).optional(),
      excludeKeywords: z.array(z.string()).optional(),
      includeTags: z.array(z.string()).optional(),
      titleRegex: z.string().optional(),
      minPublishedAtIso: z.string().optional(),
    }),
    action: z.object({
      outputIds: z.array(z.string()),
    }),
  }),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.parse(body);
  const rule = parsed.rule as Rule;
  const event = normalizeEvent({
    workspaceId: DEFAULT_WORKSPACE_ID,
    sourceId: parsed.event.sourceId,
    sourceType: parsed.event.sourceType,
    externalItemId: parsed.event.externalItemId,
    title: parsed.event.title,
    contentText: parsed.event.contentText,
    tags: parsed.event.tags,
    rawPayload: parsed.event,
  });
  const result = defaultRuleEngine.simulate(event, rule);
  return NextResponse.json({ data: result });
}
