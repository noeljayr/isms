"use client";

import React, { useEffect, useState } from "react";
import XClose from "@/components/svg/XClose";
import { deleteCookie, getCookie } from "cookies-next/client";
import useSettingsModalStore from "@/context/modals/settings";
import Logout from "@/components/svg/Logout";
import { useRouter } from "next/navigation";
import SchoolSettings from "./SchoolSettings";
import { AnimatePresence } from "motion/react";
import { token } from "@/app/auth/token";
import Tabs from "@/components/ui/Tabs";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import Pen from "@/components/svg/Edit";

const tabs = ["Personal Information", "School Settings"];

function SettingsModal() {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [pReadyOnly, setPReadOnly] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("••••••");
  const [passwordReadyOnly, setPasswordReadOnly] = useState(true);

  const logout = () => {
    deleteCookie(TOKEN_COOKIE_NAME);
    router.push("/auth");
  };

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { setSettingsModalActive, settingsModalActive } =
    useSettingsModalStore();

  useEffect(() => {
    if (token) {
      setUserRole(token.role.toLowerCase());
    }
  }, [token, userRole]);

  return (
    <>
      {settingsModalActive && (
        <div
          onClick={setSettingsModalActive}
          className="modal-overlay fixed h-screen w-screen left-0 top-0"
        ></div>
      )}
      <div
        className={`modal view-modal ${
          settingsModalActive ? "modal-active view-modal-active" : ""
        } fixed h-screen w-screen left-0 top-0 flex items-start p-1.5 justify-end`}
      >
        <form className="card relative">
          <span className="card-title flex items-center">
            Settings
            <span
              onClick={setSettingsModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div
            style={{ overflow: "hidden" }}
            className="card-body modal-content grid gap-2"
          >
            <div className="section relative gap-1">
              <span className="user-name font-medium">User name</span>
              <div className="user-overview w-full justify-between flex gap-2 items-center">
                <span className="flex opacity-75">user@gmail.com</span>
                <span className="font-bold opacity-25">•</span>

                <span className="flex opacity-75">0888888888</span>

                <span className="font-bold opacity-25">•</span>
                <span onClick={logout} className="logout cta-2">
                  Logout <Logout />
                </span>
              </div>
            </div>

            {userRole === "admin" ? (
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ) : (
              <></>
            )}

            {activeTab == "Personal Information" && (
              <div className="flex w-full h-full flex-col overflow-y-auto gap-2">
                <div className="section h-fit gap-2 relative">
                  <span
                    onClick={() => setPReadOnly(!pReadyOnly)}
                    className={`edit-btn absolute z-10 bg-white right-2 flex items-center cursor-pointer ${
                      pReadyOnly ? "" : "active-edit"
                    }`}
                  >
                    Edit <Pen />
                  </span>

                  <span className="student-name font-medium">
                    Personal Details
                  </span>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">First name</span>
                      <input
                        readOnly={pReadyOnly}
                        value={firstName}
                        className="number"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Last name</span>
                      <input
                        readOnly={pReadyOnly}
                        value={lastName}
                        className="number"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Gender</span>
                      <input
                        readOnly={pReadyOnly}
                        value={gender}
                        className="number"
                        type="text"
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">
                        Date of birth
                      </span>
                      <input
                        readOnly={pReadyOnly}
                        // value={formatDate(dateOfBirth)}
                        className="number"
                        type={pReadyOnly ? "text" : "date"}
                        // onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Email</span>
                      <input
                        readOnly={pReadyOnly}
                        value={email}
                        className="number"
                        type="text"
                        onChange={(e) => SetEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Phone</span>

                      <input
                        readOnly={pReadyOnly}
                        value={phoneNumber}
                        className="number"
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium opacity-65">Address</span>

                      <input
                        readOnly={pReadyOnly}
                        value={address}
                        className="number"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="section h-fit">
                  <div className="flex flex-col">
                    <span
                      onClick={() => setPasswordReadOnly(!pReadyOnly)}
                      className={`edit-btn absolute z-10 bg-white right-2 flex items-center cursor-pointer ${
                        pReadyOnly ? "" : "active-edit"
                      }`}
                    >
                      Edit <Pen />
                    </span>
                    <span className="font-medium opacity-65">Password</span>
                    <input
                      readOnly={passwordReadyOnly}
                      value={password}
                      className="number tracking-widest font-extrabold font-p-1"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                   
                    <span className="font-medium opacity-65">Two Factor Aunthentication</span>
                    <input
                      readOnly={passwordReadyOnly}
                      value={"Disabled"}
                      className="number"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === "School Settings" && (
                <SchoolSettings key="settings" />
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </>
  );
}

export default SettingsModal;
