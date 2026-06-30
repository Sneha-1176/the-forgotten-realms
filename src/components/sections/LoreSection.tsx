import React, { useState } from 'react';
import Reveal from '../Reveal';

type Category = 'MYTH' | 'CATACLYSM' | 'HISTORY' | 'LORE' | 'BESTIARY';

interface LoreCard {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  content: string;
  icon: string;
}

const categoryIcons: Record<Category, string> = {
  MYTH: '◎',
  CATACLYSM: '◈',
  HISTORY: '◆',
  LORE: '✦',
  BESTIARY: '▣',
};

const allCategories: Category[] = ['MYTH', 'CATACLYSM', 'HISTORY', 'LORE', 'BESTIARY'];

const loreCards: LoreCard[] = [
  {
    id: 'creation',
    category: 'MYTH',
    title: 'The Creation Myth',
    subtitle: 'How the Realms Were Born',
    content:
      'In the beginning, the World-Serpent Ymir coiled around the void and dreamed the five realms into existence. His breath became the winds, his scales the mountains, and his tears the oceans that separate the Sunken Isles from the mainland.',
    icon: '🌌',
  },
  {
    id: 'war',
    category: 'CATACLYSM',
    title: 'The War of Twin Moons',
    subtitle: "Shadowmere's Eternal Twilight",
    content:
      'When the Shadow King sought to tear open the veil between worlds, the Twin Moons wept tears of silver fire. The battle lasted a thousand nights. Though the Shadow King was defeated, his curse left Shadowmere in perpetual dusk — a wound in the world that never healed.',
    icon: '🌑',
  },
  {
    id: 'dragon',
    category: 'BESTIARY',
    title: 'The Fall of Vorathrax',
    subtitle: "Drakmoor's Scorching",
    content:
      'Vorathrax the Elder Wyrm, greatest of all dragons, was betrayed by his own kin. His flaming body fell from the heavens and crashed into the heart of Drakmoor, creating the volcanic scar that still burns today. They say his bones still pulse with fire beneath Mount Pyre.',
    icon: '🐉',
  },
  {
    id: 'tree',
    category: 'LORE',
    title: 'The Great Tree of Lumin',
    subtitle: "Eldoria's Eternal Guardian",
    content:
      'Planted by the star-fallen Aelindor over ten millennia ago, the Great Tree\'s roots reach into the very core of the world. Its leaves glow with the light of captured starlight, and the elves believe that as long as it stands, Eldoria can never fall to darkness.',
    icon: '🌳',
  },
  {
    id: 'frost',
    category: 'MYTH',
    title: 'The Breath of Ymir',
    subtitle: "Frosthaven's Frozen Heart",
    content:
      'Deep beneath the Great Glacier, Ymir still sleeps. His breath escapes through fissures in the ice, creating the aurora that dances across Frosthaven\'s night sky. The Frostborn forge their legendary ice-steel from the frozen fragments of his ancient scales.',
    icon: '❄️',
  },
  {
    id: 'tides',
    category: 'CATACLYSM',
    title: 'The Cataclysm of Tides',
    subtitle: "The Sunken Isles' Tragedy",
    content:
      'Thalassia was once the greatest continent of all, a maritime empire that ruled the waves. But when the Mer-King defied the ocean gods, the seas rose and swallowed the land whole. Now only the highest peaks remain as the Sunken Isles, and the Sapphire Throne lies deep beneath.',
    icon: '🌊',
  },
];

const LoreSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const filteredCards = activeCategory
    ? loreCards.filter((c) => c.category === activeCategory)
    : loreCards;

  const toggleCategory = (cat: Category) => {
    setActiveCategory(activeCategory === cat ? null : cat);
    setActiveCard(null);
  };

  return (
    <section className="scene-section relative" id="lore">
      {/* Background image — warmed to ancient sepia/amber tones */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/scene3-cave.jpg)',
          filter: 'sepia(0.35) saturate(0.85) hue-rotate(-8deg) brightness(0.92)',
        }}
      />

      {/* Warm gold tint to neutralize any modern cool tones */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(80, 50, 25, 0.22)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Dark stone overlay — heavier for ancient feel */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(12, 8, 5, 0.55)' }}
      />

      {/* Ancient amber crystal glows — no modern blues */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(180,130,80,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: '55%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(160,110,60,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating dust motes — warm amber */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              width: `${1.5 + Math.random() * 3}px`,
              height: `${1.5 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${180 + Math.random() * 50}, ${140 + Math.random() * 50}, ${70 + Math.random() * 40}, ${0.25 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 7}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        {/* ===== SECTION TITLE — Sculptural carved look ===== */}
        <Reveal variant="up" className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.25em] mb-3"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#c9a84c',
              textShadow: '1px 1px 0 #3d2b1f, 2px 2px 0 #1a1410, 0 0 30px rgba(201,168,76,0.18)',
            }}
          >
            THE CAVE OF KNOWLEDGE
          </h2>

          {/* Rune divider */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-[#5c3d2e] text-sm tracking-[12px] select-none">⚔ ✦ ⚔</span>
          </div>

          <p
            className="mt-3 text-sm italic tracking-wide"
            style={{ fontFamily: '"IM Fell English", serif', color: '#a89070' }}
          >
            Ancient lore whispers from the crystal depths...
          </p>
        </Reveal>

        {/* ===== CATEGORY FILTERS — Carved Stone Tablets ===== */}
        <Reveal variant="up" delay={150} className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="group relative transition-all duration-500"
                style={{ padding: '2px' }}
              >
                {/* Outer stone tablet shape */}
                <div
                  className="flex items-center gap-2.5 px-5 py-2.5 transition-all duration-500"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, #3d2b1f, #2a1f18)'
                      : 'linear-gradient(180deg, #2a1f18, #1e1510)',
                    border: isActive ? '1.5px solid #c9a84c' : '1.5px solid #4a3528',
                    borderRadius: '3px',
                    boxShadow: isActive
                      ? '0 0 18px rgba(201,168,76,0.2), inset 0 1px 0 rgba(201,168,76,0.08)'
                      : 'inset 0 0 15px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Category rune symbol */}
                  <span
                    className="text-base leading-none transition-all duration-500"
                    style={{
                      color: isActive ? '#e8d18c' : '#5c3d2e',
                      textShadow: isActive ? '0 0 8px rgba(201,168,76,0.4)' : 'none',
                    }}
                  >
                    {categoryIcons[cat]}
                  </span>

                  {/* Carved text */}
                  <span
                    className="text-xs tracking-[0.3em] font-bold transition-all duration-500"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      color: isActive ? '#c9b8a0' : '#5c4a3a',
                      textShadow: isActive
                        ? '1px 1px 0 #1a1410, 0 0 6px rgba(201,168,76,0.15)'
                        : '1px 1px 0 #0d0b08',
                    }}
                  >
                    {cat}
                  </span>
                </div>

                {/* Active indicator — gold underline glow */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                    style={{
                      width: '60%',
                      background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                      boxShadow: '0 0 8px rgba(201,168,76,0.5)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </Reveal>

        {/* ===== LORE CARDS — Stone Tablet Style ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, idx) => {
            const isActive = activeCard === card.id;
            return (
              <Reveal
                key={card.id}
                variant="up"
                delay={idx * 90}
                threshold={0.1}
                className="h-full"
              >
              <div
                onClick={() => {
                  setActiveCard(isActive ? null : card.id);
                }}
                className="relative cursor-pointer group transition-all duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(160deg, #2a1f18 0%, #1e1510 50%, #2a1f18 100%)'
                    : 'linear-gradient(160deg, #221a14 0%, #1a1210 50%, #221a14 100%)',
                  border: isActive ? '1.5px solid rgba(201,168,76,0.5)' : '1.5px solid rgba(90,65,45,0.35)',
                  borderRadius: '4px',
                  boxShadow: isActive
                    ? '0 0 35px rgba(201,168,76,0.12), 0 6px 25px rgba(0,0,0,0.5), inset 0 0 60px rgba(201,168,76,0.03)'
                    : '0 4px 18px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.3)',
                  transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
                }}
              >
                {/* ===== Stone Corner Accents ===== */}
                {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
                  const styles: Record<string, React.CSSProperties> = {
                    tl: { top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid' },
                    tr: { top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid' },
                    bl: { bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid' },
                    br: { bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid' },
                  };
                  return (
                    <div
                      key={pos}
                      className="absolute w-5 h-5 transition-all duration-500 pointer-events-none"
                      style={{
                        ...styles[pos],
                        borderColor: isActive ? 'rgba(201,168,76,0.6)' : 'rgba(90,65,45,0.3)',
                        borderRadius: pos === 'tl' ? '4px 0 0 0' : pos === 'tr' ? '0 4px 0 0' : pos === 'bl' ? '0 0 0 4px' : '0 0 4px 0',
                      }}
                    />
                  );
                })}

                {/* Card hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[4px]"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)',
                  }}
                />

                <div className="relative p-6">
                  {/* ===== Category badge — Carved stone label ===== */}
                  <div className="mb-4 flex items-center gap-2">
                    <span
                      className="text-xs tracking-[0.3em] font-bold px-3 py-1 inline-block"
                      style={{
                        fontFamily: 'Cinzel, serif',
                        color: '#8a7050',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(90,65,45,0.3)',
                        borderRadius: '2px',
                        textShadow: '1px 1px 0 #0d0b08',
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      {categoryIcons[card.category]} {card.category}
                    </span>
                  </div>

                  {/* ===== Icon ===== */}
                  <div className="text-3xl mb-4 opacity-80">{card.icon}</div>

                  {/* ===== Title — Gold, carved feel ===== */}
                  <h3
                    className="text-xl font-bold mb-2 tracking-wide"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      color: isActive ? '#e8d18c' : '#c9a84c',
                      textShadow: isActive
                        ? '0 0 12px rgba(201,168,76,0.35), 1px 1px 0 #1a1410'
                        : '1px 1px 0 #1a1410',
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* ===== Subtitle — faded ink ===== */}
                  <p
                    className="text-xs mb-4 italic tracking-wide"
                    style={{ fontFamily: '"IM Fell English", serif', color: '#8a7060' }}
                  >
                    {card.subtitle}
                  </p>

                  {/* ===== Expandable content ===== */}
                  <div
                    className={`overflow-hidden transition-all duration-600 ${
                      isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    {/* Runic divider */}
                    <div
                      className="mb-4"
                      style={{
                        height: '2px',
                        background: 'repeating-linear-gradient(90deg, #5c3d2e 0px, #5c3d2e 6px, transparent 6px, transparent 14px, #5c3d2e 14px, #5c3d2e 20px)',
                        opacity: 0.5,
                      }}
                    />

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ fontFamily: '"IM Fell English", serif', color: '#c9b8a0' }}
                    >
                      {card.content}
                    </p>
                  </div>

                  {/* ===== REVEAL / COLLAPSE button — Ancient Seal ===== */}
                  <button
                    className="relative overflow-hidden group/btn transition-all duration-500 mt-1"
                    style={{
                      background: 'transparent',
                      border: `1.5px solid ${isActive ? 'rgba(201,168,76,0.5)' : 'rgba(90,65,45,0.35)'}`,
                      padding: '6px 18px',
                      borderRadius: '3px',
                      color: isActive ? '#e8d18c' : '#8a7050',
                      fontFamily: 'Cinzel, serif',
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
                      e.currentTarget.style.color = '#e8d18c';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = isActive ? 'rgba(201,168,76,0.5)' : 'rgba(90,65,45,0.35)';
                      e.currentTarget.style.color = isActive ? '#e8d18c' : '#8a7050';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Inner light sweep */}
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s ease',
                      }}
                    />

                      <span className="relative flex items-center gap-2">
                        {isActive ? 'SEAL' : 'REVEAL'}
                        <span
                          className="text-sm leading-none transition-transform duration-500 inline-block"
                          style={{
                            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                            opacity: 0.6,
                          }}
                        >
                          ⚔
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Empty state when filtering yields nothing */}
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-lg tracking-widest"
              style={{ fontFamily: 'Cinzel, serif', color: '#5c3d2e' }}
            >
              No scrolls found in this archive
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoreSection;
