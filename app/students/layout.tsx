"use client";

import Check from "@/components/svg/Check";
import { useStudentModalStore } from "@/context/modals/students/addStudent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStudents } from "@/api/students";
import { getGuardians } from "@/api/guardians";
import { Guardian } from "@/types/GuardianTypes";
import { StudentTypes } from "@/types/StudentTypes";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [guardianCount, setGuardianCount] = useState(0);
  const { studentChange } = useStudentModalStore();
  const [guardians, setGuardians] = useState<Guardian[]>();
  const [students, setStudents] = useState<StudentTypes[]>([]);

  useEffect(() => {
    getStudents({
      setData: setStudents,
      setErrorMessage,
      setIsLoading,
      setIsError,
      pageSize: 5000000,
    });

    getGuardians({
      setData: setGuardians,
      setErrorMessage,
      setIsLoading,
      setIsError,
      pageSize: 5000000,
    });
  }, [studentChange]);

  useEffect(() => {
    if (students) {
      setStudentCount(students.length);
    }
  }, [students]);

  useEffect(() => {
    if (guardians) {
      setGuardianCount(guardians.length);
    }
  }, [guardians]);

  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden  gap-2 h-full py-3">
      <div className="page-tabs p-2 bg-[var(--background)] w-fit rounded-[var(--radius-s)]">
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
      <div className="w-full h-full relative gap-3 grid grid-rows-[auto_1fr_auto]">
        {children}
      </div>
    </div>
  );
}
