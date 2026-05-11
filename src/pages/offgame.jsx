/* global React, Icon, LabelRow, SectionHeader, Breadcrumb, BackBtn */
const { useState: useStateOG, useEffect: useEffectOG, useRef: useRefOG } = React;

/* Reveal on scroll — same pattern as ingame, uses plan.css classes */
const useRevealOG = () => {
  const ref = useRefOG(null);
  const [shown, setShown] = useStateOG(false);
  useEffectOG(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
};

const RevealOG = ({ children, className = '', delay = 0, dir = 'up', as: As = 'div', ...rest }) => {
  const [ref, shown] = useRevealOG();
  const dirCls = dir === 'left' ? 'reveal-l' : dir === 'right' ? 'reveal-r' : '';
  const dl = delay ? `delay-${delay}` : '';
  return (
    <As ref={ref} className={`reveal ${dirCls} ${dl} ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </As>
  );
};

/* Section chapter mark — same structure as IGMark, red accent via .chapter-mark.red */
const OGMark = ({ n, k, sub = '' }) => (
  <RevealOG className="chapter-mark">
    <span className="cn">{n}</span>
    <span className="ck"><strong>{k}</strong>{sub}</span>
  </RevealOG>
);

/* Sub-section divider — same as IGDivider */
const OGDivider = ({ label }) => (
  <div className="divider-bar" style={{ margin: '32px 0 20px' }}>
    <span className="marker"></span><span>{label}</span>
  </div>
);

const OG_SECTIONS = [
  { id: 'og-01', n: '01', label: 'FIELD BRIEF' },
  { id: 'og-02', n: '02', label: 'LOOP' },
  { id: 'og-03', n: '03', label: 'GLOBAL MAP' },
  { id: 'og-04', n: '04', label: 'CITY RELAYS' },
  { id: 'og-05', n: '05', label: 'RELAY STATES' },
  { id: 'og-06', n: '06', label: 'CIPHER' },
  { id: 'og-07', n: '07', label: 'DISCORD' },
  { id: 'og-08', n: '08', label: 'CREATOR OPS' },
  { id: 'og-09', n: '09', label: 'IRL SIGNALS' },
  { id: 'og-10', n: '10', label: 'SIGNAL REPORT' },
];

/* Floating section index — same as IGIndex, uses .plan-index.red */
const OGIndex = () => {
  const [active, setActive] = useStateOG('og-01');
  useEffectOG(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px' });
    OG_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="plan-index">
      {OG_SECTIONS.map((s) => (
        <a key={s.id} className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <span className="bar"></span><span>{s.n}</span><span className="lbl">/ {s.label}</span>
        </a>
      ))}
    </nav>
  );
};

// ============= 01 FIELD BRIEF =============
const OGSec01 = ({ navigate }) => (
  <section id="og-01" className="section" style={{ borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <Breadcrumb trail={[
        { id: 'home', label: 'OVERVIEW' },
        { id: 'plan', label: '02 / CAMPAIGN PLAN' },
        { id: 'offgame', label: '02.2 / OFF-GAME OPS' },
      ]} navigate={navigate} />
      <div style={{ marginTop: 24 }}>
        <LabelRow color="var(--mi-red)">[OFF-GAME OPS] · 02.2 / GLOBAL SIGNAL OPERATIONS</LabelRow>
      </div>
      <OGMark n="01" k="FIELD BRIEF" sub=" / 游戏外行动总览" />
      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h1 className="display" style={{ fontSize: 'clamp(48px,7vw,96px)', margin: 0, lineHeight: 0.88 }}>
            GLOBAL<br />
            <span style={{ color: 'var(--mi-red)', fontStyle: 'italic' }}>SIGNAL</span><br />
            OPERATIONS
          </h1>
          <div style={{ marginTop: 10, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-secondary)' }}>游戏外行动方案</div>
          <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.75, margin: '20px 0 10px', maxWidth: 560 }}>
            游戏内负责让玩家完成任务；游戏外负责让任务被看见、被组织、被讨论，并再次导回游戏。
          </p>
          <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0, maxWidth: 560 }}>
            每一次实体情报硬盘撤离、每一次 Signal Tower 占领、每一次 Cipher Fragment 提交，都会进入游戏外系统：官网更新城市 Relay 状态，Discord 发布紧急简报，Creator 组织增援，社区继续破解下一段幽灵信号。
          </p>
        </div>
        <RevealOG dir="right" className="card" style={{ padding: '28px 32px' }}>
          <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 20 }}>// OFF-GAME SYSTEMS</div>
          {['Global Signal Map', 'City Relay Network', 'The Impossible Cipher', 'Discord Command Center', 'Creator Field Ops', 'IRL Signal Points', 'Weekly Signal Report'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
              <span style={{ width: 6, height: 6, background: 'var(--mi-red)', flexShrink: 0, opacity: 0.7 }}></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>{s}</span>
            </div>
          ))}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 6 }}>ROLE</div>
            <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>Turn gameplay into a live global operation.</div>
          </div>
        </RevealOG>
      </div>
    </div>
  </section>
);

// ============= 02 OFF-GAME LOOP =============
const OGSec02 = () => {
  const steps = [
    { n: '01', en: 'GAME ACTION', zh: '玩家在 Operations / Warfare 中完成联动目标', color: 'var(--df-green)' },
    { n: '02', en: 'PROGRESS UPLOAD', zh: '系统上传 Signal Defense Value 与 Cipher Fragment', color: 'var(--hud-cyan)' },
    { n: '03', en: 'RELAY UPDATE', zh: '官网 Global Signal Map 刷新城市 Relay 状态', color: 'var(--df-amber)' },
    { n: '04', en: 'COMMUNITY BRIEFING', zh: 'Discord 和 Reddit 发布紧急简报、城市战报和解谜线索', color: 'var(--mi-red)' },
    { n: '05', en: 'CREATOR MOBILIZATION', zh: 'Relay Captain 和 Cipher Hunter 组织粉丝增援或破译', color: 'var(--mi-red)' },
    { n: '06', en: 'RETURN TO GAME', zh: '玩家回到游戏完成反攻、提交碎片、推进 Final Extraction', color: 'var(--df-green)' },
  ];
  return (
    <section id="og-02" className="section" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="02" k="OFF-GAME LOOP" sub=" / 游戏内外反馈闭环" />
        <SectionHeader num="02" name="OFF-GAME LOOP" title={<>一条完整的<br />行动闭环</>} kicker="Off-Game 不是游戏外宣传，而是 Live-Ops 反馈层。它把「我打了一局」转化成「我的城市节点发生了变化」。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          <div>
            {steps.map((s, i) => (
              <RevealOG key={s.n} delay={i + 1}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color, fontWeight: 700 }}>{s.n}</span>
                    </div>
                    <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${s.color}, ${steps[Math.min(i + 1, steps.length - 1)].color})`, opacity: 0.4 }}></div>
                  </div>
                  <div style={{ paddingTop: 6, paddingBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', color: s.color, textTransform: 'uppercase', marginBottom: 4 }}>{s.en}</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.zh}</div>
                  </div>
                </div>
              </RevealOG>
            ))}
            <div style={{ marginLeft: 18 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)', letterSpacing: '0.16em', opacity: 0.6 }}>↺ LOOP BACK TO 01</span>
            </div>
          </div>
          <div>
            <RevealOG dir="right" className="card" style={{ padding: '32px 28px', marginBottom: 20, textAlign: 'center', border: '1px solid var(--mi-red)', background: 'rgba(224,24,26,0.04)' }}>
              <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 12 }}>LOOP CORE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, letterSpacing: '0.06em', color: 'var(--mi-red)', textTransform: 'uppercase', lineHeight: 1.15 }}>ROGUE SIGNAL<br />CORE</div>
              <div style={{ width: 32, height: 1, background: 'var(--mi-red)', margin: '16px auto' }}></div>
              <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-mute)', lineHeight: 1.65 }}>每一次行动，都向中央 Rogue Signal 核心汇聚数据。</div>
            </RevealOG>
            {steps.map((s, i) => (
              <RevealOG key={s.n} delay={i + 2} dir="right">
                <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px dashed var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: s.color, flexShrink: 0, paddingTop: 2, letterSpacing: '0.1em' }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color, letterSpacing: '0.12em', marginBottom: 3 }}>{s.en}</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.55 }}>{s.zh}</div>
                  </div>
                </div>
              </RevealOG>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= 03 GLOBAL SIGNAL MAP =============
const OGSec03 = () => {
  const [selected, setSelected] = useStateOG(2);
  const cities = [
    { id: 'liberty', name: 'LIBERTY RELAY', city: 'New York / NA East', status: 'Exposed', pct: 62, x: 22, y: 42 },
    { id: 'pacific', name: 'PACIFIC RELAY', city: 'Los Angeles / NA West', status: 'Stable', pct: 84, x: 12, y: 52 },
    { id: 'thames', name: 'THAMES RELAY', city: 'London / UK', status: 'Compromised', pct: 18, x: 47, y: 30 },
    { id: 'seine', name: 'SEINE RELAY', city: 'Paris / France', status: 'Stable', pct: 79, x: 50, y: 36 },
    { id: 'rhine', name: 'RHINE RELAY', city: 'Berlin / Germany', status: 'Exposed', pct: 55, x: 54, y: 28 },
    { id: 'aurora', name: 'AURORA RELAY', city: 'Stockholm / Nordics', status: 'Stable', pct: 91, x: 53, y: 20 },
    { id: 'iberia', name: 'IBERIA RELAY', city: 'Madrid / Mediterranean', status: 'Stable', pct: 73, x: 45, y: 40 },
    { id: 'atlantic', name: 'ATLANTIC RELAY', city: 'Toronto / East Coast', status: 'Exposed', pct: 48, x: 28, y: 32 },
  ];
  const statusColor = { Stable: 'var(--df-green)', Exposed: 'var(--df-amber)', Compromised: 'var(--mi-red)', Secured: '#c8a44a' };
  const sel = cities[selected];
  return (
    <section id="og-03" className="section" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="03" k="GLOBAL SIGNAL MAP" sub=" / 活动官网主控台" />
        <SectionHeader num="03" name="GLOBAL SIGNAL MAP" title={<>全球战况，<br />实时更新</>} kicker="玩家在这里选择城市 Relay、查看全服战况、追踪 Cipher 进度、领取个人战报，并被引导回游戏完成下一步行动。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: 20, marginBottom: 20 }}>
          <RevealOG dir="left" className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 18px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="ticker" style={{ color: 'var(--mi-red)' }}>// GLOBAL SIGNAL MAP — LIVE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-mute)', letterSpacing: '0.14em' }}>SDV GLOBAL: 67.4%</span>
            </div>
            <div style={{ position: 'relative', height: 260, background: 'linear-gradient(135deg, #050a0e 0%, #091218 100%)', overflow: 'hidden' }}>
              {[20, 40, 60, 80].map(p => (
                <React.Fragment key={p}>
                  <div style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.025)' }} />
                  <div style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.025)' }} />
                </React.Fragment>
              ))}
              <div style={{ position: 'absolute', left: '9%', top: '22%', width: '27%', height: '52%', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 3 }}></div>
              <div style={{ position: 'absolute', left: '43%', top: '14%', width: '20%', height: '52%', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 3 }}></div>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {[[0, 7], [7, 2], [2, 3], [3, 4], [4, 5], [3, 6], [1, 0]].map(([a, b], i) => (
                  <line key={i} x1={`${cities[a].x}%`} y1={`${cities[a].y}%`} x2={`${cities[b].x}%`} y2={`${cities[b].y}%`} stroke="rgba(224,24,26,0.10)" strokeWidth="1" strokeDasharray="4 5" />
                ))}
              </svg>
              {cities.map((c, i) => (
                <button key={c.id} onClick={() => setSelected(i)} style={{ position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%,-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <div style={{ width: selected === i ? 13 : 7, height: selected === i ? 13 : 7, background: statusColor[c.status], borderRadius: '50%', boxShadow: `0 0 ${selected === i ? 14 : 5}px ${statusColor[c.status]}`, transition: 'all 0.25s', opacity: selected === i ? 1 : 0.65 }}></div>
                  <div style={{ position: 'absolute', left: '50%', top: '100%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 7, color: statusColor[c.status], whiteSpace: 'nowrap', marginTop: 3, opacity: selected === i ? 1 : 0.45 }}>{c.id.toUpperCase()}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: '9px 18px', display: 'flex', gap: 18, background: 'var(--bg-elev)', borderTop: '1px solid var(--line)' }}>
              {[['Stable', 'var(--df-green)', 4], ['Exposed', 'var(--df-amber)', 3], ['Compromised', 'var(--mi-red)', 1], ['Secured', '#c8a44a', 0]].map(([s, c, count]) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, background: c, borderRadius: '50%' }}></div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: c, letterSpacing: '0.1em' }}>{s} ({count})</span>
                </div>
              ))}
            </div>
          </RevealOG>
          <RevealOG dir="right" className="card" style={{ padding: '22px 20px' }}>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 14 }}>SELECTED NODE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4, color: statusColor[sel.status] }}>{sel.name}</div>
            <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-mute)', marginBottom: 18 }}>{sel.city}</div>
            <div style={{ marginBottom: 14 }}>
              <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 6 }}>SIGNAL DEFENSE VALUE</div>
              <div style={{ height: 4, background: 'var(--bg-elev)', marginBottom: 6 }}>
                <div style={{ height: '100%', width: `${sel.pct}%`, background: statusColor[sel.status], transition: 'width 0.5s ease' }}></div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: statusColor[sel.status], fontWeight: 700 }}>{sel.pct}%</div>
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', border: `1px solid ${statusColor[sel.status]}`, marginBottom: 16 }}>
              <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 3 }}>NODE STATUS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: statusColor[sel.status], letterSpacing: '0.06em' }}>{sel.status.toUpperCase()}</div>
            </div>
            {["Today's Priority Mission", 'Join City Discord Channel', 'View Top Squads', 'Return to Game →'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: '1px dashed var(--line)', fontFamily: 'var(--font-mono)', fontSize: 9, color: i === 3 ? 'var(--mi-red)' : 'var(--text-mute)', letterSpacing: '0.08em' }}>
                <span style={{ color: 'var(--mi-red)', opacity: 0.6 }}>→</span><span>{item}</span>
              </div>
            ))}
          </RevealOG>
        </div>
        <RevealOG className="card" style={{ padding: '16px 24px' }}>
          <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 12 }}>// 玩家路径</div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
            {['进入官网', '选择城市 Relay', '查看节点状态', '领取今日任务提示', '加入 Discord 频道', '回游戏完成任务', '刷新贡献进度'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', padding: '6px 12px', background: 'var(--bg-elev)', border: '1px solid var(--line)' }}>{step}</div>
                {i < arr.length - 1 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mi-red)', padding: '0 4px' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </RevealOG>
      </div>
    </section>
  );
};

// ============= 04 CITY RELAY NETWORK =============
const OGSec04 = () => {
  const cities = [
    { relay: 'THAMES RELAY',  zh: '泰晤士节点', img: '泰晤士节点卡.png',  status: '暴露中', type: 'exposed',  defense: 72, cipher: '3 / 7' },
    { relay: 'LIBERTY RELAY', zh: '自由节点',   img: '自由节点卡.png',    status: '已稳固', type: 'secured',  defense: 89, cipher: '5 / 7' },
    { relay: 'PACIFIC RELAY', zh: '太平洋节点', img: '太平洋节点卡.png',  status: '被入侵', type: 'breached', defense: 41, cipher: '2 / 7' },
    { relay: 'RHINE RELAY',   zh: '莱茵节点',   img: '莱茵节点卡.png',    status: '已稳固', type: 'secured',  defense: 95, cipher: '6 / 7' },
    { relay: 'SEINE RELAY',   zh: '塞纳节点',   img: '塞纳节点卡.png',    status: '暴露中', type: 'exposed',  defense: 63, cipher: '4 / 7' },
    { relay: 'AURORA RELAY',  zh: '极光节点',   img: '极光节点.png',      status: '被入侵', type: 'breached', defense: 28, cipher: '1 / 7' },
  ];
  return (
    <section id="og-04" className="relay-nodes-section">
      <img src="图片素材/全球信号地图背景.png" alt="" className="relay-nodes-bg" />
      <div className="relay-nodes-overlay"></div>
      <div className="container relay-nodes-content">
        <OGMark n="04" k="CITY RELAY NETWORK" sub=" / 城市 Relay 系统" />
        <SectionHeader num="04" name="CITY RELAY NETWORK" title={<>守住你的<span style={{ color: 'var(--df-green)' }}>信号节点</span></>} kicker="选择一个城市Relay，完成任务，推动全球信号防卫进度。" accent="var(--df-green)" />
        <div className="relay-city-grid">
          {cities.map(city => {
            const barColor = city.type === 'breached' ? 'var(--mi-red)' : city.type === 'exposed' ? 'var(--df-amber)' : 'var(--df-green)';
            return (
              <div key={city.relay} className="relay-city-card">
                <div className="relay-city-img-wrap">
                  <img src={`图片素材/${city.img}`} alt={city.zh} className="relay-city-img" />
                  <div className="relay-city-img-bottom">
                    <span className="relay-city-name-en">{city.relay}</span>
                    <span className="relay-city-name-zh">{city.zh}</span>
                  </div>
                </div>
                <div className="relay-city-info">
                  <div className="relay-city-header">
                    <span className={`relay-status-badge relay-status-${city.type}`}>{city.status}</span>
                  </div>
                  <div className="relay-city-stats">
                    <div className="relay-stat">
                      <span className="relay-stat-label">信号防卫值</span>
                      <div className="relay-stat-bar-wrap">
                        <div className="relay-stat-bar" style={{ width: `${city.defense}%`, background: barColor }}></div>
                      </div>
                      <span className="relay-stat-val">{city.defense}%</span>
                    </div>
                    <div className="relay-stat">
                      <span className="relay-stat-label">密码碎片</span>
                      <span className="relay-stat-cipher">{city.cipher}</span>
                    </div>
                    <div className="relay-stat">
                      <span className="relay-stat-label">最高贡献小队</span>
                      <span className="relay-stat-classified">[ 机密 ]</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============= 05 RELAY STATE SYSTEM =============
const OGSec05 = () => {
  const [active, setActive] = useStateOG(2);
  const states = [
    { key: 'Stable', zh: '稳定', color: 'var(--df-green)', trigger: '防卫值高于安全阈值', web: '节点暗金稳定显示', community: '常规战报', game: '基础奖励' },
    { key: 'Exposed', zh: '暴露', color: 'var(--df-amber)', trigger: '防卫值下降或敌方扫描增强', web: '红色扫描线出现', community: '发布增援提示', game: '推荐该节点任务' },
    { key: 'Compromised', zh: '被入侵', color: 'var(--mi-red)', trigger: '防卫值低于阈值', web: '节点红色警报', community: 'Discord 紧急简报', game: '限时反攻任务' },
    { key: 'Secured', zh: '已守住', color: '#c8a44a', trigger: '反攻成功或达到目标', web: '节点锁定 / 金色状态', community: '发布胜利战报', game: '解锁城市奖励' },
  ];
  const s = states[active];
  return (
    <section id="og-05" className="section" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="05" k="RELAY STATE SYSTEM" sub=" / 节点状态与触发机制" />
        <SectionHeader num="05" name="RELAY STATE SYSTEM" title={<>状态机<br />驱动节奏</>} kicker="状态不是随机切换。它由游戏内贡献、社区破译进度和系统攻击窗口三类数据共同决定。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, marginBottom: 24 }}>
          <div>
            {states.map((st, i) => (
              <button key={st.key} onClick={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', background: active === i ? 'rgba(0,0,0,0.3)' : 'transparent', border: 'none', borderLeft: active === i ? `3px solid ${st.color}` : '3px solid transparent', cursor: 'pointer', textAlign: 'left', marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, background: st.color, borderRadius: '50%', flexShrink: 0, boxShadow: active === i ? `0 0 8px ${st.color}` : 'none' }}></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: st.color, letterSpacing: '0.12em' }}>{st.key.toUpperCase()}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-mute)', marginTop: 2 }}>{st.zh}</div>
                </div>
              </button>
            ))}
            <div style={{ margin: '8px 0 0 20px', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--mi-red)', letterSpacing: '0.12em', opacity: 0.5 }}>↑ 点击切换</div>
          </div>
          <div className="card" style={{ padding: '24px 28px', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, letterSpacing: '0.04em', color: s.color, textTransform: 'uppercase', marginBottom: 4 }}>{s.key}</div>
            <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 14, color: 'var(--text-mute)', marginBottom: 20 }}>{s.zh}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['触发条件', s.trigger], ['官网表现', s.web], ['社区动作', s.community], ['游戏内回流', s.game]].map(([label, val]) => (
                <div key={label} style={{ padding: '14px 16px', background: 'var(--bg-elev)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-mute)', letterSpacing: '0.14em', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RevealOG className="card" style={{ padding: '22px 28px', borderLeft: '3px solid var(--mi-red)', background: 'rgba(224,24,26,0.04)' }}>
          <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 14 }}>CASE EXAMPLE · THAMES RELAY — COMPROMISED WINDOW</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[['触发', '防卫值低于 20%'], ['持续', '24 小时'], ['官网', '节点变红，倒计时 + 增援 CTA'], ['Discord', '#thames-relay 紧急简报推送'], ['社区目标', '24h 内完成指定次数 Operations 硬盘撤离 + Warfare 信号塔']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-mute)', letterSpacing: '0.12em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </RevealOG>
      </div>
    </section>
  );
};

// ============= 06 THE IMPOSSIBLE CIPHER =============
const OGSec06 = () => {
  const sources = [
    { label: 'In-Game\nContracts', gate: '低', output: 'Cipher Fragment', role: '保证普通玩家参与', color: 'var(--df-green)', angle: -90 },
    { label: 'Global\nSignal Map', gate: '低', output: '地图坐标线索', role: '引导官网访问', color: 'var(--hud-cyan)', angle: -30 },
    { label: 'Discord\nChannels', gate: '中', output: '城市专属线索', role: '促进社区协作', color: 'var(--df-amber)', angle: 30 },
    { label: 'Creator\nMission Box', gate: '中高', output: '高价值线索', role: '制造视频内容', color: 'var(--df-amber)', angle: 90 },
    { label: 'IRL Signal\nPoints', gate: '中高', output: '城市二维码 / 坐标', role: '形成线下事件', color: 'var(--mi-red)', angle: 150 },
    { label: 'Weekly\nSignal Report', gate: '低', output: '汇总线索', role: '防止新玩家掉队', color: 'var(--hud-cyan)', angle: -150 },
  ];
  const tiers = [
    { n: 'TIER 1', label: '大众可参与', desc: '简单替换密码、坐标拼图、图像噪点、摩斯片段', color: 'var(--df-green)' },
    { n: 'TIER 2', label: '社区协作', desc: '不同城市频道掌握不同碎片，需要跨频道交换', color: 'var(--df-amber)' },
    { n: 'TIER 3', label: 'Creator 挑战', desc: '任务箱、线下坐标、限时直播破译', color: 'var(--mi-red)' },
    { n: 'TIER 4', label: 'Final Unlock', desc: '全服拼出中央 Ghost Relay 坐标，开启 Final Extraction', color: 'var(--mi-red)' },
  ];
  const cx0 = 190, cy0 = 185, radius = 135;
  return (
    <section id="og-06" className="section" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="06" k="THE IMPOSSIBLE CIPHER" sub=" / 全服谜题破解" />
        <SectionHeader num="06" name="THE IMPOSSIBLE CIPHER" title={<>不可能密码，<br />全服协作破解</>} kicker="失联 IMF 特工留下的情报被拆分成多个 Cipher Fragment。玩家需要把碎片拼回中央 Ghost Relay 坐标。当全服破解进度达到 100%，Final Extraction 解锁。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 32, marginBottom: 28, alignItems: 'center' }}>
          <div style={{ position: 'relative', height: 380 }}>
            <div style={{ position: 'absolute', left: cx0, top: cy0, transform: 'translate(-50%,-50%)', width: 96, height: 96, border: '2px solid var(--mi-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(224,24,26,0.08)', zIndex: 2 }}>
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 900, color: 'var(--mi-red)', letterSpacing: '0.1em', lineHeight: 1.4 }}>CIPHER<br />CORE</div>
            </div>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {sources.map((src, i) => {
                const rad = src.angle * Math.PI / 180;
                const nx = cx0 + Math.cos(rad) * radius;
                const ny = cy0 + Math.sin(rad) * radius;
                return <line key={i} x1={nx} y1={ny} x2={cx0} y2={cy0} stroke={src.color} strokeWidth="1" strokeDasharray="3 5" opacity="0.3" />;
              })}
            </svg>
            {sources.map((src, i) => {
              const rad = src.angle * Math.PI / 180;
              const nx = cx0 + Math.cos(rad) * radius;
              const ny = cy0 + Math.sin(rad) * radius;
              return (
                <div key={i} style={{ position: 'absolute', left: nx, top: ny, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                  <div style={{ padding: '7px 10px', border: `1px solid ${src.color}`, background: 'rgba(5,7,7,0.9)', textAlign: 'center', minWidth: 76 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: src.color, letterSpacing: '0.08em', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{src.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <OGDivider label="6.1 · Cipher 来源 × 参与门槛" />
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '10px 18px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
                <span className="ticker">// 来源 / 门槛 / 产出 / 作用</span>
              </div>
              {sources.map((src, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 36px 1fr', gap: 12, alignItems: 'center', padding: '11px 18px', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: src.color, letterSpacing: '0.06em' }}>{src.label.replace('\n', ' ')}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-mute)', textAlign: 'center' }}>{src.gate}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{src.output}<br /><span style={{ color: 'var(--text-mute)', fontSize: 11 }}>{src.role}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OGDivider label="6.2 · 谜题层级" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
          {tiers.map((t, i) => (
            <RevealOG key={t.n} delay={i + 1} className="card" style={{ padding: '18px 16px', borderTop: `3px solid ${t.color}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: t.color, letterSpacing: '0.18em', marginBottom: 6 }}>{t.n}</div>
              <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 10 }}>{t.label}</div>
              <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.6 }}>{t.desc}</div>
            </RevealOG>
          ))}
        </div>
        <RevealOG className="card" style={{ padding: '16px 24px', borderLeft: '3px solid var(--df-green)' }}>
          <div className="ticker" style={{ marginBottom: 10, color: 'var(--df-green)' }}>// 防止 ARG 劝退</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['每周发布 Signal Report，汇总已解线索', '官网提供进度提示，不让玩家完全卡死', '核心奖励不只给解谜高手，普通玩家通过游戏内任务也能贡献', '高难谜题只用于彩蛋和荣誉，不影响基础参与'].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--df-green)', flexShrink: 0 }}>✓</span><span>{p}</span>
              </div>
            ))}
          </div>
        </RevealOG>
        <OGDivider label="6.3 · ENTITY INTERFERENCE — 反派 AI 干扰机制" />
        <RevealOG className="card" style={{ padding: '22px 24px', border: '1px solid rgba(224,24,26,0.4)', background: 'rgba(224,24,26,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 15, letterSpacing: '0.12em', color: 'var(--mi-red)', animation: 'glitchA 3s infinite' }}>ENTITY INTERFERENCE</div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(224,24,26,0.5), transparent)' }}></div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)', border: '1px solid var(--mi-red)', padding: '2px 8px', letterSpacing: '0.14em' }}>ACTIVE</div>
          </div>
          <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20, maxWidth: 680 }}>
            反派 AI "GHOST" 将在活动中途制造干扰事件——地图闪烁、Discord 乱码、Creator 音频劫持。干扰不破坏游戏体验，但推动剧情、制造社区爆点，并强化 ARG 氛围。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 18 }}>
            {[
              { trigger: 'Global Signal Map', zh: '全球地图', event: '节点坐标闪烁 / 乱码入侵', icon: '◈', idx: '01' },
              { trigger: 'Discord Briefing', zh: 'Discord 简报', event: '异常代码块注入频道', icon: '◉', idx: '02' },
              { trigger: 'Creator Stream', zh: 'Creator 直播', event: '音频劫持 / 乱码字幕叠加', icon: '◐', idx: '03' },
              { trigger: 'Weekly Report', zh: '每周战报', event: '坐标数据部分遮挡', icon: '◑', idx: '04' },
              { trigger: 'Final Week', zh: '终章倒计时', event: '全渠道大规模干扰爆发', icon: '▣', idx: '05' },
            ].map((item) => (
              <div key={item.idx} style={{ padding: '14px 12px', background: 'var(--bg-elev)', border: '1px solid rgba(224,24,26,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'rgba(224,24,26,0.15)', position: 'absolute', top: 8, right: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--mi-red)', letterSpacing: '0.14em', marginBottom: 4 }}>TRIGGER {item.idx}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 2, lineHeight: 1.2 }}>{item.trigger}</div>
                <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 9, color: 'var(--text-mute)', marginBottom: 10 }}>{item.zh}</div>
                <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.event}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['GHOST RELAY OVERRIDE', 'SIGNAL CORRUPTED', 'ENTITY TRACE DETECTED'].map((txt, i) => (
              <div key={txt} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)', border: '1px dashed rgba(224,24,26,0.5)', padding: '4px 12px', letterSpacing: '0.18em', animation: `glitchA ${2 + i * 0.7}s infinite` }}>{txt}</div>
            ))}
          </div>
        </RevealOG>
      </div>
    </section>
  );
};

// ============= 07 DISCORD COMMAND CENTER =============
const OGSec07 = () => {
  const channels = [
    { name: '#mission-briefing', desc: '官方总任务简报', alert: false },
    { name: '#global-signal-map', desc: '全服战况更新', alert: false },
    { name: '#thames-relay', desc: '城市节点频道 · COMPROMISED', alert: true },
    { name: '#liberty-relay', desc: '城市节点频道', alert: false },
    { name: '#cipher-hunt', desc: '全服解谜讨论', alert: false },
    { name: '#squad-finder', desc: '组队招募', alert: false },
    { name: '#creator-live', desc: 'Creator 开播提醒', alert: false },
    { name: '#after-action-report', desc: '战报与高光投稿', alert: false },
  ];
  const schedule = [
    { time: '09:00 UTC', title: 'Daily Briefing', desc: '今日优先节点、任务目标、Cipher 提示' },
    { time: '18:00 UTC', title: 'Relay Status Update', desc: '城市排名、告急节点、Creator 开播提醒' },
    { time: '22:00 UTC', title: 'Emergency Window', desc: 'Compromised 节点限时增援任务' },
    { time: 'Weekly', title: 'Signal Report', desc: '社区破译进度 + 周战报' },
  ];
  const feed = [
    { sender: 'SIGNAL_BOT', role: 'SYSTEM', color: 'var(--mi-red)', msg: '⚠ THAMES RELAY — COMPROMISED. 防卫值 18%。限时增援窗口开启，持续 24 小时。', time: '22:00' },
    { sender: 'FIELD_OPS', role: 'OFFICIAL', color: 'var(--df-amber)', msg: '今日优先任务：Operations 硬盘撤离 × 3，Warfare Signal Tower × 2。完成可获得额外城市贡献。', time: '22:01' },
    { sender: 'SpecterSix', role: 'RELAY CAPTAIN', color: 'var(--hud-cyan)', msg: '我在线，带队防守。两小时后开播，Thames 城市推进。加入 squad 用 !join', time: '22:04' },
    { sender: 'CipherRunner', role: 'COMMUNITY', color: 'var(--df-green)', msg: '#cipher-hunt 那边解出了新坐标线索，可能和 Thames 有关，有人来对比下？', time: '22:09' },
    { sender: 'SIGNAL_BOT', role: 'SYSTEM', color: 'var(--mi-red)', msg: '进度更新：Thames 防卫值 22%（+4%）。增援有效，继续推进。', time: '22:31' },
  ];
  return (
    <section id="og-07" className="section" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="07" k="DISCORD COMMAND CENTER" sub=" / Discord 城市指挥中心" />
        <SectionHeader num="07" name="DISCORD COMMAND CENTER" title={<>城市频道，<br />Relay 作战室</>} kicker="每个 Relay 拥有独立频道，官方每日发布任务、战报、线索和 Creator 开播提醒。玩家在这里交换 Cipher 线索、组织小队、报名城市增援。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr 250px', gap: 16 }}>
          <RevealOG dir="left" className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '9px 14px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
              <span className="ticker" style={{ fontSize: 9 }}>// CHANNELS</span>
            </div>
            {channels.map((ch, i) => (
              <div key={ch.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 12px', borderTop: i ? '1px solid rgba(255,255,255,0.03)' : 'none', background: ch.alert ? 'rgba(224,24,26,0.07)' : 'transparent' }}>
                {ch.alert && <div style={{ width: 5, height: 5, background: 'var(--mi-red)', borderRadius: '50%', flexShrink: 0, marginTop: 4, boxShadow: '0 0 5px var(--mi-red)' }}></div>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: ch.alert ? 'var(--mi-red)' : 'var(--text-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.name}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 10, color: 'var(--text-mute)', marginTop: 1, lineHeight: 1.3 }}>{ch.desc}</div>
                </div>
              </div>
            ))}
          </RevealOG>
          <RevealOG className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '9px 16px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 5, height: 5, background: 'var(--mi-red)', borderRadius: '50%', boxShadow: '0 0 6px var(--mi-red)' }}></div>
              <span className="ticker" style={{ fontSize: 9, color: 'var(--mi-red)' }}>// #thames-relay — COMPROMISED</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {feed.map((m, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: m.color, letterSpacing: '0.08em' }}>{m.sender}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-mute)', border: `1px solid ${m.color}`, padding: '1px 5px' }}>{m.role}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-mute)', marginLeft: 'auto' }}>{m.time}</span>
                  </div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.msg}</div>
                </div>
              ))}
            </div>
          </RevealOG>
          <RevealOG dir="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="card" style={{ padding: '16px 16px', borderTop: '3px solid var(--mi-red)' }}>
                <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 10 }}>// 今日优先任务</div>
                {['Operations 硬盘撤离', 'Warfare Signal Tower ×2', 'Cipher Fragment 提交'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--mi-red)', fontFamily: 'var(--font-mono)', fontSize: 9, flexShrink: 0 }}>→</span><span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: '16px 16px' }}>
                <div className="ticker" style={{ marginBottom: 10 }}>// 每日节奏</div>
                {schedule.map((s, i) => (
                  <div key={i} style={{ padding: '8px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--df-amber)', letterSpacing: '0.1em', marginBottom: 2 }}>{s.time}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 10, color: 'var(--text-mute)', lineHeight: 1.45 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOG>
        </div>
        <OGDivider label="7.2 · Cross-platform Drops / Discord Relay Rewards" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 16 }}>
          <RevealOG dir="left" className="card" style={{ padding: '20px 20px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 16 }}>// DROP 获取路径</div>
            {[
              '完成游戏内城市 Relay 任务',
              '在 Discord 提交任务截图',
              '参与每日 Briefing 签到',
              'Creator 直播观看 + 互动',
              '每周 Signal Report 分享',
            ].map((step, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, border: '1px solid var(--hud-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--hud-cyan)' }}>0{i + 1}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 1, height: 18, background: 'rgba(0,212,255,0.2)' }}></div>}
                </div>
                <div style={{ paddingTop: 4, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, minHeight: i < arr.length - 1 ? 40 : 'auto' }}>{step}</div>
              </div>
            ))}
          </RevealOG>
          <RevealOG className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 18px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="ticker" style={{ fontSize: 9 }}>// RELAY REWARD TABLE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)' }}>DROP / RARITY</span>
            </div>
            {[
              { drop: 'City Relay Charm', zh: '城市节点挂件', rarity: 'RARE', color: 'var(--hud-cyan)' },
              { drop: 'Signal Knife Skin', zh: '信号刀皮肤', rarity: 'EPIC', color: 'var(--df-amber)' },
              { drop: 'Operator Card Frame', zh: '玩家名片边框', rarity: 'RARE', color: 'var(--hud-cyan)' },
              { drop: 'Cipher Tag', zh: '密码破译标签', rarity: 'COMMON', color: 'var(--df-green)' },
              { drop: 'Ghost Intel File', zh: 'GHOST 情报档案', rarity: 'LEGENDARY', color: 'var(--mi-red)' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '3px 1fr auto', gap: 14, alignItems: 'center', padding: '11px 18px', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                <div style={{ width: 3, height: 32, background: row.color }}></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 2 }}>{row.drop}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 10, color: 'var(--text-mute)' }}>{row.zh}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: row.color, border: `1px solid ${row.color}`, padding: '2px 7px', letterSpacing: '0.12em', flexShrink: 0, whiteSpace: 'nowrap' }}>{row.rarity}</div>
              </div>
            ))}
          </RevealOG>
          <RevealOG dir="right" className="card" style={{ padding: '20px 18px', borderTop: '3px solid var(--hud-cyan)' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 14 }}>// DROP 示例</div>
            <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--line)', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ paddingBottom: '75%', position: 'relative', background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,0,0,0) 60%)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                  <div style={{ width: 48, height: 48, border: '2px dashed rgba(0,212,255,0.35)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(0,212,255,0.45)', letterSpacing: '0.06em' }}>CHARM</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'rgba(0,212,255,0.3)', letterSpacing: '0.1em' }}>3D ASSET</div>
                </div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', marginBottom: 4 }}>THAMES RELAY CHARM</div>
            <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-mute)', marginBottom: 12 }}>泰晤士节点挂件</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--hud-cyan)', border: '1px solid var(--hud-cyan)', padding: '2px 8px', display: 'inline-block', letterSpacing: '0.12em', marginBottom: 12 }}>RARE</div>
            <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.55 }}>完成 Thames Relay 防卫任务并在 Discord 提交证明，限时掉落。</div>
          </RevealOG>
        </div>
      </div>
    </section>
  );
};

// ============= 08 CREATOR FIELD OPS =============
const OGSec08 = () => {
  const categories = [
    {
      code: 'CAT-01', type: '破圈挑战 KOL', en: 'VIRAL CHALLENGE', color: 'var(--df-amber)',
      desc: '超越游戏圈层，触达主流娱乐受众',
      kols: [
        { name: 'MrBeast', handle: '@MrBeast', platform: 'YouTube / TikTok', reach: '340M+', role: '城市挑战发起', task: '城市 Relay 挑战赛' },
        { name: 'Dude Perfect', handle: '@DudePerfect', platform: 'YouTube', reach: '61M', role: '团队挑战执行', task: '小队协作任务' },
        { name: 'Storror', handle: '@Storror', platform: 'YouTube', reach: '5.8M', role: '城市信号点突破', task: '线下城市线索任务' },
        { name: 'Yes Theory', handle: '@YesTheory', platform: 'YouTube', reach: '9.2M', role: 'ARG 参与探索', task: '城市任务与挑战' },
      ],
    },
    {
      code: 'CAT-02', type: 'FPS 直播 KOL', en: 'FPS LIVE OPS', color: 'var(--mi-red)',
      desc: '核心战斗玩家触达，Relay 防卫主力军',
      kols: [
        { name: 'shroud', handle: '@shroud', platform: 'Twitch', reach: '10.5M', role: 'Relay 城市队长', task: '带队守城市节点' },
        { name: 'TimTheTatman', handle: '@timthetatman', platform: 'Twitch / YouTube', reach: '8.9M', role: '小队组织者', task: '联队 Relay 推进' },
        { name: 'DrLupo', handle: '@DrLupo', platform: 'Twitch', reach: '4.9M', role: '战术指挥官', task: '城市增援任务' },
        { name: 'StoneMountain64', handle: '@StoneMountain64', platform: 'YouTube', reach: '3.1M', role: '战场控制者', task: 'Relay 节点防守' },
        { name: 'TheBrokenMachine', handle: '@TheBrokenMachine', platform: 'YouTube', reach: '1.4M', role: '硬核战术解析', task: '机制教学直播' },
      ],
    },
    {
      code: 'CAT-03', type: '解谜 KOL', en: 'CIPHER HUNTER', color: 'var(--hud-cyan)',
      desc: 'ARG 破译主力，驱动社区解谜与线索整合',
      kols: [
        { name: 'LVNDMARK', handle: '@LVNDMARK', platform: 'Twitch', reach: '580K', role: 'Cipher 首解者', task: 'ARG 线索破译直播' },
        { name: 'Pestily', handle: '@Pestily', platform: 'Twitch', reach: '620K', role: '密码猎人', task: 'Cipher 解谜组织' },
        { name: 'Sacriel', handle: '@Sacriel', platform: 'Twitch', reach: '420K', role: '社区协作主导', task: 'Discord 解谜协调' },
        { name: 'OperatorDrewski', handle: '@OperatorDrewski', platform: 'YouTube', reach: '1.5M', role: '情报收集者', task: '线索整理与视频' },
        { name: 'Klean', handle: '@KleanKarma', platform: 'Twitch', reach: '320K', role: 'ARG 情报分析', task: '加密信息解读' },
      ],
    },
    {
      code: 'CAT-04', type: '战术内容 KOL', en: 'TACTICAL ANALYST', color: 'var(--df-green)',
      desc: '深度玩法解析与机制教学，长视频主力',
      kols: [
        { name: 'jackfrags', handle: '@jackfrags', platform: 'YouTube', reach: '4.6M', role: '战术解析师', task: '机制深度评测' },
        { name: 'Westie', handle: '@WestieYT', platform: 'YouTube', reach: '1.3M', role: '攻略制作者', task: '武器与打法攻略' },
        { name: 'LevelCapGaming', handle: '@LevelCapGaming', platform: 'YouTube', reach: '2.9M', role: '系统评测专家', task: '完整机制解析' },
        { name: 'Tomographic', handle: '@Tomographic', platform: 'YouTube', reach: '780K', role: '情报地图制作', task: 'Relay 路线规划' },
        { name: 'Stodeh', handle: '@Stodeh', platform: 'YouTube', reach: '1.1M', role: '高手演示者', task: '精英玩法展示' },
      ],
    },
    {
      code: 'CAT-05', type: '短视频高光 KOL', en: 'SHORTS / LORE OPS', color: 'var(--df-amber)',
      desc: '剧情叙事 ARG 理论与高光剪辑，破圈传播',
      kols: [
        { name: 'MatPat', handle: '@MatPatGT', platform: 'YouTube', reach: '18.9M', role: '叙事分析者', task: 'ARG 剧情推理视频' },
        { name: 'Wendigoon', handle: '@Wendigoon', platform: 'YouTube', reach: '3.2M', role: '阴谋论探索者', task: 'GHOST 背景故事' },
        { name: 'Nexpo', handle: '@Nexpo', platform: 'YouTube', reach: '2.8M', role: '神秘事件记录', task: 'ARG 事件纪录片' },
        { name: 'Night Mind', handle: '@NightMind', platform: 'YouTube', reach: '1.1M', role: 'ARG 解析专家', task: 'Cipher 破译指南' },
        { name: 'Discord KOL', handle: '@各城市频道', platform: 'Discord', reach: '社区核心', role: '频道意见领袖', task: 'Relay 频道运营' },
      ],
    },
  ];
  const taskFlow = [
    '收到 MISSION BRIEFING BOX（实体任务箱）',
    '解锁加密硬盘 / 紫外线线索卡',
    '直播或录制破译全程',
    '组织粉丝进游戏参与 Relay 防卫',
    '官网 Creator 专属入口提交进度',
    '贡献同步至 Global Signal Map',
    '周战报记录 Creator 城市战绩',
  ];
  return (
    <section id="og-08" className="section" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="08" k="CREATOR FIELD OPS" sub=" / Creator 分类作战" />
        <SectionHeader num="08" name="CREATOR FIELD OPS" title={<>五类 Creator，<br />全域行动网络</>} kicker="按创作类型分工，五类 Creator 从游戏内到社区到现实触点形成完整内容生态。每位 Creator 都有专属角色与任务，照片位置已预留。" accent="var(--mi-red)" />
        {categories.map((cat) => (
          <div key={cat.code} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${cat.color}40` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: cat.color, letterSpacing: '0.18em', border: `1px solid ${cat.color}`, padding: '3px 10px' }}>{cat.code}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, letterSpacing: '0.08em' }}>{cat.en}</div>
              <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: cat.color }}>/ {cat.type}</div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}30, transparent)` }}></div>
              <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>{cat.desc}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cat.kols.length}, 1fr)`, gap: 12 }}>
              {cat.kols.map((kol, ki) => (
                <RevealOG key={kol.name} delay={ki + 1} className="card" style={{ padding: 0, overflow: 'hidden', borderTop: `2px solid ${cat.color}` }}>
                  <div style={{ paddingBottom: '80%', position: 'relative', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                      <div style={{ width: 56, height: 56, border: `2px dashed ${cat.color}50`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: `${cat.color}80`, letterSpacing: '0.04em' }}>PHOTO</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-mute)', letterSpacing: '0.08em' }}>CREATOR IMG</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 2 }}>{kol.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: cat.color, marginBottom: 6 }}>{kol.handle}</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 10, color: 'var(--text-mute)', marginBottom: 10, lineHeight: 1.4 }}>{kol.platform} · {kol.reach}</div>
                    {[['ROLE', kol.role], ['TASK', kol.task]].map(([k, v]) => (
                      <div key={k} style={{ padding: '6px 0', borderTop: '1px dashed var(--line)' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--text-mute)', letterSpacing: '0.1em', marginBottom: 2 }}>{k}</div>
                        <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </RevealOG>
              ))}
            </div>
          </div>
        ))}
        <OGDivider label="8.6 · Creator 任务流" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <RevealOG dir="left" className="card" style={{ padding: '22px 24px' }}>
            <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 16 }}>// MISSION BRIEFING BOX 内容</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['加密硬盘道具', '城市 Relay 坐标卡', '紫外线线索卡', '抽象二维码', '红色信号灯', '一次性密码页', '任务简报音频', '官网个人入口码'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', background: 'var(--bg-elev)', border: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--df-amber)', flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </RevealOG>
          <RevealOG dir="right" className="card" style={{ padding: '22px 24px' }}>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 16 }}>// Creator 任务流</div>
            {taskFlow.map((step, i, arr) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, border: '2px solid var(--mi-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)' }}>0{i + 1}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 1, height: 22, background: 'var(--mi-red)', opacity: 0.25 }}></div>}
                </div>
                <div style={{ paddingTop: 6, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, minHeight: i < arr.length - 1 ? 50 : 'auto' }}>{step}</div>
              </div>
            ))}
          </RevealOG>
        </div>
      </div>
    </section>
  );
};

// ============= 09 IRL SIGNAL POINTS =============
const OGSec09 = () => {
  const points = [
    { type: 'Digital OOH', location: '伦敦 / 纽约 / 洛杉矶数字屏', content: 'Rogue Signal Detected + QR', color: 'var(--mi-red)' },
    { type: 'Esports Bar / LAN', location: '电竞酒吧 / PC café', content: '城市 Relay 任务卡', color: 'var(--df-amber)' },
    { type: 'Cinema Pre-Roll', location: '影院周边', content: '任务简报短片 / 二维码', color: 'var(--df-amber)' },
    { type: 'Campus Esports', location: '高校电竞社群', content: '城市挑战赛', color: 'var(--hud-cyan)' },
    { type: 'Event Booth', location: 'Gamescom 等活动', content: '任务箱展示 / 现场解谜', color: 'var(--df-green)' },
  ];
  return (
    <section id="og-09" className="section" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="09" k="IRL SIGNAL POINTS" sub=" / 线下城市信号点" />
        <SectionHeader num="09" name="IRL SIGNAL POINTS" title={<>现实触点，<br />安全可控</>} kicker="线下不做「城市被攻击」表达，也不做高风险户外挑战。只做安全公共空间中的信号线索触点：数字屏、电竞酒吧、影院周边、活动展会和校园电竞社群。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {points.map((p, i) => (
              <RevealOG key={p.type} delay={i + 1} dir="left" className="card" style={{ padding: '16px 20px', borderLeft: `3px solid ${p.color}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: p.color, letterSpacing: '0.12em', marginBottom: 4 }}>TYPE</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.02em' }}>{p.type}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.12em', marginBottom: 4 }}>位置</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{p.location}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.12em', marginBottom: 4 }}>内容</div>
                    <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{p.content}</div>
                  </div>
                </div>
              </RevealOG>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <RevealOG dir="right" className="card" style={{ padding: '20px 24px', borderTop: '3px solid var(--df-green)' }}>
              <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 14 }}>// 推荐文案</div>
              {['ROGUE SIGNAL DETECTED', 'THAMES RELAY EXPOSED', 'ACCEPT MISSION', 'SIGNAL BREACH IN PROGRESS', 'SCAN TO JOIN CITY RELAY'].map((t, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text-primary)', padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                  <span style={{ color: 'var(--df-green)', marginRight: 8, fontFamily: 'var(--font-mono)', fontSize: 9 }}>✓</span>{t}
                </div>
              ))}
            </RevealOG>
            <RevealOG delay={2} dir="right" className="card" style={{ padding: '20px 24px', borderTop: '3px solid var(--mi-red)' }}>
              <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 14 }}>// 禁止文案</div>
              {['London under attack', 'New York invaded', 'Paris has fallen', 'City destroyed'].map((t, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-mute)', padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', textDecoration: 'line-through', textDecorationColor: 'var(--mi-red)' }}>
                  <span style={{ color: 'var(--mi-red)', marginRight: 8, fontFamily: 'var(--font-mono)', fontSize: 9, textDecoration: 'none', display: 'inline-block' }}>✕</span>{t}
                </div>
              ))}
            </RevealOG>
          </div>
        </div>
        <RevealOG className="card" style={{ padding: '16px 24px' }}>
          <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 12 }}>// 二维码跳转规则</div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
            {['扫码进入城市 Relay 页面', '选择城市节点', '领取低门槛任务提示', '加入 Discord 城市频道', '回到游戏完成任务'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', padding: '6px 12px', background: 'var(--bg-elev)', border: '1px solid var(--line)' }}>{step}</div>
                {i < arr.length - 1 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mi-red)', padding: '0 4px' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </RevealOG>
      </div>
    </section>
  );
};

// ============= INTEL FILE CARD =============
const OGIntelCard = () => {
  const [phase, setPhase] = useStateOG(0);
  const phases = ['SCANNING...', 'GENERATING...', 'READY'];
  useEffectOG(() => {
    if (phase < 2) {
      const t = setTimeout(() => setPhase(p => p + 1), 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);
  const fields = [
    { key: 'OPERATOR ID', value: 'OP-7742-DELTA', color: 'var(--hud-cyan)' },
    { key: 'ASSIGNED RELAY', value: 'THAMES RELAY', color: 'var(--mi-red)' },
    { key: 'SIGNAL CONTRIBUTION', value: '2,847 pts', color: 'var(--df-green)' },
    { key: 'EXTRACTION RECORD', value: '12 / 15 ops', color: 'var(--df-amber)' },
    { key: 'CIPHER ROLE', value: 'TIER III — ANALYST', color: 'var(--hud-cyan)' },
    { key: 'WEEKLY RANK', value: '#48 / THAMES', color: 'var(--df-amber)' },
  ];
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--hud-cyan)' }}>
      <div style={{ padding: '10px 18px', background: 'rgba(0,212,255,0.06)', borderBottom: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 11, letterSpacing: '0.12em', color: 'var(--hud-cyan)' }}>INTELLIGENCE FILE</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.1em', marginTop: 2 }}>OPERATION ROGUE SIGNAL</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: phase < 2 ? 'var(--df-amber)' : 'var(--df-green)', letterSpacing: '0.12em' }}>{phases[phase]}</div>
      </div>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 52, height: 52, border: '2px dashed rgba(0,212,255,0.4)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'rgba(0,212,255,0.5)', textAlign: 'center' }}>PHOTO</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, letterSpacing: '0.06em', marginBottom: 2 }}>CODENAME: DELTA</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.08em' }}>ACTIVE OPERATOR · THAMES UNIT</div>
        </div>
      </div>
      <div style={{ padding: '4px 18px 14px' }}>
        {fields.map((f, i) => (
          <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 0', borderBottom: i < fields.length - 1 ? '1px dashed var(--line)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.06em' }}>{f.key}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: f.color, letterSpacing: '0.05em', textAlign: 'right' }}>{phase < 2 && i > 2 ? '██████' : f.value}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
        {[{ label: 'X / TWITTER', color: 'var(--text-secondary)' }, { label: 'INSTAGRAM', color: 'var(--df-amber)' }, { label: 'DISCORD', color: 'var(--hud-cyan)' }].map(btn => (
          <button key={btn.label} style={{ flex: 1, padding: '7px 0', background: 'transparent', border: `1px solid ${btn.color}50`, fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.1em', color: btn.color, cursor: 'pointer', textTransform: 'uppercase' }}>{btn.label}</button>
        ))}
      </div>
    </div>
  );
};

// ============= 10 WEEKLY SIGNAL REPORT =============
const OGSec10 = ({ navigate }) => {
  const blocks = [
    { label: 'Relay Status', desc: '城市节点状态变化', color: 'var(--mi-red)' },
    { label: 'Top Squads', desc: '贡献最高小队', color: 'var(--df-green)' },
    { label: 'Creator Standings', desc: 'Creator 城市队长排名', color: 'var(--df-amber)' },
    { label: 'Cipher Progress', desc: '当前破译进度', color: 'var(--hud-cyan)' },
    { label: 'Mission of the Week', desc: '下周优先任务', color: 'var(--df-amber)' },
    { label: 'Community Highlights', desc: '玩家高光与解谜贡献', color: 'var(--df-green)' },
    { label: 'Next Threat Forecast', desc: '下一个可能告急节点', color: 'var(--mi-red)' },
  ];
  const channels = ['Website', 'Reddit', 'Discord', 'Shorts', 'Creator Stream'];
  return (
    <section id="og-10" className="section" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <OGMark n="10" k="WEEKLY SIGNAL REPORT" sub=" / 每周战报与社区叙事" />
        <SectionHeader num="10" name="WEEKLY SIGNAL REPORT" title={<>每周战报，<br />下周行动入口</>} kicker="每周战报不是总结，而是下一周行动的入口。它告诉玩家：哪个 Relay 告急、哪个城市守住了、哪个 Creator 小队贡献最高、哪个 Cipher 线索还没解。" accent="var(--mi-red)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <RevealOG dir="left" className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 12, letterSpacing: '0.08em' }}>WEEKLY SIGNAL REPORT</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)', letterSpacing: '0.14em' }}>WEEK 04</span>
            </div>
            {blocks.map((b, i) => (
              <div key={b.label} style={{ display: 'grid', gridTemplateColumns: '4px 1fr', gap: 16, alignItems: 'center', padding: '12px 20px', borderTop: i ? '1px dashed var(--line)' : 'none', background: i === 6 ? 'rgba(224,24,26,0.04)' : 'transparent' }}>
                <div style={{ width: 4, height: 28, background: b.color, flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: b.color, letterSpacing: '0.1em', marginBottom: 2 }}>{b.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-mute)' }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </RevealOG>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <RevealOG dir="right" className="card" style={{ padding: '20px 24px' }}>
              <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 16 }}>// 发布渠道</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {channels.map((ch, i) => (
                  <div key={ch} style={{ padding: '7px 16px', border: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.1em', background: 'var(--bg-elev)' }}>
                    <span style={{ color: 'var(--mi-red)', marginRight: 6, opacity: 0.6 }}>0{i + 1}</span>{ch}
                  </div>
                ))}
              </div>
            </RevealOG>
            <RevealOG delay={2} dir="right" className="card" style={{ padding: '28px 28px', background: 'rgba(224,24,26,0.06)', border: '1px solid var(--mi-red)' }}>
              <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 14 }}>SIGNAL STATUS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, letterSpacing: '0.04em', color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: 10 }}>
                THE SIGNAL<br /><span style={{ color: 'var(--mi-red)' }}>NEVER STOPS.</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.14em', marginBottom: 24 }}>NEXT BRIEFING DEPLOYS IN 24H</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => navigate('marketing')} style={{ flex: 1, padding: '13px 0', background: 'var(--mi-red)', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, letterSpacing: '0.08em', color: '#fff', cursor: 'pointer', textTransform: 'uppercase' }}>
                  GTM / MARKETING →
                </button>
                <button onClick={() => navigate('ingame')} style={{ padding: '13px 20px', background: 'transparent', border: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-mute)', cursor: 'pointer' }}>
                  ← IN-GAME OPS
                </button>
              </div>
            </RevealOG>
          </div>
        </div>
        <OGDivider label="10.2 · Personalized Intelligence File — 个人情报档案" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <RevealOG dir="left" className="card" style={{ padding: '28px 28px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 16 }}>// PERSONALIZED INTELLIGENCE FILE</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: 16, color: 'var(--text-primary)' }}>
              你的<span style={{ color: 'var(--hud-cyan)' }}>行动档案</span>，<br />每周生成
            </h3>
            <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
              活动结束后，每位参与玩家都会获得一份由系统生成的专属情报档案——记录你的城市贡献、Cipher 解谜进度、完成的 Relay 任务和周排名，像真正的 IMF 特工档案一样可视化，直接分享。
            </p>
            <div>
              {[
                { label: 'ACTIVATION', value: '完成任意一次 Relay 任务后自动生成' },
                { label: 'UPDATE', value: '每周五 22:00 UTC 刷新' },
                { label: 'FORMAT', value: '竖图卡 — 适配 Story / Tweet / Discord' },
                { label: 'DATA SOURCE', value: '游戏内数据 + Discord 互动 + Creator 协作' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, padding: '10px 0', borderTop: '1px dashed var(--line)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-mute)', letterSpacing: '0.1em', paddingTop: 2 }}>{label}</div>
                  <div style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
          </RevealOG>
          <RevealOG delay={2} dir="right">
            <OGIntelCard />
          </RevealOG>
        </div>
        <RevealOG delay={3} style={{ marginTop: 24, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 0', borderTop: '1px solid var(--line)' }}>
          // END OF FILE 02.2 · OFF-GAME OPERATIONS DOSSIER
        </RevealOG>
      </div>
    </section>
  );
};

// ============= ROOT =============
const OffGamePage = ({ navigate }) => (
  <div className="page-enter">
    <OGIndex />
    <OGSec01 navigate={navigate} />
    <OGSec02 />
    <OGSec03 />
    <OGSec04 />
    <OGSec05 />
    <OGSec06 />
    <OGSec07 />
    <OGSec08 />
    <OGSec09 />
    <OGSec10 navigate={navigate} />
  </div>
);

window.OffGamePage = OffGamePage;
