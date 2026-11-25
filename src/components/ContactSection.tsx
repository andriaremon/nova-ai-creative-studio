import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

interface ContactSectionProps {
  preselectedScope?: string;
  prefilledBrief?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  brief?: string;
}

const SCOPE_OPTIONS = [
  'Flagship Studio (Brand + Spatial Web)',
  'Foundation (Seed Brand Sprint)',
  'Enterprise AI Lab (Generative System)',
  'Custom Advisory / Retainer',
];

export function ContactSection({ preselectedScope, prefilledBrief }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [scope, setScope] = useState(SCOPE_OPTIONS[0]);
  const [brief, setBrief] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    email: string;
    scope: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedScope) {
      setScope(preselectedScope);
    }
  }, [preselectedScope]);

  useEffect(() => {
    if (prefilledBrief) {
      setBrief(prefilledBrief);
    }
  }, [prefilledBrief]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      next.email = 'Please enter a valid work email address.';
    }
    if (brief.trim().length < 15) {
      next.brief = 'Please share at least 15 characters about your project goals and timeline.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord({
        name: name.trim(),
        email: email.trim(),
        scope,
      });
    }, 950);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setName('');
    setEmail('');
    setCompany('');
    setBrief('');
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-[360px] w-[520px] rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Studio Contact Info */}
          <RevealOnScroll className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                Start a Conversation
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                Ready to build what comes next?
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Tell us about your launch timeline, product stage, and creative ambitions. A
                NOVA partner responds within one business day.
              </p>
            </div>

            <div className="mt-10 space-y-5 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  New Business & Partnerships
                </p>
                <a
                  href="mailto:hello@novastudio.design"
                  className="mt-1 inline-block font-display text-lg font-semibold text-slate-950 dark:text-white hover:text-cyan-500 transition-colors"
                >
                  hello@novastudio.design
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">San Francisco</p>
                  <p className="mt-0.5">548 Market St · Suite 420</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Tokyo</p>
                  <p className="mt-0.5">Minami-Aoyama 5-Chome</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Validated Inquiry Form */}
          <RevealOnScroll delayMs={80} className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 sm:p-8">
              {submittedRecord ? (
                <div className="py-10 text-center max-w-md mx-auto space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                    Inquiry Received, {submittedRecord.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    We have logged your brief for{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {submittedRecord.scope}
                    </span>{' '}
                    and sent a confirmation note to{' '}
                    <span className="font-mono-tabular text-cyan-600 dark:text-cyan-400">
                      {submittedRecord.email}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 px-5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Alex Rivera"
                        aria-invalid={Boolean(errors.name)}
                        className={`w-full rounded-xl border bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2"
                      >
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="alex@company.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full rounded-xl border bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-500 focus:ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2"
                      >
                        Company or Venture
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Volta Systems"
                        className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-scope"
                        className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2"
                      >
                        Engagement Scope
                      </label>
                      <select
                        id="contact-scope"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      >
                        {!SCOPE_OPTIONS.includes(scope) && (
                          <option value={scope}>{scope}</option>
                        )}
                        {SCOPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-brief"
                        className="block text-xs font-semibold text-slate-800 dark:text-slate-200"
                      >
                        Project Brief & Target Launch *
                      </label>
                      <span className="font-mono-tabular text-[11px] text-slate-400">
                        {brief.trim().length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-brief"
                      rows={4}
                      value={brief}
                      onChange={(e) => {
                        setBrief(e.target.value);
                        if (errors.brief) setErrors((prev) => ({ ...prev, brief: undefined }));
                      }}
                      placeholder="Share your product context, key deliverables needed, and target launch window..."
                      aria-invalid={Boolean(errors.brief)}
                      className={`w-full rounded-xl border bg-white dark:bg-[#060810] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.brief
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/15 focus:border-cyan-500 focus:ring-cyan-500/20'
                      }`}
                    />
                    {errors.brief && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.brief}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl nova-gradient-bg px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-150 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed min-h-[46px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Schedule Discovery Call</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
