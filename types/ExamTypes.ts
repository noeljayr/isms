import { QueryTypes } from "./QueryTypes";

export interface ExamTypes {
  teacherId: string;
  subjectId: string;
  examType: string;
  classId: string;
  subClassId: string;
  academicYear: string;
  examDateTime: string;
  status: string;
  term: number;
}

export interface GetExamTypes extends QueryTypes {
  id?: string;
  teacherId?: string;
  examType?: string;
  classId?: string;
  subClassId?: string;
  academicYear?: string;
  examDateTime?: string;
  search?: string;
  setData: (data: any) => void;
  page?: number;
  pageSize?: number;
}
