import axios from "axios";

import { BASE_URL, NEXT_URL } from "./constants";
const axiosBase = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const apiInstance = axios.create({
  // baseURL: baseUrl,
  baseURL: NEXT_URL,
  timeout: 10000, // Timeout 10 seconds
  headers: { "Content-Type": "application/json" },
});

export { axiosInstance, apiInstance, axiosBase };
