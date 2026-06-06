"use client";

import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { chartData } from "../data/sales";

export default function RevenueChart({
    period,
}: {
    period: keyof typeof chartData;
}) {

    const data = chartData[period];

    return (
        <ResponsiveContainer
            width="100%"
            height={350}
        >
            <BarChart data={data}>

                <XAxis dataKey="period" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                    dataKey="revenue"
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                />

                <Bar
                    dataKey="cost"
                    fill="#F97316"
                    radius={[8, 8, 0, 0]}
                />

                <Bar
                    dataKey="profit"
                    fill="#22C55E"
                    radius={[8, 8, 0, 0]}
                />

            </BarChart>
        </ResponsiveContainer>
    );
}