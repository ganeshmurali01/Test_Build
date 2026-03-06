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
        name: "Premium Grain-Free Dog Food",
        description: "High-protein roasted lamb and egg formula for all life stages. Includes probiotics for healthy digestion.",
        price: 49.99,
        category: "Food",
        image: "https://images.unsplash.com/photo-1589924691995-400dc9cecb58?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 42,
    },
    {
        id: "2",
        name: "Orthopaedic Dog Bed",
        description: "Memory foam bed that relieves joint pain and provides maximum comfort for older or active dogs.",
        price: 89.99,
        category: "Beds",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 18,
    },
    {
        id: "3",
        name: "Multi-Level Cat Tree",
        description: "60-inch tall scratching post tower with cozy condos and top perches for your feline friends.",
        price: 119.99,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1545249390-6bdfa2860c9f?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 25,
    },
    {
        id: "4",
        name: "Indestructible Chew Toy",
        description: "Tough rubber chew toy designed for aggressive chewers. Helps clean teeth and massage gums.",
        price: 14.99,
        category: "Toys",
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 60,
    },
    {
        id: "5",
        name: "Self-Cleaning Litter Box",
        description: "Automatic sifting litter box that controls odor and minimizes daily maintenance.",
        price: 149.99,
        category: "Hygiene",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 100,
    },
    {
        id: "6",
        name: "Reflective No-Pull Harness",
        description: "Comfortable, adjustable dog harness with front-clip design to stop pulling on walks.",
        price: 29.99,
        category: "Gear",
        image: "https://images.unsplash.com/photo-1601758064433-4f9e61dbff39?q=80&w=600&h=450&auto=format&fit=crop",
        stock: 35,
    },
];

export function getAllProducts() {
    return productsDb;
}

export function findProductById(id) {
    return productsDb.find((p) => p.id === id) || null;
}
