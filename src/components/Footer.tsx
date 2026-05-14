"use client";
import { personal } from "@/lib/data";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            style={{
                position: "relative",
                zIndex: 1,
                borderTop: "1px solid var(--border)",
                textAlign: "center",
                padding: "1.5rem",
                color: "var(--text-dim)",
                fontSize: "0.82rem",
            }}
        >
            Designed &amp; Built by{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{personal.name}</span>{" "}
            &copy; {year}
        </footer>
    );
}
