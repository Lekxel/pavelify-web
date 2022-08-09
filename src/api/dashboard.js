import { get, post } from "utilities/network";

export const httpFetchStats = () => {
  return get("/dashboard/stats");
};

export const httpGetChartStats = (filter) => {
  return post(`/dashboard/chartStats`, { filter });
};

export const httpFetchContacts = (channel, page) => {
  return get(`/dashboard/contacts?channel=${channel}&page=${page}`);
};

export const httpCountStats = () => {
  return get("/dashboard/countStats");
};
