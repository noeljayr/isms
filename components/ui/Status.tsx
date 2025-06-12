"use client";

import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import { useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

function Status({
  pReadyOnly,
  statuses,
  setActiveStatus,
  activeStatus,
}: {
  pReadyOnly: boolean;
  statuses: string[];
  setActiveStatus: (status: string) => void;
  activeStatus: string;
}) {
  const [optionsActive, setOptionsActive] = useState(false);
  const statusOptionsDiv = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       statusOptionsDiv.current &&
  //       !statusOptionsDiv.current.contains(event.target as Node)
  //     ) {
  //       setOptionsActive(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <AnimatePresence mode="popLayout">
      <span key="dummy" className="w-[4.5rem] h-[1.45rem]"></span>
      <motion.span
        key="statuses"
        layout
        transition={motionTranstion}
        animate={{
          borderRadius: `${optionsActive ? "var(--radius-s)" : "0.75rem"}`,
        }}
        className={`status ${pReadyOnly ? "pointer-events-none" : ""} py-1.5 ${
          activeStatus ? activeStatus.toLowerCase() : "deactived"
        }-status`}
      >
        <motion.span
          layout
          className={`flex status-label gap-1  ${
            pReadyOnly
              ? "pr-[0.75rem] pl-[0.75rem]"
              : "pr-[0.5rem] pl-[0.75rem]"
          }`}
          onClick={() => setOptionsActive(!optionsActive)}
        >
          <motion.span layout="position" transition={motionTranstion}>
            {activeStatus && activeStatus.length > 0
              ? activeStatus
              : "Deactived"}
          </motion.span>

          {!pReadyOnly ? (
            <motion.span
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motion}
            >
              <IconChevronDown
                key="icon"
                className={`${optionsActive ? "rotate-180" : "rotate-0"}`}
              />
            </motion.span>
          ) : null}
        </motion.span>
        {optionsActive && (
          <motion.span
            layout
            ref={statusOptionsDiv}
            className="status-options flex flex-col gap-1 px-1"
            animate={{ width: "100%" }}
            transition={motionTranstion}
          >
            {statuses.map((status, index) => (
              <motion.span
                layout
                onClick={() => {
                  setActiveStatus(status);
                  setOptionsActive(false);
                }}
                animate={{ width: "100%" }}
                transition={motionTranstion}
                className={`${status.toLowerCase()}-option py-1.5 rounded-[var(--radius-s)] bg-[var(--background-2)] border-[1px] ${
                  activeStatus == status
                    ? "border-[#acacf1]"
                    : "border-[var(--border)]"
                } px-2 items-center flex gap-1`}
                key={index + status}
              >
                {status}
              </motion.span>
            ))}
          </motion.span>
        )}
      </motion.span>
    </AnimatePresence>
  );
}

export default Status;
