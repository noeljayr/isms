import "@/css/index.css";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import AdminHome from "./pages/home/AdminHome";
import AccountantHome from "./pages/home/AccountantHome";
import StudentHome from "./pages/home/StudentHome";
import GuardianHome from "./pages/home/GuardianHome";
import { getCookie } from "cookies-next/server";
import { jwtDecode } from "jwt-decode";
import TeacherHome from "./pages/home/TeacherHome";
import LibrarianHome from "./pages/home/LibrarianHome";

async function Home() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  if (!token) {
    return <>Access Denied</>;
  }

  const decodedToken: TokenTypes = jwtDecode(token);

  return (
    <>
      {decodedToken.role.toLowerCase() === "admin" ? (
        <AdminHome />
      ) : decodedToken.role.toLowerCase() === "accountant" ? (
        <AccountantHome />
      ) : decodedToken.role.toLowerCase() === "teacher" ? (
        <TeacherHome />
      ) : decodedToken.role.toLowerCase() === "student" ||
        decodedToken.role.toLowerCase() === "" ? (
        <StudentHome />
      ) : decodedToken.role.toLowerCase() === "guardian" ? (
        <GuardianHome />
      ) : decodedToken.role.toLowerCase() === "librarian" ? (
        <LibrarianHome />
      ) : (
        <>Access Denied</>
      )}
    </>
  );
}

export default Home;
