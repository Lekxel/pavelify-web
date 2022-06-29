import { get, post } from "utilities/network";

export const httpCompanyInfo = (companyID) => {
  return get(`/company/info/${companyID}`);
};

export const httpUpdateCompany = (payload) => {
  return post(`/company/update`, payload);
};

export const httpAddDepartment = (payload) => {
  return post(`/company/addDepartment`, payload);
};

export const httpDeleteDepartment = (payload) => {
  return post(`/company/removeDepartment`, payload);
};
