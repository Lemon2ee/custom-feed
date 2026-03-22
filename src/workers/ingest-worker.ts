import { runScheduler } from "./scheduler";
import { logger } from "@/src/core/observability/logger";

export async function runIngestWorker(workspaceId: string): Promise<void> {
  logger.info("ingest worker started", { workspaceId });
  await runScheduler(workspaceId);
  logger.info("ingest worker finished", { workspaceId });
}
