import { QueryTypes } from "./QueryTypes";

export interface StaffTypes {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  status: string;
  address: string;
}

export interface TeacherTypes extends StaffTypes {
  qualifications: string[];
  employmentDate: string;
}


export interface GetTeachersTypes extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  id?: string;
  page?: number;
  pageSize?: number;
  dateEmployedFrom?: string,
  status?: string
}


export interface UpdateTeacher extends QueryTypes {
  id: string;
  setSuccess: (state: boolean) => void;
  setAddTeacherChange: () => void;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  status: string;
  qualifications: string[],
  employmentDate: string
}


export interface AssignSubjects extends QueryTypes {
  teacherId: string,
  subjectId: string,
  setSuccess: (state: boolean) => void;
  setAddTeacherChange: () => void;
}