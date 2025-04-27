"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import useViewStudentModalStore from "@/context/modals/viewStudents";
import { formatDate } from "@/utils/formatDate";
import Pen from "@/components/svg/Edit";

const studentData = {
  id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  studentNumber: 123456,
  firstName: "Stella",
  lastName: "Mtonga",
  dateOfBirth: "2004-04-27T14:28:48.921Z",
  guardian: {
    title: "Mrs.",
    firstName: "Ruth",
    lastName: "Mtonga",
    email: "rm@gmail.com",
    phone: "0888888123",
    address: "Address",
  },
  class: "Form 4",
  status: "active",
};

const tabs = ["Student details", "Academic perfomance", "Finances"];
function ViewStudent() {
  const { setViewStudentModalActive, viewStudentModalActive } =
    useViewStudentModalStore();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [indicatorPosition, setIndicatorPosition] = useState("");

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    setIndicatorPosition(`calc(${index} * 100% / 3)`);
  }, [activeTab]);

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
        <form className="card relative">
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

          <div style={{overflow: "hidden"}} className="card-body modal-content grid gap-4">
            <div className="section gap-1">
              <span className="student-name font-medium">
                {studentData.firstName + " " + studentData.lastName}
              </span>
              <div className="student-overview w-full justify-between flex gap-2 items-center">
                <span className="flex opacity-75 number">
                  # {studentData.studentNumber}
                </span>

                <span className="font-bold opacity-25">•</span>

                <span className="flex opacity-75">{studentData.class}</span>

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
              <div className="flex flex-col gap-4 h-full overflow-y-auto">
                <div className="section gap-2 relative">
                  <span className="edit-btn flex items-center justify-center absolute right-2 top-2">
                    Edit <Pen />
                  </span>
                  <span className="student-name font-medium">
                    Personal Details
                  </span>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">First name</span>
                      <span className="number">{studentData.firstName}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Last name</span>
                      <span className="number">{studentData.lastName}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">
                        Date of birth
                      </span>
                      <span className="number">
                        {formatDate(studentData.dateOfBirth)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">
                        Date enrolled
                      </span>
                      <span className="number">
                        {formatDate("2024-02-15T14:28:48.921Z")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="section gap-2 relative">
                  <span className="edit-btn flex items-center justify-center absolute right-2 top-2">
                    Edit <Pen />
                  </span>
                  <span className="student-name font-medium">Guardian</span>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">First name</span>
                      <span className="number">
                        {studentData.guardian.firstName}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Last name</span>
                      <span className="number">
                        {studentData.guardian.lastName}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Phone</span>
                      <span className="number">
                        {studentData.guardian.phone}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Email</span>
                      <span className="number">
                        {studentData.guardian.email}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Address</span>
                      <span className="number">
                        {studentData.guardian.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setViewStudentModalActive} className="cta-2">
                Cancel
              </span>
              <span className="cta opacity-25">Save</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ViewStudent;
