"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import Pen from "@/components/svg/Edit";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import Loader from "@/components/ux/Loader";
import useViewGuardiansModalStore from "@/context/modals/viewGuardians";
import { Guardian } from "@/types/guardian-types";
import Search from "@/components/svg/Search";
import { TokenTypes } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from "motion/react";
import { motionTranstion } from "@/constants/motionTranstion";
import useGuardianModalStore from "@/context/modals/addGuardian";
const tabs = ["Personal Details", "Students"];

function ViewGuardian() {
  const {
    setViewGuardianModalActive,
    viewGuardiansId,
    viewGuardiansModalActive,
  } = useViewGuardiansModalStore();
  const { setAddGuardianChange, addGuardianChange } = useGuardianModalStore();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [indicatorPosition, setIndicatorPosition] = useState("");
  const [guardianData, setguardianData] = useState<Guardian>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditError, setEditError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [search, setSearch] = useState("");
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [email, SetEmail] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [gender, setGender] = useState<string | undefined>("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    setIndicatorPosition(`calc(${index} * 100% / 3)`);
  }, [activeTab]);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      if (viewGuardiansId && viewGuardiansId.length > 0) {
        try {
          const response = await fetch(
            `${BASE_URL}/Guardians/${viewGuardiansId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.status == 200) {
            setIsLoading(false);
            setguardianData(data.data);
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
    };
    getStudents();
  }, [viewGuardiansId, addGuardianChange]);

  useEffect(() => {
    if (guardianData) {
      setFirstName(guardianData.firstName);
      setLastName(guardianData.lastName);
      SetEmail(guardianData.email);
      setAddress(guardianData.address);
      setPhoneNumber(guardianData.phoneNumber);
    }
  }, [guardianData]);

  useEffect(() => {
    if (!pReadyOnly) {
      setFirstName(guardianData?.firstName);
      setLastName(guardianData?.lastName);
      SetEmail(guardianData?.email);
      setAddress(guardianData?.address);
      setPhoneNumber(guardianData?.phoneNumber);
    }
  }, [pReadyOnly]);

  const editGuardian = async () => {
    setIsLoading(true);
    setEditError(false);
    setErrorMessage("");
    setIsSuccess(false);

    if (token) {
      try {
        const response = await fetch(
          `${BASE_URL}/Guardians/${viewGuardiansId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: viewGuardiansId,
              firstName,
              lastName,
              gender,
              email,
              address,
              phoneNumber,
            }),
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setIsSuccess(true);
          setAddGuardianChange()
        } else {
          setEditError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setEditError(true);
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      setEditError(true);
      setErrorMessage("Not authorized");
    }
  };

  return (
    <>
      {viewGuardiansModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal view-modal ${
          viewGuardiansModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editGuardian();
          }}
          className="card relative"
        >
          <span className="card-title flex items-center">
            Student information
            <span
              onClick={setViewGuardianModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          {guardianData && (
            <>
              <div
                style={{ overflow: "hidden" }}
                className="card-body modal-content grid gap-4"
              >
                <div className="tabs relative">
                  <span
                    style={{ left: indicatorPosition }}
                    className="tab-indicator absolute bottom-0"
                  ></span>
                  {tabs.map((tab, index) => (
                    <span
                      key={index}
                      onClick={() => setActiveTab(tab)}
                      className={`tab font-medium ${
                        activeTab == tab ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                {activeTab == "Personal Details" && (
                  <>
                    {isLoading ? (
                      <div className="absolute inset-0 self-center translate-[50%]">
                        {" "}
                        <Loader variant="primary" />
                      </div>
                    ) : isError ? (
                      <div className="error">Something went wrong</div>
                    ) : guardianData ? (
                      <>
                        <div className="flex flex-col gap-4 h-full overflow-y-auto">
                          <div className="section gap-2 relative">
                            <span
                              onClick={() => setPReadOnly(!pReadyOnly)}
                              className="edit-btn flex items-center justify-center absolute right-2 top-2"
                            >
                              Edit <Pen />
                            </span>
                            <span className="student-name font-medium">
                              Personal Details
                            </span>
                            <div className="grid grid-cols-2 gap-3 w-full">
                              <div className="flex flex-col">
                                <span className="font-medium opacity-65">
                                  First name
                                </span>
                                <input
                                  readOnly={pReadyOnly}
                                  value={firstName}
                                  className="number"
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="font-medium opacity-65">
                                  Last name
                                </span>
                                <input
                                  readOnly={pReadyOnly}
                                  value={lastName}
                                  className="number"
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="font-medium opacity-65">
                                  Email
                                </span>
                                <input
                                  readOnly={pReadyOnly}
                                  value={email}
                                  className="number"
                                  onChange={(e) => SetEmail(e.target.value)}
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="font-medium opacity-65">
                                  Phone
                                </span>
                                <input
                                  readOnly={pReadyOnly}
                                  value={phoneNumber}
                                  className="number"
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>

                              <div className="flex flex-col">
                                <span className="font-medium opacity-65">
                                  Address
                                </span>
                                <input
                                  readOnly={pReadyOnly}
                                  value={guardianData.address}
                                  className="number"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>Guardian not found</div>
                    )}
                  </>
                )}

                {activeTab == "Students" && (
                  <>
                    <div
                      style={{ position: "relative" }}
                      className="search input-group mr-auto"
                    >
                      <span className="absolute left-2 top-[0.7rem]">
                        <Search />
                      </span>
                      <input
                        readOnly={pReadyOnly}
                        style={{
                          paddingLeft: "1.5rem",
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search for student..."
                      />
                    </div>
                  </>
                )}

                <div className="cta-container flex gap-2 w-full items-center justify-end">
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
                        Guardian updated successfully.
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span onClick={setViewGuardianModalActive} className="cta-2">
                    Cancel
                  </span>
                  <button
                    disabled={pReadyOnly || isLoading}
                    className={`cta ${
                      pReadyOnly ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    {isLoading ? <Loader /> : "Save"}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default ViewGuardian;
