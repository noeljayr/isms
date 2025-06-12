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
    year: "2023",
    value: 5273894.74,
    differenceInPercentage: null,
  },
  {
    year: "2024",
    value: 5418926.85,
    differenceInPercentage: 2.75,
  },
  {
    year: "2025",
    value: 5500210.75,
    differenceInPercentage: 1.5,
  },
];

function Fees() {
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
    <div className="grid bg-[var(--background)] p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55">Fees collected</div>
      <div className="flex gap-4 items-center">
        <h3>
          K{" "}
          <NumberFlow
            value={currentYearData?.value || 0}
            format={{ notation: "standard", maximumFractionDigits: 2 }}
          />
        </h3>
      </div>
    </div>
  );
}

export default Fees;
