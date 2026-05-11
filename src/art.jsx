/* global React */
// === ART — SVG-based imagery placeholders styled as DF/MI dossier visuals ===

const HeroVignette = () => (
  <svg className="hero-art-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
    <defs>
      <radialGradient id="rg1" cx="40%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lg1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#0a0d0e" />
        <stop offset="100%" stopColor="#1a0c08" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" stroke="#1a3540" strokeWidth="0.5" fill="none" />
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#lg1)" />
    <rect width="800" height="600" fill="url(#grid)" opacity="0.4" />
    <rect width="800" height="600" fill="url(#rg1)" />
    {/* Faint silhouette: operator + helicopter */}
    <g opacity="0.18" stroke="#ff7a1a" strokeWidth="1" fill="none">
      <circle cx="640" cy="180" r="80" />
      <circle cx="640" cy="180" r="50" />
      <path d="M560 180h160M640 100v160" />
      <path d="M620 230 L620 280 L600 320 L600 400 M660 230 L660 280 L680 320 L680 400" />
    </g>
    {/* Reticle marks */}
    {[120, 220, 320, 420].map((x) => (
      <g key={x} opacity="0.5">
        <path d={`M${x} 540v18`} stroke="#ff7a1a" strokeWidth="1" />
      </g>
    ))}
    <text x="20" y="580" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6b7672" letterSpacing="2">
      LAT 33°41'N — LON 71°23'E   ALT 4310m   THM-CAM ACTIVE
    </text>
    <text x="640" y="40" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ff7a1a" letterSpacing="2" textAnchor="end">
      OP-CODE: ROGUE-SIGNAL/2026-Q3
    </text>
  </svg>
);

const DossierArt = ({ label, code, accent = '#ff7a1a', variant = 'agent' }) => {
  const pat = (
    <pattern id={`p-${code}`} width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 6L6 0" stroke={accent} strokeWidth="0.5" opacity="0.3" />
    </pattern>
  );
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        {pat}
        <linearGradient id={`g-${code}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1f22" />
          <stop offset="100%" stopColor="#0a0d0e" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#g-${code})`} />
      <rect width="400" height="240" fill={`url(#p-${code})`} />
      {variant === 'agent' && (
        <g>
          <circle cx="200" cy="110" r="46" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
          <circle cx="200" cy="100" r="20" fill={accent} opacity="0.18" stroke={accent} strokeWidth="1" />
          <path d="M168 160c0-16 14-26 32-26s32 10 32 26v18H168z" fill={accent} opacity="0.18" stroke={accent} strokeWidth="1" />
          <rect x="120" y="30" width="160" height="2" fill={accent} opacity="0.5" />
          <rect x="120" y="200" width="160" height="2" fill={accent} opacity="0.5" />
        </g>
      )}
      {variant === 'briefcase' && (
        <g stroke={accent} strokeWidth="1" fill="none" opacity="0.7">
          <rect x="120" y="80" width="160" height="100" />
          <path d="M120 120h160M170 80V60h60v20M155 130v40M245 130v40" />
          <circle cx="200" cy="150" r="6" fill={accent} opacity="0.2" />
        </g>
      )}
      {variant === 'helicopter' && (
        <g stroke={accent} strokeWidth="1" fill="none" opacity="0.7">
          <ellipse cx="200" cy="140" rx="60" ry="14" />
          <path d="M140 140h-20l-10 8M260 140h30M200 126v-20h-30M200 126v-20h60M80 100h240M200 154l-10 16h20l-10-16" />
        </g>
      )}
      {variant === 'mask' && (
        <g stroke={accent} strokeWidth="1" fill="none" opacity="0.65">
          <ellipse cx="200" cy="120" rx="60" ry="78" />
          <path d="M170 110q30 -20 60 0M180 130c10 12 30 12 40 0M200 90v18" />
          <circle cx="180" cy="115" r="4" fill={accent} opacity="0.25" />
          <circle cx="220" cy="115" r="4" fill={accent} opacity="0.25" />
        </g>
      )}
      {variant === 'building' && (
        <g stroke={accent} strokeWidth="0.8" fill="none" opacity="0.7">
          <path d="M80 200h240M100 200V90l60-30 80 30v110M120 110h20v20h-20zM160 110h20v20h-20zM200 110h20v20h-20zM120 150h20v20h-20zM160 150h20v20h-20zM200 150h20v20h-20zM240 130h20v40h-20zM240 80h20v40h-20z" />
        </g>
      )}
      {variant === 'satellite' && (
        <g stroke={accent} strokeWidth="0.8" fill="none" opacity="0.65">
          <circle cx="200" cy="120" r="60" />
          <circle cx="200" cy="120" r="38" />
          <circle cx="200" cy="120" r="18" />
          <path d="M30 120h340M200 0v240M120 50l160 140M280 50L120 190" />
          <circle cx="265" cy="80" r="6" fill={accent} opacity="0.5" />
        </g>
      )}
      {variant === 'gun' && (
        <g stroke={accent} strokeWidth="1" fill={accent} fillOpacity="0.1" opacity="0.85">
          <path d="M60 130h80l20-20h60v20h60v10h-60l-10 10h-160zM150 140v18h12v-18M225 110v-12h12v12" />
        </g>
      )}
      {variant === 'fuse' && (
        <g stroke={accent} strokeWidth="1.2" fill="none" opacity="0.85">
          <path d="M40 120c40-40 80-40 120 0s80 40 120 0 80-40 120 0" />
          <circle cx="320" cy="120" r="10" fill={accent} fillOpacity="0.5" />
          <circle cx="320" cy="120" r="18" fill={accent} fillOpacity="0.15" />
        </g>
      )}
      {/* corners */}
      <g stroke={accent} strokeWidth="1" fill="none">
        <path d="M10 10h18M10 10v18" />
        <path d="M390 10h-18M390 10v18" />
        <path d="M10 230h18M10 230v-18" />
        <path d="M390 230h-18M390 230v-18" />
      </g>
      <text x="20" y="225" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6b7672" letterSpacing="2">
        {code}
      </text>
      <text x="380" y="225" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={accent} letterSpacing="2" textAnchor="end">
        {label}
      </text>
    </svg>
  );
};

// Weapon silhouette art for skin cards
const WeaponSilhouette = ({ accent = '#ff7a1a', kind = 'rifle' }) => {
  const paths = {
    rifle: 'M60 110h60l30-20h180v8h60v6h-60v6h-180l-15 14h-60v-14zM200 124v18h12v-18M325 96v-12h12v12',
    smg: 'M80 110h70l20-12h150v8h40v8h-40v6h-150l-12 12h-78z',
    pistol: 'M120 100h120v18l-40 12h-25v18h-15v-18h-30v-12h-10z',
    sniper: 'M40 110h60l30-18h220v8h60v6h-60v6h-220l-12 14h-78v-16z',
    knife: 'M80 100l160-30 30 30-30 30L80 100zM240 100l40 10v8l-40 10z',
  };
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`wg-${kind}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1208" />
          <stop offset="100%" stopColor="#0a0d0e" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#wg-${kind})`} />
      {/* tactical grid */}
      <g opacity="0.18" stroke={accent}>
        <path d="M0 100h400M200 0v200" />
        <circle cx="200" cy="100" r="60" fill="none" />
        <circle cx="200" cy="100" r="34" fill="none" />
      </g>
      <path d={paths[kind] || paths.rifle} fill={accent} fillOpacity="0.85" />
      {/* glow */}
      <circle cx="200" cy="100" r="120" fill={accent} fillOpacity="0.06" />
    </svg>
  );
};

// Profile portrait silhouette for KOL avatars
const Portrait = ({ seed = 1, accent = '#ff7a1a' }) => {
  const colors = ['#ff7a1a', '#e0181a', '#5af6c6', '#f6c445', '#9d6dff'];
  const c = accent || colors[seed % colors.length];
  return (
    <svg viewBox="0 0 56 56" style={{ width: '100%', height: '100%' }}>
      <rect width="56" height="56" fill="#1a1f22" />
      <circle cx="28" cy="22" r="10" fill={c} fillOpacity="0.25" stroke={c} strokeWidth="0.8" />
      <path d="M10 56c2-12 10-18 18-18s16 6 18 18z" fill={c} fillOpacity="0.25" stroke={c} strokeWidth="0.8" />
      <text x="4" y="52" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#6b7672">SUBJ-{String(seed).padStart(2, '0')}</text>
    </svg>
  );
};

// Big merch art
const MerchArt = ({ kind = 'cap', accent = '#ff7a1a' }) => {
  const draw = {
    cap: <g stroke={accent} fill="none" strokeWidth="1"><path d="M40 110h160c0-30-30-50-80-50s-80 20-80 50zM40 110l-10 18h170v-18zM120 70v-12" /></g>,
    tee: <g stroke={accent} fill="none" strokeWidth="1"><path d="M70 50l30-10 40 10 30 10v110H70V60zM100 40c0 12 10 18 20 18s20-6 20-18" /><path d="M105 90h30M100 110h40" strokeOpacity="0.5" /></g>,
    figure: <g stroke={accent} fill="none" strokeWidth="1"><circle cx="120" cy="60" r="14" /><path d="M106 60c0 8 6 14 14 14s14-6 14-14M120 74v50M120 124l-20 30M120 124l20 30M100 95l-20 14M140 95l20 14" /><path d="M90 160h60v8H90z" /></g>,
    coin: <g stroke={accent} fill="none" strokeWidth="1"><circle cx="120" cy="100" r="55" /><circle cx="120" cy="100" r="40" /><path d="M105 90l30 30M135 90l-30 30M75 100h12M153 100h12M120 47v12M120 141v12" /></g>,
    poster: <g stroke={accent} fill="none" strokeWidth="1"><rect x="60" y="20" width="120" height="160" /><path d="M75 35h90M75 50h60M80 80c30-30 50-30 80 0M80 80h80M120 80v90" strokeOpacity="0.5" /></g>,
    pin: <g stroke={accent} fill="none" strokeWidth="1"><circle cx="120" cy="90" r="36" /><circle cx="120" cy="90" r="22" /><path d="M120 126v40M114 166h12" /></g>,
    sticker: <g stroke={accent} fill="none" strokeWidth="1"><path d="M60 60h120v120H60z M70 70h100v100H70" strokeDasharray="4 3" /><path d="M85 110l20 20 50-50" strokeWidth="2" /></g>,
    keychain: <g stroke={accent} fill="none" strokeWidth="1"><circle cx="80" cy="80" r="14" /><path d="M94 80h16M120 80v60M120 140l-12 16M120 140l12 16M105 100h30v40h-30z" /></g>,
  };
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <rect width="240" height="200" fill="#131a1c" />
      <g opacity="0.15" stroke={accent}>
        <path d="M0 100h240M120 0v200" />
      </g>
      {draw[kind] || draw.cap}
    </svg>
  );
};

window.HeroVignette = HeroVignette;
window.DossierArt = DossierArt;
window.WeaponSilhouette = WeaponSilhouette;
window.Portrait = Portrait;
window.MerchArt = MerchArt;
