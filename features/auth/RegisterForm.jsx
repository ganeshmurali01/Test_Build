"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerSchema } from "@/lib/validators";
import { post } from "@/lib/fetcher";

export default function RegisterForm() {
    const router = useRouter();
    const [fields, setFields] = useState({ name: "", email: "", password: "", confirmPassword: "" });
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
        const result = registerSchema.safeParse(fields);
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
            await post("/api/auth/register", { name: fields.name, email: fields.email, password: fields.password });
            router.push("/login");
        } catch (err) {
            setApiError(err.message || "Registration failed. Please try again.");
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

            <Input id="reg-name" name="name" label="Full name" placeholder="Jane Doe"
                value={fields.name} onChange={handleChange} error={errors.name} autoComplete="name" required />

            <Input id="reg-email" name="email" type="email" label="Email address" placeholder="you@example.com"
                value={fields.email} onChange={handleChange} error={errors.email} autoComplete="email" required />

            <Input id="reg-password" name="password" type="password" label="Password" placeholder="Min. 6 characters"
                value={fields.password} onChange={handleChange} error={errors.password} autoComplete="new-password" required />

            <Input id="reg-confirm" name="confirmPassword" type="password" label="Confirm password" placeholder="••••••••"
                value={fields.confirmPassword} onChange={handleChange} error={errors.confirmPassword} autoComplete="new-password" required />

            <Button type="submit" variant="primary" size="lg" loading={loading} style={{ width: "100%", marginTop: "var(--space-2)" }}>
                {loading ? "Creating account…" : "Create account"}
            </Button>
        </form>
    );
}
