"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import "@/styles/components/card.css";

/**
 * ProductCard
 * @param {{ product: { id, name, description, price, image, category, stock } }} props
 */
export default function ProductCard({ product }) {
    const { addItem } = useCart();

    return (
        <article className="card">
            <Link href={`/products/${product.id}`} className="card__image-wrap" style={{ display: "block" }}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={450}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Link>

            <div className="card__body">
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginBottom: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.category}
                </p>
                <h3 className="card__title">
                    <Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {product.name}
                    </Link>
                </h3>
                <p className="card__price">${product.price.toFixed(2)}</p>
            </div>

            <div className="card__footer">
                <button
                    id={`add-to-cart-${product.id}`}
                    className="btn btn--primary btn--md"
                    style={{ width: "100%" }}
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? "Out of stock" : "Add to cart"}
                </button>
            </div>
        </article>
    );
}
