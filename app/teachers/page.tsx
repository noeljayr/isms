"use client";
import "@/css/staff.css";
import Plus from "@/components/svg/Plus";
import Search from "@/components/svg/Search";
import "@/css/students.css";
import Teacher from "@/components/Teacher";
import { teachersData } from "@/data/teachers";
import AddTeacher from "@/components/modals/upload/teachers/AddTeacher";
import {
  useTeacherModalStore,
  useImportTeachesrModalStore,
} from "@/context/modals/addTeacher";
import FileUpload from "@/components/svg/FileUpload";
import ImportTeachers from "@/components/modals/upload/teachers/ImportTeachers";

function Teachers() {
  const { setTeacherModalActive } = useTeacherModalStore();
  const { setImportTeachersModalActive } = useImportTeachesrModalStore();

  return (
    <>
      <div className="card table-card">
        <span className="card-title">Teachers</span>
        <div className="card-body flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex gap-3 items-center w-full">
            <button onClick={setTeacherModalActive} className="cta">
              <Plus />
              New teacher
            </button>
            <button onClick={setImportTeachersModalActive} className="cta-2">
              <FileUpload />
              Import teachers
            </button>
            <div className="search input-group mr-auto">
              <Search />
              <input type="text" placeholder="Search for a teacher..." />
            </div>
          </div>

          <div className="table teachers-table">
            <div className="table-header">
              <div className="th">#</div>
              <div className="th">Name</div>
              <div className="th">Phone</div>
              <div className="th">Email</div>
              <div className="th">Status</div>
            </div>
            <div className="table-body hide-scrollbar">
              {teachersData.map((teacher, index) => (
                <Teacher
                  id={index.toString()}
                  key={index}
                  lastName={teacher.lastName}
                  firstName={teacher.firstName}
                  address={teacher.address}
                  dateOfBirth={teacher.dateOfBirth}
                  email={teacher.email}
                  phoneNumber={teacher.phoneNumber}
                  gender={teacher.gender}
                  status={teacher.status}
                  qualifications={teacher.qualifications}
                  index={index + 1}
                  employmentDate={teacher.employmentDate}
                />
              ))}
            </div>
            <div className="pagination">
              <span className="page active">1</span>
              <span className="page">2</span>
            </div>
          </div>
        </div>
      </div>

      <AddTeacher />
      <ImportTeachers />
    </>
  );
}

export default Teachers;
