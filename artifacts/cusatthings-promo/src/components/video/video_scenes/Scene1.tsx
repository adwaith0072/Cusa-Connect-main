import { motion } from 'framer-motion';
import logo from '@assets/825952776-bw_logo_(1)_1786532301695.png';
import { EASE, Kicker, Orbit, SceneShell } from '../SceneBits';

export function Scene1() {
  return (
    <SceneShell tint="linear-gradient(110deg, rgba(8,11,18,.95) 10%, rgba(8,11,18,.68) 55%, rgba(8,11,18,.18))">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(100,183,166,.18),transparent_34%),radial-gradient(circle_at_18%_90%,rgba(244,163,64,.12),transparent_32%)]" />
      <motion.div className="absolute -right-[9vw] -top-[20vw] h-[58vw] w-[58vw] rounded-full border border-[#64b7a6]/20"
        animate={{ rotate: -360, scale: [1, 1.04, 1] }} transition={{ rotate: { duration: 32, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity } }} />
      <Orbit className="left-[52vw] top-[10vw] h-[30vw] w-[30vw] opacity-40" color="var(--coral)" />
      <div className="absolute left-[9vw] top-[9vw]">
        <Kicker>Cochin University of Science &amp; Technology</Kicker>
        <motion.div className="mt-[2.6vw] text-[7.8vw] leading-[.78] tracking-[-.055em] display font-bold"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: 1.05, ease: EASE }}>
          Your<br /><span style={{ color: 'var(--saffron)' }}>campus.</span>
        </motion.div>
        <motion.div className="mt-[2.4vw] flex items-center gap-[1.2vw]"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .9, duration: .65, ease: EASE }}>
          <div className="h-[.24vw] w-[4vw] bg-[var(--saffron)]" />
          <span className="text-[1.4vw] tracking-[-.02em] text-[#d2d0c9]">in one shared frequency</span>
        </motion.div>
      </div>
      <motion.img src={logo} alt="CusatThings" className="absolute right-[10vw] top-[14vw] h-[15vw] w-[15vw] object-contain"
        initial={{ opacity: 0, scale: .65, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .65, duration: 1.15, ease: EASE }} />
      <motion.div className="absolute bottom-[4.8vw] left-[9vw] mono text-[.92vw] tracking-[.12em] text-[#9da4ad]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: .6 }}>
        10°02′N / 76°20′E <span className="mx-[.7vw] text-[var(--saffron)]">—</span> SOUTH KALAMASSERY, KOCHI
      </motion.div>
    </SceneShell>
  );
}