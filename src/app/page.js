"use client";
import { useEffect, useRef, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  const fetchData = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleEdit = (tx) => {
    setEditing(tx);
  };

  useEffect(() => {
    if (editing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        PERSONAL FINANCE TRACKER
      </h1>

      <SummaryCards transactions={transactions} />

      <section ref={formRef}>
        <h2 className="text-xl font-semibold mb-2">
          {editing ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <TransactionForm
          onAdd={fetchData}
          editing={editing}
          setEditing={setEditing}
        />
      </section>

      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editing={editing}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
        <div className="w-full">
          <MonthlyChart transactions={transactions} />
        </div>
        <div className="w-full">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>
    </main>
  );
}
