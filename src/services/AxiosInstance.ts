import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API } from "../utils/constants";

const client = axios.create({
  baseURL: API,
  timeout: 8000,
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (
  error: AxiosError,
  behaviorMap: any
): Promise<AxiosError> => {
  switch (error.response?.status) {
    case 401:
      behaviorMap[401]();
      break;
    default:
      break;
  }

  return Promise.reject(error);
};

export const useAxios = (token: string | undefined, behaviorMap: any) => {
  useEffect(() => {
    client.interceptors.response.use(onResponse, (error: AxiosError) =>
      onResponseError(error, behaviorMap)
    );
  }, []);

  useEffect(() => {
    if (token) {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete client.defaults.headers.common["Authorization"];
    }
  }, [token]);
};

export default client;
