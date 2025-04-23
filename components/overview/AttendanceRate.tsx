"use client";

import useActiveYearStore, { years } from "@/context/academicYears";
import NumberFlow from "@number-flow/react";
import { getDifference } from "@/utils/getDifference";
import { useEffect, useState } from "react";

type dataTypes = {
  value: number;
  differenceInPercentage: number | null;
  year: string;
};

const data: dataTypes[] = [
  {
    year: "2025",
    value: 89.01,
    differenceInPercentage: 8.05,
  },
  {
    year: "2024",
    value: 82.38,
    differenceInPercentage: 4.5,
  },
  {
    year: "2023",
    value: 78.83,
    differenceInPercentage: null,
  },
];

function AttendanceRate() {
  const { activeYear } = useActiveYearStore();
  const currentYearData = data.find((item) => item.year === activeYear);
  const [prevYearData, setPrevYearData] = useState<dataTypes>();


  useEffect(() => {
      const prevYear = data.find(
        (item) => item.year === years[years.indexOf(activeYear) + 1]
      );
      setPrevYearData(prevYear);
    }, [activeYear]);


  return (
    <div className="card">
      <div className="card-title">Student attendance </div>
      <div className="card-body flex gap-4 items-center">
        <h3>
          <NumberFlow
            value={currentYearData?.value || 0}
            format={{ notation: "standard", maximumFractionDigits: 2 }}
          />
          %
        </h3>

        <div className="flex gap-2 items-center ml-auto">
          <span
            className={`difference flex gap-2 ${
              prevYearData ? "" : "opacity-0"
            } ml-auto items-center`}
          >
            <span
              className={`percentage ${getDifference(
                currentYearData,
                prevYearData
              )} number`}
            >
              <NumberFlow
                value={currentYearData?.differenceInPercentage || 0}
                format={{ notation: "standard", maximumFractionDigits: 2 }}
              />{" "}
              %
            </span>
            {prevYearData && (
              <span className="prev-year opacity-50">{prevYearData?.year}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceRate;
