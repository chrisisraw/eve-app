import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/hooks/useSounds';

const COLORS = ['#C9A84C', '#F5E19A', '#E97B3C', '#5CB85C', '#5BC0DE', '#FF6B9D', '#A78BFA', '#34D399'];

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  hDrift: number;
  shape: 0 | 1 | 2;
  spin: number;
}

function createBurst(count = 65): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 5 + Math.random() * 10,
    duration: 1.3 + Math.random() * 1.6,
    delay: Math.random() * 0.55,
    hDrift: (Math.random() - 0.5) * 180,
    shape: Math.floor(Math.random() * 3) as 0 | 1 | 2,
    spin: Math.random() * 720 - 360,
  }));
}

export function ConfettiEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [runKey, setRunKey] = useState(0);
  const { play } = useSound();

  const fire = useCallback((isBadge = false) => {
    setParticles(createBurst(isBadge ? 90 : 65));
    setRunKey(k => k + 1);
    setTimeout(() => setParticles([]), 4000);
  }, []);

  useEffect(() => {
    const onXp = () => {
      fire(false);
      // Resume AudioContext on user-gesture-free events via a brief silence hack
      try {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx() as AudioContext;
          if (ctx.state === 'suspended') ctx.resume();
          play('xp');
        }
      } catch {}
    };
    const onBadge = () => {
      fire(true);
      try { play('badge'); } catch {}
    };
    window.addEventListener('eve:xp', onXp);
    window.addEventListener('eve:badge', onBadge);
    return () => {
      window.removeEventListener('eve:xp', onXp);
      window.removeEventListener('eve:badge', onBadge);
    };
  }, [fire, play]);

  if (!particles.length) return null;

  return (
    <div
      key={runKey}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {particles.map(p => {
        const borderRadius =
          p.shape === 0 ? '50%' :
          p.shape === 1 ? '2px' :
          '1px';
        const w = p.shape === 1 ? p.size * 1.8 : p.size;
        const h = p.shape === 1 ? p.size * 0.55 : p.size;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: -18,
              width: w,
              height: h,
              backgroundColor: p.color,
              borderRadius,
              transform: p.shape === 2 ? 'rotate(45deg)' : undefined,
              animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s both`,
              '--h-drift': `${p.hDrift}px`,
              '--spin': `${p.spin}deg`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
