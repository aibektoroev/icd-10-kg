import axios from "axios";
import utils from "./utils";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      // No connection to the server or server did not respond... Handle error in caller function
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      // Authorization error... Handle error in caller function
      //window.location.href = "/login/";

      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const token = utils.getToken();

      if (token.token && token.valid) {
        return axiosInstance
          .post("/token/refresh/", { refresh: token.token })
          .then((response) => {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + response.data.access;
            originalRequest.headers["Authorization"] =
              "JWT " + response.data.access;

            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Refresh token not available or expired");
        //window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
