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

const tabs = ["Events", "Lessons"];

function TeacherHome() {
  const [lessonsData, setLessonsData] = useState<LessonTypes[]>(lessons);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   getLessons({
  //     setData: setLessonsData,
  //     setErrorMessage,
  //     setIsError,
  //     setIsLoading,
  //     teacherId: teacherId,
  //   });
  // }, []);

  return (
    <div className="grid w-full h-full grid-cols-[1fr_auto] pb-2 gap-3 overflow-hidden">
      <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
        <div className="overview grid gap-3 h-[5.3rem] mt-4">
          <TeacherSubjectsOverview />
          <TeacherExamsOverview />
          <Announcements />
        </div>

        <Lessons  />
      </div>
      <div className="grid grid-rows-[auto_1fr] h-full overflow-hidden gap-2 mt-4">
        <YearlyCalendar year={2025} className={"w-[15rem]"} />
        <Events key="events-list" />
      </div>
    </div>
  );
}

export default TeacherHome;
