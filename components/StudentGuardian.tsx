import { BASE_URL } from "@/constants/BASE_URL";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { Guardian } from "@/types/guardian-types";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import Loader from "./ux/Loader";
import Plus from "./svg/Plus";

function StudentGuardian({parentId}: {parentId: string}) {
  const [guardian, setGuardian] = useState<Guardian>();
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getGuardian = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/Guadians/${parentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setGuardian(data.data);
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
    getGuardian();
  }, [parentId]);

  return (
    <span className="td flex flex-col gap-0.5 truncate">
      {isLoading ? (
        <Loader variant="primary" />
      ) : isError ? (
        <div className="error"> something went wrong: {errorMessage}</div>
      ) : guardian ? (
        <>
          <>
            <span className="truncate">
              {guardian.firstName + " " + guardian?.lastName}
            </span>
            <span className="flex gap-1.5 items-center opacity-65">
              <span className="guardian-email">{guardian.email}</span>
              <span className="opacity-50">•</span>
              <span className="guardian-phone">{guardian.phone}</span>
            </span>
          </>
        </>
      ) : (
        <button
          style={{
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "1.5rem",
            height: "1.5rem",
          }}
          className="cta-2"
        >
          <Plus />
        </button>
      )}
    </span>
  );
}

export default StudentGuardian;
