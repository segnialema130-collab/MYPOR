import {useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, Instagram, Mail, MessageCircle, Send, Youtube} from 'lucide-react';
import {assetUrl, BRAND_CONFIG, HERO_METRICS} from '../data/portfolioData';

export function HeroSection() {
  const [portraitSrc, setPortraitSrc] = useState(BRAND_CONFIG.heroPortrait);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-24">
      {/* Ambient cinematic light atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/4 h-[420px] w-[420px] rounded-full bg-orange-600/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-1/5 h-[360px] w-[360px] rounded-full bg-amber-500/12 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1380px] px-6 sm:px-8">
        {/* Split-Screen Home / Hero */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Left Column: Typographic Hierarchy & CTAs */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-center md:col-span-7"
          >
            <h1 className="font-display text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5rem]">
              <span className="bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent">
                {BRAND_CONFIG.editorName},
              </span>{' '}
              <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Video Editor &amp; Motion Designer
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl lg:text-[1.35rem]">
              I&apos;m Segni Alemayehu, a creative video editor passionate about transforming raw footage into powerful
              visual experiences.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="inline-flex min-h-[54px] items-center gap-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-base font-bold text-black transition-all duration-150 hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_0_28px_rgba(249,115,22,0.45)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                Explore My Work
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[54px] items-center gap-2 rounded-lg border border-orange-500/25 bg-[#0E0D0C]/80 backdrop-blur-md px-8 py-3.5 text-base font-bold text-zinc-100 transition-colors duration-150 hover:border-orange-400/65 hover:bg-zinc-900/90 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                Hire Me
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3 pt-2">
              <span className="text-xs font-medium text-zinc-400">Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href={BRAND_CONFIG.contact.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0E0D0C]/80 text-zinc-300 transition-all duration-150 hover:border-orange-400/60 hover:text-orange-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href={BRAND_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0E0D0C]/80 text-zinc-300 transition-all duration-150 hover:border-orange-400/60 hover:text-orange-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={BRAND_CONFIG.contact.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0E0D0C]/80 text-zinc-300 transition-all duration-150 hover:border-orange-400/60 hover:text-orange-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Send className="h-4 w-4" />
                </a>
                <a
                  href={BRAND_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0E0D0C]/80 text-zinc-300 transition-all duration-150 hover:border-orange-400/60 hover:text-orange-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  aria-label="Email Segni"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0E0D0C]/80 text-zinc-300 transition-all duration-150 hover:border-orange-400/60 hover:text-orange-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Compact Circular User Portrait with Transform & Transition */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <div className="group relative h-80 w-80 sm:h-96 sm:w-96 md:h-[380px] md:w-[380px] lg:h-[440px] lg:w-[440px] overflow-hidden rounded-full border-2 border-orange-500/50 bg-[#0D0B0A] shadow-[0_0_48px_rgba(249,115,22,0.24)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 hover:border-amber-300/80 hover:shadow-[0_0_60px_rgba(249,115,22,0.38)] will-change-transform">
              {!imgError ? (
                <img
                  src={portraitSrc}
                  alt="Segni Alemayehu — Creative Video Editor"
                  width={440}
                  height={440}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    const fallback = assetUrl('/assets/aistudio/image_81289454.png');
                    if (portraitSrc !== fallback) {
                      setPortraitSrc(fallback);
                    } else {
                      setImgError(true);
                    }
                  }}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-[#17120E] to-black p-6 text-center">
                  <span className="font-display text-2xl font-bold tracking-wider text-white">
                    {BRAND_CONFIG.brandName}
                  </span>
                  <span className="mt-1.5 text-sm text-zinc-400">Segni Alemayehu</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Metrics Row Below Hero Split */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-orange-500/15 pt-10 md:grid-cols-4">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-tight text-orange-300 tabular-nums sm:text-4xl lg:text-5xl">
                {metric.value}
              </span>
              <span className="mt-2 text-base font-medium text-zinc-300 sm:text-lg">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Marquee Divider Ribbon */}
      <div className="mt-18 border-y border-orange-500/15 bg-[#080707]/70 backdrop-blur-sm py-4 overflow-hidden select-none">
        <div className="animate-marquee text-sm font-medium tracking-[0.24em] text-zinc-300 uppercase">
          <span className="mx-6">Selected Works</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Cinematic Storytelling</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="mx-6">Motion Graphics</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Color Grading</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="mx-6">3D Brand Reveals</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Sound Design</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="mx-6">Selected Works</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Cinematic Storytelling</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="mx-6">Motion Graphics</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Color Grading</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
          <span className="mx-6">3D Brand Reveals</span>
          <span aria-hidden="true" className="text-orange-400">·</span>
          <span className="mx-6">Sound Design</span>
          <span aria-hidden="true" className="text-amber-400">·</span>
        </div>
      </div>
    </section>
  );
}
