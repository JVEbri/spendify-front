// src/utils/dateUtils.ts
export function isCurrentMonth(month: number, year: number) {
  const today = new Date();
  return today.getMonth() + 1 === month && today.getFullYear() === year;
}

export function isFutureMonth(month: number, year: number) {
  const today = new Date();
  return (
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth() + 1)
  );
}
