import React, { useState } from "react";
import XClose from "@/components/svg/XClose";
import {
  useImportStudentModalStore,
  useStudentModalStore,
} from "@/context/modals/addStudent";
import FileDropzone from "@/components/FileDropzone";
import { AnimatePresence, motion } from "motion/react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { jwtDecode } from "jwt-decode";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/BASE_URL";
import { generatePassword } from "@/utils/generatePassword";
import NumberFlow from "@number-flow/react";
import { motionTranstion } from "@/constants/motionTranstion";

const REQUIRED_COLUMNS = [
  "firstName",
  "lastName",
  "gender",
  "email",
  "classId",
  "subClassId",
  "address",
  "phoneNumber",
  "enrollmentDate",
  "dateOfBirth",
  "studentNumber",
];

function ImportStudents() {
  const { importStudentsModalActive, setImportStudentModalActive } =
    useImportStudentModalStore();
  const [file, setFile] = useState<File | null>(null);

  const [totalCount, setTotalCount] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getCookie(TOKEN_COOKIE_NAME);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setStudentChange } = useStudentModalStore();

  const handleUpload = async () => {
    if (!file) return;
    setError(null);
    setTotalCount(0);
    setUploadedCount(0);

    let rows: any[] = [];

    // parse CSV
    if (file.name.match(/\.csv$/i)) {
      const result = await new Promise<Papa.ParseResult<any>>((res, rej) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: res,
          error: rej,
        });
      });
      rows = result.data;
      // validate headers
      const headers = result.meta.fields || [];
      const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
      if (missing.length) {
        setError(`Missing required columns: ${missing.join(", ")}`);
        return;
      }
    }
    // parse Excel
    else if (file.name.match(/\.(xls|xlsx)$/i)) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        defval: "",
      });
      const headers = Object.keys(rows[0] || {});
      const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
      if (missing.length) {
        setError(`Missing required columns: ${missing.join(", ")}`);
        return;
      }
    } else {
      setError("Unsupported file type. Please upload a CSV or Excel file.");
      return;
    }

    setTotalCount(rows.length);
    setIsUploading(true);

    if (!token) {
      setError("Not authorized");
      setIsUploading(false);
      return;
    }
    const decoded: any = jwtDecode(token);
    const schoolId = decoded.SchoolId;

    for (const [index, row] of rows.entries()) {
      try {
        const response = await fetch(`${BASE_URL}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...row,
            schoolId,
            status: "active",
            password: generatePassword(),
          }),
        });

        if (response.status == 201) {
          setUploadedCount((count) => count + 1);
          if (uploadedCount >= totalCount) {
            setIsSuccess(true);
            setStudentChange();
          }
        } else {
          setError("Something went wrong, try again");
        }
      } catch (e) {
        console.error("Upload error on row", index, e);
      }
    }

    setIsUploading(false);
  };

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
                  transition={motionTranstion}
                  className="upload-progress grid grid-cols-[1fr_auto] gap-2 items-center"
                >
                  <span className="progress-bar">
                    <span
                      style={{
                        width: totalCount
                          ? `${(uploadedCount / totalCount) * 100}%`
                          : "0%",
                      }}
                    ></span>
                  </span>

                  <span className="number opacity-75">
                    <NumberFlow value={uploadedCount} /> /{" "}
                    <NumberFlow value={totalCount} />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cta-container flex gap-2 w-full items-center justify-end">
              {error && (
                <span
                  style={{ width: "fit-content" }}
                  className="error mr-auto"
                >
                  {error}
                </span>
              )}

              {isUploading && (
                <span
                  style={{ width: "fit-content" }}
                  className="success mr-auto"
                >
                  {uploadedCount} Students have been uploaded.
                </span>
              )}

              <button
                type="button"
                onClick={setImportStudentModalActive}
                className="cta-2"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                className="cta"
                disabled={isUploading || !file}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ImportStudents;
