import Plus from "@/components/svg/Plus";
import Loader from "@/components/ux/Loader";
import { BASE_URL } from "@/constants/BASE_URL";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { Guardian } from "@/types/guardian-types";
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
    if (parentId) {
      getGuardian();
    }
  }, [parentId]);

  return (
    <span className="td flex flex-col gap-0.5 truncate">
      {isLoading ? (
        <Loader variant="primary" />
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
              <span className="number">{guardian.phone}</span>
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
        <span
          style={{
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "1.5rem",
            height: "1.5rem",
          }}
          className="cta-2 mx-auto"
        >
          <Plus />
        </span>
      )}
    </span>
  );
}

export default StudentGuardianView;
