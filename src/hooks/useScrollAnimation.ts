import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

/**
 * Returns a ref to attach to any element. When the element enters the viewport,
 * the `is-visible` class is added, triggering the CSS animation.
 *
 * Robust against:
 *  - SSR (skips when window is unavailable)
 *  - Already-in-viewport elements on mount (checks getBoundingClientRect immediately)
 *  - Lenis smooth scroll (adds a scroll listener as fallback)
 *  - Reduced motion (instantly reveals)
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
) {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', once = true, delay = 0 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const reveal = () => {
      el.classList.add('is-visible');
    };

    const check = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Visible when its top is above the bottom of the viewport (with a small offset)
      if (rect.top < viewportH - 40 && rect.bottom > 0) {
        reveal();
        return true;
      }
      return false;
    };

    // 1) Immediate check — handles elements that are already in view on mount
    if (check()) {
      return; // already revealed; no need to observe
    }

    // 2) Re-check on next two frames in case layout/fonts shift things
    const raf1 = requestAnimationFrame(() => {
      if (!check()) {
        requestAnimationFrame(check);
      }
    });

    // 3) IntersectionObserver for normal scroll triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            reveal();
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin },
    );
    observer.observe(el);

    // 4) Fallback scroll listener — fires on every scroll (cheap rect check).
    // This handles edge cases with Lenis or any custom scroll engine where
    // IntersectionObserver might miss subtle viewport changes.
    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        if (check() && once) {
          window.removeEventListener('scroll', onScroll);
          if (lenisRef && typeof lenisRef.off === 'function') lenisRef.off('scroll', onScroll);
          observer.unobserve(el);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Also listen on Lenis directly if available — Lenis emits its own 'scroll' event
    const lenisRef = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis;
    if (lenisRef && typeof lenisRef.on === 'function') {
      lenisRef.on('scroll', onScroll);
    }

    return () => {
      cancelAnimationFrame(raf1);
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      if (lenisRef && typeof lenisRef.off === 'function') lenisRef.off('scroll', onScroll);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay]);

  return ref;
}
