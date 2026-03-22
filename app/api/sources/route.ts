import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { connectorRegistry } from "@/src/plugins/registry";

const sourceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional(),
  pluginId: z.string().min(1),
  config: z.record(z.string(), z.unknown()).default({}),
  filter: z
    .object({
      includeKeywords: z.array(z.string()).optional(),
      excludeKeywords: z.array(z.string()).optional(),
    })
    .optional(),
  outputIds: z.array(z.string()).default([]),
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
  const connector = connectorRegistry.inputs[parsed.pluginId];
  if (!connector) {
    return NextResponse.json(
      { error: `unknown input connector: ${parsed.pluginId}` },
      { status: 400 },
    );
  }
  const validation = connector.validateConfig(parsed.config);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "invalid source config", details: validation.errors ?? [] },
      { status: 400 },
    );
  }

  await repo.upsertSource({
    id,
    workspaceId: DEFAULT_WORKSPACE_ID,
    name: parsed.name ?? `${parsed.pluginId}-${id.slice(0, 6)}`,
    pluginId: parsed.pluginId,
    config: parsed.config,
    outputIds: parsed.outputIds,
    filter: parsed.filter,
    pollIntervalSec: parsed.pollIntervalSec,
    enabled: parsed.enabled,
  });
  return NextResponse.json({ ok: true, id });
}
