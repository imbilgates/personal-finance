"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import TransactionForm from "../forms/TransactionForm";

export default function TransactionModal({ editing, setEditing, onAdd }) {
  return (
    <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          {editing && editing._id ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>
        <TransactionForm
          editing={editing}
          setEditing={setEditing}
          onAdd={onAdd}
        />
      </DialogContent>
    </Dialog>
  );
}
