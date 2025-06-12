"use client";

import React, { useState } from "react";
import XClose from "../../svg/XClose";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import Loader from "@/components/ux/Loader";
import useEventModalStore from "@/context/modals/addEvent";
import { addEvent } from "@/api/events";

function AddEvent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { eventModalActive, setEventModalActive, setAddEventChange } =
    useEventModalStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEvent({
      title,
      description,
      fromDate,
      toDate,
      setAddEventChange,
      setErrorMessage,
      setIsError,
      setIsLoading,
      setIsSuccess,
    });
  };

  return (
    <>
      {eventModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal ${
          eventModalActive ? "modal-active" : ""
        } add-class fixed h-screen w-screen left-0 top-0 flex items-center justify-center`}
      >
        <form onSubmit={submit} className="card relative">
          <span className="card-title flex items-center">
            New event
            <span
              onClick={setEventModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <div className="input-group">
              <label htmlFor="">Title</label>
              <input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Title"
              />
            </div>

            <div className="input-group">
              <label htmlFor="">Description</label>
              <textarea
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                placeholder="Description"
              />
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="">Start date</label>
                <input
                  required
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                  value={fromDate}
                  placeholder="Start date"
                  type="date"
                />
              </div>
              <div className="input-group">
                <label htmlFor="">End date</label>
                <input
                  required
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                  value={toDate}
                  placeholder="End date"
                  type="date"
                />
              </div>
            </div>

            <div className="cta-container items-center flex gap-2 w-full justify-end">
              <AnimatePresence>
                {isError && (
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
                    className="error"
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
                    className="success"
                  >
                    Event added.
                  </motion.span>
                )}
              </AnimatePresence>
              <span onClick={setEventModalActive} className="cta-2 ml-auto">
                Cancel
              </span>
              <button className="cta">{isLoading ? <Loader /> : "Add"}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEvent;
