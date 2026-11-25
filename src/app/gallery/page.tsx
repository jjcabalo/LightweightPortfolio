"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowRight, 
  Film, 
  Eye, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  RotateCcw
} from "lucide-react";
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
  orientation: "landscape" | "portrait" | "square";
  tools: string[];
  client: string;
  resolution: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "mock-cut-01",
    title: "[MOCK] Narrative Film Reel 01",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "",
    year: "2026",
    orientation: "landscape",
    tools: ["DaVinci Resolve", "Cinema Camera"],
    client: "Sample Production House",
    resolution: "4K DCI (24fps)",
    description: "Sample mock entry: High-contrast cinematic narrative sequence showcasing pacing, multi-cam grading, and atmospheric sound design."
  },
  {
    id: "mock-reel-02",
    title: "[MOCK] Vertical Social Edit 02",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "",
    year: "2025",
    orientation: "portrait",
    tools: ["Premiere Pro", "After Effects"],
    client: "Sample Creative Collective",
    resolution: "1080 x 1920 (9:16)",
    description: "Sample mock entry: Fast-paced short-form motion rhythm featuring kinetic typography, match-cuts, and bass-synced motion graphics."
  },
  {
    id: "mock-still-03",
    title: "[MOCK] Color Grading Still 03",
    category: "Creative Code",
    type: "image",
    mediaUrl: "",
    year: "2025",
    orientation: "square",
    tools: ["Photoshop", "Lightroom"],
    client: "Studio Showcase",
    resolution: "4000 x 4000",
    description: "Sample mock entry: Editorial still capture highlighting natural low-light film emulation and volumetric exposure curves."
  },
  {
    id: "mock-cut-04",
    title: "[MOCK] Broadcast Documentary 04",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "",
    year: "2025",
    orientation: "landscape",
    tools: ["Sony Cinema Line", "Audition"],
    client: "Broadcast Media Lab",
    resolution: "1080p Broadcast",
    description: "Sample mock entry: Observational field documentary cut highlighting natural soundscapes, ambient B-roll, and narrative interviews."
  },
  {
    id: "mock-reel-05",
    title: "[MOCK] Dynamic Fashion Reel 05",
    category: "Motion & Video",
    type: "video",
    mediaUrl: "",
    year: "2024",
    orientation: "portrait",
    tools: ["After Effects", "Speed Ramping"],
    client: "Apparel Brand Concept",
    resolution: "1080 x 1920 (9:16)",
    description: "Sample mock entry: Rhythmic vertical showcase with dynamic speed-ramping, graphic overlays, and editorial transitions."
  },
  {
    id: "mock-still-06",
    title: "[MOCK] Archival Portrait Series 06",
    category: "Visual Identity",
    type: "image",
    mediaUrl: "",
    year: "2024",
    orientation: "square",
    tools: ["35mm Emulation", "Lightroom"],
    client: "Independent Archive",
    resolution: "2048 x 2048",
    description: "Sample mock entry: Monochrome archival portraiture study focusing on contrast ratios and organic grain texture."
  }
];

function MinimalistVideoPlayer({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetHideTimer();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    resetHideTimer();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, pos));
    videoRef.current.currentTime = clamped * (videoRef.current.duration || 0);
    resetHideTimer();
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isPortrait = item.orientation === "portrait";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Top Header */}
      <div 
        className="fixed top-6 left-6 right-6 z-[130] flex justify-between items-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-neutral-400">
            {item.year} / {item.client}
          </span>
          <h2 className="font-display text-lg md:text-2xl text-white uppercase tracking-tight">
            {item.title}
          </h2>
        </div>
      </div>

      {/* Video Presentation Window */}
      <div
        ref={containerRef}
        onMouseMove={resetHideTimer}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className={`relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex items-center justify-center ${
          isPortrait 
            ? "w-auto h-[78vh] aspect-[9/16] max-w-[90vw]" 
            : "w-full max-w-5xl aspect-video max-h-[80vh]"
        }`}
      >
        <video
          ref={videoRef}
          src={item.mediaUrl}
          poster={item.posterUrl}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-contain bg-black cursor-pointer"
        />

        {/* Minimalist Floating Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-4 right-4 z-30 p-3 md:p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 flex flex-col gap-2.5"
            >
              {/* Sleek Scrubber Bar */}
              <div
                onClick={handleSeek}
                className="w-full h-2 rounded-full bg-neutral-800/90 hover:h-2.5 transition-all duration-200 cursor-pointer relative flex items-center group"
              >
                <div
                  className="h-full bg-white rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-between items-center text-neutral-300">
                <div className="flex items-center gap-4">
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-white transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  {/* Replay */}
                  <button
                    onClick={() => {
                      if (!videoRef.current) return;
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                      resetHideTimer();
                    }}
                    className="p-1.5 hover:text-white transition-colors"
                    aria-label="Replay"
                  >
                    <RotateCcw size={16} />
                  </button>

                  {/* Mute / Unmute */}
                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-white transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  {/* Time indicator */}
                  <span className="font-mono text-xs tracking-wider text-neutral-400">
                    {formatTime(currentTime)} <span className="opacity-40">/</span> {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-white transition-colors"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  // Stop Lenis/body scroll when menu or video modal is active
  useEffect(() => {
    if (menuOpen || activeMedia) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [menuOpen, activeMedia]);

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

      {/* Fullscreen Overlay Menu */}
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

          <div className="border-t border-neutral-800 pt-8 mt-2 flex flex-col gap-8">
            <p className="max-w-4xl font-sans text-xl sm:text-2xl md:text-3xl font-normal leading-tight opacity-80 uppercase tracking-tight text-white">
              A collection of work across video editing, photography, videography, and creative production. This is where my creative side takes the spotlight.
            </p>

            {/* Under Development Minimal Notice & Drive CTA Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <span className="flex h-2.5 w-2.5 translate-y-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    STATUS / UNDER DEVELOPMENT
                  </p>
                  <p className="font-sans text-sm md:text-base text-neutral-300 mt-1">
                    Native CDN streaming integration is in progress. The cards below display mock placeholders — browse the complete full-resolution video archive and raw cuts directly on Google Drive.
                  </p>
                </div>
              </div>

              <a 
                href="https://drive.google.com/drive/folders/1MtdUv8EoTQYlKFlJFslAXy5Uw3J-y4QN?usp=sharing"
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 inline-flex items-center justify-center gap-3 border border-neutral-700 hover:border-white bg-white text-black hover:bg-neutral-200 rounded-full px-6 py-3.5 font-mono text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl"
              >
                <span>Open Video Drive</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery Media Grid (Fluid Multi-column Masonry Layout) */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item, index) => {
            const aspectClass = 
              item.orientation === "landscape" 
                ? "aspect-video" 
                : item.orientation === "portrait" 
                ? "aspect-[9/16]" 
                : "aspect-square";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                onClick={() => setActiveMedia(item)}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/70 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:border-white cursor-pointer"
              >
                {/* Visual Media Container — Minimalist Abstract Mock Card */}
                <div className={`w-full ${aspectClass} relative overflow-hidden bg-neutral-950 flex flex-col items-center justify-center p-6 text-center border-b border-neutral-900 group-hover:bg-neutral-900/40 transition-colors duration-500`}>
                  {/* Subtle radial dot grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center z-20 pointer-events-none">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-neutral-400 font-mono text-[10px] uppercase tracking-widest rounded-full border border-neutral-800 flex items-center gap-1.5">
                      {item.type === "video" ? <Film size={12} /> : <Eye size={12} />}
                      {item.orientation === "portrait" ? "VERTICAL REEL" : item.orientation === "landscape" ? "WIDESCREEN" : "SQUARE STILL"}
                    </span>
                  </div>

                  {/* Mock Indicator */}
                  <div className="relative z-20 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:border-neutral-600 transition-all duration-300">
                      {item.type === "video" ? <Play size={18} className="translate-x-0.5" /> : <Eye size={18} />}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      MOCK ENTRY / SAMPLE
                    </span>
                  </div>
                </div>

                {/* Bottom Card Information */}
                <div className="p-5 flex flex-col justify-between gap-3 bg-neutral-950/90 backdrop-blur-sm border-t border-neutral-800">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display text-2xl uppercase tracking-tighter text-white group-hover:text-neutral-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 shrink-0">{item.year}</span>
                  </div>

                  <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {activeMedia && (
          <MinimalistVideoPlayer
            item={activeMedia}
            onClose={() => setActiveMedia(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer / Contact */}
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
