import { motion } from 'framer-motion';
import campusPhoto from '../../../../public/images/campus-blue-hour.png';
import { EASE, Kicker, PhotoCard, Rule, SceneShell } from '../SceneBits';

export function Scene2() {
  return (
    <SceneShell tint="linear-gradient(90deg, rgba(8,11,18,.87) 0%, rgba(8,11,18,.4) 52%, rgba(8,11,18,.24))">
      <motion.img src={campusPhoto} alt="Cochin University campus at blue hour" className="photo absolute inset-0 h-full w-full opacity-75"
        initial={{ scale: 1.13, x: '3%' }} animate={{ scale: 1, x: '0%' }} transition={{ duration: 6.6, ease: 'linear' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,transparent,rgba(8,11,18,.78)_78%)]" />
      <div className="absolute left-[9vw] top-[10vw] w-[35vw]">
        <Kicker color="var(--teal)">the place where it starts</Kicker>
        <motion.h2 className="display mt-[1.6vw] text-[6.3vw] font-bold leading-[.83] tracking-[-.05em]"
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .8, ease: EASE }}>
          Between<br /><span className="text-[#d1d5d0]">the gates.</span>
        </motion.h2>
        <Rule className="mt-[2.3vw] w-[21vw]" />
        <motion.p className="mt-[1.1vw] max-w-[23vw] text-[1.2vw] leading-[1.5] text-[#c6c8c3]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .92, duration: .7 }}>
          Lectures, late walks, small wins — the campus has a rhythm of its own.
        </motion.p>
      </div>
      <PhotoCard src={campusPhoto} alt="CUSAT campus architecture" className="right-[9vw] top-[10vw] h-[27vw] w-[28vw]" rotate={3} delay={.72} />
      <motion.div
        className="absolute bottom-[4.2vw] right-[9vw] h-[8vw] w-[17vw] overflow-hidden border border-[var(--teal)]/35 bg-[#0c151b]/85 p-[.8vw] backdrop-blur-sm"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: .6, ease: EASE }}
      >
        <div className="mono text-[.68vw] uppercase tracking-[.12em] text-[var(--teal)]">campus map / 01</div>
        <svg className="mt-[.35vw] h-[5vw] w-full" viewBox="0 0 260 78" fill="none" aria-label="Abstract campus map">
          <path d="M8 62C38 54 32 28 69 35C103 42 104 14 134 22C168 31 173 61 205 47C226 38 237 15 254 9" stroke="rgba(233,228,214,.42)" strokeWidth="2" />
          <path d="M24 10L65 25L92 8L139 48L178 18L238 62" stroke="rgba(100,183,166,.6)" strokeWidth="1.2" strokeDasharray="4 5" />
          <circle cx="69" cy="35" r="4" fill="#f4a340" />
          <circle cx="134" cy="22" r="4" fill="#ed6d54" />
          <circle cx="205" cy="47" r="4" fill="#64b7a6" />
          <circle cx="69" cy="35" r="8" stroke="#f4a340" strokeOpacity=".35" />
        </svg>
        <div className="absolute bottom-[.65vw] right-[.8vw] mono text-[.62vw] text-[#9da4ad]">find your way in</div>
      </motion.div>
      <motion.div className="absolute bottom-[2.3vw] right-[9vw] flex items-center gap-[.8vw] mono text-[.85vw] text-[#c6c8c3]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: .6 }}>
        <span className="h-[.55vw] w-[.55vw] rounded-full bg-[var(--teal)]" /> CUSAT / CAMPUS LOG 01
      </motion.div>
    </SceneShell>
  );
}