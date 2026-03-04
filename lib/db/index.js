/**
 * lib/db/index.js
 * In-memory mock database.
 * Replace with a real DB client (Prisma, Drizzle, etc.) when ready.
 */

import { randomUUID } from "crypto";

/* ───────────────────────────
   Users
─────────────────────────── */

/** @type {Array<{ id: string, name: string, email: string, passwordHash: string, avatar: string, createdAt: string }>} */
export const usersDb = [];

export function findUserByEmail(email) {
    return usersDb.find((u) => u.email === email) || null;
}

export function findUserById(id) {
    return usersDb.find((u) => u.id === id) || null;
}

export function createUser({ name, email, passwordHash }) {
    const user = {
        id: randomUUID(),
        name,
        email,
        passwordHash,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString(),
    };
    usersDb.push(user);
    return user;
}

/* ───────────────────────────
   Products (mock seed data)
─────────────────────────── */

/** @type {Array<{ id: string, name: string, description: string, price: number, category: string, image: string, stock: number }>} */
export const productsDb = [
    {
        id: "1",
        name: "Wireless Headphones",
        description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
        price: 129.99,
        category: "Electronics",
        image: "https://picsum.photos/seed/headphones/600/450",
        stock: 42,
    },
    {
        id: "2",
        name: "Minimalist Watch",
        description: "Elegant stainless steel watch with a sapphire crystal face.",
        price: 249.99,
        category: "Accessories",
        image: "https://picsum.photos/seed/watch/600/450",
        stock: 18,
    },
    {
        id: "3",
        name: "Leather Backpack",
        description: "Handcrafted full-grain leather backpack with laptop compartment.",
        price: 189.99,
        category: "Bags",
        image: "https://picsum.photos/seed/backpack/600/450",
        stock: 25,
    },
    {
        id: "4",
        name: "Mechanical Keyboard",
        description: "Tactile 75% mechanical keyboard with hot-swap switches and RGB lighting.",
        price: 99.99,
        category: "Electronics",
        image: "https://picsum.photos/seed/keyboard/600/450",
        stock: 60,
    },
    {
        id: "5",
        name: "Ceramic Mug Set",
        description: "Set of 4 handmade ceramic mugs in earthy tones.",
        price: 44.99,
        category: "Home",
        image: "https://picsum.photos/seed/mugs/600/450",
        stock: 100,
    },
    {
        id: "6",
        name: "Running Shoes",
        description: "Lightweight trail running shoes with adaptive cushioning.",
        price: 159.99,
        category: "Footwear",
        image: "https://picsum.photos/seed/shoes/600/450",
        stock: 35,
    },
];

export function getAllProducts() {
    return productsDb;
}

export function findProductById(id) {
    return productsDb.find((p) => p.id === id) || null;
}
