import { QueryTypes } from "./QueryTypes";

export interface SchoolTypes {
  id: string;
  SchoolName: string;
  schoolType: string;
  schoolCategory: string;
  schoolLogoPath: string;
  contact: string;
  address: string;
  gradingSystem: string;
  status: string;
}

export interface GetSchoolTypes extends QueryTypes {
  setData: (data: any) => void;
  id: string;
}

export interface UpdateSchooTypes extends QueryTypes {
  id: string;
  SchoolName: string;
  schoolType: string;
  schoolCategory: string;
  schoolLogoPath: string;
  contact: string;
  address: string;
  gradingSystem: string;
}
