import { Button } from "@/components/ui/button";
import BudgetList from "../lists/BudgetList";

export default function BudgetSection({ budgets, onEdit, onDelete, onAdd }) {
  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">🧾 Budget Overview</h2>
        <Button onClick={onAdd}>➕ Add Budget</Button>
      </div>
      <BudgetList budgets={budgets} onEdit={onEdit} onDelete={onDelete} />
    </section>
  );
}
