"use client";
import { useEffect, useState } from "react";
import Fees from "./Fees";
import AttendanceRate from "./AttendanceRate";
import EnrolledStudents from "./EnrolledStudents";
import ActiveTeachers from "./ActiveTeachers";
import useAcademicYearStore from "@/context/academicYears";
import { years } from "@/context/academicYears";
import OutstandingBalanceTotal from "./OutstandingBalanceTotal";

function Overview() {
  const [position, setPosition] = useState("0");

  const { activeYear, setActiveYear } = useAcademicYearStore();

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  return (
    <div className="flex flex-col gap-3 w-full overview-container">
      <div className="overview grid gap-3 h-[5.3rem] mt-4">
        <Fees />
        <OutstandingBalanceTotal />
        <EnrolledStudents />
      </div>
    </div>
  );
}

export default Overview;
