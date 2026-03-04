/**
 * lib/validators.js
 * Zod schemas for auth forms, profile updates, and product filters.
 */

import { z } from "zod";

/* ── Auth ── */

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(80, "Name is too long"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Enter a valid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password is too long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

/* ── Profile ── */

export const profileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(80, "Name is too long"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

/* ── Product Filters ── */

export const productFilterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    sort: z.enum(["price_asc", "price_desc", "newest", "popular"]).optional(),
});

/**
 * Helper: parse & validate data against a schema.
 * Returns { data, errors } — errors is null on success.
 *
 * @template T
 * @param {import("zod").ZodSchema<T>} schema
 * @param {unknown} data
 * @returns {{ data: T | null, errors: Record<string, string> | null }}
 */
export function validate(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) return { data: result.data, errors: null };

    const errors = {};
    for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (!errors[key]) errors[key] = issue.message;
    }
    return { data: null, errors };
}
