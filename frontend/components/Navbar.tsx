"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    FaChartLine,
    FaFileImport,
    FaTable,
    FaSignInAlt,
    FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {

    const pathname =
        usePathname();

    const [isLoggedIn, setIsLoggedIn] =
        useState(false);

    useEffect(() => {

        setIsLoggedIn(
            !!localStorage.getItem("token")
        );

    }, [pathname]);


    const menus = [

        {
            href: "/",
            label: "Dashboard",
            icon: <FaChartLine />
        },

        {
            href: "/transactions",
            label: "Transactions",
            icon: <FaTable />
        },

        {
            href: "/import",
            label: "Import",
            icon: <FaFileImport />
        },


    ];

    function logout() {

        localStorage.removeItem(
            "token"
        );

        setIsLoggedIn(false);

        window.location.href =
            "/login";

    }

    return (

        <nav
            className="
            sticky top-0 z-50
            backdrop-blur-lg
            bg-white/70
            border-b
            shadow-sm
        "
        >

            <div
                className="
    max-w-7xl
    mx-auto
    px-6
    h-16
    flex
    items-center
    justify-between
"
            >

                {/* LOGO */}

                <Link
                    href="/"
                    className="
        font-bold
        text-xl
        text-indigo-600
    "
                >
                    📊 Sales Analytics
                </Link>

                {/* MENU + LOGIN */}

                <div
                    className="
        flex
        items-center
        gap-2
        overflow-x-auto
        whitespace-nowrap
    "
                >

                    {menus.map(menu => (

                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`
                     flex-shrink-0
                                flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    transition-all

                    ${pathname === menu.href
                                    ? "bg-indigo-600 text-white shadow"
                                    : "hover:bg-indigo-100"
                                }
                `}
                        >
                            {menu.icon}
                            {menu.label}
                        </Link>

                    ))}

                    {isLoggedIn ? (

                        <button
                            onClick={logout}
                            className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-xl
                flex
                items-center
                gap-2
            "
                        >
                            Logout
                        </button>

                    ) : (

                        <Link
                            href="/login"
                            className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-xl
            "
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </nav>

    );

}