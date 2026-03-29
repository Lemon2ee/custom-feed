"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface PollIncident {
  gapStart: string;
  gapEnd: string;
  gapSec: number;
}

export function usePollIncidents() {
  const [incidents, setIncidents] = useState<PollIncident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/poll-logs/incidents")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<{ incidents: PollIncident[] }>;
      })
      .then((body) => setIncidents(body.incidents))
      .catch(() => toast.error("Failed to load incident history."))
      .finally(() => setLoading(false));
  }, []);

  return { incidents, loading };
}
