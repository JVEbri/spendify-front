import axios from "./api.service";

import type { Expense, ExpensePayload } from "../types/expense";

export const getExpensesByGroup = async (
  groupId: string,
  filters?: Record<string, string>
): Promise<Expense[]> => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`filter[${key}]`, value);
    });
  }

  const { data } = await axios.get(`/expenses/group/${groupId}?${params}`);
  return data;
};

export const createExpense = async (expense: Partial<ExpensePayload>) => {
  const { data } = await axios.post(`/expenses`, expense);
  return data;
};

export const updateExpense = async (
  id: string,
  expense: Partial<ExpensePayload>
) => {
  const { data } = await axios.put(`/expenses/${id}`, expense);
  return data;
};

export const deleteExpense = async (id: string) => {
  await axios.delete(`/expenses/${id}`);
};

export async function addMetaColumnService(
  groupId: string,
  month: number,
  year: number,
  key: string
) {
  await axios.patch(
    `/expenses/group/${groupId}/meta/add?month=${month}&year=${year}`,
    { key }
  );
}

export async function removeMetaColumnService(
  groupId: string,
  month: number,
  year: number,
  key: string
) {
  await axios.patch(
    `/expenses/group/${groupId}/meta/remove?month=${month}&year=${year}`,
    { key }
  );
}

export const renameMetaColumnService = async (
  groupId: string,
  month: number,
  year: number,
  oldKey: string,
  newKey: string
) => {
  await axios.patch(
    `/expenses/group/${groupId}/meta/rename`,
    {
      oldKey,
      newKey,
    },
    {
      params: { month, year },
    }
  );
};
