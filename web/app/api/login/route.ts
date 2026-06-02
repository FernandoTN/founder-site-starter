import { NextResponse } from "next/server";

/**
 * Single-owner login. Compares the submitted passcode to ADMIN_PASSCODE and, on
 * success, sets an httpOnly session cookie that the middleware checks for /admin.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  const expected = process.env.ADMIN_PASSCODE || "let-me-in";

  if ((body?.password ?? "") !== expected) {
    return NextResponse.json({ ok: false, error: "Wrong passcode." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("fss_session", process.env.ADMIN_SESSION_SECRET || "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
