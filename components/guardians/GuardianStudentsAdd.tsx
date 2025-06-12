"use client";

import { useEffect, useState } from "react";
import Search from "@/components/svg/Search";
import Plus from "../svg/Plus";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { BASE_URL } from "@/constants/BASE_URL";
import { StudentsTypes } from "@/types/StudentTypes";
import useViewGuardiansModalStore from "@/context/modals/guardians/viewGuardians";
import { getCookie } from "cookies-next";
import Loader from "../ux/Loader";

function GuardianStudents({ guardianName }: { guardianName: string }) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [studentsData, setStudentsData] = useState<StudentsTypes>([]);
  const { viewGuardiansId } = useViewGuardiansModalStore();
  const token = getCookie(TOKEN_COOKIE_NAME);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/students/?parentId=${viewGuardiansId}`,
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
          setStudentsData(data.data);
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
    getStudents();
  }, [viewGuardiansId]);

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <button
          type="button"
          style={{ height: "2.15rem", width: "2.15rem", padding: 0 }}
          className="cta-2"
        >
          <Plus />
        </button>

        <div
          style={{ position: "relative" }}
          className="search input-group mr-auto"
        >
          <span className="absolute left-2 top-[0.7rem]">
            <Search />
          </span>
          <input
            style={{
              paddingLeft: "1.5rem",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for student..."
          />
        </div>
      </div>

      <div className="w-full g-full grid overflow-y-auto h-full grid-cols-1 grid-rows-1">
        <div
          style={{ display: "grid" }}
          className="grid auto-rows-min gap-1 section mt-3"
        >
          <span className="opacity-45 font-semibold">
            {guardianName} is a guardian of:{" "}
          </span>
          <div className="student-guardian-view">
            {isLoading ? (
              <div className="h-[5rem] w-[5rem] flex m-auto items-center justify-center">
                <Loader variant="primary" />
              </div>
            ) : isError ? (
              <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
                <span className="error">{errorMessage}</span>
              </div>
            ) : studentsData.length > 0 ? (
              studentsData.map((student, index) => (
                <div
                  key={index}
                  className="student-guardian-view flex flex-col py-2"
                >
                  <span className="font-medium number">
                    {student.firstName} {student.lastName}
                  </span>

                  <span className="flex gap-2 items-center">
                    <span className="font-p-3 opacity-65"> Class </span>
                    <span className="font-black opacity-50">•</span>
                    <span className="font-p-3 opacity-65">{student.email}</span>
                    <span className="font-black opacity-50">•</span>
                    <span className="font-p-3 opacity-65">
                      {student.status}
                    </span>
                  </span>

                  <span className="flex items-center gap-2"></span>
                </div>
              ))
            ) : (
              <div
                style={{ fontSize: "var(--p3)" }}
                className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
              >
                No students found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuardianStudents;
