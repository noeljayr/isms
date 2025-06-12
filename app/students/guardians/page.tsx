"use client";

import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import useGuardianModalStore from "@/context/modals/guardians/addGuardian";
import AddGuardian from "@/components/modals/guardians/AddGuardian";
import Eye from "@/components/svg/Eye";
import FileUpload from "@/components/svg/FileDownload";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Guardian } from "@/types/GuardianTypes";
import Loader from "@/components/ux/Loader";
import useViewGuardiansModalStore from "@/context/modals/guardians/viewGuardians";
import ViewGuardian from "@/components/modals/guardians/ViewGuardian";
import { getGuardians } from "@/api/guardians";

function Guardians() {
  const { setGuardianModalActive, addGuardianChange } = useGuardianModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setViewGuardianModalActive, setViewGuardiansId } =
    useViewGuardiansModalStore();
  const [guardianData, setGuardianData] = useState<Guardian[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    getGuardians({
      setData: setGuardianData,
      setErrorMessage,
      setIsLoading,
      setIsError,
      search,
    });
  }, [addGuardianChange]);

  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <button onClick={setGuardianModalActive} className="cta">
          <Plus />
          New Guardian
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
          <div className="th">#</div>
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
            guardianData.map((guardian, index) => {
              let number = index + 1;
              return (
                <div
                  onClick={() => {
                    setViewGuardiansId(guardian.id);
                    setViewGuardianModalActive();
                  }}
                  key={guardian.id}
                  className="tr"
                >
                  <span className="td font-medium">{number}</span>
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
              );
            })
          ) : (
            <div className="h-full w-full flex-col absolute top-0 left-0   flex m-auto items-center justify-center">
              <span className="font-p-2 mb-2 font-semibold opacity-85">
                No guardians found
              </span>
              <button
                onClick={setGuardianModalActive}
                className="cta-2 font-p-2"
              >
                <Plus /> Add students
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pagination">
        <span className="page active">1</span>
      </div>

      <AddGuardian />
      <ViewGuardian />
    </>
  );
}

export default Guardians;
