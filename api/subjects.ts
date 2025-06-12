"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";
import {
  AddSubjectTypes,
  GetLessonsTypes,
  GetSubjectsTypes,
  UpdateSubjectTypes,
} from "@/types/SubjectsTypes";

export const getSubjects = async ({
  setSubjectData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  classId,
  subClassId,
  page = 1,
  pageSize = 15,
}: GetSubjectsTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

 
  let endpoint = id ? `${BASE_URL}/subjects/${id}` : `${BASE_URL}/subjects`;

  
  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (classId) params.append("classId", classId);
    if (subClassId) params.append("subClassId", subClassId);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));

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
      setSubjectData(data.data);
    } else {
      setIsError(true);
      setErrorMessage(data.title || "Error fetching subjects");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


export const addSubject = async ({
  classId,
  subClassId,
  name,
  isMandotory,
  setIsLoading,
  setIsError,
  setErrorMessage,
  setSuccess,
  setAddSubjectChange,
}: AddSubjectTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (token) {
    const schoolId = token.schoolId;

    try {
      const response = await fetch(`${BASE_URL}/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          name,
          schoolId,
          classId,
          subClassId,
          isMandotory,
          status: "active",
        }),
      });

      const data = await response.json();
      if (response.status == 201) {
        setIsLoading(false);
        setSuccess(true);
        setAddSubjectChange();
      } else {
        setIsError(true);
        setErrorMessage(data.title);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
};

export const upDateSubject = async ({
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
  classId,
  subClassId,
  name,
  isMandotory,
  setSuccess,
  setUpdateSubjectChange,
}: UpdateSubjectTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/subjects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          name,
          classId,
          subClassId,
          isMandotory,
          schoolId: token.schoolId,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setIsLoading(false);
        setUpdateSubjectChange();
        setSuccess(true);
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
  }
};

export const deleteSubject = async ({
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
  setAddSubjectChange,
}: {
  setIsLoading: (state: boolean) => void;
  setIsError: (state: boolean) => void;
  setErrorMessage: (message: string) => void;
  id: string;
  setAddSubjectChange: () => void;
}) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/subjects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (response.status == 204) {
        setIsLoading(false);
        setAddSubjectChange();
      } else {
        const data = await response.json();
        setIsError(true);
        setErrorMessage(data.title);
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
};



export const getLessons = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  classId,
  subClassId,
  teacherId,
  subjectId,
  page = 1,
  pageSize = 15,
}: GetLessonsTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

 
  let endpoint = id ? `${BASE_URL}/lessons/${id}` : `${BASE_URL}/lessons`;

  
  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (classId) params.append("classId", classId);
    if (subClassId) params.append("subClassId", subClassId);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));
    if (teacherId) params.append("teacherId", teacherId);
    if (subjectId) params.append("subjectId", subjectId);


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
      setErrorMessage(data.title || "Error fetching subjects");
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};