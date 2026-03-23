import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const scheduleSchema = z.object({
  timezone: z.string().min(1),
  windows: z.array(
    z.object({
      days: z.array(z.number().int().min(0).max(6)),
      startHour: z.number().int().min(0).max(23),
      endHour: z.number().int().min(0).max(23),
    }),
  ),
});

const patchSchema = z.object({
  config: z.record(z.string(), z.unknown()).optional(),
  enabled: z.boolean().optional(),
  mutedUntil: z.string().nullable().optional(),
  priority: z.number().int().min(0).max(10).optional(),
  schedule: scheduleSchema.nullable().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const parsed = patchSchema.parse(body);
  const repo = getRepository();
  const outputs = await repo.listOutputs(DEFAULT_WORKSPACE_ID);
  const current = outputs.find((output) => output.id === id);
  if (!current) {
    return NextResponse.json({ error: "output not found" }, { status: 404 });
  }
  await repo.upsertOutput({
    ...current,
    config: parsed.config ?? current.config,
    enabled: parsed.enabled ?? current.enabled,
    mutedUntil:
      parsed.mutedUntil === null
        ? undefined
        : (parsed.mutedUntil ?? current.mutedUntil),
    priority: parsed.priority ?? current.priority,
    schedule:
      parsed.schedule === null
        ? undefined
        : (parsed.schedule ?? current.schedule),
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repo = getRepository();
  await repo.deleteOutput(DEFAULT_WORKSPACE_ID, id);
  return NextResponse.json({ ok: true });
}
