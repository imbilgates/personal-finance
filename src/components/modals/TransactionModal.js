"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TransactionForm from "../forms/TransactionForm";
import { useFinance } from "@/context/FinanceContext";
import { useLoadingButton } from "@/hooks/useLoadingButton";

export default function TransactionModal({ editing, setEditing }) {
  const { fetchTransactions } = useFinance();
  const { wrap, loading } = useLoadingButton();

  return (
    <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          {editing && editing._id ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>
        <TransactionForm
          editing={editing}
          setEditing={setEditing}
          onAdd={fetchTransactions}
          wrap={wrap}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
