"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import { useImportStudentModalStore } from "@/context/modals/addStudent";
import FileDropzone from "@/components/FileDropzone";
import { AnimatePresence, motion } from "motion/react";

function ImportStudents() {
  const { importStudentsModalActive, setImportStudentModalActive } =
    useImportStudentModalStore();
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      {importStudentsModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal import-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          importStudentsModalActive ? "modal-active" : ""
        }`}
      >
        <form className="card">
          <span className="card-title flex items-center">
            Import students
            <span
              onClick={setImportStudentModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-1">
            <FileDropzone file={file} setFile={setFile} />

            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "linear" }}
                  className="upload-propgress grid gap-2 items-center"
                >
                  <span className="progress-bar">
                    <span></span>
                  </span>

                  <span className="number opacity-75">0 / 20</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setImportStudentModalActive} className="cta-2">
                Cancel
              </span>
              <span className="cta">Upload</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ImportStudents;
