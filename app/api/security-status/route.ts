import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const hasAccessJwt = !!request.headers.get("cf-access-jwt-assertion");

  return NextResponse.json({
    protected: hasAccessJwt,
  });
}
