"use client";
import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null); // ✅ New edit state

  const fetchData = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleEdit = (tx) => {
    setEditing(tx);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        PERSONAL FINANCE TRACKER
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          {editing ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <TransactionForm
          onAdd={fetchData}
          editing={editing}
          setEditing={setEditing}
        />
      </section>

      <section>
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
          editing={editing}
        />
      </section>

      <section>
        <MonthlyChart transactions={transactions} />
      </section>
    </main>
  );
}
