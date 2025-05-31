import { useExpenses } from "./hooks/useExpenses";
import ExpensesTable from "../../components/ExpensesTable";
import { useExpensesFilters } from "./hooks/useExpensesFilters";
import MonthTabs from "./components/MonthTabs";

export default function Expenses() {
  const { expenses, isLoading, error } = useExpenses();
  const { year, setYear } = useExpensesFilters();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="h-screen w-full px-4 py-8 bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark">
      <div className="max-w-6xl mx-auto bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Gastos</h1>

        {/* Filtros de año y mes */}
        <div className="flex justify-between items-center mb-6 gap-4">
          {/* Año a la izquierda */}
          <div>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="h-10 px-3 rounded border bg-white dark:bg-gray-800 dark:text-white text-sm"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Meses a la derecha */}
          <div className="flex gap-2">
            <MonthTabs />
          </div>
        </div>

        {/* Contenido */}
        {isLoading ? (
          <p>Cargando gastos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ExpensesTable expenses={expenses} />
        )}
      </div>
    </div>
  );
}
