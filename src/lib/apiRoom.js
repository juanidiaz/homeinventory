import axios from "axios";

export const getAllRooms = async () => {
  const { data } = await axios.get(`/api/rooms`);
  return data;
};

export const getRoom = async id => {
  const { data } = await axios.get(`/api/rooms/${id}`);
  return data;
};

export const createNewRoom = async roomData => {
  const { data } = await axios.post(`/api/rooms`, roomData);
  return data;
};

export const updateRoom = async roomData => {
  const { data } = await axios.put(`/api/rooms/${roomData._id}`, roomData);
  return data;
};

export const deleteRoom = async id => {
  const { data } = await axios.delete(`/api/rooms/${id}`);
  return data;
};
