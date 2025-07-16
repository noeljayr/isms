"use client";

import React, { useEffect, useState } from "react";
import XClose from "@/components/svg/XClose";
import FileDropzone from "@/components/FileDropzone";
import { useSearchParams } from "next/navigation";
import ContentDropzone from "@/components/ContentDropzone";
import { capitalize } from "@/utils/capitalize";
import Tags from "./Tags";
import SubjectComponent from "@/components/lessons/SubjectComponent";
import { AnimatePresence, motion } from "motion/react";
import { SubjectTypes } from "@/types/SubjectsTypes";
import Loader from "@/components/ux/Loader";
import { getTeacherSubject } from "@/api/teachers";
import { useTokenStore } from "@/context/token";
import { motionTransition, teacherId } from "@/constants/motionTransition";
import CheckCircle from "@/components/svg/CheckCircle";
import { getSubjects } from "@/api/subjects";
import Search from "@/components/svg/Search";
import { IconSearch } from "@tabler/icons-react";
import { getClasses, getSubClasses } from "@/api/classes";
import ContentSubject from "./ContentSubject";
import { ClassTypes } from "@/types/ClassesTypes";
import Check from "@/components/svg/Check";
import { uploadContent, uploadFile } from "@/api/content";

const steps = ["File", "Content details", "Subject", "Classes"];

type FileData = {
  fileName: string;
  originalName: string;
  fileSize: number;
  contentType: string;
};

function UploadContent() {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const searchParams = useSearchParams();
  const report = searchParams.get("upload");
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [getLoading, setGetLoading] = useState(false);
  const [classId, setClassId] = useState("");
  const [subClassId, setSubClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const { Id } = useTokenStore();
  const [author, setAuthor] = useState("");
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState<SubjectTypes[]>([]);
  const [classes, setClasses] = useState<ClassTypes[]>([]);
  const [allowedClassLevels, setAllowedClassLevels] = useState<string[]>([]);
  const [subject, setSubject] = useState("");

  const [levels, setLevels] = useState<string[]>([]);
  const [newLevels, setNewLevels] = useState<string[]>(levels);

  const addLevel = (level: string) => {
    if (!level.includes(level)) {
      setLevels((prev) => [...prev, level]);
    }
    if (!newLevels.includes(level)) {
      setNewLevels((prev) => [...prev, level]);
    }
  };

  useEffect(() => {
    setAllowedClassLevels(newLevels);
  }, [newLevels]);

  const handleLevelsChange = (lev: string) => {
    if (newLevels.includes(lev)) {
      setNewLevels((prev) => prev.filter((s) => s !== lev));
    } else {
      setNewLevels((prev) => [...prev, lev]);
    }
  };

  useEffect(() => {
    if (report && report == "true") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [report]);

  const close = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("upload");
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
    history.pushState(null, "", newUrl);
  };

  useEffect(() => {
    getSubjects({
      setIsLoading: setGetLoading,
      setErrorMessage: () => {},
      setIsError: () => {},
      setSubjectData: setSubjects,
    });

    getClasses({
      setData: setClasses,
      setIsLoading: setGetLoading,
      setErrorMessage: () => {},
      setIsError: () => {},
    });
  }, []);

  const [uploading, setUpLoading] = useState(false);
  const [fileData, setFileData] = useState<FileData>();
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const uploadNext = () => {
    if (!file) return;
    uploadFile({
      file,
      setData: setFileData,
      setErrorMessage: () => {},
      setIsError: () => {},
      setIsLoading: setUpLoading,
      setIsSuccess: setUploaded,
    });
  };

  useEffect(() => {
    if (uploaded && fileData) {
      setActiveStep(activeStep + 1);
      setDescription(fileData.fileName);
      setFileSize(fileData.fileSize);
      setContentType(fileData.contentType);
    }
  }, [uploaded, fileData, activeStep]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadContent({
      allowDownload,
      allowedClassLevels,
      allowedRoles: ["TEACHER", "Teacher", "STUDENT", "Student", "ADMIN"],
      allowPrinting,
      author,
      contentType,
      description,
      fileSize,
      setErrorMessage: () => {},
      setIsError,
      setIsLoading,
      setIsSuccess,
      subject,
      tags,
      title,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      window.setTimeout(() => {
        close();
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <>
      {open && (
        <div onClick={close} className="modal-overlay fixed h-screen w-screen left-0 top-0"></div>
      )}
      <div
        className={`modal import-student fixed h-screen w-screen left-0 top-0 flex items-center justify-center ${
          open ? "modal-active" : ""
        }`}
      >
        <form onSubmit={submit} className="card">
          <span className="card-title flex items-center">
            Upload resource
            <span onClick={close} title="discard" className="close ml-auto">
              <XClose />
            </span>
          </span>

          <div className="steps w-full px-2 my-2 grid grid-cols-4 gap-4">
            {steps.map((step, indx) => (
              <div key={indx} className="flex flex-col gap-1">
                <span className="h-1 flex w-full rounded-4xl bg-[var(--background)]">
                  <span
                    style={{ transition: "ease 0.5s" }}
                    className={`bg-[var(--primary)] ${
                      activeStep >= indx + 1 ? "w-full rounded-4xl" : "w-0"
                    }`}
                  ></span>
                </span>
                <span
                  className={`opacity-80 font-p-3 font-medium ${
                    activeStep >= indx + 1 ? "text-[var(--primart)]" : ""
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="card-body flex flex-col gap-4">
            {activeStep == 1 && (
              <>
                <ContentDropzone
                  file={file}
                  setFile={setFile}
                  setFileSize={setFileSize}
                  setContentType={setContentType}
                />

                {file && (
                  <div className="grid grid-cols-2">
                    <div className="input-group flex gap-2 w-full">
                      <label htmlFor="">Allow download</label>
                      <div className="flex gap-4">
                        <span
                          onClick={() => {
                            setAllowDownload(true);
                          }}
                          className={`radio-btn-container ${
                            allowDownload ? "selected-radio-btn" : ""
                          }`}
                        >
                          <span className="radio-btn">
                            <CheckCircle />
                          </span>
                          <span className="radio-btn-label">Yes</span>
                        </span>

                        <span
                          onClick={() => {
                            setAllowDownload(false);
                          }}
                          className={`radio-btn-container ${
                            !allowDownload ? "selected-radio-btn" : ""
                          }`}
                        >
                          <span className="radio-btn">
                            <CheckCircle />
                          </span>
                          <span className="radio-btn-label">No</span>
                        </span>
                      </div>
                    </div>

                    <div className="input-group flex gap-2 w-full">
                      <label htmlFor="">Allow printing</label>
                      <div className="flex gap-4">
                        <span
                          onClick={() => {
                            setAllowPrinting(true);
                          }}
                          className={`radio-btn-container ${
                            allowPrinting ? "selected-radio-btn" : ""
                          }`}
                        >
                          <span className="radio-btn">
                            <CheckCircle />
                          </span>
                          <span className="radio-btn-label">Yes</span>
                        </span>

                        <span
                          onClick={() => {
                            setAllowPrinting(false);
                          }}
                          className={`radio-btn-container ${
                            !allowPrinting ? "selected-radio-btn" : ""
                          }`}
                        >
                          <span className="radio-btn">
                            <CheckCircle />
                          </span>
                          <span className="radio-btn-label">No</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="cta-container flex gap-2 w-full justify-end">
                  <span onClick={close} className="cta-2">
                    Cancel
                  </span>
                  <button
                    type="button"
                    disabled={!file}
                    onClick={uploadNext}
                    className={`cta ${
                      !file ? "opacity-50, pointer-events-none" : ""
                    }`}
                  >
                    {uploading ? <Loader /> : "Next"}
                  </button>
                </div>
              </>
            )}

            {activeStep == 2 && (
              <>
                <div className="flex flex-col gap-4">
                  <div className="input-group">
                    <label htmlFor="">Title</label>
                    <input
                      required
                      value={title}
                      onChange={(e) => {
                        setTitle(capitalize(e.target.value));
                      }}
                      type="text"
                      placeholder="Title"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="">Author</label>
                    <input
                      required
                      value={author}
                      onChange={(e) => {
                        setAuthor(capitalize(e.target.value));
                      }}
                      type="text"
                      placeholder="Author"
                    />
                  </div>

                  <Tags setFormTags={setTags} formTags={tags} />
                </div>

                <div className="cta-container flex gap-2 w-full justify-end">
                  <span
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="cta-2"
                  >
                    Back
                  </span>
                  <span
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="cta"
                  >
                    Next
                  </span>
                </div>
              </>
            )}

            {activeStep == 3 && (
              <>
                <div className="subjects grid grid-rows-[auto_1fr] overflow-hidden h-[20rem] w-full flex-col gap-2 ">
                  <div className="flex flex-col gap-2">
                    <label className="font-p-2" htmlFor="">
                      Subject
                    </label>

                    <div className="w-full items-center gap-2 px-2 grid grid-cols-[auto_1fr] h-[2rem] rounded-[var(--radius-s)] border border-[var(--border)]">
                      <IconSearch className="h-4 w-4 opacity-50" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {getLoading ? (
                    <div className="flex flex-col w-full h-[5rem] items-center justify-center">
                      <Loader variant="primary" />
                    </div>
                  ) : subjects && subjects.length > 0 ? (
                    <AnimatePresence>
                      <div className="grid h-full p-2 border border-[var(--border)] rounded-[var(--radius-m)] bg-[var(--background-2)] overflow-y-auto auto-rows-min gap-2 w-full">
                        {subjects.map((s, index) => {
                          return (
                            <ContentSubject
                              index={index}
                              setClassId={setClassId}
                              subjectId={subjectId}
                              subject={s}
                              setIsSuccess={() => {}}
                              setSubjectId={setSubjectId}
                              setSubClassId={setSubClassId}
                              setSubject={setSubject}
                              key={s.id}
                            />
                          );
                        })}
                      </div>
                    </AnimatePresence>
                  ) : (
                    <motion.div
                      layout
                      className="p-2 text-center flex flex-col items-center justify-center h-full w-full"
                    >
                      <span className="font-semibold font-p-2 opacity-85">
                        No subjects found
                      </span>
                      <span className="font-p-4">
                        The teacher has not been assigned any subjects yet.{" "}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="cta-container flex gap-2 w-full justify-end">
                  <span
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="cta-2"
                  >
                    Back
                  </span>
                  <span
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="cta"
                  >
                    Next
                  </span>
                </div>
              </>
            )}

            {activeStep == 4 && (
              <>
                <div className="subjects grid grid-rows-[auto_1fr] overflow-hidden h-[20rem] w-full flex-col gap-2 ">
                  <div className="flex flex-col gap-2">
                    <label className="font-p-2" htmlFor="">
                      Allowed classes
                    </label>

                    <div className="w-full items-center gap-2 px-2 grid grid-cols-[auto_1fr] h-[2rem] rounded-[var(--radius-s)] border border-[var(--border)]">
                      <IconSearch className="h-4 w-4 opacity-50" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {getLoading ? (
                    <div className="flex flex-col w-full h-[5rem] items-center justify-center">
                      <Loader variant="primary" />
                    </div>
                  ) : classes && classes.length > 0 ? (
                    <AnimatePresence>
                      <div className="grid grid-cols-2 h-full p-2 border border-[var(--border)] rounded-[var(--radius-m)] bg-[var(--background-2)] overflow-y-auto auto-rows-min gap-4 w-full">
                        {classes.map((s, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => handleLevelsChange(s.name)}
                              className={``}
                            >
                              <span
                                className={`checkbox-container ${
                                  allowedClassLevels.includes(s.name)
                                    ? "checked"
                                    : ""
                                }`}
                              >
                                <span className="checkbox">
                                  <Check />
                                </span>
                                <span className="checkbox-label">{s.name}</span>
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </AnimatePresence>
                  ) : (
                    <motion.div
                      layout
                      className="p-2 text-center flex flex-col items-center justify-center h-full w-full"
                    ></motion.div>
                  )}
                </div>

                <div className="cta-container items-center flex gap-2 w-full justify-end">
                  {isError && (
                    <span className="font-p-2 mr-auto">
                      Something went wrong
                    </span>
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
                      Content uploaded
                    </motion.span>
                  )}
                  <span
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="cta-2"
                  >
                    Back
                  </span>
                  <button disabled={isLoading} className="cta">
                    {isLoading ? <Loader /> : "Upload"}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadContent;
