import { GetGuardians, UpdateGuardian } from "@/types/GuardianTypes";
import { BASE_URL } from "@/constants/BASE_URL";
import { useTokenStore } from "@/context/token";

export const getGuardians = async ({
  setData,
  setErrorMessage,
  setIsLoading,
  setIsError,
  id,
  search,
  page = 1,
  pageSize = 15,
}: GetGuardians) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");

  const token = useTokenStore.getState().token;
  if (!token) throw new Error("Not authorized");

  let endpoint = id ? `${BASE_URL}/Guardians/${id}` : `${BASE_URL}/Guardians`;

  if (!id) {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (pageSize) params.append("pageSize", String(pageSize));

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

export const updateGuardian = async ({
  setErrorMessage,
  setIsLoading,
  setSuccess,
  setIsError,
  setGuardianChange,
  id,
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  address,
  status,
}: UpdateGuardian) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setSuccess(false);

  const token = useTokenStore.getState().token;
  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/Guardians/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      firstName,
      lastName,
      gender,
      email,
      address,
      phoneNumber,
      status
    }),
  });

  try {
    if (response.status == 200) {
      setSuccess(true);
      setGuardianChange();
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
