"use client";

import { getTeacherSubject } from "@/api/teachers";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { teacherId } from "@/constants/motionTranstion";
import { ExamTypes } from "@/types/ExamTypes";
import { getExams } from "@/api/exams";
import { getLessons } from "@/api/subjects";

function UpcomingLessons() {
  const [data, setData] = useState<LessonTypes[]>([]);

  useEffect(() => {
    getLessons({
      setIsLoading: () => {},
      setIsError: () => {},
      setData,

      setErrorMessage: () => {},
      teacherId,
    });
  }, []);

  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55">Up coming lessons</div>
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

export default UpcomingLessons;
