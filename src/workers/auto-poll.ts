import { getRepository } from "@/src/db/repositories";
import { runSourcePoll, runPendingDeliveries } from "@/src/core/pipeline/orchestrator";
import { connectorRegistry } from "@/src/plugins/registry";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { logger } from "@/src/core/observability/logger";

const TICK_INTERVAL_MS = 30_000;

class AutoPollManager {
  private timer: ReturnType<typeof setInterval> | null = null;
  private lastPolledAt = new Map<string, number>();
  private ticking = false;

  start(): void {
    if (this.timer) return;
    this.timer = setInterval(() => void this.tick(), TICK_INTERVAL_MS);
    logger.info("auto-poll started", {
      workspaceId: DEFAULT_WORKSPACE_ID,
      tickIntervalMs: TICK_INTERVAL_MS,
    });
    void this.tick();
  }

  stop(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
    logger.info("auto-poll stopped", { workspaceId: DEFAULT_WORKSPACE_ID });
  }

  isRunning(): boolean {
    return this.timer !== null;
  }

  async getStatusAsync(): Promise<{
    running: boolean;
    tickIntervalSec: number;
    sources: Array<{ id: string; lastPolledAt: string | null; pollIntervalSec: number }>;
  }> {
    const repo = getRepository();
    const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
    return {
      running: this.isRunning(),
      tickIntervalSec: TICK_INTERVAL_MS / 1000,
      sources: sources.map((s) => ({
        id: s.id,
        lastPolledAt: this.lastPolledAt.has(s.id)
          ? new Date(this.lastPolledAt.get(s.id)!).toISOString()
          : null,
        pollIntervalSec: s.pollIntervalSec,
      })),
    };
  }

  private async tick(): Promise<void> {
    if (this.ticking) return;
    this.ticking = true;
    try {
      const repo = getRepository();
      const sources = await repo.listSources(DEFAULT_WORKSPACE_ID);
      const now = Date.now();
      let polledAny = false;

      for (const source of sources.filter((s) => s.enabled)) {
        const last = this.lastPolledAt.get(source.id) ?? 0;
        const intervalMs = source.pollIntervalSec * 1000;
        if (now - last < intervalMs) continue;

        await runSourcePoll(
          DEFAULT_WORKSPACE_ID,
          source.id,
          source.pluginId,
          connectorRegistry,
        );
        this.lastPolledAt.set(source.id, Date.now());
        polledAny = true;
      }

      if (polledAny) {
        await runPendingDeliveries(DEFAULT_WORKSPACE_ID, connectorRegistry);
      }
    } catch (error) {
      logger.error("auto-poll tick failed", {
        workspaceId: DEFAULT_WORKSPACE_ID,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      this.ticking = false;
    }
  }
}

export const autoPollManager = new AutoPollManager();
