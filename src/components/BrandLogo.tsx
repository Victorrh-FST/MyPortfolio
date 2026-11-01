import React from 'react';

interface BrandLogoProps {
  /**
   * 'dark' renders a black C + electric-blue V for light backgrounds.
   * 'light' renders a white C + electric-blue V for dark backgrounds.
   */
  variant?: 'dark' | 'light';
  /**
   * Whether to display the full brand name beside the monogram.
   */
  showName?: boolean;
  /**
   * Brand name text to display beside the monogram.
   */
  name?: string;
  /**
   * Optional additional className for the outer container.
   */
  className?: string;
  /**
   * Height class for the SVG monogram (defaults to 28px–30px).
   */
  iconClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  showName = true,
  name = 'Chukwemeka Victor',
  className = '',
  iconClassName = 'h-[28px] md:h-[30px] w-auto',
}) => {
  const cFill = variant === 'dark' ? '#060606' : '#FFFFFF';
  const textColorClass = variant === 'dark' ? 'text-text-primary' : 'text-white';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 96"
        fill="none"
        aria-hidden="true"
        className={`flex-shrink-0 ${iconClassName}`}
      >
        <path
          d="M34 21H52C59.1797 21 65 26.8203 65 34H34C26.8203 34 21 39.8203 21 47C21 54.1797 26.8203 60 34 60H50.5L60.25 73H34C19.6406 73 8 61.3594 8 47C8 32.6406 19.6406 21 34 21Z"
          fill={cFill}
        />
        <path
          d="M45 41H60.75L75 60L104.25 21H120L75 81L45 41Z"
          fill="#201DE2"
        />
      </svg>
      {showName && (
        <span
          className={`font-label-nav text-label-nav font-semibold tracking-tight leading-none ${textColorClass}`}
        >
          {name}
        </span>
      )}
    </span>
  );
};
