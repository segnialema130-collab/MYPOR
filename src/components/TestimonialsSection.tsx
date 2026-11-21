import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, Quote} from 'lucide-react';
import {TESTIMONIALS} from '../data/portfolioData';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="border-t border-orange-500/15 bg-[#090808]/55 backdrop-blur-xs py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">Client Feedback</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Trusted by Creators &amp; Brands
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-orange-500/20 bg-[#0E0D0C]/85 text-zinc-200 transition-colors hover:border-orange-400/60 hover:text-orange-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-orange-500/20 bg-[#0E0D0C]/85 text-zinc-200 transition-colors hover:border-orange-400/60 hover:text-orange-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Slider Card */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/90 backdrop-blur-md p-8 sm:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
            >
              <Quote className="h-10 w-10 text-orange-400/80" aria-hidden="true" />

              <blockquote className="mt-6 max-w-5xl font-sans text-2xl italic leading-relaxed text-zinc-100 sm:text-3xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="mt-9 flex flex-col justify-between gap-4 border-t border-orange-500/12 pt-7 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-lg sm:text-xl font-bold text-white">{current.name}</p>
                  <p className="mt-0.5 text-base text-zinc-400">
                    {current.role} <span aria-hidden="true">·</span> {current.company}
                  </p>
                </div>

                <div className="text-base text-zinc-300">
                  <span className="font-semibold text-orange-400">{current.outcome}</span>
                  <span className="mx-2 text-zinc-500" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-zinc-400">{current.projectType}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Dots */}
          <div className="mt-8 flex items-center gap-2">
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View testimonial ${idx + 1} from ${item.name}`}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isSelected ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-300' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
