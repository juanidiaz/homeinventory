import axios from "axios";

export const getAllCompanies = async () => {
  const { data } = await axios.get(`/api/companies`);
  return data.data;
};

export const getCompany = async id => {
  const { data } = await axios.get(`/api/companies/${id}`);
  return data.data;
};

export const createNewCompany = async companyData => {
  const { data } = await axios.post(`/api/companies`, companyData);
  return data.data;
};

export const updateCompany = async companyData => {
  const { data } = await axios.put(`/api/companies/${companyData._id}`, companyData);
  return data.data;
};

export const deleteCompany = async id => {
  const { data } = await axios.delete(`/api/companies/${id}`);
  return data.data;
};
