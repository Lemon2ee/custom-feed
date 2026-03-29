import { DurableObject } from "cloudflare:workers";
import { cronPollTick } from "./auto-poll";
import { logger } from "../core/observability/logger";

const TICK_INTERVAL_MS = 60_000;

export class SchedulerDO extends DurableObject {
  async alarm(): Promise<void> {
    try {
      await cronPollTick();
    } catch (error) {
      logger.error("scheduler DO alarm failed", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
    await this.ctx.storage.setAlarm(Date.now() + TICK_INTERVAL_MS);
  }

  async start(): Promise<void> {
    const current = await this.ctx.storage.getAlarm();
    if (current === null) {
      await this.ctx.storage.setAlarm(Date.now() + TICK_INTERVAL_MS);
    }
  }
}
