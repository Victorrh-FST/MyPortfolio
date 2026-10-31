import React from 'react';
import { ApproachItem } from '../data/portfolioData';

interface ApproachCardProps {
  item: ApproachItem;
}

export const ApproachCard: React.FC<ApproachCardProps> = ({ item }) => {
  return (
    <div className="rounded-3xl bg-surface-card p-8 md:p-10 flex flex-col justify-between gap-6 shadow-sm">
      <p className="font-quote-body text-quote-body text-text-primary leading-relaxed">
        {item.description}
      </p>
      <div className="flex flex-col">
        <span className="font-label-nav text-label-nav text-text-primary font-semibold">
          {item.title}
        </span>
        <span className="font-body-sm text-body-sm text-text-muted">{item.subtitle}</span>
      </div>
    </div>
  );
};
