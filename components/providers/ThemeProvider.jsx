"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes ThemeProvider.
 * Attribute "data-theme" maps to the CSS custom properties in tokens.css.
 */
export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
        >
            {children}
        </NextThemesProvider>
    );
}
