import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <RevealOnScroll>
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
              Partner Outcomes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              Trusted by founders shipping category-first products.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <RevealOnScroll key={item.id} delayMs={idx * 80} className="h-full">
              <article className="h-full rounded-2xl glass-panel p-7 flex flex-col justify-between">
                <div>
                  <Quote className="h-6 w-6 text-violet-500 dark:text-cyan-400 mb-5 opacity-80" />
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-200/80 dark:border-white/10">
                  <p className="font-mono-tabular text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-2">
                    {item.outcome}
                  </p>
                  <p className="font-display text-sm font-bold text-slate-950 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role} · {item.company}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
