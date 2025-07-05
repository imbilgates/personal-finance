"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BudgetList from "../lists/BudgetList";
import BudgetModal from "@/components/modals/BudgetModal";
import { useFinance } from "@/context/FinanceContext";

export default function BudgetSection() {
  const { budgets, fetchBudgets } = useFinance();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = () => {
    setEditing(null);
    setOpenModal(true);
  };

  const handleEdit = (budget) => {
    setEditing(budget);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditing(null);
    setErrorMessage("");
  };

  const handleConflict = (category, month) => {
    const match = budgets.find(
      (b) => b.category === category && b.month === month
    );
    if (match) {
      setHighlightedId(match._id);
      setErrorMessage("A budget is already set for this category in the selected month.");
      setTimeout(() => {
        setHighlightedId(null);
        setErrorMessage("");
      }, 3000);
    }
    handleClose();
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">🧾 Budget Overview</h2>
        <Button onClick={handleAdd}>➕ Add Budget</Button>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500 font-medium text-center">{errorMessage}</p>
      )}

      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets found.</p>
      ) : (
        <BudgetList
          budgets={budgets}
          onEdit={handleEdit}
          highlightedId={highlightedId}
        />
      )}

      <BudgetModal
        open={openModal}
        onClose={handleClose}
        editing={editing}
        onSave={fetchBudgets}
        onConflict={handleConflict}
      />
    </section>
  );
}
