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

interface BranchData {
    branch: string;
    revenue: number;
}

export default function BranchChart({
    data = [],
}: {
    data?: BranchData[];
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart data={data}>

                <CartesianGrid
                    strokeDasharray="3 3"
                />

                <XAxis
                    dataKey="branch"
                />

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
                />

            </BarChart>

        </ResponsiveContainer>

    );

}