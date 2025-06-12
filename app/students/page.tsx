"use client";

import ChevronDown from "@/components/svg/ChevronDown";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import { useEffect, useState } from "react";

import {
  useStudentModalStore,
  useImportStudentModalStore,
} from "@/context/modals/students/addStudent";
import Student from "@/components/Student";
import FileUpload from "@/components/svg/FileUpload";
import ImportStudents from "@/components/modals/students/ImportStudents";
import ViewStudent from "@/components/modals/students/ViewStudent";
import { useRouter, useSearchParams } from "next/navigation";
import { StudentsTypes } from "@/types/StudentTypes";
import Loader from "@/components/ux/Loader";
import { getStudents } from "../../api/students";
import AddStudent from "@/components/modals/students/AddStudent";
import { ClassTypes } from "@/types/ClassesTypes";
import { getClasses } from "@/api/classes";
import FileDownload from "@/components/svg/FileDownload";

const years = ["2025", "2024", "2023"];

function Students() {
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  const [activeClass, setActiveClass] = useState<ClassTypes>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setStudentModalActive, studentChange } = useStudentModalStore();
  const { setImportStudentModalActive } = useImportStudentModalStore();
  const [classes, setClasses] = useState<ClassTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [studentsData, setStudentsData] = useState<StudentsTypes>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  useEffect(() => {
    if (!activeClass) return;
    getStudents({
      setData: setStudentsData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      search,
      classId: activeClass.id,
    });
  }, [studentChange, search, activeClass]);

  useEffect(() => {
    if (classes) {
      setActiveClass(classes[0]);
    }
  }, [classes]);

  useEffect(() => {
    getClasses({
      setData: setClasses,
      setIsLoading,
      setIsError,
      setErrorMessage,
    });
  }, []);

  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <button onClick={setStudentModalActive} className="cta">
          <Plus />
          Student
        </button>

        <button onClick={setImportStudentModalActive} className="cta-2">
          <span className="rotate-180"><FileDownload /></span>
          Import students
        </button>
        <div className="search input-group mr-auto">
          <Search />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for students..."
          />
        </div>

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
            {activeClass?.name}
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
                key={className.id}
                onClick={() => {
                  setActiveClass(className);
                  setDropdownOpen(!dropdownOpen);
                }}
                className={`dropdown-option cta-2 ${
                  activeClass === className ? "active" : ""
                }`}
              >
                {className.name}
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
          <div className="th">status</div>
          <div className="th"></div>
        </div>
        <div className="table-body hide-scrollbar">
          {isLoading ? (
            <div className="h-[5rem] w-[5rem] flex m-auto items-center justify-center">
              <Loader variant="primary" />
            </div>
          ) : isError ? (
            <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
              <span className="error">{errorMessage}</span>
            </div>
          ) : studentsData.length > 0 ? (
            studentsData.map((student, index) => (
              <Student student={student} index={index + 1} key={student.id} />
            ))
          ) : (
            <div className="h-full w-full flex-col absolute top-0 left-0 flex m-auto items-center justify-center">
              <span className="font-p-2 mb-2 font-semibold  opacity-85">
                No students found
              </span>
              <button
                onClick={setStudentModalActive}
                className="cta-2 font-p-2"
              >
                <Plus /> Add students
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pagination mt-auto">
        <span className="page active">{page}</span>
      </div>

      <AddStudent />
      <ImportStudents />
      <ViewStudent />
      {/* <SearchGuardian /> */}
    </>
  );
}

export default Students;
