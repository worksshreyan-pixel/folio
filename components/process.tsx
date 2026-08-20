'use client';

import { Reveal, SectionIndex, CornerMarks, Annotation } from '@/components/paper-kit';

const capabilities = [
  {
    n: '01',
    title: 'Full-Stack System Design',
    desc: 'Structuring relational databases (PostgreSQL/Supabase), Row-Level Security (RLS), authentication flows, and storage.',
    color: 'sage',
    rotate: -1.5,
  },
  {
    n: '02',
    title: 'Modern Frontend & UX',
    desc: 'Building high-performance, responsive interfaces with Next.js, React, Tailwind CSS, and Framer Motion micro-interactions.',
    color: 'lavender',
    rotate: 1.2,
  },
  {
    n: '03',
    title: 'AI-Accelerated Delivery',
    desc: 'Directing modern AI tooling (Cursor, Bolt, Antigravity) to rapidly prototype and ship clean production codebases.',
    color: 'gold',
    rotate: -1,
  },
  {
    n: '04',
    title: 'End-to-End Deployment',
    desc: 'Managing the entire lifecycle from domain setup and transactional emails (Resend API) to hosting on Vercel and Cloudflare.',
    color: 'coral',
    rotate: 1.5,
  },
];

export function Process() {
  return (
    <section id="process" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />
      <div className="blueprint-lines pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="04" label="Capabilities" className="mb-12" />
        </Reveal>

        {/* heading */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="display max-w-4xl text-[9vw] leading-[0.9] text-ink sm:text-[6.5vw] lg:text-[5rem]">
                Engineering Capabilities<br />
                <span className="text-stone italic font-light">& Execution.</span>
              </h2>
              <Annotation className="mt-5 block text-[0.95rem]" rotate={-2}>
                built for WIT Solapur batch 2025–2029
              </Annotation>
            </div>
            <p className="max-w-xs text-pretty font-sans text-[0.95rem] leading-relaxed text-graphite lg:mb-2">
              Combining core academic computer engineering principles with AI-native workflows for lightning-fast, production-grade delivery.
            </p>
          </div>
        </Reveal>

        {/* 4-card grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08} className="h-full">
              <div
                className="paper-sheet relative rounded-xl border border-rule/60 p-6 sm:p-7 h-full flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
                style={{ transform: `rotate(${c.rotate}deg)` }}
              >
                {/* Tape detail */}
                <div
                  aria-hidden
                  className="tape absolute -top-1.5 left-1/2 h-4.5 w-14 -translate-x-1/2"
                  style={{
                    transform: 'translateX(-50%) rotate(-4deg)',
                    background: 'hsla(48,70%,78%,0.5)',
                  }}
                />
                
                <div>
                  <div className="editorial-num mb-5 text-2xl text-ink/30">{c.n}</div>
                  <h3 className="font-display text-lg font-bold text-ink leading-snug">{c.title}</h3>
                  <p className="mt-3.5 font-sans text-[0.85rem] leading-relaxed text-graphite">{c.desc}</p>
                </div>

                <div className="mt-6 border-t border-rule/30 pt-3 flex items-center justify-between">
                  <span className="editorial-label !text-[0.45rem]">SYSTEM REF / {c.n}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-coral opacity-40" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
