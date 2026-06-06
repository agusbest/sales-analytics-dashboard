"use client";

import { useState } from "react";

import BranchChart from "../components/BranchChart";
import CategoryChart from "../components/CategoryChart";
import KPISection from "../components/KPISection";
import RevenueChart from "../components/RevenueChart";
import TopProductsTable from "../components/TopProductsTable";
import { PeriodType } from "../data/sales";

export default function Home() {
  const [period, setPeriod] =
    useState<PeriodType>("Mei 2026");

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Sales Analytics Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Last Updated: 05 Jun 2026 09:30
            </p>
          </div>

          <select
            value={period}
            onChange={(e) =>
              setPeriod(
                e.target.value as PeriodType
              )
            }
            className="mt-4 md:mt-0 bg-white border rounded-lg px-4 py-2"
          >
            <option>Mei 2026</option>
            <option>April 2026</option>
            <option>Maret 2026</option>
          </select>

        </div>

        <KPISection period={period} />

        <div className="bg-white rounded-xl p-4 shadow mt-6">
          <h2 className="font-semibold mb-4">
            Revenue Trend
          </h2>

          <RevenueChart period={period} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-4">
              Category Performance
            </h2>

            <CategoryChart />
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-4">
              Branch Performance
            </h2>

            <BranchChart />
          </div>

        </div>

        <div className="bg-white rounded-xl p-4 shadow mt-6">
          <h2 className="font-semibold mb-4">
            Top Products
          </h2>

          <TopProductsTable />
        </div>

      </div>

    </main>
  );
}