import { StudentTypes } from "@/types/student-types";
import Eye from "./svg/Eye";
import useViewStudentModalStore from "@/context/modals/viewStudents";

function Student(props: StudentTypes) {
  const {setViewStudentModalActive, viewStudentModalActive} = useViewStudentModalStore()

  return (
    <div onClick={setViewStudentModalActive} key={props.id} className="tr">
      <span className="td number student-number">{props.accountId}</span>
      <span className="td truncate font-medium">{props.firstName} {" "} {props.lastName}  </span>
      <span className="td flex flex-col gap-0.5 truncate">
        {/* <span className="truncate">{props.guardian.name}</span>
        <span className="flex gap-1.5 items-center opacity-65">
          <span className="guardian-email">{props.guardian.email}</span>
          <span className="opacity-50">•</span>
          <span className="guardian-phone">{props.guardian.phone}</span>
        </span> */}
      </span>
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
