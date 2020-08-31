import axios from "axios";

export const getAllLocations = async () => {
  const { data } = await axios.get(`/api/locations`);
  return data;
};

export const getLocation = async id => {
  const { data } = await axios.get(`/api/locations/${id}`);
  return data;
};

export const createNewLocation = async locationData => {
  const { data } = await axios.post(`/api/locations`, locationData);
  return data;
};

export const updateLocation = async locationData => {
  const { data } = await axios.put(`/api/locations/${locationData._id}`, locationData);
  return data;
};

export const deleteLocation = async id => {
  const { data } = await axios.delete(`/api/locations/${id}`);
  return data;
};
