"use client";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";

const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Certs", href: "#certifications" },
];

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = links.map((l) => l.href.replace("#", "")).concat(["contact"]);
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActive(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            height: "64px",
            background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            transition: "all 0.3s ease",
        }}>
            {/* Logo */}
            <a href="#home" style={{ textDecoration: "none", fontSize: "1rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                {personal.logo}<span style={{ color: "#555" }}>.dev</span>
            </a>

            {/* Desktop — centered pill nav */}
            <div className="desktop-nav" style={{
                display: "flex",
                gap: "0.1rem",
                alignItems: "center",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "9999px",
                padding: "0.3rem 0.4rem",
            }}>
                {links.map((l) => {
                    const id = l.href.replace("#", "");
                    const isActive = active === id;
                    return (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            style={{
                                padding: "0.3rem 0.85rem",
                                borderRadius: "9999px",
                                fontSize: "0.78rem",
                                fontWeight: 500,
                                textDecoration: "none",
                                color: isActive ? "#ffffff" : "#666666",
                                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {l.label}
                        </a>
                    );
                })}
            </div>

            {/* Let's Talk button */}
            <a
                href="#contact"
                className="desktop-nav"
                style={{
                    padding: "0.4rem 1.1rem",
                    borderRadius: "9999px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "#ffffff",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
            >
                Let&apos;s Connect
            </a>

            {/* Hamburger */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                style={{ display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                className="hamburger-btn"
            >
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        style={{
                            display: "block",
                            width: "24px",
                            height: "2px",
                            background: "#ffffff",
                            borderRadius: "2px",
                            transition: "all 0.3s",
                            transform:
                                open && i === 0 ? "rotate(45deg) translate(5px,5px)"
                                    : open && i === 1 ? "scaleX(0)"
                                        : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                                            : "none",
                        }}
                    />
                ))}
            </button>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    position: "fixed", top: "64px", left: 0, right: 0,
                    background: "rgba(5,5,5,0.97)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    padding: "1rem 2rem",
                    display: "flex", flexDirection: "column", gap: "0.5rem", zIndex: 99,
                }}>
                    {links.concat([{ label: "Contact", href: "#contact" }]).map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            style={{
                                padding: "0.6rem 0",
                                fontSize: "0.9rem",
                                color: active === l.href.replace("#", "") ? "#ffffff" : "#666666",
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
