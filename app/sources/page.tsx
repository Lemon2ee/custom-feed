"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Zap,
} from "lucide-react";
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
  type SourceItem,
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
    fetchSourceItems,
    testSourceDelivery,
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
  const [sourceItems, setSourceItems] = useState<Record<string, SourceItem[]>>({});
  const [loadingItemsIds, setLoadingItemsIds] = useState<Set<string>>(new Set());
  const [sendingItemKeys, setSendingItemKeys] = useState<Set<string>>(new Set());

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
        config: Object.fromEntries(
          Object.entries(source.config).map(([k, v]) => [k, String(v ?? "")]),
        ),
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

  async function handleFetchItems(sourceId: string) {
    setLoadingItemsIds((prev) => new Set(prev).add(sourceId));
    try {
      const result = await fetchSourceItems(sourceId);
      if (result.ok) {
        setSourceItems((prev) => ({ ...prev, [sourceId]: result.items }));
      }
    } finally {
      setLoadingItemsIds((prev) => {
        const next = new Set(prev);
        next.delete(sourceId);
        return next;
      });
    }
  }

  async function handleTestDelivery(sourceId: string, item: SourceItem) {
    const key = `${sourceId}:${item.externalItemId}`;
    setSendingItemKeys((prev) => new Set(prev).add(key));
    try {
      await testSourceDelivery(sourceId, item);
    } finally {
      setSendingItemKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }

  function getMaxItems(source: (typeof sources)[0]): number {
    const limit = source.config.limit;
    if (typeof limit === "number" && limit > 0) return limit;
    if (typeof limit === "string") {
      const n = Number(limit);
      if (n > 0) return n;
    }
    return 20;
  }

  async function handleSaveEdits(sourceId: string) {
    const edits = sourceEdits[sourceId];
    if (!edits) return;
    const source = sources.find((s) => s.id === sourceId);
    const inputCatalog = source
      ? catalog.inputs.find((c) => c.id === source.pluginId)
      : undefined;
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
      config: inputCatalog
        ? toPayloadConfig(inputCatalog.configFields, edits.config)
        : undefined,
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
                        <div className="space-y-1">
                          <label className="text-xs text-zinc-500">
                            Source Name
                          </label>
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
                        </div>
                        {catalog.inputs
                          .find((c) => c.id === source.pluginId)
                          ?.configFields.map((field) => (
                            <div key={field.key} className="space-y-1">
                              <label className="text-xs text-zinc-500">
                                {field.label}
                              </label>
                              <Input
                                type={field.type}
                                placeholder={field.placeholder || field.label}
                                value={edits.config[field.key] ?? ""}
                                onChange={(e) =>
                                  setSourceEdits((prev) => ({
                                    ...prev,
                                    [source.id]: {
                                      ...edits,
                                      config: {
                                        ...edits.config,
                                        [field.key]: e.target.value,
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>
                          ))}
                        <div className="space-y-1">
                          <label className="text-xs text-zinc-500">
                            Include Keywords (comma-separated)
                          </label>
                          <Input
                            value={edits.includeKeywords}
                            placeholder="vlog, travel"
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
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-zinc-500">
                            Exclude Keywords (comma-separated)
                          </label>
                          <Input
                            value={edits.excludeKeywords}
                            placeholder="shorts, live"
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
                        </div>
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
                        <div className="space-y-2 rounded-md border border-zinc-200 p-2 dark:border-zinc-800">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-zinc-500">
                              Recent Items
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              disabled={loadingItemsIds.has(source.id)}
                              onClick={() =>
                                void handleFetchItems(source.id)
                              }
                            >
                              {loadingItemsIds.has(source.id) ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : (
                                <RefreshCw className="mr-1 h-3 w-3" />
                              )}
                              Fetch
                            </Button>
                          </div>
                          {sourceItems[source.id] ? (
                            sourceItems[source.id].length === 0 ? (
                              <p className="text-xs text-zinc-400">
                                No items returned.
                              </p>
                            ) : (
                              <div className="max-h-64 space-y-1 overflow-y-auto">
                                {sourceItems[source.id]
                                  .slice(0, getMaxItems(source))
                                  .map((item, idx) => {
                                    const key = `${source.id}:${item.externalItemId}`;
                                    const isSending = sendingItemKeys.has(key);
                                    return (
                                      <div
                                        key={item.externalItemId ?? idx}
                                        className="flex items-start gap-2 rounded border border-zinc-100 p-2 dark:border-zinc-800"
                                      >
                                        <div className="min-w-0 flex-1">
                                          <p className="truncate text-xs font-medium">
                                            {item.title}
                                          </p>
                                          {item.author && (
                                            <p className="truncate text-[11px] text-zinc-400">
                                              {item.author}
                                            </p>
                                          )}
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1">
                                          {item.url && (
                                            <a
                                              href={item.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              title="Open in new tab"
                                              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                            >
                                              <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                          )}
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            disabled={isSending || source.outputIds.length === 0}
                                            title={
                                              source.outputIds.length === 0
                                                ? "No outputs configured"
                                                : "Trigger test notification"
                                            }
                                            onClick={() =>
                                              void handleTestDelivery(
                                                source.id,
                                                item,
                                              )
                                            }
                                          >
                                            {isSending ? (
                                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                              <Zap className="h-3.5 w-3.5" />
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            )
                          ) : (
                            <p className="text-xs text-zinc-400">
                              Click Fetch to load recent items from this source.
                            </p>
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
