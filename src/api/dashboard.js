import { get, post } from "utilities/network";

export const httpFetchStats = () => {
  return get("/dashboard/stats");
};

export const httpGetChartStats = (filter) => {
  return post(`/dashboard/chartStats`, { filter });
};
