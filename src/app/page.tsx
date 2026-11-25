"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useMotionValueEvent, useAnimation } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    { 
      title: "KOMYUTPH", 
      category: "PWA Navigation", 
      year: "2026", 
      date: "2026 – PRESENT", 
      role: "FrontEnd Developer & Lead UI/UX Designer", 
      tech: "React, PWA, Tailwind CSS, Leaflet", 
      desc: "An offline-first, crowdsourced navigation web application specifically tailored for informal public transportation in the Philippines (jeepneys, tricycles, and UV Express). Designed with real-time route discovery, fare estimates, and lightweight mobile accessibility." 
    },
    { 
      title: "eHANDA", 
      category: "GovTech Platform", 
      year: "2026", 
      date: "JUL 2026", 
      role: "UI/UX Designer & Media Director", 
      tech: "Next.js, Supabase, Tailwind CSS, Figma", 
      desc: "A post-disaster household needs assessment platform integrating directly with the Philippine government's eGovPH app ecosystem. Streamlines relief distribution logistics, citizen verification, and rapid aid dispatch during national emergencies. (Top 10 Finalist, eGovPH Hackathon 2026)." 
    },
    { 
      title: "MapuOne", 
      category: "Campus Web App", 
      year: "2026", 
      date: "OCT 2026", 
      role: "Full-Stack Developer", 
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase", 
      desc: "A centralized campus incident and complaint management system engineered for educational institutions. Features live grievance tracking, role-based administrative dashboards, and automated department ticket dispatch." 
    },
    { 
      title: "IoTrack Learning Kit", 
      category: "EdTech & IoT", 
      year: "2026", 
      date: "OCT 2026", 
      role: "Full-Stack Developer & UI/UX Designer", 
      tech: "React, Tailwind CSS, Supabase, PostgreSQL", 
      desc: "An interactive educational IoT learning platform featuring 3D robotic arm simulations, real-time hardware telemetry feeds, and structured engineering modules designed to make embedded robotics accessible." 
    },
    { 
      title: "SilangApp", 
      category: "Civic Mobile App", 
      year: "2025", 
      date: "SEP – DEC 2025", 
      role: "Full-Stack Developer & Lead UI/UX Designer", 
      tech: "React Native, Expo, Prisma, PostgreSQL", 
      desc: "A comprehensive barangay governance mobile application developed for Barangay Sto. Rosario Silangan, Pateros. Empowers residents with digital clearance requests, incident reporting, and real-time community advisories." 
    },
    { 
      title: "Erehwon Art Center", 
      category: "Arts MIS Platform", 
      year: "2026", 
      date: "FEB 2026", 
      role: "Lead UI/UX Designer", 
      tech: "React, Node.js, Express, PostgreSQL", 
      desc: "A comprehensive management information system engineered for Erehwon Center for the Arts to catalog valuable art collections, manage studio reservations, maintain artist exhibition records, and digitize cultural archives." 
    },
    { 
      title: "Gathr", 
      category: "Event Management", 
      year: "2025", 
      date: "AUG 2025", 
      role: "Lead UI/UX Designer & Brand Strategist", 
      tech: "Figma, React, Tailwind CSS, QR Verification", 
      desc: "An end-to-end event management platform developed for university collegiate bodies. Features streamlined event creation, participant registration workflows, custom brand identities, and real-time QR-based attendance tracking." 
    },
    { 
      title: "StudyCircle", 
      category: "Collaborative Learning", 
      year: "2026", 
      date: "FEB 2026", 
      role: "Lead UI/UX Designer & Brand Strategist", 
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase", 
      desc: "An AI-enhanced collaborative study platform featuring shared markdown documentation, interactive virtual study lounges, and automated flashcard generation for collegiate peer study groups." 
    }
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
              <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SOFTWARE PROJECTS</h2>
              <span className="text-neutral-500 font-mono">(0{projects.length})</span>
            </div>
            
            <div className="flex-1 flex items-center">
              <motion.div style={{ x }} className="flex gap-4 px-12 w-max">                {projects.map((project, i) => (
                  <div key={i} onClick={() => setSelectedProject({...project, index: i})} className="w-[45vw] lg:w-[35vw] h-[60vh] relative bg-[#0a0a0a] overflow-hidden border border-[#262626] hover:border-[#ffffff] transition-colors group shrink-0 flex items-center justify-center cursor-crosshair">
                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    
                    {/* Center Typography & Category Badge watermark */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 transition-transform duration-500 group-hover:scale-105">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3 border border-neutral-800 bg-neutral-900/80 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <h4 className="font-display text-4xl lg:text-5xl xl:text-6xl text-white tracking-tighter uppercase max-w-sm">
                        {project.title}
                      </h4>
                      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mt-3">
                        {project.role}
                      </p>
                    </div>

                    {/* Content overlay — always visible */}
                    <div className="absolute p-6 flex flex-col justify-between h-full w-full z-30 pointer-events-none">
                      <div className="flex justify-between items-start">
                        <span className="px-4 py-2 bg-[#ffffff] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
                        <ArrowUpRight size={32} className="text-[#ffffff] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white uppercase">SOFTWARE PROJECTS</h2>
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
            className="fixed inset-0 z-[100] bg-[var(--theme-bg)] text-[var(--theme-fg)] flex flex-col overflow-hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close Button — positioned absolutely to the fixed modal, so it stays sticky even while scrolling */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 flex flex-col items-end justify-center gap-[6px] mix-blend-difference"
            >
              <span className="block h-[3px] bg-white w-8 rotate-45 translate-y-[4.5px]" />
              <span className="block h-[3px] bg-white w-8 -rotate-45 -translate-y-[4.5px]" />
            </button>

            {/* Scrollable Container */}
            <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" data-lenis-prevent>
              <div className="flex flex-col md:flex-row min-h-full relative">
                
                {/* Project Branding Display */}
                <div className="w-full md:w-1/2 h-[45vh] md:h-screen sticky top-0 shrink-0 z-0 bg-black flex flex-col items-center justify-center p-8 text-center overflow-hidden border-b md:border-b-0 md:border-r border-[var(--theme-fg)]/10">
                  <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
                  
                  <div className="relative z-20 flex flex-col items-center justify-center max-w-md">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4 border border-neutral-800 bg-neutral-900/90 px-4 py-1.5 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-none">
                      {selectedProject.title}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-4">
                      {selectedProject.year} — {selectedProject.role}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-24 relative z-10 bg-[var(--theme-bg)] md:bg-transparent min-h-screen mt-[-6vh] md:mt-0">
                  <motion.div
                    className="my-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-block px-4 py-2 border border-[var(--theme-fg)]/30 text-xs font-mono uppercase tracking-widest rounded-full mb-6 xl:mb-8 opacity-70">
                      {selectedProject.year} / {selectedProject.category}
                    </span>
                    
                    <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] tracking-tighter uppercase leading-[0.85] mb-8 xl:mb-12">
                      {selectedProject.title}
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:gap-8 pt-6 xl:pt-8 mb-8 xl:mb-12 border-t border-[var(--theme-fg)]/20">
                      <div>
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest opacity-60 mb-2">Role</h4>
                        <p className="font-sans text-sm xl:text-base opacity-90">{selectedProject.role}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest opacity-60 mb-2">Tech Stack</h4>
                        <p className="font-sans text-sm xl:text-base opacity-90">{selectedProject.tech}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 border-[var(--theme-fg)]/20 pt-6 sm:pt-0">
                        <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest opacity-60 mb-2">Date</h4>
                        <p className="font-sans text-sm xl:text-base opacity-90">{selectedProject.date}</p>
                      </div>
                    </div>
                    
                    <div className="mb-12">
                      <h4 className="font-mono text-[10px] xl:text-xs uppercase tracking-widest opacity-60 mb-4 hidden md:block">About the Project</h4>
                      <p className="font-sans text-2xl md:text-3xl lg:text-4xl opacity-80 leading-tight">
                        {selectedProject.desc}
                      </p>
                    </div>

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

function ScrollReveal({ children, className, id, as = "div", staggerChildren = 0.1 }: { children: React.ReactNode; className?: string; id?: string, as?: "div" | "section" | "footer"; staggerChildren?: number }) {
  const Component = motion[as] as any;
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-15%", once: false });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Component
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren }}
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

function TypewriterRole({ roles }: { roles: string[] }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const role = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === role) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(role.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 30 : 80);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles, mounted]);

  if (!mounted) {
    return <span className="border-b-2 border-current">{roles[0]}</span>;
  }

  return (
    <span className="inline-block border-b-2 border-current font-bold text-[var(--theme-fg)]">
      {currentText || "\u00A0"}
      <span className="animate-pulse ml-0.5 opacity-70">|</span>
    </span>
  );
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

function AwardsMediaItem({ m, idx }: { m: any, idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px", once: false });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative overflow-hidden bg-neutral-950 group flex items-center justify-center cursor-crosshair rounded-sm"
    >
      {m.type === 'video' ? (
        <video 
          src={m.url} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`w-full h-auto block object-cover transition-transform duration-700 z-0 ${isInView ? "grayscale-0 max-md:scale-105" : "max-md:grayscale max-md:scale-100"} md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-110`} 
        />
      ) : (
        <img 
          src={m.url} 
          alt={`Media ${idx + 1}`} 
          className={`w-full h-auto block object-cover transition-transform duration-700 z-0 ${isInView ? "grayscale-0 max-md:scale-105" : "max-md:grayscale max-md:scale-100"} md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-110`} 
        />
      )}
      
      {/* Dark overlay that fades on hover/scroll to mimic the main page project vibe */}
      <div className={`absolute inset-0 transition-colors duration-700 z-10 pointer-events-none ${isInView ? "max-md:bg-[#000000]/20" : "max-md:bg-[#000000]/80"} md:bg-[#000000]/80 md:group-hover:bg-[#000000]/20`} />
    </motion.div>
  );
}

function AwardListItem({ item, i, onClick }: { item: any, i: number, onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px", once: false });

  return (
    <div 
      ref={ref}
      onClick={onClick} 
      className={`group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-[var(--theme-fg)]/10 transition-all duration-300 cursor-crosshair ${
        isInView ? "max-md:bg-[var(--theme-fg)] max-md:text-[var(--theme-bg)] max-md:px-6" : ""
      } md:hover:bg-[var(--theme-fg)] md:hover:text-[var(--theme-bg)] md:hover:px-6`}
    >
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 md:items-center">
        <span className={`font-mono text-xs tracking-widest transition-colors ${
          isInView ? "max-md:text-[var(--theme-bg)]/50" : "max-md:text-[var(--theme-fg)]/40"
        } md:text-[var(--theme-fg)]/40 md:group-hover:text-[var(--theme-bg)]/50`}>
          0{i + 1}
        </span>
        <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tighter">{item.award}</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 md:items-center mt-4 md:mt-0 w-full md:w-auto">
        <p className={`font-mono text-sm tracking-widest uppercase transition-colors md:w-64 ${
          isInView ? "max-md:text-[var(--theme-bg)]/70" : "max-md:text-[var(--theme-fg)]/60"
        } md:text-[var(--theme-fg)]/60 md:group-hover:text-[var(--theme-bg)]/70`}>
          {item.competition}
        </p>
        <p className={`font-mono text-xs tracking-wider uppercase transition-colors md:w-48 hidden md:block md:text-[var(--theme-fg)]/60 md:group-hover:text-[var(--theme-bg)]/70`}>
          {item.role}
        </p>
        <span className="font-mono text-xl tracking-tighter font-bold">{item.year}</span>
      </div>
    </div>
  );
}

function AwardsSection() {
  const [selectedAward, setSelectedAward] = useState<any>(null);

  useEffect(() => {
    if (selectedAward) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [selectedAward]);

  const awards = [
    { 
      award: "Best in UI and UX; 1st Runner Up", 
      competition: "Infotechnolympics 2026 — Hackathon Category", 
      year: "2026", 
      project: "Hackathon Category", 
      prize: "Trophy + Cash Prize", 
      role: "Lead UI/UX Designer & Full-Stack Developer", 
      desc: "Awarded Best in UI and UX and 1st Runner Up in the Hackathon Category at Infotechnolympics 2026. Recognized for exceptional human-centered interaction design, user accessibility, and rapid functional prototyping under intense hackathon time constraints.", 
      media: [
        { type: 'image', url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&q=80" },
        { type: 'image', url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80" }
      ]
    },
    { 
      award: "Top 10 Finalists", 
      competition: "eGovPH Hackathon 2026", 
      year: "2026", 
      project: "eHANDA", 
      prize: "National Finalist Recognition", 
      role: "UI/UX Designer & Media Director", 
      desc: "Selected as one of the Top 10 Finalists nationwide in the prestigious eGovPH Hackathon 2026 for eHANDA, a rapid post-disaster household assessment platform integrating into the national eGovPH app ecosystem.", 
      media: [
        { type: 'image', url: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=1600&q=80" },
        { type: 'image', url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" }
      ]
    },
    { 
      award: "Most Commercially Viable", 
      competition: "UMak 7th Hackathon 2025", 
      year: "2025", 
      project: "Campus Innovation Track", 
      prize: "Special Citation & Grant", 
      role: "UI/UX Designer & Product Lead", 
      desc: "Honored with the Most Commercially Viable Award at the 7th University of Makati Hackathon 2025. Recognized for outstanding business sustainability, market readiness, and an intuitive product experience.", 
      media: [
        { type: 'image', url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" },
        { type: 'image', url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80" }
      ]
    },
    { 
      award: "1st Runner Up", 
      competition: "Infotechnolympics 2025 — C# Category", 
      year: "2024", 
      project: "C# Algorithmic Challenge", 
      prize: "Trophy + Certificate", 
      role: "Algorithm Engineer", 
      desc: "Won 1st Runner Up in the C# Category at Infotechnolympics 2025, demonstrating advanced computational problem solving, data structure proficiency, and rapid algorithmic software development.", 
      media: [
        { type: 'image', url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80" },
        { type: 'image', url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80" }
      ]
    }
  ];

  return (
    <>
      <ScrollReveal as="section" id="awards" className="py-40 md:py-48 px-6 md:px-12">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12 border-b border-[var(--theme-fg)]/20 pb-6">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase">AWARDS</h2>
            <span className="font-mono text-xs text-[var(--theme-fg)] opacity-50 uppercase tracking-widest hidden md:block">Competitions & Recognition</span>
          </div>
          <div className="flex flex-col">
            {awards.map((item, i) => (
              <AwardListItem key={i} item={item} i={i} onClick={() => setSelectedAward(item)} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[var(--theme-bg)] text-[var(--theme-fg)] flex flex-col overflow-hidden"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button 
              onClick={() => setSelectedAward(null)}
              className="fixed top-6 right-6 z-[110] w-12 h-12 flex flex-col items-end justify-center gap-[6px] mix-blend-difference"
            >
              <span className="block h-[3px] bg-white w-8 rotate-45 translate-y-[4.5px]" />
              <span className="block h-[3px] bg-white w-8 -rotate-45 -translate-y-[4.5px]" />
            </button>

            <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative" data-lenis-prevent>
              <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 py-24 md:py-32">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mb-16 md:mb-24"
                >
                  <span className="inline-block px-4 py-2 border border-[var(--theme-fg)]/30 text-xs font-mono uppercase tracking-widest rounded-full mb-6 opacity-70">
                    {selectedAward.year} / {selectedAward.competition}
                  </span>
                  
                  <h2 className="font-display text-5xl md:text-8xl lg:text-[9rem] tracking-tighter uppercase leading-[0.85] mb-8">
                    {selectedAward.award}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-[var(--theme-fg)]/20 pt-8 mt-12">
                    <div className="md:col-span-4 lg:col-span-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Project</h4>
                      <h3 className="font-display text-2xl md:text-3xl tracking-tighter uppercase opacity-90">
                        {selectedAward.project}
                      </h3>
                    </div>
                    <div className="md:col-span-4 lg:col-span-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Cash Prize / Reward</h4>
                      <p className="font-sans text-base font-medium opacity-90">{selectedAward.prize}</p>
                    </div>
                    <div className="md:col-span-4 lg:col-span-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Role</h4>
                      <p className="font-sans text-base opacity-90">{selectedAward.role}</p>
                    </div>
                  </div>

                  <div className="mt-16 md:mt-24 max-w-4xl">
                    <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6">About the Project</h4>
                    <p className="font-sans text-2xl md:text-4xl opacity-80 leading-tight">
                      {selectedAward.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Media Gallery */}
                <div className="flex flex-col gap-12 md:gap-24">
                  {selectedAward.media.map((m: any, idx: number) => (
                    <AwardsMediaItem key={idx} m={m} idx={idx} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroAndAboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.scrollTo(target, { offset: -20 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", href);
      }
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });

  // Hero exit transformations: scaling down, fading out, slight upward parallax drift, and subtle depth blur (desktop only)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.35, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const heroFilter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(2px)", "blur(6px)"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.65]);

  // Who is John? (About Section) subtle upward parallax reveal as it ascends (desktop only)
  const aboutContentY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const aboutContentOpacity = useTransform(scrollYProgress, [0.15, 0.85], [0.35, 1]);

  // Adaptive Hero Stat Cards
  const heroCards = [
    { num: "8+", label: "Projects", href: "#work" },
    { num: "4", label: "Awards", href: "#awards" },
    { num: "100+", label: "Gallery", href: "/gallery" },
    { num: "4+", label: "Years Exp.", href: "#experience" }
  ];

  const half = Math.ceil(heroCards.length / 2);
  const leftCards = heroCards.slice(0, half);
  const rightCards = heroCards.slice(half);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hero Section — sticky on desktop, normal relative flow on phone */}
      <section 
        id="hero" 
        className="relative min-h-screen md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between px-6 md:px-12 pt-24 md:pt-16 pb-8 md:pb-10 overflow-hidden z-0"
      >
        <motion.div 
          style={isDesktop ? { 
            opacity: heroOpacity, 
            scale: heroScale, 
            y: heroY, 
            filter: heroFilter 
          } : undefined}
          className="w-full h-full flex flex-col justify-between items-center origin-center relative z-10"
        >
          {/* Top Title: JOHN */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center shrink-0 z-0"
          >
            <h1 className="font-display text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[13vw] font-bold tracking-tighter uppercase leading-[0.75] text-white select-none">
              JOHN
            </h1>
          </motion.div>

          {/* Center Stage: Portrait flanked by Adaptive Floating Stat Cards on the Left and Right */}
          <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center my-auto -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-20 z-20 px-2 sm:px-6">
            {/* Left Floating Cards (Desktop) */}
            <div className="hidden lg:flex flex-col gap-6 xl:gap-8 flex-1 items-end pr-8 xl:pr-12 pt-8 xl:pt-12 z-30">
              {leftCards.map((card, idx) => (
                <Link key={idx} href={card.href} onClick={(e) => handleCardClick(e, card.href)} className="group">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: -4 }}
                    className={`relative ${idx % 2 === 0 ? "w-56 xl:w-64" : "w-60 xl:w-72 mr-3 xl:mr-6"} p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/85 dark:bg-neutral-950/85 backdrop-blur-md shadow-2xl text-right flex flex-col justify-center cursor-pointer group-hover:border-[var(--theme-fg)]/40 transition-colors`}
                  >
                    <div className="absolute top-4 left-4 w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-[var(--theme-fg)] group-hover:border-[var(--theme-fg)] group-hover:bg-[var(--theme-fg)]/10 transition-all duration-300">
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="font-display text-4xl xl:text-6xl font-bold tracking-tighter text-[var(--theme-fg)] leading-none">
                      <ScrambleText text={card.num} />
                    </span>
                    <p className="font-mono text-xs xl:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-2">{card.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Centered Image — larger and slightly overlapping the JOHN text above */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center shrink-0 z-20"
            >
              <div className="relative w-[82vw] sm:w-[68vw] md:w-[54vw] lg:w-[38vw] xl:w-[36vw] max-w-[590px] aspect-square flex items-center justify-center">
                <Image
                  src={theme === "light" ? "/lmode.png" : "/dmode.png"}
                  alt="John"
                  width={1080}
                  height={1080}
                  priority
                  className="w-full h-full object-contain select-none pointer-events-none transition-all duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right Floating Cards (Desktop) */}
            <div className="hidden lg:flex flex-col gap-6 xl:gap-8 flex-1 items-start pl-8 xl:pl-12 pt-8 xl:pt-12 z-30">
              {rightCards.map((card, idx) => (
                <Link key={idx} href={card.href} onClick={(e) => handleCardClick(e, card.href)} className="group">
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`relative ${idx % 2 === 0 ? "w-56 xl:w-64" : "w-60 xl:w-72 ml-3 xl:ml-6"} p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/85 dark:bg-neutral-950/85 backdrop-blur-md shadow-2xl text-left flex flex-col justify-center cursor-pointer group-hover:border-[var(--theme-fg)]/40 transition-colors`}
                  >
                    <div className="absolute top-4 right-4 w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-[var(--theme-fg)] group-hover:border-[var(--theme-fg)] group-hover:bg-[var(--theme-fg)]/10 transition-all duration-300">
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="font-display text-4xl xl:text-6xl font-bold tracking-tighter text-[var(--theme-fg)] leading-none">
                      <ScrambleText text={card.num} />
                    </span>
                    <p className="font-mono text-xs xl:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-2">{card.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Cards Grid (Adaptive layout below image when < lg) */}
          <div className={`grid ${heroCards.length > 2 ? "grid-cols-2" : "grid-cols-1"} gap-4 w-full max-w-lg lg:hidden mt-4 z-30`}>
            {heroCards.map((c, idx) => (
              <Link 
                key={idx} 
                href={c.href}
                onClick={(e) => handleCardClick(e, c.href)}
                className="group relative p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/70 backdrop-blur-sm text-center cursor-pointer transition-all active:scale-95 hover:border-[var(--theme-fg)]/40"
              >
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-[var(--theme-fg)] group-hover:border-[var(--theme-fg)] transition-colors">
                  <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="font-display text-3xl font-bold tracking-tighter text-[var(--theme-fg)]">
                  <ScrambleText text={c.num} />
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-1">{c.label}</p>
              </Link>
            ))}
          </div>

          {/* Bottom Summary — enlarged, refined editorial layout */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto flex flex-col items-center text-center pb-2 md:pb-6 mt-4 lg:mt-6 shrink-0 z-30"
          >
            {/* Portfolio Summary Statement — fixed 3-line layout to prevent line wrapping jumps */}
            <p className="max-w-6xl mx-auto font-display text-base sm:text-xl md:text-2xl lg:text-[2.15rem] xl:text-[2.25rem] font-medium tracking-tight text-[var(--theme-fg)] leading-[1.25] uppercase">
              <span className="md:block">
                Jack of all trades in multimedia, and a builder by code.
              </span>
              <span className="md:block my-0.5">
                From{" "}
                <TypewriterRole 
                  roles={[
                    "cinematography",
                    "direction",
                    "video editing", 
                    "videography", 
                    "creative storytelling", 
                    "production"
                  ]} 
                />{" "}
                to software engineering
              </span>
              <span className="md:block">
                SPECIALIZING IN <span className="italic font-light opacity-65">UI/UX DESIGN</span>
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Soft background dimming overlay on desktop only */}
        {isDesktop && (
          <motion.div 
            style={{ opacity: overlayOpacity }} 
            className="absolute inset-0 bg-[var(--theme-bg)] pointer-events-none z-20" 
          />
        )}
      </section>

      {/* Who is John? (About Section) — overlapping card on desktop, normal section on phone */}
      <section 
        ref={aboutRef} 
        id="about" 
        className="relative z-10 py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center bg-dissolve-mask overflow-hidden"
      >
        <div className="ambient-dissolve-glow" aria-hidden="true" />
        <motion.div 
          style={isDesktop ? { y: aboutContentY, opacity: aboutContentOpacity } : undefined}
          className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10"
        >
          {/* Little Title on Top */}
          <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-6 border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 rounded-full">
            Who Am I?
          </span>

          {/* Statement */}
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.15] tracking-tighter text-[var(--theme-fg)] mb-12">
            I&apos;m John Jervys — an aspiring multimedia artist and software engineer exploring different ways to bring ideas to life through media production and software development. I&apos;ve always enjoyed creating, whether it&apos;s through visuals, storytelling, design, or technology.
          </h3>

          {/* Centered CTA Link Button */}
          <div className="flex justify-center items-center">
            <Link 
              href="/about" 
              data-mascot-target="about-btn" 
              className="group inline-flex items-center gap-3 border border-neutral-300 dark:border-neutral-700 rounded-full px-6 py-3.5 md:px-8 md:py-4 hover:bg-[var(--theme-fg)] hover:text-[var(--theme-bg)] hover:border-[var(--theme-fg)] transition-all duration-300 font-display text-sm md:text-base uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-[var(--theme-bg)]"
            >
              <span>Get to know me more</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
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
                  { label: "Projects", href: "#work" },
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
                  <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">Multimedia Archive</h3>
                  <Link href="/gallery" onClick={() => setMenuOpen(false)} className="group flex items-center gap-4 text-2xl md:text-3xl font-display uppercase tracking-wider text-white hover:text-neutral-400 transition-colors pr-4">
                    View Gallery <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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


      {/* Hero & About Combined Smooth Transition */}
      <HeroAndAboutSection />

      {/* Projects */}
      <div id="work">
        <div id="projects" className="scroll-mt-24">
          <WorkSection />
        </div>
      </div>

      {/* Experience */}
      <ScrollReveal as="section" id="experience" className="py-24 md:py-36 px-6 md:px-12 bg-dissolve-mask relative overflow-hidden flex flex-col justify-center">
        <div className="ambient-dissolve-glow" aria-hidden="true" />
        <div className="w-full relative z-10">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">EXPERIENCE</h2>
          <div className="space-y-24 pl-8 ml-2 md:ml-4 relative">
            {[
              { 
                role: "Publicity and Ads Head & Research and Development Committee Member", 
                company: "University of Makati - Society of Innovative Computing", 
                date: "Oct 2026 - Present", 
                desc: "Spearheading creative direction, scriptwriting, video editing, pre-production, production, and post-production for college multimedia campaigns and technological research initiatives." 
              },
              { 
                role: "Freelance App Developer & UI/UX Designer", 
                company: "Independent Practice", 
                date: "Nov 2024 - Present", 
                desc: "Architecting and developing client web and mobile applications across diverse industries (MapuOne, IoTrack Learning Kit, StudyCircle, Erehwon Art Center, Gathr, IntelliStock, KuraStock, Muntinlupa UPA). Delivering full-stack solutions with Next.js, React Native, Supabase, and Tailwind CSS." 
              },
              { 
                role: "Founder & Creative Director", 
                company: "EstudyantEdits", 
                date: "Jul 2023 - Present", 
                desc: "Founded and directing a creative digital collective delivering photo and video editing, branding, graphic design, and custom web development for academic bodies and commercial brands." 
              },
              { 
                role: "Freelance Multimedia & Video Lead", 
                company: "Erovoutika", 
                date: "Dec 2025 - Jan 2026", 
                desc: "Spearheaded video production, motion graphics, and event media documentation for premier national robotics events, including the 4th Robolution and Minoan Robotsports Competition Philippines." 
              },
              { 
                role: "Student Intern — Broadcast Production", 
                company: "DOSTv", 
                date: "Jun 2023 - Jul 2023", 
                desc: "Executed news videography, B-roll cinematography, and post-production for national television broadcasts and digital science communication." 
              },
              { 
                role: "Video Editing Head", 
                company: "Multimedia and Information Technology Society (MITS)", 
                date: "Jun 2021 - Jul 2023", 
                desc: "Supervised the video editing department, creating promotional reels, event coverage, and multimedia design assets for campus IT initiatives." 
              }
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
              ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
              ["Python", "Java", "C#", "Kotlin", "SQL", "PostgreSQL", "Supabase", "Prisma"],
              ["Figma", "Premiere Pro", "After Effects", "Photoshop", "Android Studio", "GCP", "Vercel"]
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
      <ScrollReveal as="section" id="certifications" className="py-24 md:py-36 px-6 md:px-12 bg-dissolve-mask relative overflow-hidden flex flex-col justify-center">
        <div className="w-full relative z-10">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">CREDENTIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
            {[
              { name: "IT-Specialist — Databases", issuer: "Pearson", date: "Oct 2026", link: "https://www.pearsonvue.com" },
              { name: "Data Streaming Engineer", issuer: "Confluent", date: "Jul 2026", link: "https://www.confluent.io" },
              { name: "Global MOOC on Ethics of AI", issuer: "LG AI Research", date: "May 2025", link: "https://www.lgresearch.ai" }
            ].map((cert, i) => (
              <a href={cert.link} key={i} target="_blank" rel="noopener noreferrer" className="relative p-8 border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all group flex flex-col justify-between h-full min-h-[260px]">
                {/* Link Icon */}
                <div className="absolute top-8 right-8 text-neutral-700 group-hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </div>
                <div className="pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">{cert.issuer}</span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-3xl mt-2 leading-snug group-hover:text-white text-neutral-100 tracking-tight uppercase break-words pr-8">{cert.name}</h3>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-4">
                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{cert.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Awards */}
      <AwardsSection />



      {/* Footer / Contact */}
      <ScrollReveal as="footer" id="contact" className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 bg-dissolve-mask-top relative overflow-hidden flex flex-col justify-between">
        <div className="ambient-dissolve-glow" aria-hidden="true" />
        <div className="w-full flex flex-col gap-24 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-between" data-mascot-target="footer-talk">
              <h2 className="font-display text-6xl md:text-[8vw] leading-[0.85] tracking-tighter uppercase break-words">
                Have a project?<br />
                <span className="text-neutral-500 italic hover:text-white transition-colors cursor-crosshair">Let's build it.</span>
              </h2>
              <div className="mt-16 md:mt-24">
                <a href="mailto:johnjervyscabalo08@gmail.com" className="inline-flex items-center gap-6 group">
                  <span className="font-mono text-xl md:text-3xl text-neutral-300 uppercase tracking-widest border-b-2 border-transparent group-hover:border-white transition-all pb-2 break-all">
                    johnjervyscabalo08@gmail.com
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
                  { name: "Instagram", handle: "@not_jrvys", href: "https://instagram.com/not_jrvys" },
                  { name: "Twitter", handle: "@not_jrvys", href: "https://twitter.com/not_jrvys" },
                  { name: "GitHub", handle: "/jjcabalo", href: "https://github.com/jjcabalo" },
                  { name: "LinkedIn", handle: "/in/john-jervys-cabalo", href: "https://linkedin.com/in/john-jervys-cabalo" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex justify-between items-end border-b border-neutral-800 pb-4 group">
                    <span className="font-display text-2xl uppercase tracking-wider group-hover:text-neutral-400 transition-colors">{social.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}

function MobileProjectCard({ project, i, onClick }: { project: any, i: number, onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px", once: false });

  return (
    <div 
      ref={ref} 
      onClick={onClick} 
      className="w-full relative bg-[#0a0a0a] border border-[#262626] overflow-hidden flex flex-col justify-between h-[360px] cursor-crosshair group/card"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Center Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-2 border border-neutral-800 bg-neutral-900/80 px-2.5 py-0.5 rounded-full">
          {project.category}
        </span>
        <h4 className="font-display text-3xl sm:text-4xl text-white tracking-tighter uppercase">
          {project.title}
        </h4>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mt-2">
          {project.role}
        </p>
      </div>

      <div className="flex justify-between items-start relative z-30 p-6 pointer-events-none">
        <span className="px-3 py-1.5 bg-[#ffffff] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
        <ArrowUpRight size={28} className="text-[#ffffff]" />
      </div>
      <div className="relative z-30 p-6 pointer-events-none">
        <h3 className="font-display text-2xl text-[#ffffff] tracking-tighter uppercase">{project.title}</h3>
        <p className="text-[#a3a3a3] mt-1 font-mono text-xs uppercase tracking-widest">{project.year}</p>
      </div>
    </div>
  );
}


