"use client";

import { useEffect, useState } from "react";
import Search from "@/components/svg/Search";
import { StudentTypes } from "@/types/StudentTypes";
import useViewGuardiansModalStore from "@/context/modals/guardians/viewGuardians";
import useViewStudentModalStore from "@/context/modals/students/viewStudents";
import Loader from "../ux/Loader";
import { AnimatePresence, motion } from "motion/react";
import { motionTransition } from "@/constants/motionTransition";
import { editStudent, getStudents } from "@/api/students";
import Check from "../svg/Check";

function GuardianStudents({ guardianName }: { guardianName: string }) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [filteredStudents, setFilteredStudentsData] = useState<StudentTypes[]>(
    []
  );
  const [isEditError, setIsEditError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [initialStudents, setInitialStudents] = useState<StudentTypes[]>([]);
  const [guardianStudents, setGuardiaStudents] =
    useState<StudentTypes[]>(initialStudents);
  const { viewGuardiansId } = useViewGuardiansModalStore();

  useEffect(() => {
    if (!viewGuardiansId) return;
    getStudents({
      setData: setInitialStudents,
      setIsLoading,
      setIsError,
      setErrorMessage,
      parentId: viewGuardiansId,
    });
  }, [viewGuardiansId]);

  useEffect(() => {
    if (initialStudents.length > 0) {
      setGuardiaStudents(initialStudents);
    }
  }, [initialStudents]);

  useEffect(() => {
    if (search.length === 0) return;

    getStudents({
      setData: setFilteredStudentsData,
      setIsLoading: setSearchLoading,
      setIsError: setSearchError,
      setErrorMessage: setErrorMessage,
      search,
      parentId: null,
    });
  }, [search]);

  const checkStudentUnderGuardian = (student: StudentTypes) => {
    return guardianStudents.some((s) => s.id === student.id);
  };

  const toggleStudentUnderGuardian = (student: StudentTypes) => {
    if (checkStudentUnderGuardian(student)) {
      setGuardiaStudents((prev) => prev.filter((s) => s.id !== student.id));
    } else {
      setGuardiaStudents((prev) => [...prev, student]);
    }
  };

  const updatedStudentGuardian = () => {
    guardianStudents.forEach((student) => {
      editStudent({
        parentId: viewGuardiansId,
        id: student.id,
        setIsLoading: setIsLoading,
        setIsError: setIsEditError,
        setErrorMessage: setErrorMessage,
        address: student.address,
        email: student.email,
        firstName: student.firstName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        lastName: student.lastName,
        phoneNumber: student.phoneNumber,
        classId: student.classId,
        subClassId: student.subClassId,
        setSuccess: setIsSuccess,
        setStudentChange: () => {},
        status: student.status,
        enrollmentDate: student.enrollmentDate,
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      key="guardian-students-view"
      layout="position"
      transition={motionTransition}
      className="grid grid-cols-1 grid-rows-[40%_1fr] gap-2 h-full overflow-hidden"
    >
      <motion.div
        animate={{ height: "auto" }}
        layout
        transition={motionTransition}
        style={{ display: "grid" }}
        className="grid grid-rows-[auto_1fr] overflow-hidden gap-1 section"
      >
        <motion.span layout className="opacity-45 font-semibold">
          {guardianName} is a guardian of:{" "}
        </motion.span>
        <motion.div className="grid gap-1 auto-rows-min overflow-y-auto hide-scrollbar">
          {isLoading ? (
            <motion.div
              layout
              className="h-[5rem] w-[5rem] flex m-auto items-center justify-center"
            >
              <Loader variant="primary" />
            </motion.div>
          ) : isError ? (
            <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
              <span className="error">{errorMessage}</span>
            </div>
          ) : guardianStudents.length > 0 ? (
            guardianStudents.map((student, index) => (
              <motion.div
                layout
                transition={{
                  ease: [0.25, 0.1, 0.25, 1],
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="student-guardian-view"
              >
                <span key={index}>
                  <span className="font-medium number">
                    {student.firstName} {student.lastName}
                  </span>

                  <span className="flex gap-4 items-center">
                    <span className="font-p-3 opacity-65 number">
                      {student.email}
                    </span>
                    <span className="font-black opacity-20">•</span>
                    <span className="font-p-3 opacity-65 number">
                      {student.phoneNumber}
                    </span>
                    <span className={`font-black opacity-20`}>•</span>
                    <span
                      className={`font-p-3 opacity-65 number ${student.status}`}
                    >
                      {student.status}
                    </span>
                  </span>
                </span>
              </motion.div>
            ))
          ) : (
            <div
              style={{ fontSize: "var(--p3)" }}
              className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
            >
              No students found
            </div>
          )}
        </motion.div>
      </motion.div>

      <div
        style={{ paddingBottom: 0, display: "grid" }}
        className="select-students section grid grid-rows-[auto_1fr] overflow-hidden gap-2"
      >
        <div
          style={{ position: "relative" }}
          className="search input-group mr-auto"
        >
          <span className="absolute left-2 top-[0.7rem]">
            <Search />
          </span>
          <input
            style={{
              paddingLeft: "1.5rem",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={`Search for students...`}
          />
        </div>

        <div className="filtered-students flex flex-col overflow-y-auto gap-2 w-full h-full relative">
          {search.length == 0 ? (
            <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
              <span className="opacity-65 font-p-3 text-center">
                Search for students to add to {guardianName} guardianship
              </span>
            </div>
          ) : searchLoading ? (
            <motion.div
              layout
              className="h-[5rem] w-[5rem] flex m-auto items-center justify-center"
            >
              <Loader variant="primary" />
            </motion.div>
          ) : searchError ? (
            <div className="h-[5rem] w-fit flex m-auto items-center justify-center">
              <span className="error">{errorMessage}</span>
            </div>
          ) : filteredStudents.length > 0 ? (
            <AnimatePresence>
              {filteredStudents.map((student, index) => (
                <span
                  onClick={() => toggleStudentUnderGuardian(student)}
                  key={index}
                  style={{ paddingLeft: "2rem" }}
                  className={`student-guardian-view flex justify-center flex-col py-2 cursor-pointer relative ${
                    checkStudentUnderGuardian(student) ? "bg-primary/10" : ""
                  }`}
                >
                  <span
                    className={`checkbox-container absolute left-2   ${
                      checkStudentUnderGuardian(student) ? "checked" : ""
                    }`}
                  >
                    <span className="checkbox">
                      <Check />
                    </span>
                  </span>
                  <span className="font-medium number">
                    {student.firstName} {student.lastName}
                  </span>

                  <span className="flex gap-4 items-center">
                    <span className="font-p-3 opacity-65 number">
                      {student.email}
                    </span>
                    <span className="font-black opacity-20">•</span>
                    <span className="font-p-3 opacity-65 number">
                      {student.phoneNumber}
                    </span>
                    <span className="font-black opacity-20">•</span>
                    <span className="font-p-3 opacity-65 number">
                      {student.status}
                    </span>
                  </span>
                </span>
              ))}
            </AnimatePresence>
          ) : (
            <div
              style={{ fontSize: "var(--p3)" }}
              className="h-[5rem]  opacity-75 w-fit flex m-auto items-center justify-center"
            >
              No students found
            </div>
          )}
        </div>
      </div>

      <div className="cta-container flex gap-2 w-full items-center justify-end">
        <AnimatePresence>
          {isEditError && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTransition}
              style={{
                width: "fit-content",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                height: "fit-content",
              }}
              className="error mr-auto"
            >
              {errorMessage}
            </motion.span>
          )}

          {isSuccess && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTransition}
              style={{
                width: "fit-content",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                height: "fit-content",
              }}
              className="success mr-auto"
            >
              Guardian updated successfully.
            </motion.span>
          )}
        </AnimatePresence>

        <span className="cta-2">Cancel</span>
        <button
          type="button"
          onClick={updatedStudentGuardian}
          disabled={
            initialStudents.length == guardianStudents.length || isLoading
          }
          className={`cta ${
            initialStudents.length == guardianStudents.length
              ? "opacity-25"
              : "opacity-100"
          }`}
        >
          {isLoading ? <Loader /> : "Update"}
        </button>
      </div>
    </motion.div>
  );
}

export default GuardianStudents;
