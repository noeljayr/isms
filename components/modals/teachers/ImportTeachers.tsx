"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import { useImportTeachesrModalStore } from "@/context/modals/teachers/addTeacher";
import FileDropzone from "@/components/FileDropzone";

function ImportTeachers() {
  const { importTeachersModalActive, setImportTeachersModalActive } =
    useImportTeachesrModalStore();
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      {importTeachersModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal import-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          importTeachersModalActive ? "modal-active" : ""
        }`}
      >
        <form className="card">
          <span className="card-title flex items-center">
            Import teachers
            <span
              onClick={setImportTeachersModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <FileDropzone file={file} setFile={setFile} />

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setImportTeachersModalActive} className="cta-2">
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

export default ImportTeachers;
