import axios from "axios";

export const getAllPolicies = async () => {
  const { data } = await axios.get(`/api/policies`);
  return data;
};

export const getPolicy = async id => {
  const { data } = await axios.get(`/api/policies/${id}`);
  return data;
};

export const createNewPolicy = async policyData => {
  const { data } = await axios.post(`/api/policies`, policyData);
  return data;
};

export const updatePolicy = async policyData => {
  const { data } = await axios.put(`/api/policies/${policyData._id}`, policyData);
  return data;
};

export const deletePolicy = async id => {
  const { data } = await axios.delete(`/api/policies/${id}`);
  return data;
};
