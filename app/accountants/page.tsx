"use client";
import "@/css/staff.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import Accountant from "@/components/Accountant";
import { BASE_URL } from "@/constants/BASE_URL";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { StaffTypes } from "@/types/StaffTypes";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { useAccountantModalStore } from "@/context/modals/addAccountant";
import AddAccountant from "@/components/modals/accountants/AddAccountant";

function Accountants() {
  const { setAddAccountantModalActive } = useAccountantModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = getCookie(TOKEN_COOKIE_NAME);
  const [accountants, setAccountants] = useState<StaffTypes[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const getAccountants = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${BASE_URL}/Accountants?searchQuery=${search}`,
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
          setAccountants(data.data);
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
    getAccountants();
  }, []);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden  gap-2 h-full py-3">
        <div className="flex gap-3 items-center w-full">
          <button onClick={setAddAccountantModalActive} className="cta">
            <Plus />
            Accountant
          </button>

          <div className="search input-group mr-auto">
            <Search />
            <input type="text" placeholder="Search for an accountant..." />
          </div>
        </div>

        <div className="table teachers-table h-full">
          <div className="table-header">
            <div className="th">#</div>
            <div className="th">Name</div>
            <div className="th">Phone</div>
            <div className="th">Email</div>
            <div className="th">Status</div>
          </div>
          <div className="table-body hide-scrollbar">
            {accountants.map((accountant, index) => (
              <Accountant
                id={index.toString()}
                key={index}
                lastName={accountant.lastName}
                firstName={accountant.firstName}
                address={accountant.address}
                dateOfBirth={accountant.dateOfBirth}
                email={accountant.email}
                phoneNumber={accountant.phoneNumber}
                gender={accountant.gender}
                status={accountant.status}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        <div className="pagination mt-auto">
          <span className="page active">1</span>
          {/* <span className="page">2</span> */}
        </div>
      </div>

      <AddAccountant />
    </>
  );
}

export default Accountants;
