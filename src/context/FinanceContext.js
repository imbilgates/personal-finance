"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [editing, setEditing] = useState(null); // For transaction edit/add
  const [budgetEditing, setBudgetEditing] = useState(null); // For budget edit/add
  const [openBudgetModal, setOpenBudgetModal] = useState(false); // Budget modal visibility

  // 🔄 Fetch data
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

  // ❌ Delete handlers
  const deleteTransaction = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const deleteBudget = async (id) => {
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    fetchBudgets();
  };

  // ➕ Add triggers
  const onAddTransaction = () => setEditing({});
  const onAddBudget = () => {
    setBudgetEditing(null);
    setOpenBudgetModal(true);
  };

  // ✏️ Budget Edit handler
  const onEditBudget = (budget) => {
    setBudgetEditing(budget);
    setOpenBudgetModal(true);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        editing,
        setEditing,
        budgetEditing,
        setBudgetEditing,
        openBudgetModal,
        setOpenBudgetModal,
        fetchTransactions,
        fetchBudgets,
        onEdit: setEditing,
        onDelete: deleteTransaction,
        onAddTransaction,
        onEditBudget,
        onDeleteBudget: deleteBudget,
        onAddBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
