
import { getCookie } from "cookies-next/server";
import SidebarClient from "./SidebarClient";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import { jwtDecode } from "jwt-decode";

export default async function SidebarServer() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  let role = "student";
  let schoolName = "ISMS"
  if (token) {
    try {
      const decoded: TokenTypes = jwtDecode(token);
      role = (decoded.role || "student").toLowerCase();
      schoolName = decoded.SchoolName
    } catch (err) {
      console.warn("Invalid auth token, defaulting to student role");
    }
  }

  // Pass the role into the client component
  return <SidebarClient userRole={role} schoolName={schoolName} />;
}
