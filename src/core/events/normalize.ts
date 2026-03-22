import type { NormalizedEvent, SourceType } from "./types";
import { createEventId } from "./dedupe";

interface NormalizeArgs {
  workspaceId: string;
  sourceId: string;
  sourceType: SourceType;
  externalItemId: string;
  title: string;
  url?: string;
  contentText?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  rawPayload: unknown;
}

export function normalizeEvent(args: NormalizeArgs): NormalizedEvent {
  const now = new Date().toISOString();
  return {
    id: createEventId(args.sourceId, args.externalItemId),
    workspaceId: args.workspaceId,
    sourceId: args.sourceId,
    sourceType: args.sourceType,
    externalItemId: args.externalItemId,
    title: args.title.trim(),
    url: args.url,
    contentText: args.contentText,
    author: args.author,
    publishedAt: args.publishedAt,
    tags: args.tags ?? [],
    rawPayload: args.rawPayload,
    createdAt: now,
  };
}
