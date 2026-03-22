"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2, Plus, Zap } from "lucide-react";
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
  type ConnectorConfigField,
} from "@/hooks/use-feed-api";

export default function OutputsPage() {
  const {
    loading,
    outputs,
    catalog,
    createOutput,
    updateOutput,
    deleteOutput,
    testOutput,
  } = useFeedApi();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [outputConnectorId, setOutputConnectorId] = useState("");
  const [outputConfig, setOutputConfig] = useState<Record<string, string>>({});

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [editConfigs, setEditConfigs] = useState<
    Record<string, Record<string, string>>
  >({});
  const [testingIds, setTestingIds] = useState<Set<string>>(new Set());

  const selectedOutput = catalog.outputs.find(
    (item) => item.id === outputConnectorId,
  );

  function handleOpenDialog() {
    if (catalog.outputs.length > 0 && !outputConnectorId) {
      const defaultOutput =
        catalog.outputs.find((item) => item.id === "bark") ??
        catalog.outputs[0];
      setOutputConnectorId(defaultOutput.id);
      setOutputConfig(getInitialValues(defaultOutput.configFields));
    }
    setDialogOpen(true);
  }

  async function handleCreateOutput() {
    if (!selectedOutput) return;
    await createOutput({
      pluginId: selectedOutput.id,
      config: toPayloadConfig(selectedOutput.configFields, outputConfig),
    });
    setDialogOpen(false);
    setOutputConfig(
      selectedOutput ? getInitialValues(selectedOutput.configFields) : {},
    );
  }

  function getOutputPluginName(pluginId: string): string {
    return (
      catalog.outputs.find((item) => item.id === pluginId)?.name ?? pluginId
    );
  }

  function getFieldsForPlugin(pluginId: string): ConnectorConfigField[] {
    return (
      catalog.outputs.find((item) => item.id === pluginId)?.configFields ?? []
    );
  }

  function getEditConfig(
    outputId: string,
    pluginId: string,
    currentConfig: Record<string, unknown>,
  ): Record<string, string> {
    if (editConfigs[outputId]) return editConfigs[outputId];
    const fields = getFieldsForPlugin(pluginId);
    const values: Record<string, string> = {};
    for (const field of fields) {
      const current = currentConfig[field.key];
      values[field.key] = current != null ? String(current) : "";
    }
    return values;
  }

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleTestOutput(outputId: string) {
    setTestingIds((prev) => new Set(prev).add(outputId));
    try {
      await testOutput(outputId);
    } finally {
      setTestingIds((prev) => {
        const next = new Set(prev);
        next.delete(outputId);
        return next;
      });
    }
  }

  async function handleSaveOutput(
    outputId: string,
    pluginId: string,
  ) {
    const fields = getFieldsForPlugin(pluginId);
    const values = editConfigs[outputId];
    if (!values) return;
    await updateOutput(outputId, {
      config: toPayloadConfig(fields, values),
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Outputs</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage notification and delivery channels.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Output
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Output</DialogTitle>
              <DialogDescription>
                Configure a new output channel to receive notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Select
                value={outputConnectorId || undefined}
                onValueChange={(nextId) => {
                  setOutputConnectorId(nextId);
                  const next = catalog.outputs.find(
                    (item) => item.id === nextId,
                  );
                  setOutputConfig(
                    next ? getInitialValues(next.configFields) : {},
                  );
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
                    onChange={(e) =>
                      setOutputConfig((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}

              <Button
                className="w-full"
                onClick={handleCreateOutput}
                disabled={!selectedOutput}
              >
                Add Output
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>
            {loading ? (
              <span className="inline-block h-5 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            ) : (
              `${outputs.length} output${outputs.length !== 1 ? "s" : ""}`
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
              ))}
            </div>
          ) : outputs.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No outputs yet. Add one to start receiving notifications.
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              {outputs.map((output) => {
                const isExpanded = expandedIds.has(output.id);
                const fields = getFieldsForPlugin(output.pluginId);
                const editValues = getEditConfig(
                  output.id,
                  output.pluginId,
                  output.config,
                );
                return (
                  <div
                    key={output.id}
                    className="rounded-md border border-zinc-200 dark:border-zinc-800"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      onClick={() => toggleExpanded(output.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                      )}
                      <span className="truncate font-medium">
                        {getOutputPluginName(output.pluginId)}
                      </span>
                      <span className="ml-auto flex shrink-0 items-center gap-2">
                        <span className="text-xs text-zinc-500">
                          {output.pluginId} · {output.id.slice(0, 8)}
                        </span>
                        <Badge>
                          {output.enabled ? "enabled" : "disabled"}
                        </Badge>
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
                        {fields.length === 0 ? (
                          <p className="text-xs text-zinc-500">
                            No editable configuration for this connector.
                          </p>
                        ) : (
                          fields.map((field) => (
                            <div key={field.key} className="space-y-1">
                              <label className="text-xs text-zinc-500">
                                {field.label}
                                {field.required ? " *" : ""}
                              </label>
                              <Input
                                type={field.type}
                                placeholder={field.placeholder || field.label}
                                value={editValues[field.key] ?? ""}
                                onChange={(e) =>
                                  setEditConfigs((prev) => ({
                                    ...prev,
                                    [output.id]: {
                                      ...editValues,
                                      [field.key]: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                          ))
                        )}
                        <div className="flex gap-2">
                          {fields.length > 0 && (
                            <Button
                              variant="secondary"
                              onClick={() =>
                                void handleSaveOutput(
                                  output.id,
                                  output.pluginId,
                                )
                              }
                            >
                              Save
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            disabled={testingIds.has(output.id)}
                            onClick={() =>
                              void handleTestOutput(output.id)
                            }
                          >
                            {testingIds.has(output.id) ? (
                              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                            ) : (
                              <Zap className="mr-1.5 h-4 w-4" />
                            )}
                            Test
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => void deleteOutput(output.id)}
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
