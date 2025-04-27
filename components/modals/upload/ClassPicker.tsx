"us client";

import { classData } from "@/data/classes";
import Link from "next/link";
import ChevronRight from "../../svg/ChevronRight";
import { useEffect, useRef, useState } from "react";
import { ClassTypes } from "@/types/classes";
import Check from "../../svg/Check";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  setShow: (state: boolean) => void;
  selectedClass: string;
  setSelectedClass: (name: string) => void;
};

function ClassPicker(props: Props) {
  const [activeClass, setActiveClass] = useState<ClassTypes>();
  const datePickerDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerDiv.current &&
        !datePickerDiv.current.contains(event.target as Node)
      ) {
        props.setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          ref={datePickerDiv}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear", duration: 0.25 }}
          className={`classes-picker ${
            classData.length <= 0 ? "empty-classes" : ""
          } absolute flex flex-col p-2`}
        >
          {classData.length > 0 ? (
            classData.map((classD, index) => (
              <span
                key={index}
                onClick={() => {
                  setActiveClass(classD);
                  if (classD.subClasses.length <= 0) {
                    props.setShow(false);
                  }
                }}
                className={`class relative p-2 font-medium pr-0 pl-1.5 flex items-center  ${
                  activeClass == classD ? "active-class" : ""
                } ${
                  props.selectedClass == classD.name ? "selected-class" : ""
                }`}
              >
                {classD.subClasses.length <= 0 && (
                  <span className={`check-icon`}>
                    <Check />
                  </span>
                )}

                {classD.name}

                {classD.subClasses.length > 0 ? (
                  <>
                    <span className="ml-auto opacity-50">
                      <ChevronRight />
                    </span>
                    {activeClass === classD ? (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ ease: "linear", duration: 0.35 }}
                          className="sub-classes absolute flex flex-col p-2"
                        >
                          {classD.subClasses.map((subClass, index) => (
                            <span
                              key={index}
                              onClick={() => {
                                props.setSelectedClass(
                                  classD.name + " " + subClass.name
                                );
                                props.setShow(false);
                              }}
                              className={`class flex items-center p-2 pl-1.5 pr-0 font-medium ${
                                props.selectedClass ==
                                classD.name + " " + subClass.name
                                  ? "selected-class"
                                  : ""
                              }`}
                            >
                              <span className="check-icon">
                                <Check />
                              </span>

                              {subClass.name}
                            </span>
                          ))}
                        </motion.div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </span>
            ))
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <span className="font-medium">No classes where found</span>
              <Link href="/classes/" className="">
                Add a class
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClassPicker;
