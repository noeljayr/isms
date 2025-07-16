import Check from "@/components/svg/Check";
import Search from "@/components/svg/Search";
import Trash from "@/components/svg/Trash";
import Loader from "@/components/ux/Loader";
import { motionTransition } from "@/constants/motionTransition";
import { useTeacherModalStore } from "@/context/modals/teachers/addTeacher";
import useViewTeacherModalStore from "@/context/modals/teachers/viewTeacher";
import { getClasses, getSubClasses } from "@/api/classes";
import { getSubjects } from "@/api/subjects";
import { SubjectTypes } from "@/types/SubjectsTypes";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import SubjectComponent from "./SubjectComponent";

type dataProps = {
  id: string;
  subjects: SubjectTypes[];
  setIsSuccess: (state: boolean) => void;
};

function NewSubjects({ id, subjects, setIsSuccess }: dataProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subjectData, setSubjectData] = useState<SubjectTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (id && searchQuery.length > 0) {
      getSubjects({
        setIsLoading,
        setErrorMessage,
        setSubjectData,
        setIsError,
        search: searchQuery,
      });
    }
  }, [id, searchQuery]);

  const checkSubject = (subject: SubjectTypes) => {
    return subjects.some((s) => s.id === subject.id);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] section overflow-hidden h-full">
      <div
        style={{ position: "relative" }}
        className="search input-group mr-auto"
      >
        <span className="absolute left-2 top-[0.7rem]">
          <Search />
        </span>
        <input
          style={{
            paddingLeft: "1.5rem",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder={`Search for subjects to assign...`}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          transition={motionTransition}
          className="grid auto-rows-min overflow-y-auto gap-2 w-full mt-2 "
        >
          {isLoading ? (
            <div className="h-[5rem] items-center justify-center flex w-full inset-0">
              <Loader />
            </div>
          ) : isError ? (
            <motion.div
              layout
              className="h-5rem items-center justify-between flex w-full font-p-3"
            >
              Something went wrong
            </motion.div>
          ) : (
            <>
              {subjectData.map((subject, index) => {
                return (
                  <SubjectComponent
                    setIsSuccess={setIsSuccess}
                    isSelected={checkSubject(subject)}
                    parentElement="new"
                    key={subject.id}
                    index={index}
                    subject={subject}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



export default NewSubjects;
