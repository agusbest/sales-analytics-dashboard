"use client";

import { useState } from "react";
import { importExcel } from "@/data/api";

export default function ImportPage() {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleImport() {
        if (!file || loading) return;

        try {
            setLoading(true);

            const result = await importExcel(file);

            alert(`${result.inserted} rows imported`);

            setFile(null);

            const input = document.getElementById("fileInput") as HTMLInputElement;
            if (input) input.value = "";

        } catch (err) {
            console.error(err);
            alert("Import gagal");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-5 sm:p-6">

                {/* TITLE */}
                <h1 className="text-xl sm:text-2xl font-bold mb-5 text-center sm:text-left">
                    Import Excel
                </h1>

                {/* FILE BOX */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">

                    <input
                        id="fileInput"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) =>
                            setFile(e.target.files?.[0] || null)
                        }
                        className="w-full text-sm"
                    />

                    <div className="mt-3">
                        {file ? (
                            <p className="text-green-600 font-medium text-sm break-words">
                                📄 {file.name}
                            </p>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                Pilih file Excel (.xlsx / .xls)
                            </p>
                        )}
                    </div>

                </div>

                {/* BUTTON */}
                <button
                    onClick={handleImport}
                    disabled={!file || loading}
                    className={`
                        w-full mt-5 py-2 rounded-lg text-white font-medium transition
                        ${!file || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }
                    `}
                >
                    {loading ? "⏳ Importing..." : "🚀 Import Data"}
                </button>

            </div>
        </div>
    );
}