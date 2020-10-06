import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const getUserProfile = async id => {
  const { data } = await axios.get(origin + `/api/profiles/${id}`);
  return data.data;
};

export const updateUserProfile = async userProfile => {
  const { data } = await axios.put(`/api/profiles/${userProfile._id}`, userProfile);
  return data.data;
};

