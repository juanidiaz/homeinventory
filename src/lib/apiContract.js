import axios from "axios";

export const getAllContracts = async () => {
  const { data } = await axios.get(`/api/contracts`);
  return data.data;
};

export const getContract = async id => {
  const { data } = await axios.get(`/api/contracts/${id}`);
  return data.data;
};

export const createNewContract = async contractData => {
  const { data } = await axios.post(`/api/contracts`, contractData);
  return data.data;
};

export const updateContract = async contractData => {
  const { data } = await axios.put(`/api/contracts/${contractData._id}`, contractData);
  return data.data;
};

export const deleteContract = async id => {
  const { data } = await axios.delete(`/api/contracts/${id}`);
  return data.data;
};
