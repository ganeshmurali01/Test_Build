import { NextResponse } from "next/server";
import { cookieOptions } from "@/lib/auth";

export async function POST() {
    const opts = cookieOptions(0); // maxAge=0 expires the cookie immediately
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    response.cookies.set(opts.name, "", { ...opts, maxAge: 0 });
    return response;
}
