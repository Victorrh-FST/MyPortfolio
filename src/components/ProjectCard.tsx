import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      to={project.link}
      className="group rounded-3xl bg-surface-card p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
    >
      {/* Device Mockup / Screenshot Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-surface-container overflow-hidden mb-6 flex items-center justify-center">
        {!project.isPlaceholder && project.image ? (
          <>
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/15 via-transparent to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container-highest flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            {/* Minimalist architectural frame representing missing screenshot asset */}
            <div className="w-full max-w-md rounded-xl bg-surface-container-lowest/90 border border-border-subtle shadow-sm p-6 flex flex-col items-center justify-center gap-3 group-hover:scale-[1.03] transition-transform duration-500">
              <div className="w-11 h-11 rounded-2xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">image</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-card text-text-muted font-label-badge text-label-badge uppercase tracking-wider">
                Project Screenshot Placeholder
              </span>
              <p className="font-headline-md text-body-md font-semibold text-text-primary">
                {project.title}
              </p>
              <p className="font-body-sm text-body-sm text-text-muted">
                {project.category}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Taxonomy Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-badge-dark text-on-primary font-label-badge text-label-badge tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Card Content */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-electric-blue transition-colors">
          {project.title}
        </h3>
        <span className="material-symbols-outlined text-text-muted group-hover:text-electric-blue group-hover:translate-x-0.5 transition-all text-[20px] mt-1">
          arrow_outward
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-text-muted mb-2 font-medium">
        {project.role} • {project.category}
      </p>

      <p className="font-body-md text-body-md text-secondary leading-relaxed">
        {project.description}
      </p>
    </Link>
  );
};

