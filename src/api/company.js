import { get, post } from "utilities/network";

export const httpCompanyInfo = (companyID) => {
  return get(`/company/info/${companyID}`);
};

export const httpUpdateCompany = (payload) => {
  return post(`/company/update`, payload);
};
