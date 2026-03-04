import ProductCard from "./ProductCard";

/**
 * ProductGrid
 * @param {{ products: Array }} props
 */
export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "var(--space-20)", color: "var(--text-secondary)" }}>
                <p style={{ fontSize: "var(--text-xl)" }}>No products found.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "var(--space-6)",
            }}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
