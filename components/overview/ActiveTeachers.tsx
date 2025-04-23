"use client";

import useActiveYearStore from "@/context/academicYears";
import { years } from "@/context/academicYears";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { getDifference } from "@/utils/getDifference";


type dataTypes = {
  value: number;
  differenceInPercentage: number | null;
  year: string;
};

const data: dataTypes[] = [
  {
    value: 51,
    differenceInPercentage: -5.03,
    year: "2025",
  },
  {
    value: 54,
    differenceInPercentage: 4.0,
    year: "2024",
  },
  {
    value: 52,
    differenceInPercentage: null,
    year: "2023",
  },
];

function ActiveTeachers() {
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
      <div className="card-title">Active teachers</div>
      <div className="card-body flex gap-4 items-center">
        <h3>
          <NumberFlow
            value={currentYearData?.value || 0}
            format={{ notation: "standard", maximumFractionDigits: 0 }}
          />
        </h3>

        <div className="flex gap-2 items-center ml-auto">
          <span className={`difference flex gap-2 ${prevYearData? "": "opacity-0"} ml-auto items-center`}>
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

export default ActiveTeachers;
