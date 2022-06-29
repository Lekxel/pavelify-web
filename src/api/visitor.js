import { get } from "utilities/network";

export const httpFetchVisitors = (status, engaged = "") => {
  return get(`/visitors/fetch?status=${status}&engaged=${engaged}`);
};

export const httpPreviousConversations = (companyID, uuid) => {
  return get(`/visitors/previousConversations/${companyID}/${uuid}`);
};
