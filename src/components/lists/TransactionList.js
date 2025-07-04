"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TransactionModal from "@/components/modals/TransactionModal";

export default function TransactionList({ transactions, onDelete, onEdit, editing, onAdd }) {
  const [open, setOpen] = useState(false);

  const handleEdit = (tx) => {
    onEdit(tx);
    setOpen(true);
  };

  return (
    <div className="w-full">
      {/* Header with increased spacing */}
      <div className="hidden sm:grid grid-cols-[100px_140px_140px_1fr_auto] font-medium text-sm text-gray-600 dark:text-gray-300 px-4 py-2 border-b gap-8">
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
              className={`grid grid-cols-1 sm:grid-cols-[100px_140px_140px_1fr_auto] items-start gap-4 sm:gap-8 px-4 py-3 rounded-lg border transition-colors ${
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
                <Button variant="outline" size="sm" onClick={() => handleEdit(tx)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(tx._id)}>Delete</Button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Modal for edit/add transaction */}
      <TransactionModal
        editing={editing}
        onAdd={onAdd}
        open={open}
        onClose={() => {
          setOpen(false);
          onEdit(null);
        }}
      />
    </div>
  );
}
