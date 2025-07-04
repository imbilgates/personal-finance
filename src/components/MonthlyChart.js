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
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <Tooltip formatter={(value) => [`₹${value}`, "Total"]} />
          <Bar dataKey="amount" fill="url(#barColor)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
