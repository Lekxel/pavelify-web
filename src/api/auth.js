import { get, post } from "utilities/network";

export const httpLogin = (email, password) => {
  return post("/auth/login", {
    email,
    password
  });
};

export const forgotPassword = (email) => {
  return post("/auth/forgotPassword", {
    email
  });
};

export const resetPassword = (email, password, token) => {
  return post("/auth/confirmResetPassword", {
    email,
    password,
    token
  });
};

export const httpLogout = () => {
  return post("/auth/logout");
};

export const httpGetUser = () => {
  return get("/auth/user");
};
