"use client";

import {
    useState, useEffect, useRef, useCallback,
    KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
    personal, skillCategories, projects, education, certifications,
} from "@/lib/data";
import ResumeModal from "@/components/ResumeModal";

const g = (s: string) => `<span style="color:#10b981;font-weight:600">${s}</span>`;
const d = (s: string) => `<span style="color:#6b7280">${s}</span>`;
const w = (s: string) => `<span style="color:#e2e8f0">${s}</span>`;
const r = (s: string) => `<span style="color:#f87171">${s}</span>`;
const y = (s: string) => `<span style="color:#fbbf24;font-weight:600">${s}</span>`;
const b = (s: string) => `<span style="color:#60a5fa">${s}</span>`;

const br = "<br/>";
const hr = `<span style="color:#2d3748;user-select:none">${"─".repeat(32)}</span>`;
const section = (t: string) =>
    [hr, `  ${g("■")} ${w(t)}`, hr].join(br);

const CMD_NAMES = [
    "help", "about", "whoami", "skills", "projects", "project", "education",
    "certs", "contact", "social", "resume", "neofetch", "ls", "date",
    "history", "echo", "clear", "exit", "banner", "sudo", "theme",
];

const BANNER = [
    g(" ██╗   ██╗██╗███╗   ██╗ █████╗ ██╗   ██╗"),
    g(" ██║   ██║██║████╗  ██║██╔══██╗╚██╗ ██╔╝"),
    g(" ██║   ██║██║██╔██╗ ██║███████║ ╚████╔╝ "),
    g(" ╚██╗ ██╔╝██║██║╚██╗██║██╔══██║  ╚██╔╝  "),
    g("  ╚████╔╝ ██║██║ ╚████║██║  ██║   ██║   "),
    g("   ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝  "),
    `  ${d("Full-Stack · Cloud · DevOps · ML")}`,
    `  ${d("Type")} ${y("help")} ${d("to see all commands.")}`,
].join(br);

interface CmdResult {
    html: string;
    clear?: true;
    openResume?: true;
    navigate?: string;
}

function cmdHelp(): CmdResult {
    const row = (cmd: string, desc: string) =>
        `  ${y(cmd.padEnd(14))} ${d(desc)}`;
    return {
        html: [
            g("┌─ COMMANDS ─────────────────────────────────────┐"),
            g("│"),
            `${g("│")} ${b("Navigation")}`,
            `${g("│")} ${row("help", "Show this help")}`,
            `${g("│")} ${row("clear", "Clear terminal")}`,
            `${g("│")} ${row("exit", "Close terminal")}`,
            `${g("│")} ${row("banner", "Show welcome banner")}`,
            g("│"),
            `${g("│")} ${b("About Me")}`,
            `${g("│")} ${row("whoami", "Quick intro")}`,
            `${g("│")} ${row("about", "Full about section")}`,
            `${g("│")} ${row("neofetch", "System-style info card")}`,
            `${g("│")} ${row("skills", "Skills by category")}`,
            `${g("│")} ${row("education", "Education history")}`,
            `${g("│")} ${row("certs", "Certifications")}`,
            g("│"),
            `${g("│")} ${b("Work")}`,
            `${g("│")} ${row("projects", "List all projects")}`,
            `${g("│")} ${row("project N", "Details for project #N (1-4)")}`,
            `${g("│")} ${row("resume", "Open resume viewer")}`,
            g("│"),
            `${g("│")} ${b("Contact")}`,
            `${g("│")} ${row("contact", "Contact information")}`,
            `${g("│")} ${row("social", "Social media links")}`,
            g("│"),
            `${g("│")} ${b("Utilities")}`,
            `${g("│")} ${row("date", "Current date & time")}`,
            `${g("│")} ${row("ls", "List portfolio sections")}`,
            `${g("│")} ${row("echo [txt]", "Print text")}`,
            `${g("│")} ${row("history", "Command history")}`,
            g("│"),
            `${g("│")} ${d("↑↓ arrow keys for history  ·  Tab to autocomplete")}`,
            g("└────────────────────────────────────────────────┘"),
        ].join(br),
    };
}

function cmdWhoami(): CmdResult {
    return {
        html: [
            `  ${g(personal.name)}`,
            `  ${d("Role:")}     ${w(personal.tagline.join(" · "))}`,
            `  ${d("Location:")} ${w(personal.location)}`,
            `  ${d("Email:")}    ${b(personal.email)}`,
            `  ${d("CGPA:")}     ${y(personal.cgpa)}`,
        ].join(br),
    };
}

function cmdAbout(): CmdResult {
    return {
        html: [
            section("ABOUT ME"),
            `  ${d(personal.about)}`,
            br,
            `  ${d(personal.about2)}`,
            br,
            `  ${d("Resume:")} ${b("type")} ${y("resume")} ${d("to open the viewer")}`,
        ].join(br),
    };
}

function cmdSkills(): CmdResult {
    const lines: string[] = [section("SKILLS")];
    skillCategories.forEach((cat) => {
        const colorHex = cat.color;
        lines.push(
            `  <span style="color:${colorHex};font-weight:700">${cat.title}</span>`
        );
        lines.push(`  ${d(cat.skills.join("  ·  "))}`);
        lines.push("");
    });
    return { html: lines.join(br) };
}

function cmdProjects(): CmdResult {
    const lines: string[] = [section("PROJECTS")];
    projects.forEach((p, i) => {
        lines.push(`  ${y(`[${i + 1}]`)} ${w(p.title)}`);
        lines.push(`      ${d(p.desc.slice(0, 80) + "…")}`);
        lines.push(
            `      ${d("Tags:")} ${p.tags.slice(0, 4).map((t) => b(t)).join(", ")}`
        );
        lines.push("");
    });
    lines.push(`  ${d("Tip:")} type ${y("project 1")} ${d("to see full details of a project")}`);
    return { html: lines.join(br) };
}

function cmdProject(args: string[]): CmdResult {
    const n = parseInt(args[0], 10);
    if (isNaN(n) || n < 1 || n > projects.length) {
        return {
            html: r(`  Invalid project number. Use 1–${projects.length}.`),
        };
    }
    const p = projects[n - 1];
    return {
        html: [
            section(`PROJECT #${n}`),
            `  ${y(p.title)}`,
            br,
            `  ${d(p.desc)}`,
            br,
            `  ${d("Tech:")}     ${p.tags.map((t) => b(t)).join("  ")}`,
            `  ${d("Category:")} ${g(p.category)}`,
            `  ${d("Code:")}     ${b(p.code)}`,
            p.live && p.live !== "#"
                ? `  ${d("Live:")}     ${g(p.live)}`
                : `  ${d("Live:")}     ${d("(not deployed)")}`,
        ].join(br),
    };
}

function cmdEducation(): CmdResult {
    const lines: string[] = [section("EDUCATION")];
    education.forEach((edu) => {
        lines.push(`  ${y(edu.period)}`);
        lines.push(`  ${w(edu.degree)}`);
        lines.push(`  ${g(edu.institution)} ${d("·")} ${d(edu.location)}`);
        lines.push(`  ${d("Grade:")} ${b(edu.badge)}`);
        edu.points.forEach((pt) => lines.push(`    ${d("▸")} ${d(pt)}`));
        lines.push("");
    });
    return { html: lines.join(br) };
}

function cmdCerts(): CmdResult {
    const lines: string[] = [section("CERTIFICATIONS")];
    certifications.forEach((cert) => {
        const star = cert.featured ? y("★ ") : d("  ");
        lines.push(`  ${star}${w(cert.title)}`);
        lines.push(`     ${d("Issuer:")} ${g(cert.issuer)}  ${d("·")}  ${d(cert.date)}`);
        if (cert.desc) lines.push(`     ${d(cert.desc)}`);
        if (cert.link && cert.link !== "#")
            lines.push(`     ${d("Link:")} ${b(cert.link)}`);
        lines.push("");
    });
    return { html: lines.join(br) };
}

function cmdContact(): CmdResult {
    return {
        html: [
            section("CONTACT"),
            `  ${d("Email:")}    ${b(personal.email)}`,
            `  ${d("Phone:")}    ${w(personal.phone)}`,
            `  ${d("Location:")} ${w(personal.location)}`,
            br,
            `  ${d("Or type")} ${y("social")} ${d("for social links.")}`,
        ].join(br),
    };
}

function cmdSocial(): CmdResult {
    return {
        html: [
            section("SOCIAL LINKS"),
            `  ${g("GitHub")}    ${b(personal.socials.github)}`,
            `  ${g("LinkedIn")}  ${b(personal.socials.linkedin)}`,
        ].join(br),
    };
}

function cmdNeofetch(): CmdResult {
    const rows = [
        [`OS`, "Portfolio v2.0 (Next.js 16)"],
        [`Role`, personal.tagline[0]],
        [`Location`, personal.location],
        [`CGPA`, personal.cgpa + " / 10"],
        [`Projects`, projects.length + " live projects"],
        [`Skills`, skillCategories.reduce((a, c) => a + c.skills.length, 0) + " technologies"],
        [`Certs`, certifications.length + " certifications"],
        [`Contact`, personal.email],
    ];
    const logo = [
        g("  ██████╗"),
        g(" ██╔════╝"),
        g(" ██║"),
        g(" ██║"),
        g(" ╚██████╗"),
        g("  ╚═════╝"),
        "",
        "",
    ];
    const info = [
        `${g(personal.name)} ${d("@")} ${g("portfolio")}`,
        d("─".repeat(30)),
        ...rows.map(([k, v]) => `${y(String(k).padEnd(10))} ${w(v)}`),
    ];
    const lines: string[] = [];
    for (let i = 0; i < Math.max(logo.length, info.length); i++) {
        lines.push(`${logo[i] ?? "         "} ${info[i] ?? ""}`);
    }
    return { html: lines.join(br) };
}

function cmdLs(): CmdResult {
    const sections = ["home", "about", "skills", "projects", "education", "certifications", "contact"];
    return {
        html: [
            `  ${d("Portfolio sections:")}`,
            `  ${sections.map((s) => b(s)).join("   ")}`,
        ].join(br),
    };
}

function cmdDate(): CmdResult {
    const now = new Date();
    return {
        html: `  ${w(now.toLocaleString("en-IN", { dateStyle: "full", timeStyle: "medium" }))}`,
    };
}

function cmdHistory(hist: string[]): CmdResult {
    if (hist.length === 0)
        return { html: d("  (no history yet)") };
    return {
        html: hist
            .map((c, i) => `  ${d(String(i + 1).padStart(3))}  ${w(c)}`)
            .join(br),
    };
}

function cmdEcho(args: string[]): CmdResult {
    return { html: `  ${w(args.join(" ") || "")}` };
}

// Easter eggs
const EASTER: Record<string, CmdResult> = {
    sudo: { html: r("  Nice try. You are not root here. 😄") },
    "sudo rm -rf /": { html: r("  Very funny. Nice try though. 🙃") },
    "rm -rf /": { html: r("  That would be bad. No.") },
    vim: { html: [r("  Vim opened."), d("  (Just kidding — type :q! to escape, or don't, we both know you can't)")].join(br) },
    theme: { html: [g("  Current theme: ") + w("Emerald Dark"), d("  (Only one theme for now 🟢)")].join(br) },
    "git status": { html: [g("  On branch main"), d("  nothing to commit, portfolio is perfect ✓")].join(br) },
    "npm install": { html: [y("  Installing dependencies..."), g("  ✓ added 1 package (you)")].join(br) },
    ping: { html: [g("  PING portfolio.vinay.dev: 56 bytes of data"), d("  64 bytes: time=0ms (you're already here)"), g("  1 packet transmitted, 1 received, 0% packet loss")].join(br) },
    uname: { html: w("  Vinay-OS Portfolio 2.0.0 (Next.js) TypeScript GNU/Linux") },
    "uname -a": { html: w("  Vinay-OS Portfolio 2.0.0 (Next.js) TypeScript GNU/Linux") },
    pwd: { html: g("  /home/vinay/portfolio") },
    cat: { html: [d("  cat: missing file operand"), d("  Try 'about' or 'whoami' instead?")].join(br) },
    ls: { html: cmdLs().html },
};

// ── Main Terminal component ───────────────────────────────────────────────────
interface Line {
    id: number;
    type: "input" | "output" | "error" | "banner";
    html: string;
}

let _id = 0;
const uid = () => ++_id;

export default function Terminal() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<Line[]>([]);
    const [hist, setHist] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [showResume, setShowResume] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Detect mobile + set initial banner
    useEffect(() => {
        const check = () => {
            const mob = window.innerWidth < 640;
            setIsMobile(mob);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        setLines([{ id: uid(), type: "banner", html: BANNER }]);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 60);
    }, [open]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "`") {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, []);

    const run = useCallback((raw: string) => {
        const cmd = raw.trim();
        if (!cmd) return;

        setHist((h) => [...h, cmd]);
        setHistIdx(-1);

        const inputLine: Line = {
            id: uid(), type: "input",
            html: `${g("vinay@portfolio")}${d(":")}${b("~")}${d("$")} ${w(cmd)}`,
        };

        if (cmd === "clear") { setLines([inputLine]); return; }
        if (cmd === "exit") { setOpen(false); return; }
        if (cmd === "banner") {
            setLines((l) => [...l, inputLine, { id: uid(), type: "banner", html: BANNER }]);
            return;
        }
        if (cmd === "resume") {
            setLines((l) => [...l, inputLine, { id: uid(), type: "output", html: g("  Opening resume viewer…") }]);
            setShowResume(true);
            return;
        }

        if (EASTER[cmd]) {
            setLines((l) => [...l, inputLine, { id: uid(), type: "output", html: EASTER[cmd].html }]);
            return;
        }

        const parts = cmd.split(/\s+/);
        const name = parts[0].toLowerCase();
        const args = parts.slice(1);

        let result: CmdResult;
        switch (name) {
            case "help": result = cmdHelp(); break;
            case "whoami": result = cmdWhoami(); break;
            case "about": result = cmdAbout(); break;
            case "skills": result = cmdSkills(); break;
            case "projects": result = cmdProjects(); break;
            case "project": result = cmdProject(args); break;
            case "education": result = cmdEducation(); break;
            case "certs":
            case "certificates": result = cmdCerts(); break;
            case "contact": result = cmdContact(); break;
            case "social": result = cmdSocial(); break;
            case "neofetch": result = cmdNeofetch(); break;
            case "ls": result = cmdLs(); break;
            case "date": result = cmdDate(); break;
            case "history": result = cmdHistory(hist); break;
            case "echo": result = cmdEcho(args); break;
            default:
                result = {
                    html: [
                        r(`  command not found: ${cmd}`),
                        d(`  Type ${y("help")} to see available commands.`),
                    ].join(br),
                };
        }

        const outLine: Line = { id: uid(), type: "output", html: result.html };
        setLines((l) => [...l, inputLine, outLine]);
    }, [hist]);

    const onKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            run(input);
            setInput("");
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHistIdx((i) => {
                const next = Math.min(i + 1, hist.length - 1);
                setInput(hist[hist.length - 1 - next] ?? "");
                return next;
            });
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHistIdx((i) => {
                const next = i - 1;
                if (next < 0) { setInput(""); return -1; }
                setInput(hist[hist.length - 1 - next] ?? "");
                return next;
            });
            return;
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const partial = input.toLowerCase();
            const match = CMD_NAMES.find((c) => c.startsWith(partial) && c !== partial);
            if (match) setInput(match);
            return;
        }

        if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
            return;
        }
    };

    if (isMobile) return null;

    const floatBtn = (
        <button
            onClick={() => setOpen((o) => !o)}
            title="Open Terminal (Ctrl+`)"
            aria-label="Toggle terminal"
            style={{
                position: "fixed",
                bottom: "2rem",
                left: "2rem",
                width: "46px",
                height: "46px",
                borderRadius: "0.65rem",
                background: open ? "var(--accent)" : "var(--card)",
                border: "1px solid " + (open ? "var(--accent)" : "rgba(16,185,129,0.3)"),
                color: open ? "#000" : "var(--accent)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontFamily: "monospace",
                fontWeight: 800,
                zIndex: 9990,
                transition: "all 0.2s ease",
                boxShadow: open
                    ? "0 0 20px rgba(16,185,129,0.4)"
                    : "0 4px 15px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
                if (!open) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(16,185,129,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(16,185,129,0.25)";
                }
            }}
            onMouseLeave={(e) => {
                if (!open) {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--card)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                }
            }}
        >
            {open ? "×" : ">_"}
        </button>
    );

    const panel = open && (
        <div
            style={{
                position: "fixed",
                bottom: "5.5rem",
                left: "2rem",
                width: "min(860px, calc(100vw - 4rem))",
                height: "min(600px, 72vh)",
                borderRadius: "1rem",
                background: "#060608",
                border: "1px solid rgba(16,185,129,0.2)",
                display: "flex",
                flexDirection: "column",
                zIndex: 9989,
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 25px 60px rgba(0,0,0,0.75), 0 0 40px rgba(16,185,129,0.06)",
                animation: "term-slide 0.22s cubic-bezier(.16,1,.3,1)",
                fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
                fontSize: "15px",
            }}
        >

            {/* Title bar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.55rem 1rem",
                background: "rgba(16,185,129,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {["#f87171", "#fbbf24", "#10b981"].map((c) => (
                        <div key={c} style={{
                            width: 11, height: 11, borderRadius: "50%",
                            background: c, opacity: 0.85,
                        }} />
                    ))}
                    <span style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.8rem",
                        color: "#dddee0ff",
                        fontFamily: "monospace",
                        letterSpacing: "0.02em",
                    }}>
                        vinay@portfolio:~
                    </span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "#dddee0ff", fontFamily: "monospace" }}>
                        Ctrl+` to toggle
                    </span>
                    <button
                        onClick={() => setOpen(false)}
                        title="Close terminal"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            cursor: "pointer",
                            color: "#d1d5db",
                            fontSize: "1.1rem",
                            lineHeight: 1,
                            width: "26px",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "5px",
                            transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.background = "rgba(248,113,113,0.15)";
                            el.style.borderColor = "rgba(248,113,113,0.4)";
                            el.style.color = "#f87171";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.background = "rgba(255,255,255,0.05)";
                            el.style.borderColor = "rgba(255,255,255,0.1)";
                            el.style.color = "#d1d5db";
                        }}
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Output area */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    padding: "0.875rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                }}
                onClick={() => inputRef.current?.focus()}
            >
                {lines.map((line) => (
                    <pre
                        key={line.id}
                        style={{
                            margin: 0,
                            lineHeight: 1.65,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            color: "#9ca3af",
                        }}
                        dangerouslySetInnerHTML={{ __html: line.html }}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "0.6rem 1rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(0,0,0,0.25)",
                flexShrink: 0,
                gap: "0.5rem",
            }}>
                <span
                    style={{ color: "#10b981", fontWeight: 700, whiteSpace: "nowrap", fontSize: "15px" }}
                    dangerouslySetInnerHTML={{
                        __html: `${g("vinay@portfolio")}${d(":")}${`<span style="color:#60a5fa">~</span>`}${d("$")}`,
                    }}
                />
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="type a command…"
                    style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "#e2e8f0",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        caretColor: "#10b981",
                    }}
                />
            </div>
        </div>
    );

    return (
        <>
            {floatBtn}
            {panel}
            <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
            <style>{`
                @keyframes term-slide {
                    from { opacity:0; transform:translateY(16px) scale(0.98); }
                    to   { opacity:1; transform:translateY(0) scale(1); }
                }
            `}</style>
        </>
    );
}
