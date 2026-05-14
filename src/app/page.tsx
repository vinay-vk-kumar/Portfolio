"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import StarsCanvas from "@/components/StarsCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Terminal from "@/components/Terminal";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <StarsCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Terminal />
    </>
  );
}
