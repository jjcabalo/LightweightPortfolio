"use client";

import React from 'react';
import { motion, useInView, useScroll } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, ArrowUpRight } from "lucide-react";

function ExperienceLineSegment() {
  const lineRef = React.useRef(null);
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
  const circleRef = React.useRef(null);
  const isInView = useInView(circleRef, { margin: "10000px 0px -50% 0px", once: false });

  return (
    <div className="relative group">
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
        <h3 className={`text-4xl font-display transition-colors duration-500 tracking-tighter uppercase ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-500"}`}>{exp.role}</h3>
        <span className={`font-mono text-sm uppercase tracking-widest transition-colors duration-500 ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-500"}`}>{exp.date}</span>
      </div>
      <p className={`text-base font-mono mt-4 uppercase tracking-widest transition-colors duration-500 ${isInView ? "text-[var(--theme-fg)]" : "text-neutral-500"}`}>{exp.company}</p>
      <p className="text-neutral-500 font-sans mt-4 max-w-5xl leading-relaxed">{exp.desc}</p>
    </div>
  );
}
export default function AboutPage() {
  return (
    <main className="min-h-screen text-white selection:bg-white selection:text-black relative pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]">
          JOHN.ABOUT
        </Link>
        <Link href="/" className="flex items-center gap-2 font-mono text-sm uppercase hover:line-through transition-all text-[#ffffff] h-12">
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
            JOHN <span className="text-neutral-500 italic">JERVYS CABALO</span>
          </h1>
          
          <a href="/resume.pdf" download="John_Jervys_Cabalo_Resume.pdf" title="Download Resume" className="group flex items-center justify-center gap-3 border border-neutral-700 rounded-full w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-display text-lg uppercase tracking-wider shrink-0">
            <span className="hidden md:inline">Download Resume</span>
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="flex flex-col mt-24">
          {/* About & Capabilities Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">About & Capabilities</h2>
            </div>
            <div className="lg:col-span-9 flex flex-col gap-20">
              <div>
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl text-neutral-300 leading-tight mb-12">
                  I&apos;m John Jervys — a multimedia creative and aspiring software engineer who enjoys bringing ideas to life through visuals, storytelling, design, and technology. Currently a 4th-year BS Computer Science student at the University of Makati, a Freelancer, and founder of EstudyantEdits.
                </p>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/john-jervys-cabalo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://github.com/jjcabalo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a href="https://instagram.com/not_jrvys" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href="https://twitter.com/not_jrvys" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="w-14 h-14 flex items-center justify-center border border-neutral-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-800 pt-16">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Technical Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {["TypeScript", "Python", "Java", "C#", "SQL", "Kotlin", "React", "Next.js", "React Native", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma", "ASP.NET Core"].map((skill, i) => (
                      <span key={i} className="px-4 py-2 border border-neutral-700 rounded-full text-sm font-mono text-neutral-300">{skill}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Dev Tools & Media</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Android Studio", "GitHub", "Figma", "VS Code", "Vercel", "Supabase", "GCP", "Adobe Premiere Pro", "After Effects", "Photoshop"].map((tool, i) => (
                      <span key={i} className="px-4 py-2 border border-neutral-700 rounded-full text-sm font-mono text-neutral-300">{tool}</span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-8 text-white">Core Competencies</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 font-mono text-base text-neutral-400">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Full-Stack Web &amp; Mobile App Development</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> UI/UX &amp; Human-Centered Interaction Design</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Creative Direction &amp; Broadcast Video Production</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full" /> Database Architecture &amp; Data Streaming Pipelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Experience</h2>
            </div>
            <div className="lg:col-span-9 space-y-24 pl-8 ml-2 md:ml-4 relative">
              {[
                { 
                  role: "Publicity and Ads Head & Research and Development Committee Member", 
                  company: "University of Makati - Society of Innovative Computing", 
                  date: "Oct 2026 - Present", 
                  desc: "Spearheading creative direction, scriptwriting, video editing, pre-production, production, and post-production for college multimedia campaigns and technological research initiatives." 
                },
                { 
                  role: "Freelance Application Developer & UI/UX Designer", 
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
                  desc: "Spearheaded video production, motion graphics, and live event media documentation for premier national robotics events, including the 4th Robolution and Minoan Robotsports Competition Philippines." 
                },
                { 
                  role: "Student Intern — Broadcast Media", 
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
          </motion.div>

          {/* Projects Section */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Projects and Works</h2>
            </div>
            <div className="lg:col-span-9 space-y-20">
              {[
                { name: "KOMYUTPH", category: "PWA Navigation", year: "2026", desc: "An offline-first, crowdsourced navigation web application designed for informal public transportation in the Philippines (jeepneys, tricycles, UV Express) with fare estimates and transit guides." },
                { name: "eHANDA", category: "GovTech Platform", year: "2026", desc: "A post-disaster household needs assessment platform integrating directly with the Philippine government's eGovPH app ecosystem. Top 10 Finalist in eGovPH Hackathon 2026." },
                { name: "MapuOne", category: "Campus Web App", year: "2026", desc: "A centralized campus incident and complaint management system featuring real-time ticket tracking, administrative dashboards, and automated department dispatch." },
                { name: "IoTrack Learning Kit", category: "EdTech & IoT", year: "2026", desc: "An interactive educational IoT platform featuring 3D robotic arm simulations, live hardware telemetry streaming, and modular robotics engineering curriculum." },
                { name: "SilangApp", category: "Civic Mobile App", year: "2025", desc: "A comprehensive barangay governance mobile application for Brgy. Sto. Rosario Silangan, Pateros, offering digital document requests, resident registries, and community alerts." },
                { name: "Erehwon Art Center", category: "Arts MIS Platform", year: "2026", desc: "A comprehensive management information system engineered for Erehwon Center for the Arts to catalog valuable art collections, manage studio reservations, maintain artist exhibition records, and digitize archives." },
                { name: "Gathr", category: "Event Management", year: "2025", desc: "An end-to-end event management platform developed for university collegiate bodies, featuring participant registration workflows and real-time QR-based attendance tracking." },
                { name: "StudyCircle", category: "Collaborative Learning", year: "2026", desc: "An AI-enhanced collaborative study platform featuring shared markdown documentation, interactive study lounges, and automated flashcard generation." }
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 border-b border-neutral-800 pb-24 mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Awards & Recognition</h2>
            </div>
            <div className="lg:col-span-9 space-y-20">
              {[
                { title: "Best in UI and UX; 1st Runner Up", issuer: "Infotechnolympics 2026 — Hackathon Category", date: "Oct 2026", desc: "Recognized for human-centered design excellence and rapid prototyping during the high-pressure Infotechnolympics 2026 Hackathon." },
                { title: "Top 10 Finalists", issuer: "eGovPH Hackathon 2026", date: "Jul 2026", desc: "Selected among the top 10 national finalists for eHANDA, a post-disaster household needs assessment platform integrating directly with the eGovPH app." },
                { title: "Most Commercially Viable", issuer: "UMak 7th Hackathon 2025", date: "May 2025", desc: "Awarded for exceptional market readiness, sustainable product viability, and streamlined digital product architecture." },
                { title: "1st Runner Up — C# Category", issuer: "Infotechnolympics 2025", date: "Oct 2024", desc: "Demonstrated advanced algorithmic problem-solving, clean software architecture, and rapid C# development under contest constraints." }
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:col-span-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 sticky top-32">Education & Certs</h2>
            </div>
            <div className="lg:col-span-9 flex flex-col gap-24">
              <div className="space-y-20">
                {[
                  { degree: "BS in Computer Science (Major in Application Development)", school: "University of Makati", date: "Aug 2023 - Present", desc: "Dean's Lister with a running GWA of 1.243. Relevant coursework in Data Structures and Algorithms, OOP, Database Systems, Web & Mobile Application Development, and Software Engineering." }
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-800">
                {[
                  { name: "IT-Specialist — Databases", issuer: "Pearson", date: "Oct 2026", id: "r6wo-uSrC", link: "https://www.certiport.com/portal/Pages/CredentialVerification.aspx" },
                  { name: "Data Streaming Engineer", issuer: "Confluent", date: "Jul 2026", id: "194864572", link: "https://certificates.confluent.io/d5141679-eb48-476c-9c34-7238a52022f4#acc.wt2KV9ae" },
                  { name: "Global MOOC on Ethics of AI", issuer: "LG AI Research", date: "May 2025", id: "3QLGFJ176B1C", link: "https://www.coursera.org/account/accomplishments/verify/3QLGFJ176B1C" }
                ].map((cert, i) => (
                  <a href={cert.link} key={i} target="_blank" rel="noopener noreferrer" className="relative p-6 md:p-8 border border-[var(--theme-fg)]/15 bg-neutral-950 hover:bg-neutral-900 hover:border-[var(--theme-fg)]/40 transition-all group flex flex-col justify-between aspect-[7/5]">
                    <div className="absolute top-8 right-8 text-neutral-700 group-hover:text-white transition-colors">
                      <ArrowUpRight size={24} />
                    </div>
                    <div className="pt-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">{cert.issuer}</span>
                      <h3 className="font-display text-2xl md:text-3xl mt-2 leading-snug group-hover:text-white text-[var(--theme-fg)] tracking-tight uppercase break-words pr-8">{cert.name}</h3>
                    </div>
                    <div className="mt-8 border-t border-neutral-800 pt-4 flex items-center justify-between gap-2">
                      <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{cert.date}</p>
                      <p className="font-mono text-xs text-neutral-500 tracking-wider">ID: {cert.id}</p>
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









