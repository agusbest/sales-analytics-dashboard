interface KPIData {
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
}

export default function KPISection({
    data,
}: {
    data?: KPIData;
}) {

    if (!data) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    const formatCurrency = (
        value: number
    ) => {

        if (value >= 1000000000) {

            return `Rp ${(value / 1000000000).toFixed(2)} M`;

        }

        return `Rp ${(value / 1000000).toFixed(0)} Jt`;

    };

    const cards = [

        {
            title: "Revenue",
            value: formatCurrency(
                data.revenue
            ),
            color:
                "from-blue-500 to-blue-600",
            trend: "",
        },

        {
            title: "Profit",
            value: formatCurrency(
                data.profit
            ),
            color:
                "from-green-500 to-green-600",
            trend: "",
        },

        {
            title: "Cost",
            value: formatCurrency(
                data.cost
            ),
            color:
                "from-orange-500 to-orange-600",
            trend: "",
        },

        {
            title: "Margin",
            value: `${data.margin}%`,
            color:
                "from-purple-500 to-purple-600",
            trend: "",
        },

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`bg-gradient-to-r ${card.color} text-white rounded-xl p-5 shadow`}
                >

                    <p className="opacity-90">
                        {card.title}
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {card.value}
                    </h2>

                </div>

            ))}

        </div>

    );
}