import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export const openScheduleCallModal = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  window.dispatchEvent(new CustomEvent('open-schedule-call-modal'));
};

export const ScheduleCallModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const calSlug = portfolioData.owner.calComSlug || 'victor-onwukwe-vyxmzi/30min';
  const calDirectUrl = `https://cal.com/${calSlug}`;
  const calEmbedUrl = `https://cal.com/${calSlug}?embed=true&theme=light&layout=month_view`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    portfolioData.owner.email || 'onwukweemeka@gmail.com'
  )}&su=${encodeURIComponent(
    'Project Discovery Call Inquiry'
  )}&body=${encodeURIComponent(
    'Hi Chukwuemeka,\n\nI visited your portfolio and would like to discuss a project with you.\n\nBest regards,'
  )}`;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-schedule-call-modal', handleOpen);

    // Intercept any anchor link pointing to #schedule-call across all pages
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href === '#schedule-call' || anchor.dataset.scheduleCall === 'true') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('open-schedule-call-modal', handleOpen);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={portfolioData.owner.profileImage}
              alt={portfolioData.owner.name}
              className="w-10 h-10 rounded-full object-cover object-top border border-slate-300 flex-shrink-0"
            />
            <div>
              <h2
                id="schedule-modal-title"
                className="text-sm sm:text-base font-bold text-slate-900 leading-tight"
              >
                Schedule a Discovery Call with {portfolioData.owner.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pick a date &amp; 30-minute time slot • Google Meet • WAT (Africa/Lagos)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Compose email in Gmail to onwukweemeka@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition"
            >
              <span>Email Directly</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={calDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-electric-blue bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
            >
              <span>Open in New Tab</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close booking modal"
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Embedded Cal.com Date & Time-Slot Picker */}
        <div className="w-full flex-1 bg-white overflow-y-auto min-h-[540px] sm:min-h-[600px]">
          <iframe
            src={calEmbedUrl}
            title="Schedule a 30-minute call with Chukwuemeka Victor on Cal.com"
            className="w-full h-[560px] sm:h-[620px] border-0"
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>
      </div>
    </div>
  );
};

