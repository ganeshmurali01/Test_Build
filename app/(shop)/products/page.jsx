import { getAllProducts } from "@/lib/db";
import ProductGrid from "@/features/products/ProductGrid";
import { buildMetadata } from "@/components/seo/SEO";

export const metadata = buildMetadata({
    title: "Products",
    description: "Browse our full catalogue of hand-picked products.",
});

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ProductsPage() {
    const products = getAllProducts();

    return (
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-12) var(--space-6)" }}>
            <div style={{ marginBottom: "var(--space-8)" }}>
                <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-2)" }}>
                    All Products
                </h1>
                <p style={{ color: "var(--text-secondary)" }}>
                    {products.length} item{products.length !== 1 ? "s" : ""} available
                </p>
            </div>
            <ProductGrid products={products} />
        </div>
    );
}
