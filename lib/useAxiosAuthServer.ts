import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { Session } from "inspector";
import axios from "axios";



const BASE_URL = "http://localhost:3030";

const axiosAuth =  axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});



async function refreshTokens() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error("No session found, cant refresh tokens");
    throw new Error("No session found, cant refresh tokens");
  }

  const res = await axiosAuth("/auth/refresh", {
    method: "POST",
    headers: { Authorization: `Bearer ${session.tokens.refreshToken}` },
  });

  if (res.status !== 200) {
    console.error("Failed to refresh tokens");
    return res
  }

  session.tokens.accessToken = res.data.tokens.accessToken;
  session.tokens.refreshToken = res.data.tokens.refreshToken;

  // update({
  //   ...session,
  //   tokens: {
  //     accessToken: res.tokens.accessToken,
  //     refreshToken: res.tokens.refreshToken,
  //   },
  //   isUpdated: true,
  // });

  return { ...res.data.tokens };
}

export const useAxiosAuthServer = async () => {
  const session = await getServerSession(authOptions);
  // console.log("before: ", session?.tokens);

  const requestIntercept = axiosAuth.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.tokens?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const tokens = await refreshTokens();

        // console.log("isSuccess - new Tokens:", tokens);
        // console.log("current Session Tokens:", session?.tokens);

        if (tokens) {
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${tokens?.accessToken}`;
          return axiosAuth(prevRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosAuth;
};
