import { useState, useEffect, useRef } from "react";
import { PageHero } from "@/components/PageHero";
import { useEveStore, FITNESS_PROFILES } from "@/hooks/useEveStore";
import type { Plant, Recipe } from "@/hooks/useEveStore";
import { LEVELS, BADGES } from "@/data/gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Star, Trophy, Edit2, Check, X, Plus, Heart, MessageCircle, Search, MapPin, Navigation, ExternalLink, Send, Trash2, Camera, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function getBadgeProgress(badgeId: string, stats: { streak: number; mealsLogged: number; juicesLogged: number; smoothiesLogged: number }, garden: Plant[], customMeals: Recipe[]): { current: number; max: number } | null {
  switch (badgeId) {
    case 'streak_3':     return { current: Math.min(stats.streak, 3), max: 3 };
    case 'streak_7':     return { current: Math.min(stats.streak, 7), max: 7 };
    case 'streak_30':    return { current: Math.min(stats.streak, 30), max: 30 };
    case 'meals_10':     return { current: Math.min(stats.mealsLogged, 10), max: 10 };
    case 'meals_50':     return { current: Math.min(stats.mealsLogged, 50), max: 50 };
    case 'juices_10':    return { current: Math.min(stats.juicesLogged, 10), max: 10 };
    case 'smoothies_10': return { current: Math.min(stats.smoothiesLogged, 10), max: 10 };
    case 'garden_1':     return { current: Math.min(garden.length, 1), max: 1 };
    case 'garden_5':     return { current: Math.min(garden.length, 5), max: 5 };
    case 'recipe_upload':return { current: Math.min(customMeals.length, 1), max: 1 };
    default:             return null;
  }
}

interface BoardPost {
  id: string;
  category: string;
  name: string;
  emoji: string;
  title: string;
  body: string;
  contact: string;
  ts: number;
  city: string;
}

const BOARD_CATEGORIES = [
  { id: 'friends',    label: '👫 Friends',      color: 'bg-emerald-500/15 text-emerald-700 border-emerald-300/50 dark:text-emerald-400',     desc: 'Make vegan friends in your area' },
  { id: 'housing',   label: '🏠 Housing',       color: 'bg-sky-500/15 text-sky-700 border-sky-300/50 dark:text-sky-400',                     desc: 'Rooms available & housing wanted' },
  { id: 'singles',   label: '💚 Singles',       color: 'bg-pink-500/15 text-pink-700 border-pink-300/50 dark:text-pink-400',                 desc: 'Vegan dating & connections' },
  { id: 'activism',  label: '✊ Activism',      color: 'bg-red-500/15 text-red-700 border-red-300/50 dark:text-red-400',                     desc: 'Campaigns, protests & causes' },
  { id: 'events',    label: '📅 Events',        color: 'bg-amber-500/15 text-amber-700 border-amber-300/50 dark:text-amber-400',             desc: 'Meetups, dinners & gatherings' },
  { id: 'biz',       label: '🤝 Biz Collab',   color: 'bg-teal-500/15 text-teal-700 border-teal-300/50 dark:text-teal-400',                 desc: 'Business ideas & collaborations' },
  { id: 'recipes',   label: '🍽️ Recipe Swap',  color: 'bg-purple-500/15 text-purple-700 border-purple-300/50 dark:text-purple-400',         desc: 'Share & request recipes' },
  { id: 'plants',    label: '🌱 Plant Talk',    color: 'bg-green-500/15 text-green-700 border-green-300/50 dark:text-green-400',             desc: 'Gardening & growing food' },
  { id: 'wellness',  label: '🧘 Wellness',      color: 'bg-indigo-500/15 text-indigo-700 border-indigo-300/50 dark:text-indigo-400',         desc: 'Health, yoga & mindfulness' },
  { id: 'marketplace', label: '🛍️ Marketplace', color: 'bg-orange-500/15 text-orange-700 border-orange-300/50 dark:text-orange-400',       desc: 'Buy, sell & trade vegan goods' },
];

const SEED_POSTS: BoardPost[] = [
  { id: 's1', category: 'friends',    name: 'PlantPowered Priya', emoji: '🌿', title: 'Looking for vegan hiking buddies in LA!', body: 'Love trail hikes + post-hike smoothies. DM me if you\'re in the LA area and want to explore Griffith Park or Santa Monica Mountains 🥾🥤', contact: 'DM me', ts: Date.now() - 86400000 * 2, city: 'Los Angeles, CA' },
  { id: 's2', category: 'recipes',    name: 'GreenGuru Maya',     emoji: '🧘', title: 'My famous cashew queso recipe — share yours!', body: 'Blend 1 cup soaked cashews, 1/4 cup nutritional yeast, 1 roasted red pepper, 1 tsp cumin, salt & garlic. SO good on nachos. What\'s your go-to party recipe?', contact: '', ts: Date.now() - 86400000 * 1, city: 'Austin, TX' },
  { id: 's3', category: 'events',     name: 'VeganViking',        emoji: '⚔️', title: 'Monthly vegan potluck — Portland OR', body: 'Every 2nd Saturday! Bring a dish to share, meet amazing people. This month\'s theme: GLOBAL flavors 🌍. All welcome, beginners included.', contact: 'veganviking@email.com', ts: Date.now() - 3600000 * 5, city: 'Portland, OR' },
  { id: 's4', category: 'marketplace',name: 'Sprout Master',      emoji: '🌱', title: 'Homemade cashew cheese — selling at SF farmers market', body: 'I make herb-crusted cashew brie, smoked almond cheddar, and seasonal specials. Saturdays at the Ferry Building. DM to pre-order!', contact: 'SproutCheese on Insta', ts: Date.now() - 3600000 * 3, city: 'San Francisco, CA' },
  { id: 's5', category: 'plants',     name: 'Earth Guardian',     emoji: '🌍', title: 'Best growing medium for microgreens?', body: 'I\'ve tried coco coir and hemp mats — both work but curious what others are using. Growing radish, sunflower, and pea shoots at home. Drop your tips!', contact: '', ts: Date.now() - 3600000 * 1, city: 'Seattle, WA' },
  { id: 's6', category: 'wellness',   name: 'PlantPowered Priya', emoji: '🌿', title: 'Adaptogens for stress — what\'s working for you?', body: 'Started adding ashwagandha and lion\'s mane to my morning oats. Feeling noticeably calmer after 3 weeks. Anyone else using adaptogens? Curious about reishi and chaga too.', contact: '', ts: Date.now() - 1800000, city: 'Los Angeles, CA' },
  { id: 's7', category: 'housing',    name: 'GreenGuru Maya',     emoji: '🧘', title: 'Vegan-friendly room available — Austin, TX', body: '3BR house, vegan kitchen, no animal products. Plant-forward household, composting, low waste. $850/mo, available June 1st. We host plant-based dinners every Sunday!', contact: 'text 512-555-0192', ts: Date.now() - 900000, city: 'Austin, TX' },
  { id: 's8', category: 'singles',    name: 'Earth Guardian',     emoji: '🌍', title: 'Vegan + trail runner seeking like-minded partner 💚', body: 'Late 30s, love farmers markets, cooking elaborate Sunday dinners, and weekend hikes. Looking for someone who gets excited about a really good tempeh bowl. Based in PNW.', contact: 'DM to connect', ts: Date.now() - 600000, city: 'Seattle, WA' },
];

const EMOJI_OPTIONS = ['🌱', '🌿', '🌺', '🌻', '🍃', '🥦', '🥑', '🍎', '🌾', '🏆', '⚡', '💚', '🧘', '🦋', '🌙'];
const ALLERGY_PRESETS = ['Gluten', 'Soy', 'Nuts', 'Peanuts', 'Corn', 'Coconut', 'Mushrooms', 'Onion', 'Garlic', 'Oil-Free'];

const MOCK_FRIENDS = [
  { id: 'f1', name: 'PlantPowered Priya', emoji: '🌿', level: 4, xp: 12400 },
  { id: 'f2', name: 'VeganViking', emoji: '⚔️', level: 5, xp: 15200 },
  { id: 'f3', name: 'GreenGuru Maya', emoji: '🧘', level: 3, xp: 8600 },
];


export default function SocialPage() {
  const store = useEveStore();
  const { profile, xp, unlockedBadges, stats, garden, customMeals, updateProfile, setAllergies, setFitnessProfile, settings, socialPosts, togglePostLike, addSocialPost, trackerLog, trackerGoals, weekPlan, workoutLog } = store;

  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmoji, setEditEmoji] = useState(profile.emoji);
  const [allergyInput, setAllergyInput] = useState('');
  const [activeSection, setActiveSection] = useState<'feed' | 'profile' | 'badges' | 'leaderboard' | 'eats' | 'board'>('feed');
  const [newPostText, setNewPostText] = useState('');
  const [friendSearch, setFriendSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [mapQuery, setMapQuery] = useState('');
  const [locating, setLocating] = useState(false);

  // Board state
  const [boardCategory, setBoardCategory] = useState('friends');
  const [boardPosts, setBoardPosts] = useState<BoardPost[]>([]);
  const [composing, setComposing] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardBody, setBoardBody] = useState('');
  const [boardContact, setBoardContact] = useState('');
  const [postPhotoUrl, setPostPhotoUrl] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('eve_board_posts');
      if (saved) {
        const parsed = JSON.parse(saved) as BoardPost[];
        setBoardPosts(parsed);
      } else {
        setBoardPosts(SEED_POSTS);
        localStorage.setItem('eve_board_posts', JSON.stringify(SEED_POSTS));
      }
    } catch { setBoardPosts(SEED_POSTS); }
  }, []);

  const saveBoardPosts = (posts: BoardPost[]) => {
    setBoardPosts(posts);
    try { localStorage.setItem('eve_board_posts', JSON.stringify(posts)); } catch {}
  };

  const submitBoardPost = () => {
    if (!boardTitle.trim()) { toast.error('Add a title'); return; }
    if (!boardBody.trim()) { toast.error('Add some details'); return; }
    const post: BoardPost = {
      id: `u_${Date.now()}`,
      category: boardCategory,
      name: profile.name || 'Anonymous',
      emoji: profile.emoji || '🌱',
      title: boardTitle.trim(),
      body: boardBody.trim(),
      contact: boardContact.trim(),
      ts: Date.now(),
      city: '',
    };
    saveBoardPosts([post, ...boardPosts]);
    setBoardTitle(''); setBoardBody(''); setBoardContact(''); setComposing(false);
    toast.success('Posted! +10 XP 🌱');
  };

  const deleteBoardPost = (id: string) => {
    saveBoardPosts(boardPosts.filter(p => p.id !== id));
    toast.success('Post deleted');
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const q = `@${pos.coords.latitude},${pos.coords.longitude}`;
        setMapQuery(q);
        setCitySearch('Near me');
        setLocating(false);
        toast.success('Found your location! 📍');
      },
      () => { toast.error('Could not get location — try entering a city or zip'); setLocating(false); }
    );
  };

  const searchCity = () => {
    if (!citySearch.trim()) { toast.error('Enter a city, zip code or neighborhood'); return; }
    setMapQuery(citySearch.trim());
  };

  const currentLevel = LEVELS.reduce((prev, curr) => (xp >= curr.xp ? curr : prev), LEVELS[0]);
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1] || currentLevel;
  const progressToNext = nextLevel === currentLevel ? 100 : ((xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100;

  const saveProfile = () => {
    updateProfile({ name: editName || 'Vegan Hero', emoji: editEmoji });
    setEditingProfile(false);
    toast.success('Profile updated!');
  };

  const addAllergy = (allergy: string) => {
    const trimmed = allergy.trim();
    if (!trimmed) return;
    const current = profile.allergies || [];
    if (!current.map(a => a.toLowerCase()).includes(trimmed.toLowerCase())) {
      setAllergies([...current, trimmed]);
      toast.success(`${trimmed} added to dietary restrictions`);
    }
    setAllergyInput('');
  };

  const removeAllergy = (a: string) => setAllergies((profile.allergies || []).filter(x => x !== a));

  const handleFitnessProfile = (id: string) => {
    if (settings.fitnessProfile === id) {
      setFitnessProfile('');
      toast.success('Fitness profile cleared');
    } else {
      setFitnessProfile(id);
      toast.success(`${FITNESS_PROFILES[id].name} profile applied! Goals updated.`);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Photo must be under 5 MB'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      setPostPhotoUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    if (!newPostText.trim() && !postPhotoUrl) return;
    addSocialPost(newPostText.trim() || '📸 Shared a photo!', postPhotoUrl || undefined);
    setNewPostText('');
    setPostPhotoUrl(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
    toast.success('Posted! +20 XP 🌱');
  };


  const sections = [
    { id: 'feed' as const, label: '🌱 Feed' },
    { id: 'eats' as const, label: '🍽️ Eats' },
    { id: 'board' as const, label: '📋 Board' },
    { id: 'profile' as const, label: '👤 Profile' },
    { id: 'badges' as const, label: `🏅 Badges` },
    { id: 'leaderboard' as const, label: '🏆 Ranks' },
  ];

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500 pb-20">
      <PageHero
        title="Community"
        subtitle="Feed · Profile · Badges · Board"
        accent="♡"
        photos={[
          "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=300&h=300&fit=crop&crop=center&q=90",
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center&q=90",
        ]}
      />

      <div className="px-4 py-2">
        <div className="relative">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 pr-8">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={cn("shrink-0 px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                  activeSection === s.id ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/20 text-muted-foreground border border-border/50")}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">

        {/* FEED */}
        {activeSection === 'feed' && (
          <>
            {/* Post composer */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="bg-primary/20 text-lg">{profile.emoji}</AvatarFallback>
                  </Avatar>
                  <textarea value={newPostText} onChange={e => setNewPostText(e.target.value)}
                    placeholder="Share what's on your plate today... 🌱"
                    rows={2}
                    className="flex-1 bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none" />
                </div>
                {/* Photo preview */}
                {postPhotoUrl && (
                  <div className="relative rounded-xl overflow-hidden h-48">
                    <img src={postPhotoUrl} alt="preview" className="w-full h-full object-cover" />
                    <button onClick={() => { setPostPhotoUrl(null); if (photoInputRef.current) photoInputRef.current.value = ''; }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  {/* Camera / photo attach button */}
                  <button onClick={() => photoInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/30 border border-border/50 text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    {postPhotoUrl ? 'Change Photo' : 'Add Photo'}
                  </button>
                  <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <Button onClick={handlePost} disabled={!newPostText.trim() && !postPhotoUrl} size="sm" className="rounded-full text-xs px-4">
                    Share +20 XP
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent plate photos carousel */}
            {(() => {
              const photoPosts = socialPosts.filter(p => p.image);
              if (photoPosts.length === 0) return null;
              return (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2">Recent Plates 📸</h3>
                  <div className="relative">
                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 pr-8">
                      {photoPosts.map(post => (
                        <div key={post.id} className="shrink-0 w-28 h-28 rounded-2xl overflow-hidden relative shadow-md border border-border/40">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                            <p className="text-white text-[8px] font-bold leading-tight truncate">{post.authorEmoji} {post.authorName.split(' ')[0]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })()}

            {/* Find friends */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2">Find Friends</h3>
              <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-3 py-2 border border-border/50 mb-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input value={friendSearch} onChange={e => setFriendSearch(e.target.value)} placeholder="Search by name..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
              </div>
              <div className="space-y-1.5">
                {MOCK_FRIENDS.filter(f => !friendSearch || f.name.toLowerCase().includes(friendSearch.toLowerCase())).map(friend => (
                  <div key={friend.id} className="flex items-center gap-3 p-3 bg-card border border-border/40 rounded-xl">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="text-base">{friend.emoji}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{friend.name}</p>
                      <p className="text-[10px] text-muted-foreground">{LEVELS[Math.min(friend.level - 1, LEVELS.length - 1)]?.icon} {LEVELS[Math.min(friend.level - 1, LEVELS.length - 1)]?.name} · {friend.xp.toLocaleString()} XP</p>
                    </div>
                    <button onClick={() => toast.success(`Friend request sent to ${friend.name}!`)}
                      className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-bold border border-primary/20 hover:bg-primary/20 transition-colors">
                      + Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts feed */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Community Feed</h3>
              {socialPosts.map(post => (
                <Card key={post.id} className="border-border/50 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    {post.image && (
                      <div className="h-52 overflow-hidden">
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="text-base">{post.authorEmoji}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground">{post.authorName}</p>
                          <p className="text-[10px] text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-4">
                        <button onClick={() => togglePostLike(post.id)}
                          className={cn("flex items-center gap-1.5 text-xs font-bold transition-colors",
                            post.liked ? "text-red-500" : "text-muted-foreground hover:text-red-400")}>
                          <Heart className={cn("w-3.5 h-3.5", post.liked && "fill-current")} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> Reply
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* EATS — Vegan Restaurant Finder */}
        {activeSection === 'eats' && (
          <div className="space-y-4">
            {/* Header card */}
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] p-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                  <div>
                    <h2 className="text-white font-serif text-xl font-bold">Find Vegan Restaurants</h2>
                    <p className="text-white/60 text-xs mt-0.5">Discover plant-based spots near you</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 space-y-3">
                {/* Search input */}
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-muted/20 border border-border/50 rounded-xl px-3 py-2">
                    <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <input
                      value={citySearch}
                      onChange={e => setCitySearch(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && searchCity()}
                      placeholder="City, zip code or neighborhood…"
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    />
                  </div>
                  <Button onClick={searchCity} size="sm" className="rounded-xl shrink-0 px-4">
                    Search
                  </Button>
                </div>

                {/* Use My Location */}
                <button
                  onClick={useMyLocation}
                  disabled={locating}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-primary/30 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/15 transition-colors disabled:opacity-60"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  {locating ? 'Finding your location…' : 'Use My Location'}
                </button>
              </div>
            </div>

            {/* Map + results */}
            {mapQuery ? (
              <div className="space-y-3">
                {/* Google Maps embed */}
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm" style={{ height: 320 }}>
                  <iframe
                    key={mapQuery}
                    src={
                      mapQuery.startsWith('@')
                        ? `https://maps.google.com/maps?q=vegan+restaurants&ll=${mapQuery.slice(1)}&z=14&output=embed`
                        : `https://maps.google.com/maps?q=vegan+restaurants+near+${encodeURIComponent(mapQuery)}&output=embed`
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vegan restaurants map"
                  />
                </div>

                {/* Open in apps */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={
                      mapQuery.startsWith('@')
                        ? `https://www.google.com/maps/search/vegan+restaurants/${mapQuery}`
                        : `https://www.google.com/maps/search/vegan+restaurants+near+${encodeURIComponent(mapQuery)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-base">🗺️</span>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Google Maps</p>
                      <p className="text-[9px] text-muted-foreground">Open full map</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                  </a>

                  <a
                    href={
                      mapQuery.startsWith('@')
                        ? `https://www.happycow.net/searchmap?lat=${mapQuery.slice(1).split(',')[0]}&lng=${mapQuery.slice(1).split(',')[1]}&vegan=true&vegetarian=false&distance=10&distanceType=km`
                        : `https://www.happycow.net/searchmap?location=${encodeURIComponent(mapQuery)}&vegan=true&vegetarian=false`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-base">🐄</span>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">HappyCow</p>
                      <p className="text-[9px] text-muted-foreground">Vegan directory</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                  </a>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-2.5 p-3 bg-primary/8 border border-primary/20 rounded-xl">
                  <span className="text-base shrink-0">💡</span>
                  <p className="text-xs text-foreground leading-relaxed">
                    <strong>HappyCow</strong> is the gold standard for finding 100% vegan spots. Google Maps is great for "open now" filtering and photos.
                  </p>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <span className="text-5xl">🌱</span>
                <p className="text-sm font-bold text-foreground">Ready to explore?</p>
                <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
                  Enter your city or zip code above, or tap "Use My Location" to find vegan restaurants near you.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeSection === 'profile' && (
          <>
            <Card className="border-none bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-xl overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14 border-2 border-white/30 shadow-lg">
                      <AvatarFallback className="bg-white/15 text-2xl">{profile.emoji}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-bold">{profile.name}</h2>
                      <div className="flex items-center gap-1.5 bg-black/15 px-2.5 py-0.5 rounded-full w-fit mt-1">
                        <span className="text-base">{currentLevel.icon}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest">{currentLevel.name}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { setEditName(profile.name); setEditEmoji(profile.emoji); setEditingProfile(true); }}
                    className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-80">
                    <span>XP Progress</span><span>{xp} / {nextLevel.xp} XP</span>
                  </div>
                  <Progress value={progressToNext} className="h-2 bg-black/15" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <StatMini icon={Flame} value={stats.streak} label="Streak" />
                  <StatMini icon={Star} value={unlockedBadges.length} label="Badges" />
                  <StatMini icon={Trophy} value={stats.mealsLogged} label="Meals" />
                </div>
              </CardContent>
            </Card>

            {editingProfile && (
              <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Edit Profile</h3>
                    <button onClick={() => setEditingProfile(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 block">Display Name</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)}
                      className="w-full bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-2 block">Choose Emoji</label>
                    <div className="flex flex-wrap gap-2">
                      {EMOJI_OPTIONS.map(e => (
                        <button key={e} onClick={() => setEditEmoji(e)}
                          className={cn("w-9 h-9 rounded-xl text-xl flex items-center justify-center border-2 transition-all",
                            editEmoji === e ? "border-primary bg-primary/10 scale-110" : "border-border")}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={saveProfile} className="w-full h-9 rounded-xl text-xs font-bold uppercase tracking-widest">
                    <Check className="w-3.5 h-3.5 mr-1.5" /> Save Profile
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Dietary Restrictions */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-0.5">🚫 Dietary Restrictions</h3>
                  <p className="text-[10px] text-muted-foreground">Auto-Plan will skip meals containing these ingredients</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALLERGY_PRESETS.map(a => {
                    const active = (profile.allergies || []).map(x => x.toLowerCase()).includes(a.toLowerCase());
                    return (
                      <button key={a} onClick={() => active ? removeAllergy(a) : addAllergy(a)}
                        className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all",
                          active ? "bg-primary/15 text-primary border-primary/40" : "bg-muted/20 text-muted-foreground border-border")}>
                        {active ? '✓ ' : ''}{a}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <input value={allergyInput} onChange={e => setAllergyInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addAllergy(allergyInput)}
                    placeholder="Add custom restriction..."
                    className="flex-1 bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                  <button onClick={() => addAllergy(allergyInput)} className="px-3 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {(profile.allergies || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {(profile.allergies || []).map(a => (
                      <span key={a} className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold border border-primary/20">
                        {a}
                        <button onClick={() => removeAllergy(a)} className="hover:text-destructive transition-colors"><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fitness Profile */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-0.5">💪 Fitness Profile</h3>
                  <p className="text-[10px] text-muted-foreground">Sets your daily calorie & macro goals</p>
                </div>
                <div className="flex flex-col gap-2">
                  {Object.entries(FITNESS_PROFILES).map(([id, fp]) => (
                    <button key={id} onClick={() => handleFitnessProfile(id)}
                      className={cn("flex items-start gap-3 p-3 rounded-xl border text-left transition-all",
                        settings.fitnessProfile === id ? "border-primary/50 bg-primary/10" : "border-border/50 bg-muted/10 hover:border-primary/30")}>
                      <div className={cn("w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0",
                        settings.fitnessProfile === id ? "border-primary bg-primary" : "border-muted-foreground")}>
                        {settings.fitnessProfile === id && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{fp.name}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{fp.note}</p>
                        <p className="text-[9px] font-bold text-primary mt-1">
                          {fp.cal} kcal · {fp.protein}g protein · {fp.carbs}g carbs
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* BADGES */}
        {activeSection === 'badges' && (
          <section className="space-y-3">
            {/* Header */}
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <div className="bg-gradient-to-r from-[#1e1008] to-[#2d1a0a] px-4 py-3">
                <h2 className="text-white font-serif text-lg font-bold">Your Badges</h2>
                <p className="text-white/55 text-[10px] mt-0.5">{unlockedBadges.length} of {BADGES.length} unlocked · Log meals, workouts &amp; plants to earn more</p>
              </div>
              <div className="bg-card px-4 py-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.round((unlockedBadges.length / BADGES.length) * 100)}%` }} />
                </div>
                <span className="text-[10px] font-bold text-primary">{Math.round((unlockedBadges.length / BADGES.length) * 100)}%</span>
              </div>
            </div>

            {BADGES.map(badge => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              const progress = getBadgeProgress(badge.id, stats, garden, customMeals);
              const pct = progress ? Math.round((progress.current / progress.max) * 100) : 0;

              return (
                <div key={badge.id} className={cn(
                  "flex items-center gap-3 p-3.5 rounded-2xl border transition-all",
                  isUnlocked
                    ? "bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30 shadow-sm"
                    : "bg-muted/20 border-border/40"
                )}>
                  <span className={cn("text-2xl shrink-0 w-10 text-center", !isUnlocked && "grayscale opacity-40")}>{badge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={cn("text-xs font-bold", isUnlocked ? "text-foreground" : "text-muted-foreground")}>{badge.name}</p>
                      {isUnlocked && (
                        <span className="text-[8px] font-bold text-primary bg-primary/12 px-1.5 py-0.5 rounded-full border border-primary/20">+{badge.xp} XP</span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{badge.desc}</p>
                    {!isUnlocked && progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
                          <span>{progress.current} / {progress.max}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary/60 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}
                    {!isUnlocked && !progress && (
                      <div className="flex items-center gap-1 mt-1">
                        <Lock className="w-2.5 h-2.5 text-muted-foreground/50" />
                        <span className="text-[9px] text-muted-foreground/50">Keep using E.V.E. daily to unlock</span>
                      </div>
                    )}
                  </div>
                  {isUnlocked ? (
                    <span className="text-emerald-500 text-base shrink-0">✓</span>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground/25 shrink-0" />
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* COMMUNITY BOARD */}
        {activeSection === 'board' && (
          <section className="space-y-3">
            {/* Category pills — with scroll indicator */}
            <div className="relative">
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 pr-8">
                {BOARD_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setBoardCategory(cat.id)}
                    className={cn(
                      "shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all whitespace-nowrap",
                      boardCategory === cat.id ? cat.color : "bg-muted/20 text-muted-foreground border-border/40 hover:border-primary/30"
                    )}>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>

            {/* Active category desc + compose button */}
            {(() => {
              const cat = BOARD_CATEGORIES.find(c => c.id === boardCategory)!;
              return (
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
                  <button onClick={() => setComposing(v => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shrink-0">
                    <Plus className="w-3 h-3" /> Post
                  </button>
                </div>
              );
            })()}

            {/* Compose form */}
            {composing && (
              <Card className="border-primary/30 shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-foreground">New Post in {BOARD_CATEGORIES.find(c => c.id === boardCategory)?.label}</h3>
                    <button onClick={() => setComposing(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                  </div>
                  <input value={boardTitle} onChange={e => setBoardTitle(e.target.value)}
                    placeholder="Title…"
                    className="w-full bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                  <textarea value={boardBody} onChange={e => setBoardBody(e.target.value)}
                    placeholder="Share your details…"
                    rows={4}
                    className="w-full bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none" />
                  <input value={boardContact} onChange={e => setBoardContact(e.target.value)}
                    placeholder="Contact info (optional)"
                    className="w-full bg-muted/20 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                  <Button onClick={submitBoardPost} className="w-full h-9 rounded-xl text-xs font-bold uppercase tracking-widest gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Publish Post
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Posts list */}
            {boardPosts.filter(p => p.category === boardCategory).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center space-y-3">
                <span className="text-5xl">{BOARD_CATEGORIES.find(c => c.id === boardCategory)?.label.split(' ')[0]}</span>
                <p className="text-sm font-bold text-foreground">No posts yet</p>
                <p className="text-xs text-muted-foreground">Be the first to post in this category!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {boardPosts.filter(p => p.category === boardCategory).sort((a, b) => b.ts - a.ts).map(post => {
                  const isOwn = post.name === profile.name && !post.id.startsWith('s');
                  const ageMs = Date.now() - post.ts;
                  const ageStr = ageMs < 3600000 ? `${Math.floor(ageMs / 60000)}m ago`
                    : ageMs < 86400000 ? `${Math.floor(ageMs / 3600000)}h ago`
                    : `${Math.floor(ageMs / 86400000)}d ago`;
                  return (
                    <Card key={post.id} className="border-border/50 shadow-sm">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-9 h-9 shrink-0">
                            <AvatarFallback className="text-base">{post.emoji}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-foreground leading-tight">{post.name}</p>
                              {post.city && <span className="text-[9px] text-muted-foreground">📍 {post.city}</span>}
                              <span className="text-[9px] text-muted-foreground ml-auto shrink-0">{ageStr}</span>
                            </div>
                            <p className="text-sm font-semibold text-foreground mt-1 leading-snug">{post.title}</p>
                          </div>
                          {isOwn && (
                            <button onClick={() => deleteBoardPost(post.id)}
                              className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{post.body}</p>
                        {post.contact && (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-primary/8 rounded-xl border border-primary/20">
                            <MessageCircle className="w-3 h-3 text-primary shrink-0" />
                            <span className="text-[10px] font-bold text-primary">{post.contact}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* LEADERBOARD */}
        {activeSection === 'leaderboard' && (
          <section className="space-y-3">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <LeaderboardRow rank={1} name="Earth Guardian" xp={18420} emoji="🌍" isUser={false} />
                <LeaderboardRow rank={2} name="PlantPowered Priya" xp={15800} emoji="🌿" isUser={false} />
                <LeaderboardRow rank={3} name={profile.name} xp={xp} emoji={profile.emoji} isUser={true} />
                <LeaderboardRow rank={4} name="VeganViking" xp={12800} emoji="⚔️" isUser={false} />
                <LeaderboardRow rank={5} name="Green Warrior" xp={9600} emoji="⚔️" isUser={false} />
                <LeaderboardRow rank={6} name="Sprout Master" xp={6200} emoji="🌱" isUser={false} />
              </CardContent>
            </Card>
            <p className="text-[10px] text-muted-foreground text-center px-4">Rankings reset monthly. Keep logging meals and workouts to climb the leaderboard! 🏆</p>
          </section>
        )}
      </div>
    </div>
  );
}

function StatMini({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <div className="text-center bg-white/10 rounded-xl p-2">
      <Icon className="w-3.5 h-3.5 mx-auto mb-1 opacity-80" />
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[8px] uppercase font-bold tracking-tighter opacity-70">{label}</div>
    </div>
  );
}

function LeaderboardRow({ rank, name, xp, emoji, isUser }: { rank: number; name: string; xp: number; emoji: string; isUser: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 p-3.5 border-b border-border last:border-none transition-colors", isUser ? "bg-primary/5" : "hover:bg-muted/20")}>
      <span className={cn("text-xs font-black w-5 text-center", rank === 1 ? "text-yellow-500" : rank === 2 ? "text-gray-400" : rank === 3 ? "text-amber-600" : "text-muted-foreground")}>
        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
      </span>
      <Avatar className="w-8 h-8 border border-border">
        <AvatarFallback className="text-base">{emoji}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-bold truncate", isUser && "text-primary")}>{name}</p>
        <p className="text-[10px] text-muted-foreground font-medium">{xp.toLocaleString()} XP</p>
      </div>
    </div>
  );
}
