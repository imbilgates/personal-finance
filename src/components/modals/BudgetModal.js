"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";
import { useFinance } from "@/context/FinanceContext";

export default function BudgetModal() {
  const {
    openBudgetModal,
    setOpenBudgetModal,
    budgetEditing,
    setBudgetEditing,
    fetchBudgets,
  } = useFinance();

  const [form, setForm] = useState({
    category: "Other",
    amount: "",
    month: "",
  });

  useEffect(() => {
    if (budgetEditing && budgetEditing._id) {
      setForm({
        category: budgetEditing.category,
        amount: budgetEditing.amount.toString(),
        month: budgetEditing.month,
      });
    } else {
      setForm({ category: "Other", amount: "", month: "" });
    }
  }, [budgetEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = budgetEditing?._id ? "PUT" : "POST";
    const url = budgetEditing?._id
      ? `/api/budgets/${budgetEditing._id}`
      : `/api/budgets`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchBudgets();
      setOpenBudgetModal(false);
      setBudgetEditing(null);
    }
  };

  const handleClose = () => {
    setOpenBudgetModal(false);
    setBudgetEditing(null);
  };

  return (
    <Dialog open={openBudgetModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>{budgetEditing?._id ? "Edit Budget" : "Add Budget"}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 rounded-md border"
              disabled={!!budgetEditing?._id}
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
              disabled={!!budgetEditing?._id}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">
              {budgetEditing?._id ? "Update" : "Add"} Budget
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
