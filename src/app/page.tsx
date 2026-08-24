"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

function WorkSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Uses dynamic calculation to stop exactly at the end of the content regardless of screen size
  const x = useTransform(scrollYProgress, (p) => `calc(-${p * 100}% + ${p * 100}vw)`);

  const projects = [
    { title: "Ethereal Echoes", category: "Interactive Install", year: "2023" },
    { title: "Brutal Genesis", category: "Web3 Platform", year: "2024" },
    { title: "Void Analytics", category: "Dashboard UI", year: "2024" },
    { title: "Chromatic Shift", category: "Motion Identity", year: "2025" }
  ];

  return (
    <>
      {/* Desktop Sticky Scroll */}
      <section ref={targetRef} id="work-desktop" className="hidden md:block relative h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-b border-neutral-800 pt-24 pb-12">
          <div className="px-12 mb-12 flex justify-between items-end shrink-0">
            <h2 className="font-display text-6xl tracking-tight text-white uppercase">SELECTED WORK</h2>
            <span className="text-neutral-500 font-mono">(04)</span>
          </div>
          
          <div className="flex-1 flex items-center">
            <motion.div style={{ x }} className="flex gap-4 px-12 w-max">
              {projects.map((project, i) => (
                <div key={i} className="w-[45vw] lg:w-[35vw] h-[60vh] relative bg-neutral-950 overflow-hidden border border-neutral-800 hover:border-white transition-colors group shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute p-6 flex flex-col justify-between h-full w-full z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start">
                      <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
                      <ArrowUpRight size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-5xl text-white tracking-tight">{project.title}</h3>
                      <p className="text-neutral-400 mt-3 font-mono text-sm">{project.year}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-900 font-display text-[12rem] z-0 group-hover:scale-110 transition-transform duration-700">
                    0{i + 1}
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
          <h2 className="font-display text-4xl tracking-tight text-white uppercase">SELECTED WORK</h2>
        </div>
        <div className="flex flex-col gap-6 px-6">
          {projects.map((project, i) => (
            <div key={i} className="w-full relative bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between h-[400px]">
              <div className="flex justify-between items-start relative z-20">
                <span className="px-3 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full">{project.category}</span>
                <ArrowUpRight size={28} className="text-white" />
              </div>
              <div className="relative z-20">
                <h3 className="font-display text-3xl text-white tracking-tight">{project.title}</h3>
                <p className="text-neutral-400 mt-2 font-mono text-sm">{project.year}</p>
              </div>
              <div className="absolute bottom-4 right-4 text-neutral-900 font-display text-[8rem] leading-none z-0">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="min-h-screen text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-display font-bold text-2xl tracking-tighter">JOHN.</div>
        <div className="flex gap-6 text-sm font-medium hidden md:flex">
          <a href="#about" className="hover:line-through transition-all">ABOUT</a>
          <a href="#work-desktop" className="hover:line-through transition-all">WORK</a>
          <a href="#experience" className="hover:line-through transition-all">EXPERIENCE</a>
          <a href="#blog" className="hover:line-through transition-all">BLOG</a>
          <a href="#contact" className="hover:line-through transition-all">CONTACT</a>
        </div>
        <button className="md:hidden p-2 relative z-[60]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 font-display text-4xl uppercase">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#work-mobile" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center md:justify-end p-6 md:p-12 border-b border-neutral-800 relative overflow-hidden pt-32 md:pt-0">
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
        <div className="flex flex-col md:flex-row justify-between md:items-end pb-8 z-10 w-full border-t border-neutral-800 pt-6 gap-6">
          <p className="max-w-md text-neutral-400 font-sans text-base">
            Crafting digital experiences through the intersection of design, motion, and code. Based on the internet.
          </p>
          <div className="hidden md:flex gap-4">
            <ArrowRight size={32} className="animate-pulse" />
          </div>
        </div>
        
        {/* Abstract Background Element for Media-Heavy Feel */}
        <div className="absolute top-1/4 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-neutral-900 rounded-full blur-[100px] opacity-50 z-0 pointer-events-none" />
      </section>

      {/* About Me */}
      <section id="about" className="py-32 px-6 md:px-12 border-b border-neutral-800 relative flex flex-col items-center justify-center text-center">
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
          I am a creator blurring the lines between art, technology, and interactive media. With a foundation in traditional arts and an obsession with modern frameworks, my work focuses on striking typography, brutalist structures, and meaningful motion to create web experiences that don't just exist, but <span className="text-white font-display italic">perform.</span>
        </p>

        <button className="mt-16 flex items-center gap-3 border border-neutral-700 rounded-full px-8 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-display text-lg uppercase tracking-wider">
          Read Full Manifesto <ArrowRight size={20} />
        </button>
      </section>

      {/* Projects */}
      <WorkSection />

      {/* Experience */}
      <section id="experience" className="py-24 px-6 md:px-12 border-b border-neutral-800">
        <div className="w-full">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16">EXPERIENCE</h2>
          <div className="space-y-16 border-l border-neutral-800 pl-8 ml-2 md:ml-4">
            {[
              { role: "Lead Multimedia Designer", company: "Studio Void", date: "2024 - Present", desc: "Spearheading the creative direction for high-impact Web3 platforms. Merging 3D aesthetics with performant web technologies." },
              { role: "Senior Creative Developer", company: "Web3 Innovators", date: "2022 - 2024", desc: "Developed immersive blockchain landing pages and minted interactive NFT experiences." },
              { role: "Interactive Designer", company: "Digital Arts Inc.", date: "2020 - 2022", desc: "Designed experimental UI patterns for digital art galleries." },
              { role: "Motion Graphics Intern", company: "Creative Tech Lab", date: "2019 - 2020", desc: "Created kinetic typography and video mapping assets." }
            ].map((exp, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[41px] top-2 w-4 h-4 bg-black border-2 border-neutral-600 group-hover:border-white transition-colors rounded-full" />
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-3xl font-display transition-all">{exp.role}</h3>
                  <span className="text-neutral-500 font-mono text-sm">{exp.date}</span>
                </div>
                <p className="text-neutral-300 text-lg mt-2">{exp.company}</p>
                <p className="text-neutral-500 font-sans mt-4 max-w-5xl leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-24 border-b border-neutral-800 overflow-hidden relative flex flex-col gap-12">
        <div className="px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white mb-8">THE ARSENAL</h2>
        </div>
        
        {/* Marquee-style Tech Display */}
        <div className="flex flex-col gap-6 w-full">
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
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-24 px-6 md:px-12 border-b border-neutral-800">
        <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-16">CREDENTIALS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: "01", name: "Advanced WebGL Patterns", issuer: "Creative Coding Course", year: "2024" },
            { id: "02", name: "Blockchain Architecture", issuer: "Web3 Institute", year: "2023" },
            { id: "03", name: "Awwwards Masterclass", issuer: "Typography in Web", year: "2022" },
            { id: "04", name: "Google UX Design", issuer: "Professional Certificate", year: "2022" },
            { id: "05", name: "3D Motion Graphics", issuer: "School of Motion", year: "2021" },
            { id: "06", name: "Frontend Architecture", issuer: "Frontend Masters", year: "2021" }
          ].map((cert, i) => (
            <div key={i} className="p-8 border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all group flex flex-col justify-between aspect-square">
              <div>
                <span className="font-mono text-neutral-600 text-xl">{cert.id}</span>
                <h3 className="font-display text-2xl mt-4 leading-tight group-hover:text-white text-neutral-300">{cert.name}</h3>
              </div>
              <div className="mt-8 border-t border-neutral-800 pt-4">
                <p className="text-sm font-sans text-neutral-400">{cert.issuer}</p>
                <p className="font-mono text-xs text-neutral-500 mt-1">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 px-6 md:px-12 border-b border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">BLOG</h2>
          <button className="text-sm uppercase tracking-widest font-bold border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
            Read The Archives
          </button>
        </div>
        
        <div className="flex flex-col border-t border-neutral-800">
          {[
            { title: "The Death of the Drop Shadow", slug: "the-death-of-the-drop-shadow", date: "Oct 12, 2025", tag: "Design" },
            { title: "Why Web3 Needs Typography", slug: "why-web3-needs-typography", date: "Sep 04, 2025", tag: "Web3" },
            { title: "Motion as Function", slug: "motion-as-function", date: "Aug 18, 2025", tag: "UX" },
            { title: "Optimizing Three.js", slug: "optimizing-three-js", date: "Jul 22, 2025", tag: "Dev" }
          ].map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-neutral-800 hover:bg-white hover:text-black transition-all duration-300 cursor-crosshair px-4 md:px-8 -mx-4 md:-mx-8">
              <div className="w-full md:w-1/4 mb-4 md:mb-0 font-mono text-sm text-neutral-500 group-hover:text-neutral-800 transition-colors">
                {post.date} — {post.tag}
              </div>
              <div className="w-full md:w-2/4">
                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter transition-all">{post.title}</h3>
              </div>
              <div className="w-full md:w-1/4 text-left md:text-right mt-6 md:mt-0 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <span className="inline-block border border-black rounded-full px-6 py-3 font-mono text-sm tracking-widest font-bold">READ ARTICLE</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 px-6 md:px-12">
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="font-display text-7xl md:text-[10vw] leading-none tracking-tighter transition-all cursor-pointer">
              LET'S TALK
            </h2>
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
              Github
            </a>
            <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
              Twitter
            </a>
            <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
              LinkedIn
            </a>
            <a href="#" className="font-mono text-sm uppercase hover:line-through transition-all">
              <Mail size={16} className="inline-block" />
            </a>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-neutral-600 font-mono text-sm">
          <p>© {new Date().getFullYear()} JOHN. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR VERCEL</p>
        </div>
      </footer>
    </main>
  );
}
