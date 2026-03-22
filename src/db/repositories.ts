import type { NormalizedEvent } from "@/src/core/events/types";
import type { Rule } from "@/src/core/rules/types";
import { createDedupeHash } from "@/src/core/events/dedupe";

export interface SourceRecord {
  id: string;
  workspaceId: string;
  name: string;
  pluginId: string;
  config: Record<string, unknown>;
  outputIds: string[];
  filter?: {
    includeKeywords?: string[];
    excludeKeywords?: string[];
  };
  pollIntervalSec: number;
  lastCursor?: string;
  enabled: boolean;
}

export interface OutputRecord {
  id: string;
  workspaceId: string;
  pluginId: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface DeliveryRecord {
  id: string;
  workspaceId: string;
  eventId: string;
  outputId: string;
  status: "pending" | "sent" | "retrying" | "failed";
  attemptCount: number;
  lastError?: string;
  nextRetryAt?: string;
  sentAt?: string;
  receipt?: Record<string, unknown>;
}

export interface Repository {
  listSources(workspaceId: string): Promise<SourceRecord[]>;
  upsertSource(source: SourceRecord): Promise<void>;
  deleteSource(workspaceId: string, sourceId: string): Promise<void>;
  listOutputs(workspaceId: string): Promise<OutputRecord[]>;
  upsertOutput(output: OutputRecord): Promise<void>;
  listRules(workspaceId: string): Promise<Rule[]>;
  upsertRule(rule: Rule): Promise<void>;
  upsertEvent(event: NormalizedEvent): Promise<{ inserted: boolean }>;
  listEvents(workspaceId: string): Promise<NormalizedEvent[]>;
  upsertDelivery(delivery: DeliveryRecord): Promise<void>;
  listDeliveries(workspaceId: string): Promise<DeliveryRecord[]>;
}

class MemoryRepository implements Repository {
  private sources = new Map<string, SourceRecord>();
  private outputs = new Map<string, OutputRecord>();
  private rules = new Map<string, Rule>();
  private events = new Map<string, NormalizedEvent>();
  private deliveries = new Map<string, DeliveryRecord>();
  private dedupe = new Set<string>();

  async listSources(workspaceId: string): Promise<SourceRecord[]> {
    return [...this.sources.values()].filter((item) => item.workspaceId === workspaceId);
  }

  async upsertSource(source: SourceRecord): Promise<void> {
    this.sources.set(source.id, source);
  }

  async deleteSource(workspaceId: string, sourceId: string): Promise<void> {
    const source = this.sources.get(sourceId);
    if (!source || source.workspaceId !== workspaceId) return;
    this.sources.delete(sourceId);

    const removedEventIds = [...this.events.values()]
      .filter((event) => event.workspaceId === workspaceId && event.sourceId === sourceId)
      .map((event) => event.id);

    for (const eventId of removedEventIds) {
      this.events.delete(eventId);
      for (const [deliveryId, delivery] of this.deliveries.entries()) {
        if (delivery.workspaceId === workspaceId && delivery.eventId === eventId) {
          this.deliveries.delete(deliveryId);
        }
      }
    }
  }

  async listOutputs(workspaceId: string): Promise<OutputRecord[]> {
    return [...this.outputs.values()].filter((item) => item.workspaceId === workspaceId);
  }

  async upsertOutput(output: OutputRecord): Promise<void> {
    this.outputs.set(output.id, output);
  }

  async listRules(workspaceId: string): Promise<Rule[]> {
    return [...this.rules.values()].filter((item) => item.workspaceId === workspaceId);
  }

  async upsertRule(rule: Rule): Promise<void> {
    this.rules.set(rule.id, rule);
  }

  async upsertEvent(event: NormalizedEvent): Promise<{ inserted: boolean }> {
    const dedupeKey = createDedupeHash(event);
    if (this.dedupe.has(`${event.workspaceId}:${dedupeKey}`)) {
      return { inserted: false };
    }
    this.events.set(event.id, event);
    this.dedupe.add(`${event.workspaceId}:${dedupeKey}`);
    return { inserted: true };
  }

  async listEvents(workspaceId: string): Promise<NormalizedEvent[]> {
    return [...this.events.values()]
      .filter((item) => item.workspaceId === workspaceId)
      .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
  }

  async upsertDelivery(delivery: DeliveryRecord): Promise<void> {
    this.deliveries.set(delivery.id, delivery);
  }

  async listDeliveries(workspaceId: string): Promise<DeliveryRecord[]> {
    return [...this.deliveries.values()].filter((item) => item.workspaceId === workspaceId);
  }
}

const singleton = new MemoryRepository();

export function getRepository(): Repository {
  return singleton;
}
