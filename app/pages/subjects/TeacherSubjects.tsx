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
import { teacherId } from "@/constants/motionTranstion";
import { getTeacherSubject } from "@/api/teachers";

function TeacherSubjects() {
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
    if (!teacherId) return;
    getTeacherSubject({
      setIsLoading,
      setErrorMessage,
      setIsError,
      setData: setSubjectData,
      id: teacherId,
      search
    });
  }, [teacherId, search]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden relative  gap-2 h-full py-3">
        <div className="flex gap-3 items-center w-full">
          <div style={{ width: "40%" }} className="search input-group mr-auto">
            <Search />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a subject..."
            />
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

export default TeacherSubjects;
