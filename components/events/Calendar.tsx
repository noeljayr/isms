"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { EventTypes } from "@/types/EventsTypes";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import useEventModalStore from "@/context/modals/addEvent";
import { BASE_URL } from "@/constants/BASE_URL";
import { getLessons } from "@/api/subjects";
import { LessonTypes } from "@/types/SubjectsTypes";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { lessonsData } from "@/context/data/lessonsData";

// Types
export interface EventItem {
  id: string;
  title: string;
  description: string;
  fromDate: string; // ISO string
}

export interface LessonItem {
  id: string;
  subjectId: string;
  topic: string;
  classId: string;
  SchoolId: string;
  subClassId: string;
  teacherId: string;
  term: string;
  weekDay: string; // ISO string
  academicYear: string;
  dayTime: string;
  weekNumber: number;
  status: string;
}

export interface YearlyCalendarProps {
  year: number;
  lessons?: LessonTypes[];
  className: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function YearlyCalendar({
  year,
  className,
}: YearlyCalendarProps) {
  const [timelineHieght, setTimelineHeight] = useState(0);
  const eventlistRef = useRef<HTMLDivElement>(null);
  const { addEventChange, setEventModalActive } = useEventModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [events, setEventsData] = useState<EventTypes[]>([]);
  const [lessons, setLessons] = useState<LessonItem[]>(lessonsData);
  const searchParams = useSearchParams();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/Event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setEventsData(data.data);
        } else {
          setIsError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setIsError(true);
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, [addEventChange, token]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    events.forEach((evt) => {
      const key = evt.fromDate.slice(0, 10);
      map[key] = map[key] || [];
      map[key].push(evt);
    });
    return map;
  }, [events]);

  // Group lessons by date
  const lessonsByDate = useMemo(() => {
    const map: Record<string, LessonItem[]> = {};
    lessons.forEach((ls) => {
      const key = ls.weekDay.slice(0, 10);
      map[key] = map[key] || [];
      map[key].push(ls);
    });
    return map;
  }, [lessons]);

  const renderMonth = (month: number) => {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = first.getDay();
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < startDay; i++) cells.push(<div key={`b${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      const dayEvents = eventsByDate[dateKey] || [];
      const dayLessons = lessonsByDate[dateKey] || [];
      const cntE = dayEvents.length;
      const cntL = dayLessons.length;

      cells.push(
        <div key={dateKey} className="relative p-0.5 bg-gray-50 rounded group">
          <span className="number font-p-2">{d}</span>

          {/* Event badge */}
          {cntE > 0 && (
            <span className="absolute top-[-0.1rem] right-[-0.1rem] inline-flex items-center outline-[var(--white)] outline-[3px] justify-center h-1.5 w-1.5  font-bold bg-[var(--secondary)] rounded-full font-p-4"></span>
          )}

          {/* Lesson badge */}
          {cntL > 0 && (
            <span className="absolute bottom-[-0.1rem] left-[-0.1rem] inline-flex items-center outline-[var(--white)] outline-[3px] justify-center font-bold bg-[#BEDBFF] text-white rounded-full h-1.5 w-1.5 font-p-4"></span>
          )}

          {/* Tooltip on hover: show events then lessons */}
          {(cntE > 0 || cntL > 0) && (
            <div
              style={{
                gridTemplateColumns: cntE > 1 || cntL > 1 ? "1fr 1fr" : "1fr",
                transition: "var(--transition)",
              }}
              className="absolute left-0 top-full flex flex-col font-p-3 min-w-[9rem] mt-1 gap-1.5 p-2  border-[1px] bg-[var(--white)] border-[var(--border)]  shadow-lg rounded-[var(--radius-s)] opacity-0 group-hover:opacity-100 z-10"
            >
              {dayEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="whitespace-no-wrap pl-1 flex border-l-[2px] text-start justify-start border-l-[var(--secondary)] font-medium"
                >
                  {evt.title}
                </div>
              ))}
              {dayLessons.map((ls) => (
                <div
                  key={ls.id}
                  className="whitespace-no-wrap pl-1 flex text-start justify-start border-l-[2px] border-l-[#BEDBFF] font-medium"
                >
                  {ls.topic}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mt-2">
        <div className="grid grid-cols-7 font-p-3 opacity-50 text-xs font-medium text-center">
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1 text-center">{cells}</div>
      </div>
    );
  };

  return (
    <div
      className={`${className} rounded-[var(--radius)] border-[1px] p-2 overflow-visible border-[var(--border)] h-fit`}
    >
      <div className="flex justify-between items-center ">
        <button onClick={() => swiperRef.current?.slidePrev()} className="">
          <IconChevronLeft />
        </button>
        <span className="font-medium font-p-2 opacity-75">
          {MONTH_NAMES[currentMonth]} {year}
        </span>
        <button onClick={() => swiperRef.current?.slideNext()} className="">
          <IconChevronRight />
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        initialSlide={currentMonth}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentMonth(swiper.activeIndex)}
      >
        {Array.from({ length: 12 }, (_, idx) => (
          <SwiperSlide key={idx}>{renderMonth(idx)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
