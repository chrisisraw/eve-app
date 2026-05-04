import { useState } from "react";
import { useEveStore } from "@/hooks/useEveStore";
import { FITNESS_PROFILES } from "@/hooks/useEveStore";
import { useTheme } from "@/components/ThemeProvider";
import { X, User, Palette, Utensils, Leaf, Activity, ShieldAlert, Plus } from "lucide-react";
import { toast } from "sonner";

interface SettingsPageProps {
  onClose: () => void;
}

const TAB_OPTIONS = [
  { value: 'home',      label: '🏠 Home' },
  { value: 'plan',      label: '📅 Plan' },
  { value: 'track',     label: '📊 Track' },
  { value: 'sips',      label: '🥤 Sips' },
  { value: 'grow',      label: '🌿 Grow' },
  { value: 'shop',      label: '🛒 Shop' },
  { value: 'social',    label: '⭐ Social' },
  { value: 'resources', label: '📖 Info' },
];

const MEASUREMENT_OPTIONS = [
  { value: 'imperial', label: 'Imperial (oz/lb)' },
  { value: 'metric',   label: 'Metric (g/kg)' },
];

const COLOR_THEMES = [
  { value: 'terracotta', label: 'Terracotta', color: 'hsl(18 50% 60%)',  primary: '18 50% 60%' },
  { value: 'rose',       label: 'Rose Gold',  color: 'hsl(350 30% 57%)', primary: '350 30% 57%' },
  { value: 'sage',       label: 'Sage Green', color: 'hsl(145 30% 50%)', primary: '145 30% 50%' },
  { value: 'lavender',   label: 'Lavender',   color: 'hsl(270 40% 60%)', primary: '270 40% 60%' },
  { value: 'ocean',      label: 'Ocean Blue', color: 'hsl(210 60% 55%)', primary: '210 60% 55%' },
];

function applyColorTheme(primary: string) {
  document.documentElement.style.setProperty('--primary', primary);
  document.documentElement.style.setProperty('--accent', primary);
  document.documentElement.style.setProperty('--ring', primary);
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const { setState, settings, trackerGoals, updateTrackerGoals, profile, updateProfile, setFitnessProfile, setAllergies } = useEveStore();
  const { theme, setTheme } = useTheme();

  const [selectedColorTheme, setSelectedColorTheme] = useState(
    () => localStorage.getItem('eve_color_theme') || 'terracotta'
  );

  const [firstName, setFirstName] = useState(() => {
    const parts = profile.name.split(' ');
    return parts[0] || '';
  });
  const [lastName, setLastName] = useState(() => {
    const parts = profile.name.split(' ');
    return parts.slice(1).join(' ') || '';
  });
  const [email, setEmail] = useState((profile as any).email || '');
  const [birthday, setBirthday] = useState((profile as any).birthday || '');
  const [location, setLocation] = useState((profile as any).location || '');
  const [zip, setZip] = useState((profile as any).zip || '');
  const [measurementUnit, setMeasurementUnit] = useState((settings as any).measurementUnit || 'imperial');
  const [defaultTab, setDefaultTab] = useState((settings as any).defaultTab || 'home');
  const [calGoal, setCalGoal] = useState(String(trackerGoals.cal));
  const [proteinGoal, setProteinGoal] = useState(String(trackerGoals.protein));
  const [carbsGoal, setCarbsGoal] = useState(String(trackerGoals.carbs));
  const [fatGoal, setFatGoal] = useState(String(trackerGoals.fat));
  const [fiberGoal, setFiberGoal] = useState(String(trackerGoals.fiber));
  const [servings, setServings] = useState(String((settings as any).defaultServings || 2));
  const [waterGoal, setWaterGoal] = useState(String(trackerGoals.water));
  const [growingZone, setGrowingZone] = useState((settings as any).growingZone || '');
  const [lastFrostDate, setLastFrostDate] = useState((settings as any).lastFrostDate || '');
  const [allergyInput, setAllergyInput] = useState('');
  const currentAllergies: string[] = profile.allergies || [];

  const handleSave = () => {
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ') || profile.name;
    updateProfile({
      name: fullName,
      ...(({ email, birthday, location, zip } as any)),
    });
    updateTrackerGoals({
      cal: Number(calGoal) || trackerGoals.cal,
      protein: Number(proteinGoal) || trackerGoals.protein,
      carbs: Number(carbsGoal) || trackerGoals.carbs,
      fat: Number(fatGoal) || trackerGoals.fat,
      fiber: Number(fiberGoal) || trackerGoals.fiber,
      water: Number(waterGoal) || trackerGoals.water,
    });
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: fullName,
        email,
        birthday,
        location,
        zip,
      } as any,
      settings: {
        ...prev.settings,
        measurementUnit,
        defaultTab,
        defaultServings: Number(servings) || 2,
        growingZone,
        lastFrostDate,
      } as any,
    }));
    toast.success('✓ Settings saved!');
    onClose();
  };

  const labelClass = "text-[9px] uppercase font-bold text-muted-foreground tracking-widest block mb-1";
  const inputClass = "w-full bg-muted/20 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors";
  const sectionClass = "space-y-3";
  const sectionHeaderClass = "flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest pt-2 pb-1 border-b border-border/50";

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="w-full max-w-[480px] bg-background flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <h1 className="text-2xl font-serif text-foreground flex items-center gap-2">
            ⚙️ Settings
          </h1>
          <button onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground/70 py-2 border-b border-border/30 flex-shrink-0">
          Works offline &nbsp;|&nbsp; Full screen &nbsp;|&nbsp; Home screen icon
        </p>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-28">

          {/* Personal Info */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <User className="w-3.5 h-3.5" /> Personal Info
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Birthday</label>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>ZIP / Postal Code <span className="normal-case text-primary">(used for Find Vegans distance)</span></label>
              <input value={zip} onChange={e => setZip(e.target.value)} placeholder="e.g. 32086" className={inputClass} />
            </div>
          </section>

          {/* Display & Theme */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <Palette className="w-3.5 h-3.5" /> Display & Theme
            </div>

            {/* Dark mode toggle */}
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-semibold text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Easy on the eyes at night</p>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>

            {/* Color theme */}
            <div>
              <label className={labelClass}>Color Theme</label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_THEMES.map(t => {
                  const isSelected = selectedColorTheme === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => {
                        setSelectedColorTheme(t.value);
                        localStorage.setItem('eve_color_theme', t.value);
                        applyColorTheme(t.primary);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                      style={{
                        borderColor: t.color,
                        color: isSelected ? '#fff' : t.color,
                        background: isSelected ? t.color : `${t.color}18`,
                        boxShadow: isSelected ? `0 0 0 2px ${t.color}60` : 'none',
                        fontWeight: isSelected ? 700 : 500,
                      }}
                    >
                      <span className="w-3 h-3 rounded-full inline-block shrink-0"
                        style={{ background: isSelected ? 'rgba(255,255,255,0.6)' : t.color }} />
                      {t.label}
                      {isSelected && ' ✓'}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Tap to apply instantly · saved automatically</p>
            </div>

            {/* Measurement unit */}
            <div>
              <label className={labelClass}>Weight & Measurement System</label>
              <select value={measurementUnit} onChange={e => setMeasurementUnit(e.target.value)} className={inputClass}>
                {MEASUREMENT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Default tab */}
            <div>
              <label className={labelClass}>Default Tab</label>
              <p className="text-[10px] text-muted-foreground/70 mb-1">Opens to this section on launch</p>
              <select value={defaultTab} onChange={e => setDefaultTab(e.target.value)} className={inputClass}>
                {TAB_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </section>

          {/* Daily Nutrition Goals */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <Activity className="w-3.5 h-3.5" /> Daily Nutrition Goals
            </div>

            {/* Fitness profile quick-set */}
            <div>
              <label className={labelClass}>Quick-Set from Fitness Profile</label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(FITNESS_PROFILES).map(([id, fp]) => (
                  <button key={id}
                    onClick={() => {
                      setFitnessProfile(id);
                      setCalGoal(String(fp.cal));
                      setProteinGoal(String(fp.protein));
                      setCarbsGoal(String(fp.carbs));
                      setFatGoal(String(fp.fat));
                    }}
                    className="px-2.5 py-1 rounded-full bg-muted/50 border border-border text-[10px] font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors">
                    {fp.name}
                  </button>
                ))}
              </div>
            </div>

            {[
              { label: 'Calories', unit: 'kcal', desc: 'Total daily energy target', val: calGoal, set: setCalGoal },
              { label: 'Protein', unit: 'g', desc: 'Essential for muscle & recovery', val: proteinGoal, set: setProteinGoal },
              { label: 'Carbs', unit: 'g', desc: 'Your primary energy source', val: carbsGoal, set: setCarbsGoal },
              { label: 'Fat', unit: 'g', desc: 'Healthy fats goal', val: fatGoal, set: setFatGoal },
              { label: 'Fiber', unit: 'g', desc: 'Gut health & satiety', val: fiberGoal, set: setFiberGoal },
            ].map(({ label, unit, desc, val, set }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {label} <span className="text-muted-foreground font-normal text-xs">({unit})</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <input
                  type="number"
                  value={val}
                  onChange={e => set(e.target.value)}
                  className="w-24 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground text-right outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
          </section>

          {/* Allergies & Intolerances */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <ShieldAlert className="w-3.5 h-3.5" /> Allergies & Intolerances
            </div>
            <p className="text-[10px] text-muted-foreground/70">
              Meals containing these ingredients will be filtered out of your pantry matches and auto-plan suggestions.
            </p>
            <div className="flex gap-2">
              <input
                value={allergyInput}
                onChange={e => setAllergyInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const trimmed = allergyInput.trim().toLowerCase();
                    if (trimmed && !currentAllergies.includes(trimmed)) {
                      setAllergies([...currentAllergies, trimmed]);
                    }
                    setAllergyInput('');
                  }
                }}
                placeholder="e.g. peanuts, soy, gluten…"
                className={`${inputClass} flex-1`}
              />
              <button
                onClick={() => {
                  const trimmed = allergyInput.trim().toLowerCase();
                  if (trimmed && !currentAllergies.includes(trimmed)) {
                    setAllergies([...currentAllergies, trimmed]);
                  }
                  setAllergyInput('');
                }}
                className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {currentAllergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentAllergies.map(a => (
                  <span key={a}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-xs font-medium text-destructive">
                    {a}
                    <button
                      onClick={() => setAllergies(currentAllergies.filter(x => x !== a))}
                      className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {currentAllergies.length === 0 && (
              <p className="text-[11px] text-muted-foreground/50 italic">No allergies added yet.</p>
            )}
          </section>

          {/* Cooking Preferences */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <Utensils className="w-3.5 h-3.5" /> Cooking Preferences
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Cooking for</p>
                <p className="text-xs text-muted-foreground">Default number of servings</p>
              </div>
              <input type="number" min="1" max="20" value={servings} onChange={e => setServings(e.target.value)}
                className="w-24 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground text-right outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Water Goal</p>
                <p className="text-xs text-muted-foreground">Daily glasses of water</p>
              </div>
              <input type="number" min="1" max="20" value={waterGoal} onChange={e => setWaterGoal(e.target.value)}
                className="w-24 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground text-right outline-none focus:border-primary transition-colors" />
            </div>
          </section>

          {/* Garden */}
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <Leaf className="w-3.5 h-3.5" /> Garden
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Growing Zone</p>
                <p className="text-xs text-muted-foreground">USDA hardiness zone (e.g. 9b)</p>
              </div>
              <input value={growingZone} onChange={e => setGrowingZone(e.target.value)} placeholder="e.g. 9b"
                className="w-24 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground text-right outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Last Frost Date</p>
                <p className="text-xs text-muted-foreground">Approximate last frost in spring</p>
              </div>
              <input type="date" value={lastFrostDate} onChange={e => setLastFrostDate(e.target.value)}
                className="w-40 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground text-right outline-none focus:border-primary transition-colors" />
            </div>
          </section>
        </div>

        {/* Save button */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-border bg-background">
          <button onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
