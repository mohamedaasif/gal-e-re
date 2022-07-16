import axios from "axios";
import { BASE_URL } from "../constants/constants";

// POST REQUEST
export const postRequest = async (api, data) => {
  return await axios.post(BASE_URL + api, data);
};

// GET REQUEST
export const getRequest = async (api, token) => {
  return await axios.get(BASE_URL + api, {
    headers: {
      "x-access-token": token,
    },
  });
};

// PUT REQUEST
export const updateRequest = async (api, data) => {
  return await axios.put(BASE_URL + api, data);
};

// DELETE REQUEST
export const deleteRequest = async (api) => {
  return await axios.delete(BASE_URL + api);
};

// DELETE REQUEST WITH BODY(DATA)
export const deleteRequestWithData = async (api, password) => {
  // delete requests with a body need it to be set under a key named "data"
  return await axios.delete(BASE_URL + api, {
    data: { password },
  });
};
