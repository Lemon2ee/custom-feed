import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const sourceSchema = z.object({
  id: z.string().optional(),
  pluginId: z.string().min(1),
  config: z.record(z.string(), z.unknown()).default({}),
  pollIntervalSec: z.number().int().positive().default(300),
  enabled: z.boolean().default(true),
});

export async function GET() {
  const repo = getRepository();
  const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
  return NextResponse.json({ data: sources });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = sourceSchema.parse(body);
  const repo = getRepository();
  const id = parsed.id ?? randomUUID();

  await repo.upsertSource({
    id,
    workspaceId: DEFAULT_WORKSPACE_ID,
    pluginId: parsed.pluginId,
    config: parsed.config,
    pollIntervalSec: parsed.pollIntervalSec,
    enabled: parsed.enabled,
  });
  return NextResponse.json({ ok: true, id });
}
