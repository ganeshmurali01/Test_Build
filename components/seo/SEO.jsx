/**
 * components/seo/SEO.jsx
 *
 * Helper that returns a Next.js-compatible metadata object.
 * Use inside generateMetadata() in server components.
 *
 * @example
 * // app/(shop)/products/[id]/page.jsx
 * export async function generateMetadata({ params }) {
 *   const product = await getProduct(params.id);
 *   return buildMetadata({ title: product.name, description: product.description });
 * }
 */

const SITE_NAME = "ShopNext";
const SITE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Build a Next.js metadata object.
 *
 * @param {{ title?: string, description?: string, image?: string, noIndex?: boolean }} opts
 * @returns {import("next").Metadata}
 */
export function buildMetadata({
    title,
    description = "Discover and buy the best products, curated just for you.",
    image = "/og-image.png",
    noIndex = false,
} = {}) {
    const fullTitle = title ? `${title} – ${SITE_NAME}` : SITE_NAME;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            siteName: SITE_NAME,
            images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630 }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [`${SITE_URL}${image}`],
        },
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    };
}
