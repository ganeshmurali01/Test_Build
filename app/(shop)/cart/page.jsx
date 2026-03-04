"use client";

import { useCart } from "@/components/providers/CartProvider";
import CartItem from "@/features/cart/CartItem";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CartPage() {
    const { items, totalItems, totalPrice, clearCart } = useCart();

    return (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "var(--space-12) var(--space-6)" }}>
            <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: "var(--font-bold)", marginBottom: "var(--space-8)" }}>
                Your Cart
            </h1>

            {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "var(--space-20)", color: "var(--text-secondary)" }}>
                    <p style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-6)" }}>Your cart is empty.</p>
                    <Link href="/products" className="btn btn--primary btn--lg">Start shopping</Link>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
                    {/* Items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Summary */}
                    <aside
                        style={{
                            background: "var(--bg-subtle)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "var(--radius-xl)",
                            padding: "var(--space-6)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--space-4)",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                            <span>Items ({totalItems})</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "var(--font-bold)", fontSize: "var(--text-lg)", borderTop: "1px solid var(--border-color)", paddingTop: "var(--space-4)" }}>
                            <span>Total</span>
                            <span style={{ color: "var(--color-brand-500)" }}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button id="checkout-btn" variant="primary" size="lg" style={{ width: "100%" }}>
                            Checkout
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearCart} style={{ alignSelf: "center", color: "var(--color-danger-500)" }}>
                            Clear cart
                        </Button>
                    </aside>
                </div>
            )}
        </div>
    );
}
