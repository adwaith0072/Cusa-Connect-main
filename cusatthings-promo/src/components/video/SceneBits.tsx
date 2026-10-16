import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;

export function SceneShell({
  children,
  className = '',
  tint = 'rgba(8, 11, 18, .28)',
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
}) {
  return (
    <motion.section
      className={`absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="absolute inset-0" style={{ background: tint }} />
      {children}
    </motion.section>
  );
}

export function Kicker({ children, color = 'var(--saffron)' }: { children: ReactNode; color?: string }) {
  return (
    <motion.div
      className="scene-label mono text-[1.05vw] font-medium"
      style={{ color }}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Rule({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`hairline ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.24, duration: 0.75, ease: EASE }}
    />
  );
}

export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <motion.div
      className={`display font-bold tracking-[-.04em] leading-[.78] ${small ? 'text-[2.1vw]' : 'text-[3.1vw]'}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38, duration: 0.7, ease: EASE }}
    >
      CUSAT<span style={{ color: 'var(--saffron)' }}>THINGS</span>
    </motion.div>
  );
}

export function PhotoCard({
  src,
  alt,
  className = '',
  delay = 0.55,
  rotate = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className={`absolute overflow-hidden border border-white/15 bg-[#17202b] shadow-[0_24px_80px_rgba(0,0,0,.4)] ${className}`}
      initial={{ opacity: 0, scale: .84, rotate: rotate - 4, y: 20 }}
      animate={{ opacity: 1, scale: 1, rotate, y: 0 }}
      transition={{ delay, duration: 1.05, ease: EASE }}
    >
      <img className="photo h-full w-full" src={src} alt={alt} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#080b12]/35 via-transparent to-[#f4a340]/10" />
    </motion.div>
  );
}

export function NumberChip({ children, color = 'var(--saffron)' }: { children: ReactNode; color?: string }) {
  return (
    <motion.div
      className="mono flex h-[3.15vw] w-[3.15vw] items-center justify-center rounded-full border text-[1.05vw]"
      style={{ borderColor: color, color }}
      initial={{ scale: .4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: .48, type: 'spring', stiffness: 260, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export function Orbit({ className = '', color = 'var(--saffron)' }: { className?: string; color?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full border ${className}`}
      style={{ borderColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  );
}