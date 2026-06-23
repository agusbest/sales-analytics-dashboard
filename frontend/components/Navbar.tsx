"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    FaChartLine,
    FaFileImport,
    FaTable,
} from "react-icons/fa";

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    const pathname = usePathname();

    // const isLoggedIn =
    //     typeof window !== "undefined" &&
    //     !!localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const menus = [
        { href: "/", label: "Dashboard", icon: <FaChartLine /> },
        { href: "/transactions", label: "Transactions", icon: <FaTable /> },
        { href: "/import", label: "Import", icon: <FaFileImport /> },
    ];

    return (
        <nav className="
            sticky top-0 z-50
            backdrop-blur-lg
            bg-white/70
            border-b
            shadow-sm
        ">

            <div className="
                max-w-7xl mx-auto px-6 h-16
                flex items-center justify-between
            ">

                <Link
                    href="/"
                    className="font-bold text-xl text-indigo-600"
                >
                    📊 Sales Analytics
                </Link>

                <div className="flex items-center gap-2">

                    {/* MENU */}
                    {isLoggedIn && menus.map(menu => (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-xl
                                ${pathname === menu.href
                                    ? "bg-indigo-600 text-white"
                                    : "hover:bg-indigo-100"
                                }
                            `}
                        >
                            {menu.icon}
                            {menu.label}
                        </Link>
                    ))}

                    {/* AUTH */}
                    {!isLoggedIn ? (
                        <Link
                            href="/login"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
}