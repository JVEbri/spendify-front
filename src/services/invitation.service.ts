import axios from "./api.service";
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Invitation {
  id: string;
  email: string;
  groupName: string;
}

export const acceptInvitationService = async (token: string): Promise<void> => {
  await axios.post(`/invitations/accept`, { token });
};

export const getInvitationService = async (
  token: string
): Promise<Invitation> => {
  const response = await axios.get<Invitation>(`/invitations/${token}`);
  return response.data;
};
