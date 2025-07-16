import { QueryTypes } from "./QueryTypes";

export interface SubjectTypes {
  id: string;
  name: string;
  SchoolId: string;
  classId: string;
  subClassId: string;
  isMandotory: boolean;
  status: string;
}

export interface GetSubjectsTypes extends QueryTypes {
  setSubjectData: (data: any) => void;
  search?: string;
  id?: string;
  classId?: string;
  subClassId?: string;
  page?: number;
  pageSize?: number;
}

export interface GetSubjectTypes extends QueryTypes {
  setSubjectData: (data: SubjectTypes) => void;
  id: string;
}

export interface AddSubjectTypes extends QueryTypes {
  classId: string;
  subClassId: string;
  name: string;
  isMandotory: boolean;
  setSuccess: (state: boolean) => void;
  setAddSubjectChange: () => void;
}

export interface UpdateSubjectTypes extends QueryTypes {
  id: string;
  classId: string;
  subClassId: string;
  name: string;
  isMandotory: boolean;
  setSuccess: (state: boolean) => void;
  setUpdateSubjectChange: () => void;
}

export interface LessonTypes {
  id: string;
  subjectId: string;
  topic: string;
  classId: string;
  SchoolId: string;
  subClassId: string;
  teacherId: string;
  term: string;
  weekDay: string;
  academicYear: string;
  dayTime: string;
  weekNumber: 0;
  status: string;
  createLessonDto?: string;
}

export interface GetLessonsTypes extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  id?: string;
  classId?: string;
  subClassId?: string;
  page?: number;
  pageSize?: number;
  teacherId?: string;
  subjectId?: string;
}
