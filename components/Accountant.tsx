import { StaffTypes } from "@/types/StaffTypes";
import Eye from "./svg/Eye";
import useViewClassModalStore from "@/context/modals/classes/viewClass";

function Accountant(props: StaffTypes) {
  const { setViewClassModalActive } = useViewClassModalStore();
  return (
    <div onClick={setViewClassModalActive} key={props.id} className="tr">
      <span className="td number opacity-75">{props.index}</span>
      <span className="td truncate font-medium">
        {props.firstName + " " + props.lastName}{" "}
      </span>
      <span className="td opacity-75 flex flex-col gap-0.5 truncate">
        <span className="td number">{props.phoneNumber}</span>
      </span>
      <span className="td opacity-75">{props.email}</span>
      <span
        className={`td status number ${
          props.status == "active" ? "active-status" : "deactivated"
        }`}
      >
        <span></span>
        {props.status}
      </span>
      <span className="td action">
        <span className="action-1">
          <Eye />
        </span>
      </span>
    </div>
  );
}

export default Accountant;
