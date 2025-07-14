import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((req) => {
  const cookie = Cookies.get("user_token");
  let token = "";
  try {
    token = JSON.parse(cookie)?.token || "";
  } catch (err) {
    console.warn("Invalid token format");
  }

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const initializeResInterceptor = (removeSession) => {
  return axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        const currentPath = window.location.pathname + window.location.search;

        if (window.location.pathname.startsWith("/auth/sign-in")) {
          return Promise.reject(error);
        }

        const redirectTo = encodeURIComponent(currentPath);
        removeSession(redirectTo);
      }
      return Promise.reject(error);
    }
  );
};
