import React from 'react';
import AncientMap from '../Map/AncientMap';
import Reveal from '../Reveal';

const MapSection: React.FC = () => {
  return (
    <section className="scene-section relative" id="map-section">
      {/* Background image - the cartographer's table */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/scene2-table.jpg)' }}
      />

      {/* Dark overlay for the table background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Warm light vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 60%, rgba(13,11,8,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Section title — extra bottom margin separates it from the SVG cartouche */}
        <Reveal variant="up" className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest mb-3"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#e8d18c',
              textShadow: '0 0 15px rgba(201,168,76,0.3)',
            }}
          >
            The Cartographer's Table
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-primary/50" />
            <span className="text-gold-primary/60 text-sm tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
              ◆ Unveil the Map ◆
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-primary/50" />
          </div>
        </Reveal>

        {/* The Map */}
        <Reveal variant="zoom" delay={200}>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              boxShadow:
                '0 4px 30px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.1), 0 0 0 1px rgba(201,168,76,0.15)',
            }}
          >
            <AncientMap />
          </div>
        </Reveal>

        {/* Subtitle hint */}
        <Reveal variant="fade" delay={400}>
          <p
            className="text-center mt-6 text-ink-secondary/60 text-sm italic"
            style={{ fontFamily: '"IM Fell English", serif' }}
          >
            Each realm holds a secret — click to discover what lies beneath the shadows...
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default MapSection;
