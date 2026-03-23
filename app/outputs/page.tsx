"use client";

import { useState } from "react";
import { BellOff, ChevronDown, ChevronRight, Loader2, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  type OutputSchedule,
} from "@/hooks/use-feed-api";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: String(i),
  label: `${String(i).padStart(2, "0")}:00`,
}));

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
  const [creatingOutput, setCreatingOutput] = useState(false);
  const [savingOutputIds, setSavingOutputIds] = useState<Set<string>>(new Set());
  const [deletingOutputIds, setDeletingOutputIds] = useState<Set<string>>(new Set());
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

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
    setCreatingOutput(true);
    try {
      await createOutput({
        pluginId: selectedOutput.id,
        config: toPayloadConfig(selectedOutput.configFields, outputConfig),
      });
      setDialogOpen(false);
      setOutputConfig(
        selectedOutput ? getInitialValues(selectedOutput.configFields) : {},
      );
    } finally {
      setCreatingOutput(false);
    }
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

  async function handleToggleEnabled(outputId: string, enabled: boolean) {
    setTogglingIds((prev) => new Set(prev).add(outputId));
    try {
      await updateOutput(outputId, { enabled });
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(outputId);
        return next;
      });
    }
  }

  const muteDurations = [
    { label: "1 hour", ms: 60 * 60 * 1000 },
    { label: "6 hours", ms: 6 * 60 * 60 * 1000 },
    { label: "1 day", ms: 24 * 60 * 60 * 1000 },
    { label: "3 days", ms: 3 * 24 * 60 * 60 * 1000 },
    { label: "1 week", ms: 7 * 24 * 60 * 60 * 1000 },
  ] as const;

  async function handleMute(outputId: string, durationMs: number) {
    const mutedUntil = new Date(Date.now() + durationMs).toISOString();
    await updateOutput(outputId, { mutedUntil });
  }

  async function handleUnmute(outputId: string) {
    await updateOutput(outputId, { mutedUntil: null });
  }

  function formatMuteRemaining(mutedUntil: string): string | null {
    const diff = new Date(mutedUntil).getTime() - Date.now();
    if (diff <= 0) return null;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h`;
    const minutes = Math.floor(diff / (60 * 1000));
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  }

  const priorityOptions = [
    { value: 0, label: "Normal" },
    { value: 3, label: "Medium" },
    { value: 5, label: "High" },
    { value: 8, label: "Very High" },
    { value: 10, label: "Urgent" },
  ] as const;

  function getPriorityLabel(priority: number): string {
    const match = [...priorityOptions].reverse().find((o) => priority >= o.value);
    return match?.label ?? "Normal";
  }

  async function handlePriorityChange(outputId: string, priority: number) {
    await updateOutput(outputId, { priority });
  }

  const [scheduleEdits, setScheduleEdits] = useState<
    Record<string, OutputSchedule>
  >({});

  function getScheduleEdit(output: { id: string; schedule?: OutputSchedule }): OutputSchedule {
    if (scheduleEdits[output.id]) return scheduleEdits[output.id];
    return output.schedule ?? { timezone: "UTC", windows: [] };
  }

  function updateScheduleEdit(outputId: string, schedule: OutputSchedule) {
    setScheduleEdits((prev) => ({ ...prev, [outputId]: schedule }));
  }

  async function handleSaveSchedule(outputId: string) {
    const edit = scheduleEdits[outputId];
    if (!edit) return;
    const hasWindows = edit.windows.length > 0;
    await updateOutput(outputId, { schedule: hasWindows ? edit : null });
    setScheduleEdits((prev) => {
      const next = { ...prev };
      delete next[outputId];
      return next;
    });
  }

  async function handleClearSchedule(outputId: string) {
    await updateOutput(outputId, { schedule: null });
    setScheduleEdits((prev) => {
      const next = { ...prev };
      delete next[outputId];
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
    setSavingOutputIds((prev) => new Set(prev).add(outputId));
    try {
      await updateOutput(outputId, {
        config: toPayloadConfig(fields, values),
      });
    } finally {
      setSavingOutputIds((prev) => {
        const next = new Set(prev);
        next.delete(outputId);
        return next;
      });
    }
  }

  async function handleDeleteOutput(outputId: string) {
    if (!window.confirm("Delete this output?")) return;
    setDeletingOutputIds((prev) => new Set(prev).add(outputId));
    try {
      await deleteOutput(outputId);
    } finally {
      setDeletingOutputIds((prev) => {
        const next = new Set(prev);
        next.delete(outputId);
        return next;
      });
    }
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
                  {field.type === "select" && field.options ? (
                    <Select
                      value={outputConfig[field.key] || undefined}
                      onValueChange={(v) =>
                        setOutputConfig((prev) => ({ ...prev, [field.key]: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || field.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
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
                  )}
                </div>
              ))}

              <Button
                className="w-full"
                onClick={handleCreateOutput}
                disabled={creatingOutput || !selectedOutput}
              >
                {creatingOutput && <Loader2 className="h-4 w-4 animate-spin" />}
                {creatingOutput ? "Adding..." : "Add Output"}
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
                        {output.priority > 0 && (
                          <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                            {getPriorityLabel(output.priority)}
                          </span>
                        )}
                        {output.mutedUntil && formatMuteRemaining(output.mutedUntil) ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400 dark:hover:bg-amber-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleUnmute(output.id);
                            }}
                          >
                            <BellOff className="h-3 w-3" />
                            Muted · {formatMuteRemaining(output.mutedUntil)} left
                          </button>
                        ) : (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <BellOff className="h-3.5 w-3.5" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-40 p-1">
                              <div className="space-y-0.5">
                                <p className="px-2 py-1 text-xs font-medium text-zinc-500">Mute for</p>
                                {muteDurations.map((d) => (
                                  <button
                                    key={d.label}
                                    type="button"
                                    className="w-full rounded px-2 py-1.5 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      void handleMute(output.id, d.ms);
                                    }}
                                  >
                                    {d.label}
                                  </button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                        <Switch
                          checked={output.enabled}
                          disabled={togglingIds.has(output.id)}
                          onCheckedChange={(checked) => {
                            void handleToggleEnabled(output.id, checked);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
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
                              {field.type === "select" && field.options ? (
                                <Select
                                  value={editValues[field.key] || undefined}
                                  onValueChange={(v) =>
                                    setEditConfigs((prev) => ({
                                      ...prev,
                                      [output.id]: {
                                        ...editValues,
                                        [field.key]: v,
                                      },
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={field.placeholder || field.label} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
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
                              )}
                            </div>
                          ))
                        )}
                        <div className="space-y-1">
                          <label className="text-xs text-zinc-500">Priority</label>
                          <Select
                            value={String(output.priority)}
                            onValueChange={(v) =>
                              void handlePriorityChange(output.id, Number(v))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map((opt) => (
                                <SelectItem key={opt.value} value={String(opt.value)}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {/* Delivery Schedule */}
                        <div className="space-y-2 rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-zinc-500">Delivery Schedule</label>
                            {output.schedule && (
                              <button
                                type="button"
                                className="text-xs text-red-500 hover:underline"
                                onClick={() => void handleClearSchedule(output.id)}
                              >
                                Clear schedule
                              </button>
                            )}
                          </div>
                          {(() => {
                            const sched = getScheduleEdit(output);
                            return (
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-xs text-zinc-500">Timezone</label>
                                  <Input
                                    placeholder="e.g. America/New_York, UTC"
                                    value={sched.timezone}
                                    onChange={(e) =>
                                      updateScheduleEdit(output.id, {
                                        ...sched,
                                        timezone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                {sched.windows.map((w, wi) => (
                                  <div key={wi} className="space-y-1.5 rounded border border-zinc-100 p-2 dark:border-zinc-800">
                                    <div className="flex flex-wrap gap-1">
                                      {DAY_LABELS.map((label, di) => (
                                        <button
                                          key={di}
                                          type="button"
                                          className={`rounded px-2 py-0.5 text-xs transition-colors ${
                                            w.days.includes(di)
                                              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                          }`}
                                          onClick={() => {
                                            const days = w.days.includes(di)
                                              ? w.days.filter((d) => d !== di)
                                              : [...w.days, di].sort();
                                            const windows = [...sched.windows];
                                            windows[wi] = { ...w, days };
                                            updateScheduleEdit(output.id, { ...sched, windows });
                                          }}
                                        >
                                          {label}
                                        </button>
                                      ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Select
                                        value={String(w.startHour)}
                                        onValueChange={(v) => {
                                          const windows = [...sched.windows];
                                          windows[wi] = { ...w, startHour: Number(v) };
                                          updateScheduleEdit(output.id, { ...sched, windows });
                                        }}
                                      >
                                        <SelectTrigger className="w-24">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {HOUR_OPTIONS.map((h) => (
                                            <SelectItem key={h.value} value={h.value}>
                                              {h.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <span className="text-xs text-zinc-400">to</span>
                                      <Select
                                        value={String(w.endHour)}
                                        onValueChange={(v) => {
                                          const windows = [...sched.windows];
                                          windows[wi] = { ...w, endHour: Number(v) };
                                          updateScheduleEdit(output.id, { ...sched, windows });
                                        }}
                                      >
                                        <SelectTrigger className="w-24">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {HOUR_OPTIONS.map((h) => (
                                            <SelectItem key={h.value} value={h.value}>
                                              {h.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <button
                                        type="button"
                                        className="ml-auto text-xs text-red-500 hover:underline"
                                        onClick={() => {
                                          const windows = sched.windows.filter((_, i) => i !== wi);
                                          updateScheduleEdit(output.id, { ...sched, windows });
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      updateScheduleEdit(output.id, {
                                        ...sched,
                                        windows: [
                                          ...sched.windows,
                                          { days: [1, 2, 3, 4, 5], startHour: 9, endHour: 17 },
                                        ],
                                      })
                                    }
                                  >
                                    Add Window
                                  </Button>
                                  {scheduleEdits[output.id] && (
                                    <Button
                                      size="sm"
                                      onClick={() => void handleSaveSchedule(output.id)}
                                    >
                                      Save Schedule
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        <div className="flex gap-2">
                          {fields.length > 0 && (
                            <Button
                              variant="secondary"
                              disabled={savingOutputIds.has(output.id)}
                              onClick={() =>
                                void handleSaveOutput(
                                  output.id,
                                  output.pluginId,
                                )
                              }
                            >
                              {savingOutputIds.has(output.id) && <Loader2 className="h-4 w-4 animate-spin" />}
                              {savingOutputIds.has(output.id) ? "Saving..." : "Save"}
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
                            disabled={deletingOutputIds.has(output.id)}
                            onClick={() => void handleDeleteOutput(output.id)}
                          >
                            {deletingOutputIds.has(output.id) && <Loader2 className="h-4 w-4 animate-spin" />}
                            {deletingOutputIds.has(output.id) ? "Deleting..." : "Delete"}
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
