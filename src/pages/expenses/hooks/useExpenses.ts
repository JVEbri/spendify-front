// src/pages/expenses/hooks/useExpenses.ts

import { useEffect } from "react";
import { useGroupsStore } from "../../../stores/groupStore";
import { useExpensesStore } from "../../../stores/expensesStore";
import { useExpensesFilters } from "./useExpensesFilters";

export function useExpenses() {
  const { selectedGroup } = useGroupsStore();
  const { expenses, fetchExpenses, isLoading, error } = useExpensesStore();
  const { month, year } = useExpensesFilters();

  useEffect(() => {
    if (selectedGroup) {
      fetchExpenses(selectedGroup.id, {
        month: String(month),
        year: String(year),
      });
    }
  }, [selectedGroup, month, year]);

  return { expenses, isLoading, error };
}
