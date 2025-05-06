"use client";

import useActiveYearStore from "@/context/academicYears";
import { years } from "@/context/academicYears";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { getDifference } from "@/utils/getDifference";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { getCookie } from "cookies-next";
import { BASE_URL } from "@/constants/BASE_URL";


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
  const [errorMessage, setErrorMessage] = useState("");
    const [teacherCount, setTeacherCounte] = useState(0);
    const token = getCookie(TOKEN_COOKIE_NAME);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

  useEffect(() => {
    const prevYear = data.find(
      (item) => item.year === years[years.indexOf(activeYear) + 1]
    );
    setPrevYearData(prevYear);
  }, [activeYear]);

  useEffect(() => {
      const getTeachers = async () => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
  
        try {
          const response = await fetch(`${BASE_URL}/teachers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
  
          if (response.status == 200) {
            setIsLoading(false);
            setTeacherCounte(data.totalCount);
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
      getTeachers();
    }, []);

  return (
    <div className="card">
      <div className="card-title">Active teachers</div>
      <div className="card-body flex gap-4 items-center">
        <h3>
          <NumberFlow
            value={teacherCount || 0}
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
