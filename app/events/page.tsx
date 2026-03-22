"use client";

import { useFeedApi } from "@/hooks/use-feed-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventsPage() {
  const { events } = useFeedApi();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Events</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          All ingested events from your configured sources.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>
            {events.length} event{events.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No events yet. Events appear here after sources are polled.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
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
    </div>
  );
}
