"use client";

import React, { useState } from "react";
import XClose from "../../svg/XClose";
import useViewClassModalStore from "@/context/modals/viewClass";

function ViewClass() {
  const { viewClassModalActive, setViewClassModalActive } = useViewClassModalStore();

  return (
    <>
      {viewClassModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal view-modal ${
          viewClassModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-2 justify-end`}
      >
        <form className="card relative">
          <span className="card-title flex items-center">
            Form 4 A
            <span
              onClick={setViewClassModalActive}
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
              <span onClick={setViewClassModalActive} className="cta-2">
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

export default ViewClass;
