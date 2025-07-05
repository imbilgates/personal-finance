"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

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

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        fetchTransactions,
        fetchBudgets,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
