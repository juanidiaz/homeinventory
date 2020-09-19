import axios from "axios";
import absoluteUrl from 'next-absolute-url';

export const getAllContacts = async () => {
  const { data } = await axios.get(`/api/contacts`);
  return data.data;
};

export const getContact = async (ctx, id) => {
  const { origin } = absoluteUrl(ctx.req);
  const { data } = await axios.get(origin + `/api/contacts/${id}`);
  return data.data;
};

export const createNewContact = async contactData => {
  const { data } = await axios.post(`/api/contacts`, contactData);
  return data.data;
};

export const updateContact = async contactData => {
  const { data } = await axios.put(`/api/contacts/${contactData._id}`, contactData);
  return data.data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/api/contacts/${id}`);
  return data.data;
};
