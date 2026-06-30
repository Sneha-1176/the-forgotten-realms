import React, { useEffect, useRef } from 'react';
import type { Region } from '../../data/regions';

interface MapModalProps {
  region: Region;
  onClose: () => void;
}

const dangerLabels: Record<number, string> = {
  0: 'Safe Haven',
  1: 'Mild Peril',
  2: 'Moderate Danger',
  3: 'Treacherous',
  4: 'Deadly',
  5: 'Hellscape',
};

const MapModal: React.FC<MapModalProps> = ({ region, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full p-8 rounded-lg border-2 shadow-2xl animate-fade-in-up"
        style={{
          background: 'linear-gradient(160deg, #2a1f18 0%, #1a1410 40%, #2a1f18 100%)',
          borderColor: '#c9a84c',
          boxShadow: '0 0 50px rgba(201, 168, 76, 0.2), 0 25px 60px rgba(0,0,0,0.8)',
        }}
      >
        {/* Decorative corners */}
        {[
          'top-0 left-0 border-t-2 border-l-2 -translate-x-1 -translate-y-1',
          'top-0 right-0 border-t-2 border-r-2 translate-x-1 -translate-y-1',
          'bottom-0 left-0 border-b-2 border-l-2 -translate-x-1 translate-y-1',
          'bottom-0 right-0 border-b-2 border-r-2 translate-x-1 translate-y-1',
        ].map((cls, i) => (
          <div key={`corner-${i}`} className={`absolute w-10 h-10 border-gold-primary ${cls}`} />
        ))}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full border border-gold-primary/50 text-gold-primary hover:text-gold-light hover:border-gold-light transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <line x1={5} y1={5} x2={15} y2={15} />
            <line x1={15} y1={5} x2={5} y2={15} />
          </svg>
        </button>

        {/* Region color swatch */}
        <div className="flex items-center justify-center mb-4 gap-3">
          <div
            className="w-8 h-8 rounded-full border-2"
            style={{
              backgroundColor: region.color,
              borderColor: region.colorDark,
              boxShadow: `0 0 12px ${region.color}66`,
            }}
          />
          <span className="text-xs tracking-widest text-ink-secondary/40" style={{ fontFamily: 'Cinzel, serif' }}>
            REALM UNVEILED
          </span>
        </div>

        {/* Region name */}
        <h2
          className="text-5xl font-bold mb-6 text-center"
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#e8d18c',
            textShadow: '0 0 18px rgba(201,168,76,0.45)',
          }}
        >
          {region.name}
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
          <div className="mx-4 text-gold-primary text-xs">✦</div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="space-y-5">
          <div
            className="p-4 rounded-lg border"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <strong
              className="text-gold-light text-xs uppercase tracking-[0.15em] mb-1 block"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Description
            </strong>
            <p className="text-ink-primary leading-relaxed" style={{ fontFamily: '"IM Fell English", serif' }}>
              {region.description}
            </p>
          </div>

          <div
            className="p-4 rounded-lg border"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <strong
              className="text-gold-light text-xs uppercase tracking-[0.15em] mb-1 block"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              History
            </strong>
            <p className="text-ink-primary leading-relaxed" style={{ fontFamily: '"IM Fell English", serif' }}>
              {region.history}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="p-4 rounded-lg border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <strong
                className="text-gold-light text-xs uppercase tracking-[0.15em] mb-1 block"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Inhabitants
              </strong>
              <p className="text-ink-secondary text-sm leading-relaxed" style={{ fontFamily: '"IM Fell English", serif' }}>
                {region.inhabitants}
              </p>
            </div>

            <div
              className="p-4 rounded-lg border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <strong
                className="text-gold-light text-xs uppercase tracking-[0.15em] mb-2 block"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Danger Level
              </strong>
              <div className="flex items-center gap-2 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className="inline-block text-2xl leading-none transition-all duration-300"
                    style={{
                      color: i < region.danger ? '#8B2A1A' : '#3a1f18',
                      textShadow: i < region.danger
                        ? '0 0 10px rgba(139,42,26,0.5), 0 1px 3px rgba(0,0,0,0.6)'
                        : '0 1px 2px rgba(0,0,0,0.3)',
                      opacity: i < region.danger ? 1 : 0.25,
                    }}
                  >
                    💀
                  </span>
                ))}
              </div>
              <p className="text-xs mt-2 tracking-wide" style={{ fontFamily: '"IM Fell English", serif', color: '#b8846a' }}>
                {dangerLabels[region.danger] || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
