"use client";

import { getTeacherSubject } from "@/api/teachers";
import ImportGrades from "@/components/modals/grades/ImportGrades";
import ChevronDown from "@/components/svg/ChevronDown";
import FileDownload from "@/components/svg/FileDownload";
import Plus from "@/components/svg/Plus";
import { teacherId } from "@/constants/motionTransition";
import { useImportGradesModalStore } from "@/context/modals/grades/importGrades";
import { SubjectTypes } from "@/types/SubjectsTypes";
import { useEffect, useState } from "react";

const years = ["2025", "2024"];

function TeacherGrades() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [assignedChanged, setAssignedChanged] = useState(false);
  const [data, setData] = useState<SubjectTypes[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [activeSubject, setActiveSubject] = useState<SubjectTypes>();
  const [activeTerm, setActiveTerm] = useState(1);

  const terms = [1, 2, 3];

  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");

  const { setImportGradesModalActive } = useImportGradesModalStore();

  useEffect(() => {
    getTeacherSubject({
      setIsLoading,
      setErrorMessage,
      setIsError,
      setData,
      id: teacherId,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setActiveSubject(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  return (
    <>
      <div className="mt-2 grid grid-rows-[auto_1fr] h-full gap-2">
        <div className="flex items-center gap-2">
          <button className="cta">
            <Plus /> Upload grade
          </button>
          <button
            onClick={setImportGradesModalActive}
            className="cta-2"
          >
            <span className="rotate-180">
              <FileDownload />
            </span>
            Import grades
          </button>

          <button
            onClick={setImportGradesModalActive}
            className="cta-2 mr-auto"
          >
            <span className="">
              <FileDownload />
            </span>
            Download template
          </button>
          <div
            style={{ width: "11rem" }}
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
              {activeSubject?.name}
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
              {data.map((subject, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setActiveSubject(subject);
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeSubject === subject ? "active" : ""
                  }`}
                >
                  {subject.name}
                </span>
              ))}
            </div>
          </div>

          <div className={`years flex items-center relative`}>
            <span
              style={{
                left: position + "rem",
              }}
              className="active-year-indicator z-0 absolute"
            ></span>
            {years.map((year) => (
              <div
                key={year}
                className={`year font-bold flex items-center justify-center relative z-[1] number cursor-pointer ${
                  activeYear === year ? "active-year opacity-85" : "opacity-50"
                }`}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </div>
            ))}
          </div>

          <div
            style={{ width: "5rem" }}
            className={`dropdown class-dropdown cta-2 grid grid-cols-[auto_1fr] items-center gap-1 relative ${
              dropdownOpen2 ? "dropdown-active" : ""
            }`}
          >
            <span
              onClick={() => {
                setDropdownOpen2(!dropdownOpen2);
              }}
              className="dropdown-title"
            >
              Term {activeTerm}
            </span>
            <span
              onClick={() => {
                setDropdownOpen2(!dropdownOpen2);
              }}
              className="dropdown-icon"
            >
              <ChevronDown />
            </span>
            <div
              className={`dropdown-options ${
                dropdownOpen2 ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {terms.map((term, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setActiveTerm(term);
                    setDropdownOpen2(!dropdownOpen2);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeTerm === term ? "active" : ""
                  }`}
                >
                  Term {term}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="table relative h-full">
          <div className="table-header grid-cols-[4rem_1fr_10rem]">
            <div className="th">Rank</div>
            <div className="th">Student</div>
            <div className="th">Score</div>
          </div>
          <div className="table-body relative hide-scrollbar">
            <div className="flex items-center absolute w-full h-full justify-center">
              <span className="font-semibold font-p-2 opacity-75">
                No grades have been uploaded yet
              </span>
            </div>
          </div>
        </div>
      </div>

      <ImportGrades />
    </>
  );
}

export default TeacherGrades;
