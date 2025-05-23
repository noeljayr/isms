"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import useViewStudentModalStore from "@/context/modals/viewStudents";
import { formatDate } from "@/utils/formatDate";
import Pen from "@/components/svg/Edit";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import { StudentTypes } from "@/types/student-types";
import StudentGuardianView from "./StudentGuardianView";
import Loader from "@/components/ux/Loader";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import { useStudentModalStore } from "@/context/modals/addStudent";

const tabs = ["Student details", "Academic perfomance", "Finances"];

function ViewStudent() {
  const { setViewStudentModalActive, viewStudentModalActive, viewStudentId } =
    useViewStudentModalStore();
  const { setStudentChange, studentChange } = useStudentModalStore();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [indicatorPosition, setIndicatorPosition] = useState("");
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
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [mainClassName, setMainClassName] = useState("");
  const [subClassName, setSubClassName] = useState("");
  const [isEditError, setEditError] = useState(false);

  const token = getCookie(TOKEN_COOKIE_NAME);

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    setIndicatorPosition(`calc(${index} * 100% / 3)`);
  }, [activeTab]);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      if (viewStudentId && viewStudentId.length > 0) {
        try {
          const response = await fetch(
            `${BASE_URL}/students/${viewStudentId}`,
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
            setStudentData(data.data);
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
      }
    };
    getStudents();
  }, [viewStudentId,studentChange]);

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
    }
  }, [studentData]);

  useEffect(() => {
    if (!pReadyOnly) {
      if (studentData) {
        setFirstName(studentData.firstName);
        setLastName(studentData.lastName);
        SetEmail(studentData.email);
        setAddress(studentData.address);
        setPhoneNumber(studentData.phoneNumber);
        setDateOfBirth(studentData.dateOfBirth);
        setEnrollmentDate(studentData.enrollmentDate);
        setGender(studentData.gender);
      }
    }
  }, [pReadyOnly]);

  const editStudent = async () => {
    setIsLoading(true);
    setEditError(false);
    setErrorMessage("");
    setIsSuccess(false);

    if (token) {
      try {
        const response = await fetch(`${BASE_URL}/students/${viewStudentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: viewStudentId,
            firstName,
            lastName,
            gender,
            email,
            address,
            phoneNumber,
          }),
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setIsSuccess(true);
          setStudentChange();
        } else {
          setEditError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setEditError(true);
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      setEditError(true);
      setErrorMessage("Not authorized");
    }
  };

  return (
    <>
      {viewStudentModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal view-modal ${
          viewStudentModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editStudent();
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

          {studentData && (
            <>
              <div
                style={{ overflow: "hidden" }}
                className="card-body modal-content grid gap-4"
              >
                <div className="section gap-1">
                  <span className="student-name font-medium">
                    {studentData.firstName + " " + studentData.lastName}
                  </span>
                  <div className="student-overview w-full justify-between flex gap-2 items-center">
                    <span className="flex opacity-75 number">
                      # {studentData.studentNumber}
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75"></span>

                    <span className="font-bold opacity-25">•</span>

                    <span className="attendance-rate number opacity-75">
                      95% Attandance rate
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <span className={`status ${studentData.status}-status`}>
                      {studentData.status}
                    </span>
                  </div>
                </div>

                <div className="tabs relative">
                  <span
                    style={{ left: indicatorPosition }}
                    className="tab-indicator absolute bottom-0"
                  ></span>
                  {tabs.map((tab, index) => (
                    <span
                      key={index}
                      onClick={() => setActiveTab(tab)}
                      className={`tab font-medium ${
                        activeTab == tab ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                {activeTab == "Student details" && (
                  <>
                    {isLoading ? (
                      <div className="absolute inset-0 self-center translate-[50%]">
                        <Loader variant="primary" />
                      </div>
                    ) : isError ? (
                      <div className="error">Something went wrong</div>
                    ) : studentData ? (
                      <>
                        <div className="grid grid-cols-1 grid-rows-[auto_auto] pb-2 gap-4 h-full overflow-y-auto">
                          <div className="section gap-2 relative">
                            <span
                              onClick={() => setPReadOnly(!pReadyOnly)}
                              className="edit-btn flex items-center justify-center absolute right-2 top-2"
                            >
                              Edit <Pen />
                            </span>
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
                                  type={pReadyOnly ? "text": "date"}
                                  onChange={(e) =>
                                    setDateOfBirth(e.target.value)
                                  }
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
                                  type={pReadyOnly ? "text": "date"}
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
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
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
                            <Link
                              href="/students/guardians/"
                              className="edit-btn flex items-center justify-center absolute right-2 top-2"
                            >
                              Edit <Pen />
                            </Link>
                            <span className="student-name font-medium">
                              Guardian
                            </span>
                            <StudentGuardianView
                              parentId={studentData.parentId}
                            />
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
                        Student updated successfully.
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span onClick={setViewStudentModalActive} className="cta-2">
                    Cancel
                  </span>
                  <button
                    disabled={pReadyOnly || isLoading}
                    className={`cta ${
                      pReadyOnly ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    {isLoading ? <Loader /> : "Save"}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default ViewStudent;
