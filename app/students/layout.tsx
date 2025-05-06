"use client";

import Check from "@/components/svg/Check";
import { BASE_URL } from "@/constants/BASE_URL";
import { useStudentModalStore } from "@/context/modals/addStudent";
import { getCookie } from "cookies-next/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [guardianCount, setGuardianCount] = useState(0);
  const token = getCookie("token");
  const { studentChange } = useStudentModalStore();

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/students`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setStudentCount(data.totalCount);
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
  }, [studentChange]);


  useEffect(() => {
    const getGuardians = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/Guardians`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setGuardianCount(data.totalCount);
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
    getGuardians();
  }, [studentChange]);


  return (
    <div className="card table-card w-full mb-3 h-full">
      <div className="card-title">
        <div className="checkboxes flex items-center gap-3">
          <Link
            href="/students"
            className={`checkbox-container ${
              pathname === "/students" ? "checked" : ""
            }`}
          >
            <span className="checkbox">
              <Check />
            </span>
            <span className="checkbox-label">Students</span>
            <span className="counter number">{studentCount}</span>
          </Link>

          <span className="opacity-10">|</span>
          <Link
            href="/students/guardians/"
            className={`checkbox-container ${
              pathname === "/students/guardians" ? "checked" : ""
            }`}
          >
            <span className="checkbox">
              <Check />
            </span>
            <span className="checkbox-label">Guardians</span>
            <span className="counter number">{guardianCount}</span>
          </Link>
        </div>
      </div>
      <div className="card-body w-full h-full">{children}</div>
    </div>
  );
}
