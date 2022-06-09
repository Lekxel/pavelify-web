import axios from "Lib/Axios/axios";
import { toast } from "react-toastify";
import { publicRoutes } from "routes/routes";
import { currentUserAuthToken } from "utilities/storage";

const baseURL = process.env.REACT_APP_BASE_URL;

export const post = (url, data) => {
  return axios
    .post(`${baseURL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${currentUserAuthToken() || ""}`
      }
    })
    .then(({ data, status }) => {
      if (status === 401) {
        window.location.replace(publicRoutes.login);
      }
      return data;
    })
    .catch(({ response }) => {
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
        Authorization: `Bearer ${currentUserAuthToken() || ""}`
      }
    })

    .then(({ data }) => data)

    .catch(({ response }) => {
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
        Authorization: `Bearer ${currentUserAuthToken() || ""}`
      }
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
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
        Authorization: `Bearer ${currentUserAuthToken() || ""}`
      }
    })
    .then(({ data }) => data)
    .catch(({ response }) => {
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
        Authorization: `Bearer ${currentUserAuthToken() || ""}`
      }
    })
    .catch(({ response }) => {
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
