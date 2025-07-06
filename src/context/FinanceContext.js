"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true); 

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

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchTransactions(), fetchBudgets()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        fetchTransactions,
        fetchBudgets,
        loading, 
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
