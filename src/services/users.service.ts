import axios from "./api.service";
import { User } from "../types/user";
export const getUsersService = async (): Promise<User[]> => {
  const response = await axios.get("/users");
  return response.data;
};

export const getMeService = async (): Promise<User> => {
  const response = await axios.get("/users/me");
  return response.data;
};
