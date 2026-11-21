import {motion} from 'motion/react';
import {
  Box,
  Clapperboard,
  Film,
  Megaphone,
  Palette,
  PlaySquare,
  Smartphone,
  Sparkles,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import {SERVICES_LIST, type ServiceItem} from '../data/portfolioData';

const ICON_MAP: Record<ServiceItem['iconName'], LucideIcon> = {
  Film,
  Youtube,
  Clapperboard,
  Sparkles,
  Box,
  Smartphone,
  Megaphone,
  Palette,
  PlaySquare,
};

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-orange-500/15 bg-[#090808]/55 backdrop-blur-xs py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">My Services</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              End-to-End Post-Production Capabilities
            </h2>
          </div>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed text-zinc-400">
            Tailored editing, motion design, and finishing workflows engineered for creators, brands, and modern
            production teams.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <motion.article
                key={service.id}
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{duration: 0.38, delay: (idx % 3) * 0.06, ease: [0.16, 1, 0.3, 1]}}
                className="group relative flex flex-col justify-between rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md p-7 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-orange-400/55 hover:bg-[#151310]/95"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-13 w-13 items-center justify-center rounded-xl border border-orange-500/20 bg-black/80 text-orange-400 transition-colors duration-200 group-hover:border-amber-300/60 group-hover:text-amber-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-500 tabular-nums">{service.number}</span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-300">{service.description}</p>
                </div>

                <p className="mt-7 border-t border-orange-500/12 pt-4 text-sm font-medium text-zinc-400">
                  {service.deliverables}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
