"use client";

import React, { useState } from "react";
import XClose from "../../../svg/XClose";
import useGuardianModalStore from "@/context/modals/addGuardian";

function AddGuardian() {
  const [gender, setGender] = useState("male");
  const { setGuardianModalActive, guardianModalActive } =
    useGuardianModalStore();

  return (
    <>
      {guardianModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal add-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          guardianModalActive ? "modal-active" : ""
        }`}
      >
        <form className="card">
          <span className="card-title flex items-center">
            New guardian
            <span
              onClick={setGuardianModalActive}
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
                <input required type="text" placeholder="First name" />
              </div>
              <div className="input-group">
                <label htmlFor="">Last name</label>
                <input required type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="">Address</label>
              <input required type="text" placeholder="Address" />
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
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="">Email</label>
                <input required type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <label htmlFor="">Phone</label>
                <input required type="text" placeholder="Phone" />
              </div>
            </div>

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setGuardianModalActive} className="cta-2">
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

export default AddGuardian;
