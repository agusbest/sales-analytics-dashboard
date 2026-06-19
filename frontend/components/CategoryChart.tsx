"use client";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface CategoryData {
    category: string;
    sales: number;
}

const colors = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#A855F7",
];

export default function CategoryChart({
    data = [],
}: {
    data?: CategoryData[];
}) {

    console.log("Category Data:", data);

    const chartData = data.map(item => ({
        name: item.category,
        value: Number(item.sales)
    }));

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <PieChart>

                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                >

                    {chartData.map((_, index) => (

                        <Cell
                            key={index}
                            fill={
                                colors[
                                index %
                                colors.length
                                ]
                            }
                        />

                    ))}

                </Pie>

                <Tooltip />

            </PieChart>
        </ResponsiveContainer>
    );
}