import { deleteRequest, get, post } from "utilities/network";

export const httpSaveOperator = (payload, operatorID, isAdd = true) => {
  const editStr = `update/${operatorID}`;
  return post(`/operators/${isAdd ? "add" : editStr}`, payload);
};

export const httpFetchOperators = () => {
  return get("/operators/fetch");
};

export const httpDeleteOperator = (id) => {
  return deleteRequest(`/operators/remove/${id}`);
};
export const httpGetConversation = (uuid) => {
  return get(`/operators/getConversation/${uuid}`);
};

export const httpSendAttachment = (uuid, attachment) => {
  return post(`/operators/sendAttachment/${uuid}`, { attachment });
};
