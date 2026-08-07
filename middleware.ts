import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "uznet_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login sahifasi ochiq bo'lishi kerak
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const hasSession = request.cookies.has(SESSION_COOKIE);
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
