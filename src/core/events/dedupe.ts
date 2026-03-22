import { createHash } from "node:crypto";
import type { NormalizedEvent } from "./types";

export function createDedupeHash(event: Pick<NormalizedEvent, "sourceId" | "externalItemId" | "title" | "url">): string {
  const raw = `${event.sourceId}:${event.externalItemId}:${event.title ?? ""}:${event.url ?? ""}`;
  return createHash("sha256").update(raw).digest("hex");
}

export function createEventId(sourceId: string, externalItemId: string): string {
  return createHash("sha1").update(`${sourceId}:${externalItemId}`).digest("hex");
}
