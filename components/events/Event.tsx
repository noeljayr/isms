"use client";

import { EventTypes } from "@/types/EventsTypes";
import Calendar from "../svg/Calendar";
import { formatDate } from "@/utils/formatDate";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { motionTranstion } from "@/constants/motionTranstion";
import ChevronDown from "../svg/ChevronDown";
import Pen from "../svg/Edit";
import Trash from "../svg/Trash";
import { deleteEvent } from "@/api/events";
import useEventModalStore from "@/context/modals/addEvent";
import { token } from "@/app/auth/token";

type props = {
  event: EventTypes;
  index: number;
};

function Event({ event, index }: props) {
  const [expand, setExpand] = useState(false);
  const { setAddEventChange } = useEventModalStore();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (!token) return;
    setUserRole(token.role);
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        ease: [0.25, 0.1, 0.25, 1],
        delay: index / 10,
        duration: 0.4,
      }}
      key={index}
      layout
      viewport={{ once: true }}
      className="event p-2 pl-3 flex  flex-col gap-1 relative"
    >
      <motion.span
        onClick={() => setExpand(!expand)}
        layout
        className="absolute h-full w-full z-[2] cursor-pointer"
      ></motion.span>

      {userRole.toLowerCase() === "admin" && (
        <motion.div
          layout
          className="event-actions flex gap-2 items-center absolute right-2 z-[3] bottom-2"
        >
          <span className="edit-action cursor-pointer opacity-85">
            <Pen />
          </span>
          <span
            onClick={() => {
              deleteEvent({
                setAddEventChange,
                id: event.id,
                setErrorMessage: () => {},
                setIsError: () => {},
                setIsLoading: () => {},
                setIsSuccess: () => {},
              });
            }}
            className="delete-action cursor-pointer opacity-85"
          >
            <Trash />
          </span>
        </motion.div>
      )}
      <motion.span
        layout
        className="bg-[var(--secondary)] rounded-md h-[50%] w-1 absolute left-[-0.1rem]"
      ></motion.span>
      <motion.div className="w-full flex flex-col truncate">
        <motion.span
          layout
          className="event-title cursor-pointer font-p-2 flex truncate font-medium"
        >
          {event.title}

          <motion.span className="ml-auto">
            <span
              style={{ transition: "var(--transition)" }}
              className={`opacity-35 flex ${
                expand ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown />
            </span>
          </motion.span>
        </motion.span>

        <motion.span
          initial={{
            opacity: 0,
            height: 0,
            overflow: "hidden",
            marginTop: 0,
            marginBottom: 0,
          }}
          animate={{
            opacity: 1,
            height: expand ? "auto" : 0,
            marginTop: expand ? "0.25rem" : 0,
            marginBottom: expand ? "0.25rem" : 0,
            overflow: "hidden",
          }}
          exit={{
            opacity: 0,
            height: 0,
            overflow: "hidden",
            marginTop: 0,
            marginBottom: 0,
          }}
          transition={motionTranstion}
          layout
          className="font-p-3 opacity-85"
        >
          {event.description}
        </motion.span>

        <motion.span layout className="date flex opacity-50 gap-2 items-center">
          <span
            className={`date-text cursor-pointer ${
              expand ? "" : "mt-1"
            } font-p-4 number`}
          >
            {formatDate(event.fromDate)}{" "}
            <span className="font-black opacity-50 mx-1.5">-</span>{" "}
            {formatDate(event.toDate)}
          </span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default Event;
