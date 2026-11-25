import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Lab', href: '#ai-lab' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/85 dark:bg-[#050508]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          NOVA
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-slate-950 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-cyan-400 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg nova-gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-150 hover:brightness-110 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Book a Call
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-300 dark:border-white/15 p-2.5 text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-200/60 dark:hover:bg-white/10 min-h-[44px] min-w-[44px]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-slate-50/95 dark:bg-[#080A12]/95 backdrop-blur-xl px-6 py-5">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 inline-flex items-center justify-center rounded-lg nova-gradient-bg px-4 py-3 text-sm font-semibold text-white"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
