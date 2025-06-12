"use client";

import { getStudents } from "@/api/students";
import Eye from "./svg/Eye";
import { useEffect, useState } from "react";
import useViewClassModalStore from "@/context/modals/classes/viewClass";
import { AnimatePresence, motion } from "motion/react";
import { getSubClasses } from "@/api/classes";
import { getSubjects } from "@/api/subjects";

function Class({
  id,
  name,
  index,
}: {
  id: string;
  name: string;
  index: number;
}) {
  const [studentCount, setStudentCount] = useState(0);
  const [subClassCount, setSubClassCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const { setViewClassId, setViewClassModalActive } = useViewClassModalStore();

  useEffect(() => {
    if (id) {
      getStudents({
        setData: (data) => {
          setStudentCount(data.length);
        },
        classId: id,
        setErrorMessage: () => {},
        setIsError: () => {},
        setIsLoading: () => {},
      });

      getSubClasses({
        setData: (data) => {
          setSubClassCount(data.length);
        },
        setErrorMessage: () => {},
        setIsError: () => {},
        setIsLoading: () => {},
        classId: id,
      });

      getSubjects({
        setSubjectData: (data) => {
          setSubjectCount(data.length);
        },
        classId: id,
        setErrorMessage: () => {},
        setIsError: () => {},
        setIsLoading: () => {},
      });
    }
  }, [id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: -10 }}
        transition={{
          duration: 0.3,
          delay: (0.5 * index) / 5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onClick={() => {
          setViewClassId(id);
          setViewClassModalActive();
        }}
        className="tr"
      >
        <span className="name">{name}</span>
        <span className="students-count number opacity-85">{studentCount}</span>
        <span className="students-count number opacity-85">
          {subClassCount}
        </span>
        <span className="attandance-rate number opacity-85">
          {subjectCount}
        </span>
        <span className="action">
          <span className="action-1">
            <Eye />
          </span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default Class;
