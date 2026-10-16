import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';
import { EASE, Kicker, Orbit, Rule, SceneShell, Wordmark } from '../SceneBits';

export function Scene6() {
  return (
    <SceneShell tint="rgba(8,11,18,.15)">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(100,183,166,.15),transparent_31%),linear-gradient(140deg,#0b1118,#151b21)]" />
      <motion.div className="absolute left-1/2 top-1/2 h-[28vw] w-[28vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--teal)]/35"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <Orbit className="left-[32vw] top-[9vw] h-[36vw] w-[36vw] opacity-45" color="var(--saffron)" />
      <motion.div className="absolute left-[9vw] top-[9vw]">
        <Kicker color="var(--teal)">your campus, in motion</Kicker>
        <motion.div className="mt-[2.2vw] display text-[7vw] font-bold leading-[.8] tracking-[-.06em]"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28, duration: .9, ease: EASE }}>
          Keep<br /><span style={{ color: 'var(--saffron)' }}>close.</span>
        </motion.div>
        <motion.div className="mt-[2.2vw] flex items-center gap-[1vw]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85, duration: .55 }}>
          <Rule className="w-[6vw]" />
          <span className="text-[1.18vw] text-[#c6c8c3]">everything that makes CUSAT yours</span>
        </motion.div>
      </motion.div>
      <motion.img src={logo} alt="CusatThings logo" className="absolute left-1/2 top-[10vw] h-[19vw] w-[19vw] -translate-x-1/2 object-contain"
        initial={{ opacity: 0, scale: .55, rotate: 8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .44, duration: 1.1, ease: EASE }} />
      <div className="absolute bottom-[5vw] right-[9vw] text-right">
        <Wordmark small />
        <motion.div className="mono mt-[.8vw] text-[.85vw] tracking-[.16em] text-[#9da4ad]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: .5 }}>
          CUSAT / SOUTH KALAMASSERY / KOCHI
        </motion.div>
      </div>
      <motion.div className="absolute bottom-[4.8vw] left-[9vw] mono text-[.82vw] uppercase tracking-[.14em] text-[#9da4ad]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: .5 }}>
        Built for the in-between moments.
      </motion.div>
    </SceneShell>
  );
}