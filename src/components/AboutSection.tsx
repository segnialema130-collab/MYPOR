import {motion} from 'motion/react';
import {BRAND_CONFIG} from '../data/portfolioData';

const ABOUT_PILLARS = [
  {
    title: 'Creative Journey',
    body: 'Starting from late-night timeline experiments cutting music visuals and creator stories, my focus grew into full-scale post-production—blending pacing, sound design, and color into cohesive visual narratives.',
  },
  {
    title: 'Editing Craft',
    body: 'Every frame earns its place. From tight A-roll story pruning and J/L-cut dialogue flow to optical-flow speed ramps and custom After Effects compositing, I shape raw footage with surgical precision.',
  },
  {
    title: 'Creative Vision',
    body: 'Editing is invisible architecture. Whether a 12-second 3D logo sting or a 20-minute YouTube documentary, the goal is identical: hold human attention effortlessly and make every beat memorable.',
  },
  {
    title: 'Professional Approach',
    body: 'Clear communication, organized project files, frame-accurate revision rounds, and reliable turnaround times—built so creators, agencies, and brands never have to chase deadlines.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Intro Column */}
          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">About Me</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Crafting Emotion, Rhythm, and Clarity in Every Cut
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Welcome to my <strong className="font-semibold text-white">{BRAND_CONFIG.brandName}</strong>. I&apos;m{' '}
              <strong className="font-semibold text-white">{BRAND_CONFIG.editorName}</strong>, partnering with YouTube
              creators, ambitious startups, and commercial directors to turn unpolished camera cards into films that
              command attention from the opening second.
            </p>

            <div className="mt-10 border-t border-orange-500/15 pt-7 flex flex-wrap gap-x-10 gap-y-5 text-base text-zinc-300">
              <div>
                <span className="block text-sm text-zinc-400">Primary Focus</span>
                <span className="mt-1 block text-lg font-semibold text-white">Cinematic &amp; Retention Editing</span>
              </div>
              <div>
                <span className="block text-sm text-zinc-400">Availability</span>
                <span className="mt-1 block text-lg font-semibold text-white">Freelance &amp; Retainers</span>
              </div>
            </div>
          </motion.div>

          {/* Right 2x2 Editorial Pillars Grid (separated by whitespace & hairline borders) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {ABOUT_PILLARS.map((pillar, idx) => (
              <motion.article
                key={pillar.title}
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1]}}
                className="rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/85 backdrop-blur-md p-7 sm:p-8 transition-colors duration-200 hover:border-orange-400/55 hover:bg-[#141210]/90"
              >
                <span className="font-mono text-sm font-semibold text-orange-400 tabular-nums">0{idx + 1}.</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3.5 text-base leading-relaxed text-zinc-300">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
