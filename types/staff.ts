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
