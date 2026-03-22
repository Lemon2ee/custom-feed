import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { connectorRegistry } from "@/src/plugins/registry";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import type { NormalizedEvent } from "@/src/core/events/types";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repo = getRepository();
  const outputs = await repo.listOutputs(DEFAULT_WORKSPACE_ID);
  const output = outputs.find((o) => o.id === id);
  if (!output) {
    return NextResponse.json({ error: "output not found" }, { status: 404 });
  }

  const connector = connectorRegistry.outputs[output.pluginId];
  if (!connector) {
    return NextResponse.json(
      { error: `unknown connector: ${output.pluginId}` },
      { status: 400 },
    );
  }

  const validation = connector.validateConfig(output.config);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "invalid config", details: validation.errors },
      { status: 400 },
    );
  }

  const testEvent: NormalizedEvent = {
    id: "test-event",
    workspaceId: DEFAULT_WORKSPACE_ID,
    sourceId: "test",
    sourceType: "custom",
    externalItemId: "test-item",
    title: "Test notification from Custom Feed",
    url: "https://example.com",
    contentText:
      "If you see this message, your output connector is working correctly.",
    tags: [],
    rawPayload: {},
    createdAt: new Date().toISOString(),
  };

  const result = await connector.send(testEvent, {
    workspaceId: DEFAULT_WORKSPACE_ID,
    outputId: id,
    sourceName: "Test",
  }, output.config);

  if (result.status === "sent") {
    return NextResponse.json({ ok: true, result });
  }

  return NextResponse.json(
    { ok: false, result },
    { status: result.status === "retryable_error" ? 502 : 400 },
  );
}
