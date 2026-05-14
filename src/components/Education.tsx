"use client";
import { education } from "@/lib/data";

export default function Education() {
    return (
        <section id="education" className="section" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-book-open" /> Education
                </h2>
                <div className="section-divider" />

                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {education.map((edu, i) => (
                        <div key={i} className="timeline-item reveal">
                            <div className="timeline-date">
                                <span><i className="fas fa-calendar" style={{ color: "var(--accent-light)", marginRight: "0.3rem" }} />{edu.period}</span>
                                <span className="timeline-location">
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: "0.3rem" }} />{edu.location}
                                </span>
                            </div>
                            <div
                                style={{
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                }}
                                className="timeline-content"
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        gap: "1rem",
                                        flexWrap: "wrap",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ marginBottom: "0.25rem" }}>{edu.degree}</h3>
                                        <p style={{ fontSize: "0.85rem", color: "var(--accent-light)", fontWeight: 500 }}>
                                            {edu.institution}
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            padding: "0.3rem 0.8rem",
                                            border: "1px solid var(--accent)",
                                            borderRadius: "0.5rem",
                                            fontSize: "0.75rem",
                                            color: "var(--accent-light)",
                                            whiteSpace: "nowrap",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.3rem",
                                        }}
                                    >
                                        <i className="fas fa-award" /> {edu.badge}
                                    </span>
                                </div>
                                <ul>
                                    {edu.points.map((p, j) => (
                                        <li key={j}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
