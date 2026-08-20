'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Reveal,
  SectionIndex,
  CornerMarks,
  Tape,
  Stamp,
  PaperClip,
  PencilArrow,
  Annotation,
} from '@/components/paper-kit';
import {
  BrowserMock,
  DealItSite,
  DeltSite,
  AnnotationChip,
} from '@/components/browser-mock';
import { ArrowUpRight } from 'lucide-react';

type Spec = { label: string; value: string };

type Project = {
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  url: string;
  tech: string[];
  specs: Spec[];
  notes: { text: string; color?: 'gold' | 'coral' | 'sage' | 'lavender'; rotate?: number; pos: string }[];
  tapeColor: 'gold' | 'coral' | 'sage' | 'lavender';
  renderSite: () => JSX.Element;
  featured?: boolean;
  statusBadge?: string;
  focusAreas?: string[];
  githubUrl?: string;
  isTemplate?: boolean;
};

const projects: Project[] = [
  {
    index: '01',
    name: 'DELT',
    tagline: 'SaaS for Secure Digital Delivery & Private Client Deals',
    category: 'SaaS / Private Transactions',
    year: '2026',
    description:
      'Architected a full-scale digital deal-closing platform integrating private file delivery, OTP verification, live deal negotiation, and automated storage clean-up.',
    url: 'https://www.delt.website',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase (Auth, RLS, Storage)', 'Resend API', 'Vercel'],
    specs: [
      { label: 'Industry', value: 'SaaS / Private Transactions' },
      { label: 'Role', value: 'Full-Stack Product Architect & Builder' },
      { label: 'Technology', value: 'Next.js, Supabase, Resend API' },
      { label: 'Status', value: 'In Active Development' },
    ],
    notes: [
      { text: 'OTP & Payment Gated Delivery', color: 'sage', rotate: -3, pos: '-left-6 top-8' },
      { text: 'Real-time Client Chat & Negotiation', color: 'coral', rotate: 5, pos: 'right-2 -bottom-6' },
      { text: 'Multi-Table Relational Schema', color: 'gold', rotate: -1.5, pos: 'left-12 -bottom-8' },
    ],
    tapeColor: 'sage',
    renderSite: DeltSite,
    featured: true,
    statusBadge: 'In Active Development (Alpha Build)',
    focusAreas: [
      'Private Deal Engine: Instant deal generation with auto-expiring links, deliverable versioning, and direct download bundles.',
      'Security & Verification: OTP-gated file access, custom domain verification via Resend, and database-level Row Level Security (RLS).',
      'Real-Time Negotiation: Live client ↔ creator chat with counter-proposals and price change requests.',
      'Automated Lifecycle: Supabase storage tracking, deal credit management, and automated file expiration clean-up.',
    ],
  },
  {
    index: '02',
    name: 'Deal-it V1',
    tagline: 'Initial Proof-of-Concept for Private Digital Transactions',
    category: 'SaaS Concept & Prototype',
    year: '2026',
    description:
      'The initial proof-of-concept for DELT exploring escrow workflows, creator-client delivery interfaces, and cloud storage integrations.',
    url: 'https://dealit-ashen.vercel.app',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    specs: [
      { label: 'Industry', value: 'SaaS Prototype' },
      { label: 'Role', value: 'UI/UX & Architectural Proof-of-Concept' },
      { label: 'Technology', value: 'Next.js & Supabase' },
      { label: 'Status', value: 'Completed Prototype' },
    ],
    notes: [
      { text: 'escrow vault — funds held until delivery', color: 'sage', rotate: -3, pos: '-left-6 top-8' },
      { text: 'AI-assisted workflow → rapid MVP', color: 'coral', rotate: 5, pos: 'right-2 -bottom-6' },
    ],
    tapeColor: 'lavender',
    renderSite: DealItSite,
    featured: true,
    statusBadge: 'SaaS Concept · V1 Prototype (Completed)',
    focusAreas: [
      'Core Deal Flow: Validated initial creator-to-client private link sharing model.',
      'Escrow Concept UI: Prototyped funds-held state and deliverable milestones.',
      'Foundation for DELT: Provided the architectural validation leading to the commercial DELT platform.',
    ],
  },
];

const stamps: Record<string, { text: string; color: 'sage' | 'coral' | 'gold'; rotate: number; pos: string }> = {
  '01': { text: 'Active', color: 'sage', rotate: -8, pos: '-top-10 -right-6' },
  '02': { text: 'Prototype', color: 'coral', rotate: 12, pos: '-bottom-10 right-10' },
};

export function Work() {
  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      {/* section header */}
      <Reveal className="mx-auto mb-20 max-w-[1280px]">
        <SectionIndex n="01" label="Selected Work" className="mb-8" />
        <div className="flex flex-col items-start justify-between gap-6 border-t border-rule pt-8 lg:flex-row lg:items-end">
          <h2 className="display max-w-3xl text-[10vw] leading-[0.9] text-ink sm:text-[7vw] lg:text-[5.5rem]">
            Works,<br />
            <span className="text-stone">Crafted</span>
          </h2>
          <p className="max-w-xs text-pretty font-sans text-[0.95rem] leading-relaxed text-graphite">
            Each one designed and developed end-to-end — from the first
            sketch to the final deploy. Hover the previews to peek inside.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-32 lg:gap-48">
        {projects.map((p, i) => (
          <ProjectSpread key={p.index} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectSpread({ project, flip }: { project: Project; flip: boolean }) {
  const [inView, setInView] = useState(false);

  const currentStamp = stamps[project.index];

  const handleRequestSimilar = (projectName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('prefill-contact', {
            detail: {
              message: `Hi Shreyan! I am interested in requesting a website similar to the "${projectName}". Let's discuss details.`,
            },
          })
        );
      }, 300);
    }
  };

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '200px' }}
      className="relative px-6 py-12 border border-ink/[0.03] rounded-2xl bg-paper/20 my-10"
    >
      <CornerMarks className="opacity-20 pointer-events-none" />
      <div className="absolute inset-0 blueprint-lines pointer-events-none opacity-[0.05]" />
      {/* big watermark index (static to avoid expensive GPU repaints on scroll) */}
      <div
        className="pointer-events-none absolute -top-16 right-0 z-0 select-none opacity-[0.07]"
        aria-hidden
      >
        <span className="editorial-num text-[18rem] leading-none text-ink">
          {project.index}
        </span>
      </div>

      {/* status / featured badge */}
      {project.statusBadge ? (
        <Reveal className="absolute -top-10 left-0 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-amber-700">
            {project.index === '01' && (
              <span className="relative flex h-2 w-2" style={{ transform: 'translateZ(0)' }}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 will-change-[transform,opacity]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {project.statusBadge}
          </span>
        </Reveal>
      ) : project.featured ? (
        <Reveal className="absolute -top-10 left-0 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/50 bg-paper px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-coral">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Featured Project
          </span>
        </Reveal>
      ) : null}

      <div
        className={`relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? 'lg:[direction:rtl]' : ''
          }`}
      >
        {/* editorial info */}
        <div className="lg:[direction:ltr]">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="editorial-num text-xl text-ink">{project.index}</span>
              <span className="h-px w-8 bg-rule" />
              <span className="editorial-label">{project.category}</span>
              <span className="editorial-label text-rule">· {project.year}</span>
            </div>

            <h3 className="display text-[9vw] leading-[0.9] text-ink sm:text-[6vw] lg:text-[4.4rem] mt-3">
              {project.name}
            </h3>

            <p className="mt-3 font-display text-lg italic text-stone">{project.tagline}</p>

            <p className="mt-5 max-w-md text-pretty font-sans text-[0.98rem] leading-relaxed text-graphite">
              {project.description}
            </p>
          </Reveal>

          {/* Grouped details to reduce multiple IntersectionObserver instances */}
          <Reveal delay={0.15}>
            {/* tech tags as a designed system */}
            <div className="mt-7">
              <div className="editorial-label mb-2.5">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-ink/20 bg-paper-2/60 px-2.5 py-1 font-mono text-[0.68rem] text-graphite"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* genuine specs — no fake metrics */}
            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-rule pt-5 sm:grid-cols-4">
              {project.specs.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[0.92rem] font-medium text-ink">{s.value}</div>
                  <div className="editorial-label !text-[0.52rem]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* focus areas */}
            {project.focusAreas && (
              <div className="mt-7">
                <div className="editorial-label mb-2.5">
                  {project.isTemplate ? 'Key Features & Systems' : 'What I worked on'}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {project.focusAreas.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 font-sans text-[0.82rem] text-graphite">
                      <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={project.isTemplate ? 'View Live Demo' : 'View Project'}
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-display text-[0.95rem] text-ink transition-all duration-300 hover:gap-3.5"
              >
                {project.isTemplate ? 'View Live Demo' : 'View Project'}
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {project.isTemplate && (
                <button
                  onClick={() => handleRequestSimilar(project.name)}
                  data-cursor="Request this"
                  className="group inline-flex items-center gap-2 border-b border-coral pb-1 font-display text-[0.95rem] text-coral transition-all duration-300 hover:gap-3.5 cursor-pointer bg-transparent text-left"
                >
                  Request Similar Website
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>
          </Reveal>
        </div>

        {/* browser mock + annotations */}
        <div className="relative lg:[direction:ltr]">
          <div className="relative z-10">
            {/* Added Paperclip for extra tactile feel */}
            <PaperClip className="absolute -left-2 -top-4 z-30" rotate={-15} />

            <BrowserMock
              url={project.url}
              renderSite={project.renderSite}
              rotate={flip ? 3 : -3}
              tapeColor={project.tapeColor}
              index={project.index}
              inView={inView}
            />

            {/* Stamp Layer */}
            {currentStamp && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: currentStamp.rotate }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`absolute z-30 ${currentStamp.pos}`}
              >
                <Stamp rotate={currentStamp.rotate} color={currentStamp.color}>
                  {currentStamp.text}
                </Stamp>
              </motion.div>
            )}
          </div>

          {/* pinned annotation notes (static wrapper to prevent scroll calculations) */}
          {project.notes.map((note, ni) => (
            <motion.div
              key={ni}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ni * 0.05, ease: 'easeOut' }}
              className={`absolute z-20 ${note.pos}`}
            >
              <AnnotationChip
                rotate={note.rotate}
                color={note.color as 'gold' | 'coral' | 'sage'}
              >
                {note.text}
              </AnnotationChip>
            </motion.div>
          ))}

          {/* Pencil Arrow doodles in background */}
          {project.index === '01' && (
            <PencilArrow direction="down-right" className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden xl:block" />
          )}
          {project.index === '02' && (
            <PencilArrow direction="curved" className="absolute -right-20 top-1/4 opacity-30 pointer-events-none hidden xl:block" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
