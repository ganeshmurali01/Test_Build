/**
 * lib/fetcher.js
 * Central fetch wrapper used by client and server components.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Generic fetch wrapper with JSON defaults, error normalisation, and
 * optional bearer token injection.
 *
 * @param {string} url        - Relative path (e.g. "/api/products") or full URL
 * @param {RequestInit} [options]
 * @param {string} [token]    - Optional bearer token (used client-side)
 * @returns {Promise<any>}    - Parsed JSON response
 * @throws {Error}            - With `message` and `status` properties
 */
export async function fetcher(url, options = {}, token) {
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(fullUrl, {
        ...options,
        headers,
        // Always send cookies when called from the browser
        credentials: "include",
    });

    if (!response.ok) {
        let message = `HTTP ${response.status}`;
        try {
            const body = await response.json();
            message = body.message || body.error || message;
        } catch {
            // ignore json parse errors
        }
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) return null;

    return response.json();
}

/** Convenience wrappers */
export const get = (url, opts, token) => fetcher(url, { ...opts, method: "GET" }, token);
export const post = (url, body, opts, token) =>
    fetcher(url, { ...opts, method: "POST", body: JSON.stringify(body) }, token);
export const put = (url, body, opts, token) =>
    fetcher(url, { ...opts, method: "PUT", body: JSON.stringify(body) }, token);
export const del = (url, opts, token) => fetcher(url, { ...opts, method: "DELETE" }, token);
