import "@/styles/components/button.css";

/**
 * Polymorphic Button component.
 * Renders as <button> by default, or any element via the `as` prop.
 *
 * @param {"primary"|"secondary"|"ghost"|"danger"} [variant="primary"]
 * @param {"sm"|"md"|"lg"} [size="md"]
 * @param {boolean} [loading=false]
 * @param {boolean} [disabled=false]
 * @param {React.ElementType} [as="button"]
 */
export default function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    as: Tag = "button",
    className = "",
    ...props
}) {
    const classes = [
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} disabled={disabled || loading} {...props}>
            {loading && <span className="btn__spinner" aria-hidden="true" />}
            {children}
        </Tag>
    );
}
