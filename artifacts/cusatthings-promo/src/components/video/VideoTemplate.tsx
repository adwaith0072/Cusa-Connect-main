import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

const SCENE_DURATIONS = {
  intro: 3400,
  campus: 3900,
  people: 3600,
  food: 3900,
  trips: 3700,
  lockup: 4200,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div className="video-frame">
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute left-[3vw] top-[3vw] h-[.55vw] w-[.55vw] rounded-full bg-[var(--saffron)]" />
        <div className="absolute right-[3vw] top-[3vw] mono text-[.78vw] tracking-[.14em] text-[#9da4ad]">CUSAT THINGS / 2025</div>
        <div className="absolute bottom-[3vw] right-[3vw] mono text-[.75vw] tracking-[.12em] text-[#9da4ad]">01—06</div>
      </div>
      <motion.div
        className="pointer-events-none absolute left-[-12vw] top-[-17vw] z-[1] h-[50vw] w-[50vw] rounded-full bg-[var(--saffron)]/8 blur-3xl"
        animate={{
          x: currentScene === 0 ? '0vw' : currentScene === 1 ? '15vw' : currentScene === 2 ? '32vw' : currentScene === 3 ? '55vw' : '25vw',
          y: currentScene === 4 ? '18vw' : '0vw',
          scale: currentScene === 5 ? .74 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-16vw] right-[-12vw] z-[1] h-[48vw] w-[48vw] rounded-full bg-[var(--teal)]/8 blur-3xl"
        animate={{
          x: currentScene === 2 ? '-18vw' : currentScene === 5 ? '-4vw' : '0vw',
          y: currentScene === 3 ? '-14vw' : '0vw',
          scale: currentScene === 1 ? .75 : 1,
        }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <AnimatePresence mode="sync">
        {currentScene === 0 && <Scene1 key="scene-1" />}
        {currentScene === 1 && <Scene2 key="scene-2" />}
        {currentScene === 2 && <Scene3 key="scene-3" />}
        {currentScene === 3 && <Scene4 key="scene-4" />}
        {currentScene === 4 && <Scene5 key="scene-5" />}
        {currentScene === 5 && <Scene6 key="scene-6" />}
      </AnimatePresence>
    </div>
  );
}
