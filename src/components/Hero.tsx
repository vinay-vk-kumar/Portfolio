"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";
import ResumeModal from "@/components/ResumeModal";

const roles = personal.tagline;

const floatingBadges = [
    { icon: "fab fa-aws", label: "AWS Cloud", color: "#f59e0b", delay: "0s" },
    { icon: "fab fa-docker", label: "Docker", color: "#0ea5e9", delay: "0.4s" },
    { icon: "fas fa-infinity", label: "CI/CD", color: "#a78bfa", delay: "0.8s" },
];

export default function Hero() {
    const [text, setText] = useState("");
    const [roleIdx, setRoleIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        const role = roles[roleIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && charIdx < role.length) {
            timeout = setTimeout(() => {
                setText(role.slice(0, charIdx + 1));
                setCharIdx((c) => c + 1);
            }, 75);
        } else if (!deleting && charIdx === role.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => {
                setText(role.slice(0, charIdx - 1));
                setCharIdx((c) => c - 1);
            }, 35);
        } else if (deleting && charIdx === 0) {
            setDeleting(false);
            setRoleIdx((r) => (r + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [charIdx, deleting, roleIdx]);

    return (
        <>
            <section
                id="home"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "100px 2rem 0",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    className="hero-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 280px",
                        gap: "4rem",
                        alignItems: "center",
                        maxWidth: "1000px",
                        width: "100%",
                        margin: "0 auto",
                    }}
                >
                    {/* ── Text Side ── */}
                    <div>
                        <p style={{
                            color: "var(--accent)",
                            marginBottom: "0.75rem",
                            fontSize: "0.9rem",
                            letterSpacing: "0.08em",
                            fontWeight: 600,
                            textTransform: "uppercase",
                        }}>
                            Hi there 👋 I&apos;m
                        </p>

                        <h1 style={{
                            fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                            fontWeight: 800,
                            color: "#fff",
                            lineHeight: 1.1,
                            marginBottom: "1rem",
                            letterSpacing: "-0.02em",
                        }}>
                            {personal.name}
                        </h1>

                        <div style={{
                            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                            marginBottom: "1.5rem",
                            minHeight: "2.5rem",
                        }}>
                            <span style={{ color: "var(--text-muted)" }}>I&apos;m a </span>
                            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{text}</span>
                            <span className="cursor" />
                        </div>

                        <p style={{
                            color: "var(--text-muted)",
                            lineHeight: 1.8,
                            maxWidth: "520px",
                            marginBottom: "2rem",
                            fontSize: "0.92rem",
                        }}>
                            Building production-ready full-stack apps and deploying them on cloud infrastructure with Docker, CI/CD, and Linux.
                            From backend APIs to Nginx configs — I do it all.
                        </p>

                        <div
                            className="hero-actions"
                            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}
                        >
                            <a href="#projects" className="btn btn-primary">
                                <i className="fas fa-rocket" /> View Projects
                            </a>
                            <button onClick={() => setShowResume(true)} className="btn btn-outline">
                                <i className="fas fa-eye" /> Resume
                            </button>
                            <a href="#contact" className="btn btn-outline">
                                <i className="fas fa-envelope" /> Contact
                            </a>
                        </div>

                        <div className="hero-socials" style={{ display: "flex", gap: "0.75rem" }}>
                            {Object.entries(personal.socials).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noreferrer" className="social-icon" aria-label={key}>
                                    <i className={`fab fa-${key === "github" ? "github" : "linkedin-in"}`} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Photo Side ── */}
                    <div
                        className="hero-photo-col"
                        style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        {/* Floating badges */}
                        {floatingBadges.map((badge, i) => (
                            <div
                                key={badge.label}
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.35rem 0.75rem",
                                    background: "var(--card)",
                                    border: `1px solid ${badge.color}40`,
                                    borderRadius: "9999px",
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    color: badge.color,
                                    whiteSpace: "nowrap",
                                    zIndex: 2,
                                    animation: `float${(i % 3) + 1} ${3.5 + i * 0.5}s ease-in-out infinite`,
                                    animationDelay: badge.delay,
                                    ...(i === 0 ? { top: "0", right: "-10px" } :
                                        i === 1 ? { bottom: "20px", right: "-15px" } :
                                            { top: "40%", left: "-20px" }),
                                }}
                            >
                                <i className={badge.icon} />
                                {badge.label}
                            </div>
                        ))}

                        {/* Photo */}
                        <div
                            className="hero-photo-ring"
                            style={{ width: "230px", height: "230px" }}
                        >
                            <Image
                                src="/Myself.jpg"
                                alt="Vinay Kumar"
                                width={230}
                                height={230}
                                priority
                                style={{ borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll hint */}
                <div style={{
                    marginTop: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    opacity: 0.4,
                }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>SCROLL</span>
                    <i className="fas fa-chevron-down" style={{ fontSize: "0.8rem", color: "var(--accent)", animation: "float2 1.5s ease-in-out infinite" }} />
                </div>
            </section>
            <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
        </>
    );
}
