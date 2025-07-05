export function formatMonthYear(ymString) {
  if (!ymString) return "";
  const [year, month] = ymString.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}
