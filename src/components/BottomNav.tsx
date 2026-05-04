import { Home, CalendarDays, Activity, Leaf, ShoppingCart, Star, GlassWater, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItemProps {
  icon: typeof Home;
  label: string;
  active: boolean;
  onClick: () => void;
  'data-testid': string;
}

function NavItem({ icon: Icon, label, active, onClick, 'data-testid': testId }: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      data-testid={testId}
      whileTap={{ scale: 0.88, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        width: 50,
        height: 44,
        borderRadius: 10,
        outline: 'none',
        flexShrink: 0,

        background: active
          ? 'linear-gradient(170deg, #1a1208 0%, #0d0b06 100%)'
          : 'linear-gradient(160deg, #F0D882 0%, #D4A835 30%, #A87820 65%, #C9A84C 100%)',

        border: active
          ? '1px solid rgba(201,168,76,0.40)'
          : '1px solid rgba(250,228,120,0.55)',

        boxShadow: active
          ? [
              'inset 0 1px 0 rgba(255,255,255,0.05)',
              'inset 0 -1px 0 rgba(0,0,0,0.50)',
              '0 0 10px rgba(0,0,0,0.40)',
            ].join(', ')
          : [
              'inset 0 1.5px 2px rgba(255,255,255,0.42)',
              'inset 0 -1.5px 2px rgba(0,0,0,0.30)',
              '0 2px 6px rgba(0,0,0,0.22)',
            ].join(', '),
      }}
    >
      {/* Top bevel highlight */}
      <span
        className="absolute pointer-events-none"
        style={{
          top: 1,
          left: 4,
          right: 4,
          height: 1,
          borderRadius: 99,
          background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.52)',
        }}
      />

      {/* Engraved inner frame */}
      <span
        className="absolute inset-[3px] pointer-events-none rounded-[7px]"
        style={{
          border: active ? '1px solid rgba(201,168,76,0.18)' : '1px solid rgba(255,255,255,0.20)',
          boxShadow: active ? 'inset 0 1px 2px rgba(0,0,0,0.5)' : 'none',
        }}
      />

      <Icon
        style={{
          width: 15,
          height: 15,
          color: active ? '#C9A84C' : '#2a1e04',
          strokeWidth: active ? 1.8 : 2.2,
          position: 'relative',
          zIndex: 1,
          filter: active ? 'drop-shadow(0 0 4px rgba(201,168,76,0.6))' : 'none',
        }}
      />

      <span
        style={{
          fontSize: 7,
          fontWeight: 800,
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
          marginTop: 3,
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          color: active ? 'rgba(201,168,76,0.88)' : '#2a1e04',
          textShadow: active ? '0 0 6px rgba(201,168,76,0.5)' : 'none',
        }}
      >
        {label}
      </span>

      {active && (
        <span
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 2,
            borderRadius: '0 0 9px 9px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
          }}
        />
      )}
    </motion.button>
  );
}

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'home',      icon: Home,         label: 'Home' },
    { id: 'plan',      icon: CalendarDays, label: 'Plan' },
    { id: 'track',     icon: Activity,     label: 'Track' },
    { id: 'sips',      icon: GlassWater,   label: 'Sip' },
    { id: 'grow',      icon: Leaf,         label: 'Grow' },
    { id: 'shop',      icon: ShoppingCart, label: 'Shop' },
    { id: 'social',    icon: Star,         label: 'Connect' },
    { id: 'resources', icon: BookOpen,     label: 'Info' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto"
      style={{
        height: 66,
        background: 'linear-gradient(180deg, hsl(12 42% 58%) 0%, hsl(12 42% 50%) 100%)',
        borderTop: '1px solid rgba(201,168,76,0.30)',
      }}
    >
      {/* Gold shimmer top edge */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 2,
          background:
            'linear-gradient(90deg, transparent 0%, #6b500e 4%, #9B7A2A 12%, #C9A84C 28%, #F5E19A 44%, #FBEDB0 50%, #F5E19A 56%, #C9A84C 72%, #9B7A2A 88%, #6b500e 96%, transparent 100%)',
        }}
      />
      {/* Soft glow bloom */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 20,
          background: 'linear-gradient(180deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.04) 60%, transparent 100%)',
        }}
      />

      {/* Tab row — flex justify-around so all 8 fit with no scroll */}
      <div className="flex justify-around items-center h-full px-2">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-testid={`nav-item-${tab.id}`}
          />
        ))}
      </div>
    </div>
  );
}
