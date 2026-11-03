import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const CASE_STUDY_SECTIONS = [
  { label: 'Overview', href: '#overview', id: 'overview' },
  { label: 'Problem', href: '#problem', id: 'problem' },
  { label: 'Product', href: '#modules', id: 'modules' },
  { label: 'Architecture', href: '#architecture', id: 'architecture' },
  { label: 'Results', href: '#results', id: 'results' },
];

export const AlumatesCaseStudyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = CASE_STUDY_SECTIONS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(CASE_STUDY_SECTIONS[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(CASE_STUDY_SECTIONS[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setActiveSection(href);
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-brand-surface font-jakarta text-brand-ink antialiased selection:bg-brand-gold selection:text-white min-h-screen">
      {/* BEGIN: Redesigned Floating Pill Dock Header (Consistent with Homepage) */}
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center justify-center p-4 md:pt-6 pointer-events-none font-sans">
        <div className="pointer-events-auto h-14 w-full mx-auto px-4 md:px-6 rounded-full bg-canvas-base/85 backdrop-blur-xl border border-border-subtle/60 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all max-w-[1280px]">
          {/* Left Zone: Tactile Back Pill */}
          <div className="flex items-center gap-3">
            <Link
              to="/#projects"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/80 hover:bg-surface-container-highest text-text-primary font-label-nav text-label-nav font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              <span>Selected Work</span>
            </Link>
          </div>

          {/* Center Zone: 5 Streamlined Chapter Links with Live Scroll-Spy */}
          <nav
            aria-label="Case Study Chapters"
            className="hidden md:flex items-center gap-7 font-label-nav text-label-nav"
          >
            {CASE_STUDY_SECTIONS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-full px-1 ${
                    isActive
                      ? 'text-text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Zone: Visit Live Site Pill CTA + Portrait Avatar + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://alumates.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all shadow-[0_2px_8px_rgba(32,29,226,0.25)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
            >
              <span>Visit Live Site</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              to="/#about"
              aria-label="About Chukwuemeka Victor"
              className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-border-subtle flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-electric-blue transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
            >
              <img
                src={portfolioData.owner.profileImage}
                alt={portfolioData.owner.name}
                className="w-full h-full object-cover object-top"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle chapter navigation"
              className="md:hidden w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-text-primary hover:bg-surface-container-highest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Chapter Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 w-full max-w-[1280px] rounded-3xl bg-canvas-base/95 backdrop-blur-xl border border-border-subtle shadow-lg p-5 flex flex-col gap-2">
            {CASE_STUDY_SECTIONS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`px-3 py-2 rounded-xl font-label-nav text-label-nav transition-colors ${
                    isActive
                      ? 'bg-surface-card text-text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-card hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 mt-1 border-t border-border-subtle flex flex-col gap-2">
              <a
                href="https://alumates.pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all"
              >
                <span>Visit Live Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}
      </header>
      {/* END: Redesigned Floating Pill Dock Header */}

      <main className="pt-16">
        {/* BEGIN: HeroSection */}
        <section className="pt-16 pb-20 border-b border-brand-line scroll-mt-20" id="overview">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-light border border-[#ecd9be] text-xs font-bold tracking-wider text-[#916b35] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Alumates Pro • Case Study
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-ink max-w-4xl mx-auto leading-[1.12]">
              Designing and Building an All-in-One Interior Design Platform
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-brand-subtle max-w-2xl mx-auto font-normal leading-relaxed">
              I designed and built a multi-sided web application that connects courses,
              professional directories, job opportunities, and material sourcing for 1,780+
              registered users.
            </p>

            {/* Hero Metadata Badges & Live Link */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                Product Designer &amp; Bubble Developer
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                5 to 7 Months
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                Paystack &amp; Subscriptions
              </span>
              <span className="text-slate-300">•</span>
              <a
                href="https://alumates.pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md hover:bg-emerald-100 transition inline-flex items-center gap-1"
              >
                <span>Live at alumates.pro</span>
                <span>↗</span>
              </a>
            </div>

            {/* Hero Media Showcase Frame */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="rounded-2xl bg-white border border-brand-line shadow-frame overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-slate-100 to-slate-200">
                {/* Simulated Browser Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-t-xl border border-slate-200/80 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <a
                    href="https://alumates.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono font-medium text-slate-500 hover:text-brand-ink px-6 py-1 rounded bg-slate-50 border border-slate-100 transition-colors"
                  >
                    https://alumates.pro/
                  </a>
                  <a
                    href="https://alumates.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-brand-gold hover:text-brand-gold-hover transition-colors"
                  >
                    Open ↗
                  </a>
                </div>
                {/* Primary Hero Image */}
                <div className="overflow-hidden rounded-b-xl border border-slate-200">
                  <img
                    alt="Alumates Pro Web Platform Hero Homepage - Learn, Hire, Build, Work"
                    className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                    src="/assets/alumates/hero-home.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: HeroSection */}

        {/* BEGIN: ProjectSnapshot */}
        <section className="py-16 bg-white border-b border-brand-line">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat Card (1,780+ Registered Users) */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-brand-gold">
                    Verified Platform Scale
                  </span>
                  <div className="mt-2 text-4xl font-extrabold text-brand-ink">1,780+</div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">
                    Registered User Accounts
                  </div>
                </div>
                <p className="mt-4 text-xs text-brand-subtle leading-normal border-t border-brand-line/60 pt-3">
                  Real accounts registered via Bubble DB. Not claimed as active monthly users or
                  paying cohort.
                </p>
              </div>

              {/* Scope & Role */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                    My Ownership
                  </span>
                  <div className="mt-2 text-lg font-bold text-brand-ink">
                    Lead Product Designer &amp; Bubble Engineer
                  </div>
                </div>
                <ul className="mt-4 space-y-1 text-xs text-brand-subtle border-t border-brand-line/60 pt-3">
                  <li>• UX Research &amp; Wireframing</li>
                  <li>• Responsive Bubble.io UI &amp; Workflows</li>
                  <li>• Relational Database Schema Design</li>
                  <li>• Payment Gateway &amp; Webhook setup</li>
                </ul>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                    Timeline &amp; Iteration
                  </span>
                  <div className="mt-2 text-lg font-bold text-brand-ink">5–7 Months</div>
                  <div className="text-xs text-brand-subtle mt-1">
                    From discovery to production release
                  </div>
                </div>
                <div className="mt-4 text-xs text-brand-subtle border-t border-brand-line/60 pt-3 space-y-1">
                  <span className="block font-medium text-brand-ink">Key Milestones:</span>
                  <span className="block">M1–2: LMS &amp; Course Builder</span>
                  <span className="block">M3–4: Business &amp; Trade Directory</span>
                  <span className="block">M5+: Jobs, Subscriptions &amp; Launch</span>
                </div>
              </div>

              {/* Full Tech Stack */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                    Production Stack
                  </span>
                  <div className="mt-2 text-lg font-bold text-brand-ink">No-Code + APIs</div>
                </div>
                <div className="mt-4 space-y-2 border-t border-brand-line/60 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Bubble.io</span>
                    <span className="text-brand-subtle">Engine &amp; DB</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Paystack</span>
                    <span className="text-brand-subtle">Payments (NGN)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">SendGrid</span>
                    <span className="text-brand-subtle">Transactional Email</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">WhatsApp API</span>
                    <span className="text-brand-subtle">Direct Handoff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: ProjectSnapshot */}

        {/* BEGIN: ProblemAndContext */}
        <section className="py-20 border-b border-brand-line scroll-mt-20" id="problem">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
                01. The Strategic Problem
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                The Fragmentation of West Africa’s Interior Design &amp; Building Economy
              </h2>
            </div>

            <div className="mt-8 text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                In the emerging creative and interior design sector in Nigeria and West Africa, the
                journey of building a career or delivering a project was fractured across disjointed
                digital spaces:
              </p>
              <blockquote className="pl-4 border-l-2 border-brand-gold text-brand-ink font-medium italic my-4">
                “Learning, hiring, finding projects, and sourcing materials happen across separate
                platforms. This makes it difficult for students, professionals, and customers to
                navigate the industry efficiently.”
              </blockquote>
              <p>
                Students studied theory on foreign platforms with non-localized curricula; certified
                designers struggled to verify their credentials to prospective clients; homeowners
                turned to unvetted social media pages for artisans; and trade suppliers relied on
                haphazard peer recommendations.
              </p>
            </div>

            {/* Comparative Diagram */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* The Fragmented Status Quo */}
              <div className="bg-red-50/50 border border-red-200/70 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded">
                    The Disjointed Reality (Before)
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-3">
                    Silos, Lost Revenue &amp; Zero Verification
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>Generic Foreign LMS:</strong> High tuition, irrelevant building
                        codes, and no local material context.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>WhatsApp Group Chaos:</strong> Jobs shared across unsearchable chat
                        threads without escrows or briefs.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>Instagram DM Sourcing:</strong> Unverified fabricators and POP
                        artisans with volatile pricing and ghosting risks.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-rose-200/50 text-xs font-mono text-rose-800">
                  High friction • Zero continuity from learning to earning
                </div>
              </div>

              {/* The Alumates Pro Ecosystem */}
              <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded">
                    The Alumates Pro Solution
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-3">
                    One Unified Vertical Platform
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Localized Certified Academy:</strong> West African context, free
                        preview module, automated certificate generation.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Tiered Verified Directory:</strong> Graduating students transition
                        directly into listed Level-based practitioner profiles.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Marketplace &amp; Business Directory:</strong> Direct bidding on
                        construction briefs and verified vendor supply catalogs.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs font-mono text-[#916b35]">
                  Full Lifecycle: Learn → Get Certified → Get Hired → Procure
                </div>
              </div>
            </div>

            {/* Target Audience Mapping */}
            <div className="mt-14">
              <h3 className="font-bold uppercase tracking-wider font-mono mb-4 text-xs text-brand-subtle">
                Target Audience &amp; Value Alignment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-white border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1">1. Students &amp; Starters</span>
                  <p className="text-brand-subtle">
                    Structured intro, low-barrier ₦30k pricing, credentials.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1">2. Practicing Designers</span>
                  <p className="text-brand-subtle">
                    Verified portfolio hub, levels, client trust badge.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1">3. Trade Artisans</span>
                  <p className="text-brand-subtle">
                    Carpenters, POP finishers, welders seeking project briefs.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1">4. Clients &amp; Owners</span>
                  <p className="text-brand-subtle">
                    Post jobs with fixed budgets, hire rated talent directly.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1">5. Material Merchants</span>
                  <p className="text-brand-subtle">
                    List furniture and building supplies on Business Pulse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: ProblemAndContext */}

        {/* BEGIN: CoreModulesDeepDive */}
        <section className="py-20 bg-slate-50/60 border-b border-brand-line scroll-mt-20" id="modules">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
                02. Product Deep Dive
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                The Six Interconnected Product Experiences
              </h2>
              <p className="mt-4 text-base text-brand-subtle leading-relaxed">
                Every feature was engineered to close the feedback loop between education and
                commerce. Here is an authentic breakdown of the functional modules in production.
              </p>
            </div>

            {/* 6.1 Learning Management System (LMS) */}
            <div className="mt-16 bg-white rounded-2xl border border-brand-line shadow-sm overflow-hidden p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-line pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                    Module 01
                  </span>
                  <h3 className="text-2xl font-bold text-brand-ink mt-1">
                    Learning Management &amp; Certification Engine
                  </h3>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md">
                  Primary Acquisition Funnel
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4 text-sm text-slate-600">
                  <p>
                    To lower friction while maintaining educational rigor, I devised a{' '}
                    <strong>“Freemium Module Architecture”</strong>:
                  </p>
                  <div className="space-y-3 bg-brand-surface p-4 rounded-xl border border-brand-line">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <div>
                        <h4 className="font-bold text-brand-ink text-xs uppercase">
                          Free Module 1 Preview
                        </h4>
                        <p className="text-xs text-brand-subtle mt-0.5">
                          Students access full lesson content, audio guides, and PDF notes without
                          entering card details.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <div>
                        <h4 className="font-bold text-brand-ink text-xs uppercase">
                          Paystack Direct Checkout
                        </h4>
                        <p className="text-xs text-brand-subtle mt-0.5">
                          Instant ₦30,000 one-time unlocks Modules 2, 3, and 4 via real-time Bubble
                          payment webhook triggers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                        3
                      </span>
                      <div>
                        <h4 className="font-bold text-brand-ink text-xs uppercase">
                          Graded Quizzes &amp; Certificates
                        </h4>
                        <p className="text-xs text-brand-subtle mt-0.5">
                          Sequential lesson locks, automated scoring, and dynamic downloadable
                          certificate generation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    *Featured training: &quot;Interior Design Associate Training&quot; (1,780
                    enrolled students across the platform).
                  </p>
                </div>

                {/* LMS Screenshots Grid */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Course Discovery */}
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs">
                    <div className="bg-slate-100 px-3 py-1.5 text-[11px] font-mono text-slate-600 border-b border-brand-line flex justify-between">
                      <span>Course Collections Landing (Desktop)</span>
                      <span>₦30,000 Associate Training</span>
                    </div>
                    <img
                      alt="Explore Our Course Collections - Alumates Pro"
                      className="w-full h-auto"
                      src="/assets/alumates/course-collections.png"
                    />
                  </div>
                  {/* Course Detail Overview */}
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs">
                    <div className="bg-slate-100 px-3 py-1.5 text-[11px] font-mono text-slate-600 border-b border-brand-line flex justify-between">
                      <span>Syllabus &amp; Enrollment Interface</span>
                      <span>Module breakdown + Student Count (1780)</span>
                    </div>
                    <img
                      alt="Interior Design Associate Training Course Details"
                      className="w-full h-auto"
                      src="/assets/alumates/course-details.png"
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Viewer & Quiz Flow Showcase */}
              <div className="mt-8 pt-8 border-t border-brand-line">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-4">
                  In-Lesson Player &amp; Interactive Graded Quizzes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs bg-white">
                    <div className="bg-slate-100 px-2.5 py-1 text-[10px] font-mono text-slate-600 border-b border-brand-line">
                      Module 1 Syllabus Tree &amp; Locks
                    </div>
                    <img
                      alt="Lesson modules, reading materials and quiz access"
                      className="w-full h-auto"
                      src="/assets/alumates/lesson-tree.png"
                    />
                  </div>
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs bg-white">
                    <div className="bg-slate-100 px-2.5 py-1 text-[10px] font-mono text-slate-600 border-b border-brand-line">
                      Audio-Guided Lecture Player
                    </div>
                    <img
                      alt="Introduction to Interior Design Audio player and lesson reading"
                      className="w-full h-auto"
                      src="/assets/alumates/audio-lesson.png"
                    />
                  </div>
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs bg-white">
                    <div className="bg-slate-100 px-2.5 py-1 text-[10px] font-mono text-slate-600 border-b border-brand-line">
                      Graded Multi-choice Assessment
                    </div>
                    <img
                      alt="Graded Quiz UI for Interior Design"
                      className="w-full h-auto"
                      src="/assets/alumates/graded-quiz.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6.2 Professional Directory */}
            <div className="mt-12 bg-white rounded-2xl border border-brand-line shadow-sm overflow-hidden p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-line pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                    Module 02
                  </span>
                  <h3 className="text-2xl font-bold text-brand-ink mt-1">
                    Tech, Interior Design &amp; Building Directory
                  </h3>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold rounded-md">
                  Peer Verification &amp; Discovery
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4 text-sm text-slate-600">
                  <p>
                    The directory serves as the bridge between educational accomplishment and
                    commercial viability. Practitioners can build standardized portfolios
                    highlighting verified competencies.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-brand-line space-y-2 text-xs">
                    <div className="font-bold text-slate-800 text-sm mb-1">
                      Key Directory Capabilities:
                    </div>
                    <div>
                      • <strong>Level Rank Badges:</strong> &quot;Basic Member - Level 0&quot;,
                      &quot;Associate Member - Level 2&quot;, &quot;Senior Associate - Level 3&quot;
                      linked directly to training and verification.
                    </div>
                    <div>
                      • <strong>Filter by ID:</strong> Search bar enables instant lookups via unique{' '}
                      <code>Alumates ID</code>.
                    </div>
                    <div>
                      • <strong>Multi-image Project Carousel:</strong> Onsite fabrication and
                      architectural photos loaded natively.
                    </div>
                  </div>
                </div>

                {/* Directory UI Screenshots */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs">
                    <div className="bg-slate-100 px-3 py-1 text-[11px] font-mono text-slate-600 border-b border-brand-line">
                      Senior Associate Level 3 Profile
                    </div>
                    <img
                      alt="Deji Adesida - Roof Procurement and Trusses Fabrication"
                      className="w-full h-auto"
                      src="/assets/alumates/directory-level3.png"
                    />
                  </div>
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs">
                    <div className="bg-slate-100 px-3 py-1 text-[11px] font-mono text-slate-600 border-b border-brand-line">
                      Classic Tier Filter &amp; Search View
                    </div>
                    <img
                      alt="Bashir Abdulraheem - Architectural plans profile card"
                      className="w-full h-auto"
                      src="/assets/alumates/directory-classic.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6.3 & 6.4: Business Directory, Monetization & Jobs Marketplace */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Jobs & Marketplace */}
              <div className="bg-white rounded-2xl border border-brand-line shadow-sm p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-brand-line pb-4 mb-5">
                    <div>
                      <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                        Module 03
                      </span>
                      <h3 className="text-xl font-bold text-brand-ink">
                        Project, Supplies &amp; Jobs Board
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded">
                      B2B/B2C Bidding
                    </span>
                  </div>
                  <p className="text-xs text-brand-subtle mb-4 leading-relaxed">
                    Clients and contractors post specialized jobs with exact budgets, location
                    requirements, and skill tags (e.g., POP Finishing, Sofa Making).
                  </p>
                  <div className="rounded-xl border border-brand-line overflow-hidden shadow-xs mb-4">
                    <div className="bg-slate-100 px-3 py-1 text-[10px] font-mono text-slate-600 border-b border-brand-line">
                      Live Project Board (₦30k–₦1.5m Budgets)
                    </div>
                    <img
                      alt="Alumates Pro Projects, Supplies and Jobs board"
                      className="w-full h-auto"
                      src="/assets/alumates/jobs-board.png"
                    />
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 border-t border-brand-line pt-4">
                  <li>
                    • Clear location tags: OnSite vs Remote with State classification (Lagos, Niger,
                    etc.).
                  </li>
                  <li>
                    • Explicit salary/budget boundaries preventing predatory underbidding.
                  </li>
                </ul>
              </div>

              {/* Business Pulse Monetization */}
              <div className="bg-white rounded-2xl border border-brand-line shadow-sm p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-brand-line pb-4 mb-5">
                    <div>
                      <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                        Module 04 &amp; 05
                      </span>
                      <h3 className="text-xl font-bold text-brand-ink">
                        Business Pulse &amp; Trade Supplies
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold rounded">
                      Recurring Revenue
                    </span>
                  </div>
                  <div className="space-y-4 text-xs text-slate-600">
                    <p>
                      To monetize companies without locking out small practitioners, I created{' '}
                      <strong>&quot;Business Pulse&quot;</strong>: a tiered recurring monthly
                      listing plan integrated with Paystack subscriptions.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-slate-50 border border-brand-line rounded-lg">
                        <div className="font-bold text-slate-900">Classic Tier</div>
                        <div className="text-base font-extrabold text-brand-gold mt-1">
                          ₦4,000
                          <span className="text-[10px] text-slate-400 font-normal">/month</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-2">
                          Enhanced profile visibility, recommendation eligibility, and improved
                          discovery.
                        </div>
                      </div>
                      <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg">
                        <div className="font-bold text-slate-900">Pro Tier</div>
                        <div className="text-base font-extrabold text-[#916b35] mt-1">
                          ₦8,000
                          <span className="text-[10px] text-slate-400 font-normal">/month</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-2">
                          Enhanced profile visibility, recommendation eligibility, and improved
                          opportunities to be contacted.
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-100 rounded-md border border-slate-200 text-[11px] text-slate-700">
                      <strong>Trade &amp; Materials Marketplace:</strong> Enables material merchants
                      to list finishes, furniture, and building supplies, triggering direct buyer
                      chats via WhatsApp Web API.
                    </div>
                  </div>
                </div>
                {/* Historical AI Feature Note */}
                <div className="mt-6 pt-4 border-t border-brand-line bg-amber-50/30 p-3 rounded-lg border border-amber-200/50">
                  <span className="text-[10px] font-mono font-bold text-amber-900 uppercase block mb-1">
                    6.6 Product Evolution Note: AI Assistant (Historical Feature)
                  </span>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    An early iteration included an OpenAI-powered design consultancy assistant for
                    questions about architecture, interior design, and technology. This historical
                    feature was subsequently retired to keep the product focused on core learning
                    and marketplace workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: CoreModulesDeepDive */}

        {/* BEGIN: TechnicalArchitecture */}
        <section className="py-20 border-b border-brand-line scroll-mt-20" id="architecture">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
                03. Full-Stack Bubble Architecture
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Relational Data Modeling Without Code
              </h2>
              <p className="mt-4 text-base text-brand-subtle leading-relaxed">
                Building complex, high-traffic SaaS systems on Bubble.io requires rigorous database
                normalization, privacy rules, and state management. Below is the conceptual
                learning structure and verified database schema powering Alumates Pro.
              </p>
            </div>

            {/* Database Schema Breakdown */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Schema Block 1 */}
              <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-brand-royal bg-blue-50 px-2 py-0.5 rounded">
                    Conceptual Learning Structure
                  </span>
                </div>
                <ul className="font-mono text-xs space-y-1.5 text-slate-600">
                  <li>
                    • <span className="text-brand-ink font-bold">Courses</span> → Modules → Lessons
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Quizzes</span> &amp;{' '}
                    <span className="text-brand-ink font-bold">UserCorrectAnswers</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Lesson Progress</span>{' '}
                    (completedLesson)
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Certificates</span> (automated on
                    completion)
                  </li>
                </ul>
              </div>

              {/* Schema Block 2 */}
              <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Data Types: Profiles &amp; Trade
                  </span>
                </div>
                <ul className="font-mono text-xs space-y-1.5 text-slate-600">
                  <li>
                    • <span className="text-brand-ink font-bold">TechProfile</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">TradeProfile</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Supply Item</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">ResumeFile</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">TrainingEvent</span>
                  </li>
                </ul>
              </div>

              {/* Schema Block 3 */}
              <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                    Data Types: Subscription &amp; User
                  </span>
                </div>
                <ul className="font-mono text-xs space-y-1.5 text-slate-600">
                  <li>
                    • <span className="text-brand-ink font-bold">User</span> (AppRole,
                    applications, completedLesson)
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Subscription</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Thread</span>
                  </li>
                  <li>
                    • <span className="text-brand-ink font-bold">Referral_Click</span> &amp;{' '}
                    <span className="text-brand-ink font-bold">Referral_Signup</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Workflow / State Machine Diagram */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-brand-line">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-4">
                Paystack Webhook &amp; Course Entitlement State Machine
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    01. Initialization
                  </span>
                  <p className="text-brand-subtle">
                    User clicks &quot;Enroll (₦30,000)&quot;. Paystack checkout initializes with
                    Bubble user &amp; course context.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    02. Payment Verification
                  </span>
                  <p className="text-brand-subtle">
                    Paystack confirms transaction to Bubble backend workflow, verifying course
                    purchase status.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    03. Course Entitlement
                  </span>
                  <p className="text-brand-subtle">
                    Permanent course access is unlocked for the student across sequential modules,
                    lessons, and quizzes.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    04. Transactional Email
                  </span>
                  <p className="text-brand-subtle">
                    SendGrid delivers transactional email confirmation as the student progresses
                    toward certification.
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Bubble Database Editor Evidence */}
            <div className="mt-10 rounded-2xl bg-white border border-brand-line overflow-hidden shadow-xs">
              <div className="bg-slate-100 px-4 py-2.5 text-xs font-mono text-slate-600 border-b border-brand-line flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-brand-ink">
                  Bubble.io Database Editor Evidence: User Data Type &amp; Custom Tables
                </span>
                <span>
                  Showing applications, AppRole, Banner_image, bio, completedLesson &amp; custom
                  types
                </span>
              </div>
              <img
                src="/assets/alumates/bubble-db-user.png"
                alt="Bubble Database Editor screenshot showing User fields and custom data types"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        {/* END: TechnicalArchitecture */}

        {/* BEGIN: ResultsAndMetrics */}
        <section className="py-20 bg-white border-b border-brand-line scroll-mt-20" id="results">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
                04. Measurable Outcomes
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Realized Results &amp; Platform Health
              </h2>
              <p className="mt-3 text-base text-brand-subtle">
                Verified production milestones recorded on the live database.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-4xl font-extrabold text-brand-ink font-mono tracking-tight">
                  1,780+
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  Total Registered Accounts
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Demonstrated demand for specialized interior design learning and professional
                  directories in the West African market through direct student and practitioner
                  registrations.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-4xl font-extrabold text-brand-ink font-mono tracking-tight">
                  100%
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  End-to-End Solo Execution
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Designed the interface from scratch and built the Bubble frontend, database
                  schema, conditional access rules, and Paystack/SendGrid/WhatsApp integrations.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-4xl font-extrabold text-brand-ink font-mono tracking-tight">
                  5–7 Mo.
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  Zero-to-Production Velocity
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Launched a live revenue-generating platform with one-time course purchases,
                  Business Pulse monthly subscriptions, certificates, and job boards.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END: ResultsAndMetrics */}

        {/* BEGIN: ReflectionsAndLearnings */}
        <section className="py-20 border-b border-brand-line scroll-mt-20" id="reflections">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
              05. Reflections &amp; Engineering Decisions
            </span>
            <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
              What I Learned Designing for Emerging Creative Economies
            </h2>

            <div className="mt-8 space-y-6 text-sm text-slate-700 leading-relaxed">
              <div className="p-5 rounded-xl bg-white border border-brand-line">
                <h3 className="font-bold text-brand-ink mb-1">
                  1. Pragmatic Communication Beats Platform Lock-in
                </h3>
                <p className="text-brand-subtle">
                  Industry observation and informal conversations showed that tradespeople,
                  professionals, and clients in West Africa naturally conduct business on WhatsApp.
                  Connecting directory profiles and product listings directly to WhatsApp contact
                  workflows removed communication friction immediately.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-brand-line">
                <h3 className="font-bold text-brand-ink mb-1">
                  2. No-Code Requires True Software Engineering Mindset
                </h3>
                <p className="text-brand-subtle">
                  Building with no-code tools requires the same attention to structure, planning,
                  and software engineering principles as traditional development, especially when
                  coordinating relational data across <code>Courses</code>, <code>Modules</code>,{' '}
                  <code>Lessons</code>, <code>Quizzes</code>, <code>Lesson Progress</code>, and{' '}
                  <code>Certificates</code>.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white border border-brand-line">
                <h3 className="font-bold text-brand-ink mb-1">
                  3. Supporting Multiple User Journeys &amp; Revenue Models in One Ecosystem
                </h3>
                <p className="text-brand-subtle">
                  Combining one-time course purchases with recurring Business Pulse visibility
                  subscriptions challenged me to design clear payment states, role permissions, and
                  navigation across six interconnected modules.
                </p>
              </div>
            </div>

            {/* Designer Quote Block */}
            <div className="mt-12 p-8 rounded-2xl bg-amber-50/40 border border-amber-200/70">
              <p className="text-base text-slate-800 italic leading-relaxed">
                “Building Alumates Pro strengthened my understanding of how product design, database
                architecture, and business logic work together in a real application. It challenged
                me to think beyond individual screens and consider how different user journeys,
                payment systems, data relationships, and workflows connect to form one functional
                product.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={portfolioData.owner.profileImage}
                  alt={portfolioData.owner.name}
                  className="w-9 h-9 rounded-full object-cover object-top border border-amber-300"
                />
                <div>
                  <div className="font-bold text-xs text-brand-ink">{portfolioData.owner.name}</div>
                  <div className="text-[11px] text-brand-subtle">
                    Product Designer &amp; Bubble Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: ReflectionsAndLearnings */}

        {/* BEGIN: ContactCTA */}
        <footer
          className="py-24 bg-[#0b1120] text-white border-t border-slate-800 scroll-mt-20"
          id="contact"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-xs font-mono font-bold tracking-widest text-amber-300 uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              Available For New Ventures
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Have a Complex Product Idea? Let’s Design &amp; Build It.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              I partner with founders and established companies to turn ambitious product visions
              into production-ready web platforms on Bubble.io with world-class UX.
            </p>

            {/* High-Contrast Accessible Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold bg-[#d4a86a] hover:bg-[#e3b97d] text-slate-950 transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-amber-300"
                href={portfolioData.owner.scheduleCallHref}
                data-schedule-call="true"
              >
                Schedule a Call
              </a>
              <a
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-100 text-slate-950 border border-white transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-white"
                href="https://alumates.pro/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit Alumates Pro ↗
              </a>
              <Link
                to="/#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-500 hover:border-slate-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-slate-300"
              >
                ← Explore More Projects
              </Link>
            </div>

            {/* Accessible Footer Metadata & Navigation Row */}
            <div className="mt-14 pt-8 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
              <div className="font-medium text-slate-200">
                © {new Date().getFullYear()} {portfolioData.owner.name}. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="https://alumates.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-amber-300 font-medium transition-colors underline underline-offset-4"
                >
                  alumates.pro ↗
                </a>
                <a
                  href={portfolioData.owner.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-amber-300 font-medium transition-colors"
                >
                  LinkedIn
                </a>
                <span className="font-mono text-slate-300">
                  Case Study: Alumates Pro Ecosystem
                </span>
              </div>
            </div>
          </div>
        </footer>
        {/* END: ContactCTA */}
      </main>
    </div>
  );
};

