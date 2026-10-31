import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { aboutSection, owner } = portfolioData;

  return (
    <section
      id="about"
      className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 pb-20 md:pb-28 scroll-mt-24"
    >
      <div className="rounded-3xl bg-surface-card p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Square Portrait Column */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div className="w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-surface-container border border-border-subtle shadow-sm">
            <img
              src={owner.profileImage}
              alt={owner.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Editorial Bio & Highlights Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-label-badge text-label-badge text-electric-blue uppercase tracking-widest block font-semibold">
              {aboutSection.eyebrow}
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
              {aboutSection.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {aboutSection.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-body-md text-body-md text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="font-body-md text-body-md text-text-primary font-medium">
            “{owner.brandMessage}”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {aboutSection.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-surface-container-low p-4 border border-border-subtle/70 flex flex-col gap-1"
              >
                <span className="font-label-badge text-label-badge text-text-muted uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="font-body-sm text-body-sm text-text-primary font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

