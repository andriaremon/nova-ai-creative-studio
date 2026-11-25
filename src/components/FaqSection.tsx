import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <RevealOnScroll className="lg:col-span-4">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              Clarity on process, timelines, and IP.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Everything you need to know before kicking off a sprint or studio retainer with
              NOVA.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delayMs={80} className="lg:col-span-8">
            <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="py-5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${item.id}`}
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full items-center justify-between gap-4 text-left py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-cyan-500' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`panel-${item.id}`}
                        className="mt-3 pr-8 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
