"use client";

import useActiveYearStore from "@/context/academicYears";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { getTeachers } from "@/api/teachers";
import { TeacherTypes } from "@/types/StaffTypes";
import Loader from "../ux/Loader";

type dataTypes = {
  value: number;
  differenceInPercentage: number | null;
  year: string;
};

const data: dataTypes[] = [
  {
    value: 51,
    differenceInPercentage: -5.03,
    year: "2025",
  },
  {
    value: 54,
    differenceInPercentage: 4.0,
    year: "2024",
  },
  {
    value: 52,
    differenceInPercentage: null,
    year: "2023",
  },
];

function ActiveTeachers() {
  const { activeYear } = useActiveYearStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teachers, setTeachers] = useState<TeacherTypes[]>([]);

  useEffect(() => {
    getTeachers({
      setData: setTeachers,
      setErrorMessage,
      setIsError,
      setIsLoading,
      dateEmployedFrom: activeYear,
      pageSize: 4000000,
    });
  }, [activeYear]);

  return (
    <div className="card">
      <div className="card-title">Active teachers</div>
      <div className="card-body flex gap-4 items-center">
        {isLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex w-full h-full items-center justify-center">
            <span className="font-p-2">Something went wrong</span>
          </div>
        ) : (
          teachers && (
            <>
              <h3>
                <NumberFlow
                  value={teachers.length}
                  format={{ notation: "standard", maximumFractionDigits: 0 }}
                />
              </h3>
            </>
          )
        )}

        {/* <div className="flex gap-2 items-center ml-auto">
          <span className={`difference flex gap-2 ${prevYearData? "": "opacity-0"} ml-auto items-center`}>
            <span
              className={`percentage ${getDifference(
                currentYearData,
                prevYearData
              )} number`}
            >
              <NumberFlow
                value={currentYearData?.differenceInPercentage || 0}
                format={{ notation: "standard", maximumFractionDigits: 2 }}
              />{" "}
              %
            </span>
            {prevYearData && (
              <span className="prev-year opacity-50">{prevYearData?.year}</span>
            )}
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default ActiveTeachers;
