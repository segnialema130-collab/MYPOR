import {Inbox, Instagram, Mail, MessageCircle, Send, Youtube} from 'lucide-react';
import {BRAND_CONFIG} from '../data/portfolioData';

interface FooterProps {
  onOpenInbox: () => void;
}

export function Footer({onOpenInbox}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-orange-500/40 bg-gradient-to-b from-[#241207] via-[#1A0D05] to-[#110803] shadow-[0_-12px_40px_rgba(234,88,12,0.14)] py-14">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#home"
              className="font-display text-2xl font-bold tracking-[0.16em] bg-gradient-to-r from-white via-amber-100 to-orange-300 bg-clip-text text-transparent"
            >
              {BRAND_CONFIG.brandName}
            </a>
            <p className="mt-2 text-sm text-orange-100/75">{BRAND_CONFIG.tagline}</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-base font-medium text-orange-50/90">
            <a href="#home" className="hover:text-amber-300 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-amber-300 transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-amber-300 transition-colors">
              Portfolio
            </a>
            <a href="#process" className="hover:text-amber-300 transition-colors">
              Process
            </a>
            <a href="#contact" className="hover:text-amber-300 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={BRAND_CONFIG.contact.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/25 bg-[#2D1709]/85 text-orange-100 transition-colors hover:border-amber-300 hover:bg-orange-500 hover:text-black"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/25 bg-[#2D1709]/85 text-orange-100 transition-colors hover:border-amber-300 hover:bg-orange-500 hover:text-black"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.telegramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/25 bg-[#2D1709]/85 text-orange-100 transition-colors hover:border-amber-300 hover:bg-orange-500 hover:text-black"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/25 bg-[#2D1709]/85 text-orange-100 transition-colors hover:border-amber-300 hover:bg-orange-500 hover:text-black"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/25 bg-[#2D1709]/85 text-orange-100 transition-colors hover:border-amber-300 hover:bg-orange-500 hover:text-black"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-orange-400/20 pt-6 flex flex-col justify-between gap-3 text-xs text-orange-100/70 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {BRAND_CONFIG.editorName} ({BRAND_CONFIG.brandName}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>{BRAND_CONFIG.location}</span>
            <button
              type="button"
              onClick={onOpenInbox}
              className="inline-flex items-center gap-1.5 text-amber-200 transition-colors hover:text-white cursor-pointer"
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
