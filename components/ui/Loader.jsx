import "@/styles/components/loader.css";

/**
 * Loader spinner, optionally as a full-screen overlay.
 *
 * @param {"sm"|"md"|"lg"} [size="md"]
 * @param {boolean}        [overlay=false]  - Render full-screen overlay
 * @param {string}         [label="Loading..."] - Screen-reader text
 */
export default function Loader({ size = "md", overlay = false, label = "Loading..." }) {
    const spinner = (
        <div className={`loader loader--${size}`} role="status" aria-label={label}>
            <div className="loader__spinner" />
        </div>
    );

    if (overlay) {
        return <div className="loader-overlay">{spinner}</div>;
    }

    return spinner;
}
