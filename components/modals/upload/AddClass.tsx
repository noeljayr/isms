"use client";

import React, { useState } from "react";
import XClose from "../../svg/XClose";
import useClassModalStore from "@/context/modals/addClass";

function AddClass() {
  const { classModalActive, setClassModalActive } = useClassModalStore();

  return (
    <>
      {classModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal ${
          classModalActive ? "modal-active" : ""
        } add-class fixed h-screen w-screen left-0 top-0 flex items-center justify-center`}
      >
        <form className="card relative">
          <span className="card-title flex items-center">
            New class
            <span
              onClick={setClassModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <div className="input-group">
              <label htmlFor="">Class name</label>
              <input type="text" placeholder="Class name" />
            </div>

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setClassModalActive} className="cta-2">
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

export default AddClass;
