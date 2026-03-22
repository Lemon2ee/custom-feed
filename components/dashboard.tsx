"use client";

import { useEffect, useState } from "react";
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
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newRule, setNewRule] = useState("vlog");
  const [statusMessage, setStatusMessage] = useState("Ready");

  async function refresh() {
    const [sourcesRes, outputsRes, rulesRes, eventsRes, pluginsRes] = await Promise.all([
      jsonFetch<{ data: SourceRecord[] }>("/api/sources"),
      jsonFetch<{ data: OutputRecord[] }>("/api/outputs"),
      jsonFetch<{ data: RuleRecord[] }>("/api/rules"),
      jsonFetch<{ data: EventRecord[] }>("/api/events"),
      jsonFetch<{ data: PluginRecord[] }>("/api/plugins"),
    ]);
    setSources(sourcesRes.data);
    setOutputs(outputsRes.data);
    setRules(rulesRes.data);
    setEvents(eventsRes.data);
    setPlugins(pluginsRes.data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  async function createRssSource() {
    await jsonFetch("/api/sources", {
      method: "POST",
      body: JSON.stringify({
        pluginId: "rss",
        config: { feedUrl: newFeedUrl },
      }),
    });
    setStatusMessage("RSS source saved.");
    setNewFeedUrl("");
    await refresh();
  }

  async function createNtfyOutput() {
    await jsonFetch("/api/outputs", {
      method: "POST",
      body: JSON.stringify({
        pluginId: "ntfy",
        config: { topic: newTopic, baseUrl: "https://ntfy.sh" },
      }),
    });
    setStatusMessage("ntfy output saved.");
    setNewTopic("");
    await refresh();
  }

  async function createVlogRule() {
    if (!outputs.length) {
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
        action: { outputIds: [outputs[0].id] },
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
            <Input
              placeholder="https://example.com/feed.xml"
              value={newFeedUrl}
              onChange={(event) => setNewFeedUrl(event.target.value)}
            />
            <Button
              className="w-full"
              onClick={createRssSource}
              disabled={!newFeedUrl}
            >
              Add RSS Source
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
            <Input
              placeholder="ntfy topic"
              value={newTopic}
              onChange={(event) => setNewTopic(event.target.value)}
            />
            <Button
              className="w-full"
              variant="secondary"
              onClick={createNtfyOutput}
              disabled={!newTopic}
            >
              Add ntfy Output
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
            <Button className="w-full" variant="outline" onClick={createVlogRule}>
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
