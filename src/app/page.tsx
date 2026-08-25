"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

  // Uses dynamic calculation to stop exactly at the end of the content regardless of screen size
  const x = useTransform(scrollYProgress, (p) => `calc(-${p * 100}% + ${p * 100}vw)`);

  const projects = [
    { title: "Ethereal Echoes", category: "Interactive Install", year: "2023", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" },
    { title: "Brutal Genesis", category: "Web3 Platform", year: "2024", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80" },
    { title: "Void Analytics", category: "Dashboard UI", year: "2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { title: "Chromatic Shift", category: "Motion Identity", year: "2025", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
    { title: "Neon Construct", category: "Brand System", year: "2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
    { title: "Hyper Flux", category: "WebGL Experience", year: "2025", img: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80" },
    { title: "Kinetics", category: "Type Specimen", year: "2025", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" }
  ];

  return (
    <>
      {/* Desktop Sticky Scroll */}
      <section ref={targetRef} id="work-desktop" className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-b border-neutral-800 pt-24 pb-12">
          <div className="px-12 mb-12 flex justify-between items-end shrink-0">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SELECTED WORK</h2>
            <span className="text-neutral-500 font-mono">(0{projects.length})</span>
          </div>
          
          <div className="flex-1 flex items-center">
            <motion.div style={{ x }} className="flex gap-4 px-12 w-max">
              {projects.map((project, i) => (
                <div key={i} className="w-[45vw] lg:w-[35vw] h-[60vh] relative bg-[#0a0a0a] overflow-hidden border border-[#262626] hover:border-[#ffffff] transition-colors group shrink-0 flex items-center justify-center">
                  {/* Background image — grayscale by default, color on hover */}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 z-0"
                  />
                  {/* Dark overlay fades out on hover to reveal image */}
                  <div className="absolute inset-0 bg-[#000000]/70 group-hover:bg-[#000000]/30 transition-colors duration-700 z-10" />
                  {/* Content overlay — always visible */}
                  <div className="absolute p-6 flex flex-col justify-between h-full w-full z-20">
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
        </div>
      </section>

      {/* Mobile Normal Scroll */}
      <section id="work-mobile" className="block md:hidden py-24 border-b border-neutral-800">
        <div className="px-6 mb-12 flex justify-between items-end">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SELECTED WORK</h2>
        </div>
        <div className="flex flex-col gap-6 px-6">
          {projects.map((project, i) => (
            <div key={i} className="w-full relative bg-[#0a0a0a] border border-[#262626] overflow-hidden flex flex-col justify-between h-[400px] group">
              {/* Background image */}
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 z-0"
              />
              <div className="absolute inset-0 bg-[#000000]/65 group-hover:bg-[#000000]/30 transition-colors duration-700 z-10" />
              <div className="flex justify-between items-start relative z-20 p-6">
                <span className="px-3 py-1.5 bg-[#ffffff] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
                <ArrowUpRight size={28} className="text-[#ffffff]" />
              </div>
              <div className="relative z-20 p-6">
                <h3 className="font-display text-3xl text-[#ffffff] tracking-tighter uppercase">{project.title}</h3>
                <p className="text-[#a3a3a3] mt-2 font-mono text-sm uppercase tracking-widest">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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

export default function Home() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <main ref={containerRef} className="min-h-screen text-white selection:bg-white selection:text-black relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link 
          href="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity"
        >
          JOHN.
        </Link>
        <button 
          className="relative z-[60] w-12 h-12 flex flex-col items-end justify-center gap-[6px] group" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-[3px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 -rotate-45 translate-y-[9px]" : "w-10 group-hover:w-6"}`} />
          <span className={`block h-[3px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-0 opacity-0" : "w-6 group-hover:w-10"}`} />
          <span className={`block h-[3px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 rotate-45 -translate-y-[9px]" : "w-8 group-hover:w-4"}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex flex-col justify-start pt-28 pb-16 px-8 overflow-hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1 md:gap-0">
              {[
                { label: "Home", href: "#" },
                { label: "About", href: "#about" },
                { label: "Work", href: "#work" },
                { label: "Experience", href: "#experience" },
                { label: "Credential", href: "#certifications" },
                { label: "Blog", href: "#blog" },
              ].map((item, i) => (
                <div key={item.label} className="overflow-hidden flex items-center gap-4">
                  <motion.span
                    className="font-mono text-xs text-neutral-600 tracking-widest w-6 shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.3 }}
                  >0{i + 1}</motion.span>
                  <motion.a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-[13vw] md:text-[6vw] lg:text-[5vw] leading-none tracking-tighter uppercase text-white hover:text-neutral-500 transition-colors py-1"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {item.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 flex justify-end items-end md:items-center gap-4 border-t border-neutral-800 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <button 
                onClick={(e) => {
                  setMenuOpen(false);
                  toggleTheme(e);
                }} 
                className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3 w-fit border border-neutral-700 rounded-full px-6 py-3 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">Go to Resume</span>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center md:justify-end p-6 md:p-12 border-b border-neutral-800 relative overflow-hidden pt-32 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-10"
        >
          <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase mb-6 md:mb-12 break-words mt-auto">
            Multimedia<br />
            <span className="text-neutral-500 italic">Artist</span>
          </h1>
        </motion.div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-end pb-8 z-10 w-full border-t border-neutral-800 pt-8 gap-12" data-mascot-target="hero-stats">
          <div className="flex flex-wrap gap-12 md:gap-24">
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
          <p className="max-w-xs text-neutral-400 font-sans text-sm text-right md:text-right uppercase tracking-widest">
            Crafting digital experiences through the intersection of design, motion, and code.
          </p>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-32 px-6 md:px-12 border-b border-neutral-800 relative flex flex-col items-center justify-center text-center">
        <ScrollReveal className="w-full flex flex-col items-center">
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
        </ScrollReveal>
      </section>

      {/* Projects */}
      <div id="work">
        <WorkSection />
      </div>

      {/* Experience */}
      <section id="experience" className="py-32 md:py-48 px-6 md:px-12 border-b border-neutral-800">
        <ScrollReveal className="w-full">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">EXPERIENCE</h2>
          <div className="space-y-16 border-l border-neutral-800 pl-8 ml-2 md:ml-4">
            {[
              { role: "Lead Multimedia Designer", company: "Studio Void", date: "2024 - Present", desc: "Spearheading the creative direction for high-impact Web3 platforms. Merging 3D aesthetics with performant web technologies." },
              { role: "Senior Creative Developer", company: "Web3 Innovators", date: "2022 - 2024", desc: "Developed immersive blockchain landing pages and minted interactive NFT experiences." },
              { role: "Interactive Designer", company: "Digital Arts Inc.", date: "2020 - 2022", desc: "Designed experimental UI patterns for digital art galleries." },
              { role: "Motion Graphics Intern", company: "Creative Tech Lab", date: "2019 - 2020", desc: "Created kinetic typography and video mapping assets." }
            ].map((exp, i) => (
              <div key={i} className="relative group" data-mascot-target={`exp-${i}`}>
                <div className="absolute -left-[41px] top-2 w-4 h-4 bg-black border-2 border-neutral-600 group-hover:border-white transition-colors rounded-full" />
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-3xl md:text-4xl font-display transition-all tracking-tighter uppercase">{exp.role}</h3>
                  <span className="text-neutral-500 font-mono text-sm uppercase tracking-widest">{exp.date}</span>
                </div>
                <p className="text-neutral-300 text-lg mt-2 uppercase tracking-wide">{exp.company}</p>
                <p className="text-neutral-500 font-sans mt-4 max-w-5xl leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-32 md:py-48 border-b border-neutral-800 overflow-hidden relative flex flex-col gap-12">
        <ScrollReveal className="w-full">
          <div className="px-6 md:px-12" data-mascot-target="arsenal-header">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white mb-8">THE ARSENAL</h2>
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
        </ScrollReveal>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-32 md:py-48 px-6 md:px-12 border-b border-neutral-800">
        <ScrollReveal className="w-full">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">CREDENTIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {[
              { id: "01", name: "Advanced WebGL Patterns", issuer: "Creative Coding Course", year: "2024" },
              { id: "02", name: "Blockchain Architecture", issuer: "Web3 Institute", year: "2023" },
              { id: "03", name: "Awwwards Masterclass", issuer: "Typography in Web", year: "2022" },
              { id: "04", name: "Google UX Design", issuer: "Professional Certificate", year: "2022" },
              { id: "05", name: "3D Motion Graphics", issuer: "School of Motion", year: "2021" },
              { id: "06", name: "Frontend Architecture", issuer: "Frontend Masters", year: "2021" }
            ].map((cert, i) => (
              <div key={i} className="p-8 border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all group flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <span className="font-mono text-neutral-600 text-xl">{cert.id}</span>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-3xl xl:text-4xl mt-4 leading-tight group-hover:text-white text-neutral-300 tracking-tighter uppercase break-words">{cert.name}</h3>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-4">
                  <p className="text-sm font-sans text-neutral-400 uppercase tracking-widest break-words">{cert.issuer}</p>
                  <p className="font-mono text-xs text-neutral-500 mt-2 uppercase tracking-widest">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Blog */}
      <section id="blog" className="py-32 md:py-48 px-6 md:px-12 border-b border-neutral-800">
        <ScrollReveal className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase" data-mascot-target="blog-title">BLOG</h2>
            <button className="text-sm uppercase tracking-widest font-bold border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
              Read The Archives
            </button>
          </div>

          <div className="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800">
            {[
              { title: "The Death of the Drop Shadow", slug: "the-death-of-the-drop-shadow", date: "Oct 12, 2025", tag: "Design", readTime: "5 MIN", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
              { title: "Why Web3 Needs Typography", slug: "why-web3-needs-typography", date: "Sep 04, 2025", tag: "Web3", readTime: "4 MIN", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80" },
              { title: "Motion as Function", slug: "motion-as-function", date: "Aug 18, 2025", tag: "UX", readTime: "7 MIN", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
              { title: "Optimizing Three.js", slug: "optimizing-three-js", date: "Jul 22, 2025", tag: "Dev", readTime: "6 MIN", img: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&q=80" }
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col md:flex-row gap-0 hover:bg-white hover:text-black transition-all duration-300 cursor-crosshair -mx-6 md:-mx-12 px-6 md:px-12">

                {/* IMAGE — left on desktop, hidden on mobile until below meta */}
                <div className="hidden md:block w-[260px] lg:w-[320px] shrink-0 self-stretch overflow-hidden">
                  <div className="relative h-full min-h-[220px] overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between flex-1 py-8 md:px-10 gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter transition-all line-clamp-2">{post.title}</h3>
                    {/* Date + read time on one line */}
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-700 transition-colors">
                      {post.date} &nbsp;·&nbsp; {post.readTime} READ &nbsp;·&nbsp; {post.tag}
                    </p>
                  </div>

                  {/* IMAGE — mobile only, below the meta */}
                  <div className="block md:hidden w-full h-[200px] overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  <div className="flex justify-end">
                    <span className="inline-block border border-white group-hover:border-black px-6 py-3 font-mono text-xs tracking-widest font-bold uppercase transition-colors">READ ARTICLE</span>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 px-6 md:px-12">
        <ScrollReveal className="w-full">
          <div className="text-right md:text-left flex flex-col md:flex-row justify-between items-end gap-12">
            <div data-mascot-target="footer-talk">
              <h2 className="font-display text-7xl md:text-[10vw] leading-none tracking-tighter transition-all cursor-pointer">
                LET'S TALK
              </h2>
            </div>
            <div className="flex gap-8 justify-end">
              <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
                Github
              </a>
              <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
                Instagram
              </a>
              <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
                LinkedIn
              </a>
              <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
                <Mail size={16} className="inline-block" />
              </a>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-end md:items-center text-neutral-600 font-mono text-sm gap-4 text-right md:text-left">
            <p>© {new Date().getFullYear()} JOHN. ALL RIGHTS RESERVED.</p>
            <p>BUILT FOR VERCEL</p>
          </div>
        </ScrollReveal>
      </footer>
    </main>
  );
}
