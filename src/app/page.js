"use client";
import { useEffect, useState } from "react";
import TransactionModal from "@/components/modals/TransactionModal";
import BudgetModal from "@/components/modals/BudgetModal";

import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardHeader from "@/components/dashboard/Header";
import ChartsSection from "@/components/dashboard/ChartsSection";
import BudgetVsActualSection from "@/components/dashboard/BudgetVsActual";
import TransactionSection from "@/components/dashboard/TransactionSection";
import BudgetSection from "@/components/dashboard/BudgetSection";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [budgetEditing, setBudgetEditing] = useState(null);
  const [openBudgetModal, setOpenBudgetModal] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const handleBudgetDelete = async (id) => {
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    fetchBudgets();
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-12">
      <DashboardHeader />
      <SummaryCards transactions={transactions} />
      <ChartsSection transactions={transactions} />
      <BudgetVsActualSection budgets={budgets} transactions={transactions} />
      <TransactionSection
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={setEditing}
        editing={editing}
      />
      <BudgetSection
        budgets={budgets}
        onEdit={(b) => {
          setBudgetEditing(b);
          setOpenBudgetModal(true);
        }}
        onDelete={handleBudgetDelete}
        onAdd={() => {
          setBudgetEditing(null);
          setOpenBudgetModal(true);
        }}
      />

      {/* Modals */}
      <TransactionModal
        editing={editing}
        setEditing={setEditing}
        onAdd={fetchTransactions}
      />
      <BudgetModal
        open={openBudgetModal}
        editing={budgetEditing}
        onSave={() => {
          fetchBudgets();
          setOpenBudgetModal(false);
          setBudgetEditing(null);
        }}
        onClose={() => {
          setOpenBudgetModal(false);
          setBudgetEditing(null);
        }}
      />
    </main>
  );
}
