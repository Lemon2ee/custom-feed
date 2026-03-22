type LogLevel = "info" | "warn" | "error";

export interface LogContext {
  correlationId?: string;
  workspaceId?: string;
  sourceId?: string;
  outputId?: string;
  pluginId?: string;
  [key: string]: unknown;
}

function emit(level: LogLevel, message: string, context: LogContext = {}) {
  const payload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };
  if (level === "error") {
    console.error(JSON.stringify(payload));
    return;
  }
  if (level === "warn") {
    console.warn(JSON.stringify(payload));
    return;
  }
  console.log(JSON.stringify(payload));
}

export const logger = {
  info(message: string, context?: LogContext) {
    emit("info", message, context);
  },
  warn(message: string, context?: LogContext) {
    emit("warn", message, context);
  },
  error(message: string, context?: LogContext) {
    emit("error", message, context);
  },
};
