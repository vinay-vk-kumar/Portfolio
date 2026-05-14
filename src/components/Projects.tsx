"use client";
import { useState } from "react";
import { projects } from "@/lib/data";

type FilterKey = "all" | "fullstack" | "devops";

const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All Projects" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "devops", label: "DevOps / Monitoring" },
];

export default function Projects() {
    const [active, setActive] = useState<FilterKey>("all");

    const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

    return (
        <section id="projects" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-folder-open" /> Projects
                </h2>
                <div className="section-divider" />

                {/* Filter tabs */}
                <div className="filter-tabs">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`filter-tab ${active === f.key ? "active" : ""}`}
                            onClick={() => setActive(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {filtered.map((p) => (
                        <div key={p.title} className="project-card">
                            {/* Gradient banner */}
                            <div className="project-img" style={{ background: p.bg }}>
                                <span style={{
                                    position: "absolute",
                                    top: "0.75rem",
                                    left: "0.75rem",
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    padding: "0.22rem 0.65rem",
                                    borderRadius: "9999px",
                                    background: p.badgeColor || "var(--accent)",
                                    color: p.badgeTextColor || "#fff",
                                    letterSpacing: "0.03em",
                                }}>
                                    {p.badge}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="project-body">
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                                <div className="project-tags">
                                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                                </div>
                                <div className="project-links">
                                    <a
                                        href={p.code}
                                        className="project-link"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={p.code === "#" ? { opacity: 0.4, pointerEvents: "none" } : {}}
                                    >
                                        <i className="fab fa-github" /> Code
                                    </a>
                                    {p.live && p.live !== "#" && (
                                        <a
                                            href={p.live}
                                            className="project-link live-link"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className="fas fa-external-link-alt" /> Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "2rem" }}>
                        No projects in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}
