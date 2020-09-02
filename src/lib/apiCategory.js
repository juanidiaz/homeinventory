import axios from "axios";

export const getAllCategories = async () => {
  const { data } = await axios.get(`/api/categories`);
  return data.data;
};

export const getCategory = async id => {
  const { data } = await axios.get(`/api/categories/${id}`);
  return data.data;
};

export const createNewCategory = async categoryData => {
  const { data } = await axios.post(`/api/categories`, categoryData);
  return data.data;
};

export const updateCategory = async categoryData => {
  const { data } = await axios.put(`/api/categories/${categoryData._id}`, categoryData);
  return data.data;
};

export const deleteCategory = async id => {
  const { data } = await axios.delete(`/api/categories/${id}`);
  return data.data;
};
