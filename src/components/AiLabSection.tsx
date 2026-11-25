import React, { useState } from 'react';
import { Check, Copy, Loader2, Send, Sparkles, Wand2 } from 'lucide-react';
import {
  AI_LAB_PRESETS,
  CreativeDirection,
  GeneratedLabConcept,
  LabFocusMode,
  generateBrandConcept,
} from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';

const DIRECTIONS: CreativeDirection[] = [
  'Cyber-Minimalist',
  'Editorial Luxury',
  'Kinetic Spatial',
  'Bio-Organic',
];

const FOCUS_MODES: LabFocusMode[] = [
  'Full Brand System',
  'Messaging & Copy',
  'Visual Direction',
];

const LOADING_STEPS = [
  'Analyzing domain cues and positioning...',
  'Calibrating chromatic palette harmonics...',
  'Synthesizing typography and spatial direction...',
];

interface AiLabSectionProps {
  onSendConceptToContact: (summary: string) => void;
}

export function AiLabSection({ onSendConceptToContact }: AiLabSectionProps) {
  const [prompt, setPrompt] = useState(AI_LAB_PRESETS[0]);
  const [direction, setDirection] = useState<CreativeDirection>('Kinetic Spatial');
  const [focusMode, setFocusMode] = useState<LabFocusMode>('Full Brand System');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [result, setResult] = useState<GeneratedLabConcept>(() =>
    generateBrandConcept(AI_LAB_PRESETS[0], 'Kinetic Spatial', 'Full Brand System')
  );

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || prompt.trim().length < 4) {
      setErrorMsg('Please enter at least a few words describing your product or brand.');
      return;
    }

    setErrorMsg('');
    setIsGenerating(true);
    setLoadingStepIndex(0);

    const step1 = window.setTimeout(() => setLoadingStepIndex(1), 420);
    const step2 = window.setTimeout(() => setLoadingStepIndex(2), 860);
    const finish = window.setTimeout(() => {
      const next = generateBrandConcept(prompt, direction, focusMode);
      setResult(next);
      setIsGenerating(false);
    }, 1350);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
    };
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 1600);
  };

  const formatFullBrief = () => {
    return [
      `Brand Concept: ${result.brandName} (${result.direction})`,
      `Prompt: ${result.promptEcho}`,
      `Hero Headline: ${result.headline}`,
      `Positioning: ${result.positioning}`,
      `Taglines: ${result.taglines.join(' | ')}`,
      `Palette: ${result.palette.map((c) => `${c.name} ${c.hex}`).join(', ')}`,
      `Art Direction: ${result.artDirection}`,
    ].join('\n');
  };

  return (
    <section
      id="ai-lab"
      className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[760px] rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <RevealOnScroll>
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
              NOVA AI Lab
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              Test our generative brand architecture engine live.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Describe your product or venture below. Our interactive concept synthesizer
              produces tailored positioning, color palettes, typography pairings, and spatial art
              direction in seconds.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Controls & Prompt Composer */}
          <RevealOnScroll className="lg:col-span-5">
            <form
              onSubmit={handleGenerate}
              className="h-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="lab-prompt"
                    className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                  >
                    Describe your brand or product
                  </label>
                  <textarea
                    id="lab-prompt"
                    rows={3}
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="e.g., Autonomous electric hydrofoil boat for coastal commuting"
                    className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                  {errorMsg && (
                    <p role="alert" className="mt-2 text-xs font-medium text-rose-500">
                      {errorMsg}
                    </p>
                  )}

                  {/* Quick Prompt Presets */}
                  <div className="mt-3">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-2">
                      Try a studio preset:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AI_LAB_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setPrompt(preset);
                            setErrorMsg('');
                          }}
                          className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors ${
                            prompt === preset
                              ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                              : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/25'
                          }`}
                        >
                          {preset.length > 36 ? `${preset.slice(0, 36)}...` : preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Creative Direction Selector */}
                <div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white mb-2.5">
                    Creative Direction
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {DIRECTIONS.map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => setDirection(dir)}
                        className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all duration-150 whitespace-nowrap truncate ${
                          direction === dir
                            ? 'border-blue-500 bg-blue-600/10 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Focus Mode */}
                <div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white mb-2.5">
                    Synthesis Focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_MODES.map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFocusMode(mode)}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                          focusMode === mode
                            ? 'border-violet-500 bg-violet-600/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl nova-gradient-bg px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-150 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed min-h-[46px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Synthesizing Brief...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Concept</span>
                  </>
                )}
              </button>
            </form>
          </RevealOnScroll>

          {/* Right Panel: Interactive Synthesized Output */}
          <RevealOnScroll delayMs={100} className="lg:col-span-7">
            <div className="h-full rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-500/10">
                    <Sparkles className="h-7 w-7 text-cyan-400 animate-pulse" />
                  </div>
                  <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {LOADING_STEPS[loadingStepIndex]}
                  </p>
                  <div className="mt-5 h-1.5 w-64 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full nova-gradient-bg transition-all duration-300"
                      style={{ width: `${(loadingStepIndex + 1) * 33}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {/* Top Result Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>{result.direction}</span>
                          <span aria-hidden="true">·</span>
                          <span>{result.focusMode}</span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                          {result.brandName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy('brief', formatFullBrief())}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/15 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                        >
                          {copiedKey === 'brief' ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                              <span>Copied Brief</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Brief</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onSendConceptToContact(formatFullBrief())}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-3 py-2 text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Send to Studio</span>
                        </button>
                      </div>
                    </div>

                    {/* Positioning & Hero Headline */}
                    {(result.focusMode === 'Full Brand System' ||
                      result.focusMode === 'Messaging & Copy') && (
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Proposed Hero Headline
                          </span>
                          <p className="mt-1 font-display text-xl font-semibold text-slate-950 dark:text-white text-balance">
                            “{result.headline}”
                          </p>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {result.positioning}
                        </p>

                        <div>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Tagline Explorations
                          </span>
                          <ul className="mt-2 space-y-1.5">
                            {result.taglines.map((line) => (
                              <li
                                key={line}
                                className="text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2"
                              >
                                <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Chromatic System & Typography */}
                    {(result.focusMode === 'Full Brand System' ||
                      result.focusMode === 'Visual Direction') && (
                      <div className="space-y-5 pt-2">
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Chromatic Palette (Click swatch to copy hex)
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {result.palette.map((swatch) => (
                              <button
                                key={swatch.hex}
                                type="button"
                                onClick={() => handleCopy(swatch.hex, swatch.hex)}
                                className="group text-left rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-2.5 transition-colors hover:border-cyan-400/50"
                              >
                                <div
                                  className="h-10 w-full rounded-lg border border-black/10 dark:border-white/10 mb-2"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                  {swatch.name}
                                </p>
                                <p className="font-mono-tabular text-[11px] text-slate-500 dark:text-slate-400">
                                  {copiedKey === swatch.hex ? 'Copied!' : swatch.hex}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-white/10">
                          <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Art Direction
                            </span>
                            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                              {result.artDirection}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Spatial Motion & Type ({result.typography.display})
                            </span>
                            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                              {result.spatialMotionSpec}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
