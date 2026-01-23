import axios, {
  type AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { decrypt } from "@/services/encryption";

// Retrieve baseURL from environment variable
const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://creatorcharts-backend.pxxl.click/api/v1";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Important for cookie-based auth
});

// Optional: Add an interceptor to include authorization token in requests
axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get("creator-charts:token");
    const user = token ? decrypt(token) : null;

    if (user) {
      // Check if headers is defined, if not initialize it as an instance of AxiosHeaders
      config.headers = config.headers || new AxiosHeaders();

      // Set Authorization header
      config.headers.set("Authorization", `Bearer ${user}`);
    }

    return config;
  },
);

// Interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response body contains a 401 status_code
    if (response?.data?.status_code === 401) {
      Cookies.remove("creator-charts:token");
      Cookies.remove("creator-charts:user");
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
      return Promise.reject(new Error("Token has expired"));
    }

    return response;
  },
  (error: AxiosError) => {
    const status = error?.response?.status;
    console.error("Error status:", error);

    if (status === 413) {
      error.message =
        "Content too large. Please reduce the file size and try again.";
      // Optionally, you can attach a custom property for UI handling
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).isContentTooLarge = true;
    }

    if (status === 401) {
      Cookies.remove("creator-charts:token");
      Cookies.remove("creator-charts:user");
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    } else {
      // For other errors, log and propagate the message
      console.error("An error occurred:", error?.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
