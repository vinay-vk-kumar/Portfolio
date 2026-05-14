"use client";
import { skillCategories } from "@/lib/data";

export default function Skills() {
    return (
        <section id="skills" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-code" /> Skills & Tech Stack
                </h2>
                <div className="section-divider" />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {skillCategories.map((cat) => (
                        <div
                            key={cat.title}
                            className="skill-cat-card reveal"
                            style={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ["--cat-color" as any]: cat.color,
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = cat.color;
                                el.style.transform = "translateY(-4px)";
                                el.style.boxShadow = `0 8px 30px ${cat.color}18`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = "var(--border)";
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "none";
                            }}
                        >
                            <h3 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                fontSize: "0.92rem",
                                fontWeight: 700,
                                color: "var(--text)",
                                marginBottom: "1rem",
                            }}>
                                <span style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "0.5rem",
                                    background: `${cat.color}18`,
                                    border: `1px solid ${cat.color}30`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <i className={cat.icon} style={{ color: cat.color, fontSize: "0.78rem" }} />
                                </span>
                                {cat.title}
                            </h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                                {cat.skills.map((s) => (
                                    <span
                                        key={s}
                                        className="skill-tag"
                                        style={{ borderColor: `${cat.color}20` }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget as HTMLSpanElement;
                                            el.style.background = `${cat.color}15`;
                                            el.style.borderColor = `${cat.color}60`;
                                            el.style.color = cat.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget as HTMLSpanElement;
                                            el.style.background = "";
                                            el.style.borderColor = `${cat.color}20`;
                                            el.style.color = "";
                                        }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
