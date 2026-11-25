import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Optional entrance delay in milliseconds */
  delayMs?: number;
  /** Vertical slide offset before entering viewport (px) */
  offsetY?: number;
  /** IntersectionObserver threshold (kept low so tall mobile sections reveal reliably) */
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};
