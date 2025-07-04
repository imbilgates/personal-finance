"use client";
import { useEffect, useState } from "react";
import SummaryCards from "@/components/SummaryCards";
import TransactionList from "@/components/lists/TransactionList";
import MonthlyChart from "@/components/charts/MonthlyChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import BudgetChart from "@/components/charts/BudgetChart";
import BudgetList from "@/components/lists/BudgetList";
import BudgetModal from "@/components/modals/BudgetModal";
import TransactionModal from "@/components/modals/TransactionModal";
import { Button } from "@/components/ui/button";

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
      <h1 className="text-3xl font-bold text-center">
        💰 Personal Finance Tracker
      </h1>

      <SummaryCards transactions={transactions} />

      {/* 📊 Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">📅 Monthly Spending</h2>
          <MonthlyChart transactions={transactions} />
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            📈 Category-wise Spending
          </h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <BudgetChart budgets={budgets} transactions={transactions}/>
      </section>

      {/* 📋 Transaction History */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📋 Transaction History</h2>
          <Button onClick={() => setEditing({})}>➕ Add Transaction</Button>
        </div>
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={(tx) => setEditing(tx)}
          editing={editing}
        />
      </section>

      {/* 🧾 Budget Overview */}
      <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">🧾 Budget Overview</h2>
          <Button
            onClick={() => {
              setBudgetEditing(null); // null for adding new
              setOpenBudgetModal(true);
            }}
          >
            ➕ Add Budget
          </Button>
        </div>
        <BudgetList
          budgets={budgets}
          onEdit={(b) => {
            setBudgetEditing(b);
            setOpenBudgetModal(true);
          }}
          onDelete={handleBudgetDelete}
        />
      </section>

      {/* ✅ Budget Modal Final */}
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

      {/* ✅ Transaction Modal */}
      <TransactionModal
        editing={editing}
        setEditing={setEditing}
        onAdd={fetchTransactions}
      />
    </main>
  );
}
