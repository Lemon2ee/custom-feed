"use client";

import { useFeedApi } from "@/hooks/use-feed-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PluginsPage() {
  const { loading, plugins } = useFeedApi();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Plugins</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage installed third-party plugins.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>
            {loading ? (
              <span className="inline-block h-5 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            ) : (
              `${plugins.length} plugin${plugins.length !== 1 ? "s" : ""}`
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
              ))}
            </div>
          ) : plugins.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No third-party plugins installed yet.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {plugins.map((plugin) => (
                <li
                  key={plugin.id}
                  className="flex items-center justify-between rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
                >
                  <div>
                    <p className="font-medium">{plugin.pluginId}</p>
                    <p className="text-xs text-zinc-500">v{plugin.version}</p>
                  </div>
                  <Badge>
                    {plugin.enabled ? "enabled" : "disabled"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
