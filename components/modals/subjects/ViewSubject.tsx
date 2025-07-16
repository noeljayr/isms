"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import Pen from "@/components/svg/Edit";
import Loader from "@/components/ux/Loader";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import { getLessons, getSubjects, upDateSubject } from "@/api/subjects";
import useSubjectModalStore from "@/context/modals/subjects/addSubject";
import useViewSubjectModalStore from "@/context/modals/subjects/viewSubject";
import { LessonTypes, SubjectTypes } from "@/types/SubjectsTypes";
import ClassPicker from "../classes/ClassPicker";
import CheckCircle from "@/components/svg/CheckCircle";
import { getClasses, getSubClasses } from "@/api/classes";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import { IconStarFilled } from "@tabler/icons-react";
import Trash from "@/components/svg/Trash";
import Tabs from "@/components/ui/Tabs";
import Lessons from "./Lessons";
import { useTokenStore } from "@/context/token";
import SubjectStudents from "./SubjectStudents";

const adminTabs = ["Details", "Students"];
const teachersTabs = ["Lessons"];

function ViewSubject() {
  const { addSubjectChange, setAddSubjectChange } = useSubjectModalStore();
  const { viewSubjectId, viewSubjectModalActive, setViewSubjectModalActive } =
    useViewSubjectModalStore();
  const [lessonsData, setLessonsData] = useState<LessonTypes[]>([]);
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subjectData, setSubjectData] = useState<SubjectTypes>();
  const [name, setName] = useState("");
  const [isMandotory, setIsMandotory] = useState(true);
  const [subClassId, setsubClassId] = useState("");
  const [classId, setClassId] = useState("");
  const [mainClassName, setMainClassName] = useState("");
  const [subClassName, setSubClassName] = useState("");
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [currentTabs, setCurrentTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(currentTabs[0]);
  const [classData, setClassData] = useState<ClassTypes>();
  const [subClassData, setSubClassData] = useState<SubClassTypes>();

  const [userRole, setUserRole] = useState("");
  const { role } = useTokenStore();

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  useEffect(() => {
    if (userRole.toLowerCase() === "admin") {
      setCurrentTabs(adminTabs);
      setActiveTab(adminTabs[0]);
    } else {
      setCurrentTabs(teachersTabs);
      setActiveTab(teachersTabs[0]);
    }
  }, [userRole]);

  useEffect(() => {
    if (viewSubjectId) {
      getSubjects({
        setIsLoading,
        id: viewSubjectId,
        setIsError,
        setErrorMessage,
        setSubjectData,
      });
    }
  }, [viewSubjectId, addSubjectChange]);

  useEffect(() => {
    if (subjectData) {
      setName(subjectData.name);
      setIsMandotory(subjectData.isMandotory);
      setsubClassId(subjectData.subClassId);
      setClassId(subjectData.classId);

      getClasses({
        setIsLoading: () => {},
        id: subjectData.classId,
        setIsError: () => {},
        setErrorMessage: () => {},
        setData: setClassData,
      });

      if (subjectData.subClassId) {
        getSubClasses({
          setIsLoading: () => {},
          id: subjectData.subClassId,
          setIsError: () => {},
          setErrorMessage: () => {},
          setData: setSubClassData,
        });
      }

      getLessons({
        setData: setLessonsData,
        setIsLoading: () => {},
        setIsError: () => {},
        setErrorMessage,
        subClassId: subjectData.subClassId,
      });
    }
  }, [subjectData]);

  return (
    <>
      {viewSubjectModalActive && (
        <div
          onClick={setViewSubjectModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        className={`modal view-modal ${
          viewSubjectModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            upDateSubject({
              classId: classId,
              subClassId: subClassId,
              name: name,
              isMandotory,
              setIsLoading,
              setIsError,
              setErrorMessage,
              setSuccess: setIsSuccess,
              id: viewSubjectId || "",
              setUpdateSubjectChange: setAddSubjectChange,
            });
          }}
          className="card relative"
        >
          <span className="card-title flex items-center">
            Subject information
            <span
              onClick={setViewSubjectModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <motion.div
            layout
            key={"modal-content"}
            animate={{
              gridTemplateRows: "auto 1fr",
            }}
            transition={motionTransition}
            style={{ overflow: "visible" }}
            className="card-body modal-content grid gap-2"
          >
            {isLoading && (
              <div className="absolute inset-0 self-center z-10 translate-[50%]">
                {" "}
                <Loader variant="primary" />
              </div>
            )}
            <motion.div
              className={`h-full grid ${
                !pReadyOnly ? "grid-rows-[auto_1fr] gap-2" : "grid-rows-1"
              }`}
              layout="position"
              key="class-container"
            >
              {subjectData && classData && subClassData && (
                <motion.div
                  layout="position"
                  key="overview"
                  className="section relative gap-1"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {subjectData.name}

                    {subjectData.isMandotory && (
                      <span className="mandotory right-1 top-1 h-4 w-4 rounded-[50%] flex items-center justify-center font-bold font-p-3 bg-[rgba(255,200,1,0.1)]">
                        <IconStarFilled
                          style={{ height: "0.5rem", width: "0.6rem" }}
                          color="#ffc801"
                        />
                      </span>
                    )}
                  </span>
                  <motion.div
                    layout="position"
                    key="overview"
                    className="user-overview w-full justify-between flex gap-2 items-center"
                  >
                    <motion.span className="flex opacity-75">
                      {classData.name} {subClassData.name}
                    </motion.span>
                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75 gap-1">
                      <span className="number font-bold">{lessonsData.length}</span>
                      Lessons
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75 gap-1">
                      <span className="number font-bold">2</span>
                      Students
                    </span>
                  </motion.div>

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
                </motion.div>
              )}

              {userRole.toLowerCase() !== "student" && (
                <Tabs
                  tabs={currentTabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              )}
            </motion.div>
            <>
              {isError ? (
                <div className="error">Something went wrong</div>
              ) : subjectData ? (
                <>
                  {activeTab === "Details" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="details1"
                      layout="position"
                      transition={motionTransition}
                      className="flex flex-col gap-4 h-fit"
                    >
                      <div className="section gap-4 relative">
                        <span className="student-name font-medium">
                          Subject Infomation
                        </span>

                        <div className="flex flex-col">
                          <span className="font-medium opacity-65">
                            Subject name
                          </span>
                          <input
                            readOnly={pReadyOnly}
                            value={name}
                            className="number"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="input-group flex gap-2 w-full">
                          <label htmlFor="">Is it a mandotory subject?</label>
                          <div
                            className={`flex gap-4 ${
                              pReadyOnly ? "pointer-events-none opacity-50" : ""
                            }`}
                          >
                            <span
                              onClick={() => {
                                setIsMandotory(true);
                              }}
                              className={`radio-btn-container ${
                                isMandotory ? "selected-radio-btn" : ""
                              }`}
                            >
                              <span className="radio-btn">
                                <CheckCircle />
                              </span>
                              <span className="radio-btn-label">Yes</span>
                            </span>

                            <span
                              onClick={() => {
                                setIsMandotory(false);
                              }}
                              className={`radio-btn-container ${
                                isMandotory == false ? "selected-radio-btn" : ""
                              }`}
                            >
                              <span className="radio-btn">
                                <CheckCircle />
                              </span>
                              <span className="radio-btn-label">No</span>
                            </span>
                          </div>
                        </div>

                        <div
                          style={{ position: "relative" }}
                          className={`input-group relative ${
                            pReadyOnly ? "pointer-events-none opacity-50" : ""
                          } `}
                        >
                          <label htmlFor="">Class</label>
                          <input
                            readOnly
                            type="text"
                            className="cursor-pointer"
                            placeholder="Class"
                            value={mainClassName + " " + subClassName}
                            onClick={() => {
                              if (showClassPicker) {
                                setShowClassPicker(false);
                              } else {
                                setShowClassPicker(true);
                              }
                            }}
                          />
                          {showClassPicker && (
                            <ClassPicker
                              show={showClassPicker}
                              setShow={setShowClassPicker}
                              mainClassId={classId}
                              setMainClassId={setClassId}
                              setSubClassId={setsubClassId}
                              subClassId={subClassId}
                              setMainClassName={setMainClassName}
                              setSubClassName={setSubClassName}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab == "Lessons" ? (
                    <Lessons key="lessons" subjectId={viewSubjectId} />
                  ) : activeTab == "Students" ? (
                    <SubjectStudents subclassId={subjectData.subClassId} />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div>Subject not found</div>
              )}
            </>

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

              <span onClick={setViewSubjectModalActive} className="cta-2">
                Cancel
              </span>
              <button
                disabled={pReadyOnly || isLoading}
                className={`cta ${pReadyOnly ? "opacity-25" : "opacity-100"}`}
              >
                {isLoading ? <Loader /> : "Save"}
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </>
  );
}

export default ViewSubject;
