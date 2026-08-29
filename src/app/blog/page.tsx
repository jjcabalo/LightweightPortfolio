"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";

export default function BlogIndex() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      (window as any).lenis?.start();
    }
  }, [menuOpen]);

  const posts = [
    { title: "The Death of the Drop Shadow", slug: "the-death-of-the-drop-shadow", date: "Oct 12, 2025", tag: "Design", readTime: "5 MIN", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "Exploring how brutalism and flat design killed the drop shadow, and why high-contrast borders are taking over modern interfaces." },
    { title: "Why Web3 Needs Typography", slug: "why-web3-needs-typography", date: "Sep 04, 2025", tag: "Web3", readTime: "4 MIN", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80", desc: "The blockchain space is saturated with generic 3D assets. Here's why strong, distinct typographic systems are the true key to building trust." },
    { title: "Motion as Function", slug: "motion-as-function", date: "Aug 18, 2025", tag: "UX", readTime: "7 MIN", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80", desc: "Animation on the web shouldn't just be decoration. How to use functional motion to guide user focus and reduce cognitive load." },
    { title: "Optimizing Three.js", slug: "optimizing-three-js", date: "Jul 22, 2025", tag: "Dev", readTime: "6 MIN", img: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&q=80", desc: "A deep dive into WebGL performance. Techniques for managing draw calls and memory leaks in complex browser scenes." }
  ];

  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black pt-32 pb-32 px-6 md:px-12 relative">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link 
          href="/" 
          className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]"
        >
          JOHN.BLOG
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
            className="fixed inset-0 bg-black z-40 flex flex-col justify-start pt-28 pb-16 px-8 overflow-hidden text-white"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav links */}
            <div className="flex flex-col md:flex-row justify-between w-full h-full">
              <nav className="flex flex-col gap-1 md:gap-0 mt-4 md:mt-0">
                {[
                  { label: "Home", href: "/#" },
                  { label: "About", href: "/#about" },
                  { label: "Work", href: "/#work" },
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
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block font-display text-[9vw] md:text-[5vw] lg:text-[4vw] leading-none tracking-tighter uppercase text-white hover:text-neutral-500 transition-colors py-1"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Separated External/Page Links */}
              <div className="flex flex-col gap-6 my-auto md:my-0 md:justify-end md:pb-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
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
              transition={{ delay: 0.6, duration: 0.4 }}
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

      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase leading-[0.85] mb-6 text-white">
            WRITINGS <br/> <span className="italic text-neutral-500">& THOUGHTS</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Exploring art, code, and brutalist design.</p>
        </motion.div>

        <div className="flex flex-col divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row gap-0 hover:bg-white hover:text-black transition-all duration-300 cursor-crosshair -mx-6 md:-mx-12 px-6 md:px-12 text-white">
                <div className="hidden md:block w-[260px] lg:w-[320px] shrink-0 self-stretch overflow-hidden bg-neutral-900 border-r border-neutral-800 group-hover:border-neutral-300 transition-colors">
                  <div className="relative h-full min-h-[220px] overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 py-8 md:px-10 gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter transition-all line-clamp-2">{post.title}</h3>
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-700 transition-colors">
                      {post.date} &nbsp;Â·&nbsp; {post.readTime} READ &nbsp;Â·&nbsp; {post.tag}
                    </p>
                  </div>

                  <div className="block md:hidden w-full h-[200px] overflow-hidden bg-neutral-900 mt-4 mb-4 border border-neutral-800">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  <p className="font-sans text-neutral-400 group-hover:text-neutral-800 transition-colors text-sm md:text-base leading-relaxed line-clamp-2 mb-4">
                    {post.desc}
                  </p>

                  <div className="flex justify-between items-center mt-auto border-t border-neutral-800 group-hover:border-neutral-300 pt-6 transition-colors">
                    <span className="inline-block px-5 py-2.5 border border-neutral-700 group-hover:border-black rounded-full font-mono text-[10px] tracking-widest font-bold uppercase transition-colors text-neutral-300 group-hover:text-black">READ ARTICLE</span>
                    <ArrowUpRight size={24} className="text-neutral-500 group-hover:text-black transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-24 mb-12 border-t border-neutral-800 pt-8 text-neutral-500">
          <button className="flex items-center gap-2 hover:text-white transition-colors cursor-crosshair group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Prev</span>
          </button>
          
          <div className="flex gap-6 font-mono text-sm">
            <span className="text-white font-bold tracking-widest">1 / 1</span>
          </div>

          <button className="flex items-center gap-2 hover:text-white transition-colors cursor-crosshair group">
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Next</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </main>
  );
}


