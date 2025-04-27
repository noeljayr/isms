"use client";
import "@/css/classes.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import { useEffect, useState } from "react";
import { classData } from "@/data/classes";
import useClassModalStore from "@/context/modals/addClass";
import AddClass from "@/components/modals/upload/AddClass";
import ViewClass from "@/components/modals/view/ViewClass";
import Class from "@/components/Class";
const years = ["2025", "2024", "2023"];

function Classes() {
  const { setClassModalActive } = useClassModalStore();
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  return (
    <>
      <div className="w-full card table-card">
        <span className="card-title">Classes</span>
        <div className="card-body flex flex-col gap-2">
          <div className="flex gap-3 items-center w-full">
            <button onClick={setClassModalActive} className="cta">
              <Plus />
              New class
            </button>
            <div className="search input-group mr-auto">
              <Search />
              <input type="text" placeholder="Search for a class..." />
            </div>

            <div className={`years flex items-center relative`}>
              <span
                style={{
                  left: position + "rem",
                }}
                className="active-year-indicator z-0 absolute"
              ></span>
              {years.map((year) => (
                <div
                  key={year}
                  className={`year font-bold flex items-center justify-center relative z-[1] number cursor-pointer ${
                    activeYear === year
                      ? "active-year opacity-85"
                      : "opacity-50"
                  }`}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>

          <div className="table classes-table">
            <div className="table-header">
              {/* <div className="th">#</div> */}
              <div className="th">Class</div>
              <div className="th">Students</div>
              <div className="th">Teachers</div>
              <div className="th">Attendance rate</div>
              <div className=""></div>
            </div>
            <div className="table-body hide-scrollbar">
              {classData.map((classD, index) => (
                <Class
                  name={classD.name}
                  attandanceRate={classD.attandanceRate}
                  subClasses={classD.subClasses}
                  totalStudent={classD.totalStudent}
                  totalTeachers={classD.totalTeachers}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddClass />
    </>
  );
}

export default Classes;
