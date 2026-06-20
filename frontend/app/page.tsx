"use client";

import { useEffect, useState } from "react";

import {
  getDashboardData,
  getMonths,
} from "@/data/api";


import BranchChart from "../components/BranchChart";
import CategoryChart from "../components/CategoryChart";
import KPISection from "../components/KPISection";
import RevenueChart from "../components/RevenueChart";
import TopProductsTable from "../components/TopProductsTable";

export default function Home() {

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  const [selectedMonth, setSelectedMonth] =
    useState("2026-05");

  const [months, setMonths] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadMonths() {

      try {

        const result =
          await getMonths();

        setMonths(result);

      } catch (error) {

        console.error(error);

      }

    }

    loadMonths();

  }, []);

  useEffect(() => {

    async function loadData() {

      try {

        const result =
          await getDashboardData(
            selectedMonth
          );

        setDashboardData(result);

      } catch (error) {

        console.error(error);

      }

    }

    loadData();

  }, [selectedMonth]);

  return (

    <main className="min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div
          className="
          rounded-3xl
          bg-gradient-to-r
          from-indigo-600
          via-blue-600
          to-cyan-500
          text-white
          p-8
          shadow-xl
          mb-6
        "
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h1 className="text-4xl font-bold mb-2">
                Sales Analytics Dashboard
              </h1>

              <p className="text-blue-100 max-w-2xl">
                Monitor revenue, profit,
                branch performance,
                category trends,
                and top-selling products
                in real time.
              </p>

            </div>

            <div>

              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(
                    e.target.value
                  )
                }
                className="
                bg-white
                text-slate-800
                rounded-xl
                px-4
                py-3
                border
                shadow
                min-w-[180px]
              "
              >

                {months.map((month) => (

                  <option
                    key={month.value}
                    value={month.value}
                  >
                    {month.label}
                  </option>

                ))}

              </select>

            </div>

          </div>

        </div>

        {/* QUICK STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-5 shadow">

            <p className="text-sm text-gray-500">
              Active Branches
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {dashboardData?.branch?.length ?? 0}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow">

            <p className="text-sm text-gray-500">
              Product Categories
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {dashboardData?.category?.length ?? 0}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow">

            <p className="text-sm text-gray-500">
              Top Products
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {dashboardData?.products?.length ?? 0}
            </h2>

          </div>

        </div>

        {/* KPI */}

        <KPISection
          data={dashboardData?.summary}
        />

        {/* REVENUE TREND */}

        <div
          className="
          bg-white/70
          backdrop-blur-md
          rounded-2xl
          p-5
          shadow-lg
          border
          border-white/30
          mt-6
        "
        >

          <h2 className="font-semibold mb-4">
            Revenue Trend
          </h2>

          <RevenueChart
            data={
              dashboardData?.trend ?? []
            }
          />

        </div>

        {/* CATEGORY + BRANCH */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

          <div
            className="
            bg-white/70
            backdrop-blur-md
            rounded-2xl
            p-5
            shadow-lg
            border
            border-white/30
          "
          >

            <h2 className="font-semibold mb-4">
              Category Performance
            </h2>

            <CategoryChart
              data={
                dashboardData?.category ?? []
              }
            />

          </div>

          <div
            className="
            bg-white/70
            backdrop-blur-md
            rounded-2xl
            p-5
            shadow-lg
            border
            border-white/30
          "
          >

            <h2 className="font-semibold mb-4">
              Branch Performance
            </h2>

            <BranchChart
              data={
                dashboardData?.branch ?? []
              }
            />

          </div>

        </div>

        {/* TOP PRODUCTS */}

        <div
          className="
          bg-white/70
          backdrop-blur-md
          rounded-2xl
          p-5
          shadow-lg
          border
          border-white/30
          mt-6
        "
        >

          <h2 className="font-semibold mb-4">
            Top Products
          </h2>

          <TopProductsTable
            data={
              dashboardData?.products ?? []
            }
          />

        </div>

      </div>

    </main>

  );

}