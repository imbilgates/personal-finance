"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";

export default function BudgetModal({ open, editing, onSave, onClose }) {
  const [form, setForm] = useState({
    category: "Other",
    amount: "",
    month: "",
  });

  useEffect(() => {
    if (editing && editing._id) {
      setForm({
        category: editing.category,
        amount: editing.amount.toString(),
        month: editing.month,
      });
    } else {
      setForm({ category: "Other", amount: "", month: "" });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing?._id ? "PUT" : "POST";
    const url = editing?._id
      ? `/api/budgets/${editing._id}`
      : `/api/budgets`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{editing?._id ? "Edit Budget" : "Add Budget"}</DialogTitle>
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
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">
              {editing?._id ? "Update" : "Add"} Budget
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
