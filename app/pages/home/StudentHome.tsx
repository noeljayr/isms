"use client";

import YearlyCalendar from "@/components/events/Calendar";
import Events from "@/components/events/Events";
import Lessons from "@/components/lessons/Lessons";
import Announcements from "@/components/overview/teacher/Announcements";
import TeacherExamsOverview from "@/components/overview/teacher/TeacherExamsOverview";
import TeacherSubjectsOverview from "@/components/overview/teacher/TeacherSubjectsOverview";
import { teacherId } from "@/constants/motionTranstion";
import { getLessons } from "@/api/subjects";
import { LessonTypes } from "@/types/SubjectsTypes";
import React, { useEffect, useState } from "react";
import { lessonsData as lessons } from "@/context/data/lessonsData";

import StudentOverview from "@/components/overview/student/StudentOverview";
import NumberFlow from "@number-flow/react";
import ChevronRight from "@/components/svg/ChevronRight";

const tabs = ["Events", "Lessons"];

function StudentHome() {
  const [lessonsData, setLessonsData] = useState<LessonTypes[]>(lessons);

  return (
    <div className="grid w-full h-full grid-cols-[1fr_auto] pb-2 gap-3 overflow-hidden">
      <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
        <div className="grid gap-3 grid-cols-[1fr_13rem]  mt-4">
          <StudentOverview />

          <div className="p-2 grid-rows-[auto_1fr] flex flex-col gap-2 rounded-[var(--radius)] border-[1px] border-[var(--border)]">
            <span className="font-semibold opacity-85 font-p-2">
              Fee balance
            </span>
            <h1 className="font-h-1 opacity-75">
              K{" "}
              <NumberFlow
                value={100000.9}
                format={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
              />
            </h1>
            <span style={{height: "2rem", width: "100%"}} className="cta-2 w-full rounded-[calc(var(--radius-s)_*_0.75)] font-semibold opacity-75 flex items-center justify-center border-[1px] border-[var(--border)] font-p-3 p-1.5">
              Transations
              <span className="flex h-3 w-3 opacity-50">
                <ChevronRight />
              </span>
            </span>
          </div>
        </div>

        <Lessons />
      </div>
      <div className="grid grid-rows-[auto_1fr] h-full overflow-hidden gap-2 mt-4">
        <YearlyCalendar year={2025} className={"w-[15rem]"} />
        <Events key="events-list" />
      </div>
    </div>
  );
}

export default StudentHome;
