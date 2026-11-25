import { Moon, Sun } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Footer({ theme, onToggleTheme }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#040407]">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <a
              href="#hero"
              className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white inline-block"
            >
              NOVA
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Futuristic AI Creative Studio designing visual identities, spatial web experiences,
              and bespoke generative brand systems.
            </p>
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Switch to Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-violet-600" />
                  <span>Switch to Dark Theme</span>
                </>
              )}
            </button>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wide text-slate-900 dark:text-white">
              Studio
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#services" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#ai-lab" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  AI Lab
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  About NOVA
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wide text-slate-900 dark:text-white">
              Engagement
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#pricing" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Client Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wide text-slate-900 dark:text-white">
              Studios
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              San Francisco · Tokyo · Berlin
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              hello@novastudio.design
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} NOVA Creative Studio. All rights reserved.</p>
          <p>Crafted for ambitious technology brands.</p>
        </div>
      </div>
    </footer>
  );
}
