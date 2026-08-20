'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Tape,
  StickyNote,
  Stamp,
  Annotation,
  CornerMarks,
  PaperClip,
  MaskReveal,
  Magnetic,
  Reveal,
} from '@/components/paper-kit';

const MockSite = memo(function MockSite() {
  return (
    <div className="h-full w-full overflow-hidden bg-white text-ink">
      <div className="flex h-10 items-center gap-1.5 border-b border-stone/10 bg-stone/5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/80 shadow-sm" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/80 shadow-sm" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage/80 shadow-sm" />
        <div className="ml-3 h-4 flex-1 rounded-md bg-white shadow-sm ring-1 ring-black/5" />
      </div>
      <div className="relative h-[calc(100%-2.5rem)] overflow-hidden bg-[hsl(38_30%_98%)]">
        <style>{`
          @keyframes mocksite-scroll {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-50%); }
          }
          .animate-mocksite {
            animation: mocksite-scroll 15s linear infinite paused;
          }
          .group:hover .animate-mocksite {
            animation-play-state: running;
          }
        `}</style>
        <div className="absolute inset-x-0 top-0 animate-mocksite">
          {/* refined clean layout */}
          <div className="p-4">
            <div className="h-20 rounded-xl bg-gradient-to-br from-ink/5 to-ink/10 shadow-sm ring-1 ring-ink/5" />
            <div className="mt-4 h-2.5 w-3/4 rounded-full bg-ink/80" />
            <div className="mt-2 h-2.5 w-1/2 rounded-full bg-ink/40" />
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            <div className="h-16 rounded-lg bg-sage/20 ring-1 ring-sage/30" />
            <div className="h-16 rounded-lg bg-coral/10 ring-1 ring-coral/20" />
            <div className="h-16 rounded-lg bg-gold/10 ring-1 ring-gold/20" />
            <div className="h-16 rounded-lg bg-periwinkle/20 ring-1 ring-periwinkle/30" />
          </div>
          <div className="mt-4 px-4 pb-4">
            <div className="h-24 rounded-xl bg-ink/90 shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
});

// Hand-drawn arrow doodle component that animates as if being sketched
const SketchArrow = memo(function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      width="50"
      height="30"
      viewBox="0 0 50 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <motion.path
        d="M2 28 C 15 25, 32 24, 44 8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M36 10 L 44 8 L 41 18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.8, ease: 'easeInOut' }}
      />
    </svg>
  );
});

// Immediate load animation wrappers for bulletproof mounting near screen edges
const HeroMaskReveal = memo(function HeroMaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
});

const HeroReveal = memo(function HeroReveal({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
});

// Top-down Coffee Mug Component
const CoffeeMug = memo(function CoffeeMug({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 shadow-[0_15px_30px_rgba(0,0,0,0.18)] flex items-center justify-center border border-white/40 ${className}`}>
      {/* Handle */}
      <div className="absolute -right-3.5 top-6 w-4.5 h-8 rounded-r-md bg-stone-300 border-t border-b border-r border-white/20 shadow-md" />
      {/* Inner mug wall */}
      <div className="w-16 h-16 rounded-full bg-[#fcfcfc] border border-stone-200/50 shadow-inner flex items-center justify-center">
        {/* Coffee content */}
        <div className="w-13 h-13 rounded-full bg-[#3D2314] shadow-inner flex items-center justify-center">
          {/* Coffee crema swirl */}
          <div className="w-10 h-10 rounded-full border border-[#D4A373]/20 border-dashed rotate-45" />
        </div>
      </div>
    </div>
  );
});

const MetalRuler = memo(function MetalRuler({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`w-5 h-56 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-400 border border-stone-400 rounded shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col justify-between py-3 items-center select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex flex-col justify-between h-full w-full px-1">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="flex justify-between w-full h-px">
            <div className={`bg-stone-500/80 ${i % 5 === 0 ? 'w-2.5' : 'w-1.5'}`} />
            <div className={`bg-stone-500/80 ${i % 5 === 0 ? 'w-2.5' : 'w-1.5'}`} />
          </div>
        ))}
      </div>
    </div>
  );
});

const MechanicalPencil = memo(function MechanicalPencil({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`w-2.5 h-48 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-full shadow-[0_6px_15px_rgba(0,0,0,0.1)] flex flex-col justify-between py-1 relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Silver tip */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-stone-300 rounded-b-full border-t border-stone-400/30 flex justify-center items-end">
        <div className="w-1 h-2 bg-stone-800 rounded-b-full" />
      </div>
      {/* Silver pocket clip */}
      <div className="absolute top-4 -right-1 w-1.5 h-10 bg-stone-300 rounded shadow-sm" />
      {/* Eraser cap */}
      <div className="w-full h-3 bg-stone-300 rounded-t-full flex justify-center items-start">
        <div className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-0.5" />
      </div>
    </div>
  );
});

const ColorSwatches = memo(function ColorSwatches({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`relative w-28 h-10 select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {[
        { color: 'bg-sage', rot: -20 },
        { color: 'bg-coral', rot: -10 },
        { color: 'bg-gold', rot: 0 },
        { color: 'bg-stone-400', rot: 10 },
        { color: 'bg-ink', rot: 20 },
      ].map((sw, i) => (
        <div
          key={i}
          className={`absolute left-0 bottom-0 w-24 h-5 ${sw.color} rounded-sm border border-white/30 shadow-sm origin-left`}
          style={{ transform: `rotate(${sw.rot}deg)` }}
        />
      ))}
      {/* Grommet eyelet */}
      <div className="absolute left-1.5 bottom-1.5 w-2 h-2 rounded-full bg-stone-300 border border-stone-500 shadow-inner flex items-center justify-center">
        <div className="w-0.5 h-0.5 rounded-full bg-white" />
      </div>
    </div>
  );
});

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Buttery smooth parallax springs (Linear/Framer influence)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothOptions = { damping: 50, stiffness: 100, mass: 0.5 };
  const smx = useSpring(mx, smoothOptions);
  const smy = useSpring(my, smoothOptions);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const el = ref.current;
    if (!el) return;

    let r = el.getBoundingClientRect();
    const handleResize = () => {
      r = el.getBoundingClientRect();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        // Spotlight coordinates directly on DOM node style properties (avoids React re-renders)
        const mouseX = e.clientX - r.left;
        const mouseY = e.clientY - r.top;
        const spotlight = spotlightRef.current;
        if (spotlight) {
          spotlight.style.setProperty('--mouse-x', `${mouseX}px`);
          spotlight.style.setProperty('--mouse-y', `${mouseY}px`);
        }

        // Mouse Parallax - disable on tablet/mobile screens (< 1024px)
        if (window.innerWidth < 1024) {
          mx.set(0);
          my.set(0);
          return;
        }

        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        // Intensity reduced by 40% (multiplier of 1.2 instead of 2.0)
        mx.set(x * 1.2);
        my.set(y * 1.2);
      });
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[hsl(38_20%_97%)] px-6 py-20 sm:px-12 lg:px-20"
    >
      {/* Vignette Shadow Frame around pages */}
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.04)]" />

      {/* V2 ultra-subtle blueprint background (static layer to avoid paint costs) */}
      <div className="blueprint-lines pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply" />

      {/* Dynamic Cursor Spotlight Overlay (GPU-accelerated, uses CSS variables directly) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-55 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,244,214,0.45), transparent 85%)`
        }}
      />

      {/* Background Watermark Outlines */}
      <div className="pointer-events-none absolute left-10 bottom-24 z-0 font-display text-[15vw] font-bold text-ink/[0.015] tracking-tighter select-none">
        SHREYAN.STUDIO
      </div>
      <div className="pointer-events-none absolute left-12 top-28 z-0 font-mono text-[7vw] font-bold text-ink/[0.01] tracking-widest select-none">
        01_INDEX
      </div>

      {/* Technical drafting guides and crop marks on canvas */}
      <div className="pointer-events-none absolute inset-x-8 top-12 bottom-12 border-l border-r border-ink/[0.03] z-0 flex justify-between">
        <span className="font-mono text-[0.45rem] text-ink/20 p-2">[Y: 00px]</span>
        <span className="font-mono text-[0.45rem] text-ink/20 p-2">[W: 100%]</span>
      </div>

      {/* Static drafting marks (static to avoid rendering updates) */}
      <div className="absolute right-16 top-24 text-[1.4rem] text-ink/[0.08] select-none pointer-events-none font-sans">
        ○
      </div>
      <div className="absolute left-1/4 bottom-36 text-[1.1rem] text-ink/[0.08] select-none pointer-events-none font-sans">
        +
      </div>

      {/* Large coordinates in background */}
      <div className="absolute right-8 top-10 font-mono text-[0.55rem] text-ink/20 select-none pointer-events-none hidden md:block">
        LAT: 19.076 / LONG: 72.877
      </div>

      <CornerMarks className="opacity-45" />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        {/* ---------------- LEFT: Typography & Hierarchy ---------------- */}
        <div className="relative z-10 flex flex-col justify-center lg:-translate-y-12">

          {/* Subtle measurement marker above label */}
          <div className="flex items-center gap-2 font-mono text-[0.55rem] text-ink/20 mb-3 select-none">
            <span className="w-6 h-px bg-ink/10" />
            <span>RESUME v2.01</span>
            <span className="w-6 h-px bg-ink/10" />
          </div>

          <HeroReveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-mono rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600">
                WIT Solapur · Class of 2029 · Building at AI Speed
              </span>
            </div>
          </HeroReveal>

          <div className="relative mt-2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[2.8rem] xl:text-[3.2rem] font-bold tracking-tight text-[#1a1a1a] leading-[1.1]">
              Shreyan Yemul — Computer Engineering Student & AI Full-Stack Developer
            </h1>

            {/* Hand-drawn arrow pointing from text to layout */}
            <SketchArrow className="absolute -left-14 top-1/2 text-coral/40 hidden xl:block -rotate-12" />
          </div>

          {/* Tiny Measurement details */}
          <div className="hidden xl:flex items-center gap-2 text-[0.55rem] font-mono text-ink/20 my-4 select-none">
            <span className="w-8 h-px bg-ink/10" />
            <span>GAP: 32px / 2.0rem</span>
            <span className="w-8 h-px bg-ink/10" />
          </div>

          <HeroReveal delay={0.24}>
            <div className="max-w-[500px]">
              <p className="font-sans text-[17px] font-medium leading-relaxed tracking-tight text-ink/75 lg:text-[19px]">
                2nd-year engineering student at Walchand Institute of Technology, Solapur. Architecting and shipping production-ready web applications, complex multi-table SaaS MVPs, and modern full-stack systems using Next.js, TypeScript, and Supabase.
              </p>
            </div>
          </HeroReveal>

          {/* V2 Refined CTA Section */}
          <HeroReveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  data-cursor="View work"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-[#1a1a1a] px-7 py-4 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:bg-black"
                >
                  <span className="font-sans text-[0.95rem] font-medium tracking-tight">Explore Featured Work ↗</span>
                </a>
              </Magnetic>
              <a
                href="https://www.linkedin.com/in/shreyan-yemul-b802b5417/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="true"
                className="group relative font-sans text-[0.95rem] font-medium tracking-tight text-ink/80 transition-colors hover:text-ink"
              >
                Connect on LinkedIn ↗
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </HeroReveal>

          {/* V2 Statistics - Clean & Subdued */}
          <HeroReveal delay={0.4}>
            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3 relative">
              <div>
                <div className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/40">Focus</div>
                <div className="mt-1 font-display text-[0.88rem] font-bold text-ink leading-snug">SaaS Architectures & Rapid MVPs</div>
              </div>
              <div>
                <div className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/40">Education</div>
                <div className="mt-1 font-display text-[0.88rem] font-bold text-ink leading-snug">WIT Solapur (2025–2029)</div>
              </div>
              <div>
                <div className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/40">Location</div>
                <div className="mt-1 font-display text-[0.88rem] font-bold text-ink leading-snug">Solapur, Maharashtra, India</div>
              </div>

              {/* Handcrafted drafting specs card */}
              <div className="absolute -right-24 bottom-2 opacity-35 select-none pointer-events-none font-mono text-[0.5rem] text-ink/40 tracking-wider hidden sm:block">
                [COORD: 54.12 / 12.09]
                <div className="w-10 h-1 bg-ink/15 mt-1" />
              </div>
            </div>
          </HeroReveal>
        </div>

        {/* ---------------- RIGHT: Elevated Desk Illustration ---------------- */}
        <div className="relative h-[560px] w-full sm:h-[680px] lg:h-[760px] lg:-translate-y-8">
          {mounted ? (
            <DeskScene smx={smx} smy={smy} />
          ) : (
            <div className="h-full w-full rounded-2xl bg-white/50" />
          )}
        </div>
      </div>

      {/* V2 Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ink/40">Scroll</span>
        <div className="flex h-10 w-6 justify-center rounded-full border border-ink/20 p-1">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-ink/60"
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          />
        </div>
      </div>
    </section>
  );
}

const DeskScene = memo(function DeskScene({ smx, smy }: { smx: any; smy: any }) {
  // Parallax tracking mouse (only for laptop)
  const tMidX = useTransform(smx, [-1, 1], [25, -25]);
  const tMidY = useTransform(smy, [-1, 1], [18, -18]);

  // 3D Mockup Tilt
  const rotateX = useTransform(smy, [-1, 1], [-2.5, 2.5]);
  const rotateY = useTransform(smx, [-1, 1], [2.5, -2.5]);

  return (
    <div className="relative h-full w-full">
      {/* Warm ambient spotlight behind laptop - removed expensive blur filter */}
      <div
        className="absolute left-[30%] top-[25%] -translate-x-1/2 w-64 h-64 rounded-full opacity-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,163,89,0.12) 0%, rgba(240,113,103,0.06) 50%, transparent 100%)'
        }}
      />

      {/* ---- MID LAYER: Laptop Device (Active mouse tracking + entrance) ---- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 0.8, 0.24, 1] }}
        className="absolute right-[5%] top-[20%] w-[85%] lg:w-[80%]"
      >
        <motion.div
          style={{ x: tMidX, y: tMidY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative group transition-shadow duration-300"
        >
          {/* Glassy, modern laptop frame (removed expensive backdrop-blur) */}
          <div className="rounded-t-2xl border border-white/20 bg-[#f0f0f0]/95 p-3 shadow-[0_30px_60px_rgb(0,0,0,0.12)] group-hover:shadow-[0_40px_70px_rgb(0,0,0,0.16)] ring-1 ring-black/5">
            <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-inner">
              {/* Refinement on Mocksite screen: realistic UI reflections */}
              <div className="relative h-[260px] sm:h-[320px]">
                <MockSite />
                {/* Diagonal glossy reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </div>
          </div>
          {/* Refined aluminum base */}
          <div className="relative h-4 rounded-b-[40%] bg-gradient-to-b from-[#e5e5e5] to-[#d4d4d4] shadow-md ring-1 ring-black/5" />
          <div className="mx-auto h-2 w-[30%] rounded-b-lg bg-[#b5b5b5] shadow-inner" />

          <Annotation className="absolute -right-6 top-8 max-w-[8rem] text-[0.85rem] font-medium text-coral" rotate={8}>
            pixel perfect
          </Annotation>
        </motion.div>
      </motion.div>

      {/* ---- FRONT LAYER: Floating Layout Wireframe (Entrance) ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute left-[2%] bottom-[15%] w-[45%] z-20 hidden sm:block"
      >
        {/* Crisp Sketch Sheet */}
        <div
          className="relative rounded-xl border border-ink/5 bg-white p-4 shadow-[0_15px_35px_rgb(0,0,0,0.06)]"
        >
          <Tape className="absolute -top-3 left-6 h-5 w-16 opacity-90" rotate={-8} />
          <div className="mb-2 flex items-center justify-between font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-ink/30">
            <span>Layout.v2</span>
            <span>iteration 04</span>
          </div>
          <svg viewBox="0 0 120 90" className="h-auto w-full text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="8" width="104" height="74" rx="4" />
            <line x1="8" y1="24" x2="112" y2="24" />
            <rect x="16" y="32" width="40" height="40" rx="2" />
            <rect x="64" y="32" width="40" height="16" rx="2" />
            <rect x="64" y="56" width="40" height="16" rx="2" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
});

