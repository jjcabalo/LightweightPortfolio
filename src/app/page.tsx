"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useMotionValueEvent, useAnimation } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Sun, Moon, Play, Layers, Layout, Zap, SlidersHorizontal, Eye, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

function renderHighlightedDesc(desc: string, highlights?: string[]) {
  if (!highlights || highlights.length === 0) return desc;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = desc.split(regex);
  let matchIndex = 0;
  return parts.map((part, idx) => {
    const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
    if (!isMatch) return part;
    const tilt = matchIndex % 2 === 0 ? "md:-rotate-1" : "md:rotate-1";
    matchIndex++;
    return (
      <span
        key={idx}
        className={`inline md:inline-block box-decoration-clone bg-[var(--theme-fg)] text-[var(--theme-bg)] px-1.5 py-0.5 rounded-none font-[family-name:var(--font-inter)] font-sans uppercase font-bold text-[0.85em] ${tilt} mx-0.5`}
      >
        {part}
      </span>
    );
  });
}

function AcidDissolveBg({ topOnly = false }: { topOnly?: boolean }) {
  const fullMask =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2880 600' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='14'/%3E%3C/filter%3E%3C/defs%3E%3Cpath filter='url(%23b)' fill='white' d='M0,95 C65,25 110,115 190,42 C245,-5 295,90 365,68 C425,48 455,10 535,88 C610,145 680,18 755,48 C815,72 860,125 940,32 C1005,-10 1065,98 1135,76 C1210,52 1255,12 1325,84 C1375,130 1410,35 1440,95 C1505,25 1550,115 1630,42 C1685,-5 1735,90 1805,68 C1865,48 1895,10 1975,88 C2050,145 2120,18 2195,48 C2255,72 2300,125 2380,32 C2445,-10 2505,98 2575,76 C2650,52 2695,12 2765,84 C2815,130 2850,35 2880,95 L2880,530 C2850,545 2815,475 2780,512 C2715,590 2665,564 2595,532 C2520,498 2455,605 2385,565 C2305,475 2260,522 2195,548 C2115,578 2050,460 1975,515 C1895,595 1855,575 1785,535 C1710,492 1645,595 1575,542 C1505,485 1470,565 1440,530 C1410,545 1375,475 1340,512 C1275,590 1225,564 1155,532 C1080,498 1015,605 945,565 C865,475 820,522 755,548 C675,578 610,460 535,515 C455,595 415,575 345,535 C270,492 205,595 135,542 C65,485 25,565 0,530 Z'/%3E%3C/svg%3E\")";
  const topOnlyMask =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2880 600' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='14'/%3E%3C/filter%3E%3C/defs%3E%3Cpath filter='url(%23b)' fill='white' d='M0,95 C65,25 110,115 190,42 C245,-5 295,90 365,68 C425,48 455,10 535,88 C610,145 680,18 755,48 C815,72 860,125 940,32 C1005,-10 1065,98 1135,76 C1210,52 1255,12 1325,84 C1375,130 1410,35 1440,95 C1505,25 1550,115 1630,42 C1685,-5 1735,90 1805,68 C1865,48 1895,10 1975,88 C2050,145 2120,18 2195,48 C2255,72 2300,125 2380,32 C2445,-10 2505,98 2575,76 C2650,52 2695,12 2765,84 C2815,130 2850,35 2880,95 L2880,640 L0,640 Z'/%3E%3C/svg%3E\")";
  const mask = topOnly ? topOnlyMask : fullMask;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute inset-y-0 left-0 w-[200%] min-w-[1440px] z-0 bg-[var(--theme-neutral-950)]"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    />
  );
}

function WorkSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeMediaModal, setActiveMediaModal] = useState<{ title: string; url: string } | null>(null);
  const [showAiWorkflow, setShowAiWorkflow] = useState(false);
  const [activeInfoStep, setActiveInfoStep] = useState<string | null>(null);
  const [workflowStepIdx, setWorkflowStepIdx] = useState(0);
  const workflowSequence = ["01", "02", "03", "04", "05", "iterate", "03", "04", "05", "06"];
  const activeWorkflowNode = workflowSequence[workflowStepIdx];

  useEffect(() => {
    if (!showAiWorkflow) {
      setWorkflowStepIdx(0);
      return;
    }
    const timer = setInterval(() => {
      setWorkflowStepIdx((prev) => (prev + 1) % workflowSequence.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [showAiWorkflow]);

  // Uses dynamic calculation to stop exactly at the end of the content regardless of screen size
  const x = useTransform(scrollYProgress, (p) => `calc(-${p * 100}% + ${p * 100}vw)`);

  const projects = [
    { 
      title: "Erehwon Art Center", 
      category: "Arts MIS Platform", 
      year: "2026", 
      date: "FEB 2026", 
      role: "Lead UI/UX Designer", 
      tech: "Figma MCP, Google's Antigravity", 
      desc: "Erehwon Art Center is an art management system for cataloging collections, managing artist records, handling studio reservations, and maintaining cultural archives. I led its UI/UX design, focusing on structured information architecture and simplified administrative workflows.",
      highlights: ["administrative workflows"],
      deployed: false,
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0/Designs?node-id=166-33392&t=MuQ3a3uLCwHi3pOr-0",
      deviceType: "tablet",
      deviceImage: "/projects/EREHWON-T.webp",
      deviceImages: [
        "/projects/EREHWON-T.webp",
        "/projects/Erehwon/ArtistCommissions.webp",
        "/projects/Erehwon/Billing.webp",
        "/projects/Erehwon/SpaceRentalModalMessage.webp"
      ],
      bgImage: "/projects/EREHWON-BG.webp"
    },
    { 
      title: "Gathr", 
      category: "Event Management", 
      year: "2025", 
      date: "AUG 2025", 
      role: "Lead UI/UX Designer & Brand Designer", 
      tech: "Figma MCP, Google's Antigravity", 
      desc: "Gathr is a mobile event management platform for university organizations, featuring event creation, participant registration, and QR-based attendance tracking. I led its UI/UX and brand design, applying a mobile-first approach with streamlined user flows and touch-friendly interactions.",
      highlights: ["mobile-first approach"],
      deployed: false,
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0/Designs?node-id=166-33392&t=MuQ3a3uLCwHi3pOr-0",
      deviceType: "mobile",
      deviceImage: "/projects/GATHR-M.webp",
      deviceImages: [
        "/projects/GATHR-M.webp",
        "/projects/Gathr/Splash Screen.webp",
        "/projects/Gathr/Splash Screen (1).webp",
        "/projects/Gathr/Splash Screen (2).webp",
        "/projects/Gathr/Splash Screen (3).webp",
        "/projects/Gathr/Landing Page.webp",
        "/projects/Gathr/Participants - Upcoming Status.webp"
      ],
      bgImage: "/projects/GATHR-BG.webp"
    },
    { 
      title: "StudyCircle", 
      category: "Collaborative Learning", 
      year: "2026", 
      date: "FEB 2026", 
      role: "Lead UI/UX Designer & Brand Designer", 
      tech: "Figma MCP, Google's Antigravity", 
      desc: "StudyCircle is an AI-powered collaborative learning platform featuring shared notes, virtual study spaces, and automated flashcard generation. I led its UI/UX and brand design, focusing on content hierarchy, intuitive navigation, and organized learning experiences.",
      highlights: ["content hierarchy", "organized learning"],
      deployed: false,
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0/Designs?node-id=166-33392&t=MuQ3a3uLCwHi3pOr-0",
      deviceType: "tablet",
      deviceImage: "/projects/STUDYCIRCLE-T.webp",
      deviceImages: [
        "/projects/STUDYCIRCLE-T.webp",
        "/projects/StudyCircle/Homepage (Untoggled).webp",
        "/projects/StudyCircle/Main Interface.webp",
        "/projects/StudyCircle/Avatar Customization.webp",
        "/projects/StudyCircle/Profile.webp"
      ],
      bgImage: "/projects/STUDYCIRCLE-BG.webp"
    },
    {
      title: "KokoMyut",
      category: "Offline AI Mobile App",
      year: "2026",
      date: "OCT 2026",
      role: "Lead UI/UX Designer, Brand Designer",
      tech: "On-Device LLM, Figma",
      desc: "KokoMyut is an offline-first AI commuter assistant for the Taguig and Makati corridor. Its on-device AI understands Tagalog and English, providing route recommendations, fare and schedule details, and drop-off alerts without internet access. I led its branding and UI/UX design, applying Progressive Disclosure and Recognition Over Recall to simplify information and make route discovery easier.",
      highlights: ["Progressive Disclosure", "Recognition Over Recall"],
      deployed: false,
      tag: "AI HACKATHON ENTRY",
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0",
      mediaButtons: [
        {
          label: "View Demo",
          url: "https://www.linkedin.com/posts/jjcabalo_appbuildersph-localai-kokomyut-ugcPost-7514503407764959233-AjN1"
        }
      ],
      deviceType: "mobile",
      deviceImage: "/projects/KokoMyut/Landing New With Choices.webp",
      deviceImages: [
        "/projects/KokoMyut/SplashScreen.webp",
        "/projects/KokoMyut/Landing New With Choices.webp",
        "/projects/KokoMyut/Typing.webp",
        "/projects/KokoMyut/Processing.webp",
        "/projects/KokoMyut/Result.webp",
        "/projects/KokoMyut/Chat Route Carousel.webp",
        "/projects/KokoMyut/Detailed (Uncollapsed).webp",
        "/projects/KokoMyut/Manual Mode.webp",
        "/projects/KokoMyut/Ongoing Commute (1).webp"
      ],
      bgImage: "/projects/KokoMyut/Chat Route Carousel.webp"
    },
    {
      title: "MAKI",
      category: "AI University Assistant",
      year: "2026",
      date: "OCT 2026",
      role: "UI/UX Designer, Brand Designer & Frontend Developer",
      tech: "React, Vite, Tailwind CSS, TypeScript, Motion, Lucide React",
      desc: "MAKI (My Assistant for Knowledge and Information) is an AI-powered university assistant integrated into the University of Makati website, helping students quickly find information inside the website. I led shaping the visual identity, embedded interface design, UX, and responsive interface, contributing to its recognition as Best in UI/UX and 1st Runner-Up in the InfoTechnolympics 2026 Hackathon Category.",
      highlights: ["visual identity", "Best in UI/UX"],
      deployed: false,
      tag: "AI HACKATHON ENTRY",
      deviceType: "tablet",
      deviceImage: "/projects/MAKI/MAKI-1.webp",
      deviceImages: [
        "/projects/MAKI/MAKI-1.webp",
        "/projects/MAKI/MAKI-2.webp"
      ],
      bgImage: "/projects/MAKI/MAKI-2.webp"
    },
    { 
      title: "eHANDA", 
      category: "GovTech Platform", 
      year: "2026", 
      date: "JUL 2026", 
      role: "Media Director", 
      tech: "Next.js, Supabase, Tailwind CSS, Figma", 
      desc: "eHANDA is a post-disaster household needs assessment platform integrated into the eGovPH ecosystem to support emergency response and relief operations. I handled its brand identity, pitch deck direction, presentation flow, and promotional materials to communicate the platform's purpose and value winning Top 10 Finalists and Cash prize of ₱100,000.",
      highlights: ["brand identity", "Top 10 Finalists"],
      deployed: true,
      liveUrl: "https://e-handa.vercel.app",
      mediaButtons: [
        { label: "Team Intro", url: "https://drive.google.com/file/d/1ShdxqYEtxZd84gDpCY0g7HzBfOpyCxpD/preview", modalTitle: "eHANDA — Team Intro" },
        { label: "System Demo", url: "https://drive.google.com/file/d/1FK6x0YO0V-Yn2HI7G71mx2DzUvJhq9z4/preview", modalTitle: "eHANDA — System Demo" }
      ],
      deviceType: "tablet",
      deviceImage: "/projects/EHAND-T.webp",
      bgImage: "/projects/EHANDA-BG.webp"
    },
    { 
      title: "SilangApp", 
      category: "Civic Mobile App", 
      year: "2025", 
      date: "SEP – DEC 2025", 
      role: "Full-Stack Developer & Lead UI/UX Designer", 
      tech: "React Native, Expo, Prisma, PostgreSQL", 
      desc: "SilangApp is a barangay management application for Barangay Sto. Rosario, Silangan, Pateros, featuring digital service requests, incident reporting, and community announcements. I handled its UI/UX design and full-stack development, from user flows and wireframes to frontend and backend integration.",
      highlights: ["user flows", "wireframes"],
      deployed: true,
      liveUrl: "https://admin.silangapp.online",
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0/Designs?node-id=166-33392&t=MuQ3a3uLCwHi3pOr-0",
      deviceType: "mobile",
      deviceImage: "/projects/SILANGAPP-M-NEW.webp",
      deviceImages: [
        "/projects/SILANGAPP-M-NEW.webp",
        "/projects/SilangApp/Who is using the app_ (1).webp",
        "/projects/SilangApp/Item View Card.webp",
        "/projects/SilangApp/Make new Post.webp",
        "/projects/SilangApp/Make new Post (1).webp",
        "/projects/SilangApp/Profile Tab.webp"
      ],
      bgImage: "/projects/SILANGAPP-BG-NEW.webp"
    },
    { 
      title: "KOMYUTPH", 
      category: "PWA Navigation", 
      year: "2026", 
      date: "2026 – PRESENT", 
      role: "FrontEnd Developer, Lead UI/UX Designer, Brand Designer", 
      tech: "React, PWA, Tailwind CSS, Leaflet", 
      desc: "KOMYUTPH is an offline-first, crowdsourced navigation platform for discovering informal public transportation routes and estimating fares in the Philippines. I led its branding and UI/UX design, applying Jakob's Law for familiar navigation patterns and the Thumb Zone principle to position frequently used mobile actions within comfortable reach.",
      highlights: ["Jakob's Law", "Thumb Zone principle"],
      deployed: true,
      liveUrl: "https://komyutph.com",
      mediaButtons: [
        { label: "View Demo", url: "https://drive.google.com/file/d/1m-DLGness2mJhEhNfd03-ZLFejDWzvqJ/preview", modalTitle: "KOMYUTPH — Interactive Demo" }
      ],
      figmaUrl: "https://www.figma.com/design/o72FIFhP9JvfqAFDOtAAh0/Designs?node-id=166-33392&t=MuQ3a3uLCwHi3pOr-0",
      deviceType: "mobile",
      deviceImage: "/projects/KOMYUTPH-M.webp",
      deviceImages: [
        "/projects/KOMYUTPH-M.webp",
        "/projects/KomyutPH/SplashScreen.webp",
        "/projects/KomyutPH/Landing Page.webp",
        "/projects/KomyutPH/Home.webp",
        "/projects/KomyutPH/Light Mode.webp",
        "/projects/KomyutPH/Left Panel.webp",
        "/projects/KomyutPH/Selected Location (Collapsed).webp",
        "/projects/KomyutPH/View Route.webp",
        "/projects/KomyutPH/See Journey.webp",
        "/projects/KomyutPH/Terminals.webp",
        "/projects/KomyutPH/Directory.webp",
        "/projects/KomyutPH/Contribute.webp",
        "/projects/KomyutPH/Post.webp",
        "/projects/KomyutPH/Replies.webp",
        "/projects/KomyutPH/Profile.webp",
        "/projects/KomyutPH/Leaderboard.webp",
        "/projects/KomyutPH/Achivements.webp",
        "/projects/KomyutPH/Carousel.webp"
      ],
      bgImage: "/projects/KOMYUTPH-BG.webp"
    },
    { 
      title: "IoTrack", 
      category: "EdTech & IoT", 
      year: "2026", 
      date: "OCT 2026", 
      role: "Full-Stack Developer & UI/UX Designer", 
      tech: "React, Tailwind CSS, Supabase, PostgreSQL", 
      desc: "IoTrack is an interactive IoT learning platform featuring structured engineering lessons, guided activities, and 3D robotic arm simulations. I independently developed and deployed its full-stack application using React, Supabase, and PostgreSQL, including interactive robot controls for hands-on learning.",
      highlights: ["developed", "deployed"],
      deployed: true,
      liveUrl: "https://iotrack-website.vercel.app",
      deviceType: "tablet",
      deviceImage: "/projects/IOTRACK-THUMBNAIL.png",
      deviceIframeUrl: "https://iotrack-learning-kit.vercel.app",
      bgImage: "/projects/IOTRACK-THUMBNAIL.png"
    },
    { 
      title: "MapuOne", 
      category: "Campus Web App", 
      year: "2026", 
      date: "OCT 2026", 
      role: "Full-Stack Developer", 
      tech: "Next.js, TypeScript, Tailwind CSS, Supabase", 
      desc: "MapuOne is a centralized campus complaint management system for submitting, tracking, and managing institutional concerns. I independently developed and deployed its full-stack application using Next.js, TypeScript, Tailwind CSS, and Supabase, following client-provided requirements and design specifications.",
      highlights: ["developed", "deployed"],
      deployed: true,
      liveUrl: "https://mapuone-app.vercel.app/login",
      deviceType: "tablet",
      deviceImage: "/projects/MAPUONE-THUMBNAIL.png",
      bgImage: "/projects/MAPUONE-THUMBNAIL.png"
    }
  ];

  // Prevent scrolling when popup or demo is open
  useEffect(() => {
    if (selectedProject || activeMediaModal || showAiWorkflow) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [selectedProject, activeMediaModal, showAiWorkflow]);

  return (
    <>
      {/* Desktop Sticky Scroll */}
      <section ref={targetRef} id="work-desktop" className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-32 pb-12">
          <ScrollReveal className="w-full h-full flex flex-col justify-center">
            <div className="px-12 mb-12 flex justify-between items-end shrink-0">
              <div className="flex flex-col items-start gap-4">
                <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--theme-fg)] uppercase">F<span className="inline-block scale-x-150 origin-center mx-[0.12em]">E</span>ATURED PROJECTS</h2>
                <button
                  onClick={() => setShowAiWorkflow(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--theme-fg)]/25 rounded-full font-mono text-xs uppercase tracking-widest text-[var(--theme-fg)] hover:bg-[var(--theme-fg)] hover:text-[var(--theme-bg)] transition-colors cursor-pointer"
                >
                  <span>MY AI WORKFLOW</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
              <span className="text-neutral-500 font-mono">(0{projects.length})</span>
            </div>
            
            <div className="flex-1 flex items-center">
              <motion.div style={{ x }} className="flex gap-4 px-12 w-max">                {projects.map((project, i) => (
                  <div key={i} onClick={() => setSelectedProject({...project, index: i})} className="w-[45vw] lg:w-[35vw] h-[60vh] relative bg-[#0a0a0a] overflow-hidden border border-[#262626] hover:border-[var(--theme-fg)] transition-colors group shrink-0 flex items-center justify-center cursor-crosshair">
                    {/* Background Image if available */}
                    {project.bgImage && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={project.bgImage}
                          alt={`${project.title} background`}
                          fill
                          className={`object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ${
                            project.deviceType === "none"
                              ? "opacity-50 group-hover:opacity-75"
                              : "opacity-25 group-hover:opacity-40"
                          }`}
                        />
                      </div>
                    )}

                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    
                    {/* Center Device Mockups */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none scale-[0.75] lg:scale-90 xl:scale-100 transition-transform duration-500">
                      <ProjectDeviceVisual project={project} />
                    </div>

                    {/* Content overlay — always visible */}
                    <div className="absolute p-6 flex flex-col justify-between h-full w-full z-30 pointer-events-none">
                      <div className="flex justify-between items-start">
                        <span className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-full ${
                          project.deployed
                            ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            : "bg-white/10 text-[#ffffff] border border-[#ffffff] backdrop-blur-md"
                        }`}>
                          {project.tag ?? (project.deployed ? "DEPLOYED" : "DESIGNER ONLY")}
                        </span>
                        <ArrowUpRight size={32} className="text-[#ffffff] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">{project.category}</span>
                        <h3 className="font-display text-3xl md:text-5xl text-[var(--theme-fg)] tracking-tighter uppercase">{project.title}</h3>
                        <p className="text-[#a3a3a3] mt-2 font-mono text-sm uppercase tracking-widest">{project.year}</p>
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
      <ScrollReveal as="section" id="work-mobile" className="block md:hidden pt-32 pb-24 ">
        <div className="px-6 mb-12 flex flex-col items-start gap-4">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--theme-fg)] uppercase">F<span className="inline-block scale-x-150 origin-center mx-[0.12em]">E</span>ATURED PROJECTS</h2>
          <button
            onClick={() => setShowAiWorkflow(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[var(--theme-fg)]/25 rounded-full font-mono text-[11px] uppercase tracking-widest text-[var(--theme-fg)] hover:bg-[var(--theme-fg)] hover:text-[var(--theme-bg)] transition-colors shrink-0 cursor-pointer"
          >
            <span>MY AI WORKFLOW</span>
            <ArrowUpRight size={13} />
          </button>
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
              <span className="block h-[3px] bg-[#ffffff] w-8 rotate-45 translate-y-[4.5px]" />
              <span className="block h-[3px] bg-[#ffffff] w-8 -rotate-45 -translate-y-[4.5px]" />
            </button>

            {/* Scrollable Container */}
            <div className="flex-1 w-full overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" data-lenis-prevent>
              <div className="flex flex-col md:flex-row min-h-full relative">
                
                {/* Project Device Display */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative md:sticky md:top-0 shrink-0 z-0 bg-black flex flex-col items-center justify-center p-8 text-center overflow-hidden border-b md:border-b-0 md:border-r border-[var(--theme-fg)]/10">
                  {/* Background Image if available */}
                  {selectedProject.bgImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {selectedProject.title === "Erehwon Art Center" || selectedProject.title === "StudyCircle" ? (
                        <motion.div
                          className="relative w-full h-[135%] top-0"
                          animate={{ y: ["0%", "-25.925%", "0%"] }}
                          transition={{ duration: 14, times: [0, 0.88, 1], repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Image
                            src={selectedProject.bgImage}
                            alt={`${selectedProject.title} background`}
                            fill
                            className={`object-cover object-top ${selectedProject.deviceType === "none" ? "opacity-75" : "opacity-20"}`}
                          />
                        </motion.div>
                      ) : selectedProject.title === "MapuOne" || selectedProject.title === "IoTrack" ? (
                        <Image
                          src={selectedProject.bgImage}
                          alt={`${selectedProject.title} background`}
                          fill
                          className={`object-cover ${selectedProject.deviceType === "none" ? "opacity-75" : "opacity-20"}`}
                        />
                      ) : (
                        <motion.div
                          className="relative h-full w-[135%] left-0"
                          animate={{ x: ["0%", "-25.925%", "0%"] }}
                          transition={{ duration: 14, times: [0, 0.88, 1], repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Image
                            src={selectedProject.bgImage}
                            alt={`${selectedProject.title} background`}
                            fill
                            className={`object-cover object-left ${selectedProject.deviceType === "none" ? "opacity-75" : "opacity-20"}`}
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
                  
                  <div className="relative z-20 scale-[0.85] sm:scale-100 md:scale-[1.1] lg:scale-[1.3] xl:scale-[1.5] flex items-center justify-center pointer-events-none transition-transform duration-500">
                    <PopupDeviceVisual project={selectedProject} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-12 xl:px-16 py-8 md:py-12 relative z-10 bg-[var(--theme-bg)] md:bg-transparent md:min-h-screen">
                  <motion.div
                    className="my-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-3 mb-6 xl:mb-8 flex-wrap">
                      <span className={`px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full ${
                        selectedProject.deployed
                          ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                          : "bg-white/10 text-white border border-white/20 backdrop-blur-md"
                      }`}>
                        {selectedProject.tag ?? (selectedProject.deployed ? "DEPLOYED" : "DESIGNER ONLY")}
                      </span>
                    </div>
                    
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] tracking-tighter uppercase leading-[0.9] mb-5 xl:mb-8">
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
                        {renderHighlightedDesc(selectedProject.desc, selectedProject.highlights)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-4 w-full mb-12">
                      {selectedProject.mediaButtons && selectedProject.mediaButtons.map((btn: any, btnIdx: number) => (
                        <button
                          key={btnIdx}
                          onClick={() => setActiveMediaModal({ title: btn.modalTitle, url: btn.url })}
                          className="inline-flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white rounded-full font-mono text-sm uppercase tracking-widest transition-all duration-300 group w-fit backdrop-blur-md"
                        >
                          <Play size={16} className="fill-current" />
                          {btn.label}
                        </button>
                      ))}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black border border-white rounded-full font-mono text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 group w-fit"
                        >
                          View Live Site
                          <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                      {selectedProject.figmaUrl && (
                        <a
                          href={selectedProject.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-all duration-300 group w-fit ${
                            selectedProject.deployed
                              ? "border border-neutral-700 text-neutral-300 hover:bg-white hover:text-black hover:border-white"
                              : "bg-white text-black font-bold hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          }`}
                        >
                          {selectedProject.deployed ? "View Figma Design" : "View UI/UX Design"}
                          <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Workflow Modal */}
      <AnimatePresence>
        {showAiWorkflow && (
          <motion.div
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAiWorkflow(false)}
          >
            <motion.div
              className="relative w-full max-w-7xl max-h-[88vh] bg-[var(--theme-bg)] text-[var(--theme-fg)] border border-[var(--theme-fg)]/20 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 md:px-14 pt-6 lg:pt-14 pb-4 lg:pb-2 border-b border-[var(--theme-fg)]/15 lg:border-b-0 shrink-0">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block mb-1">
                    From Figma to Production
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight">
                    How I Build With AI
                  </h3>
                </div>
                <button
                  onClick={() => setShowAiWorkflow(false)}
                  aria-label="Close AI Workflow"
                  className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <span className="block h-[2px] bg-[var(--theme-fg)] w-6 rotate-45 translate-y-[3.5px]" />
                  <span className="block h-[2px] bg-[var(--theme-fg)] w-6 -rotate-45 -translate-y-[3.5px]" />
                </button>
              </div>

              {/* Body */}
              <div className="px-8 pb-8 pt-4 md:px-14 md:pb-12 md:pt-4 overflow-y-auto overscroll-contain space-y-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" data-lenis-prevent>
                {/* Flowchart: Horizontal Process on Desktop, Vertical on Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 border border-[var(--theme-fg)]/20">
                  {[
                    {
                      step: "01",
                      phase: "UNDERSTAND",
                      tool: "AGY / Claude Code",
                      summary: "Understand the problem, users, and existing system.",
                      detail: "Understand the problem, target users, and expected outcome. Use AI to analyze requirements, identify user needs, map user flows, and define the features that need to be built. If working on an existing product, let the coding agent inspect the codebase, understand the architecture, identify reusable components, and determine technical constraints before proceeding."
                    },
                    {
                      step: "02",
                      phase: "DESIGN",
                      tool: "Figma",
                      summary: "Turn ideas into wireframes and polished UI designs.",
                      detail: "Create low-fidelity wireframes to establish the layout, information hierarchy, and user flows using preferred AI design tools. Once the structure is established, develop the UI design by refining the visual direction, colors, typography, spacing, and interface elements into polished high-fidelity screens manually or using AI. Organize reusable components, design tokens, and interactive prototypes before implementation."
                    },
                    {
                      step: "03",
                      phase: "BUILD",
                      tool: "Frontend Agent Skills",
                      summary: "Turn approved designs into working interfaces.",
                      detail: "Connect Figma to your coding agent using Figma MCP so it can access the actual design context, including layouts, components, and variables. Use frontend development skills and existing project conventions to implement the approved designs. Build reusable components, responsive layouts, functional interactions, and animations while preserving existing backend logic and functionality."
                    },
                    {
                      step: "04",
                      phase: "REVIEW",
                      tool: "DevTools",
                      summary: "Check the implementation against the original design.",
                      detail: "Run the application locally and inspect the actual implementation in the browser. Compare the interface against the original Figma design, check different screen sizes, and test user flows. Identify visual inconsistencies, broken interactions, confusing layouts, and anything that does not behave as intended. Document the issues that need improvement."
                    },
                    {
                      step: "05",
                      phase: "ITERATE & TEST",
                      tool: "Playwright",
                      summary: "Fix issues, refine the UI, and test functionality.",
                      detail: "Feed the identified issues back to your coding agent and refine the implementation. Fine-tune spacing, typography, visual hierarchy, component behavior, and interactions. Test responsiveness, keyboard accessibility, functionality, performance, and existing features. Repeat the Build → Review → Iterate & Test cycle until the implementation meets the design and quality requirements. Once everything passes, proceed to shipping."
                    },
                    {
                      step: "06",
                      phase: "SHIP",
                      tool: "GitHub",
                      summary: "Prepare the final build and deploy the product.",
                      detail: "Finalize the implementation, review code changes, resolve outstanding issues, and verify that required tests pass. Commit and push the approved changes, integrate them with the existing application, and deploy through your CI/CD pipeline. And its important to perform a final production check to ensure the interface and functionality work as expected."
                    }
                  ].map((node, idx, arr) => {
                    const isActive = activeWorkflowNode === node.step;
                    const isInfoOpen = activeInfoStep === node.step;
                    return (
                    <div
                      key={node.step}
                      className={`relative p-5 md:p-6 flex flex-col justify-between transition-colors duration-300 ${
                        isInfoOpen ? "z-50" : "z-0"
                      } ${
                        isActive
                          ? "bg-[var(--theme-fg)] text-[var(--theme-bg)]"
                          : "bg-[var(--theme-bg)] text-[var(--theme-fg)]"
                      } ${
                        idx < arr.length - 1 ? "border-b lg:border-b-0 lg:border-r border-[var(--theme-fg)]/20" : ""
                      }`}
                    >
                      <div>
                        <div className="flex flex-col gap-1 mb-4">
                          <span className={`font-display text-3xl md:text-4xl tracking-tighter leading-none transition-opacity duration-300 ${isActive ? "opacity-90" : "opacity-30"}`}>
                            {node.step}
                          </span>
                          <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-[var(--theme-bg)]/70" : "text-neutral-500"}`}>
                            {node.tool}
                          </span>
                        </div>
                        <h4 className="font-display text-xl uppercase tracking-tight mb-2">
                          {node.phase}
                        </h4>
                        <p className="font-sans text-xs md:text-sm opacity-75 leading-relaxed">
                          {node.summary}
                        </p>
                      </div>
                      <div className="flex justify-end mt-5 pt-2">
                        <div
                          className="relative"
                          onMouseEnter={() => setActiveInfoStep(node.step)}
                          onMouseLeave={() => setActiveInfoStep(null)}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveInfoStep(isInfoOpen ? null : node.step);
                            }}
                            aria-label={`Info for ${node.phase}`}
                            className={`p-1 transition-opacity cursor-pointer ${
                              isActive ? "text-[var(--theme-bg)]/70 hover:text-[var(--theme-bg)]" : "text-neutral-500 hover:text-[var(--theme-fg)]"
                            }`}
                          >
                            <Info size={14} />
                          </button>
                          {isInfoOpen && (
                            <div className={`absolute right-0 ${idx === 0 ? "lg:left-0 lg:right-auto" : ""} top-7 z-[60] w-64 p-3.5 bg-[var(--theme-bg)] text-[var(--theme-fg)] border border-[var(--theme-fg)]/30 shadow-xl font-sans text-xs leading-relaxed`}>
                              {node.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                  })}
                </div>

                {/* Feedback Loop Connector under 03–05 */}
                <div className="hidden lg:grid grid-cols-6 -mt-10">
                  <div className="col-span-2" />
                  <div className={`col-span-3 border-x border-b h-8 relative flex items-center justify-center transition-colors duration-300 ${
                    activeWorkflowNode === "iterate" ? "border-[var(--theme-fg)]" : "border-[var(--theme-fg)]/20"
                  }`}>
                    <span className={`px-4 font-display text-xl uppercase tracking-tight translate-y-4 transition-colors duration-300 ${
                      activeWorkflowNode === "iterate"
                        ? "bg-[var(--theme-fg)] text-[var(--theme-bg)]"
                        : "bg-[var(--theme-bg)] text-[var(--theme-fg)]"
                    }`}>
                      ↺ Iterate
                    </span>
                  </div>
                  <div className="col-span-1" />
                </div>

                {/* Clickable Frontend Agent Skills */}
                <div>
                  <div className="mb-4">
                    <h4 className="font-display text-xl md:text-2xl uppercase tracking-tight">
                      Frontend Agent Skills
                    </h4>
                  </div>
                  <div className="flex flex-col">
                    {[
                      {
                        name: "Frontend Design",
                        author: "Anthropic",
                        role: "Aesthetic thesis, typography & layout identity",
                        url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
                        Icon: Layout
                      },
                      {
                        name: "UI/UX Pro Max",
                        author: "NextLevelBuilder",
                        role: "Design system engine, color palettes & UX guidelines",
                        url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
                        Icon: Layers
                      },
                      {
                        name: "Web Design Guidelines",
                        author: "Vercel Labs",
                        role: "100+ rules for accessibility, forms & UI polish",
                        url: "https://github.com/vercel-labs/agent-skills",
                        Icon: Eye
                      },
                      {
                        name: "Impeccable",
                        author: "Paul Bakaus",
                        role: "Spacing, hierarchy & anti-pattern audit",
                        url: "https://github.com/pbakaus/impeccable",
                        Icon: SlidersHorizontal
                      },
                      {
                        name: "React Best Practices",
                        author: "Vercel Labs",
                        role: "Performance, rendering & component architecture",
                        url: "https://github.com/vercel-labs/agent-skills",
                        Icon: Zap
                      }
                    ].map(({ Icon, ...skill }) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 py-4 transition-all duration-300 cursor-crosshair hover:bg-[var(--theme-fg)] hover:text-[var(--theme-bg)] hover:px-6"
                      >
                        <div className="flex items-center gap-4">
                          <Icon size={18} className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="font-display text-lg uppercase tracking-tight">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--theme-fg)]/40 group-hover:text-[var(--theme-bg)]/50 transition-colors">
                              {skill.author}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden md:inline font-sans text-xs text-[var(--theme-fg)]/60 group-hover:text-[var(--theme-bg)]/70 transition-colors">
                            {skill.role}
                          </span>
                          <ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Media / Demo Modal */}
      <AnimatePresence>
        {activeMediaModal && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMediaModal(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl h-[75vh] md:h-[80vh] bg-[#0c0c0c] border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">{activeMediaModal.title}</span>
                </div>
                <button
                  onClick={() => setActiveMediaModal(null)}
                  className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Embedded Frame */}
              <div className="flex-1 w-full h-full bg-black relative">
                <iframe
                  src={activeMediaModal.url}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Semantic SSR-readable project details for AI reviewers & crawlers */}
      <section className="sr-only" aria-label="Featured Projects Full Details">
        <h2>Featured Projects — Complete Details</h2>
        {projects.map((p, idx) => (
          <article key={idx}>
            <h3>{p.title}</h3>
            <p>Status: {p.tag ?? (p.deployed ? "Deployed" : "Designer Only")} | Category: {p.category} | Date: {p.date}</p>
            <p>Role: {p.role} | Tech Stack: {p.tech}</p>
            <p>{p.desc}</p>
            {p.liveUrl && <a href={p.liveUrl}>Live Site: {p.liveUrl}</a>}
            {p.figmaUrl && <a href={p.figmaUrl}>UI/UX Design: {p.figmaUrl}</a>}
          </article>
        ))}
      </section>
    </>
  );
}

function ProjectDeviceVisual({ project }: { project: any }) {
  if (project.deviceType === "none") {
    return null;
  }

  if (project.deviceType === "thumbnail" && project.thumbnailImage) {
    return (
      <div className="w-[300px] h-[190px] md:w-[380px] md:h-[240px] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative bg-neutral-900 group-hover:scale-105 transition-all duration-700">
        <Image
          src={project.thumbnailImage}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
      </div>
    );
  }

  if (project.deviceType === "mobile") {
    return (
      <div className="w-[144px] h-[284px] md:w-[164px] md:h-[324px] p-[2px] rounded-[26px] md:rounded-[34px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative group-hover:scale-105 transition-all duration-700">
        <div className="w-full h-full rounded-[24px] md:rounded-[32px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
          <div className="w-full h-full rounded-[20px] md:rounded-[26px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
            {project.deviceImage ? (
              <Image
                src={project.deviceImage}
                alt={project.title}
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 z-40 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  // Tablet default
  return (
    <div className="w-[244px] h-[164px] md:w-[364px] md:h-[244px] p-[2px] rounded-[18px] md:rounded-[26px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative group-hover:scale-105 transition-all duration-700">
      <div className="w-full h-full rounded-[16px] md:rounded-[24px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
        <div className="w-full h-full rounded-[10px] md:rounded-[16px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
          {project.deviceImage ? (
            <Image
              src={project.deviceImage}
              alt={project.title}
              fill
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.12] via-white/0 to-white/0 z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function MobileDeviceVisual({ project, isInView }: { project: any, isInView: boolean }) {
  if (project.deviceType === "thumbnail" && project.thumbnailImage) {
    return (
      <div className={`w-[260px] h-[160px] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative bg-neutral-900 transition-all duration-700 ${isInView ? "scale-105" : "scale-100"}`}>
        <Image
          src={project.thumbnailImage}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${isInView ? "grayscale-0" : "grayscale"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
      </div>
    );
  }

  if (project.deviceType === "mobile") {
    return (
      <div className={`w-[144px] h-[380px] shrink-0 p-[2px] rounded-[26px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transition-all duration-700 ${isInView ? "scale-105" : "scale-100"}`}>
        <div className="w-full h-full rounded-[24px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
          <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
            <CyclingDeviceImage
              images={project.deviceImages}
              fallback={project.deviceImage}
              alt={project.title}
              className={`object-cover object-top transition-all duration-700 ${isInView ? "grayscale-0" : "grayscale"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 z-40 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-[440px] h-[164px] shrink-0 p-[2px] rounded-[18px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transition-all duration-700 ${isInView ? "scale-105" : "scale-100"}`}>
      <div className="w-full h-full rounded-[16px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
        <div className="w-full h-full rounded-[10px] md:rounded-[16px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
          {project.deviceIframeUrl ? (
            <div className="w-full h-full overflow-hidden relative bg-white">
              <iframe
                src={project.deviceIframeUrl}
                title={project.title}
                className="w-[1280px] h-[720px] border-0 origin-top-left scale-[0.34] pointer-events-none"
              />
            </div>
          ) : project.deviceImage ? (
            <Image
              src={project.deviceImage}
              alt={project.title}
              fill
              className={`object-cover object-top transition-all duration-700 ${isInView ? "grayscale-0" : "grayscale"}`}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.12] via-white/0 to-white/0 z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function CyclingDeviceImage({
  images,
  fallback,
  alt,
  className,
}: {
  images?: string[];
  fallback?: string;
  alt: string;
  className: string;
}) {
  const list = images && images.length > 0 ? images : fallback ? [fallback] : [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % list.length);
    }, 1750);
    return () => clearInterval(timer);
  }, [list.length]);

  if (list.length === 0) {
    return <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />;
  }

  return (
    <Image
      src={list[idx]}
      alt={alt}
      fill
      className={className}
    />
  );
}

function PopupDeviceVisual({ project }: { project: any }) {
  if (project.deviceType === "none") {
    return null;
  }

  if (project.deviceType === "thumbnail" && project.thumbnailImage) {
    return (
      <div className="w-[320px] h-[200px] sm:w-[460px] sm:h-[290px] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative bg-neutral-900">
        <Image
          src={project.thumbnailImage}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
      </div>
    );
  }

  if (project.deviceType === "mobile") {
    return (
      <div className={`w-[190px] ${project.title === "KOMYUTPH" || project.title === "KokoMyut" ? "h-[404px]" : "h-[380px]"} shrink-0 p-[2px] rounded-[26px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative`}>
        <div className="w-full h-full rounded-[24px] p-[4px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
          <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
            <CyclingDeviceImage
              images={project.deviceImages}
              fallback={project.deviceImage}
              alt={project.title}
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 z-40 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[330px] h-[190px] md:w-[480px] md:h-[280px] p-[2px] rounded-[18px] md:rounded-[26px] bg-gradient-to-br from-neutral-400 via-neutral-600 to-neutral-300 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative">
      <div className="w-full h-full rounded-[16px] md:rounded-[24px] p-[4px] md:p-[6px] bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)] relative">
        <div className="w-full h-full rounded-[10px] md:rounded-[16px] overflow-hidden relative bg-neutral-950 shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
          {project.deviceIframeUrl ? (
            <div className="w-full h-full overflow-hidden relative bg-white">
              <iframe
                src={project.deviceIframeUrl}
                title={project.title}
                className="w-[1280px] h-[760px] border-0 origin-top-left scale-[0.26] md:scale-[0.375]"
              />
            </div>
          ) : (
            <CyclingDeviceImage
              images={project.deviceImages}
              fallback={project.deviceImage}
              alt={project.title}
              className="object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.12] via-white/0 to-white/0 z-40 pointer-events-none" />
        </div>
      </div>
    </div>
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
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(role.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 24 : 58);
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
      prize: "Medal", 
      role: "Lead UI/UX Designer & Full-Stack Developer", 
      desc: "Awarded Best in UI and UX and 1st Runner Up in the Hackathon Category at Infotechnolympics 2026. Recognized for exceptional human-centered interaction design, user accessibility, and rapid functional prototyping under intense hackathon time constraints.", 
      media: [
        { type: 'image', url: "/awards/BESTINUIUX.webp" },
        { type: 'image', url: "/awards/BESTINUIUX2.webp" }
      ]
    },
    { 
      award: "Top 10 Finalists", 
      competition: "eGovPH Hackathon 2026", 
      year: "2026", 
      project: "eHANDA", 
      prize: "National Finalist Recognition + ₱100,000 Cash Prize", 
      role: "UI/UX Designer & Media Director", 
      desc: "Selected as one of the Top 10 Finalists nationwide in the prestigious eGovPH Hackathon 2026 for eHANDA, winning ₱100,000 in cash for a rapid post-disaster household assessment platform integrating into the national eGovPH app ecosystem.", 
      media: [
        { type: 'image', url: "/awards/TOP10FINALISTS.webp" },
        { type: 'image', url: "/awards/TOP10FINALISTS2.webp" }
      ]
    },
    { 
      award: "Most Commercially Viable", 
      competition: "UMak 7th Hackathon 2025", 
      year: "2025", 
      project: "Campus Innovation Track", 
      prize: "Special Citation + Cash Prize", 
      role: "UI/UX Designer & Product Lead", 
      desc: "Honored with the Most Commercially Viable Award at the 7th University of Makati Hackathon 2025. Recognized for outstanding business sustainability, market readiness, and an intuitive product experience.", 
      media: [
        { type: 'image', url: "/awards/MOSTCOMMERCIALLYVIABLE.webp" },
        { type: 'image', url: "/awards/MOSTCOMMERCIALLYVIABLE2.webp" }
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
        { type: 'image', url: "/awards/1STRUNNERUP-CSHARP.webp" },
        { type: 'image', url: "/awards/1STRUNNERUP-CSHARP2.webp" }
      ]
    }
  ];

  return (
    <>
      <ScrollReveal as="section" id="awards" className="py-40 md:py-48 px-6 md:px-12">
        <div className="w-full">
          <div className="flex justify-between items-end mb-12 border-b border-[var(--theme-fg)]/20 pb-6">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase">AWAR<span className="inline-block scale-x-150 origin-center mx-[0.12em]">D</span>S</h2>
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

      {/* Semantic SSR-readable award details for AI reviewers & crawlers */}
      <section className="sr-only" aria-label="Awards Full Details">
        <h2>Awards — Complete Details</h2>
        {awards.map((a, idx) => (
          <article key={idx}>
            <h3>{a.award} — {a.competition} ({a.year})</h3>
            <p>Project: {a.project} | Prize: {a.prize} | Role: {a.role}</p>
            <p>{a.desc}</p>
          </article>
        ))}
      </section>
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
    { num: "10+", label: "Projects", href: "#work" },
    { num: "4", label: "Awards", href: "#awards" },
    { num: "100+", label: "Gallery", href: "/gallery" },
    { num: "4+", label: "Years Exp.", href: "#experience" }
  ];

  const half = Math.ceil(heroCards.length / 2);
  const leftCards = heroCards.slice(0, half);
  const rightCards = heroCards.slice(half);

  const heroAwardBadges = [
    { label: "Top 10 out of 270 Teams", pos: "-top-4 -right-6 rotate-6" },
    { label: "Best in UI/UX Design", pos: "-top-4 -left-8 -rotate-6" },
    { label: "Most Commercially Viable", pos: "-bottom-4 left-1/2 -translate-x-1/2 -rotate-2" },
  ];
  const [heroAwardIdx, setHeroAwardIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroAwardIdx((prev) => (prev + 1) % heroAwardBadges.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
              JO<span className="inline-block scale-x-150 origin-center mx-[0.12em]">H</span>N
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
                    {card.label === "Awards" && (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroAwardBadges[heroAwardIdx].label}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`pointer-events-none absolute z-30 px-2.5 py-1 bg-[var(--theme-fg)] text-[var(--theme-bg)] font-mono text-[10px] uppercase tracking-wider whitespace-nowrap shadow-xl ${heroAwardBadges[heroAwardIdx].pos}`}
                        >
                          {heroAwardBadges[heroAwardIdx].label}
                        </motion.span>
                      </AnimatePresence>
                    )}
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
                  src={theme === "light" ? "/lmode.webp" : "/dmode.webp"}
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
                    {card.label === "Awards" && (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroAwardBadges[heroAwardIdx].label}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`pointer-events-none absolute z-30 px-2.5 py-1 bg-[var(--theme-fg)] text-[var(--theme-bg)] font-mono text-[10px] uppercase tracking-wider whitespace-nowrap shadow-xl ${heroAwardBadges[heroAwardIdx].pos}`}
                        >
                          {heroAwardBadges[heroAwardIdx].label}
                        </motion.span>
                      </AnimatePresence>
                    )}
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
        className="relative z-10 py-36 md:py-52 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
      >
        <AcidDissolveBg />
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
            I&apos;m John{" "}
            <a
              href="https://jervys.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--theme-fg)] text-[var(--theme-bg)] hover:bg-yellow-400 hover:text-[#000000] px-2.5 py-0.5 rounded-none font-[family-name:var(--font-inter)] font-sans uppercase font-bold -rotate-2 transition-colors"
            >
              Jervys
            </a>{" "}
            — an aspiring multimedia artist and software <span className="whitespace-nowrap"><span className="inline-block scale-x-150 origin-center mx-[0.12em]">e</span>ngineer</span> exploring different ways to bring ideas to life through <span className="whitespace-nowrap">m<span className="inline-block scale-x-150 origin-center mx-[0.12em]">e</span>dia</span> production and software development. I&apos;ve always enjoyed <span className="whitespace-nowrap">cr<span className="inline-block scale-x-150 origin-center mx-[0.12em]">e</span>ating</span>, whether it&apos;s through visuals, <span className="whitespace-nowrap">storyt<span className="inline-block scale-x-150 origin-center mx-[0.12em]">e</span>lling</span>, design, or <span className="whitespace-nowrap">t<span className="inline-block scale-x-150 origin-center mx-[0.12em]">e</span>chnology</span>.
          </h3>

          {/* Centered CTA Link Button */}
          <div className="flex justify-center items-center">
            <Link 
              href="/about" 
              data-mascot-target="about-btn" 
              className="group inline-flex items-center gap-3 border border-neutral-300 dark:border-neutral-700 rounded-full px-6 py-3.5 md:px-8 md:py-4 hover:bg-[var(--theme-fg)] hover:text-[var(--theme-bg)] hover:border-[var(--theme-fg)] transition-all duration-300 font-display text-sm md:text-base uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-[var(--theme-bg)]"
            >
              <span>VIEW FULL RESUME</span>
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
      <ScrollReveal as="section" id="experience" className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center">
        <AcidDissolveBg />
        <div className="ambient-dissolve-glow" aria-hidden="true" />
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">EXPERIENC<span className="inline-block scale-x-150 origin-center mx-[0.12em]">E</span></h2>
          <div className="space-y-24">
            {/* Software Engineering */}
            <div>
              <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-10 border-b border-[var(--theme-fg)]/15 pb-4">
                Software Engineering
              </h3>
              <div className="space-y-24 pl-8 ml-2 md:ml-4 relative">
                {[
                  {
                    role: "Research and Development Committee Member",
                    company: "University of Makati - Society of Innovative Computing",
                    date: "Oct 2026 - Present",
                    desc: "Contributing to technological research initiatives, software prototyping, and technical development projects."
                  },
                  {
                    role: "Freelance Software Developer & UI/UX Designer",
                    company: "Independent Practice",
                    date: "Nov 2024 - Present",
                    desc: "Architecting and developing client web and mobile applications. Delivering full-stack solutions with Next.js, React Native, Supabase, and Tailwind CSS."
                  }
                ].map((exp, i, arr) => (
                  <ExperienceItem key={i} exp={exp} i={i} isLast={i === arr.length - 1} />
                ))}
              </div>
            </div>

            {/* Multimedia */}
            <div>
              <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-10 border-b border-[var(--theme-fg)]/15 pb-4">
                Multimedia
              </h3>
              <div className="space-y-24 pl-8 ml-2 md:ml-4 relative">
                {[
                  {
                    role: "Publicity and Ads Head",
                    company: "University of Makati - Society of Innovative Computing",
                    date: "Oct 2026 - Present",
                    desc: "Spearheading creative direction, scriptwriting, video editing, pre-production, production, and post-production for organization events."
                  },
                  {
                    role: "Founder",
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
                    desc: "Supervised the video editing department, creating promotional reels, event coverage, and multimedia design assets for organization events."
                  }
                ].map((exp, i, arr) => (
                  <ExperienceItem key={i} exp={exp} i={i} isLast={i === arr.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Tech Stack */}
      <ScrollReveal as="section" id="tech-stack" className="py-32 md:py-48 overflow-hidden relative flex flex-col gap-12">
        <div className="w-full">
          <div className="px-6 md:px-12 flex justify-center" data-mascot-target="arsenal-header">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white mb-8 text-center">TH<span className="inline-block scale-x-150 origin-center mx-[0.12em]">E</span> ARSENAL</h2>
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
      <ScrollReveal as="section" id="certifications" className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center">
        <AcidDissolveBg />
        <div className="w-full relative z-10">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16 uppercase">CRED<span className="inline-block scale-x-150 origin-center mx-[0.12em]">E</span>NTIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
            {[
              { name: "IT-Specialist — Databases", issuer: "Pearson", date: "Oct 2026", id: "r6wo-uSrC", link: "https://www.certiport.com/portal/Pages/CredentialVerification.aspx" },
              { name: "Data Streaming Engineer", issuer: "Confluent", date: "Jul 2026", id: "194864572", link: "https://certificates.confluent.io/d5141679-eb48-476c-9c34-7238a52022f4#acc.wt2KV9ae" },
              { name: "Global MOOC on Ethics of AI", issuer: "LG AI Research", date: "May 2025", id: "3QLGFJ176B1C", link: "https://www.coursera.org/account/accomplishments/verify/3QLGFJ176B1C" }
            ].map((cert, i) => (
              <a href={cert.link} key={i} target="_blank" rel="noopener noreferrer" className="relative p-6 md:p-8 border border-[var(--theme-fg)]/15 bg-neutral-950 hover:bg-neutral-900 hover:border-[var(--theme-fg)]/40 transition-all group flex flex-col justify-between aspect-[7/5]">
                {/* Link Icon */}
                <div className="absolute top-8 right-8 text-neutral-700 group-hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </div>
                <div className="pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">{cert.issuer}</span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-3xl mt-2 leading-snug group-hover:text-white text-[var(--theme-fg)] tracking-tight uppercase break-words pr-8">{cert.name}</h3>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-4 flex items-center justify-between gap-2">
                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{cert.date}</p>
                  <p className="font-mono text-xs text-neutral-500 tracking-wider">ID: {cert.id}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Awards */}
      <AwardsSection />



      {/* Footer / Contact */}
      <ScrollReveal as="footer" id="contact" className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden flex flex-col justify-between">
        <AcidDissolveBg topOnly />
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
      {/* Background Image if available */}
      {project.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={project.bgImage}
            alt={`${project.title} background`}
            fill
            className={`object-cover transition-all duration-700 ${
              project.deviceType === "none"
                ? "opacity-50 group-hover/card:opacity-75"
                : "opacity-25 group-hover/card:opacity-40"
            } ${isInView ? "grayscale-0 scale-105" : "grayscale scale-100"}`}
          />
        </div>
      )}

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Center Device Mockups */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none scale-[0.8] sm:scale-95 transition-transform duration-500">
        <ProjectDeviceVisual project={project} />
      </div>

      <div className="flex justify-between items-start relative z-30 p-6 pointer-events-none">
        <span className={`px-3 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-full ${
          project.deployed
            ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-white/10 text-[#ffffff] border border-[#ffffff] backdrop-blur-md"
        }`}>
          {project.tag ?? (project.deployed ? "DEPLOYED" : "DESIGNER ONLY")}
        </span>
        <ArrowUpRight size={28} className="text-[#ffffff]" />
      </div>
      <div className="relative z-30 p-6 pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">{project.category}</span>
        <h3 className="font-display text-2xl text-[var(--theme-fg)] tracking-tighter uppercase">{project.title}</h3>
        <p className="text-[#a3a3a3] mt-1 font-mono text-xs uppercase tracking-widest">{project.year}</p>
      </div>
    </div>
  );
}


