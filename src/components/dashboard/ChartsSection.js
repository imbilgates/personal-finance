import MonthlyChart from "../charts/MonthlyChart";
import CategoryPieChart from "../charts/CategoryPieChart";

export default function ChartsSection({ transactions }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">📅 Monthly Spending</h2>
        <MonthlyChart transactions={transactions} />
      </div>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">📈 Category-wise Spending</h2>
        <CategoryPieChart transactions={transactions} />
      </div>
    </section>
  );
}
