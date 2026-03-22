import type { PluginManifest } from "./manifest";

export interface PluginInstallRecord {
  id: string;
  workspaceId: string;
  pluginId: string;
  version: string;
  repositoryUrl: string;
  manifest: PluginManifest;
  integrityHash: string;
  signature: string;
  enabled: boolean;
}

class PluginStore {
  private records = new Map<string, PluginInstallRecord>();

  list(workspaceId: string): PluginInstallRecord[] {
    return [...this.records.values()].filter((item) => item.workspaceId === workspaceId);
  }

  upsert(record: PluginInstallRecord): void {
    this.records.set(record.id, record);
  }

  find(workspaceId: string, pluginId: string): PluginInstallRecord | undefined {
    return this.list(workspaceId).find((item) => item.pluginId === pluginId);
  }
}

const store = new PluginStore();

export function getPluginStore(): PluginStore {
  return store;
}
