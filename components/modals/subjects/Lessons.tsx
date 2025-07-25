"use client";

import { motionTransition } from "@/constants/motionTransition";
import { getLessons } from "@/api/subjects";
import { LessonTypes } from "@/types/SubjectsTypes";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/context/token";
import Loader from "@/components/ux/Loader";
import Link from "next/link";

function Lessons({ subjectId }: { subjectId: string | null }) {
  const { token } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [lessonsData, setLessonsData] = useState<LessonTypes[]>([]);

  


  useEffect(() => {
    if (!subjectId) return;
    getLessons({
      setData: setLessonsData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      subjectId: subjectId,
    });
  }, [subjectId]);

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
            <Loader />
          </div>
        ) : isError ? (
          <></>
        ) : lessonsData && lessonsData.length > 0 ? (
          <></>
        ) : (
          <div className="flex flex-col gap-1 items-center justify-center absolute inset-0">
            <span className="font-p-2 font-semibold opacity-85">
              No lessons found
            </span>
            <span className="font-p-3 opacit-75">
              Lessons to be added by the assigned teacher
            </span>
            <Link className="cta-2 mt-2" href="/teachers">
              Assign a teacher
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Lessons;
