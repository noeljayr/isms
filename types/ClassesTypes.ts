import { QueryTypes } from "./QueryTypes";

export interface SubClassTypes {
  id: string;
  name: string;
  students: number;
  teachers: number;
}

export interface ClassTypes {
  id: string;
  name: string;
  totalStudent: number;
  totalTeachers: number;
  attandanceRate: number;
}

export interface GetClassesTypes extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  academicDateFrom?: string;
  academicDateTo?: string;
  page?: number;
  pageSize?: number;
  id?: string;
}


export interface GetSubClassesTypes extends GetClassesTypes {
  search?: string;
  classId?: string;
}

export interface UpdateClassTypes extends QueryTypes {
  name: string,
  id: string,
  setSuccess: (state: boolean) => void,
  setClassChange: ()=> void,
}

export interface AddClassTypes extends QueryTypes {
  name: string,
  setSuccess: (state: boolean) => void,
  setClassChange: ()=> void,
}


export interface AddSubClassTypes extends QueryTypes {
  name: string,
  classId: string,
  setSuccess: (state: boolean) => void,
  setClassChange: ()=> void,
}