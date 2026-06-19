"use client";

import { useEffect, useState } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import Swal from "sweetalert2";

import {
    getSales,
    createSale,
    updateSale,
    deleteSale,
    exportExcel
} from "@/data/api";



export default function Transactions() {

    const [rows, setRows] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] =
        useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [form, setForm] = useState({
        transaction_date: "",
        branch: "",
        category: "",
        product_name: "",
        qty: "",
        revenue: "",
        cost: "",
        profit: ""
    });

    function handleEdit(row: any) {
        setEditingId(row.id);

        setForm({
            transaction_date:
                row.transaction_date
                    ?.substring(0, 10),

            branch:
                row.branch,

            category:
                row.category,

            product_name:
                row.product_name,

            qty:
                row.qty,

            revenue:
                row.revenue,

            cost:
                row.cost,

            profit:
                row.profit
        });

        setOpenModal(true);
    }


    async function handleDelete(
        id: number
    ) {

        const result =
            await Swal.fire({
                title: "Hapus Data?",
                text: "Data yang dihapus tidak bisa dikembalikan.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Ya, Hapus",
                cancelButtonText: "Batal"
            });

        if (!result.isConfirmed)
            return;

        try {

            await deleteSale(id);
            await Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil dihapus",
                timer: 1500,
                showConfirmButton: false
            });

            loadData();

        } catch {

            alert(
                "Gagal hapus data"
            );

        }

    }

    async function handleSubmit(
        e: any
    ) {
        e.preventDefault();

        try {

            if (editingId) {
                await updateSale(
                    editingId,
                    form
                );
            }
            else {
                await createSale(
                    form
                );
            }

            setOpenModal(false);

            loadData();

        } catch (error) {

            console.error(error);

            alert("Gagal simpan data");

        }
    }

    async function loadData() {
        try {
            setLoading(true);

            const result = await getSales(page, "", search);

            setRows(result.data);
            setPagination(result.pagination);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [page]);

    function formatRupiah(value: number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    }

    return (
        <>
            <div className="p-4 sm:p-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Transactions
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                setEditingId(null);

                                setForm({
                                    transaction_date: "",
                                    branch: "",
                                    category: "",
                                    product_name: "",
                                    qty: "",
                                    revenue: "",
                                    cost: "",
                                    profit: ""
                                });

                                setOpenModal(true);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FaPlus />
                            Add Transaction
                        </button>

                        <input
                            type="text"
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border rounded-lg px-3 py-2 w-full sm:w-64"
                        />

                        <button
                            onClick={() => {
                                setPage(1);
                                loadData();
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Search
                        </button>

                        <button
                            onClick={() =>
                                exportExcel(search)
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            ⬇ Export
                        </button>
                    </div>


                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">

                    <table className="min-w-full text-sm">

                        <thead className="bg-gray-100 text-gray-700 sticky top-0">

                            <tr>

                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Branch</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-right">Qty</th>
                                <th className="p-3 text-right">Revenue</th>
                                <th className="p-3 text-right">Profit</th>
                                <th className="p-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3">...</td>
                                        <td className="p-3 text-center">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(row)
                                                    }
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit size={18} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(row.id)
                                                    }
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrash size={18} />
                                                </button>

                                            </div>

                                        </td>
                                    </tr>
                                ))
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center p-6 text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row) => (

                                    <tr
                                        key={row.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="p-3 whitespace-nowrap">
                                            {new Date(row.transaction_date)
                                                .toLocaleDateString("id-ID")}
                                        </td>

                                        <td className="p-3">
                                            <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                                                {row.branch}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                                                {row.category}
                                            </span>
                                        </td>

                                        <td className="p-3 font-medium">
                                            {row.product_name}
                                        </td>

                                        <td className="p-3 text-right">
                                            {row.qty}
                                        </td>

                                        <td className="p-3 text-right text-green-600 font-medium">
                                            {formatRupiah(row.revenue)}
                                        </td>

                                        <td
                                            className={`p-3 text-right font-medium ${row.profit >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {formatRupiah(row.profit)}
                                        </td>

                                        <td className="p-3 text-center">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() => handleEdit(row)}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                    title="Edit"
                                                >
                                                    <FaEdit size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(row.id)}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            )}

                        </tbody>

                    </table>

                </div>

                {/* PAGINATION */}
                {pagination && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">

                        <div className="text-sm text-gray-600">
                            Total: <b>{pagination.total}</b>
                        </div>

                        <div className="flex gap-2">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                            >
                                Prev
                            </button>

                            <span className="px-3 py-2 text-sm">
                                Page {page} / {pagination.totalPages}
                            </span>

                            <button
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                            >
                                Next
                            </button>

                        </div>

                    </div>
                )}

            </div>
            {openModal && (

                <div
                    className="
                fixed inset-0
                bg-black/40
                flex items-center
                justify-center
                z-50
                "
                >

                    <div
                        className="
                    bg-white
                    rounded-xl
                    p-6
                    w-full
                    max-w-2xl
                    shadow-xl
                    "
                    >

                        <h2 className="text-xl font-bold mb-4">

                            {editingId
                                ? "Edit Transaction"
                                : "Add Transaction"}

                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-2 gap-4"
                        >

                            <input
                                type="date"
                                value={form.transaction_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        transaction_date:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Branch"
                                value={form.branch}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        branch:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Category"
                                value={form.category}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        category:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Product Name"
                                value={form.product_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        product_name:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Qty"
                                value={form.qty}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        qty:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Revenue"
                                value={form.revenue}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        revenue:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Cost"
                                value={form.cost}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cost:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Profit"
                                value={form.profit}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        profit:
                                            e.target.value
                                    })
                                }
                                className="border p-2 rounded"
                                required
                            />

                            <div className="col-span-2 flex justify-end gap-2 mt-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenModal(false)
                                    }
                                    className="
                                border
                                px-4 py-2
                                rounded-lg
                                "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="
                                bg-blue-600
                                text-white
                                px-4 py-2
                                rounded-lg
                                "
                                >
                                    Save
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}
        </>
    );


}