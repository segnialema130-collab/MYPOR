import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {BRAND_CONFIG} from '../data/portfolioData';

const NAV_LINKS = [
  {id: 'home', label: 'Home', href: '#home'},
  {id: 'about', label: 'About', href: '#about'},
  {id: 'services', label: 'Services', href: '#services'},
  {id: 'portfolio', label: 'Portfolio', href: '#portfolio'},
  {id: 'contact', label: 'Contact', href: '#contact'},
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      // If scrolled near the very bottom, ensure Contact is highlighted
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      const probeY = scrollY + 180;
      let current = 'home';

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (probeY >= top) {
          current = link.id;
        }
      }

      setActiveSection(current);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, {passive: true});
    window.addEventListener('resize', updateScrollState, {passive: true});
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-200 ${
        scrolled
          ? 'bg-gradient-to-r from-[#241207]/96 via-[#331909]/95 to-[#241207]/96 backdrop-blur-xl border-b border-orange-400/45 shadow-[0_10px_36px_rgba(234,88,12,0.24)]'
          : 'bg-gradient-to-r from-[#1A0D05]/92 via-[#281408]/90 to-[#1A0D05]/92 backdrop-blur-xl border-b border-orange-400/25 shadow-[0_6px_24px_rgba(234,88,12,0.14)]'
      }`}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-6 sm:px-8 py-3.5 md:py-4">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#home"
          onClick={() => handleLinkClick('home')}
          className="font-display text-xl sm:text-2xl font-bold tracking-[0.16em] bg-gradient-to-r from-white via-amber-100 to-orange-300 bg-clip-text text-transparent transition-all duration-200 ease-out hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-sm"
        >
          {BRAND_CONFIG.brandName}
        </a>

        {/* Zone 2: Enlarged single-line section navigation links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-2 xl:gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-lg px-4 py-2 text-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                  isActive
                    ? 'scale-[1.03] bg-gradient-to-r from-orange-500 to-amber-400 text-black shadow-[0_0_20px_rgba(249,115,22,0.45)]'
                    : 'text-orange-50/90 hover:bg-orange-500/20 hover:text-amber-200'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={() => handleLinkClick('contact')}
            className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-amber-300/40 bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-base font-bold text-black transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:from-orange-400 hover:to-amber-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.5)] active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-orange-400/35 bg-[#2E170A]/90 text-orange-100 transition-all duration-200 ease-out hover:scale-105 hover:border-amber-300/60 active:scale-95 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-orange-400/30 bg-[#1E0F06]/98 backdrop-blur-xl px-6 py-5 lg:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center rounded-lg px-4 text-lg font-semibold transition-all duration-200 ease-out hover:translate-x-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black'
                      : 'text-orange-50 hover:bg-orange-500/20 hover:text-amber-200'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
