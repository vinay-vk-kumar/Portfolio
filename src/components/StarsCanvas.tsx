"use client";
import { useEffect, useRef } from "react";

export default function StarsCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animId: number;

        // Mouse tracking
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY + window.scrollY; };
        window.addEventListener("mousemove", onMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Stars
        const STAR_COUNT = 260;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.2,
            alpha: Math.random(),
            speed: Math.random() * 0.005 + 0.001,
            dir: Math.random() > 0.5 ? 1 : -1,
        }));

        // Shooting stars
        interface ShootingStar { x: number; y: number; len: number; speed: number; alpha: number; angle: number; active: boolean; }
        const shooters: ShootingStar[] = Array.from({ length: 5 }, () => ({
            x: 0, y: 0, len: 0, speed: 0, alpha: 0, angle: 0, active: false,
        }));
        const spawnShooter = (s: ShootingStar) => {
            s.x = Math.random() * canvas.width;
            s.y = Math.random() * canvas.height * 0.5;
            s.len = Math.random() * 120 + 60;
            s.speed = Math.random() * 8 + 6;
            s.alpha = 1;
            s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
            s.active = true;
        };
        shooters.forEach((s, i) => setTimeout(() => spawnShooter(s), i * 2200 + Math.random() * 3000));

        // Aurora orbs — smooth followers of the cursor
        const orbs = [
            { ox: 0.25, oy: 0.25, r: 340, color: "255,255,255", phase: 0, speed: 0.0006 },
            { ox: 0.75, oy: 0.6,  r: 280, color: "200,200,220", phase: 2, speed: 0.0008 },
            { ox: 0.5,  oy: 0.8,  r: 220, color: "180,180,200", phase: 4, speed: 0.0005 },
        ];
        // Smooth mouse lerp positions
        const lerp = { x: mouse.x, y: mouse.y };

        const draw = (t: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Lerp toward cursor
            lerp.x += (mouse.x - lerp.x) * 0.04;
            lerp.y += (mouse.y - lerp.y) * 0.04;

            // Aurora orbs
            orbs.forEach((o) => {
                const baseX = o.ox * canvas.width;
                const baseY = o.oy * canvas.height;
                // Float gently + drift toward cursor slightly
                const cx = baseX + Math.sin(t * o.speed + o.phase) * 80 + (lerp.x - canvas.width / 2) * 0.08;
                const cy = baseY + Math.cos(t * o.speed * 0.7 + o.phase) * 60 + (lerp.y - canvas.height * 0.3) * 0.06;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
                grad.addColorStop(0,   `rgba(${o.color},0.18)`);
                grad.addColorStop(0.4, `rgba(${o.color},0.07)`);
                grad.addColorStop(1,   `rgba(${o.color},0)`);
                ctx.beginPath();
                ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            // Cursor glow
            const cg = ctx.createRadialGradient(lerp.x, lerp.y, 0, lerp.x, lerp.y, 120);
            cg.addColorStop(0,   "rgba(139,92,246,0.12)");
            cg.addColorStop(0.5, "rgba(139,92,246,0.04)");
            cg.addColorStop(1,   "rgba(139,92,246,0)");
            ctx.beginPath();
            ctx.arc(lerp.x, lerp.y, 120, 0, Math.PI * 2);
            ctx.fillStyle = cg;
            ctx.fill();

            // Twinkling stars
            stars.forEach((s) => {
                s.alpha += s.speed * s.dir;
                if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,180,255,${s.alpha})`;
                ctx.fill();
            });

            // Shooting stars
            shooters.forEach((s) => {
                if (!s.active) return;
                s.alpha -= 0.018;
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                if (s.alpha <= 0) { setTimeout(() => spawnShooter(s), Math.random() * 5000 + 2000); s.active = false; return; }
                const tx = s.x - Math.cos(s.angle) * s.len;
                const ty = s.y - Math.sin(s.angle) * s.len;
                const sg = ctx.createLinearGradient(tx, ty, s.x, s.y);
                sg.addColorStop(0,   `rgba(180,150,255,0)`);
                sg.addColorStop(1,   `rgba(220,200,255,${s.alpha})`);
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(s.x, s.y);
                ctx.strokeStyle = sg;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            animId = requestAnimationFrame(draw);
        };
        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
