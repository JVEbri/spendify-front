import { useSearchParams } from "react-router-dom";

export function useExpensesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = Number(searchParams.get("month")) || new Date().getMonth() + 1;
  const year = Number(searchParams.get("year")) || new Date().getFullYear();

  const setMonth = (m: number) => {
    setSearchParams((prev) => {
      prev.set("month", m.toString());
      return prev;
    });
  };

  const setYear = (y: number) => {
    setSearchParams((prev) => {
      prev.set("year", y.toString());
      return prev;
    });
  };

  return { month, year, setMonth, setYear };
}
