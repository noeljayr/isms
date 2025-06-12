"use client";

import "@/css/events.css";

import Event from "./Event";
import { useEffect, useState } from "react";
import useEventModalStore from "@/context/modals/addEvent";
import { EventTypes } from "@/types/EventsTypes";
import Loader from "../ux/Loader";
import { AnimatePresence, motion } from "motion/react";
import Plus from "../svg/Plus";
import Search from "../svg/Search";
import { getEvents } from "@/api/events";
import AddEvent from "../modals/events/AddEvent";
import { motionTranstion } from "@/constants/motionTranstion";
import { token } from "@/app/auth/token";

function Events() {
  const { addEventChange, setEventModalActive } = useEventModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventsData, setEventsData] = useState<EventTypes[]>([]);
  const [search, setSearch] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getEvents({
      setData: setEventsData,
      setErrorMessage,
      setIsError,
      setIsLoading,
      search,
    });
  }, [addEventChange, search]);

  useEffect(() => {
    if (!token) return;
    setUserRole(token.role);
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTranstion}
      className="events overflow-hiddent grid h-full grid-rows-[auto_1fr] gap-1"
    >
      <motion.div
        className={`grid gap-3 ${
          userRole.toLowerCase() == "admin"
            ? "grid-cols-[auto_1fr]"
            : "grid-cols-1"
        }`}
      >
        {userRole.toLowerCase() === "admin" && (
          <motion.div
            onClick={setEventModalActive}
            layout
            transition={motionTranstion}
            className="h-full add-event-btn flex items-center justify-center gap-2 font-p-2 p-2 bg-[var(--white)] border-[1px] border-[var(--border)] border-dashed rounded-[var(--radius)] cursor-pointer bg-[var(--white)]"
          >
            <Plus />
          </motion.div>
        )}
        <div className="search-event grid gap-2 grid-rows-[1fr_auto] items-center rounded-[var(--radius-s)] border-[1px] border-[var(--border)] relative p-2 h-[2rem] w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="font-p-2 font-semibold"
            placeholder="Search for events..."
          />
          <span className="absolute right-2 opacity-75">
            <Search />
          </span>
        </div>
      </motion.div>
      <div className="flex flex-col h-full overflow-y-auto gap-1 hide-scrollbar rounded-[var(--radius-m)]">
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
            <AnimatePresence mode="wait">
              <Event key={index} index={index} event={event} />
            </AnimatePresence>
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

      <AddEvent />
    </motion.div>
  );
}

export default Events;
