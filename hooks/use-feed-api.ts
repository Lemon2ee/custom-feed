"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface SourceRecord {
  id: string;
  name: string;
  pluginId: string;
  config: Record<string, unknown>;
  outputIds: string[];
  filter?: {
    includeKeywords?: string[];
    excludeKeywords?: string[];
  };
  pollIntervalSec: number;
  enabled: boolean;
}

export interface OutputSchedule {
  timezone: string;
  windows: Array<{
    days: number[];
    startHour: number;
    endHour: number;
  }>;
}

export interface OutputRecord {
  id: string;
  pluginId: string;
  config: Record<string, unknown>;
  enabled: boolean;
  mutedUntil?: string;
  priority: number;
  schedule?: OutputSchedule;
}

export interface EventRecord {
  id: string;
  title: string;
  sourceType: string;
  publishedAt?: string;
}

export type FieldType = "text" | "url" | "number" | "password" | "select";

export interface ConnectorConfigField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface ConnectorCatalogItem {
  id: string;
  kind: "input" | "output";
  name: string;
  description: string;
  configFields: ConnectorConfigField[];
}

export interface ConnectorCatalog {
  inputs: ConnectorCatalogItem[];
  outputs: ConnectorCatalogItem[];
}

export interface SourceEditState {
  name: string;
  includeKeywords: string;
  excludeKeywords: string;
  outputIds: string[];
  pollIntervalSec: string;
  config: Record<string, string>;
}

export interface SourceItem {
  externalItemId: string;
  title: string;
  url?: string;
  contentText?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  authorImageUrl?: string;
  tags?: string[];
}

export interface AutoPollStatus {
  running: boolean;
  tickIntervalSec: number;
  sources: Array<{
    id: string;
    lastPolledAt: string | null;
    pollIntervalSec: number;
  }>;
}

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function splitKeywordCsv(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseConfigValue(
  type: FieldType,
  value: string,
): string | number {
  if (type === "number") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return value;
}

export function toPayloadConfig(
  fields: ConnectorConfigField[],
  values: Record<string, string>,
): Record<string, string | number> {
  const payload: Record<string, string | number> = {};
  for (const field of fields) {
    const raw = values[field.key] ?? "";
    if (!raw && !field.required) continue;
    payload[field.key] = parseConfigValue(field.type, raw);
  }
  return payload;
}

export function getInitialValues(
  fields: ConnectorConfigField[],
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    if (field.key === "limit") {
      values[field.key] = "20";
      continue;
    }
    if (field.key === "baseUrl") {
      values[field.key] = "https://ntfy.sh";
      continue;
    }
    if (field.key === "serverUrl") {
      values[field.key] = "https://api.day.app";
      continue;
    }
    if (field.type === "select" && field.options?.length) {
      values[field.key] = field.options[0].value;
      continue;
    }
    values[field.key] = "";
  }
  return values;
}

export function useFeedApi() {
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [outputs, setOutputs] = useState<OutputRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [catalog, setCatalog] = useState<ConnectorCatalog>({
    inputs: [],
    outputs: [],
  });
  const [autoPoll, setAutoPoll] = useState<AutoPollStatus>({
    running: false,
    tickIntervalSec: 30,
    sources: [],
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [
        sourcesRes,
        outputsRes,
        eventsRes,
        catalogRes,
        autoPollRes,
      ] = await Promise.all([
        jsonFetch<{ data: SourceRecord[] }>("/api/sources"),
        jsonFetch<{ data: OutputRecord[] }>("/api/outputs"),
        jsonFetch<{ data: EventRecord[] }>("/api/events"),
        jsonFetch<{ data: ConnectorCatalog }>("/api/catalog"),
        jsonFetch<{ data: AutoPollStatus }>("/api/workers/auto-poll"),
      ]);
      setAutoPoll(autoPollRes.data);
      const safeCatalog: ConnectorCatalog = {
        inputs: catalogRes.data?.inputs ?? [],
        outputs: catalogRes.data?.outputs ?? [],
      };
      setSources(sourcesRes.data);
      setOutputs(outputsRes.data);
      setEvents(eventsRes.data);
      setCatalog(safeCatalog);
    } catch {
      toast.error("Failed to load data. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  async function createSource(payload: {
    pluginId: string;
    name?: string;
    outputIds: string[];
    filter: {
      includeKeywords: string[];
      excludeKeywords: string[];
    };
    config: Record<string, string | number>;
    pollIntervalSec: number;
  }) {
    try {
      await jsonFetch("/api/sources", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Source saved.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create source");
      throw err;
    }
  }

  async function saveSourceEdits(
    sourceId: string,
    edits: {
      name?: string;
      outputIds: string[];
      filter: {
        includeKeywords: string[];
        excludeKeywords: string[];
      };
      pollIntervalSec?: number;
      config?: Record<string, string | number>;
    },
  ) {
    try {
      await jsonFetch(`/api/sources/${sourceId}`, {
        method: "PATCH",
        body: JSON.stringify(edits),
      });
      toast.success("Source updated.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update source");
      throw err;
    }
  }

  async function deleteSource(sourceId: string) {
    try {
      await jsonFetch(`/api/sources/${sourceId}`, {
        method: "DELETE",
      });
      toast.success("Source deleted.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete source");
      throw err;
    }
  }

  async function createOutput(payload: {
    pluginId: string;
    config: Record<string, string | number>;
  }) {
    try {
      await jsonFetch("/api/outputs", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Output saved.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create output");
      throw err;
    }
  }

  async function updateOutput(
    outputId: string,
    edits: {
      config?: Record<string, unknown>;
      enabled?: boolean;
      mutedUntil?: string | null;
      priority?: number;
      schedule?: OutputSchedule | null;
    },
  ) {
    try {
      await jsonFetch(`/api/outputs/${outputId}`, {
        method: "PATCH",
        body: JSON.stringify(edits),
      });
      toast.success("Output updated.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update output");
      throw err;
    }
  }

  async function deleteOutput(outputId: string) {
    try {
      await jsonFetch(`/api/outputs/${outputId}`, {
        method: "DELETE",
      });
      toast.success("Output deleted.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete output");
      throw err;
    }
  }

  async function testOutput(
    outputId: string,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch(`/api/outputs/${outputId}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const body = (await res.json()) as {
        ok?: boolean;
        error?: string;
        result?: { error?: string };
      };
      if (res.ok) {
        toast.success("Test notification sent!");
        return { ok: true };
      }
      const msg =
        body.error ?? body.result?.error ?? `Test failed (${res.status})`;
      toast.error(`Test failed: ${msg}`);
      return { ok: false, error: msg };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Test failed: ${msg}`);
      return { ok: false, error: msg };
    }
  }

  async function fetchSourceItems(
    sourceId: string,
  ): Promise<{ ok: boolean; items: SourceItem[]; error?: string }> {
    try {
      const res = await fetch(`/api/sources/${sourceId}/items`);
      const body = (await res.json()) as { data?: SourceItem[]; error?: string };
      if (!res.ok) {
        const msg = body.error ?? `Failed to fetch items (${res.status})`;
        toast.error(msg);
        return { ok: false, items: [], error: msg };
      }
      return { ok: true, items: body.data ?? [] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Fetch items failed: ${msg}`);
      return { ok: false, items: [], error: msg };
    }
  }

  async function testSourceDelivery(
    sourceId: string,
    item: SourceItem,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch(`/api/sources/${sourceId}/test-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const body = (await res.json()) as {
        ok?: boolean;
        results?: Array<{ status: string; error?: string }>;
      };
      if (body.ok) {
        toast.success("Test delivery sent!");
        return { ok: true };
      }
      const failedResults = body.results?.filter((r) => r.status !== "sent") ?? [];
      const msg = failedResults.length > 0
        ? failedResults.map((r) => r.error).filter(Boolean).join("; ") || "Some outputs failed"
        : `Test delivery failed (${res.status})`;
      toast.error(`Test delivery: ${msg}`);
      return { ok: false, error: msg };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Test delivery failed: ${msg}`);
      return { ok: false, error: msg };
    }
  }

  async function runWorkers() {
    try {
      await jsonFetch("/api/workers/run", { method: "POST" });
      toast.success("Ingest + delivery workers executed.");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to run workers");
      throw err;
    }
  }

  async function toggleAutoPoll() {
    const action = autoPoll.running ? "stop" : "start";
    try {
      await jsonFetch("/api/workers/auto-poll", {
        method: "POST",
        body: JSON.stringify({ action }),
      });
      toast.success(
        action === "start" ? "Auto-poll started." : "Auto-poll stopped.",
      );
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to toggle auto-poll");
      throw err;
    }
  }

  return {
    loading,
    sources,
    outputs,
    events,
    catalog,
    autoPoll,
    refresh,
    createSource,
    saveSourceEdits,
    deleteSource,
    createOutput,
    updateOutput,
    deleteOutput,
    testOutput,
    fetchSourceItems,
    testSourceDelivery,
    runWorkers,
    toggleAutoPoll,
  };
}
