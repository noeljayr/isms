"use client";

import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import useGuardianModalStore from "@/context/modals/addGuardian";
import AddGuardian from "@/components/modals/upload/guardians/AddGuardian";
import Eye from "@/components/svg/Eye";
import FileUpload from "@/components/svg/FileUpload";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import { Guardian } from "@/types/guardian-types";
import Loader from "@/components/ux/Loader";
import { TOKEN_COOKIE_NAME } from "@/middleware";

function Guardians() {
  const { setGuardianModalActive, addGuardianChange } = useGuardianModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = getCookie(TOKEN_COOKIE_NAME);
  const [guardianData, setGuardianData] = useState<Guardian[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const getGuardians = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/Guardians?searchQuery=${search}`,
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
          setGuardianData(data.data);
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
  }, [addGuardianChange]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setGuardianModalActive} className="cta">
            <Plus />
            New Guardian
          </button>
          <button onClick={() => {}} className="cta-2">
            <FileUpload />
            Import guardians
          </button>
          <div className="search input-group mr-auto">
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for guardians..."
            />
          </div>
        </div>

        <div className="table guardians-table">
          <div className="table-header">
            <div className="th">Name</div>
            <div className="th">Email</div>
            <div className="th">Phone</div>
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
            ) : guardianData.length > 0 ? (
              guardianData.map((guardian, index) => (
                <div key={index} className="tr">
                  <span className="td font-medium">
                    {guardian.firstName} {guardian.lastName}
                  </span>
                  <span className="td truncate">{guardian.email}</span>

                  <span>{guardian.phoneNumber}</span>
                  <span className="action">
                    <span className="action-1">
                      <Eye />
                    </span>
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{ fontSize: "var(--p3)" }}
                className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
              >
                No guardians found
              </div>
            )}
          </div>
          <div className="pagination">
            <span className="page active">1</span>
          </div>
        </div>
      </div>

      <AddGuardian />
    </>
  );
}

export default Guardians;
