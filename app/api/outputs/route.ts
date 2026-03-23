import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const outputSchema = z.object({
  id: z.string().optional(),
  pluginId: z.string().min(1),
  config: z.record(z.string(), z.unknown()).default({}),
  enabled: z.boolean().default(true),
});

export async function GET() {
  const repo = getRepository();
  const outputs = await repo.listOutputs(DEFAULT_WORKSPACE_ID);
  return NextResponse.json({ data: outputs });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = outputSchema.parse(body);
  const repo = getRepository();
  const id = parsed.id ?? randomUUID();

  await repo.upsertOutput({
    id,
    workspaceId: DEFAULT_WORKSPACE_ID,
    pluginId: parsed.pluginId,
    config: parsed.config,
    enabled: parsed.enabled,
    priority: 0,
  });
  return NextResponse.json({ ok: true, id });
}
