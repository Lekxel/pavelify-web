import { patch, post } from "utilities/network";

export const updateProfile = (payload) => {
  return patch("/profile/update", payload);
};

export const uploadPhoto = (payload) => {
  return post("/profile/uploadPhoto", payload);
};
