import "@/css/index.css";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import AdminClasses from "../pages/classes/AdminClasses";
import TeacherClasses from "../pages/classes/TeacherClasses";
import { getCookie } from "cookies-next/server";
import { jwtDecode } from "jwt-decode";

async function Classes() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  if (!token) {
    return <>Access Denied</>;
  }

  const decodedToken: TokenTypes = jwtDecode(token);

  return (
    <>
      {decodedToken.role.toLowerCase() === "admin" ? <AdminClasses /> : <></>}
    </>
  );
}

export default Classes;
