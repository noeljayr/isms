import { BASE_URL } from "@/constants/BASE_URL";
import { Login } from "@/types/QueryTypes";
import { useTokenStore } from "@/context/token";
import { TOKEN_COOKIE_NAME } from "@/middleware";
import { setCookie } from "cookies-next/client";

export const login = async ({
  email,
  password,
  rememberMe,
  setErrorMessage,
  setIsError,
  setIsLoading,
  setIsSuccess,
}: Login) => {
  setIsLoading(true);
  setIsError(false);
  setErrorMessage("");
  setIsSuccess(false);
  try {
    const response = await fetch(`${BASE_URL}/Account/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        rememberme: rememberMe ? "on" : "",
      }),
    });

    const data = await response.json();

    if (response.status == 200) {
      setIsLoading(false);
      setIsSuccess(true);
      setCookie(TOKEN_COOKIE_NAME, data.token);
      useTokenStore.getState().refresh();
    } else {
      setIsError(true);
      setErrorMessage(data.message);
    }
  } catch (err: any) {
    setIsError(true);
    setErrorMessage("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
