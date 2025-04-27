import { Guardian } from "./guardian-types";

export interface StudentTypes {
  id: string;
  studentNumber: number;
  name: string;
  guardian: Guardian;
  class: string;
}

export type StudentsTypes = StudentTypes[];
