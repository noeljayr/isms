"use client";

import NumberFlow from "@number-flow/react";
import { useState } from "react";

function OverallAverage({
  percentage,
  rank,
  difference,
}: {
  percentage: number;
  rank: number;
  difference: number;
}) {
  const radius = 40;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  const getDifference = (diff: number) => {
    let difference = "stale";

    if (diff > 0) {
      difference = "growth";
    } else if (diff < 0) {
      difference = "decline";
    } else {
      difference = "stale";
    }

    return difference;
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-[17rem] h-[14rem] flex-col relative border-[1px] border-[var(--border)] rounded-[var(--radius)] p-2">
      <span className="font-semibold mx-auto opacity-85">Overall average</span>
      <div className="flex w-full left-3 flex-col items-center relative justify-center">
        <svg
          className="w-full h-[16rem] absolute bottom-1"
          viewBox="0 0 110 100"
        >
          <path
            style={{ strokeWidth: "0.10rem", stroke: "#eee" }}
            d="M10,90 A40,40 0 0,1 90,90"
            fill="none"
            stroke="#eee"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M10,90 A40,40 0 0,1 90,90"
            fill="none"
            stroke=""
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              strokeWidth: "0.05rem",
              stroke: "var(--primary)",
              filter: "blur(2px)",
              opacity: 0.7,
            }}
          />

          <path
            d="M10,90 A40,40 0 0,1 90,90"
            fill="none"
            stroke=""
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ strokeWidth: "0.20rem", stroke: "var(--primary)" }}
          />
        </svg>

        <div className="absolute w-[calc(100%-0.5rem)] pb-4 border-b-[1px] border-b-[var(--border)] bottom-[0.5rem] pt-[0rem] border-dashed left-[-0.5rem] flex flex-col items-center justify-center">
          <span className="number flex font-bold">
            <NumberFlow style={{ fontSize: "2rem" }} value={percentage} />
            <span className="font-p-2 number font-bold opacity-50">%</span>
          </span>
          <span className={"difference flex items-center"}>
            <span className={`font-p-4 ${getDifference(difference)} py-1 px-2 rounded-3xl font-bold`}>
              <NumberFlow
                value={difference}
                format={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
              />{" "}
              %
            </span>
          </span>
        </div>
      </div>

      <div className="w-full pt-2 flex flex-col gap-2">
        <div className="bg-[var(--background)]  border-[1px] border-[var(--border)]  p-2 font-p-3 font-semibold rounded-[var(--radius-m)] text-center">
          <span className="opacity-75">You're ranked</span>{" "}
          <span className="number">
            #
            <NumberFlow value={rank} />
          </span>{" "}
          <span className="opacity-75">out of 120 students</span>
        </div>
      </div>
    </div>
  );
}

export default OverallAverage;
