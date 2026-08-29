"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

function WorkSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Uses dynamic calculation to stop exactly at the end of the content regardless of screen size
  const x = useTransform(scrollYProgress, (p) => `calc(-${p * 100}% + ${p * 100}vw)`);

  const projects = [
    { title: "Ethereal Echoes", category: "Interactive Install", year: "2023", date: "OCT 2023", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80", role: "Lead Creative Technologist", tech: "WebGL, Three.js, Web Audio API", desc: "An immersive audio-reactive WebGL installation that transforms physical space into dynamic soundscapes. Featured in galleries across NYC, the project uses real-time skeletal tracking to bridge physical movement and digital art." },
    { title: "Brutal Genesis", category: "Web3 Platform", year: "2024", date: "FEB 2024", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80", role: "UI/UX & Frontend Lead", tech: "Next.js, Solidity, Ethers.js", desc: "A hyper-minimalist NFT marketplace built with brutalist design principles. Focusing on typography, stark contrasts, and seamless wallet integrations through zero-gas meta-transactions." },
    { title: "Void Analytics", category: "Dashboard UI", year: "2024", date: "JUN 2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", role: "Product Designer", tech: "React, D3.js, Tailwind", desc: "A sleek, cinematic data visualization dashboard created for processing massive datasets of real-time financial metrics, blending complex D3.js charting with high-performance React architecture." },
    { title: "Chromatic Shift", category: "Motion Identity", year: "2025", date: "JAN 2025", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", role: "Art Director", tech: "Cinema4D, GSAP, Figma", desc: "A comprehensive brand overhaul anchored by kinetic typography and dynamic color systems, serving as the digital foundation for a leading European creative agency." },
    { title: "Neon Construct", category: "Brand System", year: "2025", date: "MAR 2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", role: "Brand Designer", tech: "Illustrator, After Effects", desc: "An experimental visual identity exploring the collision of 90s retro-futurism and brutalist structural design, complete with generative assets." },
    { title: "Hyper Flux", category: "WebGL Experience", year: "2025", date: "MAY 2025", img: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80", role: "Creative Developer", tech: "Three.js, GLSL Shaders", desc: "A browser-based interactive experience pushing the limits of Three.js. Users navigate through fluid, evolving geometries generated procedurally on the GPU." },
    { title: "Kinetics", category: "Type Specimen", year: "2025", date: "AUG 2025", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", role: "Interaction Designer", tech: "Matter.js, GSAP", desc: "A digital type specimen celebrating variable fonts. Scroll-linked animations and physics-based interactions let users physically 'play' with typography." }
  ];

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [selectedProject]);

  return (
    <>
      {/* Desktop Sticky Scroll */}
      <section ref={targetRef} id="work-desktop" className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
          <ScrollReveal className="w-full h-full flex flex-col justify-center">
            <div className="px-12 mb-12 flex justify-between items-end shrink-0">
              <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SELECTED WORK</h2>
              <span className="text-neutral-500 font-mono">(0{projects.length})</span>
            </div>
            
            <div className="flex-1 flex items-center">
              <motion.div style={{ x }} className="flex gap-4 px-12 w-max">
                {projects.map((project, i) => (
                  <div key={i} onClick={() => setSelectedProject({...project, index: i})} className="w-[45vw] lg:w-[35vw] h-[60vh] relative bg-[#0a0a0a] overflow-hidden border border-[#262626] hover:border-[#ffffff] transition-colors group shrink-0 flex items-center justify-center cursor-crosshair">
                    {/* Background image Ã¢â‚¬â€ grayscale by default, color on hover */}
                    <img
                      src={project.img}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 z-0"
                    />
                    {/* Dark overlay fades out on hover to reveal background image */}
                    <div className="absolute inset-0 bg-[#000000]/80 group-hover:bg-[#000000]/40 transition-colors duration-700 z-10" />
                    
                    {/* Center Device Mockups */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none scale-[0.75] lg:scale-90 xl:scale-100 transition-transform duration-500">
                      {i % 2 === 0 ? (
                        /* Phone Mockup (iPhone Style) */
                        <div className="w-[144px] h-[284px] md:w-[164px] md:h-[324px] p-[2px] rounded-[26px] md:rounded-[34px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative group-hover:scale-105 transition-all duration-700">
                          {/* Front Black Bezel */}
                          <div className="w-full h-full rounded-[24px] md:rounded-[32px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
                            {/* Screen */}
                            <div className="w-full h-full rounded-[20px] md:rounded-[26px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                              <img src={project.img} alt="Phone view" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-40 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Monitor/Tablet Mockup (iPad Style) */
                        <div className="w-[244px] h-[164px] md:w-[364px] md:h-[244px] p-[2px] rounded-[18px] md:rounded-[26px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative group-hover:scale-105 transition-all duration-700">
                          {/* Front Black Bezel */}
                          <div className="w-full h-full rounded-[16px] md:rounded-[24px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
                            {/* Screen */}
                            <div className="w-full h-full rounded-[10px] md:rounded-[16px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                              <img src={project.img} alt="Monitor view" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/0 to-white/0 z-40 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content overlay Ã¢â‚¬â€ always visible */}
                    <div className="absolute p-6 flex flex-col justify-between h-full w-full z-30">
                      <div className="flex justify-between items-start">
                        <span className="px-4 py-2 bg-[#ffffff] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
                        <ArrowUpRight size={32} className="text-[#ffffff]" />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl md:text-5xl text-[#ffffff] tracking-tighter uppercase">{project.title}</h3>
                        <p className="text-[#a3a3a3] mt-3 font-mono text-sm uppercase tracking-widest">{project.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mobile Normal Scroll */}
      <ScrollReveal as="section" id="work-mobile" className="block md:hidden py-24 ">
        <div className="px-6 mb-12 flex justify-between items-end">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SELECTED WORK</h2>
        </div>
        <div className="flex flex-col gap-6 px-6">
          {projects.map((project, i) => (
            <MobileProjectCard 
              key={i} 
              project={project} 
              i={i} 
              onClick={() => setSelectedProject({...project, index: i})} 
            />
          ))}
        </div>
      </ScrollReveal>

      {/* Project Details Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col overflow-hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close Button Ã¢â‚¬â€ positioned absolutely to the fixed modal, so it stays sticky even while scrolling */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 flex flex-col items-end justify-center gap-[6px] md:mix-blend-difference"
            >
              <span className="block h-[3px] bg-white md:bg-[#ffffff] w-8 rotate-45 translate-y-[4.5px]" />
              <span className="block h-[3px] bg-white md:bg-[#ffffff] w-8 -rotate-45 -translate-y-[4.5px]" />
            </button>

            {/* Scrollable Container */}
            <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" data-lenis-prevent>
              <div className="flex flex-col md:flex-row min-h-full relative">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 shrink-0 z-0 bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 z-10" />

                  <div className="relative z-20 -translate-y-[3vh] md:translate-y-0 scale-[0.9] sm:scale-110 md:scale-[1.1] lg:scale-[1.4] xl:scale-[1.7] flex items-center justify-center pointer-events-none transition-transform duration-500">
                    {selectedProject.index % 2 === 0 ? (
                      /* Phone Mockup (iPhone Style) */
                      <div className="w-[144px] h-[284px] p-[2px] rounded-[26px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative">
                        {/* Front Black Bezel */}
                        <div className="w-full h-full rounded-[24px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
                          {/* Screen */}
                          <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                            <img src={selectedProject.img} alt="Phone view" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-40 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Monitor/Tablet Mockup (iPad Style) */
                      <div className="w-[244px] h-[164px] md:w-[364px] md:h-[244px] p-[2px] rounded-[18px] md:rounded-[26px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative">
                        {/* Front Black Bezel */}
                        <div className="w-full h-full rounded-[16px] md:rounded-[24px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
                          {/* Screen */}
                          <div className="w-full h-full rounded-[10px] md:rounded-[16px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                            <img src={selectedProject.img} alt="Monitor view" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/0 to-white/0 z-40 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent md:hidden z-30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950 hidden md:block z-30" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-16 xl:p-24 relative z-10 bg-neutral-950 md:bg-transparent min-h-[50vh] mt-[-6vh] md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-block px-4 py-2 border border-neutral-700 text-xs font-mono uppercase tracking-widest rounded-full mb-6 xl:mb-8">
                      {selectedProject.year} / {selectedProject.category}
                    </span>
                    
                    <h2 className="font-display text-5xl md:text-5xl lg:text-6xl xl:text-8xl tracking-tighter uppercase leading-none mb-8 xl:mb-12">
                      {selectedProject.title}
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:gap-8  pt-6 xl:pt-8 mb-8 xl:mb-12">
                      <div>
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest text-neutral-500 mb-2">Role</h4>
                        <p className="font-sans text-xs xl:text-sm text-neutral-300">{selectedProject.role}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest text-neutral-500 mb-2">Tech Stack</h4>
                        <p className="font-sans text-xs xl:text-sm text-neutral-300">{selectedProject.tech}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 border-neutral-800 pt-6 sm:pt-0">
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest text-neutral-500 mb-2">Date</h4>
                        <p className="font-sans text-xs xl:text-sm text-neutral-300">{selectedProject.date}</p>
                      </div>
                    </div>
                    
                    <p className="font-sans text-lg text-neutral-400 leading-relaxed mb-12">
                      {selectedProject.desc}
                    </p>

                    <div className="flex justify-end w-full">
                      <a href="#" className="inline-flex items-center gap-3 px-6 py-4 border border-neutral-700 rounded-full font-mono text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group w-fit mb-12">
                        View Live Site
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollReveal({ children, className, id, as = "div" }: { children: React.ReactNode; className?: string; id?: string, as?: "div" | "section" | "footer" }) {
  const Component = motion[as] as any;
  return (
    <Component
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    const chars = "0123456789";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 15; // Requires more frames to reveal each character (slower)
    }, 25); // Faster frame rate for smoother scrambling

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
}

function ExperienceLineSegment() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"]
  });

  return (
    <>
      <div ref={lineRef} className="absolute left-[-34px] top-[16px] bottom-[-112px] w-[2px] bg-neutral-800 z-0" />
      <motion.div 
        className="absolute left-[-34px] top-[16px] bottom-[-112px] w-[2px] bg-[var(--theme-fg)] origin-top z-0"
        style={{ scaleY: scrollYProgress }}
      />
    </>
  );
}

function ExperienceItem({ exp, i, isLast }: { exp: any; i: number; isLast: boolean }) {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { margin: "10000px 0px -50% 0px", once: false });

  return (
    <div className="relative group" data-mascot-target={`exp-${i}`}>
      <div ref={circleRef} className="absolute top-2 w-full h-[1px]" />
      
      {!isLast && <ExperienceLineSegment />}

      <motion.div 
        initial={{ scale: 1, backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-neutral-600)", boxShadow: "0 0 0px rgba(255,255,255,0)" }}
        animate={{ 
          scale: isInView ? 1.1 : 1, 
          backgroundColor: isInView ? "var(--theme-fg)" : "var(--theme-bg)",
          borderColor: isInView ? "var(--theme-fg)" : "var(--theme-neutral-600)",
          boxShadow: isInView ? "0 0 20px var(--theme-fg)" : "0 0 0px rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-[41px] top-2 w-4 h-4 rounded-full border-2 z-10" 
      />
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <h3 className={`text-3xl md:text-4xl font-display transition-colors duration-500 tracking-tighter uppercase ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-500"}`}>{exp.role}</h3>
        <span className={`font-mono text-sm uppercase tracking-widest transition-colors duration-500 ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-500"}`}>{exp.date}</span>
      </div>
      <p className={`text-lg mt-2 uppercase tracking-wide transition-colors duration-500 ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-300"}`}>{exp.company}</p>
      <p className="text-neutral-500 font-sans mt-4 max-w-5xl leading-relaxed">{exp.desc}</p>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [menuOpen]);

  return (
    <main ref={containerRef} className="min-h-screen text-white selection:bg-white selection:text-black relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link 
          href="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]"
        >
          JOHN.
        </Link>
        <button 
          className="relative z-[60] w-12 h-12 flex flex-col items-end justify-center gap-[6px] group" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 -rotate-45 translate-y-[9px]" : "w-10 group-hover:w-6"}`} />
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-0 opacity-0" : "w-6 group-hover:w-10"}`} />
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 rotate-45 -translate-y-[9px]" : "w-8 group-hover:w-4"}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex flex-col justify-start pt-20 md:pt-28 pb-16 px-8 overflow-y-auto overflow-x-hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav links */}
            <div className="flex flex-col md:flex-row justify-between w-full h-full">
              <nav className="flex flex-col gap-1 md:gap-0 mt-0">
                {[
                  { label: "Home", href: "#" },
                  { label: "About", href: "#about" },
                  { label: "Work", href: "#work" },
                  { label: "Experience", href: "#experience" },
                  { label: "Credentials", href: "#certifications" },
                  { label: "Awards", href: "#awards" },
                  { label: "Contact", href: "#contact" },
                ].map((item, i) => (
                  <div key={item.label} className="overflow-hidden flex items-center gap-4">
                    <motion.span
                      className="font-mono text-xs text-neutral-600 tracking-widest w-6 shrink-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                    >0{i + 1}</motion.span>
                    <motion.a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-display text-[9vw] md:text-[5vw] lg:text-[4vw] leading-none tracking-tighter uppercase text-white hover:text-neutral-500 transition-colors py-1"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: [0.76, 0, 0.24, 1] }}
                    >
                      {item.label}
                    </motion.a>
                  </div>
                ))}
              </nav>

              {/* Separated External/Page Links */}
              <div className="flex flex-col gap-6 my-auto md:my-0 md:justify-end md:pb-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">Writings</h3>
                  <Link href="/blog" onClick={() => setMenuOpen(false)} className="group flex items-center gap-4 text-2xl md:text-3xl font-display uppercase tracking-wider text-white hover:text-neutral-400 transition-colors pr-4">
                    Read the Blog <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Bottom bar */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 flex justify-end items-center gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button 
                onClick={(e) => {
                  setMenuOpen(false);
                  toggleTheme(e);
                }} 
                className="w-12 h-12 shrink-0 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="h-12 group flex items-center justify-center gap-3 w-fit border border-neutral-700 rounded-full px-6 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">Go to Resume</span>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hero Section */}
      <ScrollReveal as="section" id="hero" className="min-h-screen flex flex-col justify-center md:justify-end p-6 md:p-12 relative overflow-hidden pt-32 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-10"
        >
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase mb-6 md:mb-12 break-words mt-auto">
            John<br />
            <span className="text-neutral-500 italic">Jervys</span>
          </h1>
        </motion.div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-end pb-8 z-10 w-full pt-8 gap-12 border-t border-neutral-800" data-mascot-target="hero-stats">
          <div className="flex flex-wrap gap-12 md:gap-16 lg:gap-24">
            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl tracking-tighter text-white"><ScrambleText text="40+" /></span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-2">Projects Shipped</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl tracking-tighter text-white"><ScrambleText text="05" /></span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-2">Years Active</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl tracking-tighter text-white"><ScrambleText text="12" /></span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-2">Industry Awards</span>
            </div>
          </div>
          <p className="max-w-xs md:max-w-md lg:max-w-xs text-neutral-400 font-sans text-sm text-right self-end uppercase tracking-widest">
            Crafting digital experiences through the intersection of design, motion, and code.
          </p>
        </div>
      </ScrollReveal>

      {/* About Me */}
      <ScrollReveal as="section" id="about" className="py-32 px-6 md:px-12 relative flex flex-col items-center justify-center text-center bg-neutral-950/50">
        <div className="w-full flex flex-col items-center">
          <h2 className="font-mono text-sm uppercase tracking-widest text-neutral-500 mb-8">Who is John?</h2>
          
          <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-20 md:py-32">
             {/* Foreground Text */}
             <div className="relative z-10">
               <p className="font-display text-5xl md:text-7xl lg:text-[10rem] leading-[0.8] tracking-tighter text-white uppercase">
                 MULTIMEDIA <br/>
                 <span className="italic relative inline-block">ARTIST.<span className="absolute -bottom-2 left-0 w-full h-[4px] bg-white"></span></span>
               </p>
             </div>
          </div>

          <p className="font-sans text-xl md:text-3xl text-neutral-400 mt-16 max-w-4xl leading-relaxed">
            Blurring the line between art and code. I use brutalist structures, striking typography, and precise motion to build digital experiences that don't just exist, but <span className="text-white font-display italic">perform.</span>
          </p>

          <Link href="/about" data-mascot-target="about-btn" className="mt-16 flex items-center gap-3 border border-neutral-700 rounded-full px-8 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-display text-lg uppercase tracking-wider">
            Get to know me more <ArrowRight size={20} />
          </Link>
        </div>
      </ScrollReveal>



      {/* Projects */}
      <div id="work">
        <WorkSection />
      </div>

      {/* Experience */}
      <ScrollReveal as="section" id="experience" className="py-32 md:py-48 px-6 md:px-12 bg-neutral-950/50">
        <div className="w-full relative">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">EXPERIENCE</h2>
          <div className="space-y-24 pl-8 ml-2 md:ml-4 relative">
            {[
              { role: "Lead Multimedia Designer", company: "Studio Void", date: "2024 - Present", desc: "Spearheading the creative direction for high-impact Web3 platforms. Merging 3D aesthetics with performant web technologies." },
              { role: "Senior Creative Developer", company: "Web3 Innovators", date: "2022 - 2024", desc: "Developed immersive blockchain landing pages and minted interactive NFT experiences." },
              { role: "Interactive Designer", company: "Digital Arts Inc.", date: "2020 - 2022", desc: "Designed experimental UI patterns for digital art galleries." },
              { role: "Motion Graphics Intern", company: "Creative Tech Lab", date: "2019 - 2020", desc: "Created kinetic typography and video mapping assets." }
            ].map((exp, i, arr) => (
              <ExperienceItem key={i} exp={exp} i={i} isLast={i === arr.length - 1} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Tech Stack */}
      <ScrollReveal as="section" id="tech-stack" className="py-32 md:py-48 overflow-hidden relative flex flex-col gap-12">
        <div className="w-full">
          <div className="px-6 md:px-12 flex justify-center" data-mascot-target="arsenal-header">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white mb-8 text-center">THE ARSENAL</h2>
          </div>
          
          {/* Marquee-style Tech Display */}
          <div className="flex flex-col gap-6 w-full mt-4">
            {[
              ["Next.js", "React", "TypeScript", "Tailwind", "Motion", "GSAP"],
              ["WebGL", "Three.js", "GLSL", "Canvas", "PixiJS"],
              ["Cinema4D", "Blender", "Figma", "Web3", "Solidity"]
            ].map((row, i) => (
              <div key={i} className={`flex gap-8 whitespace-nowrap w-max ${i % 2 === 0 ? "animate-[marquee_120s_linear_infinite]" : "animate-[marquee-reverse_150s_linear_infinite]"} `}>
                {[...row, ...row, ...row, ...row, ...row, ...row].map((tech, j) => (
                  <span 
                    key={j} 
                    className="font-display text-7xl md:text-[8rem] leading-none tracking-tighter uppercase cursor-crosshair transition-all duration-300 text-transparent [-webkit-text-stroke:1.5px_#333] hover:text-white hover:[-webkit-text-stroke:1.5px_#fff]"
                  >
                    {tech} <span className="text-neutral-800 ml-4 inline-block text-transparent [-webkit-text-stroke:1.5px_#333]">+</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Certifications */}
      <ScrollReveal as="section" id="certifications" className="py-32 md:py-48 px-6 md:px-12 bg-neutral-950/50">
        <div className="w-full">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">CREDENTIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {[
              { logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg", name: "Advanced WebGL Patterns", issuer: "Creative Coding Course", date: "Aug 2024", link: "#" },
              { logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg", name: "Blockchain Architecture", issuer: "Web3 Institute", date: "Dec 2023", link: "#" },
              { logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", name: "Awwwards Masterclass", issuer: "Typography in Web", date: "Oct 2022", link: "#" },
              { logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg", name: "Google UX Design", issuer: "Professional Certificate", date: "Mar 2022", link: "#" },
              { logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg", name: "3D Motion Graphics", issuer: "School of Motion", date: "Nov 2021", link: "#" },
              { logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", name: "Frontend Architecture", issuer: "Frontend Masters", date: "Jan 2021", link: "#" }
            ].map((cert, i) => (
              <a href={cert.link} key={i} className="relative p-8 border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all group flex flex-col justify-between h-full min-h-[300px]">
                {/* Link Icon */}
                <div className="absolute top-8 right-8 text-neutral-700 group-hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </div>
                <div>
                  <img src={cert.logo} alt={cert.issuer} className="w-10 h-10 object-contain grayscale opacity-50 group-hover:opacity-100 transition-opacity brightness-200 contrast-200" />
                  <h3 className="font-display text-3xl md:text-4xl lg:text-3xl xl:text-4xl mt-6 leading-tight group-hover:text-white text-neutral-300 tracking-tighter uppercase break-words pr-8">{cert.name}</h3>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-4">
                  <p className="text-sm font-sans text-neutral-400 uppercase tracking-widest break-words">{cert.issuer}</p>
                  <p className="font-mono text-xs text-neutral-500 mt-2 uppercase tracking-widest">{cert.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Awards */}
      <ScrollReveal as="section" id="awards" className="py-40 md:py-48 px-6 md:px-12 border-t border-neutral-900">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12 border-b border-neutral-800 pb-6">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase">AWARDS</h2>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest hidden md:block">Competitions & Recognition</span>
          </div>
          <div className="flex flex-col">
            {[
              { award: "Site of the Day", competition: "Awwwards", year: "2025", project: "Ethereal Echoes" },
              { award: "Gold Pencil", competition: "The One Show", year: "2024", project: "Brutal Genesis" },
              { award: "FWA of the Month", competition: "FWA", year: "2024", project: "Void Analytics" },
              { award: "Best Interaction", competition: "Webby Awards", year: "2023", project: "Chromatic Shift" }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-neutral-900 hover:bg-white hover:text-black hover:px-6 transition-all duration-300 cursor-crosshair">
                <div className="flex flex-col md:flex-row gap-2 md:gap-12 md:items-center">
                  <span className="font-mono text-xs tracking-widest text-neutral-600 group-hover:text-black/50 transition-colors">0{i + 1}</span>
                  <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tighter">{item.award}</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-16 md:items-center mt-4 md:mt-0 w-full md:w-auto">
                  <p className="font-mono text-sm tracking-widest uppercase text-neutral-400 group-hover:text-black/70 transition-colors w-40">{item.competition}</p>
                  <p className="font-sans text-sm tracking-wide text-neutral-500 group-hover:text-black/60 transition-colors w-32 hidden md:block">{item.project}</p>
                  <span className="font-mono text-xl tracking-tighter font-bold">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>



      {/* Footer / Contact */}
      <ScrollReveal as="footer" id="contact" className="pt-32 pb-12 px-6 md:px-12 bg-neutral-950">
        <div className="w-full flex flex-col gap-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-between" data-mascot-target="footer-talk">
              <h2 className="font-display text-6xl md:text-[8vw] leading-[0.85] tracking-tighter uppercase break-words">
                Have a project?<br />
                <span className="text-neutral-500 italic hover:text-white transition-colors cursor-crosshair">Let's build it.</span>
              </h2>
              <div className="mt-16 md:mt-24">
                <a href="mailto:hello@johnjervys.com" className="inline-flex items-center gap-6 group">
                  <span className="font-mono text-xl md:text-3xl text-neutral-300 uppercase tracking-widest border-b-2 border-transparent group-hover:border-white transition-all pb-2 break-all">
                    hello@johnjervys.com
                  </span>
                  <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <ArrowUpRight size={24} />
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-neutral-800 pt-12 lg:pt-0 lg:pl-12">
              <div className="flex flex-col gap-6 w-full">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Socials</h3>
                {[
                  { name: "Instagram", handle: "@johnjervys" },
                  { name: "Twitter", handle: "@jervys_code" },
                  { name: "LinkedIn", handle: "/in/johnjervys" },
                  { name: "GitHub", handle: "/johnjervys" }
                ].map((social, i) => (
                  <a key={i} href="#" className="flex justify-between items-end border-b border-neutral-800 pb-4 group">
                    <span className="font-display text-2xl uppercase tracking-wider group-hover:text-neutral-400 transition-colors">{social.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-neutral-600 font-mono text-xs uppercase tracking-widest gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <span>Ã‚Â© {new Date().getFullYear()} JOHN JERVYS</span>
              <span>Based in NY</span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>Built with Next.js</span>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </main>
  );
}

function MobileProjectCard({ project, i, onClick }: { project: any, i: number, onClick: () => void }) {
  const ref = useRef(null);
  // Trigger ONLY when the element crosses the exact center 2% of the screen.
  // This guarantees that only one project is colored at a time.
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px", once: false });

  return (
    <div 
      ref={ref} 
      onClick={onClick} 
      className="w-full relative bg-[#0a0a0a] border border-[#262626] overflow-hidden flex flex-col justify-between h-[400px] cursor-crosshair group/card"
    >
      {/* Background image */}
      <img
        src={project.img}
        alt={project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 ${isInView ? "grayscale-0 scale-105" : "grayscale scale-100"}`}
      />
      <div className={`absolute inset-0 transition-colors duration-700 z-10 ${isInView ? "bg-[#000000]/40" : "bg-[#000000]/80"}`} />
      
      {/* Center Device Mockups */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {i % 2 === 0 ? (
          /* Phone Mockup (iPhone Style) */
          <div className={`w-[144px] h-[284px] p-[2px] rounded-[26px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transition-all duration-700 ${isInView ? "scale-105" : "scale-100"}`}>
            {/* Front Black Bezel */}
            <div className="w-full h-full rounded-[24px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
              {/* Screen */}
              <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                <img src={project.img} alt="Phone view" className={`w-full h-full object-cover transition-all duration-700 ${isInView ? "grayscale-0" : "grayscale"}`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-40 pointer-events-none" />
              </div>
            </div>
          </div>
        ) : (
          /* Monitor/Tablet Mockup (iPad Style) */
          <div className={`w-[244px] h-[164px] p-[2px] rounded-[18px] bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transition-all duration-700 ${isInView ? "scale-105" : "scale-100"}`}>
            {/* Front Black Bezel */}
            <div className="w-full h-full rounded-[16px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
              {/* Screen */}
              <div className="w-full h-full rounded-[10px] overflow-hidden relative bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                <img src={project.img} alt="Monitor view" className={`w-full h-full object-cover transition-all duration-700 ${isInView ? "grayscale-0" : "grayscale"}`} />
                <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/0 to-white/0 z-40 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start relative z-30 p-6">
        <span className="px-3 py-1.5 bg-[#ffffff] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
        <ArrowUpRight size={28} className="text-[#ffffff]" />
      </div>
      <div className="relative z-30 p-6">
        <h3 className="font-display text-3xl text-[#ffffff] tracking-tighter uppercase">{project.title}</h3>
        <p className="text-[#a3a3a3] mt-2 font-mono text-sm uppercase tracking-widest">{project.year}</p>
      </div>
    </div>
  );
}


