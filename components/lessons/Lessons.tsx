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
} from "date-fns";
import { getLessons } from "@/api/subjects";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import { motionTranstion, teacherId } from "@/constants/motionTranstion";
import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";
import { AnimatePresence, motion } from "motion/react";
import XClose from "../svg/XClose";
import Loader from "../ux/Loader";
import { getTeacherSubject } from "@/api/teachers";
import { IconStarFilled } from "@tabler/icons-react";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import { getClasses, getSubClasses } from "@/api/classes";
import { lessonsData } from "@/context/data/lessonsData";

const WeeklyCalendar: React.FC = () => {
  const [lessons, setLessons] = useState<LessonTypes[]>(lessonsData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const today = new Date();
  const dayOfWeek = getDay(today);
  const effectiveDate =
    dayOfWeek === 0
      ? addDays(today, 1)
      : dayOfWeek === 6
      ? addDays(today, 2)
      : today;
  const weekStart = startOfWeek(effectiveDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 5 }).map((_, i) => addDays(weekStart, i));
  // Only display time slots from 7 AM to 5 PM
  const hours = Array.from({ length: 13 }).map((_, i) => i + 7);
  const hourHeight = 64;

  const [showModal, setShowModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [classId, setClassId] = useState("");
  const [subClassId, setSubClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [userRole, setUserRole] = useState("");

  // useEffect(() => {
  //   getLessons({
  //     setData: setLessons,
  //     setIsLoading,
  //     setIsError,
  //     setErrorMessage,
  //     teacherId,
  //   });
  // }, []);

  const [assignedSubjectsData, setAssignedSubjectsData] = useState<
    SubjectTypes[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] =
    useState<SubjectTypes[]>(assignedSubjectsData);

  useEffect(() => {
    getTeacherSubject({
      setIsLoading,
      setErrorMessage,
      setIsError,
      setData: setAssignedSubjectsData,
      id: teacherId,
    });
  }, []);

  const handleSlotClick = (day: Date, hour: number) => {
    const dt = new Date(day);
    dt.setHours(hour, 0, 0, 0);
    setSelectedDateTime(dt);
    setNewTitle("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);

    if (!selectedDateTime || !newTitle.trim()) return;

    const newLesson: Omit<LessonTypes, "id"> = {
      dayTime: selectedDateTime.toISOString(),
      teacherId: teacherId,
      subjectId,
      topic: newTitle,
      classId: classId,
      schoolId: token?.schoolId || "",
      subClassId,
      term: "1",
      weekDay: format(selectedDateTime, "EEEE"),
      academicYear: "2025",
      weekNumber: 0,
      status: "scheduled",
    };

    try {
      const response = await fetch(`${BASE_URL}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(newLesson),
      });

      const result = await response.json();

      if (response.status == 200) {
        setLessons((prev) => [...prev, result.data]);
        setShowModal(false);
        setIsLoading(false);
      } else {
        setIsError(true);
        setErrorMessage(result.title || "something went wrong");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    setUserRole(token.role);
  }, [token]);

  return (
    <div className="relative h-full border-[1px] border-[var(--border)] rounded-[var(--radius)] overflow-auto hide-scrollbar">
      {/* Sticky Header */}
      <div className="sticky bg-white top-0 z-10 flex flex-col pt-2">
        <div className="grid grid-cols-[5.0rem_1fr_2.5rem] w-full">
          <span></span>
          <span className="font-semibold opacity-50 text-center">This week's timetable</span>
          <span></span>
        </div>
        <div className="flex opacity-90">
          <div className="w-10"></div>
          <div className="flex-1 grid grid-cols-5">
            {days.map((d, i) => {
              const isToday = isSameDay(d, today);
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center py-2 border-b-[1px] border-b-[var(--border)]`}
                >
                  <div className="text-sm font-medium font-p-3 opacity-50">
                    {format(d, "EEEE")}
                  </div>
                  <div
                    className={`"mt-1 font-p-1 font-semibold ${
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

      {/* Body */}
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
          {days.map((day, idx) => (
            <div
              key={idx}
              className="flex-1 relative border-l-[1px] border-l-[var(--border)]"
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  style={{ height: `${hourHeight}px` }}
                  className={`border-b-[1px] border-[var(--border)] ${
                    userRole.toLowerCase() == "teacher" ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (userRole.toLowerCase() == "teacher") {
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
                  return (
                    <div
                      key={lesson.id}
                      className="absolute left-2 right-1 rounded-[var(--radius-s)] bg-blue-200 border border-blue-400 text-xs p-1 overflow-hidden"
                      title={lesson.topic}
                      style={{ top: `${top}px`, height: `` }}
                    >
                      <div className="font-semibold font-p-3 truncate">
                        {lesson.topic}
                      </div>
                      <div className="font-p-4 mt-1">
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

      {/* Modal */}

      {showModal && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}

      <div
        className={`modal ${
          showModal ? "modal-active" : ""
        } add-class fixed h-screen w-screen left-0 top-0 flex items-center justify-center`}
      >
        <form onSubmit={handleSave} className="card relative">
          <motion.span className="card-title flex items-center">
            Add a lesson
            <span
              onClick={() => setShowModal(false)}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </motion.span>
          <div className="card-body flex flex-col gap-4">
            <p
              style={{ color: "var(--primary)" }}
              className="font-p-3 mt-2 p-2 font-semibold w-full bg-[var(--background)] rounded-[var(--radius-s)]"
            >
              {selectedDateTime && (
                <>
                  Time: {format(selectedDateTime, "eeee, MMM d, yyyy h:mm a")}
                </>
              )}
            </p>
            <motion.div className="input-group">
              <label htmlFor="">Topic</label>
              <input
                required
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                value={newTitle}
                type="text"
                placeholder="Topic"
              />
            </motion.div>

            <div className="subjects flex w-full ">
              {isLoading ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Loader variant="primary" />
                </div>
              ) : assignedSubjectsData && assignedSubjectsData.length > 0 ? (
                <AnimatePresence>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {assignedSubjectsData.map((s, index) => {
                      return (
                        <SubjectComponent
                          index={index}
                          setClassId={setClassId}
                          subjectId={subjectId}
                          subject={s}
                          setIsSuccess={() => {}}
                          setSubjectId={setSubjectId}
                          setSubClassId={setSubClassId}
                          key={s.id}
                        />
                      );
                    })}
                  </div>
                </AnimatePresence>
              ) : (
                <motion.div
                  layout
                  className="p-2 text-center flex flex-col items-center justify-center h-full w-full"
                >
                  <span className="font-semibold font-p-2 opacity-85">
                    No subjects found
                  </span>
                  <span className="font-p-4">
                    The teacher has not been assigned any subjects yet.{" "}
                  </span>
                </motion.div>
              )}
            </div>
            <div className="cta-container items-center flex gap-2 w-full justify-end">
              <AnimatePresence>
                {isError && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={motionTranstion}
                    style={{
                      width: "fit-content",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      height: "fit-content",
                    }}
                    className="error"
                  >
                    {errorMessage}
                  </motion.span>
                )}

                {isSuccess && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={motionTranstion}
                    style={{
                      width: "fit-content",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      height: "fit-content",
                    }}
                    className="success"
                  >
                    Classes has been added successfully
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                onClick={() => setShowModal(false)}
                className="cta-2 ml-auto"
              >
                Cancel
              </span>
              <button className="cta">{isLoading ? <Loader /> : "Add"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeeklyCalendar;

const SubjectComponent = ({
  index,
  subject,
  isSelected,
  setIsSuccess,
  setClassId,
  setSubClassId,
  setSubjectId,
  subjectId,
}: {
  subject: SubjectTypes;
  index: number;
  isSelected?: Boolean;
  setIsSuccess: (state: boolean) => void;
  setClassId: (state: string) => void;
  setSubClassId: (state: string) => void;
  setSubjectId: (state: string) => void;
  subjectId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [classData, setClassData] = useState<ClassTypes>();
  const [subClassData, setSubClassData] = useState<SubClassTypes>();

  useEffect(() => {
    if (subject.classId) {
      getClasses({
        setData: setClassData,
        setIsLoading,
        setIsError,
        setErrorMessage,
        id: subject.classId,
      });
    }

    if (subject.subClassId) {
      getSubClasses({
        setData: setSubClassData,
        setIsLoading,
        setIsError,
        setErrorMessage,
        id: subject.subClassId,
      });
    }
  }, [subject]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : isError ? (
        <></>
      ) : classData ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            onClick={() => {
              setClassId(classData.id);
              setSubClassId(subClassData?.id || "");
              setSubjectId(subject.id);
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.5,
              delay: index / 10,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            key={index}
            className={`cursor-pointer border-[var(--border)] justify-center relative p-1.5 flex flex-col border-[1px] ${
              subject.id == subjectId && "bg-[#f0f1fc]"
            } rounded-[var(--radius-s)]`}
          >
            <span className="font-p-2 font-medium">{subject.name}</span>
            <span className="flex gap-4 mt-0.5 items-center">
              {subject.isMandotory && (
                <>
                  <span
                    className={`flex items-center font-p-3 opacity-60 font-medium ${
                      subject.isMandotory ? "mandotory" : ""
                    }`}
                  >
                    <IconStarFilled
                      color="#ffc801"
                      className="h-2.5 w-2.5 mr-1"
                    />{" "}
                    Mandatory
                  </span>

                  <span className="font-black opacity-20">•</span>
                </>
              )}
              <span>
                {classData && (
                  <span className="font-p-3 font-medium opacity-60">
                    {classData.name}
                  </span>
                )}
                {subClassData && (
                  <span className="font-p-3 font-medium opacity-60">
                    {subClassData.name}
                  </span>
                )}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      ) : (
        <></>
      )}
    </>
  );
};
