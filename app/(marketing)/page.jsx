import Link from "next/link";
import { buildMetadata } from "@/components/seo/SEO";

export const metadata = buildMetadata({
    title: "Home",
    description: "ShopNext — discover and buy the best products, curated just for you.",
});

export default function HomePage() {
    return (
        <>
            {/* ── Hero ── */}
            <section
                style={{
                    minHeight: "88vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "var(--space-12) var(--space-6)",
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgb(26 86 255 / 0.12), transparent 60%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-semibold)", color: "var(--color-brand-500)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
                    New collection · Spring 2025
                </p>
                <h1
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, var(--text-6xl))",
                        fontWeight: "var(--font-bold)",
                        lineHeight: "var(--leading-tight)",
                        letterSpacing: "-0.03em",
                        maxWidth: 800,
                        marginBottom: "var(--space-6)",
                    }}
                >
                    Products you&apos;ll{" "}
                    <span style={{ background: "linear-gradient(135deg, var(--color-brand-400), var(--color-accent-500))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        love
                    </span>
                    , delivered fast.
                </h1>
                <p style={{ fontSize: "var(--text-xl)", color: "var(--text-secondary)", maxWidth: 540, marginBottom: "var(--space-10)" }}>
                    Curated electronics, accessories, and lifestyle goods — with zero fuss and free returns.
                </p>
                <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
                    <Link href="/products" className="btn btn--primary btn--lg">
                        Shop now
                    </Link>
                    <Link href="/login" className="btn btn--secondary btn--lg">
                        Sign in
                    </Link>
                </div>
            </section>

            {/* ── Value Props ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--space-20) var(--space-6)" }}>
                <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
                    <h2 style={{ textAlign: "center", fontSize: "var(--text-3xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-12)" }}>
                        Why ShopNext?
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)" }}>
                        {[
                            { icon: "🚀", title: "Fast delivery", desc: "2-day shipping on every order, no minimum." },
                            { icon: "🔄", title: "Free returns", desc: "30-day hassle-free returns policy." },
                            { icon: "🔒", title: "Secure checkout", desc: "Your data is always encrypted and safe." },
                            { icon: "💬", title: "24/7 Support", desc: "Real humans ready to help, any time." },
                        ].map(({ icon, title, desc }) => (
                            <div
                                key={title}
                                style={{ background: "var(--bg-base)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-xl)", padding: "var(--space-8)", textAlign: "center" }}
                            >
                                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-4)" }}>{icon}</div>
                                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: "var(--font-semibold)", marginBottom: "var(--space-2)" }}>{title}</h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section style={{ padding: "var(--space-20) var(--space-6)", textAlign: "center" }}>
                <div style={{ maxWidth: 640, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-4)" }}>
                        Ready to explore?
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-8)" }}>
                        Browse our full catalogue of hand-picked products.
                    </p>
                    <Link href="/products" className="btn btn--primary btn--lg">
                        Browse products →
                    </Link>
                </div>
            </section>
        </>
    );
}
