"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + tx.amount;
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  chartData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
