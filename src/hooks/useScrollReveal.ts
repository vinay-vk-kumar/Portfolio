"use client";
import { useEffect } from "react";

/**
 * Custom hook that watches all .reveal elements and adds
 * the .visible class when they enter the viewport.
 */
export function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // fire once
                    }
                });
            },
            { threshold: 0.12 }
        );

        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}
