"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChevronDown from "../svg/ChevronDown";
import { ChartOptions } from "@/utils/chart-options";
import NumberFlow from "@number-flow/react";
import { StudentTypes } from "@/types/StudentTypes";
import { getStudents } from "@/api/students";
import Loader from "../ux/Loader";

ChartJS.register(ArcElement, Legend);

function StudentGenderDistribution() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [femaleStudents, setfemaleStudents] = useState<StudentTypes[]>([]);
  const [maleStudents, setMaleStudents] = useState<StudentTypes[]>([]);

  useEffect(() => {
    getStudents({
      setIsLoading,
      setData: setMaleStudents,
      setErrorMessage,
      setIsError,
      status: "active",
      pageSize: 5000000,
    });
  }, []);

  useEffect(() => {
    getStudents({
      setIsLoading,
      setData: setfemaleStudents,
      setErrorMessage,
      setIsError,
      status: "active",
      pageSize: 5000000,
    });
  }, []);

  const data = {
    labels: ["Males", "Females"],
    datasets: [
      {
        data: [maleStudents.length, femaleStudents.length],
        backgroundColor: ["#D9DAF7", "#FFF1C0"],
        borderColor: ["#BFC1F9", "#FFD232"],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)] h-[11rem]  gender-distribution relative">
      <div className="font-semibold font-p-2 opacity-55 relative flex items-center">
        Active students
      </div>
      <div className="overflow-hidden items-center h-full w-full flex relative">
        {isLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex w-full h-full items-center justify-center">
            <span className="font-p-2">Something went wrong</span>
          </div>
        ) : maleStudents && femaleStudents ? (
          <>
            <div className="flex items-center justify-center relative left-[-0.25rem] overflow-hidden chart-container">
              <Doughnut
                width="100%"
                style={{ position: "absolute" }}
                height="100%"
                data={data}
                options={ChartOptions}
              />

              <div className="flex flex-col items-center total-chart-number">
                <h1>
                  <NumberFlow
                    value={maleStudents.length + femaleStudents.length}
                  />
                </h1>
                <span className="font-p-2 opacity-75 font-semibold">Total</span>
              </div>
            </div>

            <div className="legend flex flex-col gap-2  absolute top-[35%]">
              <span className="legend-stat males flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={maleStudents.length} />
                </span>
                Males
              </span>

              <span className="legend-stat females flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={femaleStudents.length} />
                </span>
                Females
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <span className="font-p-2 font-semibold opacity-75">
              No data found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentGenderDistribution;
