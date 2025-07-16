"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import CheckCircle from "@/components/svg/CheckCircle";
import { BASE_URL } from "@/constants/BASE_URL";
import { jwtDecode } from "jwt-decode";
import { TokenTypes } from "@/types/token";
import { getCookie } from "cookies-next/client";
import { motionTransition } from "@/constants/motionTransition";
import { useAccountantModalStore } from "@/context/modals/addAccountant";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { AnimatePresence, motion } from "motion/react";
import Loader from "@/components/ux/Loader";
import { generatePassword } from "@/utils/generatePassword";
import { capitalize } from "@/utils/capitalize";

function AddAccountant() {
  const [gender, setGender] = useState("male");
  const { accountantModalActive, setAddAccountantModalActive } =
    useAccountantModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");

  const createAccountant = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);

    if (token) {
      const decodedToken: TokenTypes = jwtDecode(token);
      const SchoolId = decodedToken.SchoolId;
      try {
        const response = await fetch(`${BASE_URL}/Accountants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            SchoolId,
            gender,
            email,
            address,
            phoneNumber,
            password: generatePassword(lastName),
            status: "active",
          }),
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
    } else {
      setIsError(true);
      setErrorMessage("Not authorized");
    }
  };

  return (
    <>
      {accountantModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal add-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          accountantModalActive ? "modal-active" : ""
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccountant();
          }}
          className="card"
        >
          <span className="card-title flex items-center">
            New Accountant
            <span
              onClick={setAddAccountantModalActive}
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
                  value={firstName}
                  onChange={(e) => setFirstName(capitalize(e.target.value))}
                  required
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="">Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(capitalize(e.target.value))}
                  required
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                type="text"
                placeholder="Address"
              />
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
              <div className="input-group">
                <label htmlFor="">Email</label>
                <input
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="">Phone</label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  type="text"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="cta-container flex gap-2 w-full justify-end items-center">
              <AnimatePresence>
                {isError && (
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
                    {firstName} {lastName} been added as an accountant
                  </motion.span>
                )}
              </AnimatePresence>

              <span onClick={setAddAccountantModalActive} className="cta-2">
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

export default AddAccountant;
