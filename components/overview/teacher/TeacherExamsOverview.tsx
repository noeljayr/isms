"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { teacherId } from "@/constants/motionTransition";
import { ExamTypes } from "@/types/ExamTypes";
import { getExams } from "@/api/exams";

function TeacherExamsOverview() {
  const [data, setData] = useState<ExamTypes[]>([]);

  useEffect(() => {
    getExams({
      setIsLoading: () => {},
      setIsError: () => {},
      setData,
      setErrorMessage: () => {},
      teacherId,
    });
  }, []);

  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55">Marked grades</div>
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

export default TeacherExamsOverview;
