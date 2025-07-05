import { useFinance } from "@/context/FinanceContext";
import BudgetChart from "../charts/BudgetChart";

export default function BudgetVsActualSection() {

    const { transactions, budgets } = useFinance();
  
  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">🎯 Budget vs Actual</h2>
      <BudgetChart budgets={budgets} transactions={transactions} />
    </section>
  );
}
