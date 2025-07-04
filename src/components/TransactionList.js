"use client";

import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onEdit, editing }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => {
          const isEditing = editing && editing._id === tx._id;
          return (
            <li
              key={tx._id}
              className={`border p-3 rounded flex justify-between items-center transition-colors ${
                isEditing
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div>
                ₹{tx.amount} - {tx.description} ({tx.date})
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="cursor-pointer" onClick={() => onEdit(tx)}>
                  Edit
                </Button>
                <Button variant="destructive" className="cursor-pointer" onClick={() => onDelete(tx._id)}>
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
