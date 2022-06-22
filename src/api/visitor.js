import { get } from "utilities/network";

export const httpFetchVisitors = (status) => {
  return get(`/visitors/fetch?status=${status}`);
};

export const httpPreviousConversations = (companyID, uuid) => {
  return get(`/visitors/previousConversations/${companyID}/${uuid}`);
};
