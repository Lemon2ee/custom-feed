import { NextResponse } from "next/server";
import { getPluginStore } from "@/src/core/plugins/store";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function GET() {
  const store = getPluginStore();
  return NextResponse.json({ data: store.list(DEFAULT_WORKSPACE_ID) });
}
