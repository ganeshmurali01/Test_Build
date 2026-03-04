/**
 * lib/auth.js
 * Auth helpers: read/verify JWT from HttpOnly cookie, return user payload.
 */

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

/** Encode the secret for jose */
function getSecret() {
    return new TextEncoder().encode(JWT_SECRET);
}

/**
 * Sign a JWT payload and return the token string.
 * @param {object} payload - Data to embed (e.g. { id, email, name })
 * @param {string} [expiresIn="7d"]
 */
export async function signToken(payload, expiresIn = "7d") {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(getSecret());
}

/**
 * Verify a JWT string and return the decoded payload.
 * Returns null if invalid or expired.
 * @param {string} token
 */
export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, getSecret());
        return payload;
    } catch {
        return null;
    }
}

/**
 * Read the auth cookie from the current request and return the decoded user.
 * Returns null if unauthenticated.
 * Use inside Server Components, Route Handlers, and middleware.
 */
export async function getUserFromCookie() {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

/**
 * Build cookie options for Set-Cookie headers.
 */
export function cookieOptions(maxAge = 60 * 60 * 24 * 7) {
    return {
        name: COOKIE_NAME,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
    };
}
