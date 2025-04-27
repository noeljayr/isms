"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import {useStudentModalStore} from "@/context/modals/addStudent";
import ClassPicker from "../ClassPicker";


function AddStudent() {
  const [gender, setGender] = useState("male");
  const { setStudentModalActive, studentModalActive } = useStudentModalStore();
  const [selectedClass, setSelectedClass] = useState("");
  const [showClassPicker, setShowClassPicker] = useState(false);

  return (
    <>
      {studentModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal ${
          studentModalActive ? "modal-active" : ""
        } add-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center`}
      >
        <form className="card relative">
          <span className="card-title flex items-center">
            New student
            <span
              onClick={setStudentModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="">First name</label>
                <input type="text" placeholder="First name" />
              </div>
              <div className="input-group">
                <label htmlFor="">Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="">Date of birth</label>
              <input type="date" placeholder="Date of birth" />
            </div>

            <div className="input-group flex gap-2 w-full">
              <label htmlFor="">Gender</label>
              <div className="flex gap-4">
                <span
                  onClick={() => {
                    setGender("male");
                  }}
                  className={`radio-btn-container ${
                    gender == "male" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn" />
                  <span className="radio-btn-label">Male</span>
                </span>

                <span
                  onClick={() => {
                    setGender("female");
                  }}
                  className={`radio-btn-container ${
                    gender == "female" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn" />
                  <span className="radio-btn-label">Female</span>
                </span>
              </div>
            </div>

            <div className="input-group date-input relative">
              <label htmlFor="">Date enrolled</label>
              <input type="date" placeholder="Date enrolled" />
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
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
                  value={selectedClass}
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
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                  />
                )}
              </div>
              <div className="input-group">
                <label htmlFor="">Student number</label>
                <input type="text" placeholder="Student number or ID number" />
              </div>
            </div>

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setStudentModalActive} className="cta-2">
                Cancel
              </span>
              <span className="cta">Save</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
