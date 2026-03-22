"use client";

import { useCallback, useEffect, useState } from "react";
import { BellRing, Cable, ChevronDown, ChevronRight, PlugZap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceRecord {
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

interface OutputRecord {
  id: string;
  pluginId: string;
  enabled: boolean;
}

interface EventRecord {
  id: string;
  title: string;
  sourceType: string;
  publishedAt?: string;
}

interface PluginRecord {
  id: string;
  pluginId: string;
  version: string;
  enabled: boolean;
}

type FieldType = "text" | "url" | "number" | "password";

interface ConnectorConfigField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
}

interface ConnectorCatalogItem {
  id: string;
  kind: "input" | "output";
  name: string;
  description: string;
  configFields: ConnectorConfigField[];
}

interface ConnectorCatalog {
  inputs: ConnectorCatalogItem[];
  outputs: ConnectorCatalogItem[];
}

interface SourceEditState {
  name: string;
  includeKeywords: string;
  excludeKeywords: string;
  outputIds: string[];
  pollIntervalSec: string;
}

interface AutoPollStatus {
  running: boolean;
  tickIntervalSec: number;
  sources: Array<{ id: string; lastPolledAt: string | null; pollIntervalSec: number }>;
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

export function Dashboard() {
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [outputs, setOutputs] = useState<OutputRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [plugins, setPlugins] = useState<PluginRecord[]>([]);
  const [catalog, setCatalog] = useState<ConnectorCatalog>({
    inputs: [],
    outputs: [],
  });
  const [sourceConnectorId, setSourceConnectorId] = useState("");
  const [outputConnectorId, setOutputConnectorId] = useState("");
  const [sourceConfig, setSourceConfig] = useState<Record<string, string>>({});
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceIncludeKeywords, setNewSourceIncludeKeywords] = useState("");
  const [newSourceExcludeKeywords, setNewSourceExcludeKeywords] = useState("");
  const [selectedSourceOutputIds, setSelectedSourceOutputIds] = useState<string[]>(
    [],
  );
  const [outputConfig, setOutputConfig] = useState<Record<string, string>>({});
  const [sourceEdits, setSourceEdits] = useState<Record<string, SourceEditState>>({});
  const [expandedSourceIds, setExpandedSourceIds] = useState<Set<string>>(new Set());
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");
  const [newSourcePollInterval, setNewSourcePollInterval] = useState("300");
  const [autoPoll, setAutoPoll] = useState<AutoPollStatus>({
    running: false,
    tickIntervalSec: 30,
    sources: [],
  });
  const [statusMessage, setStatusMessage] = useState("Ready");

  function splitKeywordCsv(value: string): string[] {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function parseConfigValue(type: FieldType, value: string): string | number {
    if (type === "number") {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? 0 : parsed;
    }
    return value;
  }

  function toPayloadConfig(
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

  function getInitialValues(fields: ConnectorConfigField[]): Record<string, string> {
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

  const refresh = useCallback(async () => {
    const [sourcesRes, outputsRes, eventsRes, pluginsRes, catalogRes, autoPollRes] = await Promise.all([
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
    if (safeCatalog.inputs.length > 0) {
      const firstInput = safeCatalog.inputs[0];
      setSourceConnectorId((prev) => prev || firstInput.id);
      setSourceConfig((prev) =>
        Object.keys(prev).length > 0 ? prev : getInitialValues(firstInput.configFields),
      );
    }
    if (safeCatalog.outputs.length > 0) {
      const firstOutput = safeCatalog.outputs[0];
      setOutputConnectorId((prev) => prev || firstOutput.id);
      setOutputConfig((prev) =>
        Object.keys(prev).length > 0
          ? prev
          : getInitialValues(firstOutput.configFields),
      );
    }
    if (outputsRes.data.length > 0) {
      setSelectedSourceOutputIds((prev) =>
        prev.length > 0 ? prev : [outputsRes.data[0].id],
      );
    }
    setSourceEdits((prev) => {
      const next: Record<string, SourceEditState> = {};
      for (const source of sourcesRes.data) {
        next[source.id] = prev[source.id] ?? {
          name: source.name,
          includeKeywords: (source.filter?.includeKeywords ?? []).join(", "),
          excludeKeywords: (source.filter?.excludeKeywords ?? []).join(", "),
          outputIds: source.outputIds ?? [],
          pollIntervalSec: String(source.pollIntervalSec ?? 300),
        };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  const selectedInput = catalog.inputs.find((item) => item.id === sourceConnectorId);
  const selectedOutput = catalog.outputs.find((item) => item.id === outputConnectorId);

  const filteredSources = sources.filter((source) => {
    if (!sourceSearchQuery.trim()) return true;
    const q = sourceSearchQuery.toLowerCase();
    if (source.name.toLowerCase().includes(q)) return true;
    if (source.pluginId.toLowerCase().includes(q)) return true;
    if (source.id.toLowerCase().includes(q)) return true;
    return Object.values(source.config).some(
      (v) => typeof v === "string" && v.toLowerCase().includes(q),
    );
  });

  async function createSource() {
    if (!selectedInput) return;
    if (!selectedSourceOutputIds.length) {
      setStatusMessage("Pick at least one output for this source.");
      return;
    }
    const pollSec = Number(newSourcePollInterval);
    await jsonFetch("/api/sources", {
      method: "POST",
      body: JSON.stringify({
        pluginId: selectedInput.id,
        name: newSourceName.trim() || undefined,
        outputIds: selectedSourceOutputIds,
        filter: {
          includeKeywords: splitKeywordCsv(newSourceIncludeKeywords),
          excludeKeywords: splitKeywordCsv(newSourceExcludeKeywords),
        },
        config: toPayloadConfig(selectedInput.configFields, sourceConfig),
        pollIntervalSec: Number.isFinite(pollSec) && pollSec > 0 ? pollSec : 300,
      }),
    });
    setStatusMessage(`${selectedInput.name} source saved.`);
    setSourceConfig(getInitialValues(selectedInput.configFields));
    setNewSourceName("");
    setNewSourceIncludeKeywords("");
    setNewSourceExcludeKeywords("");
    setNewSourcePollInterval("300");
    await refresh();
  }

  async function saveSourceEdits(sourceId: string) {
    const edits = sourceEdits[sourceId];
    if (!edits) return;
    const pollSec = Number(edits.pollIntervalSec);
    await jsonFetch(`/api/sources/${sourceId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: edits.name.trim() || undefined,
        outputIds: edits.outputIds,
        filter: {
          includeKeywords: splitKeywordCsv(edits.includeKeywords),
          excludeKeywords: splitKeywordCsv(edits.excludeKeywords),
        },
        pollIntervalSec: Number.isFinite(pollSec) && pollSec > 0 ? pollSec : undefined,
      }),
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

  async function createOutput() {
    if (!selectedOutput) return;
    await jsonFetch("/api/outputs", {
      method: "POST",
      body: JSON.stringify({
        pluginId: selectedOutput.id,
        config: toPayloadConfig(selectedOutput.configFields, outputConfig),
      }),
    });
    setStatusMessage(`${selectedOutput.name} output saved.`);
    setOutputConfig(getInitialValues(selectedOutput.configFields));
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
    setStatusMessage(action === "start" ? "Auto-poll started." : "Auto-poll stopped.");
    await refresh();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Custom Feed Middleware</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Unified input connectors, deterministic rule filtering, and multi-channel outputs.
        </p>
        <Badge>{statusMessage}</Badge>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cable className="h-4 w-4" /> Source Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={sourceConnectorId || undefined}
              onValueChange={(nextId) => {
                setSourceConnectorId(nextId);
                const next = catalog.inputs.find((item) => item.id === nextId);
                setSourceConfig(next ? getInitialValues(next.configFields) : {});
              }}
              disabled={catalog.inputs.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source connector" />
              </SelectTrigger>
              <SelectContent>
                {catalog.inputs.map((connector) => (
                  <SelectItem key={connector.id} value={connector.id}>
                    {connector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedInput?.configFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs text-zinc-500">
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder || field.label}
                  value={sourceConfig[field.key] ?? ""}
                  onChange={(event) =>
                    setSourceConfig((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Source Name</label>
              <Input
                placeholder="My YouTube Source"
                value={newSourceName}
                onChange={(event) => setNewSourceName(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">
                Source Filter: Include Keywords (comma-separated)
              </label>
              <Input
                placeholder="vlog, travel"
                value={newSourceIncludeKeywords}
                onChange={(event) => setNewSourceIncludeKeywords(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">
                Source Filter: Exclude Keywords (comma-separated)
              </label>
              <Input
                placeholder="shorts, live"
                value={newSourceExcludeKeywords}
                onChange={(event) => setNewSourceExcludeKeywords(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Poll Interval (seconds)</label>
              <Input
                type="number"
                min={10}
                placeholder="300"
                value={newSourcePollInterval}
                onChange={(event) => setNewSourcePollInterval(event.target.value)}
              />
            </div>
            <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Route this source to outputs</p>
              {outputs.length === 0 ? (
                <p className="text-xs text-zinc-500">No outputs available yet.</p>
              ) : (
                outputs.map((output) => (
                  <label key={output.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSourceOutputIds.includes(output.id)}
                      onChange={(event) => {
                        setSelectedSourceOutputIds((prev) => {
                          if (event.target.checked) return [...prev, output.id];
                          return prev.filter((id) => id !== output.id);
                        });
                      }}
                    />
                    <span>
                      {output.pluginId} ({output.id.slice(0, 6)})
                    </span>
                  </label>
                ))
              )}
            </div>
            <Button className="w-full" onClick={createSource} disabled={!selectedInput}>
              Add Source
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-4 w-4" /> Output Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={outputConnectorId || undefined}
              onValueChange={(nextId) => {
                setOutputConnectorId(nextId);
                const next = catalog.outputs.find((item) => item.id === nextId);
                setOutputConfig(next ? getInitialValues(next.configFields) : {});
              }}
              disabled={catalog.outputs.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select output connector" />
              </SelectTrigger>
              <SelectContent>
                {catalog.outputs.map((connector) => (
                  <SelectItem key={connector.id} value={connector.id}>
                    {connector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedOutput?.configFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs text-zinc-500">
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder || field.label}
                  value={outputConfig[field.key] ?? ""}
                  onChange={(event) =>
                    setOutputConfig((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                />
              </div>
            ))}
            <Button
              className="w-full"
              variant="secondary"
              onClick={createOutput}
              disabled={!selectedOutput}
            >
              Add Output
            </Button>
          </CardContent>
        </Card>

      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlugZap className="h-4 w-4" /> Connector Status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Sources: {sources.length}</p>
            <p>Outputs: {outputs.length}</p>
            <div className="flex items-center gap-2">
              <Badge
                className={autoPoll.running
                  ? "border-green-500 text-green-700 dark:text-green-400"
                  : ""}
              >
                {autoPoll.running ? "Auto-poll running" : "Auto-poll stopped"}
              </Badge>
              {autoPoll.running && (
                <span className="text-xs text-zinc-500">
                  tick every {autoPoll.tickIntervalSec}s
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={autoPoll.running ? "destructive" : "default"}
                onClick={toggleAutoPoll}
              >
                {autoPoll.running ? "Stop Auto-Poll" : "Start Auto-Poll"}
              </Button>
              <Button variant="secondary" onClick={runWorkers}>
                Run Once
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-sm text-zinc-500">No events yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {events.slice(0, 8).map((event) => (
                  <li key={event.id} className="rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-zinc-500">
                      {event.sourceType} {event.publishedAt ? `· ${event.publishedAt}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Source Manager</CardTitle>
          </CardHeader>
          <CardContent>
            {sources.length === 0 ? (
              <p className="text-sm text-zinc-500">No sources yet.</p>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                  <Input
                    className="pl-9"
                    placeholder="Search by name, plugin, or config value…"
                    value={sourceSearchQuery}
                    onChange={(event) => setSourceSearchQuery(event.target.value)}
                  />
                </div>
                {filteredSources.length === 0 && (
                  <p className="text-sm text-zinc-500">
                    No sources match &ldquo;{sourceSearchQuery}&rdquo;
                  </p>
                )}
                {filteredSources.map((source) => {
                  const edits = sourceEdits[source.id] ?? {
                    name: source.name,
                    includeKeywords: "",
                    excludeKeywords: "",
                    outputIds: source.outputIds ?? [],
                    pollIntervalSec: String(source.pollIntervalSec ?? 300),
                  };
                  const isExpanded = expandedSourceIds.has(source.id);
                  return (
                    <div
                      key={source.id}
                      className="rounded-md border border-zinc-200 dark:border-zinc-800"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 p-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        onClick={() =>
                          setExpandedSourceIds((prev) => {
                            const next = new Set(prev);
                            if (next.has(source.id)) next.delete(source.id);
                            else next.add(source.id);
                            return next;
                          })
                        }
                      >
                        {isExpanded
                          ? <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                          : <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />}
                        <span className="font-medium text-sm truncate">
                          {source.name || source.pluginId}
                        </span>
                        <span className="ml-auto text-xs text-zinc-500 shrink-0">
                          {source.pluginId} · {source.id.slice(0, 6)}
                        </span>
                      </button>
                      {isExpanded && (
                        <div className="space-y-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
                          <Input
                            value={edits.name}
                            placeholder="Source name"
                            onChange={(event) =>
                              setSourceEdits((prev) => ({
                                ...prev,
                                [source.id]: { ...edits, name: event.target.value },
                              }))
                            }
                          />
                          <Input
                            value={edits.includeKeywords}
                            placeholder="Include keywords (comma-separated)"
                            onChange={(event) =>
                              setSourceEdits((prev) => ({
                                ...prev,
                                [source.id]: {
                                  ...edits,
                                  includeKeywords: event.target.value,
                                },
                              }))
                            }
                          />
                          <Input
                            value={edits.excludeKeywords}
                            placeholder="Exclude keywords (comma-separated)"
                            onChange={(event) =>
                              setSourceEdits((prev) => ({
                                ...prev,
                                [source.id]: {
                                  ...edits,
                                  excludeKeywords: event.target.value,
                                },
                              }))
                            }
                          />
                          <div className="space-y-1">
                            <label className="text-xs text-zinc-500">Poll Interval (seconds)</label>
                            <Input
                              type="number"
                              min={10}
                              value={edits.pollIntervalSec}
                              onChange={(event) =>
                                setSourceEdits((prev) => ({
                                  ...prev,
                                  [source.id]: {
                                    ...edits,
                                    pollIntervalSec: event.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
                            <p className="text-xs text-zinc-500">Route this source to outputs</p>
                            {outputs.length === 0 ? (
                              <p className="text-xs text-zinc-500">No outputs available yet.</p>
                            ) : (
                              outputs.map((output) => (
                                <label key={output.id} className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={edits.outputIds.includes(output.id)}
                                    onChange={(event) =>
                                      setSourceEdits((prev) => ({
                                        ...prev,
                                        [source.id]: {
                                          ...edits,
                                          outputIds: event.target.checked
                                            ? [...edits.outputIds, output.id]
                                            : edits.outputIds.filter((id) => id !== output.id),
                                        },
                                      }))
                                    }
                                  />
                                  <span>
                                    {output.pluginId} ({output.id.slice(0, 6)})
                                  </span>
                                </label>
                              ))
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              onClick={() => void saveSourceEdits(source.id)}
                            >
                              Save Source
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => void deleteSource(source.id)}
                            >
                              Delete Source
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Plugin Manager</CardTitle>
          </CardHeader>
          <CardContent>
            {plugins.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No third-party plugins installed yet.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {plugins.map((plugin) => (
                  <li
                    key={plugin.id}
                    className="flex items-center justify-between rounded-md border border-zinc-200 p-2 dark:border-zinc-800"
                  >
                    <div>
                      <p className="font-medium">{plugin.pluginId}</p>
                      <p className="text-xs text-zinc-500">v{plugin.version}</p>
                    </div>
                    <Badge>{plugin.enabled ? "enabled" : "disabled"}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
