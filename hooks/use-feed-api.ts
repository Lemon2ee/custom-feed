"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

export interface OutputRecord {
  id: string;
  pluginId: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface EventRecord {
  id: string;
  title: string;
  sourceType: string;
  publishedAt?: string;
}

export interface PluginRecord {
  id: string;
  pluginId: string;
  version: string;
  enabled: boolean;
}

export type FieldType = "text" | "url" | "number" | "password";

export interface ConnectorConfigField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
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
    values[field.key] = "";
  }
  return values;
}

export function useFeedApi() {
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [outputs, setOutputs] = useState<OutputRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [plugins, setPlugins] = useState<PluginRecord[]>([]);
  const [catalog, setCatalog] = useState<ConnectorCatalog>({
    inputs: [],
    outputs: [],
  });
  const [autoPoll, setAutoPoll] = useState<AutoPollStatus>({
    running: false,
    tickIntervalSec: 30,
    sources: [],
  });
  const [statusMessage, setStatusMessageRaw] = useState("Ready");
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>(null);

  function setStatusMessage(msg: string) {
    setStatusMessageRaw(msg);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    if (msg !== "Ready") {
      dismissTimer.current = setTimeout(() => setStatusMessageRaw("Ready"), 3000);
    }
  }

  const refresh = useCallback(async () => {
    const [
      sourcesRes,
      outputsRes,
      eventsRes,
      pluginsRes,
      catalogRes,
      autoPollRes,
    ] = await Promise.all([
      jsonFetch<{ data: SourceRecord[] }>("/api/sources"),
      jsonFetch<{ data: OutputRecord[] }>("/api/outputs"),
      jsonFetch<{ data: EventRecord[] }>("/api/events"),
      jsonFetch<{ data: PluginRecord[] }>("/api/plugins"),
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
    setPlugins(pluginsRes.data);
    setCatalog(safeCatalog);
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
    await jsonFetch("/api/sources", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setStatusMessage(`Source saved.`);
    await refresh();
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
    },
  ) {
    await jsonFetch(`/api/sources/${sourceId}`, {
      method: "PATCH",
      body: JSON.stringify(edits),
    });
    setStatusMessage("Source updated.");
    await refresh();
  }

  async function deleteSource(sourceId: string) {
    await jsonFetch(`/api/sources/${sourceId}`, {
      method: "DELETE",
    });
    setStatusMessage("Source deleted.");
    await refresh();
  }

  async function createOutput(payload: {
    pluginId: string;
    config: Record<string, string | number>;
  }) {
    await jsonFetch("/api/outputs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setStatusMessage(`Output saved.`);
    await refresh();
  }

  async function updateOutput(
    outputId: string,
    edits: { config?: Record<string, unknown>; enabled?: boolean },
  ) {
    await jsonFetch(`/api/outputs/${outputId}`, {
      method: "PATCH",
      body: JSON.stringify(edits),
    });
    setStatusMessage("Output updated.");
    await refresh();
  }

  async function deleteOutput(outputId: string) {
    await jsonFetch(`/api/outputs/${outputId}`, {
      method: "DELETE",
    });
    setStatusMessage("Output deleted.");
    await refresh();
  }

  async function runWorkers() {
    await jsonFetch("/api/workers/run", { method: "POST" });
    setStatusMessage("Ingest + delivery workers executed.");
    await refresh();
  }

  async function toggleAutoPoll() {
    const action = autoPoll.running ? "stop" : "start";
    await jsonFetch("/api/workers/auto-poll", {
      method: "POST",
      body: JSON.stringify({ action }),
    });
    setStatusMessage(
      action === "start" ? "Auto-poll started." : "Auto-poll stopped.",
    );
    await refresh();
  }

  return {
    sources,
    outputs,
    events,
    plugins,
    catalog,
    autoPoll,
    statusMessage,
    setStatusMessage,
    refresh,
    createSource,
    saveSourceEdits,
    deleteSource,
    createOutput,
    updateOutput,
    deleteOutput,
    runWorkers,
    toggleAutoPoll,
  };
}
