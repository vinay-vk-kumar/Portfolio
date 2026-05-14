"use client";
import { useState, FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import { personal } from "@/lib/data";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setStatus("error");
            return;
        }
        setStatus("sending");
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
            setStatus("success");
            formRef.current?.reset();
        } catch {
            setStatus("error");
        }
        setTimeout(() => setStatus("idle"), 5000);
    };

    const socials = [
        { icon: "fab fa-linkedin-in", url: personal.socials.linkedin, label: "LinkedIn" },
        { icon: "fab fa-github", url: personal.socials.github, label: "GitHub" },
    ];

    const contactItems = [
        { icon: "fas fa-envelope", label: "Email", value: personal.email, iconBg: "rgba(16,185,129,0.1)", iconColor: "var(--accent)" },
        { icon: "fas fa-phone", label: "Phone", value: personal.phone, iconBg: "rgba(74,222,128,0.1)", iconColor: "#4ade80" },
        { icon: "fas fa-map-marker-alt", label: "Location", value: personal.location, iconBg: "rgba(251,191,36,0.1)", iconColor: "#fbbf24" },
    ];

    return (
        <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="contact-grid">

                    {/* ── Left: info ── */}
                    <div>
                        <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1rem", color: "#fff" }}>
                            Let&apos;s build something{" "}
                            <span style={{ color: "var(--accent)" }}>extraordinary.</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "420px" }}>
                            Whether you have a question, a project idea, or just want to say hi, I&apos;m always open to discussing new opportunities and how we can work together.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                            {contactItems.map((c) => (
                                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
                                    <div style={{ width: "38px", height: "38px", borderRadius: "0.5rem", background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: c.iconColor, flexShrink: 0 }}>
                                        <i className={c.icon} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{c.label}</div>
                                        <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)" }}>{c.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--text-dim)", marginBottom: "0.75rem" }}>FOLLOW ME</p>
                        <div style={{ display: "flex", gap: "0.6rem" }}>
                            {socials.map((s) => (
                                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-icon" aria-label={s.label}>
                                    <i className={s.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: form ── */}
                    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text)" }}>
                            <i className="fas fa-comment-dots" style={{ color: "var(--accent)" }} /> Send a Message
                        </h3>

                        {/* Status banners */}
                        {status === "success" && (
                            <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#4ade80", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <i className="fas fa-check-circle" /> Message sent! I&apos;ll get back to you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.4)", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#f87171", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                <i className="fas fa-exclamation-circle" />
                                <span>
                                    Something went wrong. Email me directly at{" "}
                                    <a href={`mailto:${personal.email}`} style={{ color: "#fbbf24", textDecoration: "underline" }}>
                                        {personal.email}
                                    </a>
                                </span>
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                                <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Name</label>
                                    <input className="form-input" type="text" name="from_name" placeholder="Your Name" required />
                                </div>
                                <div>
                                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Email</label>
                                    <input className="form-input" type="email" name="from_email" placeholder="Your Email" required />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Subject</label>
                                <input className="form-input" type="text" name="subject" placeholder="Project Inquiry" required />
                            </div>

                            <div>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>Message</label>
                                <textarea className="form-input" rows={5} name="message" placeholder="Tell me about your project..." required style={{ resize: "vertical" }} />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center", padding: "0.85rem", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
                            >
                                {status === "sending" ? (
                                    <><i className="fas fa-spinner fa-spin" /> Sending…</>
                                ) : (
                                    <><i className="fas fa-paper-plane" /> Send Message</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
