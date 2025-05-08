"use client";
import "@/css/staff.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import Teacher from "@/components/Teacher";
import AddTeacher from "@/components/modals/upload/teachers/AddTeacher";
import {
  useTeacherModalStore,
  useImportTeachesrModalStore,
} from "@/context/modals/addTeacher";
import FileUpload from "@/components/svg/FileUpload";
import ImportTeachers from "@/components/modals/upload/teachers/ImportTeachers";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/BASE_URL";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { TeacherTypes } from "@/types/staff";
import Loader from "@/components/ux/Loader";
import { TOKEN_COOKIE_NAME } from "@/middleware";

function Teachers() {
  const { setTeacherModalActive, addTeacherChange } = useTeacherModalStore();
  const { setImportTeachersModalActive } = useImportTeachesrModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = getCookie(TOKEN_COOKIE_NAME);
  const [teachersData, setTeachersData] = useState<TeacherTypes[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const getTeachers = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/teachers?searchQuery=${search}`,
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
          setTeachersData(data.data);
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
    getTeachers();
  }, [addTeacherChange]);

  return (
    <>
      <div className="card table-card">
        <span className="card-title">Teachers</span>
        <div className="card-body flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex gap-3 items-center w-full">
            <button onClick={setTeacherModalActive} className="cta">
              <Plus />
              New teacher
            </button>
            <button onClick={setImportTeachersModalActive} className="cta-2">
              <FileUpload />
              Import teachers
            </button>
            <div className="search input-group mr-auto">
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for a teacher..."
              />
            </div>
          </div>

          <div className="table teachers-table">
            <div className="table-header">
              <div className="th">#</div>
              <div className="th">Name</div>
              <div className="th">Phone</div>
              <div className="th">Email</div>
              <div className="th">Status</div>
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
              ) : teachersData.length > 0 ? (
                teachersData.map((teacher, index) => (
                  <Teacher
                    id={index.toString()}
                    key={index}
                    lastName={teacher.lastName}
                    firstName={teacher.firstName}
                    address={teacher.address}
                    dateOfBirth={teacher.dateOfBirth}
                    email={teacher.email}
                    phoneNumber={teacher.phoneNumber}
                    gender={teacher.gender}
                    status={teacher.status}
                    qualifications={teacher.qualifications}
                    index={index + 1}
                    employmentDate={teacher.employmentDate}
                  />
                ))
              ) : (
                <div
                  style={{ fontSize: "var(--p3)" }}
                  className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
                >
                  No teachers found
                </div>
              )}
            </div>
            <div className="pagination">
              <span className="page active">1</span>
            </div>
          </div>
        </div>
      </div>

      <AddTeacher />
      <ImportTeachers />
    </>
  );
}

export default Teachers;
