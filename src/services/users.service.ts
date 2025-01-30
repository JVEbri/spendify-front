import axios from "./api.service";
export interface User {
  id: string;
  name: string;
  email: string;
}
export const getUsersService = async (): Promise<User[]> => {
  const response = await axios.get("/users");
  return response.data;
};
