"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Film, Eye, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

interface GalleryItem {
  id: string;
  title: string;
  category: "Motion & Video" | "3D & CGI" | "Creative Code" | "Visual Identity";
  type: "video" | "image";
  mediaUrl: string;
  posterUrl?: string;
  year: string;
  aspect: string;
  tools: string[];
  client: string;
  resolution: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "erovoutika-robotics",
    title: "4th Robolution Film Coverage",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    year: "2026",
    aspect: "aspect-video",
    tools: ["Sony Cinema Line", "Premiere Pro", "After Effects"],
    client: "Erovoutika Philippines",
    resolution: "3840 x 2160 (4K 60fps)",
    description: "Cinematic broadcast coverage, dynamic event highlight reels, and kinetic motion graphics for the 4th Robolution and Minoan Robotsports Competition Philippines."
  },
  {
    id: "estudyantedits-brand",
    title: "EstudyantEdits Visual Identity",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
    year: "2024",
    aspect: "aspect-[4/5]",
    tools: ["Illustrator", "Photoshop", "After Effects"],
    client: "EstudyantEdits",
    resolution: "4000 x 5000",
    description: "Comprehensive brand identity system, editorial layouts, and kinetic social templates designed for EstudyantEdits creative collective."
  },
  {
    id: "dostv-broadcast",
    title: "DOSTv Broadcast Cinematography",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    posterUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80",
    year: "2023",
    aspect: "aspect-video",
    tools: ["Broadcast Cameras", "B-Roll", "Premiere Pro"],
    client: "DOSTv — Department of Science & Technology",
    resolution: "1920 x 1080 (HD Broadcast)",
    description: "On-site news videography, B-roll cinematography, and post-production video editing for national science and tech broadcast features."
  },
  {
    id: "komyutph-transit-ui",
    title: "KOMYUTPH Transit Cartography",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80",
    year: "2026",
    aspect: "aspect-square",
    tools: ["Figma", "Leaflet GIS", "Tailwind CSS"],
    client: "KOMYUTPH Initiative",
    resolution: "Vector & Digital Map Assets",
    description: "Informal transit route mapping symbology, fare matrix charts, and high-legibility mobile iconography tailored for Philippine public transport."
  },
  {
    id: "mits-kinetic-package",
    title: "MITS Media & Motion Package",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    year: "2023",
    aspect: "aspect-square",
    tools: ["After Effects", "Premiere Pro", "Audition"],
    client: "Multimedia & IT Society (MITS)",
    resolution: "1080 x 1080 (Kinetic Loop)",
    description: "High-energy promotional trailers, motion graphics bumpers, and kinetic typography for campus technology summits and workshops."
  },
  {
    id: "ehanda-govtech-ui",
    title: "eHANDA Disaster Relief System",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=1600&q=80",
    year: "2026",
    aspect: "aspect-[4/5]",
    tools: ["Figma", "Design Tokens", "Next.js"],
    client: "eGovPH Hackathon 2026 Finalist",
    resolution: "Complete Mobile & Web System",
    description: "Accessible, high-contrast disaster response dashboard UI designed for rapid household needs assessment and emergency aid dispatch."
  },
  {
    id: "iotrack-simulation",
    title: "IoTrack 3D Arm Telemetry",
    category: "Creative Code",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1600&q=80",
    year: "2026",
    aspect: "aspect-video",
    tools: ["Three.js", "React", "Supabase"],
    client: "IoTrack Learning Kit",
    resolution: "Real-time WebGL Telemetry",
    description: "Browser-based 3D simulation of a robotic arm paired with live hardware telemetry feeds, forward/inverse kinematics, and telemetry logs."
  },
  {
    id: "studycircle-design",
    title: "StudyCircle Collaborative UI",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
    year: "2026",
    aspect: "aspect-square",
    tools: ["Figma", "Tailwind CSS", "Component Library"],
    client: "StudyCircle Platform",
    resolution: "Component Design System",
    description: "Complete UI design system and collaborative interface components engineered for collegiate virtual study lounges and markdown notes."
  },
  {
    id: "erehwon-art-mis",
    title: "Erehwon Art Center MIS Archival",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80",
    year: "2026",
    aspect: "aspect-[4/5]",
    tools: ["PostgreSQL", "React", "Typography"],
    client: "Erehwon Center for the Arts",
    resolution: "Digital Archive System",
    description: "Digital cataloging interface and visual database architecture preserving fine art collections, historic murals, and artist registries."
  }
];

export default function GalleryPage() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Stop Lenis/body scroll when menu is active
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
    <main className="min-h-screen text-white selection:bg-white selection:text-black pt-28 md:pt-36 relative overflow-x-hidden">
      
      {/* Navigation — EXACT Home Top Bar Layout */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link 
          href="/" 
          className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]"
        >
          JOHN.GALLERY
        </Link>
        <button 
          className="relative z-[60] w-12 h-12 flex flex-col items-end justify-center gap-[6px] group" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 -rotate-45 translate-y-[9px]" : "w-10 group-hover:w-6"}`} />
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-0 opacity-0" : "w-6 group-hover:w-10"}`} />
          <span className={`block h-[3px] bg-[#ffffff] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? "w-8 rotate-45 -translate-y-[9px]" : "w-8 group-hover:w-4"}`} />
        </button>
      </nav>

      {/* Fullscreen Overlay Menu — EXACT Home Layout, Dark Mode & Resume */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex flex-col justify-start pt-20 md:pt-28 pb-16 px-8 overflow-y-auto overflow-x-hidden text-white"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav links */}
            <div className="flex flex-col md:flex-row justify-between w-full h-full">
              <nav className="flex flex-col gap-1 md:gap-0 mt-0">
                {[
                  { label: "Home", href: "/#" },
                  { label: "About", href: "/#about" },
                  { label: "Projects", href: "/#work" },
                  { label: "Experience", href: "/#experience" },
                  { label: "Credentials", href: "/#certifications" },
                  { label: "Awards", href: "/#awards" },
                  { label: "Contact", href: "/#contact" },
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
                  <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">Software Projects</h3>
                  <Link href="/#work" onClick={() => setMenuOpen(false)} className="group flex items-center gap-4 text-2xl md:text-3xl font-display uppercase tracking-wider text-white hover:text-neutral-400 transition-colors pr-4">
                    View Projects <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto w-full mb-16 md:mb-20 px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter uppercase leading-[0.82] select-none text-white">
            GALLERY
          </h1>

          <div className="border-t border-neutral-800 pt-8 mt-2">
            <p className="max-w-4xl font-sans text-xl sm:text-2xl md:text-3xl font-normal leading-tight opacity-80 uppercase tracking-tight text-white">
              A collection of work across video editing, photography, videography, graphic design, creative production, and UI/UX. From capturing moments and crafting visual stories to designing digital experiences, this is where my creative side takes the spotlight.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Gallery Media Grid */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/70 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:border-white"
              >
                {/* Visual Media Container */}
                <div className={`w-full ${item.aspect} relative overflow-hidden bg-black flex items-center justify-center`}>
                  {item.type === "video" ? (
                    <video
                      src={item.mediaUrl}
                      poster={item.posterUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Dark subtle overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center z-20 pointer-events-none">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest rounded-full border border-white/20 flex items-center gap-1.5">
                      {item.type === "video" ? <Film size={12} /> : <Eye size={12} />}
                      {item.type === "video" ? "MOTION" : "STILL"}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Information */}
                <div className="p-5 flex flex-col justify-between gap-3 bg-neutral-950/90 backdrop-blur-sm border-t border-neutral-800">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display text-2xl uppercase tracking-tighter text-white group-hover:text-neutral-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500">{item.year}</span>
                  </div>

                  <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer / Contact — EXACT Home Page Footer Layout & Sizing */}
      <footer id="contact" className="mt-32 pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 bg-dissolve-mask-top relative overflow-hidden flex flex-col justify-between">
        <div className="ambient-dissolve-glow" aria-hidden="true" />
        <div className="w-full flex flex-col gap-24 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-between" data-mascot-target="footer-talk">
              <h2 className="font-display text-6xl md:text-[8vw] leading-[0.85] tracking-tighter uppercase break-words text-white">
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
                  { name: "LinkedIn", handle: "/in/john-jervys-cabalo", href: "https://linkedin.com/in/john-jervys-cabalo" },
                  { name: "GitHub", handle: "/jjcabalo", href: "https://github.com/jjcabalo" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex justify-between items-end border-b border-neutral-800 pb-4 group">
                    <span className="font-display text-2xl uppercase tracking-wider group-hover:text-neutral-400 transition-colors text-white">{social.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
