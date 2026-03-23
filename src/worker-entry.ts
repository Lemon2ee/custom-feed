import handler from "vinext/server/app-router-entry";
import { cronPollTick } from "./workers/auto-poll";
import { logger } from "./core/observability/logger";

export default {
  async fetch(request: Request) {
    return handler.fetch(request);
  },

  async scheduled() {
    try {
      await cronPollTick();
    } catch (error) {
      logger.error("scheduled cron poll failed", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
