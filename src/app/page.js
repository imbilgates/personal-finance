"use client";
import TransactionModal from "@/components/modals/TransactionModal";
import BudgetModal from "@/components/modals/BudgetModal";

import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardHeader from "@/components/dashboard/Header";
import ChartsSection from "@/components/dashboard/ChartsSection";
import BudgetVsActualSection from "@/components/dashboard/BudgetVsActual";
import TransactionSection from "@/components/dashboard/TransactionSection";
import BudgetSection from "@/components/dashboard/BudgetSection";

export default function Home() {

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
