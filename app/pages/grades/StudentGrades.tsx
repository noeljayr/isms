"use client";

import "@/css/charts.css";

import OverallAverage from "@/components/charts/OverallAverage";
import PerformanceChart from "@/components/charts/PerformanceChart";
import FileDownload from "@/components/svg/FileDownload";
import { useState } from "react";
import ChevronDown from "@/components/svg/ChevronDown";
import { AnimatePresence, motion } from "motion/react";
import NumberFlow from "@number-flow/react";

type Grade = {
  subject: string;
  score: number;
  remark: string;
};

type ClassGrades = {
  class: string;
  grades: Grade[];
  average: number;
  rank: number;
};

type ClassWithDifference = ClassGrades & {
  averageDifference: number;
};

export const gradesData = [
  {
    class: "Form 4C",
    grades: [
      { subject: "Biology", score: 76, remark: "pass" },
      { subject: "History", score: 57, remark: "pass" },
      { subject: "Chichewa", score: 41, remark: "fail" },
      { subject: "Agriculture", score: 69, remark: "pass" },
      { subject: "Computer Studies", score: 81, remark: "pass" },
    ],
    average: 64.8,
    rank: 8,
    averageDifference: 4.4,
  },
  {
    class: "Form 3C",
    grades: [
      { subject: "Biology", score: 63, remark: "pass" },
      { subject: "History", score: 48, remark: "fail" },
      { subject: "Chichewa", score: 53, remark: "pass" },
      { subject: "Agriculture", score: 72, remark: "pass" },
      { subject: "Computer Studies", score: 66, remark: "pass" },
    ],
    average: 60.4,
    rank: 9,
    averageDifference: -19.2,
  },
  {
    class: "Form 2C",
    grades: [
      { subject: "Biology", score: 88, remark: "pass" },
      { subject: "History", score: 77, remark: "pass" },
      { subject: "Chichewa", score: 69, remark: "pass" },
      { subject: "Agriculture", score: 91, remark: "pass" },
      { subject: "Computer Studies", score: 73, remark: "pass" },
    ],
    average: 79.6,
    averageDifference: 29.2,
    rank: 3,
  },
  {
    class: "Form 1C",
    grades: [
      { subject: "Biology", score: 35, remark: "fail" },
      { subject: "History", score: 59, remark: "pass" },
      { subject: "Chichewa", score: 44, remark: "fail" },
      { subject: "Agriculture", score: 53, remark: "pass" },
      { subject: "Computer Studies", score: 61, remark: "pass" },
    ],
    average: 50.4,
    rank: 14,
    averageDifference: 0,
  },
];

function StudentGrades() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [activeGrades, setActiveGrades] = useState(gradesData[0]);

  return (
    <div className="grid mt-2 grid-cols-[1fr_auto] overflow-hidden gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full">
          <div
            className={`dropdown class-dropdown cta-2 grid grid-cols-[auto_1fr] items-center gap-1 relative ${
              dropdownOpen ? "dropdown-active" : ""
            }`}
          >
            <span
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="dropdown-title"
            >
              {activeGrades.class}
            </span>
            <span
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="dropdown-icon"
            >
              <ChevronDown />
            </span>
            <div
              className={`dropdown-options ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {gradesData.map((grade, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setActiveGrades(grade);
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeGrades === grade ? "active" : ""
                  }`}
                >
                  {grade.class}
                </span>
              ))}
            </div>
          </div>

          <button className="cta-2 ml-auto">
            <FileDownload />
            Download results
          </button>
        </div>

        <div className="table">
          <div className="table-header grid-cols-[2rem_1fr_10rem]">
            <div className="th">#</div>
            <div className="th">Subject</div>
            <div className="th">Score</div>
          </div>
          <div className="table-body hide-scrollbar">
            <AnimatePresence>
              {activeGrades.grades.map((grade, index) => {
                let idx = index + 1;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: (0.5 * idx) / 5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="tr grid grid-cols-[2rem_1fr_10rem]"
                  >
                    <span className="td">{idx}</span>
                    <span className="td">{grade.subject}</span>
                    <span className="td">
                      <NumberFlow value={grade.score} /> %
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <OverallAverage
          percentage={activeGrades.average}
          rank={activeGrades.rank}
          difference={activeGrades.averageDifference}
        />

        <div className="border-[1px] border-[var(--border)] p-2 rounded-[var(--radius)] gap-2 flex flex-col">
          <span className="font-semibold mx-auto opacity-85">
            Perfomance trend
          </span>

          <div className="perfomance-chart h-[13rem]">
            <PerformanceChart  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentGrades;
