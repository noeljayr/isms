"use client";

import React, { useEffect, useState } from "react";
import XClose from "@/components/svg/XClose";
import { useTeacherModalStore } from "@/context/modals/teachers/addTeacher";
import CheckCircle from "@/components/svg/CheckCircle";

import { motionTransition } from "@/constants/motionTransition";
import { AnimatePresence, motion } from "motion/react";
import Loader from "@/components/ux/Loader";
import useSubjectModalStore from "@/context/modals/subjects/addSubject";
import { addSubject } from "@/api/subjects";
import ClassPicker from "../modals/classes/ClassPicker";

function AddSubject() {
  const { setAddSubjectChange, setSubjectModalActive, subjectModalActive } =
    useSubjectModalStore();
  const [showClassPicker, setShowClassPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [isMandotory, setIsMandotory] = useState(true);
  const [subClassId, setsubClassId] = useState("");
  const [classId, setClassId] = useState("");
  const [mainClassName, setMainClassName] = useState("");
  const [subClassName, setSubClassName] = useState("");

  return (
    <>
      {subjectModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal add-subject fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          subjectModalActive ? "modal-active" : ""
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSubject({
              classId: classId,
              subClassId: subClassId,
              name: name,
              isMandotory,
              setIsLoading,
              setIsError,
              setErrorMessage,
              setSuccess: setIsSuccess,
              setAddSubjectChange,
            });
          }}
          className="card"
        >
          <span className="card-title flex items-center">
            New subject
            <span
              onClick={setSubjectModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <div className="input-group">
              <label htmlFor="">Subject name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                placeholder="Subject name"
              />
            </div>

            <div className="input-group flex gap-2 w-full">
              <label htmlFor="">Is it a mandotory subject?</label>
              <div className="flex gap-4">
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
              className="input-group relative"
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

            <div className="cta-container flex gap-2 w-full justify-end items-center">
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
                    Subject added successfully
                  </motion.span>
                )}
              </AnimatePresence>

              <span onClick={setSubjectModalActive} className="cta-2">
                Cancel
              </span>
              <button className="cta">{isLoading ? <Loader /> : "Save"}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddSubject;
