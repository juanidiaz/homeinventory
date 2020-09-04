import axios from "axios";

export const getAllSubCategories = async () => {
  const { data } = await axios.get(`/api/subCategories`);
  return data.data;
};

export const getSubCategory = async id => {
  const { data } = await axios.get(`/api/subCategories/${id}`);
  return data.data;
};

export const createNewSubCategory = async subCategoryData => {
  const { data } = await axios.post(`/api/subCategories`, subCategoryData);
  return data.data;
};

export const updateSubCategory = async subCategoryData => {
  const { data } = await axios.put(`/api/subCategories/${subCategoryData._id}`, subCategoryData);
  return data.data;
};

export const deleteSubCategory = async id => {
  const { data } = await axios.delete(`/api/subCategories/${id}`);
  return data.data;
};
