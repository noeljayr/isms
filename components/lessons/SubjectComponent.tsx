"use client"

import { AnimatePresence, motion } from "motion/react"; 
import { SubjectTypes } from "@/types/SubjectsTypes";
import { useEffect, useState } from "react";
import { ClassTypes, SubClassTypes } from "@/types/ClassesTypes";
import { getClasses, getSubClasses } from "@/api/classes";
import { IconStarFilled } from "@tabler/icons-react";
 
 const SubjectComponent = ({
    index,
    subject,
    isSelected,
    setIsSuccess,
    setClassId,
    setSubClassId,
    setSubjectId,
    subjectId,
  }: {
    subject: SubjectTypes;
    index: number;
    isSelected?: boolean;
    setIsSuccess: (state: boolean) => void;
    setClassId: (state: string) => void;
    setSubClassId: (state: string) => void;
    setSubjectId: (state: string) => void;
    subjectId: string;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [classData, setClassData] = useState<ClassTypes>();
    const [subClassData, setSubClassData] = useState<SubClassTypes>();
  
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
              onClick={() => {
                setClassId(classData.id);
                setSubClassId(subClassData?.id || "");
                setSubjectId(subject.id);
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.5,
                delay: index / 10,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              key={index}
              className={`cursor-pointer border-[var(--border)] justify-center relative p-1.5 flex flex-col border-[1px] ${
                subject.id == subjectId && "bg-[#f0f1fc]"
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
            </motion.div>
          </AnimatePresence>
        ) : (
          <></>
        )}
      </>
    );
  };
  

  export default  SubjectComponent