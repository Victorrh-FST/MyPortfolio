import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const heroSocials = portfolioData.socialLinks.filter((link) => link.showInHero);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 min-h-[70vh] md:min-h-[76vh] flex flex-col justify-center pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-4xl flex flex-col gap-6">
        {/* Eyebrow Line (No Pulsing Dot — Clean Rams Editorial Style with Square Indicator) */}
        <div className="inline-flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-text-primary rounded-[2px] flex-shrink-0" />
          <span className="font-body-lg text-body-lg font-medium text-text-muted tracking-tight">
            Chukwuemeka, Based in Nigeria.
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-headline-hero text-headline-hero-mobile md:text-headline-hero tracking-tight text-text-primary font-medium">
          {portfolioData.owner.headline}
        </h1>

        {/* Supporting Statement (rendered when present) */}
        {portfolioData.owner.supportingDescription && (
          <p
            className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed"
            style={{ letterSpacing: '-0.01em' }}
          >
            {portfolioData.owner.supportingDescription}
          </p>
        )}

        {/* Quiet Editorial Metadata & Social Row */}
        <div className="pt-2 flex flex-wrap items-center gap-y-3 gap-x-5 text-secondary font-label-nav text-label-nav">
          <span className="text-text-muted">{portfolioData.owner.focusSummary}</span>
          <span className="h-4 w-px bg-surface-container-highest hidden sm:block" />
          <div className="flex items-center gap-5">
            {heroSocials.map((social) => {
              const isExternal = social.href.startsWith('http');
              return (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={!isExternal ? (e) => handleAnchorClick(e, social.href) : undefined}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

