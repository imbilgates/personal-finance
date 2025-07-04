"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

export default function TransactionForm({ onAdd, editing, setEditing }) {
  const defaultForm = {
    amount: "",
    description: "",
    date: "",
    category: "Other",
  };

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing && editing._id) {
      setForm({
        amount: editing.amount?.toString() ?? "",
        description: editing.description ?? "",
        date: editing.date ?? "",
        category: editing.category ?? "Other",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editing]);

  const validate = () => {
    const newErrors = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!form.description || form.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters.";
    }
    if (!form.date) {
      newErrors.date = "Please select a valid date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const method = editing && editing._id ? "PUT" : "POST";
    const url = editing && editing._id
      ? `/api/transactions/${editing._id}`
      : "/api/transactions";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(defaultForm);
    setEditing(null);
    onAdd();
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setErrors({});
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount Input */}
      <div>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
      </div>

      {/* Description Input */}
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Date Input */}
      <div>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>

      {/* Category Dropdown */}
      <div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option disabled value="">
            Select Category
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end">
        <Button type="submit">
          {editing && editing._id ? "Update" : "Add"} Transaction
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
