"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useLoadingButton } from "@/hooks/useLoadingButton";
import { formatMonthYear } from "@/lib/utils/formatMonth"; 

export default function BudgetList({ budgets, onEdit, highlightedId }) {
  const { fetchBudgets } = useFinance();
  const { wrap } = useLoadingButton();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    wrap(async () => {
      await fetch(`/api/budgets/${id}`, { method: "DELETE" });
      await fetchBudgets();
      setDeletingId(null);
    });
  };

  return (
    <ul className="space-y-4">
      {budgets.map((budget) => {
        const isDeleting = deletingId === budget._id;
        const isHighlighted = highlightedId === budget._id;

        return (
          <li
            key={budget._id}
            className={`flex justify-between items-center p-3 rounded-md ${
              isHighlighted
                ? "bg-red-100 dark:bg-red-900 border border-red-500"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <div>
              <p className="font-medium text-indigo-700 dark:text-indigo-400">
                {budget.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ₹{budget.amount} for{" "}
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {formatMonthYear(budget.month)}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(budget)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(budget._id)}
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="animate-spin size-4 mr-2" />}
                Delete
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
