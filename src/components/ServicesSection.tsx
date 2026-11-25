import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { TiltCard } from './TiltCard';

const ACCENT_GLOW: Record<string, string> = {
  violet: 'from-violet-600/20 via-transparent to-transparent',
  blue: 'from-blue-600/20 via-transparent to-transparent',
  cyan: 'from-cyan-500/20 via-transparent to-transparent',
  indigo: 'from-indigo-600/20 via-transparent to-transparent',
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                Core Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                Integrated brand design and spatial frontend engineering.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Every engagement unifies strategic positioning, custom visual direction, and
              production code inside one senior studio pod.
            </p>
          </div>
        </RevealOnScroll>

        {/* Asymmetric 3-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <RevealOnScroll
              key={service.number}
              delayMs={idx * 80}
              className={service.span === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1'}
            >
              <TiltCard
                intensity={4}
                className="group h-full rounded-2xl glass-panel p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:border-blue-500/40"
              >
                {/* Subtle corner gradient wash */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ACCENT_GLOW[service.accent]} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="font-mono-tabular text-sm font-semibold text-violet-600 dark:text-cyan-400">
                      {service.number}
                    </span>
                    <a
                      href="#contact"
                      aria-label={`Inquire about ${service.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 transition-all duration-150 group-hover:border-cyan-400/50 group-hover:text-slate-950 dark:group-hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {service.subtitle}
                  </p>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                    {service.description}
                  </p>
                </div>

                <ul className="relative z-10 mt-7 pt-5 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Check className="h-4 w-4 shrink-0 text-cyan-500 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
