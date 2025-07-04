"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#3b82f6", "#a855f7"];

export default function CategoryPieChart({ transactions }) {
  const categoryData = {};

  transactions.forEach((tx) => {
    categoryData[tx.category] = (categoryData[tx.category] || 0) + tx.amount;
  });

  const data = Object.keys(categoryData).map((cat) => ({
    name: cat,
    value: categoryData[cat],
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Spending by Category</h2>
      <PieChart width={320} height={320}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
