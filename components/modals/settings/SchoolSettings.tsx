"use client";

import { getSchool } from "@/api/school";
import { SchoolTypes } from "@/types/SchoolTypes";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { token } from "@/app/auth/token";
import CheckCircle from "@/components/svg/CheckCircle";
import Pen from "@/components/svg/Edit";
import { motionTranstion } from "@/constants/motionTranstion";
import Loader from "@/components/ux/Loader";

function SchoolSettings() {
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [schoolData, setData] = useState<SchoolTypes>();

  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolType, setSchoolType] = useState<string>("");
  const [schoolCategory, setSchoolCategory] = useState<string>("");
  const [schoolLogoPath, setSchoolLogoPath] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gradingSystem, setGradingSystem] = useState<string>("");

  useEffect(() => {
    if (!token) return;

    getSchool({
      setData,
      setErrorMessage,
      setIsError,
      setIsLoading,
      id: token.schoolId,
    });
  }, [token]);

  useEffect(() => {
    if (!schoolData) return;
    setSchoolName(schoolData.schoolName);
    setContact(schoolData.contact);
    setAddress(schoolData.address);
    setGradingSystem(schoolData.gradingSystem);
    setSchoolLogoPath(schoolLogoPath);
    setSchoolCategory(schoolData.schoolCategory);
    setSchoolType(schoolData.schoolType);
  }, [schoolData]);

  useEffect(() => {
    if (pReadyOnly) {
      if (!schoolData) return;
      setSchoolName(schoolData.schoolName);
      setContact(schoolData.contact);
      setAddress(schoolData.address);
      setGradingSystem(schoolData.gradingSystem);
      setSchoolLogoPath(schoolLogoPath);
      setSchoolCategory(schoolData.schoolCategory);
      setSchoolType(schoolData.schoolType);
    }
  }, [pReadyOnly, schoolData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-2"
    >
      <AnimatePresence mode="wait">
        <div
          key={"1"}
          style={{ display: "grid", rowGap: "0.75rem", columnGap: "2rem" }}
          className="grid grid-cols-2 gap-5  section relative"
        >
          <span
            onClick={() => setPReadOnly(!pReadyOnly)}
            className={`edit-btn absolute top-2 z-10 bg-white right-2 flex items-center cursor-pointer ${
              pReadyOnly ? "" : "active-edit"
            }`}
          >
            Edit <Pen />
          </span>
          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              School Name
            </motion.span>
            <input
              readOnly={pReadyOnly}
              value={schoolName}
              className="number"
              type="text"
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </motion.div>
          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              Phone
            </motion.span>
            <input
              readOnly={pReadyOnly}
              value={contact}
              className="number"
              type="text"
              onChange={(e) => setContact(e.target.value)}
            />
          </motion.div>

          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              Location
            </motion.span>
            <input
              readOnly={pReadyOnly}
              value={address}
              className="number"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </motion.div>

          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              Category
            </motion.span>
            {pReadyOnly ? (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"ct-input"}
                readOnly={pReadyOnly}
                value={schoolCategory}
                className="number"
                type="text"
                onChange={(e) => setSchoolCategory(e.target.value)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"ct-radio"}
                className="flex gap-4"
                layout
              >
                <span
                  onClick={() => {
                    setSchoolCategory("Private");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    schoolCategory == "Private" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Private</span>
                </span>

                <span
                  onClick={() => {
                    setSchoolCategory("Government");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    schoolCategory == "Government" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Government</span>
                </span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              Type
            </motion.span>
            {pReadyOnly ? (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"type-input"}
                readOnly={pReadyOnly}
                value={schoolType}
                className="number"
                type="text"
                onChange={(e) => setSchoolType(e.target.value)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"type-radio"}
                className="flex gap-4"
                layout
              >
                <span
                  onClick={() => {
                    setSchoolType("Day");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    schoolType == "Day" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Day</span>
                </span>

                <span
                  onClick={() => {
                    setSchoolType("Open");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    schoolType == "Open" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Open</span>
                </span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            layout
            transition={motionTranstion}
            className="flex flex-col"
          >
            <motion.span
              layout
              transition={motionTranstion}
              className="font-medium opacity-65"
            >
              Grading System
            </motion.span>
            {pReadyOnly ? (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"g-input"}
                readOnly={pReadyOnly}
                value={gradingSystem}
                className="number"
                type="text"
                onChange={(e) => setGradingSystem(e.target.value)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"g-radio"}
                className="flex gap-4"
                layout
              >
                <span
                  onClick={() => {
                    setGradingSystem("Malawian");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    gradingSystem == "Malawian" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Malawian</span>
                </span>

                <span
                  onClick={() => {
                    setGradingSystem("Cambridge");
                  }}
                  className={`radio-btn-container ${
                    pReadyOnly ? "pointer-events-none" : ""
                  } mt-2 mb-2 ${
                    gradingSystem == "Cambridge" ? "selected-radio-btn" : ""
                  }`}
                >
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Cambridge</span>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
        {/* 
        <div
          key="2"
          className="cta-container flex gap-2 w-full items-center justify-end"
        >
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
                Updated.
              </motion.span>
            )}
          </AnimatePresence>

          <span onClick={() => setPReadOnly(!false)} className="cta-2">
            Cancel
          </span>
          <button
            type="button"
            disabled={pReadyOnly || isLoading}
            className={`cta ${pReadyOnly ? "opacity-25" : "opacity-100"}`}
          >
            {isLoading ? <Loader /> : "Save"}
          </button>
        </div> */}
      </AnimatePresence>
    </motion.div>
  );
}

export default SchoolSettings;
