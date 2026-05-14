"use client";
import { useEffect, useCallback, useState } from "react";
import { personal } from "@/lib/data";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    const [loaded, setLoaded] = useState(false);

    // Reset loaded state each time modal opens
    useEffect(() => {
        if (isOpen) setLoaded(false);
    }, [isOpen]);

    // Close on Escape
    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKey]);

    if (!isOpen) return null;

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.88)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: 9998,
                    animation: "rm-fade 0.22s ease",
                }}
            />

            {/* ── Modal ── */}
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(900px, 96vw)",
                    height: "min(92vh, 960px)",
                    background: "#080810",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 9999,
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(16,185,129,0.08)",
                    animation: "rm-up 0.28s cubic-bezier(.16,1,.3,1)",
                }}
            >
                {/* ── Header bar ── */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1.25rem",
                    background: "rgba(16,185,129,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                    gap: "1rem",
                }}>
                    {/* Left: title */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
                        <div style={{
                            width: "32px", height: "32px", flexShrink: 0,
                            borderRadius: "0.5rem",
                            background: "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <i className="fas fa-file-pdf" style={{ color: "#10b981", fontSize: "0.82rem" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>
                                Vinay Kumar
                            </p>
                            <p style={{ fontSize: "0.68rem", color: "#6b7280", margin: 0, marginTop: "0.1rem" }}>
                                resume.pdf
                            </p>
                        </div>
                    </div>

                    {/* Right: actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                        {/* Download */}
                        <a
                            href={personal.resumeUrl}
                            download="Vinay_Kumar_Resume.pdf"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                padding: "0.42rem 1rem",
                                borderRadius: "0.5rem",
                                background: "#10b981", color: "#000",
                                fontWeight: 700, fontSize: "0.78rem",
                                textDecoration: "none",
                                transition: "background 0.2s, transform 0.1s",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "#34d399";
                                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "#10b981";
                                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                            }}
                        >
                            <i className="fas fa-download" style={{ fontSize: "0.72rem" }} /> Download
                        </a>

                        {/* Open in new tab */}
                        <a
                            href={personal.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Open in new tab"
                            style={iconBtnStyle}
                            onMouseEnter={iconBtnHoverIn}
                            onMouseLeave={iconBtnHoverOut}
                        >
                            <i className="fas fa-external-link-alt" style={{ fontSize: "0.72rem" }} />
                        </a>

                        {/* Close */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            style={{ ...iconBtnStyle, cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.background = "rgba(248,113,113,0.12)";
                                el.style.borderColor = "rgba(248,113,113,0.35)";
                                el.style.color = "#f87171";
                            }}
                            onMouseLeave={iconBtnHoverOut}
                        >
                            <i className="fas fa-times" style={{ fontSize: "0.8rem" }} />
                        </button>
                    </div>
                </div>

                {/* ── PDF Viewer area ── */}
                <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#12121e" }}>

                    {/* Loading shimmer */}
                    {!loaded && (
                        <div style={{
                            position: "absolute", inset: 0, zIndex: 2,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: "1.25rem",
                            background: "#12121e",
                        }}>
                            {/* Animated document skeleton */}
                            <div style={{
                                width: "min(420px, 80%)",
                                background: "#1a1a28",
                                borderRadius: "0.75rem",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}>
                                {[100, 70, 85, 55, 90, 65, 80, 50, 75, 60].map((w, i) => (
                                    <div key={i} style={{
                                        height: "10px",
                                        margin: `${i === 0 ? "1.5rem" : "0.55rem"} 1.5rem`,
                                        borderRadius: "4px",
                                        width: `${w}%`,
                                        background: "rgba(255,255,255,0.06)",
                                        animation: `rm-shimmer 1.5s ease-in-out infinite`,
                                        animationDelay: `${i * 0.08}s`,
                                    }} />
                                ))}
                                <div style={{ height: "1rem" }} />
                            </div>
                            <div style={{
                                display: "flex", alignItems: "center", gap: "0.6rem",
                                fontSize: "0.8rem", color: "#6b7280",
                            }}>
                                <i className="fas fa-circle-notch fa-spin" style={{ color: "#10b981" }} />
                                Loading resume…
                            </div>
                        </div>
                    )}

                    {/* PDF iframe */}
                    <iframe
                        key={personal.resumeUrl}
                        src={`${personal.resumeUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit`}
                        title="Resume Preview"
                        onLoad={() => setLoaded(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            display: "block",
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.4s ease",
                        }}
                    />
                </div>

                {/* ── Footer hint ── */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    padding: "0.6rem 1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(0,0,0,0.3)",
                    flexShrink: 0,
                }}>
                    <span style={{ fontSize: "0.68rem", color: "#4b5563", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <kbd style={{ padding: "0.1rem 0.4rem", borderRadius: "0.25rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.65rem", color: "#6b7280" }}>Esc</kbd>
                        to close
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#4b5563" }}>·</span>
                    <span style={{ fontSize: "0.68rem", color: "#4b5563" }}>Scroll inside to read</span>
                </div>
            </div>

            <style>{`
                @keyframes rm-fade {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes rm-up {
                    from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) scale(0.97); }
                    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes rm-shimmer {
                    0%, 100% { opacity: 0.4; }
                    50%       { opacity: 0.9; }
                }
            `}</style>
        </>
    );
}

// ── Shared icon button style helpers ──────────────────────────────────────────
const iconBtnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    borderRadius: "0.5rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#9ca3af",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.18s ease",
};

function iconBtnHoverIn(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    el.style.background = "rgba(16,185,129,0.1)";
    el.style.borderColor = "rgba(16,185,129,0.35)";
    el.style.color = "#10b981";
}
function iconBtnHoverOut(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    el.style.background = "rgba(255,255,255,0.04)";
    el.style.borderColor = "rgba(255,255,255,0.09)";
    el.style.color = "#9ca3af";
}
