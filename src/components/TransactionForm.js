"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onAdd, editing, setEditing }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
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
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editing) {
      await fetch(`/api/transactions/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditing(null);
    } else {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ amount: "", description: "", date: "" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="cursor-pointer">
          {editing ? "Update Transaction" : "Add Transaction"}
        </Button>
        {editing && (
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            onClick={() => {
              setEditing(null);
              setForm({ amount: "", description: "", date: "" });
              setErrors({});
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
