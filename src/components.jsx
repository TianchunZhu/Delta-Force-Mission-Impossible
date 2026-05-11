/* global React, Icon */
const { useState: useStateC, useEffect: useEffectC } = React;

// ============= TOP NAVIGATION =============
const TopNav = ({ route, navigate }) => {
  const links = [
    { id: 'home',      num: '01', label: 'OVERVIEW' },
    { id: 'plan',      num: '02', label: 'CAMPAIGN PLAN' },
    { id: 'ingame',    num: '02.1', label: 'IN-GAME OPS' },
    { id: 'offgame',   num: '02.2', label: 'OFF-GAME OPS' },
    { id: 'marketing', num: '03', label: 'GTM / MARKETING' },
  ];
  const [time, setTime] = useStateC(new Date());
  useEffectC(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (d) => d.toISOString().slice(11, 19) + ' UTC';
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <a className="topnav-brand" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <img src="图片素材/logo.png" alt="Delta Force × M:I" style={{ height: 28, width: 'auto', display: 'block' }} />
        </a>
        <div className="topnav-links">
          {links.map((l) => (
            <button
              key={l.id}
              className={`topnav-link ${route === l.id ? 'active' : ''}`}
              onClick={() => navigate(l.id)}
            >
              <span className="num">{l.num}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
        <div className="topnav-status">
          <span className="status-dot"></span>
          <span>LIVE / {fmt(time)}</span>
        </div>
      </div>
    </nav>
  );
};

// ============= BREADCRUMB / BACK =============
const Breadcrumb = ({ trail, navigate }) => (
  <div className="breadcrumb">
    {trail.map((t, i) => {
      const last = i === trail.length - 1;
      return (
        <React.Fragment key={i}>
          {last ? <span className="here">// {t.label}</span> : <a onClick={() => navigate(t.id)}>{t.label}</a>}
          {!last && <span className="sep">/</span>}
        </React.Fragment>
      );
    })}
  </div>
);

const BackBtn = ({ to, label, navigate }) => (
  <button className="back-btn" onClick={() => navigate(to)}>
    <Icon.back width="14" height="14" />
    <span>{label}</span>
  </button>
);

// ============= LABEL ROW =============
const LabelRow = ({ children, color }) => (
  <div className="label-row" style={color ? { color } : null}>
    <span className="pulse" style={color ? { background: color, boxShadow: `0 0 10px ${color}` } : null}></span>
    <span className="dash" style={color ? { background: color } : null}></span>
    <span>{children}</span>
  </div>
);

// ============= SECTION HEADER =============
const SectionHeader = ({ num, name, title, kicker, accent }) => (
  <div style={{ marginBottom: 40 }}>
    <div className="section-kicker">
      <span className="num" style={accent ? { color: accent } : null}>[{num}]</span>
      <span className="name">{name}</span>
    </div>
    <h2 className="section-title">{title}</h2>
    {kicker && <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 720, marginTop: 18, lineHeight: 1.6 }}>{kicker}</p>}
    <div className="fuse" style={{ marginTop: 28, maxWidth: 240 }}></div>
  </div>
);

// ============= FOOTER =============
const Footer = ({ navigate }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            DELTA FORCE <span style={{ color: 'var(--df-amber)' }}>×</span> MISSION : IMPOSSIBLE
          </div>
          <div className="ticker" style={{ marginTop: 8 }}>OPERATION ROGUE SIGNAL — SUMMER 2026</div>
          <p style={{ color: 'var(--text-mute)', fontSize: 13, marginTop: 14, maxWidth: 320, lineHeight: 1.55 }}>
            A confidential pitch deck mocked as a live operations console. For internal review by Tencent Games / Studio TiMi.
          </p>
        </div>
        <div>
          <h5>NAVIGATE</h5>
          <ul>
            <li onClick={() => navigate('home')}>Overview</li>
            <li onClick={() => navigate('plan')}>Campaign Plan</li>
            <li onClick={() => navigate('ingame')}>In-Game Ops</li>
            <li onClick={() => navigate('offgame')}>Off-Game Ops</li>
            <li onClick={() => navigate('marketing')}>Marketing / GTM</li>
          </ul>
        </div>
        <div>
          <h5>CHANNELS</h5>
          <ul>
            <li>YouTube — Delta Force EN</li>
            <li>TikTok — @deltaforceglobal</li>
            <li>Twitch / Kick partners</li>
            <li>Steam Hub events</li>
            <li>Discord — Operator Lounge</li>
          </ul>
        </div>
        <div>
          <h5>CONTACT</h5>
          <ul>
            <li>biz-dev@deltaforce.tencent</li>
            <li>partner@paramount-mi</li>
            <li>press / EU+NA</li>
          </ul>
        </div>
      </div>
      <div className="footer-bot">
        <span>© 2026 TENCENT GAMES — SHOWCASE MOCKUP</span>
        <div className="legal">
          <span>v1.0 · OPS-FB</span>
          <span>CLASSIFIED — INTERNAL USE</span>
        </div>
      </div>
    </div>
  </footer>
);

window.TopNav = TopNav;
window.Breadcrumb = Breadcrumb;
window.BackBtn = BackBtn;
window.LabelRow = LabelRow;
window.SectionHeader = SectionHeader;
window.Footer = Footer;
