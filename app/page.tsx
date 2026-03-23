"use client";

import { useState } from "react";
import { useFeedApi } from "@/hooks/use-feed-api";
import { Cable, BellRing, Puzzle, PlugZap, Newspaper, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StatSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-1.5">
          <div className="h-6 w-8 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-3 w-14 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function OverviewPage() {
  const {
    loading,
    sources,
    outputs,
    events,
    eventCount,
    catalog,
    autoPoll,
    runWorkers,
    toggleAutoPoll,
  } = useFeedApi();

  const [runningOnce, setRunningOnce] = useState(false);
  const [togglingPoll, setTogglingPoll] = useState(false);

  async function handleRunOnce() {
    setRunningOnce(true);
    try {
      await runWorkers();
    } finally {
      setRunningOnce(false);
    }
  }

  async function handleTogglePoll() {
    setTogglingPoll(true);
    try {
      await toggleAutoPoll();
    } finally {
      setTogglingPoll(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <Link href="/sources" className="group">
              <Card className="transition-colors group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                <CardContent className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <Cable className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{sources.length}</p>
                    <p className="text-xs text-zinc-500">Sources</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/outputs" className="group">
              <Card className="transition-colors group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                <CardContent className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <BellRing className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{outputs.length}</p>
                    <p className="text-xs text-zinc-500">Outputs</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events" className="group">
              <Card className="transition-colors group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                <CardContent className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <Newspaper className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{eventCount}</p>
                    <p className="text-xs text-zinc-500">Events</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/plugins" className="group">
              <Card className="transition-colors group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                <CardContent className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <Puzzle className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {catalog.inputs.length + catalog.outputs.length}
                    </p>
                    <p className="text-xs text-zinc-500">Connectors</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </>
        )}
      </section>

      {loading ? (
        <>
          <Card>
            <CardContent className="space-y-3 py-6">
              <div className="h-5 w-40 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex gap-2">
                <div className="h-9 w-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-9 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 py-6">
              <div className="h-5 w-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-10 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-10 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PlugZap className="h-4 w-4" /> Worker Controls
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      autoPoll.running
                        ? "border-green-500 text-green-700 dark:text-green-400"
                        : ""
                    }
                  >
                    {autoPoll.running ? "Auto-poll running" : "Auto-poll stopped"}
                  </Badge>
                  {autoPoll.running && (
                    <span className="text-xs text-zinc-500">
                      every {autoPoll.tickIntervalSec}s
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex gap-2">
                <Button
                  variant={autoPoll.running ? "destructive" : "default"}
                  onClick={handleTogglePoll}
                  disabled={togglingPoll}
                >
                  {togglingPoll && <Loader2 className="h-4 w-4 animate-spin" />}
                  {autoPoll.running ? "Stop Auto-Poll" : "Start Auto-Poll"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRunOnce}
                  disabled={runningOnce}
                >
                  {runningOnce && <Loader2 className="h-4 w-4 animate-spin" />}
                  {runningOnce ? "Running…" : "Run Once"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Events</CardTitle>
                {events.length > 0 && (
                  <Link
                    href="/events"
                    className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    View all
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <p className="text-sm text-zinc-500">No events yet.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {events.slice(0, 10).map((event) => (
                    <li
                      key={event.id}
                      className="rounded-md border border-zinc-200 p-2 dark:border-zinc-800"
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-zinc-500">
                        {event.sourceType}
                        {event.publishedAt ? ` · ${event.publishedAt}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
