import React, { useEffect, useState } from 'react';

const HERO_IMAGE = '/images/scene1-landscape.jpg';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload the hero background BEFORE revealing anything.
  // This guarantees text + background appear together — no jank.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = HERO_IMAGE;
    const finish = () => {
      if (cancelled) return;
      setLoaded(true);
      // Tell AOS to recompute positions now that the hero is fully rendered
      // so the staggered text reveals don't fire prematurely.
      const aos = (window as unknown as { AOS?: { refresh: () => void } }).AOS;
      if (aos && typeof aos.refresh === 'function') {
        requestAnimationFrame(() => aos.refresh());
      }
    };
    if (img.complete && img.naturalWidth > 0) {
      finish();
    } else {
      img.onload = finish;
      img.onerror = finish; // fail gracefully — reveal anyway
    }
    // Safety net: never leave the page invisible (slow networks, blocked image)
    const failsafe = window.setTimeout(finish, 1800);
    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  const parallaxY = scrollY * 0.4;
  const scrollFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="scene-section relative" id="hero">
      {/* ===== Unified hero wrapper — fades in as ONE cohesive unit ===== */}
      <div
        className="absolute inset-0 hero-wrapper"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.9s ease-out',
          willChange: 'opacity',
          transform: 'translateZ(0)',
          // Solid fallback color so there's never a flash of unstyled content
          background: '#0d0b08',
        }}
      >
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            transform: `translateY(${parallaxY}px) scale(${1 + scrollY * 0.0002})`,
            willChange: 'transform',
          }}
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0d0b08]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(13,11,8,0.8)_100%)]" />

        {/* Mist layers */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 animate-mist pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(180,160,140,0.2), transparent)',
            filter: 'blur(30px)',
            opacity: scrollFade,
          }}
        />
      </div>

      {/* ===== Content — also gated on `loaded` so text doesn't appear first ===== */}
      <div
        className="relative z-10 text-center px-6"
        style={{
          opacity: loaded ? scrollFade : 0,
          transition: loaded ? 'opacity 0.9s ease-out' : 'none',
          willChange: 'opacity',
        }}
      >
        {/* Tiny traveler silhouette hint */}
        <div className="mb-4 flex justify-center">
          <div
            className="w-16 h-20 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(201,168,76,0.3) 0%, transparent 70%)',
            }}
          />
        </div>

        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-widest"
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#e8d18c',
            textShadow: '0 0 30px rgba(201,168,76,0.4), 0 4px 8px rgba(0,0,0,0.6)',
          }}
        >
          The Forgotten
          <br />
          <span className="text-6xl md:text-8xl lg:text-9xl">Realms</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-ink-primary/80"
          style={{
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}
        >
          A world shrouded in mystery awaits the brave. Unveil the ancient map, explore forgotten lands,
          and seek wisdom from the Oracle.
        </p>

        <div data-aos="fade-up" data-aos-delay="600">
          <a
            href="#map-section"
            className="inline-block px-10 py-4 rounded border-2 text-lg font-semibold tracking-widest transition-all duration-500 hover:scale-105"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#e8d18c',
              borderColor: '#c9a84c',
              background: 'rgba(26, 20, 16, 0.5)',
              boxShadow: '0 0 20px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 35px rgba(201,168,76,0.5), inset 0 0 30px rgba(201,168,76,0.1)';
              e.currentTarget.style.borderColor = '#e8d18c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)';
              e.currentTarget.style.borderColor = '#c9a84c';
            }}
          >
            ⚔ Enter the Realm
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest text-gold-primary/60" style={{ fontFamily: 'Cinzel, serif' }}>
              Scroll to Explore
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth={1.5} opacity={0.6}>
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
