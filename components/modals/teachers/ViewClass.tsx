"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import useViewClassModalStore from "@/context/modals/classes/viewClass";
import {
  addSubClass,
  getClasses,
  getSubClasses,
  updateClass,
} from "@/api/classes";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import { AnimatePresence, motion } from "motion/react";
import Pen from "@/components/svg/Edit";
import Trash from "@/components/svg/Trash";
import { motionTransition } from "@/constants/motionTransition";
import Loader from "@/components/ux/Loader";
import { getStudents } from "@/api/students";
import { getSubjects } from "@/api/subjects";
import ChevronRight from "@/components/svg/ChevronRight";
import useClassModalStore from "@/context/modals/classes/addClass";
import Tabs from "@/components/ui/Tabs";
import Plus from "@/components/svg/Plus";

const tabs = ["Details & Sub-classes", "Subjects", "Students"];

function ViewClass() {
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [classData, setData] = useState<ClassTypes>();
  const [subClassData, setSubClassData] = useState<SubClassTypes[]>([]);
  const [studentCount, setStudentCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [className, setClassName] = useState("");
  const { addClassesChange, setAddClassesChange } = useClassModalStore();
  const [showInput, setShowInput] = useState(false);
  const [added, setAdded] = useState(true);
  const [subClassName, setSubClassName] = useState("");
  const [addSucess, setAddSuccess] = useState("");

  const { viewClassModalActive, viewClassId, setViewClassModalActive } =
    useViewClassModalStore();

  useEffect(() => {
    if (viewClassId) {
      getClasses({
        setData,
        setIsError,
        setIsLoading,
        setErrorMessage,
        id: viewClassId,
      });

      getSubClasses({
        setData: setSubClassData,
        setIsError,
        setIsLoading,
        setErrorMessage,
        classId: viewClassId,
        pageSize: 99,
      });

      getStudents({
        setData: (data) => {
          setStudentCount(data.length);
        },
        classId: viewClassId,
        setErrorMessage: () => {},
        setIsError: () => {},
        setIsLoading: () => {},
      });

      getSubjects({
        setSubjectData: (data) => {
          setSubjectCount(data.length);
        },
        classId: viewClassId,
        setErrorMessage: () => {},
        setIsError: () => {},
        setIsLoading: () => {},
      });
    }
  }, [viewClassId, addClassesChange]);

  useEffect(() => {
    if (!classData) return;
    setClassName(classData.name);
  }, [classData]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!viewClassId) return;
    updateClass({
      id: viewClassId,
      name: className,
      setErrorMessage,
      setSuccess: setIsSuccess,
      setIsError,
      setIsLoading,
      setClassChange: setAddClassesChange,
    });
  };

  const add = () => {
    if (!viewClassId) return;
    addSubClass({
      classId: viewClassId,
      name: subClassName,
      setErrorMessage: () => {},
      setSuccess: setAdded,
      setIsError,
      setIsLoading,
      setClassChange: setAddClassesChange,
    });
  };

  return (
    <>
      {viewClassModalActive && (
        <div
          onClick={setViewClassModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        style={{ gridTemplateRows: "auto auto 1fr" }}
        className={`modal view-modal ${
          viewClassModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen top-0 flex p-2`}
      >
        <form onSubmit={submit} className="card relative">
          <span className="card-title flex items-center">
            Class information
            <span
              onClick={setViewClassModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div
            style={{ overflow: "visible" }}
            className="card-body modal-content grid gap-2"
          >
            {isLoading && (
              <div className="absolute inset-0 self-center z-10 translate-[50%]">
                {" "}
                <Loader variant="primary" />
              </div>
            )}
            {classData && (
              <>
                <div className="section relative gap-1">
                  <span className="user-name font-medium">
                    {classData.name}
                  </span>
                  <div className="user-overview w-full justify-between flex gap-2 items-center">
                    <span className="flex opacity-75 gap-1">
                      <span className="number font-bold">
                        {subClassData.length}
                      </span>
                      Sub-classes
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75 gap-1">
                      <span className="number font-bold">{subjectCount}</span>
                      Subjects
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75 gap-1">
                      <span className="number font-bold">{studentCount}</span>
                      Students
                    </span>
                  </div>

                  <div className="view-actions">
                    <span
                      onClick={() => setPReadOnly(!pReadyOnly)}
                      className={`edit-action cursor-pointer ${
                        pReadyOnly ? "" : "active-action"
                      }`}
                    >
                      <Pen />
                    </span>
                    <span className="delete-action">
                      <Trash />
                    </span>
                  </div>
                </div>
              </>
            )}

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {classData && (
              <>
                <div className="flex flex-col gap-2">
                  <div className="section gap-2 relative">
                    <span className="student-name font-medium">
                      Class Details
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium opacity-65">Class name</span>
                      <input
                        readOnly={pReadyOnly}
                        value={className}
                        className="number"
                        type="text"
                        onChange={(e) => setClassName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="section gap-2">
                    <span className="student-name font-medium">
                      Sub-classes
                    </span>

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        layout="position"
                        transition={motionTransition}
                        className="grid grid-cols-2 gap-2"
                      >
                        {!pReadyOnly && !showInput && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={"add"}
                            layout="position"
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            onClick={() => setShowInput(true)}
                            className="subclass p-2 border-[1px] gap-2 items-center justify-center border-dashed border-[var(--border)] rounded-[var(--radius)] cursor-pointer flex"
                          >
                            <Plus />
                            Add subclass
                          </motion.div>
                        )}

                        {showInput && !pReadyOnly && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={"add"}
                            layout="position"
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="subclass-input border-[1px] gap-2 items-center justify-center relative border-[var(--border)] rounded-[var(--radius)] cursor-pointer grid grid-cols-[1fr_auto] "
                          >
                            <motion.input
                              value={subClassName}
                              onChange={(e) => setSubClassName(e.target.value)}
                              type="text"
                              placeholder="Class name"
                              layout="position"
                            />

                            <motion.button
                              layout="position"
                              onClick={add}
                              type="button"
                              className="h-6.5 w-6.5 mr-0.5 cursor-pointer top-1 flex items-center justify-center bg-[var(--primary)] rounded-[var(--radius-s)]"
                            >
                              <Plus />
                            </motion.button>
                          </motion.div>
                        )}

                        {subClassData.map((subclass, index) => (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={subclass.id}
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                              delay: index / 5,
                            }}
                            className="subclass p-2 border-[1px] border-[var(--border)] rounded-[var(--radius)] cursor-pointer grid grid-cols-[1fr_auto]"
                          >
                            <span>{subclass.name}</span>
                            <ChevronRight />
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </>
            )}

            <div className="cta-container flex gap-2 w-full items-center justify-end">
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
                    transition={motionTransition}
                    style={{
                      width: "fit-content",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      height: "fit-content",
                    }}
                    className="success mr-auto"
                  >
                    Updated.
                  </motion.span>
                )}
              </AnimatePresence>

              <span onClick={setViewClassModalActive} className="cta-2">
                Cancel
              </span>
              <button
                disabled={pReadyOnly || isLoading}
                className={`cta ${pReadyOnly ? "opacity-25" : "opacity-100"}`}
              >
                {isLoading ? <Loader /> : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ViewClass;
