"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]">
          JOHN.
        </Link>
        <Link href="/" className="flex items-center gap-2 font-mono text-sm uppercase hover:line-through transition-all text-[#ffffff]">
          <ArrowLeft size={16} /> Back
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

        <div className="flex flex-col mt-24">
          {/* About & Capabilities Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">About & Capabilities</h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-20">
              <div>
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl text-neutral-300 leading-tight mb-12">
                  I am a multimedia artist and creative developer blurring the line between code and art. With over 5 years of experience, I specialize in crafting digital experiences that utilize brutalist structures, striking typography, and precise motion.
                </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="LinkedIn" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="#" aria-label="GitHub" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-800 pt-16">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Technical Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "WebGL", "GSAP"].map((skill, i) => (
                      <span key={i} className="px-4 py-2 border border-neutral-700 rounded-full text-sm font-mono text-neutral-300">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Dev Tools</h3>
                  <div className="flex flex-wrap gap-3">
                    {["VS Code", "Figma", "Git", "Webpack", "Vercel", "Cinema4D", "Blender"].map((tool, i) => (
                      <span key={i} className="px-4 py-2 border border-neutral-700 rounded-full text-sm font-mono text-neutral-300">{tool}</span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Core Competencies</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 font-mono text-base text-neutral-400">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Creative Direction & UI/UX</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Motion Graphics & Animation</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Frontend Architecture</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Web3 Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Experience</h2>
            </div>
            <div className="lg:col-span-8 space-y-20 border-l border-neutral-800 pl-8 ml-2 md:ml-4">
              {[
                { role: "Lead Multimedia Designer", company: "Studio Void", date: "2024 - Present", desc: "Spearheaded creative direction for over 20+ digital campaigns. Managed a team of 5 designers to deliver award-winning interactive web experiences." },
                { role: "Senior Creative Developer", company: "Web3 Innovators", date: "2022 - 2024", desc: "Engineered high-performance WebGL interfaces for decentralized applications. Bridged the gap between conceptual design and technical execution." },
                { role: "Interactive Designer", company: "Digital Arts Inc.", date: "2020 - 2022", desc: "Prototyped and developed immersive brand experiences. Specialized in motion design and fluid user interactions using GSAP and Three.js." },
                { role: "Motion Graphics Intern", company: "Creative Tech Lab", date: "2019 - 2020", desc: "Assisted in producing motion graphics for commercial clients. Learned industry-standard workflows for 3D modeling and video composition." }
              ].map((exp, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -left-[41px] top-4 w-4 h-4 bg-neutral-950 border-2 border-neutral-600 group-hover:border-white transition-colors rounded-full" />
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                      <h3 className="font-display text-4xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{exp.role}</h3>
                      <p className="font-mono text-base uppercase tracking-widest text-neutral-500 mt-4">{exp.company}</p>
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest text-neutral-600 shrink-0 md:text-right pt-2">{exp.date}</span>
                  </div>
                  <p className="font-sans text-xl text-neutral-400 mt-8 leading-relaxed max-w-3xl group-hover:text-neutral-300 transition-colors">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Projects and Works</h2>
            </div>
            <div className="lg:col-span-8 space-y-20">
              {[
                { name: "Ethereal Echoes", category: "Interactive Install", year: "2023", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", desc: "An audio-reactive WebGL installation exhibited in NYC, allowing users to manipulate soundscapes through physical gestures." },
                { name: "Brutal Genesis", category: "Web3 Platform", year: "2024", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800", desc: "A minimalist NFT marketplace utilizing a brutalist design system, featuring seamless wallet integrations and gas-optimized contracts." },
                { name: "Void Analytics", category: "Dashboard UI", year: "2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800", desc: "A sleek, dark-mode data visualization dashboard built with React and D3.js for processing massive sets of real-time financial metrics." },
                { name: "Chromatic Shift", category: "Motion Identity", year: "2025", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", desc: "A complete brand overhaul including kinetic typography, dynamic color systems, and a WebGL-powered landing page." }
              ].map((proj, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                      <h3 className="font-display text-4xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{proj.name}</h3>
                      <p className="font-mono text-base uppercase tracking-widest text-neutral-500 mt-4">{proj.category}</p>
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest text-neutral-600 shrink-0 md:text-right pt-2">{proj.year}</span>
                  </div>
                  <p className="font-sans text-xl text-neutral-400 mt-8 leading-relaxed max-w-3xl group-hover:text-neutral-300 transition-colors">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Awards & Recognition */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Awards & Recognition</h2>
            </div>
            <div className="lg:col-span-8 space-y-20">
              {[
                { title: "Site of the Day", issuer: "Awwwards", date: "2024", desc: "Awarded for exceptional creativity, design, and technical execution on the Void Analytics dashboard platform." },
                { title: "Gold Winner - Digital Art", issuer: "Indigo Design Awards", date: "2023", desc: "Recognized internationally for the 'Ethereal Echoes' interactive web installation." },
                { title: "Best Web3 Interface", issuer: "Webby Awards", date: "2024", desc: "Honored for bridging the gap between blockchain complexity and minimalist, accessible UI design on Brutal Genesis." },
                { title: "Developer of the Year (Nominee)", issuer: "CSS Design Awards", date: "2025", desc: "Nominated for consistently pushing the boundaries of web motion and 3D browser experiences." }
              ].map((award, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                      <h3 className="font-display text-4xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{award.title}</h3>
                      <p className="font-mono text-base uppercase tracking-widest text-neutral-500 mt-4">{award.issuer}</p>
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest text-neutral-600 shrink-0 md:text-right pt-2">{award.date}</span>
                  </div>
                  <p className="font-sans text-xl text-neutral-400 mt-8 leading-relaxed max-w-3xl group-hover:text-neutral-300 transition-colors">
                    {award.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Education & Certs</h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-24">
              <div className="space-y-20">
                {[
                  { degree: "BFA in Design & Technology", school: "Parsons School of Design", date: "2016 - 2020", desc: "Graduated with honors. Focused on the intersection of physical computing, generative art, and modern web architecture." },
                  { degree: "Creative Coding Cert", school: "Creative Coding Institute", date: "2021", desc: "Intensive 6-month program focusing on advanced GLSL shaders, procedural generation, and real-time rendering pipelines." }
                ].map((edu, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div>
                        <h3 className="font-display text-4xl uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">{edu.degree}</h3>
                        <p className="font-mono text-base uppercase tracking-widest text-neutral-500 mt-4">{edu.school}</p>
                      </div>
                      <span className="font-mono text-sm uppercase tracking-widest text-neutral-600 shrink-0 md:text-right pt-2">{edu.date}</span>
                    </div>
                    <p className="font-sans text-xl text-neutral-400 mt-8 leading-relaxed max-w-3xl group-hover:text-neutral-300 transition-colors">
                      {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-neutral-800">
                {[
                  { id: "01", name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023", link: "#" },
                  { id: "02", name: "Advanced React Patterns", issuer: "Frontend Masters", date: "2022", link: "#" },
                  { id: "03", name: "UI/UX Micro-Interactions", issuer: "Awwwards Academy", date: "2022", link: "#" }
                ].map((cert, i) => (
                  <a href={cert.link} key={i} className="relative p-8 border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all group flex flex-col justify-between h-full min-h-[200px]">
                    {/* Link Icon */}
                    <div className="absolute top-8 right-8 text-neutral-700 group-hover:text-white transition-colors">
                      <ArrowUpRight size={24} />
                    </div>
                    <div>
                      <span className="font-mono text-neutral-600 text-xl">{cert.id}</span>
                      <h3 className="font-display text-3xl md:text-4xl lg:text-3xl xl:text-4xl mt-4 leading-tight group-hover:text-white text-neutral-300 tracking-tighter uppercase break-words pr-8">{cert.name}</h3>
                    </div>
                    <div className="mt-8 border-t border-neutral-800 pt-4">
                      <p className="text-sm font-sans text-neutral-400 uppercase tracking-widest break-words">{cert.issuer}</p>
                      <p className="font-mono text-xs text-neutral-500 mt-2 uppercase tracking-widest">{cert.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
