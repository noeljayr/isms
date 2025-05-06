import { StudentTypes } from "@/types/student-types";
import Eye from "./svg/Eye";
import useViewStudentModalStore from "@/context/modals/viewStudents";
import Plus from "./svg/Plus";
import StudentGuardian from "./StudentGuardian";

function Student({student}: {student: StudentTypes}) {
  const { setViewStudentModalActive, setViewStudentId } =
    useViewStudentModalStore();

  return (
    <div
      onClick={() => {
        setViewStudentId(student.id);
        setViewStudentModalActive();
      }}
      key={student.id}
      className="tr"
    >
      <span className="td number student-number"></span>
      <span className="td truncate font-medium">
        {student.firstName} {student.lastName}{" "}
      </span>
      {student.parentId && student.parentId.length > 0 ? (
        <StudentGuardian parentId={student.parentId} />
      ) : (
        <button
          style={{
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "1.5rem",
            height: "1.5rem",
            marginLeft: "0.7rem",
          }}
          className="cta-2"
        >
          <span className="opacity-50">
            {" "}
            <Plus />
          </span>
        </button>
      )}
      <span className="td"></span>
      <span className="td action">
        <span className="action-1">
          <Eye />
        </span>
      </span>
    </div>
  );
}

export default Student;
