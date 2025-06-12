"use client";

import Loader from "@/components/ux/Loader";
import { useEffect, useState } from "react";
import { SubjectTypes } from "@/types/SubjectsTypes";
import { NewSubjects, SubjectComponent } from "./NewSubjects";
import useViewTeacherModalStore from "@/context/modals/teachers/viewTeacher";
import {
  assignSubjects,
  getTeacherSubject,
  removeSubject,
} from "@/api/teachers";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import { useTeacherModalStore } from "@/context/modals/teachers/addTeacher";

type props = {
  activeTab: string;
  isSuccess: boolean;
  isEditError: boolean;
  setActivetab: (tab: string) => void;
  setIsSuccess: (state: boolean) => void;
};

function Subjects({
  activeTab,
  isEditError,
  setActivetab,
  setIsSuccess,
  isSuccess,
}: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [assignedChanged, setAssignedChanged] = useState(false);
  const { setAddTeacherChange } = useTeacherModalStore();

  const [assignedSubjectsData, setAssignedSubjectsData] = useState<
    SubjectTypes[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] =
    useState<SubjectTypes[]>(assignedSubjectsData);
  const { viewTeacherId } = useViewTeacherModalStore();

  useEffect(() => {
    if (!viewTeacherId) return;
    getTeacherSubject({
      setIsLoading,
      setErrorMessage,
      setIsError,
      setData: setAssignedSubjectsData,
      id: viewTeacherId,
    });
  }, [viewTeacherId, setAddTeacherChange]);

  useEffect(() => {
    setSelectedSubjects(assignedSubjectsData);
  }, [assignedSubjectsData]);

  useEffect(() => {
    if (selectedSubjects.length === assignedSubjectsData.length) {
      setAssignedChanged(false);
    } else {
      setAssignedChanged(true);
    }
  }, [selectedSubjects]);

  const assign = () => {
    if (selectedSubjects.length < 1) return;
    if (!viewTeacherId) return;
    selectedSubjects.forEach((s) => {
      assignSubjects({
        setIsError,
        setAddTeacherChange: () => {},
        setIsLoading,
        subjectId: s.id,
        teacherId: viewTeacherId,
        setErrorMessage,
        setSuccess: setIsSuccess,
      });
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 overflow-hidden relative w-full h-[calc(100%_-_0.5rem]">
        <div className="section h-full">
          <span className="font-medium">Assigned Subjects</span>
          {isLoading ? (
            <div className="flex flex-col w-full h-full items-center justify-center">
              {" "}
              <Loader variant="primary" />{" "}
            </div>
          ) : isError ? (
            <motion.div
              layout
              className="flex flex-col w-full h-full items-center justify-center"
            >
              {" "}
              Something went wrong
            </motion.div>
          ) : selectedSubjects && selectedSubjects.length > 0 ? (
            <AnimatePresence>
              <div className="flex flex-col gap-2 mt-2">
                {selectedSubjects.map((s, index) => {
                  return (
                    <SubjectComponent
                      setIsSuccess={setIsSuccess}
                      isSelected={false}
                      index={index}
                      parentElement="assigned"
                      subject={s}
                      key={s.id}
                    />
                  );
                })}
              </div>
            </AnimatePresence>
          ) : (
            <motion.div
              layout
              className="p-2 text-center flex flex-col items-center justify-center h-full w-full"
            >
              <span className="font-semibold font-p-2 opacity-85">
                No subjects found
              </span>
              <span className="font-p-4">
                The teacher has not been assigned any subjects yet.{" "}
              </span>
            </motion.div>
          )}
        </div>

        {viewTeacherId && (
          <NewSubjects
            setIsSuccess={setIsSuccess}
            subjects={selectedSubjects}
            id={viewTeacherId}
          />
        )}
      </div>

      <AnimatePresence>
        {activeTab === "Subjects" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cta-container flex gap-2 w-full items-center justify-end"
          >
            <AnimatePresence>
              {isEditError && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTranstion}
                  style={{
                    width: "fit-content",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    height: "fit-content",
                  }}
                  className="error mr-auto"
                >
                  {errorMessage}
                </motion.span>
              )}

              {isSuccess && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTranstion}
                  style={{
                    width: "fit-content",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    height: "fit-content",
                  }}
                  className="success mr-auto"
                >
                  Assigned subjects updated.
                </motion.span>
              )}
            </AnimatePresence>

            <span
              onClick={() => setActivetab("Personal Details")}
              className="cta-2"
            >
              Back
            </span>
            <button
              onClick={assign}
              type="button"
              disabled={isLoading}
              className={`cta ${
                !assignedChanged ? "opacity-25" : "opacity-100"
              }`}
            >
              {isLoading ? <Loader /> : "Assign"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Subjects;
