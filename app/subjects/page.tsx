import "@/css/subjects.css";

import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import { getCookie } from "cookies-next/server";
import { jwtDecode } from "jwt-decode";
import AdminSubjects from "../pages/subjects/AdminSubjects";
import TeacherSubjects from "../pages/subjects/TeacherSubjects";
import StudentSubjects from "../pages/subjects/StudentSubjects";

async function page() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  if (!token) {
    return <>Access Denied</>;
  }

  const decodedToken: TokenTypes = jwtDecode(token);

  return (
    <>
      {decodedToken.role.toLowerCase() === "admin" ? (
        <AdminSubjects />
      ) : decodedToken.role.toLowerCase() === "teacher" ? (
        <TeacherSubjects />
      ) : decodedToken.role.toLowerCase() === "students"  || decodedToken.role.toLowerCase() === "" ? (
        <StudentSubjects />
      ) : (
        <> Access Denied</>
      )}
    </>
  );
}

export default page;
