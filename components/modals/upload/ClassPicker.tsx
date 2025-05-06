"us client";

import { classData } from "@/data/classes";
import Link from "next/link";
import ChevronRight from "../../svg/ChevronRight";
import { useEffect, useRef, useState } from "react";
import { ClassTypes, SubClassTypes } from "@/types/classes";
import Check from "../../svg/Check";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import { motionTranstion } from "@/constants/motionTranstion";

type Props = {
  show: boolean;
  setShow: (state: boolean) => void;
  mainClassId: string;
  setMainClassId: (id: string) => void;
  subClassId: string;
  setSubClassId: (id: string) => void;
  setSelectedClass: (name: string) => void;
};

function ClassPicker(props: Props) {
  const [activeClass, setActiveClass] = useState<ClassTypes>();
  const datePickerDiv = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie("token");
  const [classData, setClassData] = useState<ClassTypes[]>([]);
  const [subClassData, setSubClassData] = useState<SubClassTypes[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const response = await fetch(`${BASE_URL}/classes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setClassData(data.data);
        } else {
          setIsError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setIsError(true);
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    const getSubClass = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");
      setSubClassData([])
      try {
        const response = await fetch(
          `${BASE_URL}/SubClass?classId${props.mainClassId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status == 200) {
          setIsLoading(false);
          setSubClassData(data.data);
        } else {
          setIsError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setIsError(true);
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getSubClass();
  }, [props.mainClassId]);

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
                  props.setMainClassId(classD.id);
                }}
                className={`class relative p-2 font-medium pr-0 pl-1.5 flex items-center  ${
                  activeClass == classD ? "active-class" : ""
                } ${props.mainClassId == classD.id ? "selected-class" : ""}`}
              >
                {subClassData.length <= 0 && (
                  <span className={`check-icon`}>
                    <Check />
                  </span>
                )}

                {classD.name}

                {subClassData.length > 0 ? (
                  <>
                    <span className="ml-auto opacity-50">
                      <ChevronRight />
                    </span>
                    {props.mainClassId === classD.id ? (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={motionTranstion}
                          className="sub-classes absolute flex flex-col p-2"
                        >
                          {isLoading ? (
                            <div></div>
                          ) : isError ? (
                            <div></div>
                          ) : (
                            <>
                              {subClassData.map((subClass, index) => (
                                <span
                                  key={index}
                                  onClick={() => {
                                    props.setSubClassId(subClass.id);
                                    props.setShow(false);
                                  }}
                                  className={`class flex items-center p-2 pl-1.5 pr-0 font-medium ${
                                    props.subClassId == subClass.id
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
                            </>
                          )}
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
