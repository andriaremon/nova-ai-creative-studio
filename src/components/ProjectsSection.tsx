import { useEffect, useState } from 'react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/studioData';
import { RevealOnScroll } from './RevealOnScroll';
import { TiltCard } from './TiltCard';

const CATEGORIES: ProjectCategory[] = ['All', 'Brand Identity', 'Spatial Web', 'AI Systems'];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 lg:py-28 border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                Featured Case Studies
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
                Selected systems shipped for frontier ventures.
              </h2>
            </div>

            {/* Interactive Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by discipline"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl bg-slate-200/70 dark:bg-white/5 p-1.5 border border-slate-200 dark:border-white/10 self-start"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                    activeCategory === category
                      ? 'bg-white dark:bg-white/15 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Interactive 3D Hover Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project, idx) => (
            <RevealOnScroll key={project.id} delayMs={idx * 70}>
              <TiltCard
                intensity={5}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl glass-panel transition-colors duration-200 hover:border-cyan-400/50 h-full flex flex-col"
              >
                {/* Media Container with Zero-Broken-Image Fallback */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.category} showcase`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-slate-900 to-cyan-950 p-6 text-center">
                      <Layers className="h-8 w-8 text-cyan-400 mb-3" />
                      <span className="font-display text-lg font-semibold text-white">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Measured Contrast Scrim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  />

                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                    <span className="font-mono-tabular text-xs font-medium text-cyan-300">
                      {project.metric}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Card Copy & Clean Unboxed Metadata */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{project.year}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>{project.secondaryMetric}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-blue-600 dark:text-cyan-400 font-semibold hover:underline whitespace-nowrap shrink-0"
                    >
                      Inspect Case Study
                    </button>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Case Study Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0B0D16] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden my-auto"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close case study modal"
              className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-slate-900">
              {!failedImages[selectedProject.id] ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950 to-cyan-950 text-white font-display text-2xl">
                  {selectedProject.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                  <span>{selectedProject.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{selectedProject.year}</span>
                </div>
                <h3 id="case-study-title" className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Primary Business Outcome</p>
                  <p className="mt-1 font-mono-tabular text-base font-semibold text-blue-600 dark:text-cyan-400">
                    {selectedProject.metric}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Engagement Signal</p>
                  <p className="mt-1 font-mono-tabular text-base font-semibold text-slate-900 dark:text-white">
                    {selectedProject.secondaryMetric}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display text-sm font-semibold text-slate-950 dark:text-white mb-2">
                    The Challenge
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-slate-950 dark:text-white mb-2">
                    NOVA Architecture
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Deliverables: {selectedProject.deliverables.join(' · ')}
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-lg nova-gradient-bg px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0"
                >
                  Request Similar Scope
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
