"use client";

import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import FileDropzone from "@/components/FileDropzone";
import { useImportGradesModalStore } from "@/context/modals/grades/importGrades";

function ImportGrades() {
  const {importGradesModalActive, setImportGradesModalActive} = useImportGradesModalStore()
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      {importGradesModalActive && (
        <div className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal import-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          importGradesModalActive ? "modal-active" : ""
        }`}
      >
        <form className="card">
          <span className="card-title flex items-center">
            Import grades
            <span
              onClick={setImportGradesModalActive}
              title="discard"
              className="close ml-auto"
            >
              <XClose />
            </span>
          </span>

          <div className="card-body flex flex-col gap-4">
            <FileDropzone file={file} setFile={setFile} />

            <div className="cta-container flex gap-2 w-full justify-end">
              <span onClick={setImportGradesModalActive} className="cta-2">
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

export default ImportGrades;
