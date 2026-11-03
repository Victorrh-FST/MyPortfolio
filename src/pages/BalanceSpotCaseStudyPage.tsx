import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const CASE_STUDY_SECTIONS = [
  { label: 'Overview', href: '#overview', id: 'overview' },
  { label: 'Problem', href: '#problem', id: 'problem' },
  { label: 'Product', href: '#modules', id: 'modules' },
  { label: 'Architecture', href: '#architecture', id: 'architecture' },
  { label: 'Outcomes', href: '#results', id: 'results' },
];

export const BalanceSpotCaseStudyPage: React.FC = () => {
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
    <div className="bg-brand-surface font-jakarta text-brand-ink antialiased selection:bg-electric-blue selection:text-white min-h-screen">
      {/* BEGIN: Floating Pill Dock Header (Consistent with Portfolio Design System) */}
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

          {/* Right Zone: Schedule a Call CTA + Portrait Avatar + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.owner.scheduleCallHref}
              data-schedule-call="true"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all shadow-[0_2px_8px_rgba(32,29,226,0.25)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
            >
              <span>Schedule a Call</span>
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
                href={portfolioData.owner.scheduleCallHref}
                data-schedule-call="true"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all"
              >
                <span>Schedule a Call</span>
              </a>
            </div>
          </div>
        )}
      </header>
      {/* END: Floating Pill Dock Header */}

      <main className="pt-16">
        {/* BEGIN: HeroSection */}
        <section className="pt-16 pb-20 border-b border-brand-line scroll-mt-20" id="overview">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold tracking-wider text-orange-800 uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              BalanceSpot Gym Manager • B2B SaaS Case Study
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-ink max-w-4xl mx-auto leading-[1.12]">
              Designing and Engineering a Multi-Tenant Gym Management System
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-brand-subtle max-w-2xl mx-auto font-normal leading-relaxed">
              I designed and built a cloud B2B SaaS application on Bubble.io that helps independent
              gyms automate memberships, QR check-ins, trainer schedules, and recurring billing.
            </p>

            {/* Hero Metadata Badges */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                Product Designer &amp; Bubble Developer
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                Multi-Tenant B2B SaaS
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-1.5 bg-white border border-brand-line rounded-md shadow-xs">
                QR Check-In &amp; Paystack Billing
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                Functional Production MVP
              </span>
            </div>

            {/* Hero Browser Preview Frame: Live Product Screenshots */}
            <div className="mt-14 max-w-5xl mx-auto text-left">
              <div className="rounded-2xl bg-white border border-brand-line shadow-frame overflow-hidden p-3 sm:p-5 bg-gradient-to-b from-slate-100 to-slate-200">
                {/* Simulated Browser Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-t-xl border border-slate-200/80 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[11px] font-mono font-medium text-slate-500 px-6 py-1 rounded bg-slate-50 border border-slate-100">
                    balancespot.io • Pulse n Flow PT Workspace
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                    Production MVP
                  </span>
                </div>

                {/* Primary Hero Screenshot + Tenant Dashboard Preview */}
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm">
                    <img
                      src="/assets/balancespot/01-landing-hero.png"
                      alt="BalanceSpot Gym Manager landing page: Run Your Gym Not Spreadsheets"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm">
                    <img
                      src="/assets/balancespot/03-dashboard-home.png"
                      alt="BalanceSpot Gym Manager tenant dashboard for Pulse n Flow PT showing active members, revenue, check-ins, and at-risk members"
                      className="w-full h-auto object-cover"
                    />
                  </div>
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
              {/* Architecture Model */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange-600">
                    SaaS Architecture
                  </span>
                  <div className="mt-2 text-2xl font-extrabold text-brand-ink">
                    Multi-Tenant B2B
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">
                    Isolated Gym Workspaces
                  </div>
                </div>
                <p className="mt-4 text-xs text-brand-subtle leading-normal border-t border-brand-line/60 pt-3">
                  Engineered with row-level Bubble privacy rules so multiple gyms operate securely
                  on one shared cloud codebase.
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
                  <li>• Multi-Role UX &amp; Interface Design</li>
                  <li>• Multi-Tenant Database Architecture</li>
                  <li>• QR &amp; Reg-Code Check-In Workflows</li>
                  <li>• Paystack &amp; Automated Expiry Cron Jobs</li>
                </ul>
              </div>

              {/* Core Modules */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                    Product Scope
                  </span>
                  <div className="mt-2 text-lg font-bold text-brand-ink">6 Core Modules</div>
                  <div className="text-xs text-brand-subtle mt-1">
                    End-to-end gym operations suite
                  </div>
                </div>
                <div className="mt-4 text-xs text-brand-subtle border-t border-brand-line/60 pt-3 space-y-1">
                  <span className="block">• QR &amp; Reg-Code Check-In Engine</span>
                  <span className="block">• Subscriptions &amp; Expiry Automation</span>
                  <span className="block">• Trainer, Staff &amp; Analytics Portals</span>
                </div>
              </div>

              {/* Full Tech Stack */}
              <div className="bg-brand-surface rounded-xl p-6 border border-brand-line flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                    Production Stack
                  </span>
                  <div className="mt-2 text-lg font-bold text-brand-ink">Bubble.io + APIs</div>
                </div>
                <div className="mt-4 space-y-2 border-t border-brand-line/60 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Bubble.io</span>
                    <span className="text-brand-subtle">Full-Stack &amp; Cron</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">QR Scanner API</span>
                    <span className="text-brand-subtle">Check-In Engine</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Paystack</span>
                    <span className="text-brand-subtle">Recurring Billing</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Email &amp; WhatsApp</span>
                    <span className="text-brand-subtle">Renewal Alerts</span>
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
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-wider text-orange-600 uppercase">
                01. The Operational Problem
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Why Independent Gyms Lose Revenue at the Front Desk
              </h2>
            </div>

            <div className="mt-8 text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                Most independent gyms and fitness studios manage hundreds of members using paper
                attendance notebooks, static spreadsheets, and manual bank-transfer screenshots on
                WhatsApp.
              </p>
              <blockquote className="pl-4 border-l-2 border-orange-500 text-brand-ink font-medium italic my-4">
                “When peak morning and evening rushes hit, reception staff cannot verify who has an
                active subscription in under five seconds, leading to revenue leakage and awkward
                front-desk disputes.”
              </blockquote>
            </div>

            {/* Comparative Diagram */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-red-50/50 border border-red-200/70 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded">
                    Manual Gym Operations (Before)
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-3">
                    Spreadsheets, Expired Access &amp; Blind Spots
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>Unverified Walk-Ins:</strong> Members with expired monthly plans
                        continue accessing equipment unnoticed during busy hours.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>Zero Automated Follow-Up:</strong> Staff manually scroll through
                        sheets to find expiring members instead of sending automated renewal links.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-rose-500 mr-2.5 font-bold">✕</span>
                      <span>
                        <strong>Disconnected Trainer Schedules:</strong> Trainers lack real-time
                        visibility into which clients are active and checked in.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-rose-200/50 text-xs font-mono text-rose-800">
                  Revenue leakage • Slow front-desk queues
                </div>
              </div>

              <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded">
                    BalanceSpot Cloud SaaS (After)
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-3">
                    Automated Multi-Tenant Operations
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Dual-Mode Instant Check-In:</strong> Front-desk staff scan a QR code
                        or enter a 9-character Reg. Code to validate eligibility in under 2 seconds.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Automated Expiry &amp; Renewals:</strong> Scheduled backend
                        workflows flip expired plans automatically and trigger Paystack renewal
                        reminders via Email and WhatsApp.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2.5 font-bold">✓</span>
                      <span>
                        <strong>Role-Based Multi-Tenancy:</strong> Dedicated permissions for Gym
                        Owners, Receptionists, Trainers, and Members.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-mono text-emerald-800">
                  Sub-2s check-in • Automated subscription lifecycle
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
              <span className="text-xs font-mono font-bold tracking-wider text-orange-600 uppercase">
                02. Product Deep Dive
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Six Core Modules Engineered for Daily Gym Operations
              </h2>
              <p className="mt-4 text-base text-brand-subtle leading-relaxed">
                Every workflow in BalanceSpot was designed to minimize clicks for front-desk staff
                while giving gym owners complete financial and operational control.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Module 1 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 01
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    QR &amp; Reg-Code Check-In
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Dual-path reception modal allowing staff to scan a member&apos;s QR pass or type
                    their unique case-sensitive code (e.g., <code>543600Pul</code>) to verify
                    subscription status before granting floor access.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  Camera QR + Fallback Reg Code
                </div>
              </div>

              {/* Module 2 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 02
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    Subscription &amp; Plan Engine
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Supports custom time-based plans (Monthly, Quarterly, Annual) and session
                    packages with automated start/end date calculation and instant status badges.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  Active • Expiring Soon • Expired
                </div>
              </div>

              {/* Module 3 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 03
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    Multi-Tenant Workspace &amp; RBAC
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Each onboarded gym receives an isolated workspace with custom branding, branch
                    settings, and role-based access control for Owners, Front Desk, Trainers, and
                    Members.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  4 Role Permission Tiers
                </div>
              </div>

              {/* Module 4 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 04
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    Trainer &amp; Session Management
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Assigns personal trainers to members, tracks trainer rosters, and logs workout
                    attendance so coaches can monitor client consistency.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  Roster &amp; Session Tracking
                </div>
              </div>

              {/* Module 5 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 05
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    Paystack Billing &amp; Alerts
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Integrates Paystack for online plan renewals and dispatches automated welcome
                    QR passes, payment receipts, and expiry alerts via Email and WhatsApp/SMS.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  Paystack + Email + WhatsApp
                </div>
              </div>

              {/* Module 6 */}
              <div className="bg-white rounded-2xl border border-brand-line p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                    Module 06
                  </span>
                  <h3 className="text-lg font-bold text-brand-ink mt-1">
                    Analytics &amp; Attendance KPIs
                  </h3>
                  <p className="mt-2 text-xs text-brand-subtle leading-relaxed">
                    Gives gym owners a live pulse on active vs. expired memberships, daily check-in
                    peaks, retention cohorts, and monthly subscription collections.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-line text-[11px] font-mono text-slate-500">
                  Real-Time Tenant Metrics
                </div>
              </div>
            </div>

            {/* Product Interface Walkthrough Gallery (All Real Production Screenshots) */}
            <div className="mt-16 space-y-12">
              {/* Row 1: Portal Login & 4-Step Member Onboarding Wizard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 01 • Multi-Tenant Portal Access
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Authentication</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Gym Owner &amp; Staff Portal Login
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Clean authentication entry point routing gym owners, receptionists, and
                      trainers directly into their isolated facility workspace.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/02-portal-login.png"
                      alt="BalanceSpot portal login interface"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 02 • 4-Step Member Onboarding
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Wizard Flow</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Guided Registration &amp; Verification Photo Upload
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Structured 4-step wizard (Personal Details, Base Plan, Add-On, Payment) with
                      front-desk photo capture for check-in identity verification.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/06-add-member-wizard.png"
                      alt="BalanceSpot 4-step add member onboarding wizard"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Dual-Mode Check-In Modal & Multi-Status Member Directory */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 03 • Front-Desk Check-In Engine
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">QR + Reg. Code</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Dual-Mode QR Scanner &amp; Reg-Code Validation Modal
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Receptionists scan a member&apos;s QR code or enter their unique case-sensitive
                      registration code to validate membership eligibility in real time.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/07-member-checkin-modal.png"
                      alt="BalanceSpot Member Check-in modal with QR scanner and Reg. Code validation"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 04 • Member Lifecycle Directory
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">9 Status Filters</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Filterable Member Directory &amp; Subscription Tracking
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Instant filtering across Active, Expiring Soon, Inactive, Suspended, Expelled,
                      Paused, Birthday Today, and Expired cohorts with trainer and plan filters.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/08-members-directory.png"
                      alt="BalanceSpot Members Directory with status filters and subscription counts"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: 360 Member Details Overview & Interactive Attendance Calendar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 05 • 360° Member Profile &amp; Quick Actions
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Member CRM</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Subscription Status, Visit Metrics &amp; Action Menu
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Displays monthly check-ins, total visits, assigned trainer, and one-click
                      actions to Renew Subscription, Add Plan, Assign Trainer, or Resend Email.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/04-member-details-overview.png"
                      alt="BalanceSpot Member Details overview showing expired badge and quick actions menu"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-brand-line p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-orange-600 uppercase">
                        Screen 06 • Attendance Calendar &amp; WhatsApp Nudges
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Retention Tools</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-ink">
                      Monthly Check-In Calendar, Body Measurements &amp; Direct WhatsApp
                    </h3>
                    <p className="mt-1 text-xs text-brand-subtle leading-relaxed mb-4">
                      Tracks member attendance across month, week, and day views with built-in
                      shortcuts to log body measurements or message quiet members on WhatsApp.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src="/assets/balancespot/05-member-attendance-calendar.png"
                      alt="BalanceSpot Member Attendance Calendar with Log Measurement and WhatsApp actions"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: CoreModulesDeepDive */}

        {/* BEGIN: TechnicalArchitecture (2-Part Spotlight) */}
        <section className="py-20 border-b border-brand-line scroll-mt-20" id="architecture">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold tracking-wider text-orange-600 uppercase">
                03. Full-Stack Bubble Architecture
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Multi-Tenant Isolation &amp; Real-Time Check-In State Machine
              </h2>
              <p className="mt-4 text-base text-brand-subtle leading-relaxed">
                Designing a multi-tenant B2B SaaS on Bubble.io required strict server-side tenant
                isolation alongside a zero-latency check-in validation pipeline.
              </p>
            </div>

            {/* Part 1: Multi-Tenant Database Schema & Privacy Rules */}
            <div className="mt-12">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-4">
                Part 1 • Multi-Tenant Relational Schema &amp; Row-Level Privacy Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                  <span className="font-mono text-xs font-bold text-brand-royal bg-blue-50 px-2 py-0.5 rounded">
                    Tenant &amp; Access Layer
                  </span>
                  <ul className="mt-3 font-mono text-xs space-y-1.5 text-slate-600">
                    <li>
                      • <span className="text-brand-ink font-bold">GymTenant</span> (name, prefix,
                      owner, active_flag)
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">User</span> (gym_tenant, role:
                      Owner | Staff | Trainer | Member)
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">Privacy Rule:</span>{' '}
                      <code>Current User&apos;s gym_tenant is This Record&apos;s gym_tenant</code>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Membership &amp; Billing Layer
                  </span>
                  <ul className="mt-3 font-mono text-xs space-y-1.5 text-slate-600">
                    <li>
                      • <span className="text-brand-ink font-bold">MemberProfile</span> (reg_code,
                      qr_image, status, assigned_trainer)
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">SubscriptionPlan</span> (title,
                      duration_days, price_ngn)
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">MembershipRecord</span>{' '}
                      (start_date, expiry_date, is_active)
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white border border-brand-line shadow-xs">
                  <span className="font-mono text-xs font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded">
                    Attendance &amp; Automation Layer
                  </span>
                  <ul className="mt-3 font-mono text-xs space-y-1.5 text-slate-600">
                    <li>
                      • <span className="text-brand-ink font-bold">CheckInLog</span> (member,
                      gym_tenant, timestamp, verified_by)
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">Backend Workflow:</span>{' '}
                      <code>expire_membership_cron</code>
                    </li>
                    <li>
                      • <span className="text-brand-ink font-bold">Webhook Endpoint:</span>{' '}
                      <code>paystack_renewal_hook</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Part 2: Real-Time Check-In & Subscription Expiry State Machine */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-brand-line">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mb-4">
                Part 2 • Dual-Mode Check-In &amp; Subscription Entitlement State Machine
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    01. Credential Input
                  </span>
                  <p className="text-brand-subtle">
                    Receptionist scans member QR code or inputs case-sensitive{' '}
                    <code>Reg. Code</code> (scoped with tenant suffix like <code>Pul</code> or{' '}
                    <code>Bal</code>).
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    02. Tenant-Scoped Query
                  </span>
                  <p className="text-brand-subtle">
                    Bubble searches <code>MemberProfile</code> constrained by{' '}
                    <code>gym_tenant = Current User&apos;s GymTenant</code> and exact{' '}
                    <code>reg_code</code> match.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    03. Entitlement Check
                  </span>
                  <p className="text-brand-subtle">
                    Evaluates <code>MembershipRecord.is_active = yes</code> and{' '}
                    <code>expiry_date &gt;= Current Date/Time</code>; displays{' '}
                    <strong>Member Found</strong> modal.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-brand-line">
                  <span className="font-bold text-slate-900 block mb-1 font-mono">
                    04. Attendance Mutation
                  </span>
                  <p className="text-brand-subtle">
                    Clicking &quot;Check In Member&quot; writes an immutable <code>CheckInLog</code>{' '}
                    entry and updates daily floor attendance counters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: TechnicalArchitecture */}

        {/* BEGIN: Outcomes & Reflections */}
        <section className="py-20 bg-white border-b border-brand-line scroll-mt-20" id="results">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-wider text-orange-600 uppercase">
                04. Engineering Outcomes &amp; Learnings
              </span>
              <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-2">
                Production-Ready Multi-Tenant SaaS Execution
              </h2>
              <p className="mt-3 text-base text-brand-subtle">
                Built and validated end-to-end as a functional multi-tenant production MVP.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-3xl font-extrabold text-brand-ink font-mono tracking-tight">
                  Dual-Mode
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  QR + Reg-Code Check-In Resilience
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Pairing camera QR scanning with a human-readable registration code fallback
                  ensured front-desk operations never stall due to low lighting or phone screen
                  glare.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-3xl font-extrabold text-brand-ink font-mono tracking-tight">
                  Multi-Tenant
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  Row-Level Data Isolation
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Architected strict Bubble privacy rules and tenant-prefixed registration codes so
                  multiple fitness studios can onboard onto one shared cloud infrastructure.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-line">
                <div className="text-3xl font-extrabold text-brand-ink font-mono tracking-tight">
                  100%
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  End-to-End Product &amp; Bubble Build
                </div>
                <p className="mt-3 text-xs text-brand-subtle leading-relaxed">
                  Designed the UX flows, built the responsive Bubble frontend, configured recurring
                  backend expiry workflows, and integrated Paystack and notification APIs solo.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END: Outcomes & Reflections */}

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
              Need a Scalable B2B SaaS or Internal Tool? Let’s Build It.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              I partner with founders and operators to design and build multi-tenant web
              applications, payment workflows, and custom operational tools on Bubble.io.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold bg-[#d4a86a] hover:bg-[#e3b97d] text-slate-950 transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-amber-300"
                href={portfolioData.owner.scheduleCallHref}
                data-schedule-call="true"
              >
                Schedule a Call
              </a>
              <Link
                to="/work/alumates-pro"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-100 text-slate-950 border border-white transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-white"
              >
                Read Next: Alumates Pro ↗
              </Link>
              <Link
                to="/#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-500 hover:border-slate-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] focus-visible:ring-slate-300"
              >
                ← Back to Selected Work
              </Link>
            </div>

            <div className="mt-14 pt-8 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
              <div className="font-medium text-slate-200">
                © {new Date().getFullYear()} {portfolioData.owner.name}. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href={portfolioData.owner.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-amber-300 font-medium transition-colors"
                >
                  LinkedIn
                </a>
                <span className="font-mono text-slate-300">
                  Case Study: BalanceSpot Gym Manager
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

