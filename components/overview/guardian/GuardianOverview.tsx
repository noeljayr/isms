"use client";

import { getGuardians } from "@/api/guardians";
import { getStudents } from "@/api/students";
import User from "@/components/svg/User";
import { Guardian } from "@/types/GuardianTypes";
import { StudentTypes } from "@/types/StudentTypes";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/context/token";

function GuardianOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<Guardian>();
  const { UserId } = useTokenStore();

  useEffect(() => {
    getGuardians({
      setIsLoading,
      setIsError,
      setErrorMessage,
      setData,
      id: UserId,
    });
  }, [UserId]);

  return (
    <div className="flex w-full bg-[var(--background)] gap-4 items-center p-2 rounded-[var(--radius)]">
      <span className="profile h-[4rem] items-center justify-center w-[4rem] flex bg-white rounded-full">
        <span className="flex h-8 w-8 opacity-55">
          <User />
        </span>
      </span>

      {isLoading ? (
        <></>
      ) : isError ? (
        <></>
      ) : data ? (
        <>
          <div className="flex gap-1 flex-col">
            <h1 className="font-p-1">
              {data.firstName} {data.lastName}
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-p-3 opacity-80 font-medium">
                {data.email}
              </span>
              <span className="font-black opacity-20">•</span>
              <span className="font-p-3 opacity-80 font-medium">
                {data.phoneNumber}
              </span>
              <span className="font-black opacity-20">•</span>
              <span
                className={`${
                  data.status ? data.status.toLowerCase() : "deactivated"
                }-student-status student-status font-p-3 font-medium capitalize`}
              >
                {data.status}
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GuardianOverview;
