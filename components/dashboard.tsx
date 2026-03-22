"use client";

import { useCallback, useEffect, useState } from "react";
import { BellRing, Cable, Filter, PlugZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface SourceRecord {
  id: string;
  pluginId: string;
  enabled: boolean;
}

interface OutputRecord {
  id: string;
  pluginId: string;
  enabled: boolean;
}

interface RuleRecord {
  id: string;
  name: string;
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
  const [rules, setRules] = useState<RuleRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [plugins, setPlugins] = useState<PluginRecord[]>([]);
  const [catalog, setCatalog] = useState<ConnectorCatalog>({
    inputs: [],
    outputs: [],
  });
  const [sourceConnectorId, setSourceConnectorId] = useState("");
  const [outputConnectorId, setOutputConnectorId] = useState("");
  const [sourceConfig, setSourceConfig] = useState<Record<string, string>>({});
  const [outputConfig, setOutputConfig] = useState<Record<string, string>>({});
  const [newRule, setNewRule] = useState("vlog");
  const [selectedRuleOutputIds, setSelectedRuleOutputIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("Ready");

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
    const [sourcesRes, outputsRes, rulesRes, eventsRes, pluginsRes, catalogRes] = await Promise.all([
      jsonFetch<{ data: SourceRecord[] }>("/api/sources"),
      jsonFetch<{ data: OutputRecord[] }>("/api/outputs"),
      jsonFetch<{ data: RuleRecord[] }>("/api/rules"),
      jsonFetch<{ data: EventRecord[] }>("/api/events"),
      jsonFetch<{ data: PluginRecord[] }>("/api/plugins"),
      jsonFetch<{ data: ConnectorCatalog }>("/api/catalog"),
    ]);
    const safeCatalog: ConnectorCatalog = {
      inputs: catalogRes.data?.inputs ?? [],
      outputs: catalogRes.data?.outputs ?? [],
    };
    setSources(sourcesRes.data);
    setOutputs(outputsRes.data);
    setRules(rulesRes.data);
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
      setSelectedRuleOutputIds((prev) =>
        prev.length > 0 ? prev : [outputsRes.data[0].id],
      );
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  const selectedInput = catalog.inputs.find((item) => item.id === sourceConnectorId);
  const selectedOutput = catalog.outputs.find((item) => item.id === outputConnectorId);

  async function createSource() {
    if (!selectedInput) return;
    await jsonFetch("/api/sources", {
      method: "POST",
      body: JSON.stringify({
        pluginId: selectedInput.id,
        config: toPayloadConfig(selectedInput.configFields, sourceConfig),
      }),
    });
    setStatusMessage(`${selectedInput.name} source saved.`);
    setSourceConfig(getInitialValues(selectedInput.configFields));
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

  async function createRule() {
    if (!selectedRuleOutputIds.length) {
      setStatusMessage("Create an output first so the rule has a target.");
      return;
    }
    await jsonFetch("/api/rules", {
      method: "POST",
      body: JSON.stringify({
        name: "Vlog only filter",
        priority: 10,
        enabled: true,
        condition: { includeKeywords: [newRule] },
        action: { outputIds: selectedRuleOutputIds },
      }),
    });
    setStatusMessage("Rule saved.");
    await refresh();
  }

  async function runWorkers() {
    await jsonFetch("/api/workers/run", { method: "POST" });
    setStatusMessage("Ingest + delivery workers executed.");
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

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cable className="h-4 w-4" /> Source Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
              value={sourceConnectorId}
              onChange={(event) => {
                const nextId = event.target.value;
                setSourceConnectorId(nextId);
                const next = catalog.inputs.find((item) => item.id === nextId);
                setSourceConfig(next ? getInitialValues(next.configFields) : {});
              }}
            >
              {catalog.inputs.map((connector) => (
                <option key={connector.id} value={connector.id}>
                  {connector.name}
                </option>
              ))}
            </select>
            {selectedInput?.configFields.map((field) => (
              <Input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={sourceConfig[field.key] ?? ""}
                onChange={(event) =>
                  setSourceConfig((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
              />
            ))}
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
            <select
              className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
              value={outputConnectorId}
              onChange={(event) => {
                const nextId = event.target.value;
                setOutputConnectorId(nextId);
                const next = catalog.outputs.find((item) => item.id === nextId);
                setOutputConfig(next ? getInitialValues(next.configFields) : {});
              }}
            >
              {catalog.outputs.map((connector) => (
                <option key={connector.id} value={connector.id}>
                  {connector.name}
                </option>
              ))}
            </select>
            {selectedOutput?.configFields.map((field) => (
              <Input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={outputConfig[field.key] ?? ""}
                onChange={(event) =>
                  setOutputConfig((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
              />
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Rule Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={newRule}
              onChange={(event) => setNewRule(event.target.value)}
            />
            <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">Route to outputs</p>
              {outputs.length === 0 ? (
                <p className="text-xs text-zinc-500">No outputs available yet.</p>
              ) : (
                outputs.map((output) => (
                  <label key={output.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedRuleOutputIds.includes(output.id)}
                      onChange={(event) => {
                        setSelectedRuleOutputIds((prev) => {
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
            <Button className="w-full" variant="outline" onClick={createRule}>
              Save Keyword Rule
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
          <CardContent className="text-sm">
            <p>Sources: {sources.length}</p>
            <p>Outputs: {outputs.length}</p>
            <p>Rules: {rules.length}</p>
            <Button className="mt-2" onClick={runWorkers}>
              Run Workers
            </Button>
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
