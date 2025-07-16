"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import Pen from "@/components/svg/Edit";
import Loader from "@/components/ux/Loader";
import { TeacherTypes } from "@/types/StaffTypes";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import useViewTeacherModalStore from "@/context/modals/teachers/viewTeacher";
import { useTeacherModalStore } from "@/context/modals/teachers/addTeacher";
import { formatDate } from "@/utils/formatDate";
import Check from "@/components/svg/Check";
import Subjects from "./Subjects";
import Trash from "@/components/svg/Trash";
import Tabs from "@/components/ui/Tabs";
import { getTeachers, updateTeacher } from "@/api/teachers";
import Status from "@/components/ui/Status";

const tabs = ["Personal Details", "Subjects"];
const qualificationData = [
  "Bachelors",
  "Masters",
  "PhD",
  "Diploma",
  "Certificate",
];
const statuses = ["Active", "Deactivated"];

function ViewTeacher() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { viewTeacherId, viewTeacherModalActive, setViewTeacherModalActive } =
    useViewTeacherModalStore();
  const { setAddTeacherChange, addTeacherChange } = useTeacherModalStore();
  const [teachersData, setTeacherData] = useState<TeacherTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditError, setEditError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [employmentDate, setEmploymentDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [selectedQualification, setSelectedQualification] = useState<string[]>(
    []
  );

  const toggleQualification = (qualification: string) => {
    if (selectedQualification.includes(qualification)) {
      setSelectedQualification((prev) =>
        prev.filter((q) => q !== qualification)
      );
    } else {
      setSelectedQualification((prev) => [...prev, qualification]);
    }
  };

  const checkSelectedQualification = (qualification: string) => {
    return selectedQualification.includes(qualification);
  };

  useEffect(() => {
    if (!viewTeacherId) return;
    getTeachers({
      setIsError,
      setIsLoading,
      setData: setTeacherData,
      setErrorMessage,
      id: viewTeacherId,
    });
  }, [viewTeacherId, addTeacherChange]);

  useEffect(() => {
    if (teachersData) {
      setFirstName(teachersData.firstName);
      setLastName(teachersData.lastName);
      SetEmail(teachersData.email);
      setPhoneNumber(teachersData.phoneNumber);
      setEmploymentDate(teachersData.employmentDate);
      setQualifications(teachersData.qualifications);
      setSelectedQualification(teachersData.qualifications);
      setActiveStatus(teachersData.status);
    }
  }, [teachersData]);

  useEffect(() => {
    if (!pReadyOnly && teachersData) {
      setFirstName(teachersData.firstName);
      setLastName(teachersData.lastName);
      SetEmail(teachersData.email);
      setPhoneNumber(teachersData.phoneNumber);
    }
  }, [pReadyOnly, teachersData]);

  const edit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!viewTeacherId) return;
    updateTeacher({
      setErrorMessage,
      setAddTeacherChange,
      setIsLoading,
      setIsError,
      setSuccess: setIsSuccess,
      id: viewTeacherId,
      firstName,
      lastName,
      gender,
      email,
      address,
      phoneNumber,
      qualifications: selectedQualification,
      employmentDate,
      status: activeStatus,
    });
  };

  return (
    <>
      {viewTeacherModalActive && (
        <div
          onClick={setViewTeacherModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        className={`modal view-modal ${
          viewTeacherModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form onSubmit={edit} className="card relative">
          <span className="card-title flex items-center">
            Teacher information
            <span
              onClick={setViewTeacherModalActive}
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
              <div className="absolute inset-0 self-center z-10 translate-[50%]">
                <Loader variant="primary" />
              </div>
            ) : isError ? (
              <motion.div className="">Something went wrong</motion.div>
            ) : teachersData ? (
              <>
                <div className="section relative gap-1">
                  <span className="user-name font-medium">
                    {teachersData.firstName + " " + teachersData.lastName}
                  </span>
                  <div className="user-overview w-full justify-between flex gap-2 items-center">
                    <span className="flex opacity-75">
                      {teachersData.email}
                    </span>
                    <span className="font-bold opacity-25">•</span>

                    <span className="flex opacity-75">
                      {teachersData.phoneNumber}
                    </span>

                    <span className="font-bold opacity-25">•</span>

                    <Status
                      statuses={statuses}
                      activeStatus={activeStatus}
                      setActiveStatus={setActiveStatus}
                      pReadyOnly={pReadyOnly}
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

                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {activeTab == "Personal Details" && (
                  <div className="flex flex-col gap-4 h-full overflow-y-auto">
                    <div className="section gap-2 relative">
                      <span className="font-medium">Personal Details</span>
                      <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="flex flex-col">
                          <span className="font-medium opacity-65">
                            First name
                          </span>
                          <input
                            readOnly={pReadyOnly}
                            value={firstName}
                            className="number"
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
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-medium opacity-65">Email</span>
                          <input
                            readOnly={pReadyOnly}
                            value={email}
                            className="number"
                            onChange={(e) => SetEmail(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-medium opacity-65">Phone</span>
                          <input
                            readOnly={pReadyOnly}
                            value={phoneNumber}
                            className="number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-medium opacity-65">
                            Employed on
                          </span>
                          <input
                            readOnly={pReadyOnly}
                            value={formatDate(employmentDate)}
                            className="number"
                            onChange={(e) => setEmploymentDate(e.target.value)}
                            type={pReadyOnly ? "text" : "date"}
                          />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        layout
                        key={"container"}
                        transition={motionTransition}
                        className="section"
                      >
                        <motion.span layout="position" className="font-medium">
                          Qualifications
                        </motion.span>

                        {pReadyOnly ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={motionTransition}
                            layout="position"
                            key={"qf-tags"}
                            className="flex flex-wrap mt-2 gap-4 w-full"
                          >
                            {qualifications.map((qualification, index) => (
                              <span
                                key={index}
                                className="qualification-tag py-1.5 px-6 rounded-[2rem] font-p-2 font-medium bg-[var(--white)] border-[1px] border-[var(--border)]"
                              >
                                {qualification}
                              </span>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={motionTransition}
                            layout="position"
                            key={"qf-checkboxes"}
                            className="flex gap-6 items-center mt-2"
                          >
                            {qualificationData.map((qualification, index) => (
                              <div
                                onClick={() =>
                                  toggleQualification(qualification)
                                }
                                key={index}
                                className="flex items-center gap-"
                              >
                                <span
                                  className={`checkbox-container ${
                                    checkSelectedQualification(qualification)
                                      ? "checked"
                                      : ""
                                  }`}
                                >
                                  <span className="checkbox">
                                    <Check />
                                  </span>
                                  <span className="checkbox-label">
                                    {qualification}
                                  </span>
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {activeTab == "Subjects" && viewTeacherId && (
                  <Subjects
                    setIsSuccess={setIsSuccess}
                    activeTab={activeTab}
                    isEditError={isEditError}
                    isSuccess={isSuccess}
                    setActivetab={setActiveTab}
                  />
                )}
              </>
            ) : (
              <div>Teacher not found</div>
            )}

            <AnimatePresence mode="popLayout">
              {activeTab === "Personal Details" && (
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
                        Updated
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span onClick={setViewTeacherModalActive} className="cta-2">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </>
  );
}

export default ViewTeacher;
