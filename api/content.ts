import { useTokenStore } from "@/context/token";
import { BASE_URL } from "@/constants/BASE_URL";
import { UploadContentQuery, UploadFile } from "@/types/QueryTypes";

export const uploadContent = async ({
  setErrorMessage,
  setIsLoading,
  setIsSuccess,
  setIsError,
  allowDownload,
  allowPrinting,
  allowedClassLevels,
  allowedRoles,
  author,
  contentType,
  description,
  fileSize,
  subject,
  tags,
  title,
}: UploadContentQuery) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setIsSuccess(false);

  const token = useTokenStore.getState().token;
  const schoolId = useTokenStore.getState().SchoolId
  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/digital-contents/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      allowDownload,
      allowPrinting,
      allowedClassLevels,
      allowedRoles,
      author,
      contentType,
      description,
      fileSize,
      schoolId,
      subject,
      tags,
      title,
    }),
  });

  try {
    if (response.status == 201) {
      setIsSuccess(true);
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

export const uploadFile = async ({
  setErrorMessage,
  setIsLoading,
  setIsError,
  setIsSuccess,
  file,
  setData,
}: UploadFile) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setIsSuccess(false);

  const formData = new FormData();
  formData.append("file", file);

  const token = useTokenStore.getState().token;
  if (!token) throw new Error("Not authorized");

  const response = await fetch(`${BASE_URL}/uploads/content`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  try {
    if (response.status == 200) {
      setIsSuccess(true);
      setData(data);
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
