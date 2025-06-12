import Plus from "@/components/svg/Plus";
import Loader from "@/components/ux/Loader";
import { getGuardians } from "@/api/guardians";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { Guardian } from "@/types/GuardianTypes";
import { getCookie } from "cookies-next/client";
import Link from "next/link";
import { useEffect, useState } from "react";

function StudentGuardianView({ parentId }: { parentId: string }) {
  const [guardian, setGuardian] = useState<Guardian>();
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getGuardians({
      id: parentId,
      setData: setGuardian,
      setIsLoading: setIsLoading,
      setIsError: setIsError,
      setErrorMessage: setErrorMessage,
    });
  }, [parentId]);

  return (
    <span className="flex flex-col gap-0.5 truncate">
      {isLoading ? (
        <div className="h-[5rem] w-full flex items-center justify-center">
          <Loader variant="primary" />
        </div>
      ) : isError ? (
        <div className="error"> {errorMessage}</div>
      ) : guardian ? (
        <>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col">
              <span className="font-medium opacity-65">First name</span>
              <span className="number">{guardian.firstName}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium opacity-65">Last name</span>
              <span className="number">{guardian.lastName}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium opacity-65">Phone</span>
              <span className="number">{guardian.phoneNumber}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium opacity-65">Email</span>
              <span className="number">{guardian.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium opacity-65">Address</span>
              <span className="number">{guardian.address}</span>
            </div>
          </div>
        </>
      ) : (
        <Link
          style={{
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "1.5rem",
            height: "1.5rem",
          }}
          href="/students/guardians/"
          className="cta-2 mx-auto"
        >
          <Plus />
        </Link>
      )}
    </span>
  );
}

export default StudentGuardianView;
