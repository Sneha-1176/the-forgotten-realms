import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './components/sections/HeroSection';
import MapSection from './components/sections/MapSection';
import LoreSection from './components/sections/LoreSection';
import OracleSection from './components/sections/OracleSection';
import { useSmoothScroll, smoothScrollTo } from './hooks/useSmoothScroll';

const navItems = [
  { id: 'hero', label: 'The Realm', icon: '🏔️' },
  { id: 'map-section', label: 'The Map', icon: '🗺️' },
  { id: 'lore', label: 'Lore', icon: '📜' },
  { id: 'oracle', label: 'Oracle', icon: '🔮' },
];

const App: React.FC = () => {
  // Activate Lenis-powered buttery smooth scrolling
  useSmoothScroll();

  // Force-scroll to top on first mount (covers refresh, back/forward, deep links)
  useEffect(() => {
    // Immediate jump (instant, no animation)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // After Lenis attaches on the next frame, snap it to 0 as well
    requestAnimationFrame(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void; on: (e: string, cb: () => void) => void } }).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, []);

  // Initialize AOS (Animate On Scroll) — runs once after first paint
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      mirror: false,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    // Expose AOS globally so sections (e.g. Hero after image load) can call refresh()
    (window as unknown as { AOS?: typeof AOS }).AOS = AOS;

    // Wire Lenis scroll events to AOS so animations trigger during smooth scroll
    const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } }).__lenis;
    const refresh = () => AOS.refresh();
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', refresh);
    }

    // Refresh after fonts/images settle to catch late layout shifts
    const t1 = window.setTimeout(() => AOS.refresh(), 300);
    const t2 = window.setTimeout(() => AOS.refresh(), 1200);

    return () => {
      if (lenis && typeof lenis.off === 'function') lenis.off('scroll', refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const [activeSection, setActiveSection] = useState('hero');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setShowNav(window.scrollY > window.innerHeight * 0.5);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    smoothScrollTo(`#${id}`);
  };

  return (
    <div className="relative bg-[#0d0b08]">
      {/* Navigation bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          showNav
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(13,11,8,0.95), rgba(13,11,8,0.8))',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="text-gold-primary tracking-widest text-sm font-bold hover:text-gold-light transition-colors"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            ⚜ The Forgotten Realms
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded text-xs tracking-wider transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-gold-light'
                    : 'text-ink-secondary/50 hover:text-ink-primary'
                }`}
                style={{
                  fontFamily: 'Cinzel, serif',
                  background: activeSection === item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                }}
              >
                <span className="hidden sm:inline mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scene sections */}
      <HeroSection />
      <MapSection />
      <LoreSection />
      <OracleSection />

      {/* Footer */}
      <footer
        className="py-8 text-center border-t"
        style={{
          background: 'linear-gradient(180deg, #0d0b08, #1a1410)',
          borderColor: 'rgba(201,168,76,0.1)',
        }}
      >
        <p
          className="text-xs tracking-widest text-ink-secondary/40"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          ⚜ The Forgotten Realms — An Ancient Cartographer's Legacy ⚜
        </p>
        <p className="text-xs text-ink-secondary/30 mt-2" style={{ fontFamily: '"IM Fell English", serif' }}>
          Unveil the map. Discover the lore. Seek the Oracle.
        </p>
      </footer>
    </div>
  );
};

export default App;
