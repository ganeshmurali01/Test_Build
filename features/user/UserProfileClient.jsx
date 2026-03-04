"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { profileSchema } from "@/lib/validators";
import { post } from "@/lib/fetcher";

/**
 * UserProfileClient
 * Receives initial user data from the server component as a prop.
 * @param {{ user: { id: string, name: string, email: string, avatar: string } }} props
 */
export default function UserProfileClient({ user }) {
    const [fields, setFields] = useState({ name: user.name, email: user.email, avatar: user.avatar || "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState("");

    function handleChange(e) {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        setSuccess(false);
        setApiError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const result = profileSchema.safeParse(fields);
        if (!result.success) {
            const errs = {};
            for (const issue of result.error.issues) errs[issue.path[0]] = issue.message;
            setErrors(errs);
            return;
        }

        setLoading(true);
        try {
            await post(`/api/users/${user.id}`, result.data);
            setSuccess(true);
        } catch (err) {
            setApiError(err.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fields.avatar || user.avatar} alt="Avatar" width={80} height={80}
                    style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }} />
                <div>
                    <p style={{ fontWeight: "var(--font-semibold)", fontSize: "var(--text-lg)" }}>{user.name}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>{user.email}</p>
                </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {apiError && <div role="alert" style={{ color: "var(--color-danger-500)", fontSize: "var(--text-sm)" }}>{apiError}</div>}
                {success && <div role="status" style={{ color: "var(--color-success-500)", fontSize: "var(--text-sm)" }}>Profile updated!</div>}

                <Input id="profile-name" name="name" label="Full name" value={fields.name} onChange={handleChange} error={errors.name} />
                <Input id="profile-email" name="email" type="email" label="Email" value={fields.email} onChange={handleChange} error={errors.email} />
                <Input id="profile-avatar" name="avatar" label="Avatar URL (optional)" placeholder="https://..." value={fields.avatar} onChange={handleChange} error={errors.avatar} />

                <Button type="submit" loading={loading} style={{ alignSelf: "flex-start" }}>
                    {loading ? "Saving…" : "Save changes"}
                </Button>
            </form>
        </div>
    );
}
