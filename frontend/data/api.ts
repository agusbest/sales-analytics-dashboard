const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

export async function getDashboardData(
    month: string
) {

    const [
        summaryRes,
        trendRes,
        categoryRes,
        branchRes,
        productRes
    ] = await Promise.all([

        fetch(
            `${API_URL}/dashboard/summary?month=${month}`
        ),

        fetch(
            `${API_URL}/dashboard/trend?month=${month}`
        ),

        fetch(
            `${API_URL}/dashboard/category?month=${month}`
        ),

        fetch(
            `${API_URL}/dashboard/branch?month=${month}`
        ),

        fetch(
            `${API_URL}/dashboard/top-products?month=${month}`
        )

    ]);

    return {

        summary:
            await summaryRes.json(),

        trend:
            await trendRes.json(),

        category:
            await categoryRes.json(),

        branch:
            await branchRes.json(),

        products:
            await productRes.json()

    };

}

export async function getMonths() {

    const res = await fetch(
        `${API_URL}/dashboard/months`
    );

    return await res.json();

}

export async function getSales(
    page = 1,
    month = "",
    search = ""
) {

    const params =
        new URLSearchParams();

    params.append(
        "page",
        String(page)
    );

    if (month) {

        params.append(
            "month",
            month
        );

    }

    if (search) {

        params.append(
            "search",
            search
        );

    }

    const response =
        await fetch(
            `${API_URL}/sales?${params}`
        );

    return await response.json();

}

export async function importExcel(
    file: File
) {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await fetch(
            `${API_URL}/sales/import`,
            {
                method: "POST",
                body: formData,
            }
        );

    return await response.json();

}

export async function exportExcel(search = "") {

    const res = await fetch(
        `${API_URL}/sales/export?search=${search}`
    );

    const blob = await res.blob();

    const url = window.URL.createObjectURL(
        new Blob([blob])
    );

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
}

export async function deleteSale(
    id: number
) {

    const response =
        await fetch(
            `${API_URL}/sales/${id}`,
            {
                method: "DELETE"
            }
        );

    return response.json();

}

export async function createSale(
    data: any
) {
    const response =
        await fetch(
            `${API_URL}/sales`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );

    return response.json();
}

export async function updateSale(
    id: number,
    data: any
) {
    const response =
        await fetch(
            `${API_URL}/sales/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );

    return response.json();
}