import {motion} from 'motion/react';
import {SOFTWARE_SKILLS} from '../data/portfolioData';

function SoftwareBadgeIcon({code, accentColor, bgTint}: {code: string; accentColor: string; bgTint: string}) {
  if (code === 'CC') {
    return (
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15"
        style={{backgroundColor: bgTint}}
      >
        {/* Minimalist CapCut geometric chevron emblem */}
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M4 8.5L12 12L4 15.5V8.5ZM20 8.5L12 12L20 15.5V8.5Z"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M5 6H19M5 18H19" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-xl border font-display text-xl font-bold tracking-tight"
      style={{
        backgroundColor: bgTint,
        borderColor: `${accentColor}45`,
        color: accentColor,
      }}
    >
      {code}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-orange-500/15 bg-[#090808]/55 backdrop-blur-xs py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">Software &amp; Toolkit</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Industry-Standard Editing Stack
            </h2>
          </div>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed text-zinc-400">
            Mastery across timeline editing, keyframe compositing, vector graphics, and rapid social cutdowns.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SOFTWARE_SKILLS.map((skill, idx) => (
            <motion.article
              key={skill.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1]}}
              className="flex flex-col justify-between rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md p-7 transition-colors duration-200 hover:border-orange-400/55 hover:bg-[#151310]/95"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <SoftwareBadgeIcon
                    code={skill.code}
                    accentColor={skill.accentColor}
                    bgTint={skill.bgTint}
                  />
                  <span className="font-mono text-base font-bold text-orange-300 tabular-nums">
                    {skill.proficiency}%
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white">{skill.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{skill.specialty}</p>
              </div>

              {/* Compositor-only progress indicator */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-zinc-900">
                <motion.div
                  initial={{scaleX: 0}}
                  whileInView={{scaleX: skill.proficiency / 100}}
                  viewport={{once: true}}
                  transition={{duration: 0.75, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1]}}
                  style={{
                    transformOrigin: 'left',
                    background: 'linear-gradient(90deg, #F97316, #FBBF24)',
                  }}
                  className="h-full w-full rounded-full"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
