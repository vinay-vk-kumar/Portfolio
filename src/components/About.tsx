"use client";
import { useState } from "react";
import { personal } from "@/lib/data";
import ResumeModal from "@/components/ResumeModal";

export default function About() {
    const [showResume, setShowResume] = useState(false);
    const infoCards = [
        { icon: "fas fa-graduation-cap", label: "Education", value: "B.Tech CSE (AI/ML) — IT Bhopal University" },
        { icon: "fas fa-map-marker-alt", label: "Location", value: personal.location },
        { icon: "fas fa-envelope", label: "Email", value: personal.email },
        { icon: "fas fa-layer-group", label: "Focus", value: "Full-Stack · Cloud · DevOps" },
    ];

    const stats = [
        { value: "8.88", label: "CGPA" },
        { value: "AWS", label: "Certified" },
        { value: "3+", label: "Clouds Used" },
    ];

    return (
        <>
        <section id="about" className="section" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-user-circle" /> About Me
                </h2>
                <div className="section-divider" />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 300px",
                        gap: "3rem",
                        alignItems: "start",
                    }}
                    className="about-grid"
                >
                    {/* Text */}
                    <div>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1rem", fontSize: "0.93rem" }}>
                            {personal.about}
                        </p>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "2rem", fontSize: "0.93rem" }}>
                            {personal.about2}
                        </p>

                        {/* Stats row */}
                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                            {stats.map((s) => (
                                <div key={s.label} className="stat-chip">
                                    <span className="stat-value">{s.value}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            <button
                                onClick={() => setShowResume(true)}
                                className="btn btn-primary"
                            >
                                <i className="fas fa-eye" /> Preview Resume
                            </button>
                            <a href={personal.resumeUrl} className="btn btn-outline" download>
                                <i className="fas fa-download" /> Download
                            </a>
                        </div>
                    </div>

                    {/* Info cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {infoCards.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "0.875rem 1rem",
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "0.75rem",
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = "var(--accent)";
                                    el.style.boxShadow = "0 4px 15px var(--accent-glow)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = "var(--border)";
                                    el.style.boxShadow = "none";
                                }}
                            >
                                <div style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "0.5rem",
                                    background: "var(--accent-dim)",
                                    border: "1px solid rgba(16,185,129,0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--accent)",
                                    flexShrink: 0,
                                }}>
                                    <i className={item.icon} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--text)", marginTop: "0.1rem" }}>{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
        <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
        </>
    );
}
