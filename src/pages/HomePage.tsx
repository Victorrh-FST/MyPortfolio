import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProjectCard } from '../components/ProjectCard';
import { CapabilityCard } from '../components/CapabilityCard';
import { AboutSection } from '../components/AboutSection';
import { ApproachCard } from '../components/ApproachCard';
import { portfolioData } from '../data/portfolioData';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <Hero />

      {/* SELECTED PROJECTS SECTION */}
      <section className="w-full bg-surface-container-low py-20 md:py-28 scroll-mt-16" id="projects">
        <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
              {portfolioData.projectsSection.heading}
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              {portfolioData.projectsSection.subheading}
            </p>
          </div>

          {/* Projects Grid (Reference 2-Column Showcase Card Structure) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES / SERVICES SECTION */}
      <section
        className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-20 md:py-28 scroll-mt-16"
        id="services"
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-label-badge text-label-badge text-electric-blue uppercase tracking-widest block mb-2 font-semibold">
                {portfolioData.capabilitiesSection.eyebrow}
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
                {portfolioData.capabilitiesSection.heading}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-secondary max-w-md">
              {portfolioData.capabilitiesSection.description}
            </p>
          </div>

          {/* Bento-style Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.capabilities.map((capability) => (
              <CapabilityCard key={capability.id} capability={capability} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* APPROACH SECTION ("What working with me looks like") */}
      <section className="w-full bg-surface-container-low py-20 md:py-28 scroll-mt-16" id="approach">
        <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
              {portfolioData.approachSection.heading}
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              {portfolioData.approachSection.subheading}
            </p>
          </div>

          {/* Two-Column Row (Matches Reference Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.approachSection.items.map((item) => (
              <ApproachCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

