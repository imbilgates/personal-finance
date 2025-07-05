"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TransactionList from "../lists/TransactionList";
import TransactionModal from "../modals/TransactionModal";
import { useFinance } from "@/context/FinanceContext";

export default function TransactionSection() {
  const { transactions } = useFinance();
  const [editing, setEditing] = useState(null);

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📋 Transaction History</h2>
        <Button onClick={() => setEditing({})}>➕ Add Transaction</Button>
      </div>
      <TransactionList transactions={transactions} onEdit={setEditing} editing={editing} />
      <TransactionModal editing={editing} setEditing={setEditing} />
    </section>
  );
}
