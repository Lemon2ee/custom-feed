import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";
import { getPluginStore } from "@/src/core/plugins/store";

const payloadSchema = z.object({
  pluginId: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const payload = payloadSchema.parse(body);
  const store = getPluginStore();
  const existing = store.find(DEFAULT_WORKSPACE_ID, payload.pluginId);
  if (!existing) {
    return NextResponse.json({ error: "plugin not found" }, { status: 404 });
  }
  store.upsert({ ...existing, enabled: false });
  return NextResponse.json({ ok: true });
}
