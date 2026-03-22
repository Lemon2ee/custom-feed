import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { connectorRegistry } from "@/src/plugins/registry";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repo = getRepository();
  const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
  const source = sources.find((s) => s.id === id);
  if (!source) {
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  }

  const connector = connectorRegistry.inputs[source.pluginId];
  if (!connector) {
    return NextResponse.json(
      { error: `unknown connector: ${source.pluginId}` },
      { status: 400 },
    );
  }

  const validation = connector.validateConfig(source.config);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "invalid config", details: validation.errors },
      { status: 400 },
    );
  }

  try {
    const result = await connector.poll(
      { workspaceId: DEFAULT_WORKSPACE_ID, sourceId: id, cursor: source.lastCursor },
      source.config,
    );
    return NextResponse.json({ data: result.items });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `poll failed: ${msg}` }, { status: 502 });
  }
}
