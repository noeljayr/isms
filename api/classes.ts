"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";


import {
  AddClassTypes,
  AddSubClassTypes,
  GetClassesTypes,
  GetSubClassesTypes,
  UpdateClassTypes,
} from "@/types/ClassesTypes";

export const getClasses = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
  search,
  academicDateFrom,
  academicDateTo,
  page = 1,
  pageSize = 15,
}: GetClassesTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/classes/${id}` : `${BASE_URL}/classes`;

  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (academicDateFrom) params.append("academicDateFrom", academicDateFrom);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));
    if (academicDateFrom) params.append("academicDateFrom", academicDateFrom);
    if (academicDateTo) params.append("academicDateTo", academicDateTo);

    endpoint += `?${params.toString()}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
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

export const getSubClasses = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
  search,
  page = 1,
  pageSize = 15,
  classId,
}: GetSubClassesTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = id
    ? `${BASE_URL}/SubClass/${id}`
    : `${BASE_URL}/SubClass?classId=${classId}`;

  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));
    if (classId) params.append("classId", classId);

    endpoint += `&${params.toString()}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
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

export const updateClass = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setClassChange,
  id,
  name,
}: UpdateClassTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/classes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      name,
      SchoolId: token.schoolId,
    }),
  });

  try {
    if (response.status == 200) {
      setSuccess(true);
      setClassChange();
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

export const addClass = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setClassChange,
  name,
}: AddClassTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/classes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      name,
      SchoolId: token.schoolId,
    }),
  });

  try {
    if (response.status == 200) {
      setSuccess(true);
      setClassChange();
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

export const addSubClass = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  name,
  classId,
  setClassChange,
}: AddSubClassTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/SubClass/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      classId,
      name,
      SchoolId: token.schoolId,
      status: "active",
    }),
  });

  try {
    if (response.status == 201) {
      setSuccess(true);
      setClassChange();
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
