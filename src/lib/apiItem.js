import axios from "axios";

export const getAllItems = async () => {
  const { data } = await axios.get(`/api/items`);
  return data.data;
};

export const getItem = async id => {
  const { data } = await axios.get(`/api/items/${id}`);
  return data.data;
};

export const createNewItem = async itemData => {
  const { data } = await axios.post(`/api/items`, itemData);
  return data.data;
};

export const updateItem = async itemData => {
  const { data } = await axios.put(`/api/items/${itemData._id}`, itemData);
  return data.data;
};

export const deleteItem = async id => {
  const { data } = await axios.delete(`/api/items/${id}`);
  return data.data;
};
