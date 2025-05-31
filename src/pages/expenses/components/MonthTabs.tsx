import { useExpensesFilters } from "../hooks/useExpensesFilters";
import { isFutureMonth } from "../../../utils/dateUtils";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function MonthTabs() {
  const { month, year, setMonth } = useExpensesFilters();

  return (
    <div className="flex gap-2 overflow-x-auto ">
      {months.map((label, index) => {
        const m = index + 1;
        const disabled = isFutureMonth(m, year);
        const isActive = m === month;

        return (
          <button
            key={m}
            onClick={() => !disabled && setMonth(m)}
            disabled={disabled}
            className={`px-3 py-2 rounded text-sm font-medium transition 
             ${
               isActive
                 ? "bg-primary-light dark:bg-primary-dark text-white"
                 : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
             }
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-600"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
