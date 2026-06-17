import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { ROUTES } from "../../Constants";
import { HTTP_STATUS } from "../../Constants/HttpStatus";
import { getToken, Storage } from "../../Utils";
import type { Params } from "../../Types";

let isRedirecting = false;

export async function Get<T>(
  url: string,
  params?: Params,
  headers?: Record<string, string>,
): Promise<T> {
  const authToken = getToken();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: authToken,
      "Cache-Control":
        "no-store , no-cache , must-revalidate ,proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...headers,
    },
    params,
  };

  try {
    const response = await axios.get<T>(BASE_URL + url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status?: string }>;

    if (
      axiosError?.response?.status === HTTP_STATUS.TOKEN_EXPIRED &&
      !isRedirecting
    ) {
      Storage.clear();
      isRedirecting = true;
      window.location.href = ROUTES.HOME;
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      // ShowNotification(ErrorMessage(error), "error");
      console.error("error", error);
    }
    throw null;
  }
}
