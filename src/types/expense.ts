// Datos que recibes del backend
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  currency: "EUR" | "USD";
  date: string;
  meta?: Record<string, string>;
  user: {
    id: string;
    name: string;
  };
  group: {
    id: string;
  };
}

// Datos que envías al backend
export interface ExpensePayload {
  title: string;
  amount: number;
  category: string;
  currency: "EUR" | "USD";
  date: string;
  groupId: string;
  user_id: string;
  meta?: Record<string, string>;
}
