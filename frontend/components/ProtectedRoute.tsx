"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }: any) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const isLoginPage = pathname === "/login";

        // ❗ kalau belum login dan bukan login page → paksa ke login
        if (!token && !isLoginPage) {
            router.replace("/login");
        }
    }, [pathname]);

    const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const isLoginPage = pathname === "/login";

    // kalau belum login → hanya izinkan login page
    if (!token && !isLoginPage) {
        return null;
    }

    return children;
}