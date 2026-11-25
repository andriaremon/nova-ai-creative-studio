import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_METRICS } from '../data/studioData';
import { AnimatedCounter } from './AnimatedCounter';
import { NovaOrbCanvas } from './NovaOrbCanvas';

interface HeroSectionProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function HeroSection({ theme, onToggleTheme }: HeroSectionProps) {
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24"
    >
      {/* Background atmospheric mesh gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/4 -translate-x-1/2 h-[420px] w-[580px] rounded-full bg-violet-600/15 dark:bg-violet-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-1/6 h-[380px] w-[480px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        {/* Main 2-column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Brand Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide mb-5">
              NOVA Creative Technology Studio · San Francisco & Tokyo
            </p>

            <h1 className="font-display text-[clamp(2.5rem,4.6vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.03em] text-slate-950 dark:text-white text-balance">
              We design the{' '}
              <span className="nova-gradient-text">future</span> of your brand.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              NOVA partners with ambitious technology founders and global product teams to craft
              high-conviction visual identities, interactive spatial websites, and custom
              generative brand systems.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl nova-gradient-bg px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-all duration-150 hover:brightness-110 active:scale-[0.98] whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#ai-lab"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-900 dark:text-white transition-all duration-150 hover:bg-slate-100 dark:hover:bg-white/10 whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <Sparkles className="h-4 w-4 text-cyan-500" />
                <span>Explore AI Lab</span>
              </a>
            </div>

            <div className="mt-10 pt-7 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Brand Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Spatial 3D Web</span>
              <span aria-hidden="true">·</span>
              <span>Generative Pipelines</span>
              <span aria-hidden="true">·</span>
              <span>Motion Direction</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Orb Viewport */}
          <div className="lg:col-span-6">
            <NovaOrbCanvas
              theme={theme}
              onToggleTheme={onToggleTheme}
              pointerOffset={pointerOffset}
            />
          </div>
        </div>

        {/* Full-Width 4-Column Animated Metrics Strip Below Hero Split */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl glass-panel px-5 py-5 transition-colors duration-200 hover:border-cyan-500/40"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                />
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
