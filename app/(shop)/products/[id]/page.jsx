import { notFound } from "next/navigation";
import Image from "next/image";
import { findProductById, getAllProducts } from "@/lib/db";
import { buildMetadata } from "@/components/seo/SEO";
import AddToCartButton from "./AddToCartButton";

/** Pre-generate known product IDs at build time */
export async function generateStaticParams() {
    return getAllProducts().map((p) => ({ id: p.id }));
}

/** Per-page SEO metadata */
export async function generateMetadata({ params }) {
    const product = findProductById(params.id);
    if (!product) return buildMetadata({ title: "Product not found", noIndex: true });
    return buildMetadata({ title: product.name, description: product.description, image: product.image });
}

export default async function ProductDetailPage({ params }) {
    const product = findProductById(params.id);
    if (!product) notFound();

    return (
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-12) var(--space-6)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-12)", alignItems: "start" }}>
                {/* Image */}
                <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={450}
                        priority
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {product.category}
                    </p>
                    <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", lineHeight: "var(--leading-tight)" }}>
                        {product.name}
                    </h1>
                    <p style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--font-bold)", color: "var(--color-brand-500)" }}>
                        ${product.price.toFixed(2)}
                    </p>
                    <p style={{ color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
                        {product.description}
                    </p>
                    <p style={{ fontSize: "var(--text-sm)", color: product.stock > 10 ? "var(--color-success-500)" : "var(--color-warning-500)" }}>
                        {product.stock > 0 ? `✓ ${product.stock} in stock` : "✗ Out of stock"}
                    </p>

                    {/* Client component handles useCart() */}
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
