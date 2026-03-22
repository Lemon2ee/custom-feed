import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { installPluginFromGitHubRelease } from "@/src/core/plugins/installer";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { getPluginStore } from "@/src/core/plugins/store";

const payloadSchema = z.object({
  repositoryUrl: z.string().url(),
  version: z.string(),
  manifest: z.unknown(),
  artifactCode: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const payload = payloadSchema.parse(body);
  const result = await installPluginFromGitHubRelease(payload);
  const store = getPluginStore();
  const id = randomUUID();
  store.upsert({
    id,
    workspaceId: DEFAULT_WORKSPACE_ID,
    pluginId: result.manifest.id,
    version: result.manifest.version,
    repositoryUrl: payload.repositoryUrl,
    manifest: result.manifest,
    integrityHash: result.integrityHash,
    signature: result.manifest.signature,
    enabled: true,
  });
  return NextResponse.json({ ok: true, id });
}
