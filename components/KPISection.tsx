import { monthlyData } from "../data/sales";

export default function KPISection({
    period,
}: {
    period: keyof typeof monthlyData;
}) {

    const data = monthlyData[period];

    const cards = [
        {
            title: "Revenue",
            value: data.revenue,
            color:
                "from-blue-500 to-blue-600",
            trend: "+12.4%",
        },

        {
            title: "Profit",
            value: data.profit,
            color:
                "from-green-500 to-green-600",
            trend: "+8.1%",
        },

        {
            title: "Cost",
            value: data.cost,
            color:
                "from-orange-500 to-orange-600",
            trend: "-3.2%",
        },

        {
            title: "Margin",
            value: data.margin,
            color:
                "from-purple-500 to-purple-600",
            trend: "+2.3%",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`bg-gradient-to-r ${card.color}
          text-white rounded-xl p-5 shadow`}
                >
                    <p className="opacity-90">
                        {card.title}
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {card.value}
                    </h2>

                    <p className="text-sm mt-2">
                        {card.trend}
                    </p>
                </div>

            ))}

        </div>
    );
}