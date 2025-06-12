"use client";

import { jwtDecode } from "jwt-decode";
import { TokenTypes } from "@/types/token";
import { getCookie } from "cookies-next/client";
import { TOKEN_COOKIE_NAME } from "@/middleware";

const tokenCookie = getCookie(TOKEN_COOKIE_NAME);

export const tokenData = () => {
  if (!tokenCookie) {
    return null;
  }
  const decodedToken: TokenTypes = jwtDecode(tokenCookie);

  return {
    value: tokenCookie,
    schoolId: decodedToken.SchoolId,
    role: decodedToken.role,
    shoolName: decodedToken.SchoolName
  };
};

export const token = tokenData();
