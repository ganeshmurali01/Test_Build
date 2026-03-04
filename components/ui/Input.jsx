import "@/styles/components/input.css";

/**
 * Controlled Input with label, error, and helper text.
 *
 * @param {string} id          - Ties label to input (required)
 * @param {string} [label]     - Label text
 * @param {string} [error]     - Validation error message
 * @param {string} [helper]    - Helper / hint text
 */
export default function Input({
    id,
    label,
    error,
    helper,
    className = "",
    ...props
}) {
    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={["input-field", error ? "input-field--error" : "", className]
                    .filter(Boolean)
                    .join(" ")}
                aria-describedby={
                    [error ? `${id}-error` : null, helper ? `${id}-helper` : null]
                        .filter(Boolean)
                        .join(" ") || undefined
                }
                aria-invalid={!!error}
                {...props}
            />
            {error && <span id={`${id}-error`} className="input-error" role="alert">{error}</span>}
            {helper && <span id={`${id}-helper`} className="input-helper">{helper}</span>}
        </div>
    );
}
