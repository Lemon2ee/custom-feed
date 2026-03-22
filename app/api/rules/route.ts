import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const ruleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  priority: z.number().int().default(100),
  enabled: z.boolean().default(true),
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
    outputIds: z.array(z.string()).min(1),
  }),
});

export async function GET() {
  const repo = getRepository();
  const rules = await repo.listRules(DEFAULT_WORKSPACE_ID);
  return NextResponse.json({ data: rules });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ruleSchema.parse(body);
  const repo = getRepository();
  const id = parsed.id ?? randomUUID();
  await repo.upsertRule({
    id,
    workspaceId: DEFAULT_WORKSPACE_ID,
    name: parsed.name,
    priority: parsed.priority,
    enabled: parsed.enabled,
    condition: parsed.condition,
    action: parsed.action,
  });
  return NextResponse.json({ ok: true, id });
}
