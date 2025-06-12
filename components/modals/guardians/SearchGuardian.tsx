"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import useSearchGuardianModalStore from "@/context/modals/guardians/searchGuardian";
import Search from "@/components/svg/Search";

function SearchGuardian() {
  const { searchGuardianModalActive, setSeachsearchGuardianModalActive } =
    useSearchGuardianModalStore();
  const [search, setSearch] = useState("")


  return (
    <>
      {searchGuardianModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal import-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          searchGuardianModalActive ? "modal-active" : ""
        }`}
      >
        <form className="card">
          <span className="card-title flex items-center">
            Search for guardian
            <span
              onClick={setSeachsearchGuardianModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
          <div style={{position: "relative", justifyContent: "center"}} className="search items-center input-group mr-auto relative">
            <span className="left-2 absolute"> 
            <Search />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for a guardian..."
              style={{paddingLeft: "1.8rem"}}
            />
          </div>

          <div className="overflow-hidden overflow-y-auto h-[10rem]"></div>
            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setSeachsearchGuardianModalActive} className="cta-2">
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

export default SearchGuardian;
