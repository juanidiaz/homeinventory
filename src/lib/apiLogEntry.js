import axios from "axios";

export const getAllLogEntries = async () => {
  const { data } = await axios.get(`/api/logEntries`);
  return data;
};

export const getLogEntry = async id => {
  const { data } = await axios.get(`/api/logEntries/${id}`);
  return data;
};

export const createNewLogEntry = async logEntryData => {
  const { data } = await axios.post(`/api/logEntries`, logEntryData);
  return data;
};

export const updateLogEntry = async logEntryData => {
  const { data } = await axios.put(`/api/logEntries/${logEntryData._id}`, logEntryData);
  return data;
};

export const deleteLogEntry = async id => {
  const { data } = await axios.delete(`/api/logEntries/${id}`);
  return data;
};
