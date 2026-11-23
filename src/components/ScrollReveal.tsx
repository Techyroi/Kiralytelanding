import React, { useEffect, useRef, useState } from 'react';

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
  delayMs = 0,
  offsetY = 20,
  threshold = 0.05,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReduced || typeof IntersectionObserver === 'undefined';
  });

  const [settled, setSettled] = useState<boolean>(isVisible);

  useEffect(() => {
    if (!isVisible || settled) return;
    const timer = window.setTimeout(() => setSettled(true), 600 + delayMs);
    return () => window.clearTimeout(timer);
  }, [isVisible, settled, delayMs]);

  useEffect(() => {
    if (isVisible) return;

    const node = containerRef.current;
    if (!node) return;

    // Immediately reveal if already inside or scrolled past the viewport (e.g. hash navigation)
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.96) {
      setIsVisible(true);
      setSettled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.96) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -36px 0px',
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, threshold]);

  return (
    <div
      ref={containerRef}
      style={
        settled
          ? undefined
          : {
              transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${offsetY}px, 0)`,
              opacity: isVisible ? 1 : 0,
              transitionProperty: 'opacity, transform',
              transitionDuration: '540ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: delayMs ? `${delayMs}ms` : '0ms',
              willChange: 'opacity, transform',
            }
      }
      className={className}
    >
      {children}
    </div>
  );
};
