import { create } from "zustand";
import {
  getExpensesByGroup,
  createExpense,
  updateExpense,
  deleteExpense,
  addMetaColumnService,
  removeMetaColumnService,
  renameMetaColumnService,
} from "../services/expenses.service";
import toast from "react-hot-toast";
import { Expense, ExpensePayload } from "../types/expense";

interface ExpensesStore {
  expenses: Expense[]; // lo que guardas
  isLoading: boolean;
  error: string | null;
  fetchExpenses: (
    groupId: string,
    filters?: Record<string, string>
  ) => Promise<void>;
  addExpense: (expense: Partial<ExpensePayload>) => Promise<void>;
  updateExpense: (id: string, data: Partial<ExpensePayload>) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  addMetaColumn: (
    groupId: string,
    month: number,
    year: number,
    key: string
  ) => Promise<void>;
  removeMetaColumn: (
    groupId: string,
    month: number,
    year: number,
    key: string
  ) => Promise<void>;
  renameMetaColumn: (
    groupId: string,
    month: number,
    year: number,
    oldKey: string,
    newKey: string
  ) => Promise<void>;
}

export const useExpensesStore = create<ExpensesStore>((set, get) => ({
  expenses: [],
  isLoading: false,
  error: null,

  fetchExpenses: async (groupId, filters) => {
    set({ isLoading: true });
    try {
      const expenses = await getExpensesByGroup(groupId, filters);
      set({ expenses, isLoading: false });
    } catch (error) {
      toast.error(`No tienes acceso a esta invitación ❌${error}`);
      set({ error: "Error al cargar los gastos", isLoading: false });
    }
  },

  addExpense: async (expense) => {
    try {
      const newExpense = await createExpense(expense);
      set((state) => ({ expenses: [...state.expenses, newExpense] }));
    } catch {
      console.error("Error creando gasto");
    }
  },

  updateExpense: async (id, data) => {
    try {
      const updated = await updateExpense(id, data);
      set((state) => ({
        expenses: state.expenses.map((e) => (e.id === id ? updated : e)),
      }));
    } catch {
      console.error("Error actualizando gasto");
    }
  },

  removeExpense: async (id) => {
    try {
      await deleteExpense(id);
      set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id),
      }));
    } catch {
      console.error("Error borrando gasto");
    }
  },

  addMetaColumn: async (groupId, month, year, key) => {
    try {
      await addMetaColumnService(groupId, month, year, key);
      await get().fetchExpenses(groupId, {
        month: String(month),
        year: String(year),
      });
    } catch (err) {
      console.error("Error añadiendo columna", err);
    }
  },

  removeMetaColumn: async (groupId, month, year, key) => {
    try {
      await removeMetaColumnService(groupId, month, year, key);
      await get().fetchExpenses(groupId, {
        month: String(month),
        year: String(year),
      });
    } catch (err) {
      console.error("Error eliminando columna", err);
    }
  },
  renameMetaColumn: async (groupId, month, year, oldKey, newKey) => {
    try {
      await renameMetaColumnService(groupId, month, year, oldKey, newKey);
      await get().fetchExpenses(groupId, {
        month: String(month),
        year: String(year),
      });
    } catch (err) {
      console.error("Error renombrando columna", err);
    }
  },
}));
