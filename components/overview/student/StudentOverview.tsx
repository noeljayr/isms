"use client";

import { getStudents } from "@/api/students";
import User from "@/components/svg/User";
import UserGuard from "@/components/svg/UserGuard";
import { StudentTypes } from "@/types/StudentTypes";
import { useEffect, useState } from "react";

function StudentOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [student, setData] = useState<StudentTypes>();

  useEffect(() => {
    getStudents({
      setData,
      setIsLoading,
      setIsError,
      id: "6845cdfdd3164d4ffb715c6b",
      setErrorMessage,
    });
  }, []);

  return (
    <div className="flex w-full student-overview bg-[var(--background)] gap-4 items-center p-2 rounded-[var(--radius)]">
      <span className="profile h-[4rem] items-center justify-center w-[4rem] flex bg-white rounded-full">
        <span className="flex h-8 w-8 opacity-55">
          <User />
        </span>
      </span>

      {isLoading ? (
        <></>
      ) : isError ? (
        <></>
      ) : student ? (
        <>
          <div className="flex gap-1 flex-col">
            <h1 className="font-p-1">
              {student.firstName} {student.lastName}
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-p-3 opacity-80 font-medium">
                {student.class.name} {student.subClass.name}
              </span>
              <span className="font-black opacity-20">•</span>
              <span className="font-p-3 opacity-80 font-medium">
                {student.email}
              </span>
              <span className="font-black opacity-20">•</span>
              <span
                className={`${
                  student.status ? student.status.toLowerCase() : "deactivated"
                }-student-status student-status font-p-3 font-medium capitalize`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default StudentOverview;
