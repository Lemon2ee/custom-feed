import { runPendingDeliveries } from "@/src/core/pipeline/orchestrator";
import { connectorRegistry } from "@/src/plugins/registry";
import { logger } from "@/src/core/observability/logger";

export async function runDeliveryWorker(workspaceId: string): Promise<void> {
  logger.info("delivery worker started", { workspaceId });
  await runPendingDeliveries(workspaceId, connectorRegistry);
  logger.info("delivery worker finished", { workspaceId });
}
