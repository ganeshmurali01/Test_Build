import Link from "next/link";
import { buildMetadata } from "@/components/seo/SEO";
import "@/styles/components/hero.css";

export const metadata = buildMetadata({
    title: "Home",
    description: "PawNext — Premium pet grooming, boarding, services, and products.",
});

export default function HomePage() {
    return (
        <>
            {/* ── Bubbles & Bathtub Hero ── */}
            <section className="hero-pet">
                {/* Animated Background Bubbles */}
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1600&auto=format&fit=crop"
                    alt="Happy dog taking a bubble bath"
                    className="hero-pet__image"
                />

                <div className="hero-pet__content">
                    <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-bold)", color: "var(--color-brand-600)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
                        Premium Pet Care
                    </p>
                    <h1
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, var(--text-6xl))",
                            fontWeight: "var(--font-bold)",
                            lineHeight: "var(--leading-tight)",
                            letterSpacing: "-0.03em",
                            marginBottom: "var(--space-6)",
                            color: "var(--text-primary)",
                        }}
                    >
                        Pamper your best friend with{" "}
                        <span style={{ color: "var(--color-brand-500)", position: "relative" }}>
                            PawNext.
                        </span>
                    </h1>
                    <p style={{ fontSize: "var(--text-xl)", color: "var(--text-secondary)", marginBottom: "var(--space-10)" }}>
                        From luxury grooming and cozy boarding to top-tier products — we provide everything your pet needs to thrive.
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "var(--justify-center, flex-start)" }}>
                        <Link href="/products" className="btn btn--primary btn--lg">
                            Shop Products
                        </Link>
                        <Link href="#services" className="btn btn--secondary btn--lg">
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Services Grid ── */}
            <section id="services" style={{ background: "var(--bg-base)", padding: "var(--space-20) var(--space-6)" }}>
                <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
                        <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-4)" }}>
                            Our Pet Services
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-lg)", maxWidth: 600, margin: "0 auto" }}>
                            More than just a store. We offer a full suite of services to keep your furry friends happy, healthy, and looking their best.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-8)" }}>
                        {[
                            {
                                icon: "🛁",
                                title: "Grooming & Spa",
                                desc: "Full-service salon or convenient home grooming. Includes baths, haircuts, nail trimming, and pawdicures.",
                                color: "var(--color-brand-50)",
                            },
                            {
                                icon: "🏨",
                                title: "Pet Boarding",
                                desc: "Safe, comfortable, and cageless overnight boarding. 24/7 supervision with daily playgroups included.",
                                color: "rgba(139, 92, 246, 0.1)", // accent-500 lightened
                            },
                            {
                                icon: "📸",
                                title: "Pet Photography",
                                desc: "Professional studio or outdoor photoshoots to capture your pet's unique personality and charm.",
                                color: "rgba(34, 197, 94, 0.1)",  // success-500 lightened
                            },
                            {
                                icon: "🚶‍♂️",
                                title: "Sitting & Walking",
                                desc: "Reliable daily dog walking and in-home pet sitting so your pet stays comfortable in their own environment.",
                                color: "rgba(245, 158, 11, 0.1)", // warning-500 lightened
                            },
                            {
                                icon: "🐾",
                                title: "Pet Dating Hub",
                                desc: "Find playdates or potential matches for your pet. Perfect for socializing puppies and energetic dogs.",
                                color: "rgba(239, 68, 68, 0.1)",  // danger-500 lightened
                            },
                            {
                                icon: "🩺",
                                title: "Vet Concierge",
                                desc: "Need a ride to the vet? We offer pet transport services and can even sit with them during appointments.",
                                color: "var(--bg-muted)",
                            },
                        ].map(({ icon, title, desc, color }) => (
                            <div
                                key={title}
                                style={{
                                    background: "var(--bg-base)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "var(--radius-xl)",
                                    padding: "var(--space-8)",
                                    transition: "transform var(--duration-normal), box-shadow var(--duration-normal)",
                                    cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div style={{ width: 64, height: 64, borderRadius: "var(--radius-lg)", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", marginBottom: "var(--space-6)" }}>
                                    {icon}
                                </div>
                                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: "var(--font-semibold)", marginBottom: "var(--space-3)" }}>{title}</h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Products Teaser ── */}
            <section style={{ background: "var(--color-brand-900)", color: "var(--color-neutral-0)", padding: "var(--space-20) var(--space-6)", textAlign: "center" }}>
                <div style={{ maxWidth: 640, margin: "0 auto" }}>
                    <h2 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-4)" }}>
                        Treat them to the best
                    </h2>
                    <p style={{ color: "var(--color-brand-200)", marginBottom: "var(--space-8)", fontSize: "var(--text-lg)" }}>
                        From organic treats to orthopaedic beds, shop our curated collection of premium pet goods.
                    </p>
                    <Link href="/products" className="btn btn--primary btn--lg" style={{ background: "white", color: "var(--color-brand-900)" }}>
                        Shop Best Sellers →
                    </Link>
                </div>
            </section>
        </>
    );
}
