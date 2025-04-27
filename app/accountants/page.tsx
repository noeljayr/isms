"use client";
import "@/css/staff.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import Accountant from "@/components/Accountant";
import accountants from "@/data/accountants";
import AddTeacher from "@/components/modals/upload/teachers/AddTeacher";
import { useTeacherModalStore } from "@/context/modals/addTeacher";
import FileUpload from "@/components/svg/FileUpload";
useTeacherModalStore;

function Accountants() {
  const { setTeacherModalActive } = useTeacherModalStore();

  return (
    <>
      <div className="card table-card">
        <span className="card-title">Accountants</span>
        <div className="card-body flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex gap-3 items-center w-full">
            <button onClick={setTeacherModalActive} className="cta">
              <Plus />
              Accountant
            </button>

            <button onClick={() => {}} className="cta-2">
              <FileUpload />
              Import accountants
            </button>

            <div className="search input-group mr-auto">
              <Search />
              <input type="text" placeholder="Search for a teacher..." />
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
            <div className="pagination mt-auto">
              <span className="page active">1</span>
              {/* <span className="page">2</span> */}
            </div>
          </div>
        </div>
      </div>

      <AddTeacher />
    </>
  );
}

export default Accountants;
