import { motion } from 'framer-motion';
import studentPhoto from '../../../../public/images/student-courtyard.png';
import { EASE, Kicker, NumberChip, PhotoCard, SceneShell } from '../SceneBits';

export function Scene3() {
  return (
    <SceneShell tint="rgba(8,11,18,.3)">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#111825_0%,#0a0f18_55%,#152622_100%)]" />
      <motion.div className="absolute -right-[7vw] -top-[10vw] h-[42vw] w-[42vw] rounded-full bg-[#ed6d54]/18 blur-3xl"
        animate={{ scale: [1, 1.12, 1], x: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute left-[9vw] top-[9vw]">
        <Kicker color="var(--coral)">not just a noticeboard</Kicker>
        <motion.h2 className="display mt-[1.3vw] w-[35vw] text-[6.4vw] font-bold leading-[.82] tracking-[-.05em]"
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .85, ease: EASE }}>
          Find your<br /><span style={{ color: 'var(--coral)' }}>people.</span>
        </motion.h2>
        <motion.p className="mt-[2.1vw] max-w-[23vw] text-[1.2vw] leading-[1.5] text-[#c6c8c3]"
          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .82, duration: .6, ease: EASE }}>
          Clubs, circles, side quests. The good stuff moves fast — keep up.
        </motion.p>
      </div>
      <PhotoCard src={studentPhoto} alt="Students gathering on campus" className="right-[10vw] top-[7vw] h-[33vw] w-[30vw]" rotate={-4} delay={.45} />
      <motion.div className="absolute bottom-[5vw] left-[9vw] flex items-center gap-[1.1vw]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <NumberChip color="var(--coral)">03</NumberChip>
        <div className="mono text-[.9vw] uppercase tracking-[.12em] text-[#9da4ad]">clubs / events / collabs</div>
      </motion.div>
      <motion.div className="absolute bottom-[8vw] right-[8vw] h-[5vw] w-[5vw] border border-[var(--saffron)]/60"
        animate={{ rotate: [0, 90, 180], scale: [1, .84, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
    </SceneShell>
  );
}