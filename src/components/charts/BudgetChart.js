"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetChart({ budgets, transactions }) {
  const actualMap = {};
  transactions.forEach((tx) => {
    actualMap[tx.category] = (actualMap[tx.category] || 0) + tx.amount;
  });

  const allCategories = new Set([
    ...budgets.map((b) => b.category),
    ...transactions.map((t) => t.category),
  ]);

  const data = Array.from(allCategories).map((cat) => ({
    category: cat,
    budgeted: budgets.find((b) => b.category === cat)?.amount || 0,
    actual: actualMap[cat] || 0,
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgeted" fill="#10b981" name="Budgeted" />
          <Bar dataKey="actual" fill="#ef4444" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
