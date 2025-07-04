"use client";

export default function SummaryCards({ transactions }) {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const mostRecent = transactions.slice(0, 3);
  const categoryTotals = {};

  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Total Expenses */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 shadow-md">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">Total Expenses</p>
        <p className="text-2xl font-bold text-blue-900 dark:text-white">₹{total}</p>
      </div>

      {/* Top Category */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-800 shadow-md">
        <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">Top Category</p>
        <p className="text-2xl font-bold text-green-900 dark:text-white">{topCategory || "N/A"}</p>
      </div>

      {/* Most Recent */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-100 dark:from-purple-900 dark:to-purple-800 shadow-md">
        <p className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-1">Recent Transactions</p>
        <ul className="mt-2 space-y-1 text-sm text-purple-900 dark:text-purple-100">
          {mostRecent.length === 0 && <li>No recent transactions.</li>}
          {mostRecent.map((tx) => (
            <li key={tx._id}>
              ₹{tx.amount} • {tx.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
