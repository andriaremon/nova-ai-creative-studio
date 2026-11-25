import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AiLabSection } from './components/AiLabSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [labBrief, setLabBrief] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planLabel: string) => {
    setSelectedPlan(planLabel);
    scrollToContact();
  };

  const handleSendConceptToContact = (summary: string) => {
    setLabBrief(summary);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050508] dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection theme={theme} onToggleTheme={handleToggleTheme} />
        <ServicesSection />
        <ProjectsSection />
        <AiLabSection onSendConceptToContact={handleSendConceptToContact} />
        <AboutSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection preselectedScope={selectedPlan} prefilledBrief={labBrief} />
      </main>
      <Footer theme={theme} onToggleTheme={handleToggleTheme} />
    </div>
  );
}
