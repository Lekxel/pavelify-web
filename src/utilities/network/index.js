import axios from "Lib/Axios/axios";
import { toast } from "react-toastify";
import { publicRoutes } from "routes/routes";
import { currentUserAuthToken } from "utilities/storage";

const baseURL = process.env.REACT_APP_BASE_URL;

const logout = () => {
  localStorage.removeItem("token");
  // window.location.href = publicRoutes.login
  window.location.replace(publicRoutes.login);
};

export const post = (url, data) => {
  return axios
    .post(`${baseURL}${url}`, data, {
      headers: {
        Authorization: currentUserAuthToken() ? `Bearer ${currentUserAuthToken() || ""}` : undefined
      }
    })
    .then(({ data, status }) => {
      return data;
    })
    .catch(({ response }) => {
      const { status, data } = response;
      if (status === 401) {
        logout();
      }
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      throw response.data;
    });
};

export const get = (url) =>
  axios
    .get(`${baseURL}${url}`, {
      headers: {
        Authorization: currentUserAuthToken() ? `Bearer ${currentUserAuthToken() || ""}` : undefined
      }
    })

    .then(({ data }) => data)

    .catch(({ response }) => {
      const { status, data } = response;
      if (status === 401) {
        logout();
      }
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      throw response.data;
    });

export const put = (url, data) =>
  axios
    .put(`${baseURL}${url}`, data, {
      headers: {
        Authorization: currentUserAuthToken() ? `Bearer ${currentUserAuthToken() || ""}` : undefined
      }
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, data } = response;
      if (status === 401) {
        logout();
      }
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      throw response.data;
    });

export const deleteRequest = (url) =>
  axios
    .delete(`${baseURL}${url}`, {
      headers: {
        Authorization: currentUserAuthToken() ? `Bearer ${currentUserAuthToken() || ""}` : undefined
      }
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, data } = response;
      if (status === 401) {
        logout();
      }
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      throw response.data;
    });

export const patch = (url, data) =>
  axios
    .patch(`${baseURL}${url}`, data, {
      headers: {
        Authorization: currentUserAuthToken() ? `Bearer ${currentUserAuthToken() || ""}` : undefined
      }
    })
    .catch(({ response }) => {
      const { status, data } = response;
      if (status === 401) {
        logout();
      }
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      throw response.data;
    });
