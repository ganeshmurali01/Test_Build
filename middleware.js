import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";

/** Routes requiring authentication */
const PROTECTED_PATTERNS = [
    /^\/profile(\/.*)?$/,
    /^\/(account)(\/.*)?$/,
];

/** Routes only accessible when NOT authenticated (redirect to profile) */
const AUTH_ONLY_PATTERNS = [
    /^\/login$/,
    /^\/register$/,
];

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const user = token ? await verifyToken(token) : null;

    // ── Protected routes ──────────────────────────────────────
    if (PROTECTED_PATTERNS.some((re) => re.test(pathname))) {
        if (!user) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ── Auth-only routes (redirect authenticated users away) ──
    if (AUTH_ONLY_PATTERNS.some((re) => re.test(pathname))) {
        if (user) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths EXCEPT:
         * - _next/static  (Next.js assets)
         * - _next/image   (image optimisation)
         * - favicon.ico
         * - public assets (png, jpg, svg, …)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
    ],
};
