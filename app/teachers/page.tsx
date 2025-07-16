"use client";
import "@/css/staff.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import Teacher from "@/components/Teacher";
import AddTeacher from "@/components/modals/teachers/AddTeacher";
import {
  useTeacherModalStore,
  useImportTeachesrModalStore,
} from "@/context/modals/teachers/addTeacher";
import ImportTeachers from "@/components/modals/teachers/ImportTeachers";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TeacherTypes } from "@/types/StaffTypes";
import Loader from "@/components/ux/Loader";
import ViewTeacher from "@/components/modals/teachers/ViewTeacher";
import { getTeachers } from "../../api/teachers";

function Teachers() {
  const { setTeacherModalActive, addTeacherChange } = useTeacherModalStore();
  const { setImportTeachersModalActive } = useImportTeachesrModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teachersData, setTeachersData] = useState<TeacherTypes[]>([]);
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    getTeachers({
      setData: setTeachersData,
      setIsLoading,
      setIsError,
      setErrorMessage,
      search,
    });
  }, [addTeacherChange, search]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden  gap-2 h-full py-3">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setTeacherModalActive} className="cta">
            <Plus />
            New teacher
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
                  id={teacher.id}
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
        </div>

        <div className="pagination">
          <span className="page active">1</span>
        </div>
      </div>

      <AddTeacher />

      <ViewTeacher />
    </>
  );
}

export default Teachers;
