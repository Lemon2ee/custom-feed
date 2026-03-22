import { NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/src/db/repositories";
import { connectorRegistry } from "@/src/plugins/registry";
import { normalizeEvent } from "@/src/core/events/normalize";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import type { SourceType } from "@/src/core/events/types";

const bodySchema = z.object({
  externalItemId: z.string(),
  title: z.string(),
  url: z.string().optional(),
  contentText: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  imageUrl: z.string().optional(),
  authorImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const KNOWN_SOURCE_TYPES: readonly string[] = [
  "rss", "youtube", "bilibili", "stock", "webhook", "custom",
];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repo = getRepository();
  const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
  const source = sources.find((s) => s.id === id);
  if (!source) {
    return NextResponse.json({ error: "source not found" }, { status: 404 });
  }

  const body = await request.json();
  const item = bodySchema.parse(body);

  const sourceType: SourceType = KNOWN_SOURCE_TYPES.includes(source.pluginId)
    ? (source.pluginId as SourceType)
    : "custom";

  const event = normalizeEvent({
    workspaceId: DEFAULT_WORKSPACE_ID,
    sourceId: id,
    sourceType,
    externalItemId: item.externalItemId,
    title: item.title,
    url: item.url,
    contentText: item.contentText,
    author: item.author,
    publishedAt: item.publishedAt,
    imageUrl: item.imageUrl,
    authorImageUrl: item.authorImageUrl,
    tags: item.tags,
    rawPayload: {},
  });

  const outputs = await repo.listOutputs(DEFAULT_WORKSPACE_ID);
  const results: Array<{ outputId: string; pluginId: string; status: string; error?: string }> = [];

  for (const outputId of source.outputIds) {
    const output = outputs.find((o) => o.id === outputId && o.enabled);
    if (!output) {
      results.push({ outputId, pluginId: "unknown", status: "skipped", error: "output not found or disabled" });
      continue;
    }
    const connector = connectorRegistry.outputs[output.pluginId];
    if (!connector) {
      results.push({ outputId, pluginId: output.pluginId, status: "skipped", error: "connector not found" });
      continue;
    }
    try {
      const sendResult = await connector.send(
        event,
        { workspaceId: DEFAULT_WORKSPACE_ID, outputId, sourceName: source.name },
        output.config,
      );
      results.push({ outputId, pluginId: output.pluginId, status: sendResult.status, error: sendResult.error });
    } catch (err) {
      results.push({
        outputId,
        pluginId: output.pluginId,
        status: "permanent_error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const allSent = results.every((r) => r.status === "sent");
  return NextResponse.json(
    { ok: allSent, results },
    { status: allSent ? 200 : 207 },
  );
}
