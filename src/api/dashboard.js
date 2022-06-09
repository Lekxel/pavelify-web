import { get } from "utilities/network";

export const httpFetchStats = () => {
  return get("/dashboard/stats");
};
