import { NextResponse } from "next/server";
import { runIngestWorker } from "@/src/workers/ingest-worker";
import { runDeliveryWorker } from "@/src/workers/delivery-worker";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function POST() {
  await runIngestWorker(DEFAULT_WORKSPACE_ID);
  await runDeliveryWorker(DEFAULT_WORKSPACE_ID);
  return NextResponse.json({ ok: true });
}
