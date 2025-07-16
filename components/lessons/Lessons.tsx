"use client";

import "@/css/subjects.css";
import React, { useEffect, useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  differenceInCalendarDays,
  addMinutes,
  isSameDay,
  getDay,
  isBefore,
} from "date-fns";
import { LessonTypes } from "@/types/SubjectsTypes";
import { useTokenStore } from "@/context/token";
import { getLessons } from "@/api/subjects";
import AddLesson from "../modals/lessons/AddLesson";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const views = ["Day view", "Week view"];

const WeeklyCalendar: React.FC = () => {
  const { Id, role } = useTokenStore();
  const [teacherId, setTeacherId] = useState(Id);
  const [lessons, setLessons] = useState<LessonTypes[]>([]);

 
  const [activeView, setActiveView] = useState("Week view");
  const [position, setPosition] = useState("0");

  useEffect(() => {
    const index = views.indexOf(activeView);
    setPosition(`${index * 4.5}`);
  }, [activeView]);

 
  const today = new Date();
  const dayOfWeek = getDay(today);
  const effectiveToday =
    dayOfWeek === 0
      ? addDays(today, 1)
      : dayOfWeek === 6
      ? addDays(today, 2)
      : today;

  const [weekStart, setWeekStart] = useState(
    startOfWeek(effectiveToday, { weekStartsOn: 1 })
  );

  const [selectedDay, setSelectedDay] = useState<Date>(effectiveToday);

  const days = Array.from({ length: 5 }).map((_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 13 }).map((_, i) => i + 7);
  const hourHeight = 64;

  const [showModal, setShowModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [subClassId, setSubClassId] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    getLessons({
      setData: setLessons,
      setIsLoading: () => {},
      setIsError: () => {},
      setErrorMessage: () => {},
      teacherId: role.toLowerCase() === "teacher" ? teacherId : "",
      classId,
    });
  }, [teacherId, classId, role]);

  const getDaysToDisplay = () => (activeView === "Week view" ? days : [selectedDay]);

  const handleSlotClick = (day: Date, hour: number) => {
    const selectedDate = new Date(day);
    selectedDate.setHours(hour, 0, 0, 0);

    if (isBefore(selectedDate, today)) return; // Prevent past lesson adding

    setSelectedDateTime(selectedDate);
    setNewTitle("");
    setShowModal(true);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setActiveView("Day view");
  };

  const goToPreviousWeek = () => {
    const newStart = addDays(weekStart, -7);
    setWeekStart(newStart);
    if (activeView === "Day view") setSelectedDay(addDays(selectedDay, -7));
  };

  const goToNextWeek = () => {
    const newStart = addDays(weekStart, 7);
    setWeekStart(newStart);
    if (activeView === "Day view") setSelectedDay(addDays(selectedDay, 7));
  };

  return (
    <div className="relative h-full border-[1px] border-[var(--border)] rounded-[var(--radius)] overflow-auto hide-scrollbar">
      <div className="p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={goToPreviousWeek}
            className="h-7 w-7 cursor-pointer flex items-center justify-center border border-[var(--border)] rounded-full bg-[var(--background)]"
          >
            <IconChevronLeft className="h-4 w-4 opacity-80" />
          </button>
          <button
            onClick={goToNextWeek}
            className="h-7 w-7 cursor-pointer flex items-center justify-center border border-[var(--border)] rounded-full bg-[var(--background)]"
          >
            <IconChevronRight className="h-4 w-4 opacity-80" />
          </button>
        </div>
       

        <div
          style={{ width: "9rem" }}
          className={`years flex items-center relative`}
        >
          <span
            style={{
              left: position + "rem",
              width: "4.5rem",
              height: "1.8rem"
            }}
            className="active-year-indicator z-0 absolute"
          ></span>
          {views.map((view) => (
            <div
              key={view}
              style={{ width: "4.5rem", height: "1.8rem" }}
              className={`year font-bold flex items-center justify-center relative z-[1] number cursor-pointer ${
                activeView === view ? "active-year opacity-85" : "opacity-50"
              }`}
              onClick={() => setActiveView(view)}
            >
              {view}
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bg-white top-0 z-10 flex flex-col pt-2">
        <div className="flex opacity-90">
          <div className="w-10"></div>
          <div className={`flex-1 grid ${activeView === "Day view" ? "grid-cols-1": 'grid-cols-5'}`}>
            {getDaysToDisplay().map((d, i) => {
              const isToday = isSameDay(d, today);
              return (
                <div
                  key={i}
                  onClick={() => handleDayClick(d)}
                  className="flex flex-col items-center py-2 border-b-[1px] border-b-[var(--border)] cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-sm font-medium font-p-3 opacity-50">
                    {format(d, "EEEE")}
                  </div>
                  <div
                    className={`mt-1 font-p-1 font-semibold ${
                      isToday ? "today-calendar" : "opacity-75"
                    }`}
                  >
                    {format(d, "d")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col w-10 text-right border-r-[var(--border)]">
          {hours.map((h) => (
            <div
              key={h}
              style={{ height: `${hourHeight}px` }}
              className="p-2 pl-1 font-p-3 border-b-[var(--border)]"
            >
              {format(new Date().setHours(h, 0, 0, 0), "h a")}
            </div>
          ))}
        </div>

        <div className="flex-1 flex">
          {getDaysToDisplay().map((day, idx) => (
            <div
              key={idx}
              className="flex-1 relative border-l-[1px] border-l-[var(--border)]"
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  style={{ height: `${hourHeight}px` }}
                  className={`border-b-[1px] border-[var(--border)] ${
                    role.toLowerCase() === "teacher" ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (role.toLowerCase() === "teacher") {
                      handleSlotClick(day, hour);
                    }
                  }}
                />
              ))}

              {lessons
                .filter(
                  (lesson) =>
                    differenceInCalendarDays(new Date(lesson.dayTime), day) ===
                    0
                )
                .map((lesson) => {
                  const ld = new Date(lesson.dayTime);
                  const calendarStartMinutes = 7 * 60;
                  const lessonMinutes = ld.getHours() * 60 + ld.getMinutes();
                  const offsetMinutes = lessonMinutes - calendarStartMinutes;
                  const top = (offsetMinutes / 60) * hourHeight;
                  const isPast = isBefore(ld, today);
                  return (
                    <div
                      key={lesson.id}
                      className={`absolute left-2 right-1 rounded-[var(--radius-s)] bg-blue-200 border border-blue-400 text-xs p-1 overflow-hidden ${
                        isPast ? "opacity-50" : ""
                      }`}
                      title={lesson.topic}
                      style={{ top: `${top}px` }}
                    >
                      <div
                        className={`${
                          isPast ? "line-through" : ""
                        } font-semibold font-p-3 truncate`}
                      >
                        {lesson.topic}
                      </div>
                      <div
                        className={`${
                          isPast ? "line-through" : ""
                        } font-p-4 mt-1`}
                      >
                        {format(ld, "h:mm a")} –{" "}
                        {format(addMinutes(ld, 60), "h:mm a")}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0" />
      )}

      {selectedDateTime && (
        <AddLesson
          newTitle={newTitle}
          selectedDateTime={selectedDateTime}
          setLessons={setLessons}
          setNewTitle={setNewTitle}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;
