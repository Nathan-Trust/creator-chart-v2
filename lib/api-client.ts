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
  "https://creatorcharts-api.onrender.com/api/";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Optional: Add an interceptor to include authorization token in requests
axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get("creator-charts:token");
    const bearerToken = token ? decrypt(token) : null;

    if (bearerToken) {
      // Check if headers is defined, if not initialize it as an instance of AxiosHeaders
      config.headers = config.headers || new AxiosHeaders();

      // Set Authorization header
      config.headers.set("Authorization", `Bearer ${bearerToken}`);
    }

    return config;
  },
);

// Helper: only redirect to sign-in when the user actually had a session
// (token existed but is now expired/invalid). If there was never a token,
// the user is an unauthenticated visitor on a public page – just let the
// error propagate so components can show an empty state.
function handleUnauthorized() {
  const hadToken = !!Cookies.get("creator-charts:token");
  Cookies.remove("creator-charts:token");
  Cookies.remove("creator-charts:user");

  if (hadToken && typeof window !== "undefined") {
    window.location.href = "/sign-in";
  }
}

// Interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response body contains a 401 status_code
    if (response?.data?.status_code === 401) {
      // handleUnauthorized();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).isContentTooLarge = true;
    }

    if (status === 401) {
      // handleUnauthorized();
    } else {
      // For other errors, log and propagate the message
      console.error("An error occurred:", error?.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
