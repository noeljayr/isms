"use client";

import { getTeacherSubject } from "@/api/teachers";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { teacherId } from "@/constants/motionTranstion";
import { getLessons } from "@/api/subjects";
import Notification from "@/components/svg/Notification";

function Announcements() {
  const [data, setData] = useState<LessonTypes[]>([]);

  //   useEffect(() => {
  //     getLessons({
  //       setIsLoading: () => {},
  //       setIsError: () => {},
  //       setData,
  //       setErrorMessage: () => {},
  //       teacherId,
  //     });
  // }, [])

  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55 relative flex items-center">
        Announcements
        <span className="h-6 w-6 flex absolute right-0 top-1 opacity-20">
          <Notification />
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <h3>
          <NumberFlow
            value={data?.length | 0}
            format={{ notation: "standard", maximumFractionDigits: 2 }}
          />
        </h3>
      </div>
    </div>
  );
}

export default Announcements;
