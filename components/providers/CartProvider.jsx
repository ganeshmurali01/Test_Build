"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        }
        case "REMOVE_ITEM":
            return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "HYDRATE":
            return action.payload;
        default:
            return state;
    }
}

const initialState = { items: [] };

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
        } catch { }
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
    const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
    const updateQty = (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within <CartProvider>");
    return ctx;
}
