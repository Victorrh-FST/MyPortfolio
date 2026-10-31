import React from 'react';
import { CapabilityItem } from '../data/portfolioData';

interface CapabilityCardProps {
  capability: CapabilityItem;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability }) => {
  return (
    <div className="p-8 rounded-3xl bg-surface-card flex flex-col justify-between gap-8 transition-all hover:bg-surface-container-high">
      <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 text-electric-blue flex items-center justify-center">
        <span className="material-symbols-outlined text-[26px]">{capability.icon}</span>
      </div>
      <div>
        <h3 className="font-headline-md text-headline-md text-text-primary mb-2">
          {capability.title}
        </h3>
        <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
          {capability.description}
        </p>
      </div>
    </div>
  );
};

