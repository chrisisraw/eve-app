import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ChevronRight, Sparkles } from "lucide-react";
import { useEveStore, FITNESS_PROFILES } from "@/hooks/useEveStore";
import { useSound } from "@/hooks/useSounds";

const AVATAR_OPTIONS = ['🌱', '🌿', '🍃', '🌺', '🌸', '🦋', '☀️', '🌊', '🍀', '✨'];

const PROFILE_ORDER = [
  'maintenance', 'weightloss', 'muscle', 'bodybuilder',
  'cyclist', 'yogi', 'endurance', 'athlete',
];

export function OnboardingModal() {
  const { updateProfile, setFitnessProfile, addXp, awardBadge, setState } = useEveStore();
  const { play } = useSound();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🌱');
  const [selectedProfile, setSelectedProfile] = useState('');

  const handleComplete = () => {
    updateProfile({ name: name.trim() || 'Plant Hero', emoji: avatar });
    if (selectedProfile) setFitnessProfile(selectedProfile);
    addXp(100);
    awardBadge('first_seed');
    play('autoplan');
    setState(s => ({ ...s, onboarded: true }));
  };

  const canAdvanceStep1 = name.trim().length >= 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ background: 'rgba(10,6,2,0.92)', backdropFilter: 'blur(12px)' }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260, delay: 0.1 }}
        className="w-full max-w-[480px] rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(160deg, #1c100a 0%, #251508 60%, #1a0e06 100%)',
          border: '1px solid rgba(201,168,76,0.28)',
          borderBottom: 'none',
          maxHeight: '92vh',
        }}
      >
        {/* Gold line at top */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #e8c87a 60%, #C9A84C 80%, transparent)', flexShrink: 0 }} />

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 pt-5 pb-1 shrink-0">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ width: step === i ? 24 : 6, opacity: step >= i ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
              style={{ height: 4, borderRadius: 999, background: '#C9A84C' }}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
          <AnimatePresence mode="wait">

            {/* ── Step 0: Welcome + name ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.22 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2 pt-2">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                    style={{ background: 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))' }}>
                    <Leaf className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h1 className="text-3xl font-serif text-white leading-tight">
                    Welcome to <span style={{ color: '#C9A84C' }}>E.V.E.</span>
                  </h1>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Everything Vegan Ever — your ultra-premium plant-based companion. Let's set up your profile.
                  </p>
                </div>

                {/* Name input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C9A84C]/70">
                    Your first name
                  </label>
                  <input
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && canAdvanceStep1 && setStep(1)}
                    placeholder="e.g. Jordan"
                    maxLength={32}
                    className="w-full rounded-xl px-4 py-3 text-base text-white font-medium outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: name.trim() ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.12)',
                    }}
                  />
                </div>

                {/* Avatar picker */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C9A84C]/70">
                    Choose your avatar
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_OPTIONS.map(em => (
                      <button
                        key={em}
                        onClick={() => setAvatar(em)}
                        className="w-11 h-11 rounded-xl text-2xl flex items-center justify-center transition-all"
                        style={{
                          background: avatar === em ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)',
                          border: avatar === em ? '1.5px solid rgba(201,168,76,0.7)' : '1px solid rgba(255,255,255,0.1)',
                          transform: avatar === em ? 'scale(1.12)' : 'scale(1)',
                        }}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  disabled={!canAdvanceStep1}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    background: canAdvanceStep1
                      ? 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))'
                      : 'rgba(255,255,255,0.08)',
                    color: canAdvanceStep1 ? 'white' : 'rgba(255,255,255,0.3)',
                    border: canAdvanceStep1 ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── Step 1: Fitness profile ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.22 }}
                className="space-y-5"
              >
                <div className="text-center space-y-1.5 pt-2">
                  <h2 className="text-2xl font-serif text-white">
                    Your goal, {name.trim() || 'friend'}
                  </h2>
                  <p className="text-sm text-white/50">
                    E.V.E. will personalise your meals and workout plan around this.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {PROFILE_ORDER.map(id => {
                    const fp = FITNESS_PROFILES[id];
                    const isSelected = selectedProfile === id;
                    const [icon, ...nameParts] = fp.name.split(' ');
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedProfile(isSelected ? '' : id)}
                        className="relative text-left p-3.5 rounded-2xl transition-all"
                        style={{
                          background: isSelected ? 'rgba(201,168,76,0.18)' : 'rgba(255,255,255,0.05)',
                          border: isSelected ? '1.5px solid rgba(201,168,76,0.65)' : '1px solid rgba(255,255,255,0.09)',
                        }}
                      >
                        <div className="text-2xl mb-1.5">{icon}</div>
                        <div className="text-[13px] font-bold text-white leading-tight">{nameParts.join(' ')}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-snug">{fp.cal} kcal · {fp.protein}g pro</div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: '#C9A84C' }}>
                            <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
                              <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    background: selectedProfile
                      ? 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))'
                      : 'rgba(255,255,255,0.08)',
                    color: selectedProfile ? 'white' : 'rgba(255,255,255,0.5)',
                    border: selectedProfile ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {selectedProfile ? 'Continue' : 'Skip for now'} <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Done ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))' }}
                >
                  {avatar}
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">
                    You're all set, {name.trim() || 'friend'}!
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed">
                    E.V.E. is ready to personalise your plant-based journey.
                    {selectedProfile && ` Your ${FITNESS_PROFILES[selectedProfile].name.split(' ').slice(1).join(' ')} plan is queued up.`}
                  </p>
                </div>

                <div className="space-y-2 text-left">
                  {[
                    { icon: '🥗', text: 'Tap Auto-Plan to generate your personalised weekly meal + workout plan' },
                    { icon: '📊', text: 'Use the Track tab to log meals and earn XP' },
                    { icon: '🏆', text: 'Unlock 21 badges as you build healthy habits' },
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="text-xl">{tip.icon}</span>
                      <span className="text-[12px] text-white/70 leading-snug">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-[#C9A84C]/60 font-bold uppercase tracking-widest">Bonus</p>
                  <p className="text-[11px] text-white/40">+100 XP awarded for completing setup</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleComplete}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base"
                  style={{
                    background: 'linear-gradient(145deg, hsl(15 46% 68%), hsl(10 48% 54%))',
                    border: '1px solid rgba(201,168,76,0.4)',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
                    color: 'white',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Start My Journey
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
