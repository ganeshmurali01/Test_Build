"use client";

import { useCart } from "@/components/providers/CartProvider";
import Button from "@/components/ui/Button";

/**
 * Thin client component so the parent server page can stay RSC.
 * Receives product data as a plain prop.
 */
export default function AddToCartButton({ product }) {
    const { addItem } = useCart();

    return (
        <Button
            id={`add-to-cart-detail-${product.id}`}
            variant="primary"
            size="lg"
            disabled={product.stock === 0}
            onClick={() =>
                addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                })
            }
            style={{ alignSelf: "flex-start" }}
        >
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </Button>
    );
}
