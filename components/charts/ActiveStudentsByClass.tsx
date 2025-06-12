"use client";
import "@/css/charts.css";
import React, { useEffect, useState } from "react";
import ChevronDown from "../svg/ChevronDown";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ClassTypes } from "@/types/ClassesTypes";
import { getClasses } from "@/api/classes";
import Loader from "../ux/Loader";
import { getStudents } from "@/api/students";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentBarChart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [classes, setClasses] = useState<ClassTypes[]>();
  const [labels, setLabels] = useState<string[]>([]);
  const [dataValues, setDataValues] = useState<number[]>([]);

  useEffect(() => {
    getClasses({
      setData: setClasses,
      setIsError,
      setErrorMessage,
      setIsLoading,
    });
  }, []);

  useEffect(() => {
    if (!classes) return;
    if (classes.length < 1) return;

    const labels: string[] = [];
    const data: number[] = [];

    classes.forEach((className) => {
      let count = 0;
      labels.push(className.name);

      getStudents({
        setData: (dataT) => {
          count = dataT.length;
        },
        setIsError,
        setErrorMessage,
        setIsLoading,
        classId: className.id,
        pageSize: 500000,
      });

      data.push(count);
    });

    setDataValues(data);
    setLabels(labels);
  }, [classes]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Students",
        data: dataValues,
        backgroundColor: ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Student Count per Class",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex w-full h-full relative">
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex w-full h-full items-center justify-center">
          <span className="font-p-2">Something went wrong</span>
        </div>
      ) : classes ? (
        <>
          <Bar
            width="100%"
            style={{ position: "absolute" }}
            height="100%"
            options={options}
            data={data}
          />
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <span className="font-p-2 font-semibold opacity-75">
            No data found
          </span>
        </div>
      )}
    </div>
  );
};

function ActiveStudentsByClass() {
  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius)] border-[1px] border-[var(--border)]  student-bar-chart relative">
      <div className="font-semibold font-p-2 opacity-55 relative flex items-center">
        Total active students by class
      </div>
      <div className="mt-1 overflow-hidden items-center h-full w-full flex relative">
        <StudentBarChart />
      </div>
    </div>
  );
}

export default ActiveStudentsByClass;
