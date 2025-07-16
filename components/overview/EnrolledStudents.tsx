"use client";

import NumberFlow from "@number-flow/react";
import { getDifference } from "@/utils/getDifference";
import { useEffect, useState } from "react";
import useActiveYearStore, { years } from "@/context/academicYears";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { getCookie } from "cookies-next";
import { useStudentModalStore } from "@/context/modals/students/addStudent";
import { BASE_URL } from "@/constants/BASE_URL";

type dataTyeps = {
  value: number;
  differenceInPercentage: number | null;
  year: string;
};

const data: dataTyeps[] = [
  {
    year: "2025",
    value: 1345,
    differenceInPercentage: -0.64,
  },
  {
    year: "2024",
    value: 1353.66,
    differenceInPercentage: 5.3,
  },
  {
    year: "2023",
    value: 1285.53,
    differenceInPercentage: null,
  },
];

function EnrolledStudents() {
  const { activeYear } = useActiveYearStore();
  const currentYearData = data.find((item) => item.year === activeYear);
  const [prevYearData, setPrevYearData] = useState<dataTyeps>();

  useEffect(() => {
    const prevYear = data.find(
      (item) => item.year === years[years.indexOf(activeYear) + 1]
    );
    setPrevYearData(prevYear);
  }, [activeYear]);

  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const token = getCookie(TOKEN_COOKIE_NAME);
  const { studentChange } = useStudentModalStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/students`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setStudentCount(data.totalCount);
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
    getStudents();
  }, [studentChange, token]);

  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]">
      <div className="font-semibold font-p-2 opacity-55">Enrolled students</div>
      <div className="flex gap-4 items-center">
        <h3>
          <NumberFlow
            value={studentCount || 0}
            format={{ notation: "standard", maximumFractionDigits: 2 }}
          />
        </h3>

        {/* <div className="flex gap-2 items-center ml-auto">
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
        </div> */}
      </div>
    </div>
  );
}

export default EnrolledStudents;
