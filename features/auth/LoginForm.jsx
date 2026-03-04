"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema } from "@/lib/validators";
import { post } from "@/lib/fetcher";

export default function LoginForm() {
    const router = useRouter();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    function handleChange(e) {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        setApiError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Client-side validation
        const result = loginSchema.safeParse(fields);
        if (!result.success) {
            const errs = {};
            for (const issue of result.error.issues) {
                errs[issue.path[0]] = issue.message;
            }
            setErrors(errs);
            return;
        }

        setLoading(true);
        try {
            await post("/api/auth/login", fields);
            router.push("/profile");
            router.refresh();
        } catch (err) {
            setApiError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {apiError && (
                <div role="alert" style={{ color: "var(--color-danger-500)", fontSize: "var(--text-sm)", padding: "var(--space-3)", background: "rgb(239 68 68 / 0.08)", borderRadius: "var(--radius-md)" }}>
                    {apiError}
                </div>
            )}

            <Input
                id="login-email"
                name="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                value={fields.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                required
            />

            <Input
                id="login-password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={fields.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                required
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} style={{ width: "100%", marginTop: "var(--space-2)" }}>
                {loading ? "Signing in…" : "Sign in"}
            </Button>
        </form>
    );
}
