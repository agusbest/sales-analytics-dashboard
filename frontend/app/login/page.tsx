"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login }
    from "@/data/auth";

export default function LoginPage() {

    const router =
        useRouter();

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
                await login(
                    email,
                    password
                );

            if (result.token) {

                localStorage.setItem(
                    "token",
                    result.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        result.user
                    )
                );
                // console.log("🔥 dispatch authChange");

                // 🔥 trigger navbar update
                window.dispatchEvent(new Event("authChange"));
                router.push("/");

            } else {

                alert(
                    result.message
                );

            }

        } catch {

            alert(
                "Login gagal"
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h1>

                <div className="bg-yellow-100 text-yellow-800 text-sm text-center py-2 px-3 rounded-lg mb-6">
                    Demo Login → User: <b>admin@gmail.com</b> | Pass: <b>123456</b>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

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
                        className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                        {
                            loading
                                ? "Loading..."
                                : "Login"
                        }
                    </button>

                </form>

                {/* <p className="text-center text-sm mt-4">

                    Belum punya akun?

                    <a
                        href="/register"
                        className="text-blue-600 ml-1"
                    >
                        Register
                    </a>

                </p> */}

            </div>

        </div>

    );

}