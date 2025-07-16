import { LessonTypes } from "./SubjectsTypes";

export interface QueryTypes {
  setIsLoading: (state: boolean) => void;
  setIsError: (state: boolean) => void;
  setErrorMessage: (message: string) => void;
}

export interface Login extends QueryTypes {
  setIsSuccess: (state: boolean) => void;
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CreateLesson extends QueryTypes {
  setIsSuccess: (state: boolean) => void;
  setShowModal: (state: boolean) => void;
  setLessons: (data: any) => void;
  dayTime: string;
  teacherId: string;
  subjectId: string;
  topic: string;
  classId: string;
  SchoolId: string;
  subClassId: string;
  weekDay: string;
}

export interface GetLessons extends QueryTypes {
  setData: (data: any) => void;
  teacherId?: string;
  classId?: string;
  subClassId?: string;
  searchQuery?: string;
  id?: string;
}

export interface UploadContentQuery extends QueryTypes {
  setIsSuccess: (state: boolean) => void;
  title: string;
  author: string;
  description: string;
  contentType: string;
  fileSize: number;
  tags: string[];
  allowedRoles: string[];
  allowedClassLevels: string[];
  subject: string;
  allowDownload: boolean;
  allowPrinting: boolean;
}

export interface UploadFile extends QueryTypes {
  setData: (data: any) => void;
  setIsSuccess: (state: boolean)=> void,
  file: File;
}
