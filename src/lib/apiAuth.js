import axios from "axios";

export const loginUser = async loginData => {
  const { data } = await axios.post(`/api/login`, loginData);
  return data
};
