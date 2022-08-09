import { deleteRequest, get, post } from "utilities/network";

export const httpSaveOperator = (payload, operatorID, isAdd = true) => {
  const editStr = `update/${operatorID}`;
  return post(`/operators/${isAdd ? "add" : editStr}`, payload);
};

export const httpFetchOperators = (page) => {
  return get(`/operators/fetch?page=${page}`);
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

export const httpJoinConversation = (uuid, operator) => {
  return get(`/operators/joinConversation/${uuid}/${operator}`);
};

export const httpForwardChat = (uuid) => {
  return get(`/operators/forwardChat/${uuid}`);
};

export const httpAssignTicket = (ticketID, operator) => {
  return get(`/operators/assignTicket/${ticketID}/${operator}`);
};
