import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const footerSocials = portfolioData.socialLinks.filter((link) => link.showInFooter);

  return (
    <footer
      id="contact"
      className="w-full bg-surface-dark text-inverse-on-surface pt-20 pb-12 mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-badge-dark text-on-primary font-label-badge text-label-badge mb-6 tracking-wider uppercase">
              {portfolioData.owner.availabilityBadge}
            </span>
            <h2 className="font-headline-lg text-headline-lg md:font-headline-hero md:text-headline-hero text-white tracking-tight">
              {portfolioData.footer.headline}
            </h2>
          </div>
          <div>
            <a
              href={portfolioData.owner.scheduleCallHref}
              data-schedule-call="true"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all shadow-[0_4px_16px_rgba(32,29,226,0.3)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark focus-visible:ring-electric-blue"
            >
              {portfolioData.footer.ctaLabel}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-body-sm text-body-sm text-text-muted">
          <div className="flex items-center gap-3">
            <BrandLogo variant="light" showName={false} iconClassName="h-6 w-auto" />
            <p>{portfolioData.footer.copyright}</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {footerSocials.map((social) => {
              const isExternal = social.href.startsWith('http');
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

