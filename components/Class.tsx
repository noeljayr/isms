import React from "react";

import { ClassTypes } from "@/types/classes";
import Eye from "./svg/Eye";
import Link from "next/link";


function Class(props: ClassTypes) {
 

  return (
    <Link href={`/classes/${props.name}`} className="tr">
      <span className="name">{props.name}</span>
      <span className="students-count number opacity-85">
        {props.totalStudent}
      </span>
      <span className="students-count number opacity-85">
        {props.totalTeachers}
      </span>
      <span className="attandance-rate number opacity-85">
        {props.attandanceRate}%
      </span>
      <span className="action">
        <span className="action-1">
          <Eye />
        </span>
      </span>
    </Link>
  );
}

export default Class;
