import axios from "axios";
const BaseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL!}/api`;
export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});
