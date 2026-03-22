import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function GET() {
  const repo = getRepository();
  const events = await repo.listEvents(DEFAULT_WORKSPACE_ID);
  return NextResponse.json({ data: events });
}
