import handler from "vinext/server/app-router-entry";
import { logger } from "./core/observability/logger";
import { SchedulerDO } from "./workers/scheduler-do";

export { SchedulerDO };

let schedulerBootstrapped = false;

const workerEntry = {
  async fetch(request: Request, env: Env) {
    if (!schedulerBootstrapped) {
      schedulerBootstrapped = true;
      try {
        const id = env.SCHEDULER_DO.idFromName("singleton");
        const stub = env.SCHEDULER_DO.get(id);
        await stub.start();
      } catch (error) {
        logger.error("failed to bootstrap scheduler DO", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
    return handler.fetch(request);
  },
};

export default workerEntry;
