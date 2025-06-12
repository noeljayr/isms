"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import { token } from "@/app/auth/token";
import {
  AddEventTypes,
  DeleteEventTypes,
  GetEventsTypes,
} from "@/types/EventsTypes";

export const addEvent = async ({
  setIsLoading,
  setIsError,
  setErrorMessage,
  setIsSuccess,
  setAddEventChange,
  title,
  description,
  fromDate,
  toDate,
}: AddEventTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (token) {
    const schoolId = token.schoolId;
    try {
      const response = await fetch(`${BASE_URL}/Event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          title,
          description,
          fromDate,
          toDate,
          schoolId,
        }),
      });

      const data = await response.json();

      if (response.status == 201) {
        setIsLoading(false);
        setIsSuccess(true);
        setAddEventChange();
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

export const getEvents = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  page = 1,
  pageSize = 15,
}: GetEventsTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/Event/${id}` : `${BASE_URL}/Event`;

  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
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

export const deleteEvent = async ({
  setIsLoading,
  setIsError,
  setErrorMessage,
  setIsSuccess,
  setAddEventChange,
  id,
}: DeleteEventTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

  let endpoint = `${BASE_URL}/Event/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      setIsSuccess(true);
      setAddEventChange();
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
