"use client";

import { useState } from "react";
import { usePollLogs, type PollLogEntry } from "@/hooks/use-poll-logs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

function durationMs(entry: PollLogEntry): string {
  if (!entry.completedAt) return "—";
  const ms = new Date(entry.completedAt).getTime() - new Date(entry.startedAt).getTime();
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString();
}

function PollLogRow({ entry }: { entry: PollLogEntry }) {
  const isError = entry.status === "error";
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{entry.sourceName || entry.sourceId}</span>
            <Badge className="text-[10px] text-zinc-500">{entry.connectorId}</Badge>
            {isError ? (
              <Badge className="border-red-300 text-red-700 dark:border-red-700 dark:text-red-400">
                error
              </Badge>
            ) : (
              <Badge className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">
                ok
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
            <span>{formatTime(entry.startedAt)}</span>
            <span>duration: {durationMs(entry)}</span>
            {entry.status === "success" && (
              <>
                <span>fetched: {entry.itemsFetched ?? 0}</span>
                <span>new: {entry.newEvents ?? 0}</span>
              </>
            )}
          </div>
          {isError && entry.errorMessage && (
            <p className="mt-1 rounded bg-red-50 px-2 py-1 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {entry.errorMessage}
            </p>
          )}
          {entry.details != null && (
            <div>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {expanded ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
                details
              </button>
              {expanded && (
                <pre className="mt-1 overflow-x-auto rounded bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  {JSON.stringify(entry.details, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default function PollLogPage() {
  const {
    logs,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    nextPage,
    prevPage,
  } = usePollLogs();

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Poll Log</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A record of every source poll — when it ran, how many items were fetched, and any errors.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>
            {loading ? (
              <span className="inline-block h-5 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            ) : (
              `${total} poll${total !== 1 ? "s" : ""}`
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800"
                />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No poll logs yet. Logs appear here after sources are polled.
            </p>
          ) : (
            <>
              <ul className="space-y-2">
                {logs.map((entry) => (
                  <PollLogRow key={entry.id} entry={entry} />
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between text-sm">
                <p className="text-xs text-zinc-500">
                  Showing {rangeStart}–{rangeEnd} of {total}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={prevPage}
                  >
                    <ChevronLeft className="mr-1 h-3 w-3" />
                    Prev
                  </Button>
                  <span className="text-xs text-zinc-500">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={nextPage}
                  >
                    Next
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
