import React, { useMemo, useState } from 'react';
import MapDecorations from './MapDecorations';
import MapModal from './MapModal';
import { regionsData } from '../../data/regions';
import { useMapState } from '../../hooks/useMapState';

const AncientMap: React.FC = () => {
  const {
    clearedRegions,
    selectedRegion,
    allCleared,
    popRegion,
    showCelebration,
    hiddenLamps,
    fadingLamp,
    handleRegionClick,
    closeModal,
  } = useMapState();

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const clearedSet = useMemo(() => new Set(clearedRegions), [clearedRegions]);
  const clearedLampSet = useMemo(() => new Set(hiddenLamps), [hiddenLamps]);

  return (
    <div className="map-container relative w-full max-w-6xl mx-auto">
      {/* Parchment texture background image */}
      <div
        className="absolute inset-0 rounded-lg overflow-hidden vignette parchment-noise"
        style={{
          backgroundImage: 'url(/images/parchment-map.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Additional warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(180,160,130,0.15) 0%, rgba(200,185,150,0.05) 30%, rgba(160,140,110,0.1) 100%)',
          }}
        />
      </div>

      {/* Worn parchment edges */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 80px rgba(100, 80, 50, 0.45), inset 0 0 15px rgba(100, 80, 50, 0.3), inset 0 0 3px rgba(80, 60, 30, 0.2)',
        }}
      />

      {/* Ornate gold border */}
      <div
        className="absolute -inset-3 rounded-xl pointer-events-none"
        style={{
          border: '3px solid transparent',
          borderImage: 'repeating-linear-gradient(45deg, #c9a84c 0px, #c9a84c 5px, #8b6914 5px, #8b6914 10px, #b89a6a 10px, #b89a6a 15px) 3',
          opacity: 0.55,
        }}
      />
      <div
        className="absolute -inset-4 rounded-xl pointer-events-none border opacity-25"
        style={{ borderColor: '#c9a84c', borderWidth: '1px' }}
      />

      {/* SVG Map — viewBox extended upward to give the title cartouche its own
          band, well separated from the landmasses and the HTML section title. */}
      <svg
        viewBox="0 -100 1000 800"
        className="relative z-10 w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter */}
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop shadow for hover */}
          <filter id="hoverGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c9a84c" floodOpacity="0.7" />
          </filter>

          {/* Text shadow */}
          <filter id="textShadow">
            <feDropShadow dx="1.5" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.75" />
          </filter>

          {/* Inner shadow for landmasses */}
          <filter id="innerShadow">
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="3" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feFlood floodColor="#000" floodOpacity="0.25" result="color" />
            <feComposite in2="offsetblur" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>

          {/* Fog of war mask */}
          <mask id="fogMask">
            <rect x="0" y="-100" width="1000" height="800" fill="white" />
            {regionsData.map((region) => (
              <path
                key={region.id}
                d={region.path}
                fill={clearedSet.has(region.id) ? 'black' : 'white'}
                className="region-mask"
                style={{ transition: 'fill 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            ))}
          </mask>

          {/* Region gradients */}
          {regionsData.map((region) => (
            <radialGradient key={`grad-${region.id}`} id={`grad-${region.id}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={region.color} stopOpacity={0.75} />
              <stop offset="50%" stopColor={region.color} stopOpacity={0.55} />
              <stop offset="100%" stopColor={region.colorDark} stopOpacity={0.4} />
            </radialGradient>
          ))}
        </defs>

        {/* Ocean/sea base fill */}
        <rect x="0" y="-100" width="1000" height="800" fill="#c8b898" opacity={0.08} />

        {/* Region shapes */}
        {regionsData.map((region) => {
          const isCleared = clearedSet.has(region.id);
          const isPopping = popRegion === region.id;

          return (
            <g
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion((current) => (current === region.id ? null : current))}
              style={{ cursor: 'pointer' }}
              className={`region-group ${isPopping ? 'region-pop' : ''}`}
            >
              {/* Coastal glow (subtle lighter edge) */}
              <path
                d={region.path}
                fill="none"
                stroke={isCleared ? '#d8c898' : '#c4b490'}
                strokeWidth={5}
                opacity={isCleared ? 0.2 : 0.08}
                className="transition-all duration-500"
              />

              {/* Region fill with gradient */}
              <path
                d={region.path}
                fill={`url(#grad-${region.id})`}
                stroke="#9a8a6a"
                strokeWidth={2}
                strokeDasharray="5 3"
                className="transition-all duration-500"
                style={{
                  filter: isPopping
                    ? 'drop-shadow(0 0 14px rgba(201,168,76,0.8))'
                    : isCleared
                      ? 'drop-shadow(0 0 4px rgba(201,168,76,0.25))'
                      : 'drop-shadow(0 0 0px rgba(201,168,76,0))',
                  transition: 'filter 0.5s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(201,168,76,0.7))';
                  e.currentTarget.style.stroke = '#c9a84c';
                  e.currentTarget.style.strokeWidth = '3';
                  e.currentTarget.style.strokeDasharray = '3 2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = isPopping
                    ? 'drop-shadow(0 0 14px rgba(201,168,76,0.8))'
                    : isCleared
                      ? 'drop-shadow(0 0 4px rgba(201,168,76,0.25))'
                      : 'drop-shadow(0 0 0px rgba(201,168,76,0))';
                  e.currentTarget.style.stroke = '#9a8a6a';
                  e.currentTarget.style.strokeWidth = '2';
                  e.currentTarget.style.strokeDasharray = '5 3';
                }}
              />

              {/* Region label - enhanced */}
              <text
                x={region.labelX}
                y={region.labelY}
                fill={isCleared ? '#f0e8d8' : '#6a5a4a'}
                fontSize={isCleared ? 21 : 18}
                fontFamily="Cinzel, serif"
                fontWeight="bold"
                textAnchor="middle"
                className="transition-all duration-500 pointer-events-none"
                filter="url(#textShadow)"
                style={{
                  letterSpacing: '0.06em',
                  transition: 'fill 0.5s, font-size 0.5s',
                  fontStyle: isCleared ? 'normal' : 'italic',
                }}
              >
                {region.name}
              </text>
            </g>
          );
        })}

        {/* Map decorations - drawn on top of regions but under fog */}
        <MapDecorations />

        {/* Visit markers */}
        {regionsData
          .filter((r) => clearedSet.has(r.id))
          .map((region) => (
            <g key={`marker-${region.id}`} className="pointer-events-none">
              <circle cx={region.labelX} cy={region.labelY - 26} r={5} fill="none" stroke="#c9a84c" strokeWidth={0.8} opacity={0.7}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={region.labelX} cy={region.labelY - 26} r={2} fill="#e8d18c" opacity={0.9} />
            </g>
          ))}

        {/* Shadow overlay (fog of war) */}
        <rect
          x="0"
          y="-100"
          width="1000"
          height="800"
          fill="#14100a"
          opacity={allCleared ? 0 : 0.88}
          mask="url(#fogMask)"
          className="pointer-events-none"
          style={{ transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {/* Subtle texture on fog */}
        {!allCleared && (
          <rect
            x="0"
            y="-100"
            width="1000"
            height="800"
            fill="url(#noisePattern)"
            opacity={0.04}
            mask="url(#fogMask)"
            className="pointer-events-none"
          />
        )}

        {/* Noise pattern for fog */}
        <defs>
          <pattern id="noisePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100" height="100" filter="url(#noise)" opacity={1} />
          </pattern>
        </defs>

        {/* New-user kingdom hint lamps — rendered above fog so they invite clicking. */}
        <g className="pointer-events-none">
          {regionsData.map((region) => {
            const isFading = fadingLamp === region.id;
            const shouldShow = !clearedLampSet.has(region.id) || isFading;
            if (!shouldShow) return null;

            return (
              <g
                key={`lamp-${region.id}`}
                className={`kingdom-hint-lamp ${hoveredRegion === region.id ? 'kingdom-hint-hovered' : ''} ${isFading ? 'kingdom-hint-fading' : ''}`}
                transform={`translate(${region.labelX}, ${region.labelY - 48})`}
              >
                <circle cx={0} cy={0} r={18} fill="#c9a84c" opacity={0.08} className="lamp-glow-fill" />
                <circle cx={0} cy={0} r={16} fill="none" stroke="#c9a84c" strokeWidth={0.8} opacity={0.3} className="lamp-glow-ring" />
                <path d="M-7,8 L-5,-5 L5,-5 L7,8 Z" fill="#8b6914" opacity={0.72} />
                <path d="M-9,9 Q0,13 9,9" fill="none" stroke="#c9a84c" strokeWidth={1.1} opacity={0.65} />
                <path d="M-5,-5 Q0,-11 5,-5" fill="none" stroke="#c9a84c" strokeWidth={1} opacity={0.7} />
                <ellipse cx={0} cy={-1.5} rx={2.8} ry={5.5} fill="#f0d060" opacity={0.82} className="lamp-flame" />
                <ellipse cx={0} cy={0} rx={1.3} ry={3} fill="#fff1a8" opacity={0.55} className="lamp-core" />
                {[-1, 0, 1].map((i) => (
                  <line
                    key={`ray-${region.id}-${i}`}
                    x1={i * 7}
                    y1={5}
                    x2={i * 12}
                    y2={16}
                    stroke="#c9a84c"
                    strokeWidth={0.6}
                    opacity={0.25}
                    className="lamp-ray"
                  />
                ))}
                <text
                  x={0}
                  y={27}
                  fill="#c9a84c"
                  fontSize={8}
                  fontFamily="Cinzel, serif"
                  textAnchor="middle"
                  opacity={0.48}
                  className="lamp-click-text"
                >
                  ✦ CLICK ✦
                </text>
              </g>
            );
          })}
        </g>

        {/* Celebration glow */}
        {allCleared && (
          <rect x="0" y="-100" width="1000" height="800" fill="#c9a84c" opacity={0} className="pointer-events-none">
            <animate attributeName="opacity" values="0;0.06;0" dur="3s" repeatCount="indefinite" />
          </rect>
        )}

        {/* Celebration particle burst */}
        {showCelebration && (
          <g className="pointer-events-none">
            {Array.from({ length: 40 }, (_, i) => {
              const angle = (i / 40) * Math.PI * 2;
              const distance = 150 + Math.random() * 450;
              const tx = 500 + Math.cos(angle) * distance;
              const ty = 350 + Math.sin(angle) * distance;
              const size = 2 + Math.random() * 5;
              return (
                <g key={`particle-${i}`}>
                  <circle cx={500} cy={350} r={size} fill="#e8d18c" opacity={0}>
                    <animate attributeName="cx" from={500} to={tx} dur={`${1.2 + Math.random() * 2.5}s`} begin={`${Math.random() * 0.8}s`} fill="freeze" />
                    <animate attributeName="cy" from={350} to={ty} dur={`${1.2 + Math.random() * 2.5}s`} begin={`${Math.random() * 0.8}s`} fill="freeze" />
                    <animate attributeName="opacity" values="1;0" dur={`${1.2 + Math.random() * 2.5}s`} begin={`${Math.random() * 0.8}s`} fill="freeze" />
                    <animate attributeName="r" values={`${size};0`} dur={`${1.2 + Math.random() * 2.5}s`} begin={`${Math.random() * 0.8}s`} fill="freeze" />
                  </circle>
                </g>
              );
            })}
            {/* Central burst */}
            <circle cx={500} cy={350} r={10} fill="none" stroke="#e8d18c" strokeWidth={2} opacity={0}>
              <animate attributeName="r" values="10;250" dur="2.5s" fill="freeze" />
              <animate attributeName="opacity" values="0.8;0" dur="2.5s" fill="freeze" />
              <animate attributeName="stroke-width" values="2;0.2" dur="2.5s" fill="freeze" />
            </circle>
          </g>
        )}
      </svg>

      {/* Region counter badge */}
      <div
        className="absolute bottom-4 right-4 z-20 px-5 py-2.5 rounded-lg border text-xs tracking-widest"
        style={{
          background: 'rgba(26, 20, 16, 0.85)',
          borderColor: 'rgba(201,168,76,0.35)',
          color: '#e8d18c',
          fontFamily: 'Cinzel, serif',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <span className="opacity-60 text-[10px]">REALMS REVEALED</span>
        <br />
        <span className="text-base">{clearedRegions.length} / {regionsData.length}</span>
      </div>

      {/* Initial click hint */}
      {clearedRegions.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-fade-in-up">
          <p
            className="text-lg tracking-widest text-center px-6 py-3 rounded-lg"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#e8d18c',
              textShadow: '0 0 15px rgba(201,168,76,0.5)',
              background: 'rgba(13,11,8,0.6)',
            }}
          >
            Click the regions to unveil the realm
          </p>
        </div>
      )}

      {/* Region detail modal */}
      {selectedRegion && <MapModal region={selectedRegion} onClose={closeModal} />}
    </div>
  );
};

export default AncientMap;
