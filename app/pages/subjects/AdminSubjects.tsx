"use client";

import "@/css/subjects.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import { useEffect, useState } from "react";
import Subject from "@/components/subjects/Subject";
import { SubjectTypes } from "@/types/SubjectsTypes";
import { useSearchParams } from "next/navigation";
import { getSubjects } from "@/api/subjects";
import Loader from "@/components/ux/Loader";
import AddSubject from "@/components/subjects/AddSubject";
import useSubjectModalStore from "@/context/modals/subjects/addSubject";
import ViewSubject from "@/components/modals/subjects/ViewSubject";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import ChevronDown from "@/components/svg/ChevronDown";
import { getClasses, getSubClasses } from "@/api/classes";

function AdminSubjects() {
  const { setSubjectModalActive, addSubjectChange } = useSubjectModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subjectData, setSubjectData] = useState<SubjectTypes[]>([]);
  const searchParams = useSearchParams();
  const [classes, setClasses] = useState<ClassTypes[]>([]);
  const [subClasses, setSubClasses] = useState<SubClassTypes[]>([]);
  const [activeClass, setActiveClass] = useState<ClassTypes>();
  const [activeSubClass, setActiveSubClass] = useState<SubClassTypes>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    if (!activeClass) return;
    if (!activeSubClass) return;
    getSubjects({
      setSubjectData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      search,
      classId: activeClass.id,
      subClassId: activeSubClass.id,
    });
  }, [search, addSubjectChange, activeClass, activeSubClass]);

  useEffect(() => {
    getClasses({
      setData: setClasses,
      setIsLoading,
      setIsError,
      setErrorMessage,
    });
  }, []);

  useEffect(() => {
    if (!activeClass) return;
    getSubClasses({
      setData: setSubClasses,
      setIsLoading,
      setIsError,
      setErrorMessage,
      classId: activeClass.id,
    });
  }, [activeClass]);

  useEffect(() => {
    if (classes) {
      setActiveClass(classes[0]);
    }
  }, [classes]);

  useEffect(() => {
    if (subClasses) {
      setActiveSubClass(subClasses[0]);
    }
  }, [subClasses]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden relative  gap-2 h-full py-3">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setSubjectModalActive} className="cta">
            <Plus />
            New subject
          </button>
          <div className="search input-group mr-auto">
            <Search />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a subject..."
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

          <div
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
              {activeSubClass?.name}
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
              {subClasses.map((className) => (
                <span
                  key={className.id}
                  onClick={() => {
                    setActiveSubClass(className);
                    setDropdownOpen2(!dropdownOpen2);
                  }}
                  className={`dropdown-option cta-2 ${
                    activeSubClass === className ? "active" : ""
                  }`}
                >
                  {className.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid w-full h-full overflow-hidden relative auto-rows-min">
          <div
            style={{
              gridTemplateColumns:
                subjectData.length < 4
                  ? `repeat(${subjectData.length}, 13rem)`
                  : "repeat(auto-fit, minmax(12rem, 1fr))",
            }}
            className="subjects-container gap-2.5 grid"
          >
            {isLoading ? (
              <div className="w-full h-full flex absolute items-center justify-center">
                <Loader variant="primary" />
              </div>
            ) : isError ? (
              <div className="w-full h-full flex absolute items-center justify-center">
                <span className="font-p-2 opacity-85">
                  Something went wrong
                </span>
              </div>
            ) : subjectData && subjectData.length > 0 ? (
              subjectData.map((subject, index) => (
                <Subject
                  key={subject.id}
                  index={index + 1}
                  subject={subject}
                  subjectsLength={subjectData.length}
                />
              ))
            ) : (
              <div className="p-2 text-center h-full w-full flex flex-col items-center justify-center  absolute inset-0">
                <span className="font-p-2 font-medium opacity-85 mb-2">
                  No subjects found
                </span>
                <span
                  onClick={setSubjectModalActive}
                  className="cta-2 font-p-3"
                >
                  <Plus />
                  Add a subject
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="pagination mt-auto">
          <span className="page active">{page}</span>
        </div>
      </div>

      <AddSubject />
      <ViewSubject />
    </>
  );
}

export default AdminSubjects;
