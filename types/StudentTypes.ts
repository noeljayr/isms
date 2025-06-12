import { ClassTypes, SubClassTypes } from "./ClassesTypes";
import { Guardian } from "./GuardianTypes";
import { QueryTypes } from "./QueryTypes";

export interface StudentTypes {
  id: string;
  gender: string;
  firstName: string;
  lastName: string;
  schoolId: string;
  accountId: string;
  phoneNumber: string;
  email: string;
  classId: string;
  subClassId: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  parentId: string | null;
  status: string;
  class: ClassTypes;
  guardian: Guardian | null;
  subClass: SubClassTypes;
}

export type StudentsTypes = StudentTypes[];

export interface GetStudents extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  id?: string;
  classId?: string;
  subClassId?: string;
  schoolId?: string;
  gender?: string;
  status?: string;
  guardianId?: string;
  parentId?: string | null;
  page?: number;
  pageSize?: number;
  academicDateFrom?: string;
  academicDateTo?: string;
}

export interface EditStudentTypes extends QueryTypes {
  setSuccess: (state: boolean) => void;
  setStudentChange: () => void;
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  parentId: string | null;
  classId: string;
  subClassId: string;
  status: string,
  enrollmentDate: string,
}


export interface AddStudentTypes extends QueryTypes {
  setSuccess: (state: boolean) => void;
  setStudentChange: () => void;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  classId: string;
  subClassId: string;
  status: string,
  enrollmentDate: string,
}
