import { TeacherTypes } from "@/types/StaffTypes";
import Eye from "./svg/Eye";
import useViewTeacherModalStore from "@/context/modals/teachers/viewTeacher";

function Teacher(props: TeacherTypes) {
  const { setViewTeacherModalActive, setViewTeacherId } =
    useViewTeacherModalStore();

  return (
    <div
      onClick={() => {
        setViewTeacherId(props.id);
        setViewTeacherModalActive();
      }}
      key={props.id}
      className="tr"
    >
      <span className="td number opacity-75">{props.index}</span>
      <span className="td truncate font-medium">
        {props.firstName + " " + props.lastName}{" "}
      </span>
      <span className="td opacity-75 flex flex-col gap-0.5 truncate">
        <span className="td number">{props.phoneNumber}</span>
      </span>
      <span className="td opacity-75">{props.email}</span>
      <span
        className={`td number ${
          props.status && props.status.length > 0
            ? props.status.toLowerCase()
            : "deactivated"
        }-status`}
      >
        <span className="status-label font-p-3 font-medium flex items-center gap-1">
          {props.status}
        </span>
      </span>
      <span className="td action">
        <span className="action-1">
          <Eye />
        </span>
      </span>
    </div>
  );
}

export default Teacher;
