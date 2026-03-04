"use client";

import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";

/**
 * CartItem
 * @param {{ item: { id, name, price, image, quantity } }} props
 */
export default function CartItem({ item }) {
    const { removeItem, updateQty } = useCart();

    return (
        <div
            style={{
                display: "flex",
                gap: "var(--space-4)",
                alignItems: "center",
                padding: "var(--space-4)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-base)",
            }}
        >
            {/* Thumbnail */}
            <div style={{ flexShrink: 0, width: 80, height: 80, borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--bg-muted)" }}>
                <Image src={item.image} alt={item.name} width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "var(--font-semibold)", marginBottom: "var(--space-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.name}
                </p>
                <p style={{ color: "var(--color-brand-500)", fontWeight: "var(--font-bold)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Quantity controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <button
                    className="btn btn--ghost btn--sm"
                    onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
                    aria-label="Decrease quantity"
                >−</button>
                <span style={{ minWidth: 24, textAlign: "center", fontWeight: "var(--font-semibold)" }}>
                    {item.quantity}
                </span>
                <button
                    className="btn btn--ghost btn--sm"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                >+</button>
            </div>

            {/* Remove */}
            <button
                className="btn btn--danger btn--sm"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
            >
                ✕
            </button>
        </div>
    );
}
