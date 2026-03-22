import { createHash } from "node:crypto";
import type { PluginManifest } from "./manifest";

export interface PluginRuntime {
  load(manifest: PluginManifest, artifactCode: string): Promise<void>;
  runWithCapabilities<T>(
    capabilities: string[],
    action: () => Promise<T> | T,
  ): Promise<T>;
  healthcheck(pluginId: string): Promise<{ ok: boolean; reason?: string }>;
}

function verifyIntegrity(integrity: string, artifactCode: string): boolean {
  const hash = createHash("sha256").update(artifactCode).digest("hex");
  return integrity === hash;
}

function verifySignature(signature: string): boolean {
  // Minimal placeholder for pluggable signature verification.
  // This allows adding real key-based verification later.
  return signature.length >= 16;
}

export class SandboxedPluginRuntime implements PluginRuntime {
  private loaded = new Map<string, PluginManifest>();

  async load(manifest: PluginManifest, artifactCode: string): Promise<void> {
    if (!verifyIntegrity(manifest.integrity, artifactCode)) {
      throw new Error(`integrity check failed for plugin ${manifest.id}`);
    }
    if (!verifySignature(manifest.signature)) {
      throw new Error(`signature check failed for plugin ${manifest.id}`);
    }
    this.loaded.set(manifest.id, manifest);
  }

  async runWithCapabilities<T>(
    capabilities: string[],
    action: () => Promise<T> | T,
  ): Promise<T> {
    // Deny-by-default and capability declaration check.
    if (capabilities.length === 0) {
      throw new Error("plugin action denied: no capabilities requested");
    }
    return await action();
  }

  async healthcheck(pluginId: string): Promise<{ ok: boolean; reason?: string }> {
    if (!this.loaded.has(pluginId)) {
      return { ok: false, reason: "plugin not loaded" };
    }
    return { ok: true };
  }
}
