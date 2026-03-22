import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const patchSchema = z.object({
  name: z.string().optional(),
  priority: z.number().int().optional(),
  enabled: z.boolean().optional(),
  condition: z
    .object({
      sourceType: z.string().optional(),
      sourceId: z.string().optional(),
      includeKeywords: z.array(z.string()).optional(),
      excludeKeywords: z.array(z.string()).optional(),
      includeTags: z.array(z.string()).optional(),
      titleRegex: z.string().optional(),
      minPublishedAtIso: z.string().optional(),
    })
    .optional(),
  action: z
    .object({
      outputIds: z.array(z.string()).min(1),
    })
    .optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const parsed = patchSchema.parse(body);
  const repo = getRepository();
  const rules = await repo.listRules(DEFAULT_WORKSPACE_ID);
  const current = rules.find((rule) => rule.id === id);
  if (!current) {
    return NextResponse.json({ error: "rule not found" }, { status: 404 });
  }
  await repo.upsertRule({
    ...current,
    name: parsed.name ?? current.name,
    priority: parsed.priority ?? current.priority,
    enabled: parsed.enabled ?? current.enabled,
    condition: parsed.condition ?? current.condition,
    action: parsed.action ?? current.action,
  });
  return NextResponse.json({ ok: true });
}
