/* global React */
const { useState, useEffect, useRef } = React;

// === ICON SET — minimal tactical/mono SVGs ===
const Icon = {
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  ),
  arrowDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 5v14M5 13l7 7 7-7" strokeLinecap="square" />
    </svg>
  ),
  back: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M19 12H5M11 5l-7 7 7 7" strokeLinecap="square" />
    </svg>
  ),
  reticle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  fuse: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M3 12c3-4 5-4 8 0s5 4 8 0" />
      <circle cx="20" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 2 4 5v7c0 5 3.5 8 8 10 4.5-2 8-5 8-10V5l-8-3z" />
    </svg>
  ),
  rifle: (p) => (
    <svg viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M2 9h6l2-3h12l2 1v3l-2 1h-2v2h-3v-2H10l-2 2H4l-2-2V9z" />
    </svg>
  ),
  lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="5" y="11" width="14" height="10" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 4v16l13-8L7 4z" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M4 12l5 5 11-12" strokeLinecap="square" />
    </svg>
  ),
  globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
    </svg>
  ),
  helix: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 4c8 0 8 16 16 16M4 20c8 0 8-16 16-16" />
    </svg>
  ),
  speaker: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M3 9v6h4l5 4V5L7 9H3zM16 8c2 1 3 2 3 4s-1 3-3 4" />
    </svg>
  ),
  chart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 20V8M10 20V4M16 20v-8M22 20H2" />
    </svg>
  ),
};

window.Icon = Icon;
