import { createHash } from "node:crypto";
import { parsePluginManifest, type PluginManifest } from "./manifest";

export interface PluginInstallRequest {
  repositoryUrl: string;
  version: string;
  manifest: unknown;
  artifactCode: string;
}

export interface PluginInstallResult {
  manifest: PluginManifest;
  integrityHash: string;
}

export function verifyGitHubRepoUrl(url: string): boolean {
  return /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
}

export async function installPluginFromGitHubRelease(
  request: PluginInstallRequest,
): Promise<PluginInstallResult> {
  if (!verifyGitHubRepoUrl(request.repositoryUrl)) {
    throw new Error("only public GitHub repositories are supported");
  }

  const manifest = parsePluginManifest(request.manifest);
  const integrityHash = createHash("sha256")
    .update(request.artifactCode)
    .digest("hex");

  if (manifest.version !== request.version) {
    throw new Error("requested version does not match manifest version");
  }

  if (manifest.integrity !== integrityHash) {
    throw new Error("artifact integrity does not match manifest");
  }

  return { manifest, integrityHash };
}
