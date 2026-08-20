'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';

const Work = dynamic(() => import('@/components/work').then((m) => m.Work), { ssr: true });
const About = dynamic(() => import('@/components/about').then((m) => m.About), { ssr: true });
const Process = dynamic(() => import('@/components/process').then((m) => m.Process), { ssr: true });
const Contact = dynamic(() => import('@/components/contact').then((m) => m.Contact), { ssr: false });
const Footer = dynamic(() => import('@/components/footer').then((m) => m.Footer), { ssr: true });

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.3 });

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-coral"
      />
      <Navigation />
      <main className="relative">
        <Hero />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
