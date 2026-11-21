import {Inbox, Instagram, Mail, MessageCircle, Send, Youtube} from 'lucide-react';
import {BRAND_CONFIG} from '../data/portfolioData';

interface FooterProps {
  onOpenInbox: () => void;
}

export function Footer({onOpenInbox}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-orange-500/15 bg-[#050505]/75 backdrop-blur-md py-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#home"
              className="font-display text-lg font-bold tracking-[0.14em] text-white"
            >
              {BRAND_CONFIG.brandName}
            </a>
            <p className="mt-1.5 text-sm text-zinc-400">{BRAND_CONFIG.tagline}</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <a href="#home" className="hover:text-orange-300 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-orange-300 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-orange-300 transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-orange-300 transition-colors">
              Portfolio
            </a>
            <a href="#process" className="hover:text-orange-300 transition-colors">
              Process
            </a>
            <a href="#contact" className="hover:text-orange-300 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={BRAND_CONFIG.contact.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-400 transition-colors hover:border-orange-400/50 hover:text-orange-300"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-400 transition-colors hover:border-orange-400/50 hover:text-orange-300"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.telegramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-400 transition-colors hover:border-orange-400/50 hover:text-orange-300"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-400 transition-colors hover:border-orange-400/50 hover:text-orange-300"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/70 text-zinc-400 transition-colors hover:border-orange-400/50 hover:text-orange-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-orange-500/12 pt-6 flex flex-col justify-between gap-3 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {BRAND_CONFIG.editorName} ({BRAND_CONFIG.brandName}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>{BRAND_CONFIG.location}</span>
            <button
              type="button"
              onClick={onOpenInbox}
              className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-orange-300 cursor-pointer"
            >
              <Inbox className="h-3.5 w-3.5" />
              Client Inbox
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
