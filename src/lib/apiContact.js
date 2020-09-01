import axios from "axios";

export const getAllContacts = async () => {
  const { data } = await axios.get(`/api/contacts`);
  return data;
};

export const getContact = async id => {
  const { data } = await axios.get(`/api/contacts/${id}`);
  return data;
};

export const createNewContact = async contactData => {
  const { data } = await axios.post(`/api/contacts`, contactData);
  return data;
};

export const updateContact = async contactData => {
  const { data } = await axios.put(`/api/contacts/${contactData._id}`, contactData);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/api/contacts/${id}`);
  return data;
};