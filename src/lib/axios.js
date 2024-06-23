import axios from "axios";
// import { cookies } from "next/headers";

import { BASE_URL, NEXT_URL } from "./constants";
const axiosBase = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const apiInstance = axios.create({
  // baseURL: baseUrl,
  baseURL: NEXT_URL,
  timeout: 10000, // Timeout 10 seconds
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(async (config) => {
  // const session = cookies().get("session")?.value;
  const session = await apiInstance.get("/api/auth/check");
  console.log("axios instance writing ", session.data);
  if (session) {
    if (!config.headers["Authorization"]) {
      // config.headers.Authorization = `Bearer ${session.accessToken}`;
      config.headers["Authorization"] = `Bearer ${session.data}`;
    }
  }

  return config;
});

export { axiosInstance, apiInstance, axiosBase };
