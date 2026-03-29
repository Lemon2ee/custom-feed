import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

const GAP_THRESHOLD_SEC = 15 * 60; // 5 minutes

export async function GET() {
  const repo = getRepository();
  const incidents = await repo.listPollIncidents(DEFAULT_WORKSPACE_ID, {
    gapThresholdSec: GAP_THRESHOLD_SEC,
    limit: 50,
  });
  return NextResponse.json({ incidents });
}
