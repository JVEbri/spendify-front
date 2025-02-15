import axios from "./api.service";
import { User } from "./users.service";
export interface Group {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  owner: User;

  users: User[];
}

export interface CreateGroupDto {
  name: string;
}

export const getGroupsService = async (): Promise<Group[]> => {
  const response = await axios.get("/groups");
  return response.data;
};

export const createGroupService = async (
  groupData: CreateGroupDto
): Promise<Group> => {
  const response = await axios.post<Group>("/groups", groupData);
  return response.data;
};
