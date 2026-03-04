"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCart } from "@/components/providers/CartProvider";
import "@/styles/components/navbar.css";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/profile", label: "Profile" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const { totalItems } = useCart();

    const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

    return (
        <nav className="navbar" aria-label="Main navigation">
            <div className="navbar__inner">
                <Link href="/" className="navbar__logo">
                    ShopNext
                </Link>

                <ul className="navbar__links" role="list">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={[
                                    "navbar__link",
                                    pathname === href ? "navbar__link--active" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn--ghost btn--sm"
                        aria-label="Toggle colour theme"
                        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                    >
                        {resolvedTheme === "dark" ? "☀️" : "🌙"}
                    </button>

                    {/* Cart */}
                    <Link href="/cart" className="btn btn--ghost btn--sm navbar__cart-btn" aria-label={`Cart, ${totalItems} items`}>
                        🛒
                        {totalItems > 0 && (
                            <span className="navbar__cart-badge" aria-hidden="true">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Auth */}
                    <Link href="/login" className="btn btn--primary btn--sm">
                        Sign in
                    </Link>
                </div>
            </div>
        </nav>
    );
}
