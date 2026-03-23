"use client";

import { useState } from "react";
import {
  useEvents,
  type EventWithDeliveries,
  type EventDelivery,
} from "@/hooks/use-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

function DeliveryBadges({ deliveries }: { deliveries: EventDelivery[] }) {
  if (deliveries.length === 0) return null;

  const counts = { sent: 0, pending: 0, retrying: 0, failed: 0 };
  for (const d of deliveries) counts[d.status]++;

  return (
    <span className="inline-flex gap-1">
      {counts.sent > 0 && (
        <Badge className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">
          {counts.sent} sent
        </Badge>
      )}
      {counts.pending > 0 && (
        <Badge className="border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400">
          {counts.pending} pending
        </Badge>
      )}
      {counts.retrying > 0 && (
        <Badge className="border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400">
          {counts.retrying} retrying
        </Badge>
      )}
      {counts.failed > 0 && (
        <Badge className="border-red-300 text-red-700 dark:border-red-700 dark:text-red-400">
          {counts.failed} failed
        </Badge>
      )}
    </span>
  );
}

function DeliveryDetail({ delivery }: { delivery: EventDelivery }) {
  const statusColor: Record<string, string> = {
    sent: "text-green-600 dark:text-green-400",
    pending: "text-amber-600 dark:text-amber-400",
    retrying: "text-amber-600 dark:text-amber-400",
    failed: "text-red-600 dark:text-red-400",
  };

  return (
    <div className="flex items-start justify-between rounded border border-zinc-100 px-3 py-2 text-xs dark:border-zinc-800">
      <div className="space-y-0.5">
        <p className="font-mono text-zinc-500">{delivery.outputId}</p>
        {delivery.sentAt && (
          <p className="text-zinc-400">Sent {delivery.sentAt}</p>
        )}
        {delivery.lastError && (
          <p className="text-red-500">{delivery.lastError}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {delivery.attemptCount > 1 && (
          <span className="text-zinc-400">
            {delivery.attemptCount} attempts
          </span>
        )}
        <span className={statusColor[delivery.status] ?? ""}>
          {delivery.status}
        </span>
      </div>
    </div>
  );
}

function EventRow({ event }: { event: EventWithDeliveries }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="rounded-md border border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 p-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-medium">
            {event.url ? (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {event.title}
                <ExternalLink className="h-3 w-3 shrink-0 text-zinc-400" />
              </a>
            ) : (
              event.title
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>{event.sourceType}</span>
            {event.author && <span>by {event.author}</span>}
            {event.publishedAt && <span>{event.publishedAt}</span>}
            <DeliveryBadges deliveries={event.deliveries} />
          </div>
        </div>
        <span className="mt-1 shrink-0 text-zinc-400">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-zinc-200 px-3 pb-3 pt-3 text-sm dark:border-zinc-800">
          {event.contentText && (
            <ContentBlock text={event.contentText} />
          )}

          {event.url && (
            <p className="text-xs">
              <span className="text-zinc-500">URL: </span>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {event.url}
              </a>
            </p>
          )}

          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {event.tags.map((tag) => (
                <Badge key={tag} className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {event.deliveries.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-zinc-500">Deliveries</p>
              {event.deliveries.map((d) => (
                <DeliveryDetail key={d.id} delivery={d} />
              ))}
            </div>
          )}

          <RawPayloadToggle payload={event.rawPayload} />
        </div>
      )}
    </li>
  );
}

function ContentBlock({ text }: { text: string }) {
  const [showFull, setShowFull] = useState(false);
  const truncateAt = 300;
  const needsTruncation = text.length > truncateAt;
  const displayed = needsTruncation && !showFull ? text.slice(0, truncateAt) + "..." : text;

  return (
    <div className="text-xs text-zinc-600 dark:text-zinc-400">
      <p className="whitespace-pre-wrap">{displayed}</p>
      {needsTruncation && (
        <button
          type="button"
          className="mt-1 text-blue-600 hover:underline dark:text-blue-400"
          onClick={() => setShowFull((v) => !v)}
        >
          {showFull ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

function RawPayloadToggle({ payload }: { payload: unknown }) {
  const [show, setShow] = useState(false);

  if (payload == null) return null;

  return (
    <div>
      <button
        type="button"
        className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        onClick={() => setShow((v) => !v)}
      >
        {show ? "Hide raw payload" : "Show raw payload"}
      </button>
      {show && (
        <pre className="mt-1 max-h-60 overflow-auto rounded bg-zinc-100 p-2 text-[11px] dark:bg-zinc-900">
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function EventsPage() {
  const {
    events,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    nextPage,
    prevPage,
  } = useEvents();

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

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
            {loading ? (
              <span className="inline-block h-5 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            ) : (
              `${total} event${total !== 1 ? "s" : ""}`
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
          ) : events.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No events yet. Events appear here after sources are polled.
            </p>
          ) : (
            <>
              <ul className="space-y-2 text-sm">
                {events.map((event) => (
                  <EventRow key={event.id} event={event} />
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
