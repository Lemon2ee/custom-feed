import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { connectorRegistry } from "@/src/plugins/registry";

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  filter: z
    .object({
      includeKeywords: z.array(z.string()).optional(),
      excludeKeywords: z.array(z.string()).optional(),
    })
    .optional(),
  outputIds: z.array(z.string()).optional(),
  pollIntervalSec: z.number().int().positive().optional(),
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
  const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
  const current = sources.find((source) => source.id === id);
  if (!current) {
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  }
  const nextConfig = parsed.config ?? current.config;
  const connector = connectorRegistry.inputs[current.pluginId];
  if (!connector) {
    return NextResponse.json(
      { error: `unknown input connector: ${current.pluginId}` },
      { status: 400 },
    );
  }
  const validation = connector.validateConfig(nextConfig);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "invalid source config", details: validation.errors ?? [] },
      { status: 400 },
    );
  }
  await repo.upsertSource({
    ...current,
    name: parsed.name ?? current.name,
    config: nextConfig,
    outputIds: parsed.outputIds ?? current.outputIds,
    filter: parsed.filter ?? current.filter,
    pollIntervalSec: parsed.pollIntervalSec ?? current.pollIntervalSec,
    enabled: parsed.enabled ?? current.enabled,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repo = getRepository();
  await repo.deleteSource(DEFAULT_WORKSPACE_ID, id);
  return NextResponse.json({ ok: true });
}
