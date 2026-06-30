import React, { useState, useRef, useEffect, useCallback } from 'react';
import Reveal from '../Reveal';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'oracle';
}

interface Session {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

const greeting: Message = {
  id: 0,
  text: 'Hark, traveler. I am the Ancient Oracle of Aethelgard, a spirit who has watched kingdoms rise and fall for thousands of years. I remember the First Ones, the Sundering, and the long Age of Mortals. Ask me of this world, and I shall answer clearly, like an old storyteller beside a warm fire. What wouldst thou like to know?',
  sender: 'oracle',
};

const extractTravelerName = (text: string) => {
  const match = text.match(/(?:my name is|i am|i'm|call me)\s+([A-Za-z][A-Za-z'-]{1,24})/i);
  return match?.[1];
};

const findKnownName = (history: Message[]) => {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    if (history[i].sender === 'user') {
      const name = extractTravelerName(history[i].text);
      if (name) return name;
    }
  }
  return null;
};

const address = (history: Message[], currentText: string) => {
  const name = extractTravelerName(currentText) || findKnownName(history);
  return name ? `${name}, ` : '';
};

const generateOracleResponse = (question: string, history: Message[]) => {
  const q = question.toLowerCase();
  const who = address(history, question);

  if (q.includes('who are you') || q.includes('what are you')) {
    return `I am a spirit who has lived for thousands of years, ${who || 'traveler. '}People call me the Oracle. I have watched empires rise and fall like waves on a shore, and I remember the old stories of Aethelgard. I can guide thee through its forests, mountains, sunken ruins, dark caves, and stormy islands. What secret dost thou wish to uncover?`;
  }

  if (q.includes('aethelgard') || q.includes('world') || q.includes('realm')) {
    return `Aethelgard is a broken but beautiful world, ${who || 'seeker. '}It was made by the First Ones, ancient beings who shaped the realm through song. Long ago, a great disaster called the Sundering cracked the land apart, and now regular people rule in the Age of Mortals. Its five great places are the Forest of Whispers, Mountains of Eternity, Sunken Citadel, Shadowmere Depths, and Tempest Peaks. Which place wouldst thou like to visit first?`;
  }

  if (q.includes('sundering') || q.includes('history') || q.includes('age of mortals') || q.includes('elder races')) {
    return `By the old gods, the Sundering was the great breaking of Aethelgard. Imagine the ground splitting, seas rushing in, mountains shaking, and whole cities falling into darkness. After that disaster, the Elder Races faded away: the Sylvanari vanished, the Aetherium went dormant, and the Naga'esh sank beneath the waves. Now it is the Age of Mortals, when ordinary folk must live among ancient ruins. Wouldst thou hear what caused the Sundering, or who survived it?`;
  }

  if (q.includes('forest') || q.includes('whispers') || q.includes('wood elf') || q.includes('treant')) {
    return `Imagine a forest so old that the trees have learned to speak, ${who || 'traveler. '}At night, glowing mushrooms light the ground in blue and green, and ghostly lights drift between the trunks like lost fireflies. Wood Elves and Treants live there, but Will-o'-Wisps may trick careless travelers. The forest is beautiful, but it remembers every insult and every broken branch. Dost thou wish to enter it for wisdom, or merely to hear its whispers?`;
  }

  if (q.includes('mountain') || q.includes('eternity') || q.includes('dwarf') || q.includes('skyknight') || q.includes('stone giant')) {
    return `The Mountains of Eternity are so tall they seem to touch the clouds. Inside them are Aetherite crystals, magical stones that glow and make magic stronger. Dwarves mine in the deep halls, Skyknights guard the high passes, and Stone Giants wander the cold valleys. The greatest danger is the weather: blizzards, ice, and sudden storms. Wouldst thou seek the Crystal Caverns or climb toward the Summit Temple?`;
  }

  if (q.includes('sunken') || q.includes('citadel') || q.includes('naga') || q.includes('crystal of aethel')) {
    return `Hark well: the Sunken Citadel is an ancient city that sank beneath the sea. Only its towers rise above the water, like stone fingers reaching for the sky. Deep inside, the Crystal of Aethel is hidden, a magic stone powerful enough to save the world or destroy it. Monsters, drowned spirits, and the sleeping Naga'esh guard the lower halls. Wouldst thou dare search for the Crystal, or learn how to survive the depths first?`;
  }

  if (q.includes('shadowmere') || q.includes('depth') || q.includes('obsidian') || q.includes('dark elf') || q.includes('deep gnome')) {
    return `The Shadowmere Depths are a world beneath the ground, filled with endless caves and black stone. Glowing mushrooms give the only light, and the air feels heavy, as if the dark itself is breathing. Dark Elves and Deep Gnomes live there, but Shadow Beasts and corrupted Obsidian Lords whisper promises of power. Those promises are traps, for Void magic uses darkness and can twist the heart. Dost thou seek the Forge of Shadows, or wouldst thou rather avoid that dangerous road?`;
  }

  if (q.includes('tempest') || q.includes('peak') || q.includes('dragonkin') || q.includes('stormbird')) {
    return `The Tempest Peaks are islands where storms never stop. Lightning strikes so often that some rocks have turned to glass, shining sharp and black in the rain. Dragonkin live among the cliffs, and great Stormbirds fly through thunder as if it were wind. The seas around the islands are deadly, so only the brave or foolish try to reach them. Wouldst thou seek the Aerie, or the old Sky Shrine of the First Ones?`;
  }

  if (q.includes('magic') || q.includes('aetherite') || q.includes('elemental') || q.includes('void') || q.includes('aether')) {
    return `Magic in Aethelgard is like a river flowing through the land, ${who || 'seeker. '}Aetherite crystals make that river stronger, like adding oil to a flame. There are three kinds: Elemental magic controls fire, water, earth, and air; Void magic uses darkness; and Aether magic creates new things. But magic is fading because the world is growing old, and using too much drains life from the caster. Wouldst thou learn which school is safest, or which is strongest?`;
  }

  if (q.includes('first ones') || q.includes('sylvanari') || q.includes('aetherium') || q.includes('obsidian lord') || q.includes('queen')) {
    return `The First Ones were the ancient beings who made Aethelgard through song. The Sylvanari were forest elves, now believed extinct, though their memory lives in the Forest of Whispers. The Aetherium are stone beings who sleep in the Mountains of Eternity, while the Naga'esh are serpent folk who slumber beneath the Sunken Citadel. The Obsidian Lords mastered shadow magic, but it corrupted them and made them cruel. Which of these old peoples wouldst thou like to understand better?`;
  }

  if (q.includes('quest') || q.includes('adventure') || q.includes('mission') || q.includes('what should i do')) {
    return `The stars have whispered thy name, ${who || 'traveler. '}A simple but dangerous quest lies before thee: go to the Shadowmere Depths and seek the Ember of Dawn. It is an eternal flame, a fire that never dies, and it can protect the brave from darkness. Find a Deep Gnome named Grumblebrook in the Mushroom Market, for he knows the safer tunnels. Wilt thou take this quest, or wouldst thou rather seek the Crystal of Aethel in the Sunken Citadel?`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hark') || q.includes('greetings')) {
    return `Hark, ${who || 'traveler, '}thou art welcome here. Sit beside the old fire of memory, and I shall tell thee what I know of Aethelgard. Thou mayest ask about a place, a monster, a quest, magic, or thy destiny. What wouldst thou like to hear first?`;
  }

  return `Hark, ${who || 'seeker, '}thy question is not lost, but it needs a clearer path. In Aethelgard, I can tell thee about places, magic, quests, prophecies, creatures, or ancient history. If thy question reaches beyond my sight, I shall guide thee back to what is known. Ask me of the Forest of Whispers, the Sunken Citadel, the Crystal of Aethel, or the dangers ahead. Which thread shall we follow first?`;
};

const initialSessions: Session[] = [
  {
    id: 'past-1',
    title: 'The Crystal of Aethel',
    timestamp: 'Yesterday',
    messages: [
      greeting,
      { id: 11, text: 'Where is the Crystal of Aethel?', sender: 'user' },
      { id: 12, text: 'Hark, the Crystal of Aethel lies within the Sunken Citadel, where the Naga\'esh Queen keeps watch beneath drowned arches. It pulses with the power to restore fading magic, yet the deep exacts payment from all who trespass. Seek not the crystal without guide, ward, and oath, for the drowned do not forget intruders. Wouldst thou learn the safer road beneath the tide?', sender: 'oracle' },
    ],
  },
  {
    id: 'past-2',
    title: 'Whispers of the Sundering',
    timestamp: '3 days ago',
    messages: [
      greeting,
      { id: 21, text: 'What was the Sundering?', sender: 'user' },
      { id: 22, text: 'By the old gods, the Sundering of 1,347 AS shattered Aethelgard and scattered the Elder Races into silence. The Sylvanari faded, the Aetherium vanished, and the Naga\'esh retreated beneath the sea. Mortals now dwell amid the broken inheritance of powers they scarcely comprehend. Shall I speak of the cause, or of what still bleeds from that wound?', sender: 'oracle' },
    ],
  },
];

const STORAGE_KEY = 'oracle.chatSessions.v1';

const OracleSection: React.FC = () => {
  // Load from localStorage on first render, fall back to demo seed
  const [sessions, setSessions] = useState<Session[]>(() => {
    if (typeof window === 'undefined') return initialSessions;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Session[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      /* ignore */
    }
    return initialSessions;
  });
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  // Delete feature state
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const area = messagesAreaRef.current;
    if (!area) return;
    area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Persist sessions to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      /* ignore quota errors */
    }
  }, [sessions]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // ESC closes confirmation dialog
  useEffect(() => {
    if (!pendingDeleteId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPendingDeleteId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pendingDeleteId]);

  const requestDelete = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const cancelDelete = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const confirmDelete = useCallback(() => {
    const id = pendingDeleteId;
    if (!id) return;
    setPendingDeleteId(null);
    setDeletingId(id);

    // Wait for fade-to-mist animation, then remove
    setTimeout(() => {
      setSessions((prev) => {
        const next = prev.filter((s) => s.id !== id);
        // If active session was deleted, reset chat or load next
        if (currentSessionId === id) {
          if (next.length > 0) {
            setMessages(next[0].messages);
            setCurrentSessionId(next[0].id);
          } else {
            setMessages([greeting]);
            setCurrentSessionId(null);
          }
        }
        return next;
      });
      setDeletingId(null);
      setToast('🕯 The conversation has faded into mist…');
    }, 650);
  }, [pendingDeleteId, currentSessionId]);

  const pendingSession = pendingDeleteId
    ? sessions.find((s) => s.id === pendingDeleteId)
    : null;

  const createNewSession = useCallback(() => {
    setMessages([greeting]);
    setCurrentSessionId(null);
    setInput('');
    setIsTyping(false);
  }, []);

  const loadSession = useCallback((id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(id);
      setIsTyping(false);
    }
  }, [sessions]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) {
      return;
    }

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Determine the active session id (create one for a fresh conversation)
    let activeId = currentSessionId;
    if (!activeId) {
      activeId = `session-${Date.now()}`;
      const title = trimmed.length > 28 ? trimmed.slice(0, 28) + '…' : trimmed;
      const newSession: Session = {
        id: activeId,
        title,
        timestamp: 'Just now',
        messages: updatedMessages,
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(activeId);
    } else {
      const idToUpdate = activeId;
      setSessions((prev) =>
        prev.map((s) => (s.id === idToUpdate ? { ...s, messages: updatedMessages } : s)),
      );
    }

    const sessionId = activeId;
    const response = generateOracleResponse(trimmed, messages);

    setTimeout(() => {
      const oracleMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'oracle',
      };
      const finalMessages = [...updatedMessages, oracleMsg];
      setMessages(finalMessages);
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, messages: finalMessages } : s)),
      );
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <section className="scene-section relative" id="oracle">
      {/* ===== RESTORED ANCIENT BACKGROUND ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/scene4-sanctum.jpg)' }}
      />

      {/* Dark stone overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(10, 7, 4, 0.55)' }} />

      {/* Pulsing crystal/candle glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-mist"
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            left: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(180,130,70,0.05) 0%, transparent 70%)',
            animation: 'crystalPulse 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(200,140,60,0.04) 0%, transparent 70%)',
            animation: 'crystalPulse 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Floating parchment scrolls */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`scroll-${i}`}
            className="absolute animate-float-slow"
            style={{
              left: `${10 + i * 16}%`,
              top: `${6 + (i % 3) * 13}%`,
              width: '30px',
              height: '42px',
              background: 'linear-gradient(160deg, rgba(180,150,110,0.16), rgba(140,110,80,0.07))',
              borderRadius: '2px 6px 6px 2px',
              transform: `rotate(${-6 + i * 9}deg)`,
              animationDelay: `${i * 1.6}s`,
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          />
        ))}
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-10">
        {/* Section title — carved stone */}
        <Reveal variant="up" className="text-center mb-6">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.25em] mb-3"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#c9a84c',
              textShadow: '1px 1px 0 #3d2b1f, 2px 2px 0 #1a1410, 0 0 30px rgba(201,168,76,0.15)',
            }}
          >
            THE ORACLE'S SANCTUM
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#5c3d2e] text-sm tracking-[10px] select-none">⚔ ✦ ⚔</span>
          </div>
          <p className="text-sm italic tracking-wide" style={{ fontFamily: '"IM Fell English", serif', color: '#a89070' }}>
            The pool reflects all knowledge — ask, and the Oracle shall answer…
          </p>
        </Reveal>

        {/* ===== Chat Container with Sidebar ===== */}
        <Reveal variant="up" delay={200}>
        <div
          className="rounded-lg overflow-hidden relative flex"
          style={{
            background: 'linear-gradient(180deg, #2a1f18, #1e1510, #2a1f18)',
            border: '1.5px solid rgba(201,168,76,0.3)',
            boxShadow: '0 0 60px rgba(201,168,76,0.06), 0 12px 45px rgba(0,0,0,0.55), inset 0 0 100px rgba(0,0,0,0.3)',
            height: 'min(620px, 78vh)',
            minHeight: '520px',
          }}
        >
          {/* Corner accents */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
            const styles: Record<string, React.CSSProperties> = {
              tl: { top: 3, left: 3, borderTop: '2px solid', borderLeft: '2px solid' },
              tr: { top: 3, right: 3, borderTop: '2px solid', borderRight: '2px solid' },
              bl: { bottom: 3, left: 3, borderBottom: '2px solid', borderLeft: '2px solid' },
              br: { bottom: 3, right: 3, borderBottom: '2px solid', borderRight: '2px solid' },
            };
            return (
              <div
                key={pos}
                className="absolute w-6 h-6 pointer-events-none z-20"
                style={{
                  ...styles[pos],
                  borderColor: 'rgba(201,168,76,0.35)',
                  borderRadius: pos === 'tl' ? '8px 0 0 0' : pos === 'tr' ? '0 8px 0 0' : pos === 'bl' ? '0 0 0 8px' : '0 0 8px 0',
                }}
              />
            );
          })}

          {/* ===== HISTORY SIDEBAR ===== */}
          <div
            className="flex-shrink-0 overflow-hidden transition-all duration-300 flex flex-col"
            style={{
              width: showHistory ? '200px' : '0px',
              background: '#16110c',
              borderRight: showHistory ? '1px solid rgba(201,168,76,0.2)' : 'none',
            }}
          >
            {/* Sidebar header */}
            <div
              className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}
            >
              <span
                className="text-xs tracking-[0.2em] whitespace-nowrap"
                style={{ fontFamily: 'Cinzel, serif', color: '#c9a84c' }}
              >
                📜 ARCHIVES
              </span>
            </div>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 smooth-scroll" data-lenis-prevent>
              {/* New conversation */}
              <button
                onClick={createNewSession}
                className="block w-full text-center px-2.5 py-2 rounded transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                ✦ NEW CONVERSATION
              </button>

              {sessions.length === 0 && (
                <div
                  className="text-center px-2 py-6 text-[10px] italic leading-relaxed"
                  style={{ color: '#6a5a4a', fontFamily: '"IM Fell English", serif' }}
                >
                  No conversations yet.
                  <br />
                  Speak to the Oracle.
                </div>
              )}

              {sessions.map((session) => {
                const isActive = session.id === currentSessionId;
                const isDeleting = deletingId === session.id;
                return (
                  <div
                    key={session.id}
                    className={`group relative flex items-stretch rounded overflow-hidden transition-all duration-300 ${
                      isDeleting ? 'session-fading' : ''
                    }`}
                    style={{
                      background: isActive ? '#3d2b1f' : '#221a14',
                      border: isActive
                        ? '1px solid rgba(201,168,76,0.5)'
                        : '1px solid rgba(90,65,45,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !isDeleting) {
                        e.currentTarget.style.background = '#2e231a';
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !isDeleting) {
                        e.currentTarget.style.background = '#221a14';
                        e.currentTarget.style.borderColor = 'rgba(90,65,45,0.3)';
                      }
                    }}
                  >
                    {/* Clickable session content */}
                    <button
                      type="button"
                      onClick={() => loadSession(session.id)}
                      disabled={isDeleting}
                      className="flex-1 min-w-0 text-left px-2.5 py-2 transition-all duration-300"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      <span
                        className="block font-bold truncate"
                        style={{
                          fontFamily: '"IM Fell English", serif',
                          fontSize: '12px',
                          color: isActive ? '#e8dcc8' : '#c9b8a0',
                        }}
                      >
                        {session.title}
                      </span>
                      <span
                        className="block mt-0.5"
                        style={{ fontSize: '9px', color: '#6a5a4a', fontFamily: 'Cinzel, serif' }}
                      >
                        {session.timestamp}
                      </span>
                    </button>

                    {/* Delete rune button — appears on hover */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        requestDelete(session.id);
                      }}
                      disabled={isDeleting}
                      title="Forget this conversation"
                      aria-label={`Delete conversation: ${session.title}`}
                      className="flex-shrink-0 self-center mr-2 flex items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      style={{
                        width: 22,
                        height: 22,
                        background: 'transparent',
                        border: '1px solid #5a2a1a',
                        color: '#8B2A1A',
                        fontSize: '11px',
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#8B2A1A';
                        e.currentTarget.style.borderColor = '#B84A3A';
                        e.currentTarget.style.color = '#1a1410';
                        e.currentTarget.style.boxShadow = '0 0 14px rgba(139,42,26,0.45)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = '#5a2a1a';
                        e.currentTarget.style.color = '#8B2A1A';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== MAIN CHAT AREA ===== */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            {/* Header — toggle + pool + hat */}
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{
                background: 'linear-gradient(180deg, rgba(50,38,28,0.6), rgba(201,168,76,0.03), transparent)',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              {/* Pool ripples */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(201,168,76,0.04) 4px, rgba(201,168,76,0.04) 5px)',
                }}
              />

              {/* Toggle history button */}
              <button
                onClick={() => {
                  setShowHistory(!showHistory);
                }}
                className="absolute top-3 left-3 z-10 px-2 py-1 rounded transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                  fontSize: '11px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                aria-label="Toggle history"
              >
                {showHistory ? '◀ 📜' : '📜 ▶'}
              </button>

              {/* ===== SORTING HAT LOGO (image-based) ===== */}
              <div className="flex flex-col items-center pt-5 pb-4 relative">
                <div className="relative" style={{ width: 88, height: 88 }}>
                  {/* Golden particles when thinking */}
                  {isTyping && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 12 }, (_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const tx = Math.cos(angle) * 50;
                        const ty = Math.sin(angle) * 50;
                        return (
                          <span
                            key={`p-${i}`}
                            className="absolute rounded-full"
                            style={{
                              top: '50%',
                              left: '50%',
                              width: 4,
                              height: 4,
                              background: '#e8d18c',
                              boxShadow: '0 0 10px rgba(201,168,76,0.7)',
                              ['--tx' as string]: `${tx}px`,
                              ['--ty' as string]: `${ty}px`,
                              animation: `particleFloat 2s ${i * 0.12}s ease-in-out infinite`,
                            }}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* The hat image */}
                  <img
                    src="/images/sorting-hat-logo.png"
                    alt="The Ancient Oracle's Hat"
                    className="w-full h-full object-contain relative z-10"
                    style={{
                      animation: isTyping
                        ? 'hatThink 1.2s ease-in-out infinite'
                        : 'hatIdle 3s ease-in-out infinite',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>

                <span
                  className="text-[10px] tracking-[0.3em] mt-1"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    color: isTyping ? '#c9a84c' : '#5c3d2e',
                    textShadow: isTyping ? '0 0 8px rgba(201,168,76,0.3)' : 'none',
                    transition: 'color 0.6s, text-shadow 0.6s',
                  }}
                >
                  THE ANCIENT ONE
                </span>
              </div>
            </div>

            {/* ===== MESSAGES ===== */}
            <div
              ref={messagesAreaRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4 smooth-scroll"
              data-lenis-prevent
              style={{ background: 'rgba(18, 14, 10, 0.25)', minHeight: 0, overflowX: 'hidden' }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] px-5 py-3.5 animate-fade-in-up ${
                      msg.sender === 'user' ? 'rounded-xl rounded-br-md' : 'rounded-xl rounded-bl-md'
                    }`}
                    style={{
                      background:
                        msg.sender === 'user'
                          ? 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(139,105,20,0.1))'
                          : 'linear-gradient(135deg, #2a1f18, #1e1510)',
                      border:
                        msg.sender === 'user'
                          ? '1px solid rgba(201,168,76,0.3)'
                          : '1px solid rgba(90,65,45,0.35)',
                      color: msg.sender === 'user' ? '#f0e8d8' : '#e8dcc8',
                      fontFamily: '"EB Garamond", "IM Fell English", Georgia, serif',
                      fontStyle: msg.sender === 'oracle' ? 'italic' : 'normal',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.sender === 'oracle' && (
                      <div className="text-xs mb-1.5 tracking-[0.2em]" style={{ fontFamily: 'Cinzel, serif', color: '#a08050' }}>
                        ✦ The Oracle Speaks ✦
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* ===== THINKING INDICATOR ===== */}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="px-5 py-4 rounded-xl rounded-bl-md max-w-[82%]"
                    style={{
                      background: 'linear-gradient(135deg, #2a1f18, #1e1510)',
                      border: '1px solid rgba(90,65,45,0.35)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="/images/sorting-hat-logo.png"
                        alt="thinking"
                        className="w-7 h-7 object-contain"
                        style={{ animation: 'hatThink 1.2s ease-in-out infinite', mixBlendMode: 'screen' }}
                      />
                      <span
                        className="text-xs italic tracking-wide"
                        style={{ fontFamily: 'Cinzel, serif', color: '#a08050', animation: 'textPulse 2s ease-in-out infinite' }}
                      >
                        The Oracle contemplates…
                      </span>
                    </div>
                    <div className="flex gap-2 pl-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="inline-block rounded-full"
                          style={{
                            width: 10,
                            height: 10,
                            background: '#c9a84c',
                            boxShadow: '0 0 14px rgba(201,168,76,0.35)',
                            animation: `dotBounce 1.4s ${i * 0.2}s ease-in-out infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===== INPUT AREA ===== */}
            <div
              className="px-5 py-4 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(201,168,76,0.15)', background: 'rgba(26, 20, 16, 0.3)' }}
            >
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask the Oracle a question…"
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 rounded-md text-sm outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: '#1a1410',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#e8dcc8',
                    fontFamily: '"IM Fell English", serif',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="px-6 py-3 rounded-md text-sm font-bold tracking-[0.2em] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    background: 'linear-gradient(135deg, #b8963c, #8b6914)',
                    border: '1px solid rgba(201,168,76,0.5)',
                    color: '#1a1410',
                    boxShadow: '0 0 15px rgba(201,168,76,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isTyping && input.trim()) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #d0a84e, #a07820)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.3)';
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #b8963c, #8b6914)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(201,168,76,0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  SEEK
                </button>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>

      {/* ===== DELETE CONFIRMATION — Mystical Dialog ===== */}
      {pendingSession && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 confirm-overlay"
          style={{
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={cancelDelete}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full px-8 py-7 rounded-lg text-center confirm-dialog"
            style={{
              background: 'linear-gradient(160deg, #2a1f18 0%, #1a1410 50%, #2a1f18 100%)',
              border: '2px solid #c9a84c',
              boxShadow: '0 0 60px rgba(201,168,76,0.18), 0 25px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Decorative corners */}
            {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
              const styles: Record<string, React.CSSProperties> = {
                tl: { top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid', borderTopLeftRadius: '8px' },
                tr: { top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid', borderTopRightRadius: '8px' },
                bl: { bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid', borderBottomLeftRadius: '8px' },
                br: { bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid', borderBottomRightRadius: '8px' },
              };
              return (
                <div
                  key={pos}
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{ ...styles[pos], borderColor: '#e8d18c' }}
                />
              );
            })}

            {/* Icon */}
            <div
              className="text-4xl mb-3"
              style={{
                color: '#c9a84c',
                textShadow: '0 0 18px rgba(201,168,76,0.5)',
              }}
            >
              ⚔
            </div>

            {/* Title */}
            <h3
              className="font-bold tracking-[0.2em] text-xl mb-2"
              style={{
                fontFamily: 'Cinzel, serif',
                color: '#e8d18c',
                textShadow: '1px 1px 0 #3d2b1f, 0 0 18px rgba(201,168,76,0.3)',
              }}
            >
              FORGET THIS CONVERSATION?
            </h3>

            {/* Session title preview */}
            <p
              className="text-sm mb-3 truncate px-4"
              style={{ fontFamily: 'Cinzel, serif', color: '#c9a84c', letterSpacing: '0.1em' }}
            >
              "{pendingSession.title}"
            </p>

            {/* Description */}
            <p
              className="text-sm italic mb-6 leading-relaxed"
              style={{ fontFamily: '"IM Fell English", serif', color: '#c9b8a0' }}
            >
              "Once erased, these words shall fade from the annals of time."
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
              <div className="mx-3 text-gold-primary/60 text-xs">✦</div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-md text-sm font-bold tracking-[0.2em] transition-all duration-300"
                style={{
                  fontFamily: 'Cinzel, serif',
                  background: '#8B2A1A',
                  color: '#e8dcc8',
                  border: '1px solid #B84A3A',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B84A3A';
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(184,74,58,0.5)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8B2A1A';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                🔥 BURN
              </button>

              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 rounded-md text-sm font-bold tracking-[0.2em] transition-all duration-300"
                style={{
                  fontFamily: 'Cinzel, serif',
                  background: 'transparent',
                  color: '#c9a84c',
                  border: '1px solid #c9a84c',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#c9a84c';
                  e.currentTarget.style.color = '#1a1410';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#c9a84c';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                KEEP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MYSTICAL TOAST ===== */}
      {toast && (
        <div
          className="fixed left-1/2 z-[110] toast-rise"
          style={{
            bottom: '40px',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="px-6 py-3 rounded-md flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #2a1f18, #1a1410)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#e8dcc8',
              fontFamily: '"IM Fell English", serif',
              fontStyle: 'italic',
              fontSize: '14px',
              boxShadow: '0 0 30px rgba(201,168,76,0.15), 0 10px 25px rgba(0,0,0,0.5)',
              letterSpacing: '0.05em',
            }}
          >
            {toast}
          </div>
        </div>
      )}

      {/* Keyframes for hat animations, particles, dots, fade-to-mist */}
      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-14px); opacity: 1; }
        }
        @keyframes hatIdle {
          0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 12px rgba(201,168,76,0.2)); }
          50% { transform: scale(1.02) rotate(0deg); filter: drop-shadow(0 0 24px rgba(201,168,76,0.35)); }
        }
        @keyframes hatThink {
          0% { transform: rotate(-3deg) scale(1); filter: drop-shadow(0 0 20px rgba(201,168,76,0.35)) brightness(1.05); }
          25% { transform: rotate(2deg) scale(1.04); filter: drop-shadow(0 0 38px rgba(201,168,76,0.55)) brightness(1.15); }
          50% { transform: rotate(-4deg) scale(0.97); filter: drop-shadow(0 0 50px rgba(201,168,76,0.65)) brightness(1.2); }
          75% { transform: rotate(3deg) scale(1.03); filter: drop-shadow(0 0 34px rgba(201,168,76,0.45)) brightness(1.1); }
          100% { transform: rotate(-3deg) scale(1); filter: drop-shadow(0 0 20px rgba(201,168,76,0.35)) brightness(1.05); }
        }
        @keyframes particleFloat {
          0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 1; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.2); }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes crystalPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fadeToMist {
          0% {
            opacity: 1;
            transform: scale(1) translateX(0);
            max-height: 80px;
            filter: blur(0);
          }
          40% {
            opacity: 0.6;
            transform: scale(0.98) translateX(-8px);
            filter: blur(1px) brightness(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0.85) translateX(-30px);
            max-height: 0;
            margin: 0;
            padding: 0;
            border-width: 0;
            filter: blur(3px);
          }
        }
        .session-fading {
          animation: fadeToMist 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
          overflow: hidden;
        }
        @keyframes confirmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confirmRise {
          from { opacity: 0; transform: scale(0.92) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .confirm-overlay {
          animation: confirmFadeIn 0.3s ease forwards;
        }
        .confirm-dialog {
          animation: confirmRise 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes toastRise {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          15%, 85% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
        .toast-rise {
          animation: toastRise 2.8s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OracleSection;
