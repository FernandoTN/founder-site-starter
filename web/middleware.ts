import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Single-owner gate. /admin is unlocked only when the session cookie matches the
 * server secret (set by /api/login after a correct passcode). No OAuth, no user
 * table — one owner, one secret. Robust on any deploy URL.
 *
 * For real multi-user sign-in, see ../TODO.md item T-0008 (Clerk).
 */
const SESSION = process.env.ADMIN_SESSION_SECRET || "demo-session";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("fss_session")?.value;
  if (cookie === SESSION) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
