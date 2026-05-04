import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { BottomNav } from "@/components/BottomNav";
import { useEveStore } from "@/hooks/useEveStore";
import { useSound } from "@/hooks/useSounds";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { Moon, Sun, Settings } from "lucide-react";

import HomePage from "@/pages/HomePage";
import PlanPage from "@/pages/PlanPage";
import TrackPage from "@/pages/TrackPage";
import GrowPage from "@/pages/GrowPage";
import ShopPage from "@/pages/ShopPage";
import SocialPage from "@/pages/SocialPage";
import SipsPage from "@/pages/SipsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SettingsPage from "@/pages/SettingsPage";

function GlobalHeaderButtons({ setShowSettings }: { setShowSettings: (v: boolean) => void }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 ml-auto">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
        className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
      >
        {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>
      <button
        onClick={() => setShowSettings(true)}
        aria-label="Settings"
        className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
      >
        <Settings className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function BrandStrip({ setShowSettings }: { setShowSettings: (v: boolean) => void }) {
  const { theme } = useTheme();
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center gap-4 select-none"
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: theme === 'dark'
          ? '1px solid rgba(201,168,76,0.18)'
          : '1px solid rgba(196,133,106,0.18)',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, rgba(17,17,17,0.98), rgba(17,17,17,0.96))'
          : 'linear-gradient(180deg, rgba(249,247,244,0.98), rgba(249,247,244,0.96))',
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'none',
          color: '#c4856a',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          textShadow: '0 1px 6px rgba(196,133,106,0.16)',
        }}
      >
        <span>e</span>
        <svg width="22" height="36" viewBox="0 -6 28 46" fill="none" style={{ marginBottom: 3, flexShrink: 0 }}>
          <path d="M3 5 L14 36" stroke="#c4856a" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M25 5 L14 36" stroke="#c4856a" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M25 5 C30 -1 27 -6 22 -4 C19 -2 21 3 25 5Z" fill="#c4856a" />
          <path d="M25 5 C25.5 1.5 23.5 -1.5 22 -4" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" strokeLinecap="round"/>
        </svg>
        <span>e</span>
      </span>
      <span style={{ width: 1, height: 26, background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.45), transparent)', display: 'inline-block', flexShrink: 0 }} />
      <div className="flex items-center gap-[6px]">
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#c4856a', lineHeight: 1 }}>Plants.</span>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: '#8d6d59', lineHeight: 1 }}>Based.</span>
      </div>
      <GlobalHeaderButtons setShowSettings={setShowSettings} />
    </div>
  );
}

const queryClient = new QueryClient();

const COLOR_THEME_VARS: Record<string, string> = {
  cream: '40 33% 97%',
  midnight: '0 0% 8%',
  rose: '350 30% 57%',
  terracotta: '18 50% 60%',
  earth: '30 28% 52%',
  sand: '40 20% 92%',
};

function AppInner({ activeTab, setActiveTab, showSettings, setShowSettings }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;
}) {
  const { unlockedBadges, xp, onboarded } = useEveStore();
  const { play } = useSound();
  const prevBadgeCount = useRef(unlockedBadges.length);
  const prevXp = useRef(xp);

  // Play badge sound when a new badge is unlocked
  useEffect(() => {
    if (unlockedBadges.length > prevBadgeCount.current) {
      play('badge');
    }
    prevBadgeCount.current = unlockedBadges.length;
  }, [unlockedBadges.length, play]);

  // Play levelup sound when XP crosses a level threshold (every 500 XP)
  useEffect(() => {
    const prevLevel = Math.floor(prevXp.current / 500);
    const currLevel = Math.floor(xp / 500);
    if (currLevel > prevLevel && prevXp.current > 0) {
      play('levelup');
    }
    prevXp.current = xp;
  }, [xp, play]);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':      return <HomePage setActiveTab={setActiveTab} onOpenSettings={() => setShowSettings(true)} />;
      case 'plan':      return <PlanPage />;
      case 'track':     return <TrackPage />;
      case 'sips':      return <SipsPage />;
      case 'grow':      return <GrowPage />;
      case 'shop':      return <ShopPage />;
      case 'social':    return <SocialPage />;
      case 'resources': return <ResourcesPage />;
      default:          return <HomePage setActiveTab={setActiveTab} onOpenSettings={() => setShowSettings(true)} />;
    }
  };

  return (
    <>
      {!onboarded && <OnboardingModal />}
      {renderPage()}
      <ConfettiEffect />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {showSettings && (
        <SettingsPage onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('eve_color_theme');
    if (saved && COLOR_THEME_VARS[saved]) {
      const v = COLOR_THEME_VARS[saved];
      document.documentElement.style.setProperty('--primary', v);
      document.documentElement.style.setProperty('--accent', v);
      document.documentElement.style.setProperty('--ring', v);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="eve_theme">
        <TooltipProvider>
          <div className="min-h-screen bg-black/40 text-foreground flex justify-center font-sans antialiased overflow-x-hidden">

            {/* App shell — ghostly gold outer glow only */}
            <div
              className="w-full max-w-[480px] min-h-screen bg-background relative flex flex-col"
              style={{
                boxShadow: '0 0 60px rgba(201,168,76,0.07), 0 0 120px rgba(201,168,76,0.04)',
              }}
            >
              {/* E.V.E. Brand Strip */}
              <BrandStrip setShowSettings={setShowSettings} />

              <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16">
                <AppInner
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  showSettings={showSettings}
                  setShowSettings={setShowSettings}
                />
              </main>
            </div>
          </div>

          <Toaster position="top-center" richColors />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
