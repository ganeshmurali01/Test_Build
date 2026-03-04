import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import UserProfileClient from "@/features/user/UserProfileClient";
import { buildMetadata } from "@/components/seo/SEO";

export const metadata = buildMetadata({ title: "My Profile", noIndex: true });

export default async function ProfilePage() {
    // Auth gate — runs server-side
    const session = await getUserFromCookie();
    if (!session) redirect("/login");

    const user = findUserById(session.id);
    if (!user) redirect("/login");

    // Strip password hash before passing to client component
    const { passwordHash: _, ...safeUser } = user;

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "var(--space-12) var(--space-6)" }}>
            <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-8)" }}>
                My Profile
            </h1>
            <UserProfileClient user={safeUser} />
        </div>
    );
}
