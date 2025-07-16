import { getClasses, getSubClasses } from "@/api/classes";
import { assignSubjects, removeSubject } from "@/api/teachers";
import Trash from "@/components/svg/Trash";
import { motionTransition } from "@/constants/motionTransition";
import { useTeacherModalStore } from "@/context/modals/teachers/addTeacher";
import useViewTeacherModalStore from "@/context/modals/teachers/viewTeacher";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import { SubjectTypes } from "@/types/SubjectsTypes";
import { IconStarFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SubjectComponent = ({
    index,
    subject,
    parentElement,
    isSelected,
    setIsSuccess,
  }: {
    subject: SubjectTypes;
    index: number;
    parentElement: string;
    isSelected?: boolean;
    setIsSuccess: (state: boolean) => void;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [classData, setClassData] = useState<ClassTypes>();
    const [subClassData, setSubClassData] = useState<SubClassTypes>();
  
    const { viewTeacherId } = useViewTeacherModalStore();
    const { setAddTeacherChange } = useTeacherModalStore();
  
    useEffect(() => {
      if (subject.classId) {
        getClasses({
          setData: setClassData,
          setIsLoading,
          setIsError,
          setErrorMessage,
          id: subject.classId,
        });
      }
  
      if (subject.subClassId) {
        getSubClasses({
          setData: setSubClassData,
          setIsLoading,
          setIsError,
          setErrorMessage,
          id: subject.subClassId,
        });
      }
    }, [subject]);
  
    return (
      <>
        {isLoading ? (
          <></>
        ) : isError ? (
          <></>
        ) : classData ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.5,
                delay: index / 10,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              key={index}
              onClick={() => {
                if (parentElement === "assigned") return;
                assignSubjects({
                  setAddTeacherChange: setAddTeacherChange,
                  setErrorMessage,
                  setIsError,
                  setIsLoading,
                  setSuccess: setIsSuccess,
                  subjectId: subject.id,
                  teacherId: viewTeacherId || "",
                });
              }}
              className={`${
                parentElement === "new" && "cursor-pointer"
              } border-[var(--border)] justify-center relative p-1.5 flex flex-col border-[1px] ${
                isSelected && "bg-[#f0f1fc]"
              } rounded-[var(--radius-s)]`}
            >
              <span className="font-p-2 font-medium">{subject.name}</span>
              <span className="flex gap-4 mt-0.5 items-center">
                {subject.isMandotory && (
                  <>
                    <span
                      className={`flex items-center font-p-3 opacity-60 font-medium ${
                        subject.isMandotory ? "mandotory" : ""
                      }`}
                    >
                      <IconStarFilled
                        color="#ffc801"
                        className="h-2.5 w-2.5 mr-1"
                      />{" "}
                      Mandatory
                    </span>
  
                    <span className="font-black opacity-20">•</span>
                  </>
                )}
                <span>
                  {classData && (
                    <span className="font-p-3 font-medium opacity-60">
                      {classData.name}
                    </span>
                  )}
                  {subClassData && (
                    <span className="font-p-3 font-medium opacity-60">
                      {subClassData.name}
                    </span>
                  )}
                </span>
              </span>
  
              {parentElement === "assigned" || isSelected ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={motionTransition}
                  type="button"
                  className="absolute remove-button right-1 cursor-pointer"
                  onClick={() => {
                    removeSubject({
                      setAddTeacherChange: setAddTeacherChange,
                      setErrorMessage,
                      setIsError,
                      setIsLoading,
                      setSuccess: setIsSuccess,
                      subjectId: subject.id,
                      teacherId: viewTeacherId || "",
                    });
                  }}
                >
                  <Trash />
                </motion.button>
              ) : (
                <></>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <></>
        )}
      </>
    );
  };


  export default SubjectComponent