import { getRepository } from "@/src/db/repositories";
import { runSourcePoll, runPendingDeliveries } from "@/src/core/pipeline/orchestrator";
import { connectorRegistry } from "@/src/plugins/registry";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { logger } from "@/src/core/observability/logger";

const SETTING_KEY = "auto_poll_enabled";

/**
 * Called by the Cloudflare cron trigger (every minute).
 * Checks if auto-poll is enabled, then polls sources whose interval has elapsed.
 */
export async function cronPollTick(): Promise<void> {
  const repo = getRepository();
  const enabled = await repo.getSetting(DEFAULT_WORKSPACE_ID, SETTING_KEY);
  if (enabled !== "true") return;

  const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
  const now = Date.now();
  let polledAny = false;

  for (const source of sources.filter((s) => s.enabled)) {
    const last = source.lastPolledAt
      ? new Date(source.lastPolledAt).getTime()
      : 0;
    const intervalMs = source.pollIntervalSec * 1000;
    if (now - last < intervalMs) continue;

    try {
      await runSourcePoll(
        DEFAULT_WORKSPACE_ID,
        source.id,
        source.pluginId,
        connectorRegistry,
      );
      polledAny = true;
    } catch (error) {
      logger.error("auto-poll source failed", {
        workspaceId: DEFAULT_WORKSPACE_ID,
        sourceId: source.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  if (polledAny) {
    await runPendingDeliveries(DEFAULT_WORKSPACE_ID, connectorRegistry);
  }
}

class AutoPollManager {
  async start(): Promise<void> {
    const repo = getRepository();
    await repo.setSetting(DEFAULT_WORKSPACE_ID, SETTING_KEY, "true");
    logger.info("auto-poll enabled (cron-driven)", {
      workspaceId: DEFAULT_WORKSPACE_ID,
    });
  }

  async stop(): Promise<void> {
    const repo = getRepository();
    await repo.setSetting(DEFAULT_WORKSPACE_ID, SETTING_KEY, "false");
    logger.info("auto-poll disabled", {
      workspaceId: DEFAULT_WORKSPACE_ID,
    });
  }

  async isRunning(): Promise<boolean> {
    const repo = getRepository();
    const val = await repo.getSetting(DEFAULT_WORKSPACE_ID, SETTING_KEY);
    return val === "true";
  }

  async getStatusAsync(): Promise<{
    running: boolean;
    tickIntervalSec: number;
    sources: Array<{
      id: string;
      lastPolledAt: string | null;
      pollIntervalSec: number;
    }>;
  }> {
    const repo = getRepository();
    const running = await this.isRunning();
    const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
    return {
      running,
      tickIntervalSec: 60,
      sources: sources.map((s) => ({
        id: s.id,
        lastPolledAt: s.lastPolledAt ?? null,
        pollIntervalSec: s.pollIntervalSec,
      })),
    };
  }
}

export const autoPollManager = new AutoPollManager();
