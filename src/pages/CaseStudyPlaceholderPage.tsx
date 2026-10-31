import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

export const CaseStudyPlaceholderPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioData.projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 pt-24 pb-28">
        <div className="rounded-3xl bg-surface-card p-10 md:p-14 flex flex-col items-start gap-6">
          <span className="px-3 py-1 rounded-full bg-badge-dark text-on-primary font-label-badge text-label-badge uppercase tracking-wider">
            404 • Not Found
          </span>
          <h1 className="font-headline-lg text-headline-lg text-text-primary">Project not found</h1>
          <p className="font-body-md text-body-md text-secondary max-w-xl">
            The requested case study could not be found. Return to the homepage to explore selected projects.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Homepage
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 pt-20 md:pt-28 pb-28">
      <div className="mb-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-label-nav text-label-nav text-secondary hover:text-text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Selected Projects
        </Link>
      </div>

      <div className="rounded-3xl bg-surface-card p-8 md:p-12 flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-badge-dark text-on-primary font-label-badge text-label-badge tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="max-w-3xl flex flex-col gap-4">
          <h1 className="font-headline-hero text-headline-hero-mobile md:text-headline-hero text-text-primary tracking-tight">
            {project.title}
          </h1>
          <p className="font-body-md text-body-md text-text-muted font-medium">
            {project.role} • {project.category}
          </p>
          <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.image && !project.isPlaceholder && (
          <div className="w-full aspect-[16/9] rounded-2xl bg-surface-container overflow-hidden border border-border-subtle">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        <div className="rounded-2xl bg-surface-container-low p-6 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-label-badge text-label-badge text-electric-blue uppercase tracking-wider font-semibold block mb-1">
              Case Study Route Ready
            </span>
            <p className="font-body-sm text-body-sm text-secondary">
              Full in-depth case study page scheduled for the next implementation phase.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-electric-blue text-on-primary font-label-nav text-label-nav hover:bg-primary transition-all flex-shrink-0"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
};

