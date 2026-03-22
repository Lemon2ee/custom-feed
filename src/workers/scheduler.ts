import { getRepository } from "@/src/db/repositories";
import { runSourcePoll } from "@/src/core/pipeline/orchestrator";
import { connectorRegistry } from "@/src/plugins/registry";

export async function runScheduler(workspaceId: string): Promise<void> {
  const repo = getRepository();
  const sources = await repo.listSources(workspaceId);
  for (const source of sources.filter((item) => item.enabled)) {
    await runSourcePoll(workspaceId, source.id, source.pluginId, connectorRegistry);
  }
}
