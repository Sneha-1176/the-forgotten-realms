import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialises Lenis for buttery-smooth scrolling across the entire page.
 * Lenis hijacks wheel/touch events and interpolates scroll position with
 * a custom easing curve, giving a fluid, gliding feel.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Skip on touch-only devices where native momentum scrolling already feels great
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out — gliding, no abrupt stops
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false,
    });

    // Drive the animation frame loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor links so they use Lenis for smooth scroll
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.4 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Expose globally so other components can use it (e.g., nav buttons)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

/**
 * Imperative scroll helper that prefers Lenis if available, falls back to native.
 */
export function smoothScrollTo(target: string | HTMLElement, offset = -70) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el =
    typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
