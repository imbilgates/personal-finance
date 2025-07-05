"use client";

import { useFinance } from "@/context/FinanceContext";

export default function SummaryCards() {

  const { transactions } = useFinance();

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const mostRecent = transactions.slice(0, 3);
  const categoryTotals = {};

  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl shadow-md p-6 transition hover:scale-[1.02] hover:shadow-lg">
        <div className="text-blue-800 dark:text-blue-200 text-sm font-semibold mb-2">Total Expenses</div>
        <div className="text-3xl font-bold text-blue-900 dark:text-white">₹{total}</div>
      </div>

      {/* Top Category */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl shadow-md p-6 transition hover:scale-[1.02] hover:shadow-lg">
        <div className="text-green-800 dark:text-green-200 text-sm font-semibold mb-2">Top Category</div>
        <div className="text-2xl font-bold text-green-900 dark:text-white">
          {topCategory || "N/A"}
        </div>
      </div>

      {/* Most Recent Transactions */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl shadow-md p-6 transition hover:scale-[1.02] hover:shadow-lg">
        <div className="text-purple-800 dark:text-purple-200 text-sm font-semibold mb-2">Recent Transactions</div>
        <ul className="text-sm text-purple-900 dark:text-purple-100 space-y-1 mt-1">
          {mostRecent.length === 0 && <li>No recent transactions.</li>}
          {mostRecent.map((tx) => (
            <li key={tx._id} className="flex justify-between">
              <span>₹{tx.amount}</span>
              <span className="text-xs text-right text-purple-700 dark:text-purple-300">{tx.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
