"use client";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function BudgetForm({ onSave }) {
  const [form, setForm] = useState({ category: "", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || form.amount <= 0) return;

    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: form.category,
        amount: Number(form.amount),
        month: new Date().toISOString().slice(0, 7), // "YYYY-MM"
      }),
    });

    setForm({ category: "", amount: "" });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 rounded-md border"
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Budget Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 rounded-md border"
      />
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
