"use client";

import React, { useEffect, useRef, useState } from "react";
import XClose from "../../svg/XClose";
import useViewStudentModalStore from "@/context/modals/students/viewStudents";
import { formatDate } from "@/utils/formatDate";
import Pen from "@/components/svg/Edit";
import { StudentTypes } from "@/types/StudentTypes";
import StudentGuardianView from "../students/StudentGuardianView";
import Loader from "@/components/ux/Loader";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import { useStudentModalStore } from "@/context/modals/students/addStudent";
import { editStudent, getStudents } from "@/api/students";
import Trash from "@/components/svg/Trash";
import Tabs from "@/components/ui/Tabs";
import Status from "@/components/ui/Status";

const tabs = ["Student details", "Academic perfomance", "Finances"];

const statuses = [
  "Active",
  "Graduated",
  "Transferred",
  "Suspended",
  "Expelled",
  "Deceased",
];

function ViewStudent() {
  const { setViewStudentModalActive, viewStudentModalActive, viewStudentId } =
    useViewStudentModalStore();
  const { setStudentChange, studentChange } = useStudentModalStore();
  const [studentData, setStudentData] = useState<StudentTypes>();
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [subClassId, setsubClassId] = useState("");
  const [classId, setClassId] = useState("");
  const [parentId, setParentId] = useState<string | null>("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isEditError, setEditError] = useState(false);
  const [optionsActive, setOptionsActive] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    if (viewStudentId) {
      getStudents({
        setData: setStudentData,
        setIsLoading,
        setIsError: setIsError,
        setErrorMessage,
        id: viewStudentId,
      });
    }
  }, [viewStudentId, studentChange]);

  useEffect(() => {
    if (studentData) {
      setFirstName(studentData.firstName);
      setLastName(studentData.lastName);
      SetEmail(studentData.email);
      setAddress(studentData.address);
      setPhoneNumber(studentData.phoneNumber);
      setDateOfBirth(studentData.dateOfBirth);
      setEnrollmentDate(studentData.enrollmentDate);
      setGender(studentData.gender);
      setsubClassId(studentData.subClassId);
      setClassId(studentData.classId);
      setParentId(studentData.parentId);
      setActiveStatus(studentData.status);
    }
  }, [studentData]);

  const submit = () => {
    if (viewStudentId) {
      editStudent({
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        id: viewStudentId,
        classId,
        subClassId,
        parentId,
        status: activeStatus,
        enrollmentDate,
        setIsLoading,
        setErrorMessage,
        setIsError: setEditError,
        setSuccess: setIsSuccess,
        setStudentChange,
      });
    }
  };

  const removeGuardian = (guardianId: null) => {
    if (viewStudentId) {
      editStudent({
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        dateOfBirth,
        gender,
        id: viewStudentId,
        classId,
        subClassId,
        status: activeStatus,
        parentId: guardianId,
        enrollmentDate,
        setIsLoading,
        setErrorMessage,
        setIsError: setEditError,
        setSuccess: setIsSuccess,
        setStudentChange,
      });
    }
  };

  return (
    <>
      {viewStudentModalActive && (
        <div
          onClick={setViewStudentModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        className={`modal view-modal ${
          viewStudentModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="card relative"
        >
          <span className="card-title flex items-center">
            Student information
            <span
              onClick={setViewStudentModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div
            style={{ overflow: "hidden" }}
            className="card-body modal-content grid gap-2"
          >
            {isLoading ? (
              <div className="absolute h-full w-full z-10 inset-0 self-center translate-[50%]">
                {/* <Loader variant="primary" /> */}
              </div>
            ) : isError ? (
              <div>Something went wrong</div>
            ) : studentData ? (
              <div className="section relative gap-3">
                <span className="user-name font-medium">
                  {studentData.firstName + " " + studentData.lastName}
                </span>
                <div className="user-overview w-full justify-between flex gap-2 items-center">
                  <span className="flex opacity-75 number">
                    {studentData.email}
                  </span>

                  <span className="font-bold opacity-25">•</span>

                  <span className="attendance-rate number opacity-75">
                    {studentData.phoneNumber}
                  </span>

                  <span className="font-bold opacity-25">•</span>

                  <span className="flex opacity-75">
                    {studentData.class.name} {studentData.subClass.name}
                  </span>

                  <span className="font-bold opacity-25">•</span>

                  <Status
                    activeStatus={activeStatus}
                    pReadyOnly={pReadyOnly}
                    setActiveStatus={setActiveStatus}
                    statuses={statuses}
                  />
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
            ) : (
              <></>
            )}

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {activeTab == "Student details" && (
              <>
                {isError ? (
                  <div className="error">Something went wrong</div>
                ) : isLoading ? (
                  <div className="absolute h-full w-full z-10 inset-0 self-center translate-[50%]">
                    <Loader variant="primary" />
                  </div>
                ) : studentData ? (
                  <>
                    <div className="flex flex-col pb-2 gap-2 h-full overflow-y-auto">
                      <div className="section gap-2 relative">
                        <span className="student-name font-medium">
                          Personal Details
                        </span>
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              First name
                            </span>
                            <input
                              readOnly={pReadyOnly}
                              value={firstName}
                              className="number"
                              type="text"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Last name
                            </span>
                            <input
                              readOnly={pReadyOnly}
                              value={lastName}
                              className="number"
                              type="text"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Gender
                            </span>
                            <input
                              readOnly={pReadyOnly}
                              value={gender}
                              className="number"
                              type="text"
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Date of birth
                            </span>
                            <input
                              readOnly={pReadyOnly}
                              value={formatDate(dateOfBirth)}
                              className="number"
                              type={pReadyOnly ? "text" : "date"}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Date enrolled
                            </span>

                            <input
                              readOnly={pReadyOnly}
                              value={formatDate(enrollmentDate)}
                              onChange={(e) =>
                                setEnrollmentDate(e.target.value)
                              }
                              className="number"
                              type={pReadyOnly ? "text" : "date"}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Email
                            </span>
                            <input
                              readOnly={pReadyOnly}
                              value={email}
                              className="number"
                              type="text"
                              onChange={(e) => SetEmail(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Phone
                            </span>

                            <input
                              readOnly={pReadyOnly}
                              value={phoneNumber}
                              className="number"
                              type="text"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium opacity-65">
                              Address
                            </span>

                            <input
                              readOnly={pReadyOnly}
                              value={address}
                              className="number"
                              type="text"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="section gap-2 relative">
                        <span className="student-name font-medium">
                          Guardian
                        </span>

                        {studentData.parentId &&
                          studentData.parentId.length > 0 && (
                            <div className="view-actions">
                              <span
                                onClick={() => removeGuardian(null)}
                                className="delete-action"
                              >
                                <Trash />
                              </span>
                            </div>
                          )}

                        {studentData.parentId &&
                        studentData.parentId.length > 0 ? (
                          <StudentGuardianView
                            parentId={studentData.parentId}
                          />
                        ) : (
                          <Link
                            href="/students/guardians/"
                            className="cta-2 mx-auto"
                          >
                            <span className="opacity-50">
                              <span className="plus">+</span> Add guardian
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Student not found</div>
                )}
              </>
            )}

            <div className="cta-container flex gap-2 w-full items-center justify-end">
              <AnimatePresence>
                {isEditError && (
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

              <span onClick={setViewStudentModalActive} className="cta-2">
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

export default ViewStudent;
