import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const checkToken = (token: string | undefined) => {
  if (!token) return true;
  let payload;
  try {
    payload = jwtDecode(token);
  } catch (e) {
    console.error("Failed to decode token:", e);
    return true;
  }

  if (typeof payload.exp !== "number") {
    console.warn("Token has no exp claim");
    return true;
  }

  const nowInSeconds = Date.now() / 1000;
  return payload.exp < nowInSeconds;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (
    request.nextUrl.pathname == "/auth" ||
    request.nextUrl.pathname == "/auth/"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (checkToken(token) && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!checkToken(token) && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
