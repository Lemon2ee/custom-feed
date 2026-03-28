"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface PollLogEntry {
  id: string;
  sourceId: string;
  sourceName: string;
  connectorId: string;
  startedAt: string;
  completedAt?: string;
  status: "success" | "error";
  itemsFetched?: number;
  newEvents?: number;
  errorMessage?: string;
  details?: Record<string, unknown>;
}

interface PollLogsResponse {
  data: PollLogEntry[];
  total: number;
  page: number;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 50;

export function usePollLogs() {
  const [logs, setLogs] = useState<PollLogEntry[]>([]);
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
          `/api/poll-logs?page=${targetPage}&pageSize=${pageSize}`,
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const body = (await res.json()) as PollLogsResponse;
        setLogs(body.data);
        setTotal(body.total);
        setPage(body.page);
      } catch {
        toast.error("Failed to load poll logs.");
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

  return {
    logs,
    total,
    page,
    pageSize,
    totalPages,
    loading,
    nextPage,
    prevPage,
    refresh: () => fetchPage(page),
  };
}
