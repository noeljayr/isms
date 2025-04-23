"use client";
import { useEffect, useState } from "react";
import Fees from "./Fees";
import AttendanceRate from "./AttendanceRate";
import EnrolledStudents from "./EnrolledStudents";
import ActiveTeachers from "./ActiveTeachers";
import useAcademicYearStore from "@/context/academicYears";
import { years } from "@/context/academicYears";

function Overview() {
  const [position, setPosition] = useState("0");

  const { activeYear, setActiveYear } = useAcademicYearStore();

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  return (
    <div className="flex flex-col gap-3 w-full overview-container">
      <div className="flex items-center justify-between mt-2">
        <h4 className="opacity-75">Overview</h4>

        <div className={`years flex items-center relative`}>
          <span
            style={{
              left: position + "rem",
            }}
            className="active-year-indicator z-0 absolute"
          ></span>
          {years.map((year) => (
            <div
              key={year}
              className={`year font-bold flex items-center justify-center relative z-[1] number cursor-pointer ${
                activeYear === year ? "active-year opacity-85" : "opacity-50"
              }`}
              onClick={() => {
                setActiveYear(year);
              }}
            >
              {year}
            </div>
          ))}
        </div>
      </div>

      <div className="overview grid gap-3">
        <Fees />
        <EnrolledStudents />
        <AttendanceRate />
        <ActiveTeachers />
      </div>
    </div>
  );
}

export default Overview;
