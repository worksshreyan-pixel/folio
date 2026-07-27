'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { id: 'work', label: 'Work', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'about', label: 'Toolkit', n: '03' },
  { id: 'process', label: 'Approach', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('work');
  const [activeLabel, setActiveLabel] = useState('Work');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = ['work', 'about', 'process', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const curLabel =
            id === 'about'
              ? 'About'
              : id === 'work'
              ? 'Work'
              : id === 'process'
              ? 'Approach'
              : 'Contact';
          setActive(id);
          setActiveLabel(curLabel);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.8, 0.24, 1] }}
        className="fixed inset-x-0 top-4 z-50 mx-auto w-full px-5 sm:px-8 lg:px-12"
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-8 py-3 transition-all duration-500 ${
            scrolled
              ? 'border-white/20 bg-white/95 shadow-md ring-1 ring-black/5'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Brand — left column */}
          <div className="flex flex-1 items-center justify-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2.5"
              data-cursor="true"
            >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 font-display text-sm font-semibold text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
              S
            </span>
            </button>
          </div>

          {/* Desktop links — perfectly centered without absolute positioning */}
          <nav className="hidden shrink-0 items-center gap-4 md:flex">
            {links.map((l) => (
              <button
                key={`${l.id}-${l.label}`}
                onClick={() => go(l.id)}
                data-cursor="true"
                className="group relative flex items-center px-3 py-1.5"
              >
                <span
                  className={`font-mono text-[0.7rem] tracking-wide transition-colors ${
                    active === l.id && activeLabel === l.label ? 'text-ink' : 'text-stone'
                  }`}
                >
                  {l.n}
                </span>
                <span
                  className={`ml-1.5 link-underline font-display text-[0.9rem] ${
                    active === l.id && activeLabel === l.label ? 'text-ink' : 'text-graphite'
                  }`}
                >
                  {l.label}
                </span>
                {active === l.id && activeLabel === l.label && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-coral"
                    transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle — right column */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <button
              onClick={() => go('contact')}
              data-cursor="true"
              className="hidden rounded-full bg-[#1a1a1a] px-5 py-2 font-sans text-[0.85rem] font-medium tracking-tight text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-md sm:block"
            >
              Let&rsquo;s talk
            </button>
            {/* Mobile toggle */}
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop overlay that closes the menu on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/15 backdrop-blur-[1px] md:hidden"
            />

            {/* Premium floating mobile navigation panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-5 top-20 z-40 overflow-hidden rounded-2xl border border-rule/35 bg-[hsl(var(--paper)/0.96)] p-6 shadow-2xl backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.button
                    key={`${l.id}-${l.label}`}
                    onClick={() => go(l.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                    className="flex items-baseline gap-4 border-b border-rule/30 py-4 text-left last:border-b-0"
                  >
                    <span className="editorial-num text-stone/70 text-base">{l.n}</span>
                    <span className="display text-3xl text-ink">{l.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
