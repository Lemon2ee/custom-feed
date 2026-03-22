import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const patchSchema = z.object({
  config: z.record(z.string(), z.unknown()).optional(),
  enabled: z.boolean().optional(),
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
  });
  return NextResponse.json({ ok: true });
}
