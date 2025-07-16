"use client";

import React, { useEffect, useState } from "react";
import XClose from "../../svg/XClose";
import Pen from "@/components/svg/Edit";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import Loader from "@/components/ux/Loader";
import useViewGuardiansModalStore from "@/context/modals/guardians/viewGuardians";
import { Guardian } from "@/types/GuardianTypes";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import useGuardianModalStore from "@/context/modals/guardians/addGuardian";
import GuardianStudents from "@/components/guardians/GuardianStudents";
import Trash from "@/components/svg/Trash";
import { getGuardians, updateGuardian } from "@/api/guardians";
import Tabs from "@/components/ui/Tabs";
import Status from "@/components/ui/Status";

const tabs = ["Personal Details", "Students"];
const statuses = ["Active", "Deactivated"];

function ViewGuardian() {
  const {
    setViewGuardianModalActive,
    viewGuardiansId,
    viewGuardiansModalActive,
  } = useViewGuardiansModalStore();
  const { setAddGuardianChange, addGuardianChange } = useGuardianModalStore();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [guardianData, setguardianData] = useState<Guardian>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditError, setEditError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");

  useEffect(() => {
    if (!pReadyOnly) {
      setActiveTab("Personal Details");
    }
  }, [pReadyOnly]);

  useEffect(() => {
    if (viewGuardiansId) {
      getGuardians({
        setData: setguardianData,
        setErrorMessage,
        setIsLoading,
        setIsError,
        id: viewGuardiansId,
      });
    }
  }, [viewGuardiansId, addGuardianChange]);

  useEffect(() => {
    if (guardianData) {
      setFirstName(guardianData.firstName);
      setLastName(guardianData.lastName);
      SetEmail(guardianData.email);
      setAddress(guardianData.address);
      setPhoneNumber(guardianData.phoneNumber);
      setActiveStatus(guardianData.status);
    }
  }, [guardianData]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (viewGuardiansId) {
      updateGuardian({
        id: viewGuardiansId,
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        address,
        status: activeStatus,
        setErrorMessage,
        setIsLoading,
        setSuccess: setIsSuccess,
        setIsError: setEditError,
        setGuardianChange: setAddGuardianChange,
      });
    }
  };

  return (
    <>
      {viewGuardiansModalActive && (
        <div
          onClick={setViewGuardianModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        className={`modal view-modal ${
          viewGuardiansModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form onSubmit={submit} className="card relative">
          <span className="card-title flex items-center">
            Guardian information
            <span
              onClick={setViewGuardianModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div
            style={{
              overflow: "hidden",
              gridTemplateRows:
                activeTab == "Students" ? "auto 1fr" : "auto auto 1fr auto",
            }}
            className="card-body modal-content grid gap-2"
          >
            {isLoading && (
              <div className="absolute h-full w-full inset-0 self-center translate-[50%]">
                {" "}
                <Loader variant="primary" />
              </div>
            )}
            {guardianData && (
              <>
                <motion.div>
                  <div className="section gap-1">
                    <span className="user-name font-medium">
                      {guardianData.firstName + " " + guardianData.lastName}
                    </span>
                    <div className="user-overview w-full justify-between flex gap-2 items-center">
                      <span className="flex opacity-75">
                        {guardianData.email}
                      </span>
                      <span className="font-bold opacity-25">•</span>

                      <span className="flex opacity-75">
                        {guardianData.phoneNumber}
                      </span>

                      <span className="font-bold opacity-25">•</span>

                      <Status
                        activeStatus={activeStatus}
                        pReadyOnly={pReadyOnly}
                        setActiveStatus={setActiveStatus}
                        statuses={statuses}
                      />
                    </div>

                    <div className="view-actions">
                      <span
                        onClick={() => setPReadOnly(!pReadyOnly)}
                        className={`edit-action cursor-pointer ${
                          pReadyOnly ? "" : "active-action"
                        }`}
                      >
                        <Pen />
                      </span>
                      <span className="delete-action">
                        <Trash />
                      </span>
                    </div>
                  </div>

                  <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </motion.div>

                <AnimatePresence>
                  {activeTab == "Personal Details" && (
                    <>
                      {isError ? (
                        <div className="error">Something went wrong</div>
                      ) : guardianData ? (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          key="details"
                          layout="position"
                          transition={motionTransition}
                          className="flex flex-col gap-4 h-full overflow-y-auto"
                        >
                          <div className="section gap-2 relative">
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
                        </motion.div>
                      ) : (
                        <div>Guardian not found</div>
                      )}
                    </>
                  )}

                  {activeTab == "Students" && pReadyOnly && (
                    <GuardianStudents
                      guardianName={`${guardianData.firstName} ${guardianData.lastName}`}
                    />
                  )}
                </AnimatePresence>

                {activeTab == "Personal Details" ? (
                  <div className="cta-container flex gap-2 w-full items-center justify-end">
                    <AnimatePresence>
                      {isEditError && (
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
                          Updated.
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <span
                      onClick={setViewGuardianModalActive}
                      className="cta-2"
                    >
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
                ) : null}
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default ViewGuardian;
