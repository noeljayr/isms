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
import { TOKEN_COOKIE_NAME } from "@/middleware";
import Loader from "@/components/ux/Loader";

type Props = {
  show: boolean;
  setShow: (state: boolean) => void;
  mainClassId: string;
  setMainClassId: (id: string) => void;
  subClassId: string;
  setSubClassId: (id: string) => void;
  setMainClassName: (name: string) => void;
  setSubClassName: (name: string) => void;
};

function ClassPicker(props: Props) {
  const datePickerDiv = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubLoading, setIsSubLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubError, setSubIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = getCookie(TOKEN_COOKIE_NAME);
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
      setIsSubLoading(true);
      setSubIsError(false);
      setErrorMessage("");
      setSubClassData([]);
      try {
        const response = await fetch(
          `${BASE_URL}/SubClass?classId=${props.mainClassId}`,
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
          setIsSubLoading(false);
          setSubClassData(data.data);
        } else {
          setSubIsError(true);
          setErrorMessage(data.title);
        }
      } catch (err: any) {
        setSubIsError(true);
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
          {isLoading ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <Loader variant="primary" />
            </div>
          ) : isError ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
              <span className="error">Something went wrong</span>
            </div>
          ) : classData.length > 0 ? (
            classData.map((classD, index) => (
              <span
                key={index}
                onClick={() => {
                  props.setMainClassId(classD.id);
                  props.setMainClassName(classD.name);
                }}
                className={`class relative p-2 font-medium pr-0 pl-1.5 flex items-center
                } ${
                  props.mainClassId == classD.id ? "selected-main-class" : ""
                }`}
              >
                {subClassData.length <= 0 && (
                  <span className={`check-icon main-class-check-icon`}>
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
                          {isSubLoading ? (
                            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
                              <Loader variant="primary" />
                            </div>
                          ) : isSubError ? (
                            <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
                              <span className="error">
                                Something went wrong
                              </span>
                            </div>
                          ) : (
                            subClassData.map((subClass, index) => {
                              return (
                                <span
                                  key={index}
                                  onClick={() => {
                                    props.setSubClassId(subClass.id);
                                    props.setSubClassName(subClass.name);
                                    props.setShow(false);
                                  }}
                                  className={`class flex items-center p-2 pl-1.5 pr-0 font-medium ${
                                    props.subClassId === subClass.id
                                      ? "selected-class-sub-class"
                                      : ""
                                  }`}
                                >
                                  <span className="check-icon sub-class-check-icon">
                                    <Check />
                                  </span>

                                  {subClass.name}
                                </span>
                              );
                            })
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
