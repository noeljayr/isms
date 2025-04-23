"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import ChevronDown from "../svg/ChevronDown";
import { ChartOptions } from "@/utils/chart-options";
import NumberFlow from "@number-flow/react";

ChartJS.register(ArcElement, Legend);

function TeacherGenderDistribution() {
  const data = {
    labels: ["Males", "Females"],
    datasets: [
      {
        data: [38, 13],
        backgroundColor: ["#D9DAF7", "#FFF1C0"],
        borderColor: ["#BFC1F9", "#FFD232"],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="card gender-distribution relative">
      <div className="card-title">Teachers’ gender distribution</div>
      <div className="card-body overflow-hidden items-center h-full w-full flex relative">
        <div className="flex items-center justify-center relative left-[-0.25rem] overflow-hidden chart-container">
          <Doughnut
            width="100%"
            style={{ position: "absolute" }}
            height="100%"
            data={data}
            options={ChartOptions}
          />
          <div className="chart-year relative">
            <span className="flex items-center gap-1 number">
              2025 <ChevronDown />
            </span>
          </div>
        </div>

        <div className="legend flex flex-col gap-4 ml-auto absolute">
          <span className="legend-stat males flex items-center gap-2">
            <span className="number stat">
              <NumberFlow value={38} />
            </span>
            Males
            <span className="number font-bold opacity-60">
              <NumberFlow value={75} />%
            </span>
          </span>

          <span className="legend-stat females flex items-center gap-2">
            <span className="number stat">
              <NumberFlow value={13} />
            </span>
            Females
            <span className="number font-bold opacity-60">
              <NumberFlow value={25} />%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeacherGenderDistribution;
