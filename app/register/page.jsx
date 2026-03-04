"use client";

import Link from "next/link";
import RegisterForm from "@/features/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div
            style={{
                minHeight: "calc(100vh - var(--navbar-height))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-6)",
                background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgb(26 86 255 / 0.08), transparent 70%)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 480,
                    background: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-2xl)",
                    padding: "var(--space-10)",
                    boxShadow: "var(--shadow-xl)",
                }}
            >
                <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-2)" }}>
                    Create an account
                </h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-8)" }}>
                    Join ShopNext and start shopping today.
                </p>

                <RegisterForm />

                <p style={{ textAlign: "center", marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    Already have an account?{" "}
                    <Link href="/login" style={{ color: "var(--color-brand-500)", fontWeight: "var(--font-medium)" }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
