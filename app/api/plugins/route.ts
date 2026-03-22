import { NextResponse } from "next/server";
import { connectorCatalog } from "@/src/plugins/registry";

export async function GET() {
  return NextResponse.json({ data: connectorCatalog });
}
