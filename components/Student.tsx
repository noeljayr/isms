"use client";

import { StudentTypes } from "@/types/StudentTypes";
import Eye from "./svg/Eye";
import useViewStudentModalStore from "@/context/modals/students/viewStudents";
import Plus from "./svg/Plus";
import StudentGuardian from "./modals/students/StudentGuardian";
import { useEffect, useState } from "react";
import { ClassTypes } from "@/types/ClassesTypes";
import { getStudents } from "@/api/students";

function Student({ student, index }: { student: StudentTypes; index: number }) {
  const [studentData, setStudentData] = useState<StudentTypes>();

  const { setViewStudentModalActive, setViewStudentId } =
    useViewStudentModalStore();

  useEffect(() => {
    getStudents({
      id: student.id,
      setData: setStudentData,
      setIsLoading: () => {},
      setIsError: () => {},
      setErrorMessage: () => {},
    });
  }, []);

  return (
    <div
      onClick={() => {
        setViewStudentId(student.id);
        setViewStudentModalActive();
      }}
      key={student.id}
      className="tr"
    >
      <span className="td number student-number">{index}</span>
      <span className="td truncate font-medium">
        {student.firstName} {student.lastName}{" "}
      </span>
      {student.parentId && student.parentId.length > 0 ? (
        <StudentGuardian parentId={student.parentId} />
      ) : (
        <button
          style={{
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "1.5rem",
            height: "1.5rem",
            marginLeft: "0.7rem",
          }}
          className="cta-2"
        >
          <span className="opacity-50">
            {" "}
            <Plus />
          </span>
        </button>
      )}
      {studentData && studentData.class && (
        <>
          <span className="td">
            {studentData.class.name}{" "}
            {studentData.subClass && <>{studentData.subClass.name}</>}
          </span>

          <span
            style={{ display: "flex" }}
            className={`td gap-2 ${
              studentData.status ? studentData.status.toLowerCase() : "default"
            }-status`}
          >
            <span className="status-label font-p-3 font-medium flex items-center gap-1">
              {studentData.status}
            </span>
          </span>
        </>
      )}

      <span className="td action">
        <span className="action-1">
          <Eye />
        </span>
      </span>
    </div>
  );
}

export default Student;
