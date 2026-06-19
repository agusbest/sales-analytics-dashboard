interface ProductData {
  product: string;
  qty: number;
  revenue: string;
  profit: string;
}

export default function TopProductsTable({
  data = [],
}: {
  data?: ProductData[];
}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              Product
            </th>

            <th className="text-left p-3">
              Qty
            </th>

            <th className="text-left p-3">
              Revenue
            </th>

            <th className="text-left p-3">
              Profit
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item.product}
              className="border-b"
            >

              <td className="p-3">
                {item.product}
              </td>

              <td className="p-3">
                {item.qty}
              </td>

              <td className="p-3">
                {item.revenue}
              </td>

              <td className="p-3">
                {item.profit}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}