"use client";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useLoadingButton } from "@/hooks/useLoadingButton";
import { Loader2 } from "lucide-react";

export default function BudgetForm({ editing, onClose, onSave, onConflict }) {
  const { wrap, loading } = useLoadingButton();

  const [form, setForm] = useState({
    category: "Other",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing?._id) {
      setForm({
        category: editing.category,
        amount: editing.amount.toString(),
        month: editing.month,
      });
    } else {
      setForm({
        category: "Other",
        amount: "",
        month: new Date().toISOString().slice(0, 7),
      });
    }
    setErrors({});
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!form.month) {
      newErrors.month = "Month is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    wrap(async () => {
      const method = editing?._id ? "PUT" : "POST";
      const url = editing?._id ? `/api/budgets/${editing._id}` : `/api/budgets`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSave?.();
        onClose?.();
      } else if (res.status === 409) {
        onConflict?.(form.category, form.month);
      } else {
        setErrors({
          category: "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
          disabled={!!editing?._id}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
        />
        {errors.amount && (
          <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
        )}
      </div>

      <div>
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
          disabled={!!editing?._id}
        />
        {errors.month && (
          <p className="text-sm text-red-500 mt-1">{errors.month}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin size-4 mr-2" />}
          {editing?._id ? "Update" : "Add"} Budget
        </Button>
        <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
