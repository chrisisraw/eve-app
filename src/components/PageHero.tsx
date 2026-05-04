import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  accent?: string;
  photos: [string, string, string];
  children?: React.ReactNode;
}

/**
 * Full-bleed hero banner: first photo fills the background, gradient
 * overlay at bottom, serif title + subtitle overlaid in white.
 */
export function PageHero({ title, subtitle, accent = "♡", photos, children }: PageHeroProps) {
  const bgSrc = photos.find(Boolean) || photos[0] || "";

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
      {/* Full-bleed background */}
      <motion.img
        src={bgSrc}
        alt=""
        onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=340&fit=crop&q=85"; }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Gradient overlay — dark at bottom so text reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 pt-10 pb-5">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="font-serif font-bold leading-[0.95] tracking-tight text-white drop-shadow-md"
          style={{ fontSize: "clamp(40px, 11vw, 56px)" }}
        >
          {title}
          <span className="ml-2 text-[0.58em]" style={{ color: "hsl(12 55% 72%)" }}>
            {accent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-[10px] font-black uppercase tracking-[0.22em] text-white/65 mt-2"
        >
          {subtitle}
        </motion.p>

        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Thin gold bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 15%, #F5E19A 50%, #C9A84C 85%, transparent 100%)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}
