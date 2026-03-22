import { NextResponse } from "next/server";
import { z } from "zod";
import { autoPollManager } from "@/src/workers/auto-poll";

const postSchema = z.object({
  action: z.enum(["start", "stop"]),
});

export async function GET() {
  const status = await autoPollManager.getStatusAsync();
  return NextResponse.json({ data: status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = postSchema.parse(body);

  if (action === "start") {
    autoPollManager.start();
  } else {
    autoPollManager.stop();
  }

  const status = await autoPollManager.getStatusAsync();
  return NextResponse.json({ ok: true, data: status });
}
