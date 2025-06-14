import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose"; // Used for decoding the JWT payload
import { TokenTypes } from "./types/token";

export const TOKEN_COOKIE_NAME = "codewave_token";

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

async function isTokenApparentlyUnexpired(token: string): Promise<boolean> {
  if (!token) {
    return false;
  }
  try {
    const payload: JwtPayload = decodeJwt(token);

    if (typeof payload.exp === "number" && payload.exp > 0) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTimeInSeconds) {
        console.log('Token is expired based on its "exp" claim.');
        return false;
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const loginUrl = new URL("/auth/login", request.url);
  const homeUrl = new URL("/", request.url);

  if (pathname === "/auth" || pathname === "/auth/") {
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  const decodedToken: TokenTypes = decodeJwt(token);
  const userRole = decodedToken.role.toLowerCase();

  if (userRole !== "admin") {
    if (
      pathname.startsWith("/accountants") ||
      pathname.startsWith("/teachers")
    ) {
      return NextResponse.redirect(homeUrl);
    }
  }

  if (userRole == "student") {
    if (pathname.startsWith("/students") || pathname.startsWith("/classes")) {
      return NextResponse.redirect(homeUrl);
    }
  }

  if (userRole == "accountant" || userRole == "librarian") {
    if (pathname.startsWith("/grades")) {
      return NextResponse.redirect(homeUrl);
    }
  }

  const isTokenValidBasedOnExp = await isTokenApparentlyUnexpired(token);

  if (!isTokenValidBasedOnExp) {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(TOKEN_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
