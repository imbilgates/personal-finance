"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import BudgetForm from "../forms/BudgetForm";

export default function BudgetModal({ open, onClose, editing, onSave, onConflict }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          {editing?._id ? "Edit Budget" : "Add Budget"}
        </DialogTitle>
        <BudgetForm
          editing={editing}
          onClose={onClose}
          onSave={onSave}
          onConflict={onConflict}
        />
      </DialogContent>
    </Dialog>
  );
}
