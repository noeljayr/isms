"use client";

import "@/css/events.css";
import { events } from "@/data/events";
import Event from "./Event";
import { useEffect, useRef, useState } from "react";
import useEventModalStore from "@/context/modals/addEvent";
import { getCookie } from "cookies-next/client";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { EventTypes } from "@/types/event-types";
import { useSearchParams } from "next/navigation";
import { BASE_URL } from "@/constants/BASE_URL";
import Calendar from "../svg/Calendar";
import { formatDate } from "@/utils/formatDate";
import Loader from "../ux/Loader";

function Events() {
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
            `${BASE_URL}/Event`,
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
    <div className="events card">
      <div className="card-title">This term's events</div>
      <div className="card-body h-full w-full">
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
      </div>
    </div>
  );
}

export default Events;
