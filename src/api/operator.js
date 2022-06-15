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
