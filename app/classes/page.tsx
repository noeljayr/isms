"use client";
import "@/css/classes.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import { useEffect, useState } from "react";
import useClassModalStore from "@/context/modals/addClass";
import AddClass from "@/components/modals/upload/AddClass";
import ViewClass from "@/components/modals/view/ViewClass";
import Class from "@/components/Class";
import { BASE_URL } from "@/constants/BASE_URL";
import { getCookie } from "cookies-next/client";
import Loader from "@/components/ux/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { TOKEN_COOKIE_NAME } from "@/middleware";

type ClassType = {
  id: string;
  name: string;
};

const years = ["2025", "2024", "2023"];

function Classes() {
  const { setClassModalActive, addClassesChange } = useClassModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeYear, setActiveYear] = useState("2025");
  const [position, setPosition] = useState("0");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [classData, setClassData] = useState<ClassType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
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
    const getClasses = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/classes?searchQuery=${search}`,
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
          setClassData(data.data);
          setPage(data.page);
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
    };
    getClasses();
  }, [addClassesChange, search]);

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
              {isLoading ? (
                <div className="h-[5rem] w-[5rem] flex m-auto items-center justify-center">
                  <Loader variant="primary" />
                </div>
              ) : isError ? (
                <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
                  <span className="error">{errorMessage}</span>
                </div>
              ) : (
                classData.map((classD, index) => (
                  <Class
                    id={classD.id}
                    name={classD.name}
                    attandanceRate={0}
                    totalStudent={0}
                    totalTeachers={0}
                    key={index}
                  />
                ))
              )}
            </div>

            <div className="pagination pt-4">
              <span className="page active">{page}</span>
            </div>
          </div>
        </div>
      </div>

      <AddClass />
    </>
  );
}

export default Classes;
