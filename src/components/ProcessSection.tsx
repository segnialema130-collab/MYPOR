import {motion} from 'motion/react';
import {WORK_PROCESS} from '../data/portfolioData';

export function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">My Work Process</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              From Raw Footage to Final Master
            </h2>
          </div>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed text-zinc-400">
            A structured six-stage workflow designed for predictable timelines, clear creative alignment, and broadcast-ready results.
          </p>
        </div>

        {/* Modern Timeline Grid */}
        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORK_PROCESS.map((item, idx) => (
            <motion.article
              key={item.step}
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1]}}
              className="relative flex flex-col justify-between rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md p-7 sm:p-8 transition-colors duration-200 hover:border-orange-400/55 hover:bg-[#151310]/95"
            >
              <div>
                <div className="flex items-center justify-between border-b border-orange-500/12 pb-4">
                  <span className="font-mono text-2xl font-bold text-orange-400 tabular-nums">
                    {item.step}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">{item.turnaround}</span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-300">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
