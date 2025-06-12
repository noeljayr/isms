import {
  AddStudentTypes,
  EditStudentTypes,
  GetStudents,
} from "@/types/StudentTypes";
import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";
import { generatePassword } from "@/utils/generatePassword";

export const getStudents = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  classId,
  subClassId,
  parentId,
  gender,
  academicDateFrom,
  academicDateTo,
  status,
  page = 1,
  pageSize = 15,
}: GetStudents) => {
  setData([]);
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/students/${id}` : `${BASE_URL}/students`;

  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (classId) params.append("classId", classId);
    if (subClassId) params.append("subClassId", subClassId);
    if (parentId) params.append("guardianId", parentId);
    if (gender) params.append("gender", gender);
    if (academicDateFrom) params.append("academicDateFrom", academicDateFrom);
    if (status) params.append("status", status);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));
    if (academicDateFrom) params.append("academicDateFrom", String(academicDateFrom));
    if (academicDateTo) params.append("academicDateTo", academicDateTo);

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

    if (response.status === 200) {
      setData(data.data);
    } else {
      setIsError(true);
      setErrorMessage(data.title || "Error fetching students");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

export const editStudent = async ({
  setErrorMessage,
  id,
  address,
  email,
  firstName,
  lastName,
  gender,
  phoneNumber,
  dateOfBirth,
  parentId,
  classId,
  subClassId,
  status,
  setIsError,
  setIsLoading,
  setSuccess,
  setStudentChange,
}: EditStudentTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          id: id,
          firstName,
          lastName,
          gender,
          email,
          address,
          phoneNumber,
          dateOfBirth,
          parentId,
          classId,
          subClassId,
          status,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setIsLoading(false);
        setSuccess(true);
        setStudentChange();
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
  } else {
    setIsError(true);
    setErrorMessage("Not authorized");
  }
};

export const addStudent = async ({
  setErrorMessage,
  address,
  email,
  firstName,
  lastName,
  gender,
  phoneNumber,
  dateOfBirth,
  classId,
  subClassId,
  setIsError,
  setIsLoading,
  setSuccess,
  setStudentChange,
  enrollmentDate,
}: AddStudentTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (token) {
    const schoolId = token.schoolId;

    try {
      const response = await fetch(`${BASE_URL}/students/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          schoolId,
          gender,
          email,
          classId,
          subClassId,
          address,
          phoneNumber,
          enrollmentDate,
          dateOfBirth,
          status: "active",
          password: generatePassword(lastName),
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setIsLoading(false);
        setSuccess(true);
        setStudentChange();
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
  } else {
    setIsError(true);
    setErrorMessage("Not authorized");
  }
};
