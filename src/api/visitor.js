import { get } from "utilities/network";

export const httpFetchVisitors = (status, engaged = "", currentPage = 1, withVisits = "") => {
  return get(
    `/visitors/fetch?status=${status}&engaged=${engaged}&page=${currentPage}&withVisits=${withVisits}`
  );
};

export const httpPreviousConversations = (companyID, uuid) => {
  return get(`/visitors/previousConversations/${companyID}/${uuid}`);
};

export const httpGetVisitor = (companyID, uuid) => {
  return get(`/visitors/get/${companyID}/${uuid}`);
};
