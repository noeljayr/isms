import { BASE_URL } from "@/constants/BASE_URL";
import { useTokenStore } from "@/context/token";
import { GetSchoolTypes } from "@/types/SchoolTypes";

export const getSchool = async ({
  setData,
  setIsLoading,
  setIsError,
  setErrorMessage,
  id,
}: GetSchoolTypes) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  const token = useTokenStore.getState().token;
  if (!token) throw new Error("Not authorized");

  let endpoint = `${BASE_URL}/schools/${id}`;

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
      setData(data);
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
