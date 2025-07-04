"use client";
import { Button } from "@/components/ui/button";

export default function BudgetList({ budgets, onEdit, onDelete }) {
  if (!budgets.length) {
    return <p className="text-gray-500">No budgets set yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {budgets.map((budget) => (
        <li
          key={budget._id}
          className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
        >
          <div>
            <p className="font-medium">{budget.category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ₹{budget.amount} for {budget.month}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(budget)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(budget._id)}>
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
