import { LessonTypes } from "@/types/SubjectsTypes";
import { CreateLesson, GetLessons } from "@/types/QueryTypes";
import { BASE_URL } from "@/constants/BASE_URL";
import { useTokenStore } from "@/context/token";

export const createLesson = async ({
  SchoolId,
  classId,
  dayTime,
  setErrorMessage,
  setIsError,
  setIsLoading,
  setIsSuccess,
  subClassId,
  subjectId,
  teacherId,
  topic,
  weekDay,
  setLessons,
  setShowModal,
}: CreateLesson) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setIsSuccess(false);

  const token = useTokenStore.getState().token;

  const newLesson: Omit<LessonTypes, "id"> = {
    dayTime,
    teacherId: teacherId,
    subjectId,
    topic,
    classId: classId,
    SchoolId: SchoolId,
    subClassId,
    term: "1",
    weekDay,
    academicYear: "2025-07-15T22:27:42.411Z",
    weekNumber: 0,
    status: "scheduled",
  };

  try {
    const response = await fetch(`${BASE_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newLesson),
    });

    const result = await response.json();

    if (response.status == 201) {
      setLessons((prev: any) => [...prev, result.data]);
      setShowModal(false);
      setIsLoading(false);
    } else {
      setIsError(true);
      setErrorMessage(result.title || "something went wrong");
    }
  } catch (err) {
    alert("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


export const getLessons = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  classId,
  searchQuery,
  subClassId,
  teacherId,
  id
}: GetLessons) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  const token = useTokenStore.getState().token;
  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/lessons/${id}` : `${BASE_URL}/lessons`;

  if (!id) {
    const params = new URLSearchParams();

    if (searchQuery) params.append("searchQuery", searchQuery);
    if(classId) params.append("classId", classId);
    if(subClassId) params.append("subClassId", subClassId);
    if(teacherId) params.append("teacherId", teacherId);

    endpoint += `?${params.toString()}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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