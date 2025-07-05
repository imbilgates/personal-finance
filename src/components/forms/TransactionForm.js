"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { showToast } from "@/lib/utils/toastUtils";

export default function TransactionForm({
  onAdd,
  editing,
  setEditing,
  wrap,
  loading,
}) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    wrap(async () => {
      const isEdit = editing && editing._id;
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `/api/transactions/${editing._id}`
        : "/api/transactions";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast({
          type: "success",
          message: isEdit
            ? "Transaction updated successfully"
            : "Transaction added successfully",
        });
        setForm(defaultForm);
        setEditing(null);
        onAdd();
      } else {
        showToast({
          type: "error",
          message: isEdit
            ? "Failed to update transaction"
            : "Failed to add transaction",
        });
      }
    });
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
          className="w-full p-2 rounded-md border"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Description Input */}
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Date Input */}
      <div>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      {/* Category Dropdown */}
      <div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded-md border"
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
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin size-4 mr-2" />}
          {editing && editing._id ? "Update" : "Add"} Transaction
        </Button>
        {editing && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
