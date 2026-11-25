import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRICING_TIERS } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';

type BillingMode = 'sprint' | 'retainer';

interface PricingSectionProps {
  onSelectPlan: (planLabel: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingMode, setBillingMode] = useState<BillingMode>('sprint');

  return (
    <section id="pricing" className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                Transparent Engagements
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                Fixed-scope sprints or embedded studio retainers.
              </h2>
            </div>

            {/* Engagement Model Segmented Toggle */}
            <div
              role="group"
              aria-label="Engagement billing model"
              className="inline-flex items-center gap-1 rounded-xl bg-slate-200/70 dark:bg-white/5 p-1.5 border border-slate-200 dark:border-white/10 self-start"
            >
              <button
                type="button"
                onClick={() => setBillingMode('sprint')}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                  billingMode === 'sprint'
                    ? 'bg-white dark:bg-white/15 text-slate-950 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Project Sprint
              </button>
              <button
                type="button"
                onClick={() => setBillingMode('retainer')}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                  billingMode === 'retainer'
                    ? 'bg-white dark:bg-white/15 text-slate-950 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Monthly Retainer
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            const price = billingMode === 'sprint' ? tier.sprintPrice : tier.retainerPrice;
            const cadence = billingMode === 'sprint' ? tier.sprintDuration : tier.retainerDuration;

            return (
              <RevealOnScroll key={tier.id} delayMs={idx * 80} className="h-full">
                <div
                  className={`h-full rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                    tier.featured
                      ? 'bg-slate-900 text-white dark:bg-[#0E1324] border border-cyan-400/50 shadow-2xl shadow-blue-900/20'
                      : 'glass-panel hover:border-slate-300 dark:hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`font-display text-xl font-bold ${
                          tier.featured ? 'text-white' : 'text-slate-950 dark:text-white'
                        }`}
                      >
                        {tier.name}
                      </h3>
                      {tier.featured && (
                        <span className="text-xs font-medium text-cyan-300">
                          Most Selected
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-2.5 text-sm leading-relaxed ${
                        tier.featured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {tier.tagline}
                    </p>

                    <div
                      className={`mt-6 pt-6 border-t ${
                        tier.featured
                          ? 'border-white/15'
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <div
                        className={`font-display text-3xl sm:text-4xl font-bold font-mono-tabular ${
                          tier.featured ? 'text-white' : 'text-slate-950 dark:text-white'
                        }`}
                      >
                        {price}
                      </div>
                      <p
                        className={`mt-1 text-xs font-medium ${
                          tier.featured ? 'text-cyan-300' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {cadence}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {tier.deliverables.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-2.5 text-sm ${
                            tier.featured ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectPlan(
                        `${tier.name} (${billingMode === 'sprint' ? 'Project Sprint' : 'Monthly Retainer'} · ${price})`
                      )
                    }
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-150 min-h-[44px] ${
                      tier.featured
                        ? 'nova-gradient-bg text-white hover:brightness-110 shadow-lg shadow-blue-600/25'
                        : 'border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>Select {tier.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
