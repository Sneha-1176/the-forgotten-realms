import { useState, useCallback, useEffect, useRef } from 'react';
import { regionsData, type Region } from '../data/regions';

export function useMapState() {
  const [clearedRegions, setClearedRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [allCleared, setAllCleared] = useState(false);
  const [popRegion, setPopRegion] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  // Lamps are session-only and reset on every page load, so every fresh visit
  // shows all guide lamps again. (Not persisted in localStorage.)
  const [hiddenLamps, setHiddenLamps] = useState<string[]>([]);
  const [fadingLamp, setFadingLamp] = useState<string | null>(null);
  const popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lampFadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const celebrationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Remove any persisted lamp data from earlier versions so lamps never stay
  // hidden across sessions.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem('clearedLamps');
      window.localStorage.removeItem('clearedLampClicksV1');
      window.localStorage.removeItem('clearedLampsClickOnly');
      window.localStorage.removeItem('clearedLampsClickOnlyV2');
      window.localStorage.removeItem('clearedLampsVersion');
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const totalRegions = regionsData.length;

  const handleRegionClick = useCallback(
    (regionId: string) => {
      // Lamps hide only when their kingdom is clicked — session-only, not stored.
      setHiddenLamps((prev) => {
        if (prev.includes(regionId)) return prev;
        return [...prev, regionId];
      });
      setFadingLamp(regionId);
      if (lampFadeTimeout.current) clearTimeout(lampFadeTimeout.current);
      lampFadeTimeout.current = setTimeout(() => setFadingLamp(null), 900);

      if (!clearedRegions.includes(regionId)) {
        const updated = [...clearedRegions, regionId];
        setClearedRegions(updated);
        setPopRegion(regionId);

        const region = regionsData.find((r) => r.id === regionId);
        if (region) {
          // Slight delay so pop animation plays first
          setTimeout(() => setSelectedRegion(region), 250);
        }

        // Clear pop animation
        if (popTimeout.current) clearTimeout(popTimeout.current);
        popTimeout.current = setTimeout(() => setPopRegion(null), 1200);

        // Check if all cleared
        if (updated.length === totalRegions) {
          setTimeout(() => {
            setAllCleared(true);
            setShowCelebration(true);
            if (celebrationTimeout.current) clearTimeout(celebrationTimeout.current);
            celebrationTimeout.current = setTimeout(() => setShowCelebration(false), 3500);
          }, 600);
        }
      }
    },
    [clearedRegions, totalRegions],
  );

  const closeModal = useCallback(() => {
    setSelectedRegion(null);
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (popTimeout.current) clearTimeout(popTimeout.current);
      if (lampFadeTimeout.current) clearTimeout(lampFadeTimeout.current);
      if (celebrationTimeout.current) clearTimeout(celebrationTimeout.current);
    };
  }, []);

  return {
    clearedRegions,
    selectedRegion,
    allCleared,
    popRegion,
    showCelebration,
    hiddenLamps,
    fadingLamp,
    handleRegionClick,
    closeModal,
  };
}
