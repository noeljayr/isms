import { Guardian } from "@/types/GuardianTypes";
import { useEffect, useState } from "react";
import Loader from "../../ux/Loader";
import Plus from "../../svg/Plus";
import { getGuardians } from "@/api/guardians";
import Link from "next/link";

function StudentGuardian({ parentId }: { parentId: string }) {
  const [guardian, setGuardian] = useState<Guardian>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!parentId || parentId.length === 0) {
      return;
    }

    getGuardians({
      id: parentId,
      setData: setGuardian,
      setIsLoading: setIsLoading,
      setIsError: setIsError,
      setErrorMessage: setErrorMessage,
    });
  }, [parentId]);

  return (
    <span className="td flex flex-col gap-0.5 truncate">
      {isLoading ? (
        <Loader variant="primary" />
      ) : isError ? (
        <div className="error font-p-3"> something went wrong</div>
      ) : guardian ? (
        <>
          <>
            <span className="truncate">
              {guardian.firstName + " " + guardian.lastName}
            </span>
            <span className="flex gap-1.5 items-center opacity-65">
              <span className="guardian-email">{guardian.email}</span>
              <span className="opacity-50">•</span>
              <span className="guardian-phone">{guardian.phoneNumber}</span>
            </span>
          </>
        </>
      ) : (
        <Link href="/students/guardians/" className="cta-2 mx-auto">
          <span className="opacity-50">
            <span className="plus">+</span> Add guardian
          </span>
        </Link>
      )}
    </span>
  );
}

export default StudentGuardian;
