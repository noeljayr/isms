"use client";

import "@/css/events.css"
import AddEvent from "@/components/modals/upload/AddEvent";
import Calendar from "@/components/svg/Calendar";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import Loader from "@/components/ux/Loader";
import { BASE_URL } from "@/constants/BASE_URL";
import useEventModalStore from "@/context/modals/addEvent";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { EventTypes } from "@/types/event-types";
import { formatDate } from "@/utils/formatDate";
import { getCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function EventsPages() {
  const [timelineHieght, setTimelineHeight] = useState(0);
  const eventlistRef = useRef<HTMLDivElement>(null);
  const { addEventChange, setEventModalActive } =
  useEventModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [eventsData, setEventsData] = useState<EventTypes[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    if (eventlistRef.current) {
      const height = eventlistRef.current.offsetHeight;
      setTimelineHeight(height);
    }
  });

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/Event?searchQuery=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  }, [addEventChange]);

  return (
    <>
      <div className="card table-card">
        <span className="card-title">Events</span>
        <div className="card-body flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex gap-3 items-center w-full">
            <button onClick={setEventModalActive} className="cta">
              <Plus />
              Event
            </button>

            <div className="search input-group mr-auto">
              <Search />
              <input type="text" placeholder="Search for an event" />
            </div>
          </div>

          <div className="table events pl-1 h-full">
            <div
              ref={eventlistRef}
              className="event-list w-full grid gap-2 relative"
            >
              <span
                style={{ height: timelineHieght }}
                className="timeline absolute left-0.5"
              ></span>

              {isLoading ? (
                <div className="h-[5rem] w-[5rem] flex m-auto items-center justify-center">
                  <Loader variant="primary" />
                </div>
              ) : isError ? (
                <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
                  <span className="error">{errorMessage}</span>
                </div>
              ) : eventsData.length > 0 ? (
                eventsData.map((event, index) => (
                  <div key={index} className="event p-2 py-3 flex  flex-col gap-1">
                    <div className="w-full flex flex-col gap-1 truncate">
                      <span className="event-title truncate font-medium">
                        {event.title}
                      </span>
                      <span className="date flex opacity-50 gap-2 items-center">
                        <Calendar />
                        <span className="date-text number">
                          {formatDate(event.fromDate)} -{" "}
                          {formatDate(event.toDate)}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{ fontSize: "var(--p3)" }}
                  className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
                >
                  No events found
                </div>
              )}
            </div>
            <div className="pagination mt-auto pt-4">
              <span className="page active">1</span>
              {/* <span className="page">2</span> */}
            </div>
          </div>
        </div>
      </div>

      <AddEvent />
    </>
  );
}

export default EventsPages;
