"use client";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function getMonthLabel(monthString) {
  const [year, month] = monthString.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return format(date, "MMMM yyyy");
}

export default function BudgetChart({ budgets, transactions }) {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const availableMonths = Array.from(new Set(budgets.map((b) => b.month))).sort(
    (a, b) => b.localeCompare(a)
  );

  const filteredBudgets = useMemo(() => {
    return selectedMonth !== "all"
      ? budgets.filter((b) => b.month === selectedMonth)
      : budgets;
  }, [budgets, selectedMonth]);

  const filteredTransactions = useMemo(() => {
    return selectedMonth !== "all"
      ? transactions.filter((t) => t.date.startsWith(selectedMonth))
      : transactions;
  }, [transactions, selectedMonth]);

  const actualMap = {};
  filteredTransactions.forEach((tx) => {
    actualMap[tx.category] = (actualMap[tx.category] || 0) + tx.amount;
  });

  const allCategories = new Set([
    ...filteredBudgets.map((b) => b.category),
    ...filteredTransactions.map((t) => t.category),
  ]);

  const data = Array.from(allCategories).map((cat) => ({
    category: cat,
    budgeted: filteredBudgets.find((b) => b.category === cat)?.amount || 0,
    actual: actualMap[cat] || 0,
  }));

  return (
    <div className="w-full space-y-4">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-semibold">🎯 Budget vs Actual</h2>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select month..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {availableMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {getMonthLabel(month)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
