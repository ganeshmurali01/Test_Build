import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "ShopNext",
    description: "Discover and buy the best products, curated just for you.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <ThemeProvider>
                    <CartProvider>
                        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                            <Navbar />
                            <main style={{ flex: 1 }}>
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
