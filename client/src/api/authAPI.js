import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (user) => {
  const response = await authAPI.post("/login", user);
  return response.data;
};

export const registerUser = async (user) => {
  const response = await authAPI.post("/register", user);
  return response.data;
};
