import Link from "next/link";

const FOOTER_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/products", label: "Shop" },
    { href: "/cart", label: "Cart" },
    { href: "/login", label: "Sign In" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--border-color)",
                background: "var(--bg-subtle)",
                padding: "var(--space-8) var(--space-6)",
                marginTop: "auto",
            }}
        >
            <div
                style={{
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-8)",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span
                    style={{
                        fontWeight: "var(--font-bold)",
                        fontSize: "var(--text-lg)",
                        color: "var(--color-brand-500)",
                    }}
                >
                    PawNext
                </span>

                <nav aria-label="Footer navigation">
                    <ul
                        style={{ display: "flex", gap: "var(--space-6)", listStyle: "none", padding: 0, margin: 0 }}
                    >
                        {FOOTER_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    style={{
                                        fontSize: "var(--text-sm)",
                                        color: "var(--text-secondary)",
                                        textDecoration: "none",
                                        transition: "color var(--duration-fast)",
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0 }}>
                    © {year} PawNext. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
