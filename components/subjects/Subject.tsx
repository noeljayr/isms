"use client";

import React, { useEffect, useState } from "react";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import { IconStarFilled } from "@tabler/icons-react";
import { SubClassTypes, ClassTypes } from "@/types/ClassesTypes";
import useViewSubjectModalStore from "@/context/modals/subjects/viewSubject";
import { getClasses, getSubClasses } from "@/api/classes";
import { AnimatePresence, motion } from "motion/react";
import { getLessons } from "@/api/subjects";

type subject = {
  subject: SubjectTypes;
  subjectsLength: number;
  index: number;
};

function Subject({ subject, subjectsLength, index }: subject) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [classData, setClassData] = useState<ClassTypes>();
  const [subClassData, setSubClassData] = useState<SubClassTypes>();
  const [lessonsData, setLessonsData] = useState<LessonTypes[]>([]);
  const { setViewSubjectId, setViewSubjectModalActive } =
    useViewSubjectModalStore();

  useEffect(() => {
    if (subject) {
      getClasses({
        setData: setClassData,
        setIsLoading,
        setIsError,
        setErrorMessage,
        id: subject.classId,
      });
      getSubClasses({
        setData: setSubClassData,
        setIsLoading,
        setIsError,
        setErrorMessage,
        id: subject.subClassId,
      });

      // getLessons({
      //   setData: setLessonsData,
      //   setIsLoading,
      //   setIsError,
      //   setErrorMessage,
      //   subjectId: subject.id,
      // });
    }
  }, [subject]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: (0.5 * index) / 5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onClick={() => {
          setViewSubjectModalActive();
          setViewSubjectId(subject.id);
        }}
        style={{ width: subjectsLength < 4 ? "13rem" : "100%" }}
        className="subject cursor-pointer bg-white truncate flex flex-col gap-1.5 relative border-[1px] border-[var(--border)] p-2 rounded-[var(--radius)]"
      >
        {isLoading ? (
          <></>
        ) : isError ? (
          <>
            <div className="px-2 truncate font-p-3">
              Something went wrong: {`(${errorMessage})`}
            </div>
          </>
        ) : (
          <>
            {subject.isMandotory && (
              <span className="mandotory absolute right-1 top-1 h-4 w-4 rounded-[50%] flex items-center justify-center font-bold font-p-3 bg-[rgba(255,200,1,0.1)]">
                <IconStarFilled
                  style={{ height: "0.5rem", width: "0.6rem" }}
                  color="#ffc801"
                />
              </span>
            )}
            <span className="font-semibold font-p-2 pr-4 truncate">
              {subject.name}
            </span>
            <div className="flex mt-2 justify-between items-center subject-info">
              <span className="font medium font-p-3 border-[1px] border-[var(--background)] px-2.5 py-1 rounded-[2rem]">
                {classData && subClassData ? (
                  <>
                    {classData?.name} {subClassData?.name}
                  </>
                ) : (
                  <>No class assigned</>
                )}
              </span>

              <span className="font medium font-p-3 border-[1px] border-[var(--background)] px-2.5 py-1 rounded-[2rem]">
                <span className="font-semibold number font-p-3 mr-1">
                  {0}
                </span>
                Lessons
              </span>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Subject;
