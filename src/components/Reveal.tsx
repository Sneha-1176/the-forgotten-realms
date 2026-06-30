import React from 'react';

type Variant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade' | 'glow';

interface RevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  once?: boolean;
}

/**
 * Wrapper that uses AOS (Animate On Scroll) under the hood.
 * Maps semantic variants to AOS effect names.
 */
const aosMap: Record<Variant, string> = {
  up: 'fade-up',
  down: 'fade-down',
  left: 'fade-right', // content slides in from the left
  right: 'fade-left', // content slides in from the right
  zoom: 'zoom-in',
  fade: 'fade',
  glow: 'fade-up',
};

const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  duration,
  className = '',
  as: Tag = 'div',
}) => {
  return React.createElement(
    Tag as React.ElementType,
    {
      className,
      'data-aos': aosMap[variant],
      'data-aos-delay': delay > 0 ? String(delay) : undefined,
      'data-aos-duration': duration ? String(duration) : undefined,
      'data-aos-easing': 'ease-out-cubic',
    },
    children,
  );
};

export default Reveal;
