export const salesTrend = [
    {
        period: "01-10 Mei",
        revenue: 320000000,
        cost: 180000000,
        profit: 140000000,
    },
    {
        period: "11-20 Mei",
        revenue: 350000000,
        cost: 195000000,
        profit: 155000000,
    },
    {
        period: "21-31 Mei",
        revenue: 380000000,
        cost: 205000000,
        profit: 175000000,
    },
];

export const categoryData = [
    { category: "HP", sales: 450 },
    { category: "Laptop", sales: 220 },
    { category: "Accessories", sales: 180 },
    { category: "Tablet", sales: 120 },
];

export const branchData = [
    { branch: "Jakarta", revenue: 420 },
    { branch: "Bekasi", revenue: 280 },
    { branch: "Bandung", revenue: 240 },
    { branch: "Karawang", revenue: 180 },
];

export const topProducts = [
    {
        product: "iPhone 15",
        qty: 52,
        revenue: "Rp 780 Jt",
        profit: "Rp 120 Jt",
    },
    {
        product: "Samsung S25",
        qty: 45,
        revenue: "Rp 510 Jt",
        profit: "Rp 80 Jt",
    },
    {
        product: "MacBook Air M4",
        qty: 18,
        revenue: "Rp 450 Jt",
        profit: "Rp 70 Jt",
    },
    {
        product: "Asus ROG",
        qty: 15,
        revenue: "Rp 320 Jt",
        profit: "Rp 55 Jt",
    },


];

export const monthlyData = {
    "Mei 2026": {
        revenue: "Rp 1.05 M",
        profit: "Rp 470 Jt",
        cost: "Rp 580 Jt",
        margin: "44%",
    },

    "April 2026": {
        revenue: "Rp 890 Jt",
        profit: "Rp 390 Jt",
        cost: "Rp 500 Jt",
        margin: "43%",
    },

    "Maret 2026": {
        revenue: "Rp 760 Jt",
        profit: "Rp 310 Jt",
        cost: "Rp 450 Jt",
        margin: "40%",
    },
};

export const chartData = {
    "Mei 2026": [
        {
            period: "01-10",
            revenue: 320,
            cost: 180,
            profit: 140,
        },
        {
            period: "11-20",
            revenue: 350,
            cost: 195,
            profit: 155,
        },
        {
            period: "21-31",
            revenue: 380,
            cost: 205,
            profit: 175,
        },
    ],

    "April 2026": [
        {
            period: "01-10",
            revenue: 260,
            cost: 140,
            profit: 120,
        },
        {
            period: "11-20",
            revenue: 300,
            cost: 160,
            profit: 140,
        },
        {
            period: "21-30",
            revenue: 330,
            cost: 200,
            profit: 130,
        },
    ],

    "Maret 2026": [
        {
            period: "01-10",
            revenue: 220,
            cost: 130,
            profit: 90,
        },
        {
            period: "11-20",
            revenue: 250,
            cost: 140,
            profit: 110,
        },
        {
            period: "21-31",
            revenue: 290,
            cost: 180,
            profit: 110,
        },
    ],
};

export type PeriodType =
    keyof typeof monthlyData;