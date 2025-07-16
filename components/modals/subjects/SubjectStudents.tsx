"use client";

import { motionTransition } from "@/constants/motionTransition";
import { getLessons } from "@/api/subjects";
import { LessonTypes } from "@/types/SubjectsTypes";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/context/token";
import Loader from "@/components/ux/Loader";
import Link from "next/link";
import { StudentTypes } from "@/types/StudentTypes";
import { getStudents } from "@/api/students";
import Search from "@/components/svg/Search";
import { useSearchParams } from "next/navigation";

function SubjectStudents({ subclassId }: { subclassId: string | null }) {
  const { token } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [students, setData] = useState<StudentTypes[]>([]);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

 

  useEffect(() => {
    if (!subclassId) return;
    getStudents({
      setData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      subClassId: subclassId,
    });
  }, [subclassId]);

  if (!token) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTransition}
      className="section relative grid w-full h-full overflow-hidden grid-rows-[auto_1fr] gap-2"
      key="lessons"
      layout="position"
    >
      <div className="flex flex-col gap-2 overflow-y-auto relative h-full w-full">
        {isLoading ? (
          <div className="flex absolute w-full h-full items-center justify-center">
            <Loader variant="primary" />
          </div>
        ) : isError ? (
          <></>
        ) : students && students.length > 0 ? (
          <div className="grid grid-rows-[auto_1fr] overflow-hidden gap-2">
            <div className="search input-group mr-auto items-center">
              <span className="absolute left-2 self-center top-2.5 opacity-70">
                <Search />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                style={{ paddingLeft: "1.5rem" }}
                placeholder="Search for students..."
              />
            </div>

            <div className="grid gap-2 grid-cols-1 auto-rows-min">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col gap-1 border-b-[1px]  border-b-[var(--border)] pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="font-semibold font-p-2">
                    {student.firstName} {student.lastName}
                  </span>

                  <span className="flex gap-4 items-center">
                    <span className="font-p-3 opacity-65 number">
                      {student.email}
                    </span>
                    <span className="font-black opacity-20">•</span>
                    <span className="font-p-3 opacity-65 number">
                      {student.phoneNumber}
                    </span>
                    <span className={`font-black opacity-20`}>•</span>
                    <span
                      className={`font-p-3 opacity-65 number ${student.status}`}
                    >
                      {student.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center absolute inset-0">
            <span className="font-p-2 font-semibold opacity-85">
              No students found
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default SubjectStudents;
