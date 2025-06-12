import { token } from "@/app/auth/token";
import { BASE_URL } from "@/constants/BASE_URL";
import { GetExamTypes } from "@/types/ExamTypes";



export const getExams = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  search,
  id,
  classId,
  subClassId,
  teacherId,
  page = 1,
  pageSize = 15,
}: GetExamTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  if (!token) throw new Error("Not authorized");

 
  let endpoint = id ? `${BASE_URL}/exams/${id}` : `${BASE_URL}/exams`;

  
  if (!id) {
    const params = new URLSearchParams();

    if (search) params.append("searchQuery", search);
    if (classId) params.append("classId", classId);
    if (subClassId) params.append("subClassId", subClassId);
    if (teacherId) params.append("teacherId", teacherId);
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
