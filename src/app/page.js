"use client";
import { useFinance } from "@/context/FinanceContext";
import TransactionModal from "@/components/modals/TransactionModal";
import BudgetModal from "@/components/modals/BudgetModal";

import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardHeader from "@/components/dashboard/Header";
import ChartsSection from "@/components/dashboard/ChartsSection";
import BudgetVsActualSection from "@/components/dashboard/BudgetVsActual";
import TransactionSection from "@/components/dashboard/TransactionSection";
import BudgetSection from "@/components/dashboard/BudgetSection";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

export default function Home() {
  const { loading } = useFinance();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-12">
      <DashboardHeader />
      <SummaryCards />
      <ChartsSection />
      <BudgetVsActualSection />
      <TransactionSection />
      <BudgetSection />

      {/* Modals */}
      <TransactionModal />
      <BudgetModal />
    </main>
  );
}
