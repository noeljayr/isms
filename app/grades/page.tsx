import "@/css/subjects.css";

import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { TokenTypes } from "@/types/token";
import { getCookie } from "cookies-next/server";
import { jwtDecode } from "jwt-decode";
import TeacherGrades from "../pages/grades/TeacherGrades";
import StudentGrades from "../pages/grades/StudentGrades";

async function Grades() {
  const token = await getCookie(TOKEN_COOKIE_NAME, { cookies });

  if (!token) {
    return <>Access Denied</>;
  }

  const decodedToken: TokenTypes = jwtDecode(token);

  return (
    <>
      {decodedToken.role.toLowerCase() === "admin" ? (
        <TeacherGrades />
      ) : decodedToken.role.toLowerCase() === "teacher" ? (
        <TeacherGrades />
      ) : decodedToken.role.toLowerCase() === "students"  || decodedToken.role.toLowerCase() === "" ? (
        <StudentGrades />
      ) : (
        <> Access Denied</>
      )}
    </>
  );
}

export default Grades;
