import { QueryTypes } from "./QueryTypes";

export interface Guardian {
  index: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  status: string;
}

export interface GetGuardians extends QueryTypes {
  setData: (data: any) => void;
  search?: string;
  id?: string;
  page?: number;
  pageSize?: number;
}

export interface UpdateGuardian extends QueryTypes {
  id: string;
  setSuccess: (state: boolean) => void;
  setGuardianChange: () => void;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  status: string
}
