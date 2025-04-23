"use client";

import ChevronDown from "@/components/svg/ChevronDown";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import { useEffect, useState } from "react";
import { studentsData } from "@/data/students";
import AddStudent from "@/components/modals/AddStudent";
import useStudentModalStore from "@/context/modals/addStudent";

const years = ["2025", "2024", "2023"];
const classes = ["Form 4", "Form 3", "Form 2", "Form 1"];

function Students() {
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  const [activeClass, setActiveClass] = useState("Form 4");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setStudentModalActive } = useStudentModalStore();

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setStudentModalActive} className="cta">
            <Plus />
            New student
          </button>
          <div className="search input-group mr-auto">
            <Search />
            <input type="text" placeholder="Search for students..." />
          </div>

          <div
            className={`dropdown class-dropdown cta-2 flex items-center gap-1 relative ${
              dropdownOpen ? "dropdown-active" : ""
            }`}
          >
            <span
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="dropdown-title"
            >
              {activeClass}
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
              {classes.map((className) => (
                <span
                  key={className}
                  onClick={() => {
                    setActiveClass(className);
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeClass === className ? "active" : ""
                  }`}
                >
                  {className}
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
        </div>

        <div className="table students-table">
          <div className="table-header">
            <div className="th">#</div>
            <div className="th">Name</div>
            <div className="th">Guardian</div>
            <div className="th">Class</div>
          </div>
          <div className="table-body hide-scrollbar">
            {studentsData.map((student) => (
              <div key={student.id} className="tr">
                <span className="td number student-number">
                  {student.studentNumber}
                </span>
                <span className="td truncate font-medium">{student.name}</span>
                <span className="td flex flex-col gap-0.5 truncate">
                  <span className="truncate">{student.guardian.name}</span>
                  <span className="flex gap-1.5 items-center opacity-65">
                    <span className="guardian-email">
                      {student.guardian.email}
                    </span>
                    <span className="opacity-50">•</span>
                    <span className="guardian-phone">
                      {student.guardian.phone}
                    </span>
                  </span>
                </span>
                <span className="td">{student.class}</span>
              </div>
            ))}
          </div>
          <div className="pagination">
            <span className="page active">1</span>
            <span className="page">2</span>
          </div>
        </div>
      </div>

      <AddStudent />
    </>
  );
}

export default Students;
