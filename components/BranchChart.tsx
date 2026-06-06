"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { branch: "Jakarta", revenue: 420 },
    { branch: "Bekasi", revenue: 280 },
    { branch: "Bandung", revenue: 240 },
    { branch: "Karawang", revenue: 180 },
];

export default function BranchChart() {
    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="branch" />

                <YAxis />

                <Tooltip
                    formatter={(value) => [
                        `Rp ${value} Jt`,
                        "Revenue"
                    ]}
                />

                <Bar
                    dataKey="revenue"
                    fill="#8B5CF6"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1200}
                    activeBar={{
                        stroke: "#6D28D9",
                        strokeWidth: 2,
                    }}
                />

            </BarChart>
        </ResponsiveContainer>
    );
}