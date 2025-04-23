"use client";

import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import { guardians } from "@/data/guardians";
import "@/css/students.css";
import useGuardianModalStore from "@/context/modals/addGuardian";
import AddGuardian from "@/components/modals/AddGuardian";

function Guardians() {
  const { setGuardianModalActive } = useGuardianModalStore();
  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setGuardianModalActive} className="cta">
            <Plus />
            New Guardian
          </button>
          <div className="search input-group mr-auto">
            <Search />
            <input type="text" placeholder="Search for guardians..." />
          </div>
        </div>

        <div className="table guardians-table">
          <div className="table-header">
            <div className="th">Name</div>
            <div className="th">Email</div>
            <div className="th">Phone</div>
          </div>
          <div className="table-body hide-scrollbar">
            {guardians.map((guardian) => (
              <div key={guardian.id} className="tr">
                <span className="td font-medium">{guardian.name}</span>
                <span className="td truncate">{guardian.email}</span>

                <span>{guardian.phone}</span>
              </div>
            ))}
          </div>
          <div className="pagination">
            <span className="page active">1</span>
            <span className="page">2</span>
          </div>
        </div>
      </div>

      <AddGuardian />
    </>
  );
}

export default Guardians;
