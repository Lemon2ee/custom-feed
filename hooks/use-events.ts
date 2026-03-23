"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface EventDelivery {
  id: string;
  outputId: string;
  status: "pending" | "sent" | "retrying" | "failed";
  attemptCount: number;
  lastError?: string;
  sentAt?: string;
}

export interface EventWithDeliveries {
  id: string;
  sourceId: string;
  sourceType: string;
  externalItemId: string;
  title: string;
  url?: string;
  contentText?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
  authorImageUrl?: string;
  tags: string[];
  rawPayload: unknown;
  createdAt: string;
  deliveries: EventDelivery[];
}

interface EventsResponse {
  data: EventWithDeliveries[];
  total: number;
  page: number;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 20;

export function useEvents() {
  const [events, setEvents] = useState<EventWithDeliveries[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const fetchPage = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/events?page=${targetPage}&pageSize=${pageSize}`,
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const body = (await res.json()) as EventsResponse;
        setEvents(body.data);
        setTotal(body.total);
        setPage(body.page);
      } catch {
        toast.error("Failed to load events.");
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    void fetchPage(1);
  }, [fetchPage]);

  const nextPage = useCallback(() => {
    if (page < totalPages) void fetchPage(page + 1);
  }, [page, totalPages, fetchPage]);

  const prevPage = useCallback(() => {
    if (page > 1) void fetchPage(page - 1);
  }, [page, fetchPage]);

  const goToPage = useCallback(
    (n: number) => {
      const clamped = Math.max(1, Math.min(n, totalPages));
      void fetchPage(clamped);
    },
    [totalPages, fetchPage],
  );

  return {
    events,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    nextPage,
    prevPage,
    goToPage,
    refresh: () => fetchPage(page),
  };
}
