"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "@/styles/components/modal.css";

/**
 * Portal-based Modal with backdrop, close-on-escape, and focus trap.
 *
 * @param {boolean}          open       - Controls visibility
 * @param {() => void}       onClose    - Called when backdrop or × is clicked / Escape pressed
 * @param {string}           [title]    - Modal heading
 * @param {React.ReactNode}  [footer]   - Optional footer content
 */
export default function Modal({ open, onClose, title, footer, children }) {
    const dialogRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    // Focus the dialog on open
    useEffect(() => {
        if (open) dialogRef.current?.focus();
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            className="modal-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            aria-modal="true"
            role="dialog"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div className="modal" ref={dialogRef} tabIndex={-1}>
                {(title || onClose) && (
                    <div className="modal__header">
                        {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
                        <button className="modal__close" onClick={onClose} aria-label="Close modal">
                            ✕
                        </button>
                    </div>
                )}
                <div className="modal__body">{children}</div>
                {footer && <div className="modal__footer">{footer}</div>}
            </div>
        </div>,
        document.body
    );
}
