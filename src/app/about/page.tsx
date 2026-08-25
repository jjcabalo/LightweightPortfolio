"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative bg-neutral-950 pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity">
          JOHN.
        </Link>
        <Link href="/" className="flex items-center gap-2 font-mono text-sm uppercase hover:line-through transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <section className="pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-row justify-between items-center md:items-end mb-8 border-b border-neutral-800 pb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none">
            JOHN <span className="text-neutral-500 italic">JERVYS</span>
          </h1>
          
          <a href="/resume.pdf" download title="Download Resume" className="group flex items-center justify-center gap-3 border border-neutral-700 rounded-full w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-display text-lg uppercase tracking-wider shrink-0">
            <span className="hidden md:inline">Download Resume</span>
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
          {/* Left Column: Intro & Additional */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-16"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">About</h2>
              <p className="font-sans text-xl md:text-2xl text-neutral-300 leading-relaxed mb-8">
                I am a multimedia artist and creative developer blurring the line between code and art. With over 5 years of experience, I specialize in crafting digital experiences that utilize brutalist structures, striking typography, and precise motion.
              </p>

              <div className="flex gap-4">
                <a href="#" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" aria-label="GitHub" className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">Additional</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tighter mb-4">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebGL", "GSAP"].map((skill, i) => (
                      <span key={i} className="px-3 py-1 border border-neutral-800 rounded-full text-sm font-mono text-neutral-400">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-tighter mb-4">Dev Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {["VS Code", "Figma", "Git", "Webpack", "Vercel", "Cinema4D", "Blender"].map((tool, i) => (
                      <span key={i} className="px-3 py-1 border border-neutral-800 rounded-full text-sm font-mono text-neutral-400">{tool}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-tighter mb-4">Core Competencies</h3>
                  <ul className="list-none space-y-2 font-mono text-sm text-neutral-400">
                    <li>— Creative Direction & UI/UX</li>
                    <li>— Motion Graphics & Animation</li>
                    <li>— Frontend Architecture</li>
                    <li>— Web3 Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Experience, Education, Projects */}
          <motion.div 
            className="lg:col-span-7 lg:pl-12 lg:border-l border-neutral-800 flex flex-col gap-16"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8">Experience</h2>
              <div className="space-y-12">
                {[
                  { role: "Lead Multimedia Designer", company: "Studio Void", date: "2024 - Present" },
                  { role: "Senior Creative Developer", company: "Web3 Innovators", date: "2022 - 2024" },
                  { role: "Interactive Designer", company: "Digital Arts Inc.", date: "2020 - 2022" },
                  { role: "Motion Graphics Intern", company: "Creative Tech Lab", date: "2019 - 2020" }
                ].map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-2 border-b border-neutral-800 pb-4">
                      <div>
                        <h3 className="font-display text-3xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{exp.role}</h3>
                        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 mt-2">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">{exp.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8">Projects</h2>
              <div className="space-y-12">
                {[
                  { name: "Ethereal Echoes", category: "Interactive Install", year: "2023" },
                  { name: "Brutal Genesis", category: "Web3 Platform", year: "2024" },
                  { name: "Void Analytics", category: "Dashboard UI", year: "2024" },
                  { name: "Chromatic Shift", category: "Motion Identity", year: "2025" }
                ].map((proj, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-2 border-b border-neutral-800 pb-4">
                      <div>
                        <h3 className="font-display text-3xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{proj.name}</h3>
                        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 mt-2">{proj.category}</p>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">{proj.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8">Education</h2>
              <div className="space-y-12">
                {[
                  { degree: "BFA in Design & Technology", school: "Parsons School of Design", date: "2016 - 2020" },
                  { degree: "Creative Coding Certification", school: "Creative Coding Institute", date: "2021" }
                ].map((edu, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-2 border-b border-neutral-800 pb-4">
                      <div>
                        <h3 className="font-display text-3xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{edu.degree}</h3>
                        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 mt-2">{edu.school}</p>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">{edu.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
