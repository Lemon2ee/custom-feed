"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useFeedApi,
  getInitialValues,
  toPayloadConfig,
  splitKeywordCsv,
  type SourceEditState,
} from "@/hooks/use-feed-api";

export default function SourcesPage() {
  const {
    sources,
    outputs,
    catalog,
    statusMessage,
    createSource,
    saveSourceEdits,
    deleteSource,
  } = useFeedApi();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sourceConnectorId, setSourceConnectorId] = useState("");
  const [sourceConfig, setSourceConfig] = useState<Record<string, string>>({});
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceIncludeKeywords, setNewSourceIncludeKeywords] = useState("");
  const [newSourceExcludeKeywords, setNewSourceExcludeKeywords] = useState("");
  const [selectedSourceOutputIds, setSelectedSourceOutputIds] = useState<
    string[]
  >([]);
  const [newSourcePollInterval, setNewSourcePollInterval] = useState("300");

  const [sourceEdits, setSourceEdits] = useState<
    Record<string, SourceEditState>
  >({});
  const [expandedSourceIds, setExpandedSourceIds] = useState<Set<string>>(
    new Set(),
  );
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");

  const selectedInput = catalog.inputs.find(
    (item) => item.id === sourceConnectorId,
  );

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

  function getEdits(source: (typeof sources)[0]): SourceEditState {
    return (
      sourceEdits[source.id] ?? {
        name: source.name,
        includeKeywords: (source.filter?.includeKeywords ?? []).join(", "),
        excludeKeywords: (source.filter?.excludeKeywords ?? []).join(", "),
        outputIds: source.outputIds ?? [],
        pollIntervalSec: String(source.pollIntervalSec ?? 300),
      }
    );
  }

  function handleOpenDialog() {
    if (catalog.inputs.length > 0 && !sourceConnectorId) {
      const defaultInput =
        catalog.inputs.find((item) => item.id === "bilibili") ??
        catalog.inputs[0];
      setSourceConnectorId(defaultInput.id);
      setSourceConfig(getInitialValues(defaultInput.configFields));
    }
    if (outputs.length > 0 && selectedSourceOutputIds.length === 0) {
      setSelectedSourceOutputIds([outputs[0].id]);
    }
    setDialogOpen(true);
  }

  async function handleCreateSource() {
    if (!selectedInput) return;
    if (!selectedSourceOutputIds.length) return;
    const pollSec = Number(newSourcePollInterval);
    await createSource({
      pluginId: selectedInput.id,
      name: newSourceName.trim() || undefined,
      outputIds: selectedSourceOutputIds,
      filter: {
        includeKeywords: splitKeywordCsv(newSourceIncludeKeywords),
        excludeKeywords: splitKeywordCsv(newSourceExcludeKeywords),
      },
      config: toPayloadConfig(selectedInput.configFields, sourceConfig),
      pollIntervalSec: Number.isFinite(pollSec) && pollSec > 0 ? pollSec : 300,
    });
    setDialogOpen(false);
    setSourceConfig(
      selectedInput ? getInitialValues(selectedInput.configFields) : {},
    );
    setNewSourceName("");
    setNewSourceIncludeKeywords("");
    setNewSourceExcludeKeywords("");
    setNewSourcePollInterval("300");
  }

  async function handleSaveEdits(sourceId: string) {
    const edits = sourceEdits[sourceId];
    if (!edits) return;
    const pollSec = Number(edits.pollIntervalSec);
    await saveSourceEdits(sourceId, {
      name: edits.name.trim() || undefined,
      outputIds: edits.outputIds,
      filter: {
        includeKeywords: splitKeywordCsv(edits.includeKeywords),
        excludeKeywords: splitKeywordCsv(edits.excludeKeywords),
      },
      pollIntervalSec:
        Number.isFinite(pollSec) && pollSec > 0 ? pollSec : undefined,
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Sources</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage input feeds and their polling configuration.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Source</DialogTitle>
              <DialogDescription>
                Configure a new input connector to poll for content.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Select
                value={sourceConnectorId || undefined}
                onValueChange={(nextId) => {
                  setSourceConnectorId(nextId);
                  const next = catalog.inputs.find(
                    (item) => item.id === nextId,
                  );
                  setSourceConfig(
                    next ? getInitialValues(next.configFields) : {},
                  );
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
                    onChange={(e) =>
                      setSourceConfig((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Source Name</label>
                <Input
                  placeholder="My YouTube Source"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500">
                  Include Keywords (comma-separated)
                </label>
                <Input
                  placeholder="vlog, travel"
                  value={newSourceIncludeKeywords}
                  onChange={(e) => setNewSourceIncludeKeywords(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500">
                  Exclude Keywords (comma-separated)
                </label>
                <Input
                  placeholder="shorts, live"
                  value={newSourceExcludeKeywords}
                  onChange={(e) => setNewSourceExcludeKeywords(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500">
                  Poll Interval (seconds)
                </label>
                <Input
                  type="number"
                  min={10}
                  placeholder="300"
                  value={newSourcePollInterval}
                  onChange={(e) => setNewSourcePollInterval(e.target.value)}
                />
              </div>

              <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
                <p className="text-xs text-zinc-500">
                  Route this source to outputs
                </p>
                {outputs.length === 0 ? (
                  <p className="text-xs text-zinc-500">
                    No outputs available yet.
                  </p>
                ) : (
                  outputs.map((output) => (
                    <label
                      key={output.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSourceOutputIds.includes(output.id)}
                        onChange={(e) => {
                          setSelectedSourceOutputIds((prev) => {
                            if (e.target.checked) return [...prev, output.id];
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

              <Button
                className="w-full"
                onClick={handleCreateSource}
                disabled={!selectedInput}
              >
                Add Source
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {statusMessage !== "Ready" && <Badge>{statusMessage}</Badge>}

      <Card>
        <CardHeader>
          <CardTitle>
            {sources.length} source{sources.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sources.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No sources yet. Add one to get started.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  className="pl-9"
                  placeholder="Search by name, plugin, or config value..."
                  value={sourceSearchQuery}
                  onChange={(e) => setSourceSearchQuery(e.target.value)}
                />
              </div>

              {filteredSources.length === 0 && (
                <p className="text-sm text-zinc-500">
                  No sources match &ldquo;{sourceSearchQuery}&rdquo;
                </p>
              )}

              {filteredSources.map((source) => {
                const edits = getEdits(source);
                const isExpanded = expandedSourceIds.has(source.id);
                return (
                  <div
                    key={source.id}
                    className="rounded-md border border-zinc-200 dark:border-zinc-800"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      onClick={() =>
                        setExpandedSourceIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(source.id)) next.delete(source.id);
                          else next.add(source.id);
                          return next;
                        })
                      }
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                      )}
                      <span className="truncate text-sm font-medium">
                        {source.name || source.pluginId}
                      </span>
                      <span className="ml-auto shrink-0 text-xs text-zinc-500">
                        {source.pluginId} · {source.id.slice(0, 6)}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
                        <Input
                          value={edits.name}
                          placeholder="Source name"
                          onChange={(e) =>
                            setSourceEdits((prev) => ({
                              ...prev,
                              [source.id]: { ...edits, name: e.target.value },
                            }))
                          }
                        />
                        <Input
                          value={edits.includeKeywords}
                          placeholder="Include keywords (comma-separated)"
                          onChange={(e) =>
                            setSourceEdits((prev) => ({
                              ...prev,
                              [source.id]: {
                                ...edits,
                                includeKeywords: e.target.value,
                              },
                            }))
                          }
                        />
                        <Input
                          value={edits.excludeKeywords}
                          placeholder="Exclude keywords (comma-separated)"
                          onChange={(e) =>
                            setSourceEdits((prev) => ({
                              ...prev,
                              [source.id]: {
                                ...edits,
                                excludeKeywords: e.target.value,
                              },
                            }))
                          }
                        />
                        <div className="space-y-1">
                          <label className="text-xs text-zinc-500">
                            Poll Interval (seconds)
                          </label>
                          <Input
                            type="number"
                            min={10}
                            value={edits.pollIntervalSec}
                            onChange={(e) =>
                              setSourceEdits((prev) => ({
                                ...prev,
                                [source.id]: {
                                  ...edits,
                                  pollIntervalSec: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
                          <p className="text-xs text-zinc-500">
                            Route this source to outputs
                          </p>
                          {outputs.length === 0 ? (
                            <p className="text-xs text-zinc-500">
                              No outputs available yet.
                            </p>
                          ) : (
                            outputs.map((output) => (
                              <label
                                key={output.id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={edits.outputIds.includes(output.id)}
                                  onChange={(e) =>
                                    setSourceEdits((prev) => ({
                                      ...prev,
                                      [source.id]: {
                                        ...edits,
                                        outputIds: e.target.checked
                                          ? [...edits.outputIds, output.id]
                                          : edits.outputIds.filter(
                                              (id) => id !== output.id,
                                            ),
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
                            onClick={() => void handleSaveEdits(source.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => void deleteSource(source.id)}
                          >
                            Delete
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
    </div>
  );
}
