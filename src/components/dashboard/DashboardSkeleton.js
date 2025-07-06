"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-72 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <Skeleton className="h-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Section Skeletons */}
      <Skeleton className="h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
    </main>
  );
}
