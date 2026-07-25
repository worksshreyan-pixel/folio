'use client';

import { MotionConfig } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ClientMotionConfig({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<'user' | 'always'>('user');

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setReducedMotion('always');
      } else {
        setReducedMotion('user');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <MotionConfig reducedMotion={reducedMotion}>
      {children}
    </MotionConfig>
  );
}
