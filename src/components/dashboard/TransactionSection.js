import { Button } from "@/components/ui/button";
import TransactionList from "../lists/TransactionList";

export default function TransactionSection({ transactions, onDelete, onEdit, editing, onAdd }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📋 Transaction History</h2>
        <Button onClick={() => onEdit({})}>➕ Add Transaction</Button>
      </div>
      <TransactionList
        transactions={transactions}
        onDelete={onDelete}
        onEdit={onEdit}
        editing={editing}
      />
    </section>
  );
}
