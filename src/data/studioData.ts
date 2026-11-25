export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  span: 'wide' | 'standard';
  accent: 'violet' | 'blue' | 'cyan' | 'indigo';
}

export type ProjectCategory = 'All' | 'Brand Identity' | 'Spatial Web' | 'AI Systems';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  metric: string;
  secondaryMetric: string;
  image: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  outcome: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  sprintPrice: string;
  retainerPrice: string;
  sprintDuration: string;
  retainerDuration: string;
  featured?: boolean;
  deliverables: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HERO_METRICS = [
  { value: 48, suffix: '+', label: 'Venture Brands Launched' },
  { value: 180, prefix: '$', suffix: 'M+', label: 'Client Capital Raised Post-Rebrand' },
  { value: 3.4, decimals: 1, suffix: 'x', label: 'Average Conversion Lift in 90 Days' },
  { value: 14, suffix: '', label: 'International Design Recognitions' },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01.',
    title: 'Brand & Identity Architecture',
    subtitle: 'Positioning · Visual Systems · Design Tokens',
    description:
      'We build category-defining visual languages from the ground up—combining bespoke wordmarks, kinetic typography, and modular token systems built to scale across hardware, web, and print.',
    outcomes: ['Complete brand guidelines & token library', 'Custom display typography & logomark suite', 'Investor pitch & launch narrative deck'],
    span: 'wide',
    accent: 'violet',
  },
  {
    number: '02.',
    title: 'Spatial Web & 3D Engineering',
    subtitle: 'Interactive WebGL · Motion · Frontend Systems',
    description:
      'High-frame-rate flagship websites that merge sculptural 3D objects, custom shaders, and crisp product storytelling without sacrificing Lighthouse speed or accessibility.',
    outcomes: ['60fps WebGL & interactive product stages', 'Responsive React & TypeScript architecture'],
    span: 'standard',
    accent: 'blue',
  },
  {
    number: '03.',
    title: 'Generative AI Visual Systems',
    subtitle: 'Custom LoRAs · Art Direction Pipelines · Brand Guardrails',
    description:
      'Proprietary visual generation workflows trained strictly on your brand geometry, lighting rules, and material palette so your marketing team ships studio-grade assets in minutes.',
    outcomes: ['Private visual style model & prompt engine', 'Consistent campaign asset production'],
    span: 'standard',
    accent: 'cyan',
  },
  {
    number: '04.',
    title: 'Motion Direction & Launch Films',
    subtitle: 'Product Reveals · Sonic Branding · UI Choreography',
    description:
      'Cinematic product reveal sequences, interactive micro-motion libraries, and bespoke sonic signatures engineered to turn product announcements into cultural moments.',
    outcomes: ['4K keynote & social launch films', 'Production-ready Lottie & CSS motion specs', 'Cohesive audio-visual design language'],
    span: 'wide',
    accent: 'indigo',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'volta-hydrofoil',
    title: 'Volta Marine Craft',
    client: 'Volta Autonomous Systems',
    category: 'Spatial Web',
    year: '2026',
    summary: 'Flagship spatial product showcase and real-time range configurator for an all-electric hydrofoil vessel.',
    challenge:
      'Volta needed to translate complex naval hydrofoil engineering into an emotional, tactile buying experience capable of converting pre-orders online.',
    solution:
      'We paired an interactive 3D hull configurator with dramatic twilight coastal photography, dynamic telemetry overlays, and a zero-friction reservation flow.',
    metric: '+165% Pre-Order Deposits in 60 Days',
    secondaryMetric: '4m 18s Avg. Session Depth',
    image: '/src/assets/images/project_aether_mobility_1795612439530.jpg',
    deliverables: ['Brand Refresh', '3D Web Configurator', 'Launch Film', 'Reservation System'],
  },
  {
    id: 'aether-acoustics',
    title: 'Aether Spatial Acoustics',
    client: 'Aether Audio Tokyo',
    category: 'Brand Identity',
    year: '2026',
    summary: 'Sculptural hardware identity, packaging architecture, and acoustic visualization system for flagship studio monitors.',
    challenge:
      'Position a newcomer hardware studio alongside heritage European hi-fi makers while highlighting proprietary beamforming software.',
    solution:
      'We crafted an obsidian-and-titanium visual language grounded in physical basalt textures, paired with a generative wave visualizer synced to audio frequencies.',
    metric: '$4.2M Series A Closed Post-Launch',
    secondaryMetric: '18,500 Units Reserved Week 1',
    image: '/src/assets/images/project_kinetix_audio_1795612440390.jpg',
    deliverables: ['Visual Identity', 'Industrial Art Direction', 'Packaging', 'Web Experience'],
  },
  {
    id: 'lumina-genomics',
    title: 'Lumina Cellular Optics',
    client: 'Lumina BioLabs',
    category: 'AI Systems',
    year: '2025',
    summary: 'Generative light-refraction brand system and custom visual synthesis studio for a computational longevity lab.',
    challenge:
      'Replace sterile clinical stock clichés with an unmistakable scientific visual system that communicates precision optics and biological clarity.',
    solution:
      'NOVA trained a bespoke refraction art-direction pipeline producing consistent glass-monolith light sculptures across whitepapers, keynotes, and web.',
    metric: '4x Faster Campaign Turnaround',
    secondaryMetric: '+112% Enterprise Partner Inquiries',
    image: '/src/assets/images/project_lumina_biotech_1795612439431.jpg',
    deliverables: ['Generative Art Pipeline', 'Brand Architecture', 'Design System', 'Portal UI'],
  },
  {
    id: 'veloce-ev',
    title: 'Veloce GT Concept',
    client: 'Veloce Mobility Milan',
    category: 'Spatial Web',
    year: '2025',
    summary: 'Digital launch pavilion and aerodynamic light-blade design language for an electric performance coupe.',
    challenge:
      'Reveal a limited-run carbon-fiber prototype globally before physical auto-show tours began, commanding press and collector attention.',
    solution:
      'Built an interactive dark-pavilion digital stage featuring live surface lighting studies, bespoke cockpit UI prototypes, and collector allocation.',
    metric: '100% Collector Allocation Sold in 11 Days',
    secondaryMetric: '2.9M Organic Launch Views',
    image: '/src/assets/images/project_veloce_spatial_1795612440266.jpg',
    deliverables: ['Digital Pavilion', 'Cockpit HMI Design', 'Motion Reveal', 'Collector Portal'],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Before working with NOVA, our hydrofoil tech felt locked inside engineering whitepapers. They rebuilt our entire digital presence around interactive spatial storytelling—and pre-order conversion more than doubled within two months.',
    name: 'Henrik Lindqvist',
    role: 'Co-Founder & CEO',
    company: 'Volta Autonomous Systems',
    outcome: '+165% Pre-order conversion in 60 days',
  },
  {
    id: 't2',
    quote:
      'Most studios either understand brand taste or frontend engineering, never both. NOVA delivered our titanium hardware identity and custom WebGL visualizer on the exact same sprint cadence, helping us close our Series A ahead of schedule.',
    name: 'Kenji Takahashi',
    role: 'Head of Product',
    company: 'Aether Audio Tokyo',
    outcome: '$4.2M Series A closed post-launch',
  },
  {
    id: 't3',
    quote:
      'The bespoke generative visual pipeline NOVA built gave our three-person marketing team the output of a full creative department. Every diagram, keynote visual, and campaign asset stays unmistakably on-brand.',
    name: 'Dr. Elena Rostova',
    role: 'Chief Scientific Officer',
    company: 'Lumina BioLabs',
    outcome: '4x faster brand asset production',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Focused brand positioning and high-impact launch site for seed-stage ventures.',
    sprintPrice: '$14,500',
    retainerPrice: '$6,800',
    sprintDuration: '4-week sprint',
    retainerDuration: 'per month · 3-mo min',
    deliverables: [
      'Brand strategy & visual identity kit',
      'Bespoke typography & color system',
      'Responsive 5-section flagship web build',
      'Core motion choreography & SEO setup',
    ],
  },
  {
    id: 'flagship',
    name: 'Flagship Studio',
    tagline: 'Full spatial web architecture, custom 3D direction, and modular design system.',
    sprintPrice: '$28,000',
    retainerPrice: '$12,500',
    sprintDuration: '6–8 week sprint',
    retainerDuration: 'per month · priority pod',
    featured: true,
    deliverables: [
      'Complete identity & multi-platform design tokens',
      'Interactive 3D / WebGL hero & product stage',
      'Custom motion reveal film & micro-interactions',
      'Full React / TypeScript codebase & CMS wiring',
      'Dedicated Creative Director & Principal Engineer',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI Lab',
    tagline: 'Dedicated generative brand model, multi-product architecture, and ongoing R&D.',
    sprintPrice: '$48,000',
    retainerPrice: '$19,500',
    sprintDuration: '10–12 week engagement',
    retainerDuration: 'per month · embedded team',
    deliverables: [
      'Proprietary visual AI style pipeline & guardrails',
      'Multi-brand or multi-product component library',
      'Interactive product configurators & custom shaders',
      'Executive keynote visuals & sonic identity',
      'Quarterly design system audits & team workshops',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How fast can NOVA take a brand from concept to live launch?',
    answer:
      'Foundation sprints ship in 4 weeks, while Flagship Studio spatial web and identity engagements take 6 to 8 weeks. We run tight weekly prototype reviews so you interact with real working builds from week two onward.',
  },
  {
    id: 'faq-2',
    question: 'Do we own 100% of the code, design tokens, and generative assets?',
    answer:
      'Yes. Upon final milestone completion, every Figma file, custom typography license configuration, React/TypeScript repository, shader source, and bespoke AI style model transfers completely to your organization with zero ongoing royalties.',
  },
  {
    id: 'faq-3',
    question: 'How does NOVA combine human creative direction with AI workflows?',
    answer:
      'Strategy, typography, interaction design, and art direction are always led by senior human directors and engineers. We use generative systems selectively to accelerate material exploration, lighting studies, and scalable asset pipelines tuned strictly to your brand rules.',
  },
  {
    id: 'faq-4',
    question: 'What frontend stack do you engineer flagship websites on?',
    answer:
      'We build primarily with React, TypeScript, Tailwind CSS, Motion, and custom Canvas/WebGL shaders—prioritizing sub-second perceived load times, WCAG AA accessibility, and clean maintainable code your internal team can extend effortlessly.',
  },
  {
    id: 'faq-5',
    question: 'Can we start with an initial sprint and transition to a monthly retainer?',
    answer:
      'Over 70% of our partners begin with a focused 4–8 week Launch Sprint and move into an ongoing Retainer pod for continuous product launches, campaign visuals, and frontend experimentation.',
  },
  {
    id: 'faq-6',
    question: 'What does a typical kickoff require from our founding or marketing team?',
    answer:
      'Just a 60-minute positioning workshop, existing product demos or prototypes, and two key decision-makers for async weekly feedback. We handle copy refinement, visual production, and engineering end to end.',
  },
];

// AI Lab Types & Deterministic Prompt-Aware Generator
export type CreativeDirection =
  | 'Cyber-Minimalist'
  | 'Editorial Luxury'
  | 'Kinetic Spatial'
  | 'Bio-Organic';

export type LabFocusMode = 'Full Brand System' | 'Messaging & Copy' | 'Visual Direction';

export interface GeneratedLabConcept {
  brandName: string;
  direction: CreativeDirection;
  focusMode: LabFocusMode;
  promptEcho: string;
  headline: string;
  positioning: string;
  taglines: string[];
  palette: { name: string; hex: string; role: string }[];
  typography: {
    display: string;
    body: string;
    mono: string;
    rationale: string;
  };
  artDirection: string;
  spatialMotionSpec: string;
}

export const AI_LAB_PRESETS = [
  'Autonomous electric hydrofoil boat for coastal commuting',
  'Spatial audio titanium headphones with adaptive acoustics',
  'Next-gen longevity biotech clinic using cellular imaging',
  'Zero-latency neural workspace OS for creative engineers',
];

const DIRECTION_PROFILES: Record<
  CreativeDirection,
  {
    palette: { name: string; hex: string; role: string }[];
    typography: { display: string; body: string; mono: string; rationale: string };
    motionVerb: string;
    materialCue: string;
  }
> = {
  'Cyber-Minimalist': {
    palette: [
      { name: 'Void Obsidian', hex: '#06070D', role: 'Primary Canvas' },
      { name: 'Electric Cobalt', hex: '#2563EB', role: 'Interactive Accent' },
      { name: 'Ion Cyan', hex: '#06B6D4', role: 'Telemetry Highlight' },
      { name: 'Slate Mist', hex: '#E2E8F0', role: 'Editorial Copy' },
    ],
    typography: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      rationale: 'Crisp geometric proportions paired with tabular technical precision.',
    },
    motionVerb: 'Razor-sharp 180ms cubic-out snaps with magnetic cursor attraction',
    materialCue: 'Anodized dark aluminum, smoked optical glass, and hairline laser dividers',
  },
  'Editorial Luxury': {
    palette: [
      { name: 'Noir Graphite', hex: '#0B0B0F', role: 'Primary Canvas' },
      { name: 'Ultraviolet Silk', hex: '#7C3AED', role: 'Signature Accent' },
      { name: 'Champagne Quartz', hex: '#E5DEC9', role: 'Warm Contrast' },
      { name: 'Silver Ash', hex: '#94A3B8', role: 'Secondary Metadata' },
    ],
    typography: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      rationale: 'High-contrast architectural headlines balanced by generous airy line-height.',
    },
    motionVerb: 'Measured 420ms silk-damped reveals and subtle parallax depth',
    materialCue: 'Honed black basalt, diffused architectural rim light, and fine linen grain',
  },
  'Kinetic Spatial': {
    palette: [
      { name: 'Deep Cosmos', hex: '#040611', role: 'Primary Canvas' },
      { name: 'Hyper Indigo', hex: '#4F46E5', role: 'Primary Action' },
      { name: 'Plasma Cyan', hex: '#22D3EE', role: '3D Edge Glow' },
      { name: 'Frost White', hex: '#F8FAFC', role: 'Primary Headline' },
    ],
    typography: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      rationale: 'Wide-tracked display geometry built to anchor real-time 3D viewports.',
    },
    motionVerb: 'Spring-physics 3D tilt, orbital particle drift, and velocity-reactive shaders',
    materialCue: 'Iridescent polycarbonate, refractive fluid meshes, and volumetric depth fog',
  },
  'Bio-Organic': {
    palette: [
      { name: 'Abyssal Slate', hex: '#070B10', role: 'Primary Canvas' },
      { name: 'Bioluminescent Teal', hex: '#14B8A6', role: 'Active Focus' },
      { name: 'Aurora Violet', hex: '#8B5CF6', role: 'Secondary Glow' },
      { name: 'Mineral White', hex: '#F1F5F9', role: 'Editorial Text' },
    ],
    typography: {
      display: 'Outfit',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      rationale: 'Calm, humanist legibility engineered for high-trust scientific storytelling.',
    },
    motionVerb: 'Continuous organic wave interpolation and breath-paced opacity transitions',
    materialCue: 'Frosted cellular quartz, subsurface light scattering, and liquid glass',
  },
};

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'for', 'with', 'and', 'or', 'of', 'to', 'in', 'on', 'by', 'that', 'this', 'using', 'next', 'gen', 'next-gen',
]);

function extractKeywords(prompt: string): string[] {
  return prompt
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()));
}

function toTitleCase(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function generateBrandConcept(
  rawPrompt: string,
  direction: CreativeDirection,
  focusMode: LabFocusMode
): GeneratedLabConcept {
  const cleaned = rawPrompt.trim() || 'Autonomous spatial computing platform for creators';
  const keywords = extractKeywords(cleaned);
  const primary = toTitleCase(keywords[0] || 'Aether');
  const secondary = toTitleCase(keywords[1] || 'Core');
  const tertiary = (keywords[2] || 'precision').toLowerCase();

  const profile = DIRECTION_PROFILES[direction];
  const lower = cleaned.toLowerCase();

  // Pick a grounded brand name derived from domain cues
  let brandName = `${primary}Labs`;
  if (lower.includes('hydrofoil') || lower.includes('boat') || lower.includes('marine')) {
    brandName = 'Kestrel Marine';
  } else if (lower.includes('audio') || lower.includes('headphone') || lower.includes('sound')) {
    brandName = 'Resonance Studio';
  } else if (lower.includes('biotech') || lower.includes('clinic') || lower.includes('longevity') || lower.includes('cell')) {
    brandName = 'Helix Optics';
  } else if (lower.includes('workspace') || lower.includes('neural') || lower.includes('os')) {
    brandName = 'Synapse OS';
  } else if (keywords.length >= 2) {
    brandName = `${primary} ${secondary}`;
  }

  const headline = `Redefining ${primary.toLowerCase()} through ${direction.toLowerCase()} precision.`;
  const positioning = `Built around "${cleaned}", ${brandName} bridges ${tertiary} engineering with unmistakable visual clarity—replacing noisy category tropes with a calm, high-conviction digital presence.`;

  const taglines = [
    `${brandName}. Precision ${primary.toLowerCase()}, engineered for what comes next.`,
    `Where ${secondary.toLowerCase()} intelligence meets tactile craft.`,
    `Designed for zero friction. Built for ${tertiary} scale.`,
  ];

  const artDirection = `${profile.materialCue}. Frame the core ${primary.toLowerCase()} subject in dramatic low-key studio lighting with razor-thin ${profile.palette[1].name.toLowerCase()} rim illumination and measured depth of field.`;

  const spatialMotionSpec = `${profile.motionVerb}—anchoring hero interactions around pointer-reactive 3D perspective and crisp ${profile.typography.mono} metric readouts.`;

  return {
    brandName,
    direction,
    focusMode,
    promptEcho: cleaned,
    headline,
    positioning,
    taglines,
    palette: profile.palette,
    typography: profile.typography,
    artDirection,
    spatialMotionSpec,
  };
}
