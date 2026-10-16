import { motion } from 'framer-motion';
import foodPhoto from '../../../../public/images/kochi-food.png';
import { EASE, Kicker, PhotoCard, Rule, SceneShell } from '../SceneBits';

export function Scene4() {
  return (
    <SceneShell tint="rgba(8,11,18,.25)">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,163,64,.16),transparent_28%),linear-gradient(145deg,#141817,#0b1017)]" />
      <PhotoCard src={foodPhoto} alt="Kochi street food shared by students" className="left-[9vw] top-[7vw] h-[34vw] w-[42vw]" rotate={-3} delay={.28} />
      <div className="absolute right-[9vw] top-[10vw] w-[31vw]">
        <Kicker>after class, before plans</Kicker>
        <motion.h2 className="display mt-[1.4vw] text-[6vw] font-bold leading-[.82] tracking-[-.05em]"
          initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .85, ease: EASE }}>
          Go where<br /><span style={{ color: 'var(--saffron)' }}>the flavour is.</span>
        </motion.h2>
        <Rule className="mt-[2.2vw] w-[19vw]" />
        <motion.p className="mt-[1vw] max-w-[23vw] text-[1.2vw] leading-[1.5] text-[#c6c8c3]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9, duration: .6 }}>
          From a chai break in Kalamassery to the best bite across Kochi — save the spots worth leaving campus for.
        </motion.p>
      </div>
      <motion.div className="absolute bottom-[5vw] right-[9vw] mono text-[.88vw] uppercase tracking-[.14em] text-[#9da4ad]"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: .5 }}>
        04 / food trails / kochi
      </motion.div>
    </SceneShell>
  );
}