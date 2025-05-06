import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import UploadCloud from "./svg/UploadCloud";
import Plus from "./svg/Plus";
import Trash from "./svg/Trash";
import { AnimatePresence, motion } from "motion/react";

interface FileDropzoneProps {
  onRemove?: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = Math.max(decimals, 0);
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onRemove,
  setFile,
  file,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [invalidFile, setInvalidFile] = useState(false);

  const handleFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (
      validTypes.includes(file.type) ||
      /\.(csv|xls|xlsx)$/i.test(file.name)
    ) {
      setInvalidFile(false);
      setFile(file);
    } else {
      setInvalidFile(true);
    }
  };

  // Drag & drop handlers
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      handleFile(dropped);
      e.dataTransfer.clearData();
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // File input selection handler
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      handleFile(selected);
      e.target.value = "";
    }
  };

  // Remove file and trigger remove callback
  const handleRemove = () => {
    setFile(null);
    onRemove?.();
  };

  return (
    <div>
      {!file && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="dropzone p-2 gap-0.5 relative flex flex-col items-center justify-center"
          style={{
            border: isDragging
              ? "1px dashed rgba(0, 8, 204, 0.25)"
              : invalidFile
              ? "1px solid var(error-2)"
              : "1px dashed var(--border)",
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className={` ${isDragging ? "opacity-20" : ""}`}>
            <UploadCloud />
          </span>

          <span className={`font-medium  ${isDragging ? "opacity-20" : ""}`}>
            Drop a CSV or exel
          </span>

          <span className={`${isDragging ? "opacity-20" : "opacity-65 "}`}>
            or{" "}
            <u
              className={`font-medium cursor-pointer ${
                isDragging ? "opacity-20" : ""
              }`}
            >
              click to browse
            </u>
          </span>
          <input
            type="file"
            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelectFile}
          />

          {isDragging && (
            <span className="plus-icon">
              <Plus />
            </span>
          )}
        </div>
      )}
      <AnimatePresence>
        {file && (
          <motion.div 
          initial={{opacity: 0}}
          animate={{opacity:1}}
          exit={{opacity: 0}}
          transition={{duration: 0.35, ease: "linear"}}
          className="dropzone-file-info flex p-2 items-center w-full">
            <div className="flex flex-col gap-0.5 ">
              <span className="font-medium">{file.name}</span>
              <span className="file-size font-medium opacity-65">
                {formatBytes(file.size)}
              </span>
            </div>

            <div className="dropzone-actions ml-auto flex gap-2 items-center">
              {/* <span onClick={handleUploadClick}>Upload</span> */}

              <button type="button" onClick={handleRemove}>
                <Trash />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileDropzone;
