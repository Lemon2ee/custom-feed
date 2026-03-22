import type { NormalizedEvent } from "../events/types";

export interface ConnectorValidationResult {
  valid: boolean;
  errors?: string[];
}

export interface InputPollContext {
  workspaceId: string;
  sourceId: string;
  cursor?: string;
}

export interface ExternalItem {
  externalItemId: string;
  title: string;
  url?: string;
  contentText?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  rawPayload: unknown;
}

export interface InputConnector<TConfig = Record<string, unknown>> {
  kind: "input";
  id: string;
  validateConfig(config: TConfig): ConnectorValidationResult;
  poll(context: InputPollContext, config: TConfig): Promise<{
    items: ExternalItem[];
    nextCursor?: string;
  }>;
}

export interface OutputSendContext {
  workspaceId: string;
  outputId: string;
}

export type OutputSendStatus = "sent" | "retryable_error" | "permanent_error";

export interface OutputSendResult {
  status: OutputSendStatus;
  receipt?: Record<string, unknown>;
  error?: string;
}

export interface OutputConnector<TConfig = Record<string, unknown>> {
  kind: "output";
  id: string;
  validateConfig(config: TConfig): ConnectorValidationResult;
  send(
    event: NormalizedEvent,
    context: OutputSendContext,
    config: TConfig,
  ): Promise<OutputSendResult>;
}
