import { NextResponse } from "next/server";
import { getRepository } from "@/src/db/repositories";
import { DEFAULT_WORKSPACE_ID } from "@/src/core/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("pageSize") ?? 50)));

  const repo = getRepository();
  const { data, total } = await repo.listPollLogsPaginated(DEFAULT_WORKSPACE_ID, { page, pageSize });

  return NextResponse.json({ data, total, page, pageSize });
}
