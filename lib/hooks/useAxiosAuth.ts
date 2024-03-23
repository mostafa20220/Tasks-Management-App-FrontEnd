"use client";
import axiosAuth from "lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  const  [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.tokens?.accessToken || ""}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent && retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          prevRequest.sent = true;
          const tokens = await refreshToken();
          if (tokens) {
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${tokens?.accessToken || ""}`;
            session.tokens.accessToken = tokens?.accessToken;
            session.tokens.refreshToken = tokens?.refreshToken;
            return axiosAuth(prevRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken, retryCount]);

  return axiosAuth;
};

export default useAxiosAuth;
