import axios from "../utils/axiosInstance";

export const CheckUser = async ({ data }) => {
  try {
    const response = await axios.post("/users/authenticate", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CreateUser = async (finalObj) => {
  try {
    const response = await axios.post(`/users`, finalObj);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUserDetails = async (finalObj) => {
  try {
    const { userId } = finalObj;
    const response = await axios.put(`/users/${userId}`, finalObj);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLoggedUser = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
