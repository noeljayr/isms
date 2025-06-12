"use client";

import { getTeacherSubject } from "@/api/teachers";
import { SubjectTypes } from "@/types/SubjectsTypes";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { teacherId } from "@/constants/motionTranstion";

function TeacherSubjectsOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [assignedChanged, setAssignedChanged] = useState(false);
  const [data, setData] = useState<SubjectTypes[]>([]);

  useEffect(() => {
    getTeacherSubject({
      setIsLoading,
      setErrorMessage,
      setIsError,
      setData,
      id: teacherId,
    });
  }, []);

  return (
    <div className="grid bg-[var(--background)] p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55">Subjects</div>
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

export default TeacherSubjectsOverview;
