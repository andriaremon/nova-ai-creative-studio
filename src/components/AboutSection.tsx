import { useState } from 'react';
import { Globe2 } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const PILLARS = [
  {
    step: '01.',
    title: 'Research & Positioning',
    detail:
      'We distill technical differentiation into sharp verbal positioning before sketching a single interface or frame.',
  },
  {
    step: '02.',
    title: 'Visual & Spatial Prototyping',
    detail:
      'High-contrast editorial direction meets real-time WebGL prototypes tested on desktop and mobile devices from week two.',
  },
  {
    step: '03.',
    title: 'Production Engineering',
    detail:
      'We ship clean React, TypeScript, and design-token systems built for sub-second speed and long-term maintainability.',
  },
];

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Studio Photography */}
          <RevealOnScroll className="lg:col-span-6">
            <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900">
              {!imgError ? (
                <img
                  src="/src/assets/images/about_nova_studio_1795612441005.jpg"
                  alt="Creative directors collaborating inside the NOVA design and technology studio"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-center">
                  <Globe2 className="h-10 w-10 text-cyan-400 mb-3" />
                  <p className="font-display text-xl font-semibold text-white">
                    NOVA Creative Technology Studio
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
                <span className="font-medium">San Francisco · Tokyo · Berlin</span>
                <span className="font-mono-tabular text-cyan-300">Founded 2022 · 18 Specialists</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Studio Narrative & Methodology */}
          <RevealOnScroll delayMs={100} className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
              About NOVA
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              Built where brand taste meets frontier software craft.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              NOVA was founded by former principal designers and creative technologists who saw
              ambitious AI, robotics, and climate companies held back by generic templates. We work
              in tight senior pods—never handing projects off to junior layers.
            </p>

            <div className="mt-8 space-y-5">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.step}
                  className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-12 gap-3"
                >
                  <div className="col-span-2 sm:col-span-1 font-mono-tabular text-sm font-semibold text-violet-600 dark:text-cyan-400">
                    {pillar.step}
                  </div>
                  <div className="col-span-10 sm:col-span-11">
                    <h3 className="font-display text-base font-bold text-slate-950 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
