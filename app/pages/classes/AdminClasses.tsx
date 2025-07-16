"use client";
import "@/css/classes.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import { useEffect, useState } from "react";
import useClassModalStore from "@/context/modals/classes/addClass";
import AddClass from "@/components/modals/classes/AddClass";
import ViewClass from "@/components/modals/teachers/ViewClass";
import Class from "@/components/Class";
import Loader from "@/components/ux/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { getClasses } from "@/api/classes";

type ClassType = {
  id: string;
  name: string;
};

const years = ["2025", "2024", "2023"];

function AdminClasses() {
  const { setClassModalActive, addClassesChange } = useClassModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  const [classData, setClassData] = useState<ClassType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentCount, setStudentCount] = useState(0);
  const [teacher, setTeacherCount] = useState(0);
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    console.log("search term is: " + search);
    router.push(`?page=1&search=${e.target.value}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}&search=${search}`);
  };

  useEffect(() => {
    const index = years.indexOf(activeYear);
    setPosition(`${index * 2.75}`);
  }, [activeYear]);

  useEffect(() => {
    getClasses({
      setData: setClassData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      search,
      page,
    });
  }, [addClassesChange, search, page]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden  gap-2 h-full py-3">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setClassModalActive} className="cta">
            <Plus />
            New class
          </button>
          <div className="search input-group mr-auto">
            <Search />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for a class..."
            />
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
                  activeYear === year ? "active-year opacity-85" : "opacity-50"
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
            <div className="th">Subclasses</div>
            <div className="th">Subjects</div>
            <div className=""></div>
          </div>
          <div className="table-body hide-scrollbar">
            {isLoading ? (
              <div className="h-[5rem] w-[5rem] flex m-auto items-center justify-center">
                <Loader variant="primary" />
              </div>
            ) : isError ? (
              <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
                <span className="error">{errorMessage}</span>
              </div>
            ) : (
              classData.map((classD, index) => {
                return (
                  <Class
                    id={classD.id}
                    name={classD.name}
                    key={index}
                    index={index + 1}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="pagination mt-auto">
          <span className="page active">{page}</span>
        </div>
      </div>

      <AddClass />
      <ViewClass />
    </>
  );
}

export default AdminClasses;
