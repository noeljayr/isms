import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";
useImportStudentModalStore;
import { useImportStudentModalStore } from "@/context/modals/students/addStudent";
import {
  AssignSubjects,
  GetTeachersTypes,
  UpdateTeacher,
} from "@/types/StaffTypes";

export const getTeachers = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  page,
  pageSize,
  status,
  dateEmployedFrom,
}: GetTeachersTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/teachers/${id}` : `${BASE_URL}/teachers`;

  if (!id) {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));
    if (dateEmployedFrom) params.append("academicDateFrom", dateEmployedFrom);
    if (search) params.append("searchQuery", search);
    if (status) params.append("status", status);

    endpoint += `?${params.toString()}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (response.status == 200) {
      setIsLoading(false);
      setData(data.data);
    } else {
      setIsError(true);
      setErrorMessage(data.title);
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

export const getTeacherSubject = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
  page,
  pageSize,
  search,
}: GetTeachersTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");
  if (!id) throw new Error("Id requeired");

  let endpoint = `${BASE_URL}/teachers/${id}/subjects/`;

  const params = new URLSearchParams();

  if (search) params.append("searchQuery", search);
  // if (classId) params.append("classId", classId);
  // if (subClassId) params.append("subClassId", subClassId);
  if (page) params.append("page", String(page));
  if (pageSize) params.append("pageSize", String(pageSize));

  endpoint += `?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (response.status == 200) {
      setIsLoading(false);
      setData(data.data);
    } else {
      setIsError(true);
      setErrorMessage(data.title);
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

export const updateTeacher = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setAddTeacherChange,
  id,
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  address,
  status,
  employmentDate,
  qualifications,
}: UpdateTeacher) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const SchoolId = token.schoolId;

  const response = await fetch(`${BASE_URL}/teachers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      id,
      firstName,
      lastName,
      gender,
      email,
      address,
      phoneNumber,
      status,
      employmentDate,
      qualifications,
      SchoolId,
    }),
  });

  try {
    if (response.status == 200) {
      setSuccess(true);
      setAddTeacherChange();
    } else {
      setIsError(true);
      setErrorMessage("Something went wrong");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

export const assignSubjects = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setAddTeacherChange,
  subjectId,
  teacherId,
}: AssignSubjects) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const response = await fetch(
    `${BASE_URL}/teachers/${teacherId}/subjects/${subjectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        teacherId,
        subjectId,
      }),
    }
  );

  try {
    if (response.status == 200) {
      setSuccess(true);
      setAddTeacherChange();
    } else {
      setIsError(true);
      setErrorMessage("Something went wrong");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

export const removeSubject = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setAddTeacherChange,
  subjectId,
  teacherId,
}: AssignSubjects) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const response = await fetch(
    `${BASE_URL}/teachers/${teacherId}/subjects/${subjectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        teacherId,
        subjectId,
      }),
    }
  );

  try {
    if (response.status == 200) {
      setAddTeacherChange();
      setSuccess(true);
    } else {
      setIsError(true);
      setErrorMessage("Something went wrong");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
