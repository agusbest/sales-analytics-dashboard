"use client";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "HP", value: 45 },
    { name: "Laptop", value: 30 },
    { name: "Accessories", value: 15 },
    { name: "Tablet", value: 10 },
];

const colors = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#A855F7",
];

export default function CategoryChart() {
    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                >
                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            fill={colors[index]}
                        />
                    ))}
                </Pie>

                <Tooltip />

            </PieChart>
        </ResponsiveContainer>
    );
}