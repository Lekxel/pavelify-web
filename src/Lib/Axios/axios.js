import ax from "axios";

const axios = ax.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default axios;
