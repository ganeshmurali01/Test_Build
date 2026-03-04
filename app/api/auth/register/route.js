import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/db";
import { registerSchema } from "@/lib/validators";

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        // Check uniqueness
        if (findUserByEmail(email)) {
            return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
        }

        // Create user — store password plain-text for demo only.
        // Replace with bcrypt.hash(password, 12) in production.
        const user = createUser({ name, email, passwordHash: password });

        return NextResponse.json(
            { message: "Account created successfully", userId: user.id },
            { status: 201 }
        );
    } catch (err) {
        console.error("[POST /api/auth/register]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
