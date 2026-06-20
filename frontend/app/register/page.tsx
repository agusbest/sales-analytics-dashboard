"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
    register
}
    from "@/data/auth";

export default function RegisterPage() {

    const router =
        useRouter();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            const result =
                await register(
                    name,
                    email,
                    password
                );

            if (
                result.success
            ) {

                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Register berhasil",
                    confirmButtonColor: "#4F46E5"
                });

                router.push(
                    "/login"
                );

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.message,
                });
            }

        } catch {

            alert('Gagal Regitrasi..!')

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg"
                    >
                        {
                            loading
                                ? "Loading..."
                                : "Register"
                        }
                    </button>

                </form>

                <p className="text-center text-sm mt-4">

                    Sudah punya akun?

                    <a
                        href="/login"
                        className="text-blue-600 ml-1"
                    >
                        Login
                    </a>

                </p>

            </div>

        </div>

    );

}