"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import { useStudentModalStore } from "@/context/modals/addStudent";
import ClassPicker from "../ClassPicker";
import CheckCircle from "@/components/svg/CheckCircle";
import { BASE_URL } from "@/constants/BASE_URL";
import { TokenTypes } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next/client";
import Loader from "@/components/ux/Loader";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { generatePassword } from "@/utils/generatePassword";

function AddStudent() {
  const [gender, setGender] = useState("male");
  const { setStudentModalActive, studentModalActive, setStudentChange } =
    useStudentModalStore();
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [subClassId, setsubClassId] = useState("");
  const [classId, setClassId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [mainClassName, setMainClassName] = useState("");
  const [subClassName, setSubClassName] = useState("");

  const addStudent = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    setPassword(generatePassword);

    if (token) {
      const decodedToken: TokenTypes = jwtDecode(token);
      const schoolId = decodedToken.SchoolId;
      try {
        const response = await fetch(`${BASE_URL}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            schoolId,
            gender,
            email,
            classId,
            subClassId,
            address,
            phoneNumber,
            password,
            enrollmentDate,
            dateOfBirth,
            studentNumber,
            status: "active",
          }),
        });

        console.log(
          JSON.stringify({
            firstName,
            lastName,
            schoolId,
            gender,
            email,
            classId,
            subClassId,
            address,
            phoneNumber,
            password,
            enrollmentDate,
            dateOfBirth,
            studentNumber,
            status: "active",
          })
        );

        const data = await response.json();

        if (response.status == 201) {
          setIsLoading(false);
          setIsSuccess(true);
          setStudentChange();
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addStudent();
          }}
          className="card relative"
        >
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
                <input
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="">Last name</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="">Phone</label>
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div className="input-group">
                <label htmlFor="">Email</label>
                <input
                  required
                  value={email}
                  onChange={(e) => {
                    SetEmail(e.target.value);
                  }}
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="">Date of birth</label>
                <input
                  required
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                  type="date"
                  placeholder="Date of birth"
                />
              </div>

              <div className="input-group date-input relative">
                <label htmlFor="">Date enrolled</label>
                <input
                  required
                  value={enrollmentDate}
                  onChange={(e) => {
                    setEnrollmentDate(e.target.value);
                  }}
                  type="date"
                  placeholder="Date enrolled"
                />
              </div>
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
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
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
                  <span className="radio-btn">
                    <CheckCircle />
                  </span>
                  <span className="radio-btn-label">Female</span>
                </span>
              </div>
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
                  value={mainClassName + " " + subClassName}
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
                    mainClassId={classId}
                    setMainClassId={setClassId}
                    setSubClassId={setsubClassId}
                    subClassId={subClassId}
                    setMainClassName={setMainClassName}
                    setSubClassName={setSubClassName}
                  />
                )}
              </div>
              <div className="input-group">
                <label htmlFor="">Student number</label>
                <input
                  required
                  value={studentNumber}
                  onChange={(e) => {
                    setStudentNumber(e.target.value);
                  }}
                  type="text"
                  placeholder="Student number or ID number"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="">Address</label>
              <input
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                placeholder="Address"
              />
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
                    Student has been added successfully
                  </motion.span>
                )}
              </AnimatePresence>

              <span onClick={setStudentModalActive} className="cta-2">
                Cancel
              </span>
              <button className="cta">{isLoading ? <Loader /> : "Save"}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
