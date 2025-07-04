"use client";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onEdit, editing }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {/* Header */}
      <div className="hidden sm:grid grid-cols-[100px_120px_120px_1fr_auto] font-medium text-sm text-gray-600 dark:text-gray-300 px-4 py-2 border-b">
        <span>Amount</span>
        <span>Category</span>
        <span>Date</span>
        <span>Description</span>
        <span className="text-right">Actions</span>
      </div>

      <ul className="space-y-2">
        {transactions.map((tx) => {
          const isEditing = editing && editing._id === tx._id;

          return (
            <li
              key={tx._id}
              className={`grid grid-cols-1 sm:grid-cols-[100px_120px_120px_1fr_auto] items-center gap-2 sm:gap-4 px-4 py-3 rounded-lg border transition-colors ${
                isEditing
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{tx.amount}</span>

              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full font-medium w-fit">
                {tx.category}
              </span>

              <span className="text-sm text-gray-600 dark:text-gray-300">{tx.date}</span>

              <span className="text-sm text-gray-800 dark:text-gray-100">{tx.description}</span>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => onEdit(tx)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => onDelete(tx._id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
