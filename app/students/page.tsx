"use client";

import ChevronDown from "@/components/svg/ChevronDown";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import { useEffect, useState } from "react";
import AddStudent from "@/components/modals/upload/students/AddStudent";
import {
  useStudentModalStore,
  useImportStudentModalStore,
} from "@/context/modals/addStudent";
import Student from "@/components/Student";
import FileUpload from "@/components/svg/FileUpload";
import ImportStudents from "@/components/modals/upload/students/ImportStudents";
import ViewStudent from "@/components/modals/view/ViewStudent";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { StudentsTypes } from "@/types/student-types";
import { BASE_URL } from "@/constants/BASE_URL";
import Loader from "@/components/ux/Loader";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import SearchGuardian from "@/components/modals/upload/guardians/SearchGuardian";

const years = ["2025", "2024", "2023"];
const classes = ["Form 4", "Form 3", "Form 2", "Form 1"];

function Students() {
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  const [activeClass, setActiveClass] = useState("Form 4");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setStudentModalActive, studentChange } = useStudentModalStore();
  const { setImportStudentModalActive } = useImportStudentModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = getCookie(TOKEN_COOKIE_NAME);
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
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/students?searchQuery=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setStudentsData(data.data);
          setPage(data.page);
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
  }, [studentChange, search]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setStudentModalActive} className="cta">
            <Plus />
            Student
          </button>

          <button onClick={setImportStudentModalActive} className="cta-2">
            <FileUpload />
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
                <Student student={student} key={student.id} />
              ))
            ) : (
              <div
                style={{ fontSize: "var(--p3)" }}
                className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
              >
                No students found
              </div>
            )}
          </div>

          <div className="pagination mt-auto">
            <span className="page active">{page}</span>
          </div>
        </div>
      </div>

      <AddStudent />
      <ImportStudents />
      <ViewStudent />
      {/* <SearchGuardian /> */}
    </>
  );
}

export default Students;
