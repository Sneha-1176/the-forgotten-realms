import React from 'react';

const MapDecorations: React.FC = () => (
  <g className="pointer-events-none">
    {/* ===== GRID LINES (latitude / longitude) ===== */}
    <g stroke="#8a7a5a" strokeWidth={0.3} opacity={0.15}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={`lat-${i}`} x1={50} y1={50 + i * 80} x2={950} y2={50 + i * 80} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`lon-${i}`} x1={50 + i * 90} y1={20} x2={50 + i * 90} y2={680} />
      ))}
    </g>

    {/* ===== RHUMB LINES ===== */}
    <g stroke="#b8956a" strokeWidth={0.4} opacity={0.12}>
      {/* From compass center */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((deg, i) => (
        <line
          key={`rhumb-${i}`}
          x1={100}
          y1={620}
          x2={100 + 1200 * Math.cos((deg * Math.PI) / 180)}
          y2={620 - 1200 * Math.sin((deg * Math.PI) / 180)}
        />
      ))}
      {/* From secondary compass point (top-right) */}
      {[0, 30, 60, 90, 120, 150].map((deg, i) => (
        <line
          key={`rhumb2-${i}`}
          x1={860}
          y1={120}
          x2={860 + 800 * Math.cos(((deg + 180) * Math.PI) / 180)}
          y2={120 - 800 * Math.sin(((deg + 180) * Math.PI) / 180)}
          opacity={0.5}
        />
      ))}
    </g>

    {/* ===== OCEAN DEPTH SHADING ===== */}
    <g opacity={0.06}>
      {/* Coastal shallows */}
      <path
        d="M50,420 C200,410 400,430 600,420 C800,410 950,425 950,425 L950,680 L50,680 Z"
        fill="#3a5a7a"
      />
      <path
        d="M50,380 C150,370 250,385 350,375 C450,365 500,380 600,370 C700,360 800,375 950,365 L950,425 C800,410 600,420 400,430 C200,440 100,425 50,420 Z"
        fill="#4a6a8a"
      />
    </g>

    {/* ===== ORNATE COMPASS ROSE ===== */}
    <g transform="translate(100, 620) scale(1.15)">
      {/* Outer decorative rings */}
      <circle r={48} fill="none" stroke="#c9a84c" strokeWidth={2} opacity={0.7} />
      <circle r={45} fill="none" stroke="#c9a84c" strokeWidth={0.5} opacity={0.4} />
      <circle r={42} fill="none" stroke="#8b6914" strokeWidth={0.5} opacity={0.3} />

      {/* Degree tick marks on outer ring */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const inner = 42;
        const outer = i % 9 === 0 ? 48 : i % 3 === 0 ? 46 : 44;
        return (
          <line
            key={`tick-${i}`}
            x1={inner * Math.sin(angle)}
            y1={-inner * Math.cos(angle)}
            x2={outer * Math.sin(angle)}
            y2={-outer * Math.cos(angle)}
            stroke="#c9a84c"
            strokeWidth={i % 9 === 0 ? 1 : 0.4}
            opacity={i % 9 === 0 ? 0.8 : 0.4}
          />
        );
      })}

      {/* Intercardinal half-points (small diamonds) */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, i) => (
        <polygon
          key={`half-${i}`}
          points={[
            `${32 * Math.sin((deg * Math.PI) / 180)},${-32 * Math.cos((deg * Math.PI) / 180)}`,
            `${36 * Math.sin(((deg + 4) * Math.PI) / 180)},${-36 * Math.cos(((deg + 4) * Math.PI) / 180)}`,
            `${40 * Math.sin((deg * Math.PI) / 180)},${-40 * Math.cos((deg * Math.PI) / 180)}`,
            `${36 * Math.sin(((deg - 4) * Math.PI) / 180)},${-36 * Math.cos(((deg - 4) * Math.PI) / 180)}`,
          ].join(' ')}
          fill="#c9a84c"
          opacity={0.5}
        />
      ))}

      {/* Cardinal points with fleur-de-lis tips */}
      {/* North */}
      <g>
        <polygon points="0,-50 5,-16 0,-10 -5,-16" fill="#e8d18c" opacity={0.95} />
        <polygon points="0,-50 -3,-16 0,-10 3,-16" fill="#c9a84c" opacity={0.7} />
        {/* Fleur-de-lis */}
        <path d="M-3,-42 C-6,-48 -3,-50 0,-44 C3,-50 6,-48 3,-42" fill="#e8d18c" opacity={0.8} />
        <circle r={2.5} cx={0} cy={-52} fill="#e8d18c" />
      </g>
      {/* South */}
      <g>
        <polygon points="0,50 5,16 0,10 -5,16" fill="#c9a84c" opacity={0.5} />
        <polygon points="0,50 -3,16 0,10 3,16" fill="#8b6914" opacity={0.4} />
      </g>
      {/* East */}
      <g>
        <polygon points="50,0 16,5 10,0 16,-5" fill="#c9a84c" opacity={0.55} />
        <polygon points="50,0 16,-3 10,0 16,3" fill="#8b6914" opacity={0.4} />
      </g>
      {/* West */}
      <g>
        <polygon points="-50,0 -16,5 -10,0 -16,-5" fill="#c9a84c" opacity={0.55} />
        <polygon points="-50,0 -16,-3 -10,0 -16,3" fill="#8b6914" opacity={0.4} />
      </g>

      {/* Diagonal points (NE, NW, SE, SW) */}
      {[45, 135, 225, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const lx = 36 * Math.sin(rad);
        const ly = -36 * Math.cos(rad);
        const bx = 6 * Math.sin(rad + Math.PI / 2);
        const by = -6 * Math.cos(rad + Math.PI / 2);
        return (
          <polygon
            key={`diag-${i}`}
            points={`${lx},${ly} ${bx},${by} ${-bx},${-by}`}
            fill={i % 2 === 0 ? '#e8d18c' : '#c9a84c'}
            opacity={0.5}
          />
        );
      })}

      {/* Inner ring */}
      <circle r={26} fill="none" stroke="#c9a84c" strokeWidth={1} opacity={0.5} />
      <circle r={24} fill="none" stroke="#8b6914" strokeWidth={0.3} opacity={0.3} />

      {/* Inner star */}
      <g opacity={0.7}>
        {[0, 90, 180, 270].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const r2 = ((deg + 45) * Math.PI) / 180;
          return (
            <polygon
              key={`instar-${deg}`}
              points={`0,0 ${20 * Math.sin(r)},${-20 * Math.cos(r)} ${10 * Math.sin(r2)},${-10 * Math.cos(r2)}`}
              fill={deg % 180 === 0 ? '#e8d18c' : '#c9a84c'}
              opacity={0.4}
            />
          );
        })}
      </g>

      {/* Center dot */}
      <circle r={4} fill="#e8d18c" opacity={0.9} />
      <circle r={2} fill="#fff" opacity={0.5} />

      {/* Cardinal labels */}
      <g fontFamily="Cinzel, serif" fontWeight="bold" fontSize={12} fill="#e8d18c">
        <text x={0} y={-62} textAnchor="middle" opacity={0.95}>N</text>
        <text x={0} y={72} textAnchor="middle" opacity={0.6}>S</text>
        <text x={-64} y={5} textAnchor="middle" opacity={0.6}>W</text>
        <text x={64} y={5} textAnchor="middle" opacity={0.6}>E</text>
      </g>
    </g>

    {/* ===== TITLE CARTOUCHE ===== */}
    {/* Positioned well ABOVE the map (viewBox y < -50) so it sits in its own
        dedicated band and never overlaps landmasses or the HTML section title.
        Scaled to 0.75 to be proportional to the larger canvas. */}
    <g transform="translate(500, -65) scale(0.8)">
      {/* Outer frame - ornate (fixed symmetric path) */}
      <path
        d="M-200,-30 L-180,-34 L-160,-30 L-140,-34 L-120,-30 L-100,-34 L-80,-30 L-60,-34 L-40,-30 L-20,-34 L0,-30 L20,-34 L40,-30 L60,-34 L80,-30 L100,-34 L120,-30 L140,-34 L160,-30 L180,-34 L200,-30 L204,30 L180,34 L160,30 L140,34 L120,30 L100,34 L80,30 L60,34 L40,30 L20,34 L0,30 L-20,34 L-40,30 L-60,34 L-80,30 L-100,34 L-120,30 L-140,34 L-160,30 L-180,34 L-200,30 Z"
        fill="#2a1f18" stroke="#c9a84c" strokeWidth={2} opacity={0.92}
      />
      {/* Inner border */}
      <rect x={-190} y={-22} width={380} height={44} rx={2} fill="none" stroke="#c9a84c" strokeWidth={0.8} opacity={0.5} />
      {/* Corner flourishes */}
      {[
        [-196, -26], [196, -26], [196, 26], [-196, 26],
      ].map(([cx, cy], i) => (
        <g key={`fl-${i}`} transform={`translate(${cx}, ${cy})`}>
          <path
            d={`M0,0 C${i < 2 ? 8 : -8},${i % 3 === 0 ? -8 : 8} ${i < 2 ? 12 : -12},${i % 3 === 0 ? -12 : 12} ${i < 2 ? 6 : -6},${i % 3 === 0 ? -16 : 16}`}
            fill="none" stroke="#c9a84c" strokeWidth={1} opacity={0.6}
          />
          <circle r={2} fill="#e8d18c" opacity={0.5} />
        </g>
      ))}
      {/* Title text */}
      <text x={0} y={9} textAnchor="middle" fill="#e8d18c" fontSize={26} fontFamily="Cinzel, serif" fontWeight="bold" letterSpacing={3.5} filter="url(#textShadow)">
        THE FORGOTTEN REALMS
      </text>
    </g>

    {/* ===== COASTLINE WAVE DETAIL (subtle ocean waves) ===== */}
    <g stroke="#6a8a9a" strokeWidth={0.6} fill="none" opacity={0.18}>
      {[440, 470, 500, 530, 560, 590, 620, 650].map((y, i) => (
        <path
          key={`wave-${i}`}
          d={`M60,${y} C100,${y - 2 + (i % 3)} 140,${y + 2 - (i % 3)} 180,${y} C220,${y - 2} 260,${y + 2} 300,${y} C340,${y - 2} 380,${y + 2} 420,${y} C460,${y - 2} 500,${y + 2} 540,${y} C580,${y - 2} 620,${y + 2} 660,${y} C700,${y - 2} 740,${y + 2} 780,${y} C820,${y - 2} 860,${y + 2} 900,${y} C920,${y - 1} 940,${y + 1} 950,${y}`}
        />
      ))}
    </g>

    {/* ===== MOUNTAIN RANGES (detailed) ===== */}
    {/* Eldoria mountains */}
    <g transform="translate(170, 95)" fill="none" stroke="#5a4a3a" strokeWidth={1}>
      {[
        [0, 18, 6, 2, 12, 18],
        [8, 18, 14, 0, 20, 18],
        [16, 18, 22, 4, 28, 18],
        [24, 18, 30, 1, 36, 18],
        [-6, 18, 0, 5, 6, 18],
      ].map(([x1, y1, x2, y2, x3, y3], i) => (
        <g key={`mt-e-${i}`}>
          <path d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} fill="#6a5a4a" fillOpacity={0.15} />
          <path d={`M${x2},${y2} L${x2 - 2},${y2 + 3}`} strokeWidth={0.6} />
        </g>
      ))}
      {/* Snow caps */}
      {[
        [6, 2],
        [14, 0],
        [22, 4],
        [30, 1],
      ].map(([cx, cy], i) => (
        <path key={`snow-e-${i}`} d={`M${cx - 1.5},${cy + 1} L${cx},${cy} L${cx + 1.5},${cy + 1}`} fill="#d8d0c0" fillOpacity={0.25} stroke="none" />
      ))}
    </g>

    {/* Drakmoor volcanic peaks */}
    <g transform="translate(710, 72)" fill="none" stroke="#4a2a1a" strokeWidth={1.2}>
      {[
        [0, 22, 7, 0, 14, 22],
        [10, 22, 18, 0, 26, 22],
        [20, 22, 28, 3, 36, 22],
        [30, 22, 37, 0, 44, 22],
        [-8, 22, 0, 4, 8, 22],
      ].map(([x1, y1, x2, y2, x3, y3], i) => (
        <g key={`mt-d-${i}`}>
          <path d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} fill="#3a1a0a" fillOpacity={0.2} />
          {/* Volcanic smoke */}
          {i === 1 && (
            <>
              <circle cx={18} cy={-3} r={2} fill="#8a6a4a" fillOpacity={0.15} stroke="none" />
              <circle cx={20} cy={-6} r={1.5} fill="#8a6a4a" fillOpacity={0.1} stroke="none" />
            </>
          )}
        </g>
      ))}
    </g>

    {/* Shadowmere hills */}
    <g transform="translate(190, 270)" fill="none" stroke="#4a3a4a" strokeWidth={0.8}>
      {[
        [-5, 12, 2, 3, 9, 12],
        [5, 12, 12, 1, 19, 12],
        [15, 12, 21, 4, 27, 12],
        [25, 12, 31, 2, 37, 12],
      ].map(([x1, y1, x2, y2, x3, y3], i) => (
        <path key={`mt-s-${i}`} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} fill="#5a4a5a" fillOpacity={0.1} />
      ))}
    </g>

    {/* Frosthaven ice peaks */}
    <g transform="translate(620, 310)" fill="none" stroke="#5a6a7a" strokeWidth={0.9}>
      {[
        [0, 16, 5, 0, 10, 16],
        [7, 16, 13, 0, 19, 16],
        [15, 16, 21, 2, 27, 16],
        [23, 16, 28, 0, 33, 16],
      ].map(([x1, y1, x2, y2, x3, y3], i) => (
        <g key={`mt-f-${i}`}>
          <path d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} fill="#6a7a8a" fillOpacity={0.12} />
          <path d={`M${x2 - 1},${y2 + 2} L${x2},${y2} L${x2 + 1},${y2 + 2}`} fill="#c8d8e0" fillOpacity={0.2} stroke="none" />
        </g>
      ))}
    </g>

    {/* ===== FOREST CLUSTERS ===== */}
    <g opacity={0.35}>
      {/* Eldoria forests */}
      {[
        [160, 120],
        [180, 135],
        [200, 125],
        [170, 150],
        [190, 160],
        [155, 145],
        [215, 140],
        [195, 170],
        [175, 175],
        [220, 155],
      ].map(([cx, cy], i) => (
        <g key={`tree-e-${i}`} transform={`translate(${cx}, ${cy})`}>
          <circle r={4} fill="#4a5a3a" opacity={0.5} />
          <circle r={2.5} fill="#5a6a4a" opacity={0.6} />
          <circle r={1.2} fill="#6a7a5a" opacity={0.5} />
        </g>
      ))}
      {/* Drakmoor sparse trees */}
      {[
        [640, 100],
        [660, 95],
        [680, 108],
        [700, 100],
        [720, 110],
        [740, 98],
        [760, 105],
      ].map(([cx, cy], i) => (
        <g key={`tree-d-${i}`} transform={`translate(${cx}, ${cy})`}>
          <circle r={3} fill="#5a4a3a" opacity={0.4} />
          <circle r={1.8} fill="#6a5a4a" opacity={0.5} />
        </g>
      ))}
      {/* Frosthaven pine clusters */}
      {[
        [600, 340],
        [620, 350],
        [640, 335],
        [660, 345],
        [680, 355],
        [610, 360],
        [650, 370],
      ].map(([cx, cy], i) => (
        <g key={`tree-f-${i}`} transform={`translate(${cx}, ${cy})`}>
          <polygon points="0,-4 -3,2 3,2" fill="#4a6a6a" opacity={0.5} />
          <polygon points="0,-6 -2.5,-1 2.5,-1" fill="#5a7a7a" opacity={0.4} />
        </g>
      ))}
    </g>

    {/* ===== CASTLES & SETTLEMENTS ===== */}
    <g opacity={0.55}>
      {/* Eldoria castle */}
      <g transform="translate(195, 155)">
        <rect x={-4} y={-2} width={8} height={10} fill="#6a5a4a" />
        <rect x={-6} y={-6} width={12} height={5} fill="#7a6a5a" />
        {[-4, 0, 4].map((dx) => (
          <rect key={`t-e-${dx}`} x={dx - 2} y={-10} width={4} height={4} fill="#6a5a4a" />
        ))}
        <line x1={0} y1={-10} x2={0} y2={-14} stroke="#c9a84c" strokeWidth={0.5} />
        <rect x={-1} y={-15} width={2} height={1.5} fill="#e8d18c" opacity={0.6} />
      </g>
      {/* Drakmoor fortress */}
      <g transform="translate(700, 145)">
        <rect x={-5} y={-3} width={10} height={12} fill="#4a2a1a" />
        <rect x={-7} y={-8} width={14} height={6} fill="#5a3a2a" />
        {[-5, -1, 3].map((dx, i) => (
          <rect key={`t-d-${i}`} x={dx} y={-13} width={4} height={5} fill="#4a2a1a" />
        ))}
        <line x1={-1} y1={-13} x2={-1} y2={-16} stroke="#c94c2c" strokeWidth={0.6} opacity={0.6} />
      </g>
      {/* Frosthaven keep */}
      <g transform="translate(660, 350)">
        <rect x={-3} y={-1} width={6} height={8} fill="#5a6a7a" />
        <rect x={-5} y={-5} width={10} height={5} fill="#6a7a8a" />
        <rect x={-1} y={-9} width={2} height={4} fill="#5a6a7a" />
        <line x1={0} y1={-9} x2={0} y2={-12} stroke="#8ab0d0" strokeWidth={0.5} opacity={0.5} />
      </g>
      {/* Shadowmere ruins */}
      <g transform="translate(200, 330)">
        <rect x={-5} y={0} width={10} height={5} fill="#5a4a5a" opacity={0.5} />
        <rect x={-3} y={-4} width={6} height={4} fill="#5a4a5a" opacity={0.4} />
        {[-5, 5].map((dx) => (
          <rect key={`ruin-${dx}`} x={dx - 1.5} y={-2} width={3} height={3} fill="#5a4a5a" opacity={0.3} />
        ))}
      </g>
    </g>

    {/* ===== SEA MONSTERS ===== */}
    {/* Kraken */}
    <g transform="translate(620, 580)" opacity={0.4}>
      {/* Body */}
      <ellipse cx={0} cy={0} rx={14} ry={10} fill="none" stroke="#4a5a6a" strokeWidth={1} />
      <ellipse cx={0} cy={0} rx={8} ry={5} fill="#4a5a6a" fillOpacity={0.1} stroke="none" />
      {/* Eye */}
      <circle cx={5} cy={-2} r={2} fill="#4a5a6a" />
      <circle cx={5.5} cy={-2.5} r={0.7} fill="#8a9aaa" />
      {/* Tentacles */}
      {[
        [-8, 6, -10, 16, -6, 14],
        [-3, 8, -5, 18, -1, 16],
        [3, 8, 5, 18, 1, 16],
        [8, 6, 10, 16, 6, 14],
      ].map(([x1, y1, cx, cy, x2, y2], i) => (
        <path
          key={`tent-${i}`}
          d={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
          fill="none" stroke="#4a5a6a" strokeWidth={1} strokeLinecap="round"
        />
      ))}
      {/* Water splashes */}
      {[-14, -8, 8, 14].map((x, i) => (
        <path
          key={`splash-${i}`}
          d={`M${x},${-2 - i} Q${x + 2},${-5 - i} ${x},${-1 - i}`}
          fill="none" stroke="#5a7a9a" strokeWidth={0.5}
        />
      ))}
    </g>

    {/* Sea Serpent */}
    <g transform="translate(340, 580)" opacity={0.35}>
      <path
        d="M-20,0 C-15,-5 -10,-8 -5,-3 C0,2 5,-2 10,2 C15,6 18,4 22,0"
        fill="none" stroke="#5a6a7a" strokeWidth={1.5}
      />
      <path
        d="M-20,0 C-18,2 -16,6 -15,8"
        fill="none" stroke="#5a6a7a" strokeWidth={1}
      />
    </g>

    {/* ===== SHIPS ===== */}
    {/* Galleon 1 */}
    <g transform="translate(360, 495)" opacity={0.4}>
      <path d="M-14,2 L-6,-4 L8,-4 L16,2 Z" fill="#7a6a5a" stroke="#5a4a3a" strokeWidth={0.5} />
      <line x1={0} y1={-4} x2={0} y2={-16} stroke="#5a4a3a" strokeWidth={0.6} />
      <line x1={-6} y1={-4} x2={-6} y2={-12} stroke="#5a4a3a" strokeWidth={0.5} />
      <path d="M-10,-6 L0,-8 L10,-6" fill="none" stroke="#8a7a6a" strokeWidth={0.5} />
      <path d="M-2,-6 L0,-12 L2,-6" fill="#c9b8a0" fillOpacity={0.5} stroke="none" />
    </g>
    {/* Galleon 2 */}
    <g transform="translate(720, 500)" opacity={0.35}>
      <path d="M-10,2 L-4,-3 L6,-3 L12,2 Z" fill="#7a6a5a" stroke="#5a4a3a" strokeWidth={0.5} />
      <line x1={0} y1={-3} x2={0} y2={-12} stroke="#5a4a3a" strokeWidth={0.5} />
      <path d="M-2,-5 L0,-9 L2,-5" fill="#c9b8a0" fillOpacity={0.4} stroke="none" />
    </g>

    {/* ===== RIVERS (winding) ===== */}
    <g fill="none" stroke="#6a9aba" strokeWidth={1.8} opacity={0.3}>
      {/* River through Eldoria */}
      <path
        d="M185,80 C190,100 170,120 185,140 C200,160 195,180 200,200 C205,220 195,240 200,260 C205,280 195,300 200,320 C205,340 195,360 190,380 C185,400 190,420 185,440"
        filter="url(#mapGlow)"
      />
      {/* River through Drakmoor/Frosthaven */}
      <path
        d="M740,50 C720,80 735,110 720,140 C705,170 720,200 705,230 C690,260 695,290 680,320 C665,350 670,380 655,410 C640,440 645,470 630,500"
        filter="url(#mapGlow)"
      />
      {/* Tributary rivers */}
      <path d="M200,260 C230,280 270,275 300,290 C330,305 360,300 380,310" strokeWidth={1.2} />
      <path d="M720,200 C690,220 660,215 640,240 C620,265 610,280 590,300" strokeWidth={1} />
      <path d="M185,140 C210,150 240,145 260,160" strokeWidth={1} />
    </g>

    {/* ===== ROADS (dotted) ===== */}
    <g fill="none" stroke="#8a7a5a" strokeWidth={1.2} strokeDasharray="2 5" opacity={0.35}>
      <path d="M260,200 C320,210 400,250 480,290 C540,320 580,340 620,380" />
      <path d="M260,200 C280,270 270,340 240,400" />
      <path d="M620,380 C640,430 620,480 580,530" />
      <path d="M420,310 C410,370 380,420 340,480" />
      <path d="M310,310 C370,330 400,350 460,370" />
    </g>

    {/* ===== SMALL ISLANDS & REEFS ===== */}
    <g opacity={0.3}>
      {/* Eldoria coast */}
      {[
        [120, 80],
        [130, 92],
        [145, 78],
        [138, 88],
      ].map(([cx, cy], i) => (
        <ellipse key={`isl-e-${i}`} cx={cx} cy={cy} rx={3 + i * 0.5} ry={2 + i * 0.3} fill="#8a9a6a" stroke="#b8956a" strokeWidth={0.3} />
      ))}
      {/* Drakmoor coast */}
      {[
        [740, 50],
        [750, 62],
        [735, 55],
        [760, 52],
      ].map(([cx, cy], i) => (
        <ellipse key={`isl-d-${i}`} cx={cx} cy={cy} rx={2.5 + i * 0.4} ry={2} fill="#b8956a" stroke="#b8956a" strokeWidth={0.3} />
      ))}
      {/* Frosthaven coast */}
      {[
        [530, 288],
        [538, 300],
        [545, 292],
        [520, 295],
      ].map(([cx, cy], i) => (
        <ellipse key={`isl-fh-${i}`} cx={cx} cy={cy} rx={2 + i * 0.3} ry={1.8} fill="#8a9a9a" stroke="#b8956a" strokeWidth={0.3} />
      ))}
    </g>

    {/* ===== SCALE BAR ===== */}
    <g transform="translate(830, 650)" opacity={0.5}>
      <text x={0} y={-6} fill="#8a7a5a" fontSize={7} fontFamily="Cinzel, serif">LEAGUES</text>
      <rect x={0} y={0} width={40} height={4} fill="#8a7a5a" />
      <rect x={10} y={0} width={10} height={4} fill="#c9b8a0" />
      <rect x={30} y={0} width={10} height={4} fill="#c9b8a0" />
      {[0, 100, 200, 400].map((v, i) => (
        <text key={`sc-${i}`} x={i * 10} y={12} fill="#8a7a5a" fontSize={6} fontFamily="Cinzel, serif" textAnchor="middle">{v}</text>
      ))}
    </g>
  </g>
);

export default MapDecorations;
