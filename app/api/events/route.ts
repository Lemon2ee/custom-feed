import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("pageSize") ?? 20)));

  const repo = getRepository();

  const [events, total] = await Promise.all([
    repo.listEventsPaginated(DEFAULT_WORKSPACE_ID, { page, pageSize }),
    repo.countEvents(DEFAULT_WORKSPACE_ID),
  ]);

  const eventIds = events.map((e) => e.id);
  const deliveries = await repo.listDeliveriesByEventIds(eventIds);

  const deliveriesByEvent = new Map<string, typeof deliveries>();
  for (const d of deliveries) {
    const list = deliveriesByEvent.get(d.eventId) ?? [];
    list.push(d);
    deliveriesByEvent.set(d.eventId, list);
  }

  const data = events.map((event) => ({
    ...event,
    deliveries: (deliveriesByEvent.get(event.id) ?? []).map((d) => ({
      id: d.id,
      outputId: d.outputId,
      status: d.status,
      attemptCount: d.attemptCount,
      lastError: d.lastError,
      sentAt: d.sentAt,
    })),
  }));

  return NextResponse.json({ data, total, page, pageSize });
}
