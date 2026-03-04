import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db";
import { verifyToken, signToken, cookieOptions } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

// NOTE: bcrypt isn't included in the deps to keep this pure JS.
// In production replace the plain-text comparison with bcrypt.compare().
// For demo purposes passwords are stored as-is by the register route.

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate input
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { email, password } = result.data;

        // Look up user
        const user = findUserByEmail(email);
        if (!user || user.passwordHash !== password) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Sign JWT
        const token = await signToken({ id: user.id, email: user.email, name: user.name });

        // Build response with Set-Cookie
        const opts = cookieOptions();
        const response = NextResponse.json(
            { message: "Logged in successfully", user: { id: user.id, name: user.name, email: user.email } },
            { status: 200 }
        );
        response.cookies.set(opts.name, token, opts);

        return response;
    } catch (err) {
        console.error("[POST /api/auth/login]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
