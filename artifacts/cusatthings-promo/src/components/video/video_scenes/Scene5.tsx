import { motion } from 'framer-motion';
import tripPhoto from '../../../../public/images/backwater-trip.png';
import { EASE, Kicker, NumberChip, PhotoCard, SceneShell } from '../SceneBits';

export function Scene5() {
  return (
    <SceneShell tint="rgba(8,11,18,.3)">
      <motion.img src={tripPhoto} alt="Kerala backwater trip near Kochi" className="photo absolute inset-0 h-full w-full opacity-58"
        initial={{ scale: 1.18, y: '2%' }} animate={{ scale: 1, y: '0%' }} transition={{ duration: 6.1, ease: 'linear' }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,18,.92) 0%,rgba(8,11,18,.52) 48%,rgba(8,11,18,.15) 100%)]" />
      <div className="absolute left-[9vw] top-[10vw]">
        <Kicker color="var(--teal)">the weekend, re-routed</Kicker>
        <motion.h2 className="display mt-[1.4vw] text-[6.7vw] font-bold leading-[.79] tracking-[-.05em]"
          initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28, duration: .9, ease: EASE }}>
          Take the<br /><span style={{ color: 'var(--teal)' }}>long way.</span>
        </motion.h2>
        <motion.p className="mt-[2vw] max-w-[24vw] text-[1.2vw] leading-[1.5] text-[#d1d5d0]"
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .88, duration: .65, ease: EASE }}>
          Day trips, hidden corners, and a little more Kerala than your timetable planned.
        </motion.p>
      </div>
      <PhotoCard src={tripPhoto} alt="Students taking a Kerala backwater trip" className="right-[10vw] top-[9vw] h-[29vw] w-[28vw]" rotate={5} delay={.55} />
      <motion.div className="absolute bottom-[5vw] left-[9vw] flex items-center gap-[1vw]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <NumberChip color="var(--teal)">05</NumberChip>
        <div className="mono text-[.88vw] uppercase tracking-[.13em] text-[#c6c8c3]">routes worth remembering</div>
      </motion.div>
    </SceneShell>
  );
}