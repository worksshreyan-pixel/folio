'use client';

import { motion } from 'framer-motion';
import { Reveal, SectionIndex, Stamp, Annotation, PencilArrow, Highlight, CornerMarks } from '@/components/paper-kit';
import { Code2, Palette, Sparkles, Layers, Database, Brain, Globe } from 'lucide-react';

const techGroups = [
  {
    category: 'FRONTEND & UI',
    items: [
      { name: 'Next.js & React', role: 'TYPESCRIPT, JAVASCRIPT ES6+, COMPONENT ARCHITECTURE', icon: Code2 },
      { name: 'Tailwind CSS & Motion', role: 'FRAMER MOTION, RESPONSIVE DESIGN, MICRO-INTERACTIONS', icon: Palette },
    ],
  },
  {
    category: 'BACKEND & CLOUD',
    items: [
      { name: 'Supabase & PostgreSQL', role: 'RELATIONAL SCHEMAS, AUTHENTICATION, ROW LEVEL SECURITY, STORAGE', icon: Database },
      { name: 'Deployment & Services', role: 'VERCEL, CLOUDFLARE, RESEND API, REST INTEGRATIONS', icon: Globe },
    ],
  },
  {
    category: 'AI TOOLING & ACCELERATION',
    items: [
      { name: 'AI-Assisted Engineering', role: 'CURSOR, BOLT.NEW, ANTIGRAVITY, LLM PROMPTING', icon: Brain },
      { name: 'Rapid MVP Execution', role: 'SYSTEM SCAFFOLDING, PROTOTYPING, SPEED-TO-DEPLOY', icon: Sparkles },
    ],
  },
  {
    category: 'PRODUCT & SYSTEM DESIGN',
    items: [
      { name: 'SaaS Workflows & Security', role: 'TRANSACTION LIFECYCLES, ACCESS CONTROL, OTP GATING', icon: Layers },
      { name: 'UI/UX & Product Polish', role: 'FIGMA, DESIGN SYSTEMS, CONVERSION PATTERNS', icon: Palette },
    ],
  },
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="02" label="Background" className="mb-12" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* editorial story */}
          <div>
            <Reveal>
              <h2 className="display text-[9vw] leading-[0.92] text-ink sm:text-[6.5vw] lg:text-[5rem]">
                All <span className="text-stone italic font-light">Project</span><br />
                starts with <br />
                <Highlight>Curosity</Highlight> Ends with Experience.
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                I am a 2nd-year Computer Engineering student at Walchand Institute of Technology (WIT), Solapur (Batch 2025–2029).
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-5 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                I bridge traditional computer engineering concepts with modern AI-accelerated workflows. By directing tools like Cursor, Bolt.new, and Antigravity alongside Next.js and Supabase, I build and deploy complete web apps and SaaS systems in days rather than months—focusing heavily on relational database architecture, Row-Level Security, authentication, and polished user experience.
              </p>
            </Reveal>
            <Reveal delay={0.28} className="mt-5 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                Currently building DELT (a secure digital deal & asset delivery platform) while exploring full-stack engineering, cloud backends, and early-stage product development.
              </p>
            </Reveal>

            <Reveal delay={0.32} className="mt-8 flex items-center gap-5">
              <Annotation className="text-[1rem]" rotate={-2}>
                continuously learning, always shipping at AI speed
              </Annotation>
              <PencilArrow direction="right" className="opacity-60" />
            </Reveal>
          </div>

          {/* side: tech system + stamp (animates once on view) */}
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <Reveal delay={0.1}>
              <div className="paper-sheet relative rounded-xl border border-rule/60 p-6 sm:p-7 pb-9">
                <Tape />
                <div className="editorial-label mb-1">03 -- Technical Stack</div>
                <div className="editorial-num text-ink text-lg">No. 02 — Skills Matrix</div>

                <div className="mt-6 space-y-4">
                  {techGroups.map((group) => (
                    <div key={group.category} className="space-y-px">
                      <div className="editorial-label border-b border-rule/40 pb-1.5 pt-2.5 !text-[0.52rem] !tracking-[0.16em] text-stone uppercase">
                        {group.category}
                      </div>
                      {group.items.map((t, idx) => (
                        <div
                          key={t.name}
                          className="group flex items-center gap-4 border-b border-rule/40 py-2.5 transition-colors hover:bg-paper-2/40"
                        >
                          <span className="editorial-num w-5 text-[0.7rem] text-stone">{String(idx + 1).padStart(2, '0')}</span>
                          <t.icon size={16} className="text-graphite" strokeWidth={1.6} />
                          <div className="flex-1">
                            <div className="font-display text-[0.95rem] text-ink">{t.name}</div>
                            <div className="editorial-label !text-[0.5rem] !tracking-[0.18em]">{t.role}</div>
                          </div>
                          <span className="h-1.5 w-1.5 rounded-full bg-coral opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-rule/20 pt-4">
                  <span className="editorial-label !text-[0.5rem] uppercase">SPECIMEN · 2026 / AI ORCHESTRATION & WEB STACK</span>
                  <span className="font-mono text-[0.55rem] text-stone">S/02</span>
                </div>
              </div>
            </Reveal>

            <div className="absolute -bottom-3 -left-3 z-20">
              <Annotation className="text-[0.85rem]" rotate={-6} arrow>
                modern tooling · ai-accelerated execution
              </Annotation>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Tape() {
  return (
    <div
      aria-hidden
      className="tape absolute -left-3 -top-2.5 h-5 w-20"
      style={{ transform: 'rotate(-14deg)' }}
    />
  );
}
