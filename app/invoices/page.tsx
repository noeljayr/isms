import "@/css/subjects.css";

import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import { getCookie } from "cookies-next/server";
import { jwtDecode } from "jwt-decode";
import AdminInvoices from "../pages/invoices/AdminInvoices";
import GuadianInvoices from "../pages/invoices/GuadianInvoices";

async function Grades() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  if (!token) {
    return <>Access Denied</>;
  }

  const decodedToken: TokenTypes = jwtDecode(token);

  return (
    <>
      {decodedToken.role.toLowerCase() === "admin" ? (
        <AdminInvoices />
      ) : decodedToken.role.toLowerCase() === "guardian" ? (
        <GuadianInvoices />
      ) : (
        <> Access Denied</>
      )}
    </>
  );
}

export default Grades;
