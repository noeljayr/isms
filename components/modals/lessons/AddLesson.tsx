"use client";

import { createLesson } from "@/api/lessons";
import XClose from "@/components/svg/XClose";
import { useTokenStore } from "@/context/token";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import SubjectComponent from "@/components/lessons/SubjectComponent";
import { format } from "date-fns";
import { getTeacherSubject } from "@/api/teachers";
import Loader from "@/components/ux/Loader";
import { motionTransition, teacherId } from "@/constants/motionTransition";

type Props = {
  selectedDateTime: Date;
  newTitle: string;
  setLessons: (data: LessonTypes[]) => void;
  setShowModal: (state: boolean) => void;
  showModal: boolean;
  setNewTitle: (title: string) => void;
};

function AddLesson({
  newTitle,
  selectedDateTime,
  setLessons,
  setShowModal,
  showModal,
  setNewTitle,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { Id, SchoolId, role } = useTokenStore();

  const [classId, setClassId] = useState("");
  const [subClassId, setSubClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [assignedSubjectsData, setAssignedSubjectsData] = useState<
    SubjectTypes[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] =
    useState<SubjectTypes[]>(assignedSubjectsData);

  const [getLoading, setGetLoading] = useState(false);

  useEffect(() => {
    getTeacherSubject({
      setIsLoading: setGetLoading,
      setErrorMessage: () => {},
      setIsError: () => {},
      setData: setAssignedSubjectsData,
      id: teacherId,
    });
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDateTime || !newTitle.trim()) return;

    createLesson({
      dayTime: selectedDateTime.toISOString(),
      teacherId,
      subjectId,
      topic: newTitle,
      classId,
      SchoolId,
      subClassId,
      setErrorMessage,
      setIsError,
      setIsLoading,
      setIsSuccess,
      setLessons,
      setShowModal,
      weekDay: selectedDateTime.toDateString(),
    });
  };

  return (
    <div
      className={`modal ${
        showModal ? "modal-active" : ""
      } add-class fixed h-screen w-screen left-0 top-0 flex items-center justify-center`}
    >
      <form onSubmit={handleSave} className="card relative">
        <motion.span className="card-title flex items-center">
          Add a lesson
          <span
            onClick={() => setShowModal(false)}
            title="discard"
            className="close ml-auto"
          >
            <XClose />
          </span>
        </motion.span>
        <div className="card-body flex flex-col gap-4">
          <p
            style={{ color: "var(--primary)" }}
            className="font-p-3 mt-2 p-2 font-semibold w-full bg-[var(--background)] rounded-[var(--radius-s)]"
          >
            {selectedDateTime && (
              <>Time: {format(selectedDateTime, "eeee, MMM d, yyyy h:mm a")}</>
            )}
          </p>
          <motion.div className="input-group">
            <label htmlFor="">Topic</label>
            <input
              required
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              value={newTitle}
              type="text"
              placeholder="Topic"
            />
          </motion.div>

          <div className="subjects flex w-full ">
            {getLoading ? (
              <div className="flex flex-col w-full h-[5rem] items-center justify-center">
                <Loader variant="primary" />
              </div>
            ) : assignedSubjectsData && assignedSubjectsData.length > 0 ? (
              <AnimatePresence>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {assignedSubjectsData.map((s, index) => {
                    return (
                      <SubjectComponent
                        index={index}
                        setClassId={setClassId}
                        subjectId={subjectId}
                        subject={s}
                        setIsSuccess={() => {}}
                        setSubjectId={setSubjectId}
                        setSubClassId={setSubClassId}
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
          <div className="cta-container items-center flex gap-2 w-full justify-end">
            <AnimatePresence>
              {isError && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTransition}
                  style={{
                    width: "fit-content",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    height: "fit-content",
                  }}
                  className="error"
                >
                  {errorMessage}
                </motion.span>
              )}

              {isSuccess && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTransition}
                  style={{
                    width: "fit-content",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    height: "fit-content",
                  }}
                  className="success"
                >
                  Classes has been added successfully
                </motion.span>
              )}
            </AnimatePresence>
            <span onClick={() => setShowModal(false)} className="cta-2 ml-auto">
              Cancel
            </span>
            <button className="cta">{isLoading ? <Loader /> : "Add"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLesson;
