import { useCallback } from 'react';

export type SoundType = 'xp' | 'badge' | 'meal' | 'workout' | 'autoplan' | 'water' | 'levelup';

function playTone(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainVal = 0.22,
) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0, ctx.currentTime + start);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + duration + 0.06);
  } catch { /* ignore */ }
}

type SoundDef = (ctx: AudioContext) => void;

const SOUNDS: Record<SoundType, SoundDef> = {
  // Quick bright ascending ding — small XP gain
  xp: (ctx) => {
    playTone(ctx, 880,  0,    0.12, 'sine', 0.20);
    playTone(ctx, 1047, 0.08, 0.20, 'sine', 0.15);
  },

  // Triumphant 4-note ascending fanfare — badge unlocked
  badge: (ctx) => {
    ([523, 659, 784, 1047] as const).forEach((f, i) =>
      playTone(ctx, f, i * 0.14, 0.38, 'sine', 0.22));
  },

  // Warm friendly double-pop — meal logged
  meal: (ctx) => {
    playTone(ctx, 550, 0,    0.07, 'sine', 0.18);
    playTone(ctx, 750, 0.06, 0.15, 'sine', 0.12);
  },

  // Bass punch + bright ring — workout logged
  workout: (ctx) => {
    playTone(ctx, 180, 0,    0.06, 'triangle', 0.35);
    playTone(ctx, 880, 0.05, 0.22, 'sine',     0.22);
    playTone(ctx, 1100, 0.17, 0.18, 'sine',   0.14);
  },

  // 4-note magical shimmer — auto-plan generated
  autoplan: (ctx) => {
    ([523, 784, 1047, 1319] as const).forEach((f, i) =>
      playTone(ctx, f, i * 0.13, 0.40, 'sine', 0.18));
  },

  // Bubbly water trickle — water logged
  water: (ctx) => {
    [0, 0.07, 0.14, 0.21, 0.28].forEach((t, i) => {
      const f = 360 + i * 55 + (i % 2 === 0 ? 0 : 70);
      playTone(ctx, f, t, 0.10, 'sine', 0.10);
    });
  },

  // Full ascending run + held note — level up!
  levelup: (ctx) => {
    ([523, 659, 784, 1047, 1319] as const).forEach((f, i) =>
      playTone(ctx, f, i * 0.1, 0.40, 'sine', 0.20));
    playTone(ctx, 1047, 0.58, 0.60, 'sine', 0.26);
  },
};

export function useSound() {
  const play = useCallback((sound: SoundType) => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx() as AudioContext;
      SOUNDS[sound]?.(ctx);
      setTimeout(() => { try { ctx.close(); } catch {} }, 2500);
    } catch {
      // Audio not supported — fail silently, it's not critical
    }
  }, []);

  return { play };
}
