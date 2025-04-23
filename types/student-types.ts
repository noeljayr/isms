import { Guardian } from "./guardian-types";

export interface Student {
  id: string;
  studentNumber: number;
  name: string;
  guardian: Guardian;
  class: string;
}

export type Students = Student[];
