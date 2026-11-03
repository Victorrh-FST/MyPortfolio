import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('#projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setActiveNav(href);
      setMobileMenuOpen(false);

      if (location.pathname !== '/') {
        navigate('/' + href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center justify-center p-4 md:pt-6 pointer-events-none">
      <div className="pointer-events-auto h-14 w-full mx-auto px-4 md:px-6 rounded-full bg-canvas-base/85 backdrop-blur-xl border border-border-subtle/60 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-all max-w-[1280px]">
        {/* Brand / Name Area */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={handleLogoClick}
            className="hover:opacity-85 transition-opacity flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-full py-1 px-1"
            aria-label="Chukwemeka Victor"
          >
            <BrandLogo variant="dark" name="Chukwemeka Victor" />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 font-label-nav text-label-nav"
        >
          {portfolioData.navItems.map((item) => {
            const isActive = activeNav === item.href && location.pathname === '/';
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? 'page' : undefined}
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

        {/* Right Actions: Schedule a Call + Profile Icon + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.owner.scheduleCallHref}
            data-schedule-call="true"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all shadow-[0_2px_8px_rgba(32,29,226,0.25)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
          >
            Schedule a Call
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            aria-label="About Chukwuemeka Victor"
            className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-border-subtle flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-electric-blue transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
          >
            <img
              src={portfolioData.owner.profileImage}
              alt={portfolioData.owner.name}
              className="w-full h-full object-cover object-top"
            />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-text-primary hover:bg-surface-container-highest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 w-full max-w-[1280px] rounded-3xl bg-canvas-base/95 backdrop-blur-xl border border-border-subtle shadow-lg p-5 flex flex-col gap-3">
          {portfolioData.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-3 py-2 rounded-xl font-label-nav text-label-nav text-text-primary hover:bg-surface-card transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={portfolioData.owner.scheduleCallHref}
            data-schedule-call="true"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all"
          >
            Schedule a Call
          </a>
        </div>
      )}
    </header>
  );
};
