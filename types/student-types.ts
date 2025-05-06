export interface StudentTypes {
  id: string;
  gender: string;
  firstName: string;
  lastName: string;
  // schoolId: string;
  accountId: string;
  email: string;
  classId: string;
  subClassId: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  parentId: string;
  status: string;
  studentNumber: string;
  phoneNumber: string
}

export type StudentsTypes = StudentTypes[];
