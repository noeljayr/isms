"use client";

import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import XClose from "../../svg/XClose";
import useClassModalStore from "@/context/modals/addClass";
import CheckCircle from "@/components/svg/CheckCircle";
import Check from "@/components/svg/Check";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import Plus from "@/components/svg/Plus";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import Loader from "@/components/ux/Loader";
import { TokenTypes } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import { TOKEN_COOKIE_NAME } from "@/middleware";

const INITIAL_SUGGESTED = ["A", "B", "C", "D", "E", "F", "X", "Y", "Z"];

function AddClass() {
  const { classModalActive, setClassModalActive, setAddClassesChange } =
    useClassModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mainClassSuccess, setMainClassSuccess] = useState(false);
  const [mainClassId, setMainClassId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);

  const [name, setName] = useState("");

  const addClass = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);

    if (token) {
      const decodedToken: TokenTypes = jwtDecode(token);
      const schoolId = decodedToken.SchoolId;
      try {
        const response = await fetch(`${BASE_URL}/classes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, schoolId }),
        });

        const data = await response.json();

        if (response.status == 201) {
          setIsLoading(false);
          setMainClassId(data.data.id);
          setMainClassSuccess(true);
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
    } else {
      setIsError(true);
      setErrorMessage("Not authorized");
    }
  };

  useEffect(() => {
    const addSubClasses = async () => {
      if (selectedSubclasses.length > 0) {
        const classId = mainClassId;
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        setIsSuccess(false);

        for (let i = 0; i < selectedSubclasses.length; i++) {
          const name = selectedSubclasses[i];
          try {
            const response = await fetch(`${BASE_URL}/SubClass`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ name, classId }),
            });

            const data = await response.json();

            if (response.status == 201) {
              setIsLoading(false);
              setIsSuccess(true);
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

        setAddClassesChange();
      } else {
        setIsSuccess(true);
        setAddClassesChange();
        setClassModalActive();
      }
    };

    if (mainClassSuccess) {
      addSubClasses();
      setClassModalActive();
    }
  }, [mainClassSuccess]);

  const [enableSubclass, setEnableSubclass] = useState(false);
  const [selectedSubclasses, setSelectedSubclasses] = useState<string[]>([]);
  const [suggestedSubclasses, setSuggestedSubclasses] =
    useState<string[]>(INITIAL_SUGGESTED);
  const [newSubclass, setNewSubclass] = useState("");

  // select from suggestions
  const handleSelectSuggested = (sub: string) => {
    setSelectedSubclasses((prev) => [...prev, sub]);
    setSuggestedSubclasses((prev) => prev.filter((s) => s !== sub));
  };

  // remove from selected (and re-add to suggestions if it was original)
  const handleRemoveSelected = (sub: string) => {
    setSelectedSubclasses((prev) => prev.filter((s) => s !== sub));
    if (INITIAL_SUGGESTED.includes(sub) && !suggestedSubclasses.includes(sub)) {
      setSuggestedSubclasses((prev) => [...prev, sub]);
    }
  };

  // manual input handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSubclass(e.target.value);
  };
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSubclass.trim()) {
      const trimmed = newSubclass.trim();
      if (!selectedSubclasses.includes(trimmed)) {
        setSelectedSubclasses((prev) => [...prev, trimmed]);
        setSuggestedSubclasses((prev) => prev.filter((s) => s !== trimmed));
      }
      setNewSubclass("");
      e.preventDefault();
    }
  };

  const addSubClass = () => {
    const trimmed = newSubclass.trim();
    if (!selectedSubclasses.includes(trimmed)) {
      setSelectedSubclasses((prev) => [...prev, trimmed]);
      setSuggestedSubclasses((prev) => prev.filter((s) => s !== trimmed));
    }
    setNewSubclass("");
  };

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
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            addClass();
          }}
          className="card relative"
        >
          <motion.span className="card-title flex items-center">
            New class
            <span
              onClick={setClassModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </motion.span>

          <motion.div className="card-body flex flex-col gap-4">
            <motion.div className="input-group">
              <label htmlFor="">Class name</label>
              <input
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Class name"
              />
            </motion.div>

            <motion.div className="flex flex-col gap-2">
              <span style={{ fontSize: "var(--p2)", fontWeight: 500 }}>
                Sub classes
              </span>
              <div className="flex flex-col gap-2">
                <div className="sub">
                  <span
                    onClick={() => {
                      setEnableSubclass(!enableSubclass);
                    }}
                    className={`checkbox-container ${
                      enableSubclass ? "checked" : ""
                    }`}
                  >
                    <span className="checkbox">
                      <Check />
                    </span>
                    <span className="checkbox-label">Enable subclasses</span>
                  </span>
                </div>

                <AnimatePresence>
                  {enableSubclass && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={motionTranstion}
                      className="subclass-input flex flex-col gap-2"
                    >
                      <div className="selected-subclasses flex gap-2 flex-wrap">
                        <div className="grid gap-0.5 grid-cols-[auto_auto]">
                          <div
                            style={{
                              width: "fit-content",
                              position: "relative",
                            }}
                            className="input-group"
                          >
                            <input
                              style={{
                                borderRadius: "2rem",
                                height: "1.8rem",
                                width: "10rem",
                              }}
                              type="text"
                              placeholder="Enter a subclass name"
                              value={newSubclass}
                              onChange={handleInputChange}
                              onKeyDown={handleInputKeyDown}
                            />
                          </div>
                          <div onClick={addSubClass} className="add-btn">
                            <Plus />
                          </div>
                        </div>

                        {selectedSubclasses.map((subclass, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer select-none"
                            onClick={() => handleRemoveSelected(subclass)}
                          >
                            {subclass}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span
                          style={{ fontSize: "var(--p2)" }}
                          className="font-medium opacity-75"
                        >
                          Suggested subclasses
                        </span>

                        <div className="flex gap-2 flex-wrap suggested-classes">
                          {suggestedSubclasses.map((subClass, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => handleSelectSuggested(subClass)}
                              className="cursor-pointer select-none"
                            >
                              {subClass}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

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
                    Classes has been added successfully
                  </motion.span>
                )}
              </AnimatePresence>
              <span onClick={setClassModalActive} className="cta-2 ml-auto">
                Cancel
              </span>
              <button className="cta">{isLoading ? <Loader /> : "Add"}</button>
            </div>
          </motion.div>
        </motion.form>
      </div>
    </>
  );
}

export default AddClass;
