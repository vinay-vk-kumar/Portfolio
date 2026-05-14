"use client";
import { certifications } from "@/lib/data";

export default function Certifications() {
    return (
        <section id="certifications" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-certificate" /> Certifications
                </h2>
                <div className="section-divider" />

                <div className="cert-grid">
                    {certifications.map((cert) => (
                        <div
                            key={cert.title}
                            className={`cert-card reveal ${cert.featured ? "cert-featured" : ""}`}
                        >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: "0.85rem",
                            }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "0.6rem",
                                    background: `${cert.iconColor}18`,
                                    border: `1px solid ${cert.iconColor}30`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <i className={cert.icon} style={{ color: cert.iconColor, fontSize: "1.1rem" }} />
                                </div>
                                <span style={{
                                    fontSize: "0.72rem",
                                    color: "var(--text-dim)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                    background: "var(--bg)",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "9999px",
                                    border: "1px solid var(--border)",
                                }}>
                                    <i className="fas fa-calendar-alt" /> {cert.date}
                                </span>
                            </div>

                            <h3 style={{
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                marginBottom: "0.35rem",
                                color: cert.featured ? "var(--accent-light)" : "var(--text)",
                                lineHeight: 1.3,
                            }}>
                                {cert.title}
                            </h3>

                            <p style={{
                                fontSize: "0.78rem",
                                color: "var(--text-muted)",
                                marginBottom: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                fontWeight: 500,
                            }}>
                                <i className="fas fa-university" style={{ color: "var(--accent)", fontSize: "0.7rem" }} />
                                {cert.issuer}
                            </p>

                            {cert.desc && (
                                <p style={{
                                    fontSize: "0.78rem",
                                    color: "var(--text-muted)",
                                    lineHeight: 1.65,
                                    marginBottom: cert.link !== "#" ? "1rem" : "0",
                                }}>
                                    {cert.desc}
                                </p>
                            )}

                            {cert.link && cert.link !== "#" && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.35rem",
                                        fontSize: "0.75rem",
                                        color: "var(--accent)",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                        padding: "0.3rem 0.75rem",
                                        border: "1px solid rgba(16,185,129,0.3)",
                                        borderRadius: "0.4rem",
                                        background: "var(--accent-dim)",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
                                        (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-dim)";
                                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                                    }}
                                >
                                    <i className="fas fa-external-link-alt" /> View Certificate
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
