/* global React, Icon, LabelRow, SectionHeader, Breadcrumb */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

// ============= REVEAL ON SCROLL (plan.css pattern) =============
const useRevealM = () => {
  const ref = useRefM(null);
  const [shown, setShown] = useStateM(false);
  useEffectM(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
};

const RevealM = ({ children, className = '', delay = 0, dir = 'up', as: As = 'div', ...rest }) => {
  const [ref, shown] = useRevealM();
  const dirCls = dir === 'left' ? 'reveal-l' : dir === 'right' ? 'reveal-r' : '';
  const dl = delay ? `delay-${delay}` : '';
  return (
    <As ref={ref} className={`reveal ${dirCls} ${dl} ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </As>
  );
};

// ============= REVEAL FOR GV ELEMENTS (gtm.css pattern) =============
const useRevealGTM = () => {
  useEffectM(() => {
    const run = () => {
      const els = document.querySelectorAll('.gv:not(.in), .strategy-track:not(.in), .cr-status:not(.in), .kw-cloud:not(.in), .monitor-panel:not(.in), .plat-card:not(.in)');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => io.observe(el));
      return io;
    };
    const io = run();
    return () => io.disconnect();
  });
};

// ============= IMAGE PLACEHOLDER SLOT =============
const ImgSlot = ({ label, spec, code, aspect = '16/9', kind = 'KEY ART', style }) => (
  <div className="imgslot" style={{ aspectRatio: aspect, ...style }}>
    <span className="x-mark"></span>
    <span className="glabel">
      <span className="gicon">+</span>
      <span className="gname">{label}</span>
      <span className="gspec">{spec || kind}</span>
    </span>
    {code && <span className="gcorner">{code}</span>}
  </div>
);

// ============= SECTION LIST =============
const GTM_SECTIONS = [
  { id: 'gtm-01', n: '01', label: 'GTM BRIEF' },
  { id: 'gtm-02', n: '02', label: 'STRATEGY' },
  { id: 'gtm-03', n: '03', label: '渠道分工' },
  { id: 'gtm-04', n: '04', label: '分阶段计划' },
  { id: 'gtm-05', n: '05', label: 'CREATOR' },
  { id: 'gtm-06', n: '06', label: '素材矩阵' },
  { id: 'gtm-07', n: '07', label: '平台活动' },
  { id: 'gtm-08', n: '08', label: '付费投放' },
  { id: 'gtm-09', n: '09', label: '社媒社区' },
  { id: 'gtm-10', n: '10', label: 'PR & IP' },
  { id: 'gtm-11', n: '11', label: 'KPI' },
  { id: 'gtm-12', n: '12', label: '作战室' },
];

// ============= LEFT NAV (plan-index amber) =============
const GTMIndex = () => {
  const [active, setActive] = useStateM('gtm-01');
  useEffectM(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px' });
    GTM_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="plan-index amber">
      {GTM_SECTIONS.map((s) => (
        <a key={s.id} className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <span className="bar"></span><span>{s.n}</span><span className="lbl">/ {s.label}</span>
        </a>
      ))}
    </nav>
  );
};

// ============= CHAPTER MARK (chapter-mark amber) =============
const GTMMark = ({ n, k, sub = '' }) => (
  <RevealM className="chapter-mark amber">
    <span className="cn">{n}</span>
    <span className="ck"><strong>{k}</strong>{sub}</span>
  </RevealM>
);

// ============= 01 GTM BRIEF — HERO =============
const Sec01Brief = ({ navigate }) => {
  const [lit, setLit] = useStateM(0);
  useEffectM(() => {
    const t = setInterval(() => setLit(n => (n + 1) % 6), 800);
    return () => clearInterval(t);
  }, []);
  const beacons = [
    ['AWARENESS',   '让玩家知道联动发生'],
    ['RECRUITMENT', '选择城市 Relay'],
    ['ACTIVATION',  '进游戏执行任务'],
    ['ESCALATION',  '分享战报与高光'],
    ['EXTRACTION',  '完成终局 · 锁定品牌'],
  ];
  const radarAxes = ['YOUTUBE','TWITCH','TIKTOK','DISCORD','REDDIT','STEAM','CONSOLE','X/IG'];
  const radarValues = [0.92, 0.86, 0.78, 0.74, 0.62, 0.88, 0.70, 0.68];
  const cx = 130, cy = 130, R = 100;

  return (
    <section id="gtm-01" className="plan-hero" style={{ padding: 0 }}>
      <div className="scan-line"></div>
      {/* Background image — covers only through the two-column hero, stops before 本页定位 */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/主视觉kv.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,7,7,0.52) 30%, rgba(5,7,7,0.22) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 64, paddingBottom: 48 }}>
          <Breadcrumb trail={[
            { id: 'home', label: 'OVERVIEW' },
            { id: 'marketing', label: '03 / GTM / MARKETING' },
          ]} navigate={navigate} />
          <div style={{ marginTop: 24 }}>
            <LabelRow color="var(--df-amber)">[GTM / MARKETING] · 03 / GO-TO-MARKET EXECUTION PLAN</LabelRow>
          </div>

          <GTMMark n="01" k="GTM BRIEF" sub=" / 市场执行总览" />

          {/* Two-column hero layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'flex-end' }}>
            <div>
              <h1 className="display" style={{ fontSize: 'clamp(52px, 8vw, 110px)', margin: 0, lineHeight: 0.86, letterSpacing: '-0.005em' }}>
                GTM /<br/>
                <span style={{ background: 'linear-gradient(120deg, var(--df-amber), var(--df-amber-hot))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>MARKETING</span>
              </h1>
              <div style={{ marginTop: 10, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-secondary)' }}>市场传播与发行执行方案</div>
              <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.75, margin: '20px 0 10px', maxWidth: 600 }}>
                把 <strong>Operation Rogue Signal</strong> 从一个游戏内外联动事件，转化为欧美FPS玩家在暑期看得到、玩得到、讨论得到、愿意回流的市场Campaign。
              </p>
              <p style={{ fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif", fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 18px', maxWidth: 600 }}>
                这不是"发几条预告片"的营销，而是 <strong style={{ color: 'var(--df-amber)' }}>6周连续推进的暑期GTM系统</strong>，四条链路同时推进。
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {['让玩家知道联动发生了','让玩家理解自己能参与什么','让玩家进入游戏完成任务','让玩家把战报、高光、城市贡献分享到社区'].map((txt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.2em', flexShrink: 0 }}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            <RevealM dir="right" className="card" style={{ padding: '24px 28px' }}>
              <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 16 }}>// MISSION PARAMETERS · 任务参数</div>
              {[
                ['Campaign Window', '6 Weeks · T-14 → T+28'],
                ['主要市场', 'NA / UK / EU / ANZ'],
                ['平台', 'PC + Console'],
                ['核心渠道', 'YT · Twitch · TikTok · Discord · Reddit · Steam'],
                ['UA 预算', '$12.4M'],
                ['市场目标', '认知 → 参与 → 回流 → 社交动能'],
              ].map(([k, v], i) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 10, padding: '9px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', textTransform: 'uppercase', paddingTop: 2 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: i === 5 ? 'var(--df-amber)' : 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{v}</span>
                </div>
              ))}
            </RevealM>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 36, paddingBottom: 64 }}>

        {/* Page positioning note */}
        <RevealM delay={2} style={{ marginTop: 36, padding: '14px 20px', background: 'rgba(245,196,69,0.06)', border: '1px solid rgba(245,196,69,0.2)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.2em', marginBottom: 10 }}>// 本页定位 · 区别于其他三页</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '7px 28px', fontSize: 12 }}>
            {[
              ['Campaign Plan', '为什么做 · 打谁 · 故事是什么'],
              ['In-Game Ops', '玩家在游戏内怎么玩'],
              ['Off-Game Ops', '官网 · Discord · 城市Relay · ARG怎么组织'],
              ['GTM / Marketing ▶', '怎么推出去 · 谁看见 · 在哪里转化 · 指标怎么追'],
            ].map(([page, desc]) => (
              <span key={page} style={{ color: page.includes('▶') ? 'var(--df-amber)' : 'var(--text-secondary)' }}>
                <span style={{ color: page.includes('▶') ? 'var(--df-amber)' : 'var(--text-faint)' }}>{page} → </span>{desc}
              </span>
            ))}
          </div>
        </RevealM>

        {/* GTM objective beacons */}
        <RevealM delay={3} style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', border: '1px solid var(--line)', background: 'var(--bg-card)' }}>
          {beacons.map(([name, sub], i) => (
            <div key={name} className={`beacon ${lit > i ? 'on' : ''} ${i === 4 ? 'hot' : ''}`}>
              <div className="bdot"></div>
              <div className="bn">PHASE {String(i+1).padStart(2,'0')}</div>
              <div className="bl">{name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.12em', marginTop: 6 }}>{sub}</div>
            </div>
          ))}
        </RevealM>

        {/* Hero visual + radar */}
        <RevealM delay={3} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 22, marginTop: 22, alignItems: 'stretch' }}>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 0 }}>
            <img src="图片素材/主kv hero页-无 logo.png" alt="GTM Hero Banner" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="radar-wrap">
            <svg viewBox="0 0 260 260">
              {[0.25,0.5,0.75,1].map(s => (
                <polygon key={s} points={radarAxes.map((_, i) => {
                  const a = (i/radarAxes.length)*Math.PI*2-Math.PI/2;
                  return `${cx+Math.cos(a)*R*s},${cy+Math.sin(a)*R*s}`;
                }).join(' ')} fill="none" stroke="#232c2f" strokeWidth="0.8" />
              ))}
              {radarAxes.map((lbl, i) => {
                const a = (i/radarAxes.length)*Math.PI*2-Math.PI/2;
                return (
                  <g key={lbl}>
                    <line x1={cx} y1={cy} x2={cx+Math.cos(a)*R} y2={cy+Math.sin(a)*R} stroke="#232c2f" strokeWidth="0.6" />
                    <text x={cx+Math.cos(a)*(R+18)} y={cy+Math.sin(a)*(R+18)} textAnchor="middle" dominantBaseline="central"
                      fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#6b7672">{lbl}</text>
                  </g>
                );
              })}
              <polygon points={radarAxes.map((_, i) => {
                const a = (i/radarAxes.length)*Math.PI*2-Math.PI/2;
                return `${cx+Math.cos(a)*R*radarValues[i]},${cy+Math.sin(a)*R*radarValues[i]}`;
              }).join(' ')} fill="rgba(63,214,106,0.18)" stroke="#3fd66a" strokeWidth="1.5" />
              {radarAxes.map((_, i) => {
                const a = (i/radarAxes.length)*Math.PI*2-Math.PI/2;
                return <circle key={i} cx={cx+Math.cos(a)*R*radarValues[i]} cy={cy+Math.sin(a)*R*radarValues[i]} r="2.5" fill="#3fd66a" />;
              })}
            </svg>
          </div>
        </RevealM>

        {/* Section jump grid */}
        <RevealM delay={4} style={{ marginTop: 40, padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="ticker" style={{ marginBottom: 14, color: 'var(--df-amber)' }}>// 12 SECTIONS · SCROLL OR JUMP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px 24px' }}>
            {GTM_SECTIONS.map((s) => (
              <a key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 0', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--df-amber)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <span style={{ color: 'var(--df-amber)' }}>{s.n}</span><span>{s.label}</span>
              </a>
            ))}
          </div>
        </RevealM>
      </div>
    </section>
  );
};

// ============= 02 GTM STRATEGY =============
const Sec02Strategy = () => {
  const steps = [
    { no: '01', name: 'REVEAL',   cn: '制造悬念', job: '先用异常信号和失联特工制造悬念，拉动关注与讨论', asset: 'Anomaly Teaser · 倒计时', side: 'top' },
    { no: '02', name: 'RECRUIT',  cn: '建立入口', job: '正式公布联动，开放城市Relay选择，把用户拉进阵营', asset: 'Reveal Trailer · Signal Map', side: 'bot' },
    { no: '03', name: 'ACTIVATE', cn: '推动进游戏', job: '通过Twitch Drops、Creator直播和Store活动页推动玩家进入', asset: 'Launch Trailer · Drops', side: 'top' },
    { no: '04', name: 'ESCALATE', cn: '维持热度', job: '城市节点告急、GHOST Interference干扰、Weekly Report和Creator挑战制造中段热度', asset: 'Weekly Signal Report', side: 'bot' },
    { no: '05', name: 'EXTRACT',  cn: '完成高潮', job: 'Final Extraction、个人特工档案和全服战报完成社交扩散', asset: 'Final Extraction · 个人档案', side: 'top' },
  ];
  const rows = [
    ['REVEAL',   '制造悬念',     '关注 · 猜测 · 讨论',     '异常信号Teaser · 倒计时',            'Decode the Signal'],
    ['RECRUIT',  '建立参与入口', '选择Relay · 加入频道',   'Reveal Trailer · Global Signal Map', 'Choose Your Relay'],
    ['ACTIVATE', '推动进游戏',   '下载 · 回流 · 完成任务', 'Launch Trailer · Drops · Creator直播','Play the Event'],
    ['ESCALATE', '维持热度',     '增援 · 破译 · 分享高光', 'Weekly Report · GHOST Interference', 'Reinforce Your Relay'],
    ['EXTRACT',  '收束高潮',     '完成终局 · 分享战报',   'Final Extraction · Personal Intel File','Extract Before Lost'],
  ];
  return (
    <section id="gtm-02" className="section" style={{ padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/Rogue Signal 悬念Teaser KV.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
          <GTMMark n="02" k="GTM STRATEGY" sub=" / 核心策略 · REVEAL → EXTRACT" />
          <SectionHeader num="02" name="GTM STRATEGY"
            title={<>五步信号<br/>升级策略</>}
            kicker="GTM不是一次性公布联动，而是按5个市场动作逐步推进。每一步都有明确的市场任务、玩家行动和对应主资产。节奏决定整体回流曲线。"
            accent="var(--df-amber)" />
        </div>
      </div>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="strategy-track gv d1">
          <div className="axis">
            <div className="axis-fill"></div>
            <div className="axis-pulse"></div>
          </div>
          {steps.map((s, i) => {
            const left = `${10 + i * 20}%`;
            return (
              <React.Fragment key={s.no}>
                <div className="stnode" style={{ left }}></div>
                <div className={`stcard ${s.side}`} style={{ left }}>
                  <div className="step-no">PHASE {s.no}</div>
                  <h4 className="step-name">{s.name}</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.12em', marginBottom: 6 }}>{s.cn}</div>
                  <div className="step-job">HERO ASSET<strong>{s.asset}</strong></div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="strat-table gv d2">
          <div className="h">阶段</div>
          <div className="h">市场任务</div>
          <div className="h">用户动作</div>
          <div className="h">核心内容</div>
          <div className="h">PRIMARY CTA</div>
          {rows.map((r, i) => (
            <React.Fragment key={i}>
              <div className="c">{r[0]}</div>
              <div className="c">{r[1]}</div>
              <div className="c">{r[2]}</div>
              <div className="c">{r[3]}</div>
              <div className="c" style={{ color: 'var(--df-amber)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{r[4]}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 03 CHANNEL ROLES =============
const Sec03Channels = () => {
  const [hov, setHov] = useStateM(0);
  const channels = [
    { ic: 'YT', name: 'YOUTUBE',    role: '电影感认知 · Cinematic Awareness',  kpi: '120M', unit: 'VIEWS',    links: [0] },
    { ic: 'TW', name: 'TWITCH',     role: '直播参与 · Live Participation',      kpi: '4.6M', unit: 'WATCH H',  links: [0,1,2] },
    { ic: 'TK', name: 'TIKTOK',     role: '高光破圈 · Highlight Breakout',      kpi: '480M', unit: 'PLAYS',    links: [0,3] },
    { ic: 'DC', name: 'DISCORD',    role: '行动组织 · Squad Coordination',      kpi: '320K', unit: '新增',     links: [2] },
    { ic: 'RD', name: 'REDDIT',     role: '深度讨论 · Deep Discussion',         kpi: '64K',  unit: 'THREADS',  links: [2,3] },
    { ic: 'ST', name: 'STEAM/EPIC', role: '转化承接 · Conversion Gateway',      kpi: '1.2M', unit: '下载',     links: [1] },
    { ic: 'XB', name: 'CONSOLE',    role: '主机拉新 · Console Acquisition',     kpi: '720K', unit: 'INSTALLS', links: [1] },
    { ic: 'X',  name: 'X / IG',     role: '官方节奏 · Live Ops Cadence',        kpi: '38M',  unit: 'IMPRESS',  links: [3] },
    { ic: 'CR', name: 'CREATOR',    role: '信任与扩散 · Trust & Amplification', kpi: '120',  unit: '合作方',   links: [2,3] },
  ];
  const targets = [
    { n: '01', name: '认知 AWARENESS',     desc: '覆盖欧美FPS玩家、动作片用户和流失COD/BF/Tarkov玩家，传递战术大片氛围。', kpi: '110M REACH' },
    { n: '02', name: '转化 CONVERSION',    desc: '通过Steam活动页、主机商店和Drops机制推动Store访问、下载和回流安装。', kpi: '1.9M 下载' },
    { n: '03', name: '社群 COMMUNITY',     desc: '通过Discord城市频道、Creator Relay队长和Reddit战报帖组织活跃玩家。', kpi: '320K 新增' },
    { n: '04', name: '扩散 AMPLIFICATION', desc: '驱动UGC投稿、Personal Intel File分享、TikTok高光二创和二次传播。', kpi: '480M PLAYS' },
  ];
  return (
    <section id="gtm-03" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/Final Extraction模块主图.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
          <GTMMark n="03" k="CHANNEL ROLES" sub=" / 渠道分工 · WHO OWNS WHAT" />
          <SectionHeader num="03" name="CHANNEL ROLES"
            title={<>每个渠道<br/>有明确任务</>}
            kicker="渠道不是清单，是作战单元。每个渠道绑定四个市场目标中的至少一个——认知 / 转化 / 社群 / 扩散。Hover渠道可查看具体任务与KPI。"
            accent="var(--df-amber)" />
        </div>
      </div>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="chmap gv d1" style={{ marginTop: 0 }}>
          <div className="chmap-svg-wrap">
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
              {channels.map((c, i) => {
                const y1 = 36 + i * 58;
                return (c.links || []).map((t, ti) => {
                  const y2 = 80 + t * 145;
                  const lit = i === hov;
                  return (
                    <path key={`${i}-${t}-${ti}`} className={`clink ${lit ? 'lit' : ''}`}
                      d={`M 440 ${y1} C 560 ${y1}, 480 ${y2}, 600 ${y2}`} />
                  );
                });
              })}
            </svg>
          </div>
          <div className="ch-list">
            {channels.map((c, i) => (
              <div key={c.name} className={`ch-row ${i === hov ? 'active' : ''}`} onMouseEnter={() => setHov(i)}>
                <div className="ch-icon">{c.ic}</div>
                <div>
                  <div className="ch-name">{c.name}</div>
                  <div className="ch-sub">{c.role}</div>
                </div>
                <div className="ch-kpi">
                  <strong>{c.kpi}</strong>
                  <span>{c.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="target-grid">
            {targets.map((t, i) => (
              <div key={t.n} className={`tg-card ${(channels[hov].links || []).includes(i) ? 'lit' : ''}`}>
                <div className="tg-num">TARGET {t.n}</div>
                <div className="tg-name">{t.name}</div>
                <p className="tg-desc">{t.desc}</p>
                <div className="tg-meta">PROJECTED · {t.kpi}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= 04 PHASED MEDIA PLAN =============
const Sec04Phased = () => {
  const phases = [
    { wk: 'T-14 → T-10', name: 'SIGNAL DETECTED',  flag: '' },
    { wk: 'T-9 → T-5',   name: 'MISSION ACCEPTED', flag: '' },
    { wk: 'T0 → T+7',    name: 'GLOBAL LAUNCH',    flag: 'flag-launch' },
    { wk: 'T+8 → T+14',  name: 'RELAY WAR',        flag: '' },
    { wk: 'T+15 → T+21', name: 'COMPROMISED',      flag: 'flag-final' },
    { wk: 'T+22 → T+28', name: 'AFTER ACTION',     flag: '' },
  ];
  const rows = [
    { lbl: '主信息',     cells: ['Rogue Signal出现，制造悬念','联动正式公布','进游戏执行任务','城市节点竞争激烈','节点告急，终局解锁','战报沉淀，个人档案'] },
    { lbl: 'HERO ASSET', cells: ['Anomaly Teaser','Reveal Trailer','Launch Trailer','Weekly Signal Report','Final Extraction Trailer','After Action Report'] },
    { lbl: '渠道动作',   cells: ['社媒乱码 · 官网倒计时 · 任务箱预埋','YT首发 · Steam活动页 · Discord城市频道','Twitch Drops · Creator首日直播 · Store活动','Reddit战报 · 城市榜单 · Cipher线索','KOL挑战 · Entity干扰 · 全服破译倒计时','个人特工卡分享 · Creator复盘 · 下版本线索'] },
    { lbl: 'CREATOR',   cells: ['任务箱开箱视频','Relay Captain公布','Drops + 首接触直播','城市竞速直播','Final Extraction大型直播','战报剪辑与总结'] },
    { lbl: 'CTA',        cells: ['DECODE THE SIGNAL','CHOOSE YOUR RELAY','PLAY THE EVENT','REINFORCE YOUR RELAY','EXTRACT BEFORE LOST','SHARE YOUR INTEL FILE'] },
  ];
  return (
    <section id="gtm-04" className="section" style={{ padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/Discord Command Center 背景图.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
          <GTMMark n="04" k="PHASED MEDIA PLAN" sub=" / 分阶段传播计划 · 6-WEEK ROADMAP" />
          <SectionHeader num="04" name="PHASED MEDIA PLAN"
            title={<>六周<br/>五行执行表</>}
            kicker="市场执行团队的核心大表。绿色 = Launch Week，红色 = Final Extraction Week，这两列决定Campaign总盘子。每列包含：主信息 / Hero Asset / 渠道动作 / Creator时机 / CTA。"
            accent="var(--df-amber)" />
        </div>
      </div>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="media-plan gv d1" style={{ marginTop: 0 }}>
          <div className="phase-head">
            <div className="ph"><div className="pwk">阶段</div><div className="pnm">时间 / 名称</div></div>
            {phases.map((p, i) => (
              <div key={i} className={`ph ${p.flag}`}>
                <div className="pwk">{p.wk}</div>
                <div className="pnm">{p.name}</div>
              </div>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div key={r.lbl} className="mrow">
              <div className="ml">{r.lbl}</div>
              {r.cells.map((cell, ci) => (
                <div key={ci} className={`mc ${phases[ci].flag}`}>
                  {ri === 4 ? <strong>{cell}</strong> : cell}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ============= 05 CREATOR DEPLOYMENT =============
const Sec05Creators = () => {
  const creators = [
    { no: '01', role: 'GLOBAL STUNT ANCHOR', cn: '破圈挑战锚点', type: 'BREAKOUT', job: '现实任务箱 / 城市挑战，实现跨垂类大规模破圈。', fmt: ['YouTube 15min+','Hero Stunt'], ref: '参考类型：MrBeast / Dude Perfect / Yes Theory' },
    { no: '02', role: 'FPS HEADLINER',       cn: '开服热度担当', type: 'OPEN DAY',  job: '首日直播、Drops带动观看量、Relay选择内容。', fmt: ['Twitch Live','YouTube'], ref: '参考类型：shroud / TimTheTatman / DrLupo' },
    { no: '03', role: 'EXTRACTION CAPTAIN',  cn: '硬核信任建立', type: 'TRUST',     job: 'Physical Drive高压撤离长直播，建立硬核玩家信任。', fmt: ['Long Stream','战术剪辑'], ref: '参考类型：LVNDMARK / Pestily / Sacriel' },
    { no: '04', role: 'WARFARE CAPTAIN',     cn: '大战场解析',  type: 'LARGE OPS', job: '大地图Satellite Sweep覆盖 / 信号塔战术拆解视频。', fmt: ['YouTube解析','Live'], ref: '参考类型：jackfrags / Westie / LevelCapGaming' },
    { no: '05', role: 'CIPHER HUNTER',       cn: '解谜社群组织', type: 'PUZZLE',    job: '领衔Impossible Cipher破解，组织社区协作。', fmt: ['长视频','Discord协作'], ref: '参考类型：Theorist / Nexpo / Night Mind' },
    { no: '06', role: 'REGIONAL CAPTAIN',    cn: '城市Relay动员', type: 'CITY',     job: '本地语言Relay领导，时区覆盖，城市特化动员。', fmt: ['本地直播','Shorts'], ref: 'EU/FR/DE/ES/BR/JP 各地区合作方' },
    { no: '07', role: 'HIGHLIGHT CURATOR',   cn: '短视频扩散',  type: 'CLIPS',     job: '高频短视频剪辑玩家与Creator高光，驱动病毒循环。', fmt: ['TikTok','Shorts'], ref: '参考类型：JerichoFPS / TickTeam' },
    { no: '08', role: 'CINEMATIC ANCHOR',    cn: '电影感IP认知', type: 'MOVIE',     job: '影片杂志类Creator以暑期大事件角度包装IP联动。', fmt: ['YouTube长视频'], ref: '参考类型：CinemaSins / Storymode' },
  ];
  return (
    <section id="gtm-05" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/主kv hero页-无 logo.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
          <GTMMark n="05" k="CREATOR DEPLOYMENT" sub=" / KOL分层部署 · TACTICAL ROLES" />
          <SectionHeader num="05" name="CREATOR DEPLOYMENT"
            title={<>8个战术<br/>Creator角色</>}
            kicker="Creator不是一起试玩，而是按8个战术角色分层部署——每个角色绑定特定内容形式、参考人选与首发周次。（以下为候选类型与示例人选，非已确认合作名单）"
            accent="var(--df-amber)" />
        </div>
      </div>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="creator-grid gv d1" style={{ marginTop: 0 }}>
          {creators.map((c) => (
            <div key={c.no} className="cr-card" style={c.no === '01' ? {
              borderColor: 'var(--df-amber)',
              borderWidth: 2,
              borderTop: '3px solid var(--df-amber)',
              background: 'linear-gradient(160deg, rgba(63,214,106,0.07) 0%, var(--bg-card) 55%)',
            } : {}}>
              <div className="cr-num" style={c.no === '01' ? { color: 'var(--df-amber)' } : {}}>ROLE / {c.no}</div>
              <div className="cr-role">{c.role}</div>
              <div className="cr-type">[ {c.cn} · {c.type} ]</div>
              <div className="cr-job">{c.job}</div>
              <div className="cr-fmt">{c.fmt.map(f => <span key={f}>{f}</span>)}</div>
              {c.no === '01' ? (
                <div className="cr-ref" style={{ borderTop: '1px dashed rgba(63,214,106,0.25)' }}>
                  <span>参考类型 REFERENCE TIER</span>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['MrBeast', 'Dude Perfect', 'Yes Theory'].map(name => (
                      <div key={name} style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: 'var(--df-amber)', letterSpacing: '0.04em', lineHeight: 1.1, textTransform: 'uppercase' }}>{name}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="cr-ref">参考类型 REFERENCE TIER<strong>{c.ref}</strong></div>
              )}
            </div>
          ))}
        </div>

        <div className="cr-flow-wrap gv d2">
          <div className="cr-flow">
            <h6>[ CREATOR DEPLOYMENT FLOW · 部署流程 ]</h6>
            <ol>
              <li>收到 MISSION BRIEFING BOX</li>
              <li>绑定 RELAY 身份</li>
              <li>发布任务直播 / 视频</li>
              <li>粉丝加入城市频道</li>
              <li>完成游戏内贡献值</li>
              <li>官网记录 Creator 阵营贡献</li>
            </ol>
          </div>
          <div className="cr-status">
            <div className="stat-row">
              <span className="stat-tag">RELAY CAPTAIN · 直播中</span>
              <span className="stat-live">LIVE</span>
            </div>
            <div style={{ height: 200, marginBottom: 14, overflow: 'hidden', position: 'relative' }}>
              <img src="图片素材/Pestily.jpg" alt="Pestily" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <h4 className="stat-name">[CAPTAIN HANDLE]</h4>
            <div className="stat-handle">RELAY · THAMES · UK-LDN</div>
            <div className="stat-line"><span>任务</span><span className="v">NO BACKUP EXTRACTION</span></div>
            <div className="stat-line"><span>同时在线</span><span className="v">62,481</span></div>
            <div className="stat-line"><span>粉丝贡献值</span><span className="v">18,420 SDV</span></div>
            <div className="stat-line"><span>RELAY 排名</span><span className="v" style={{ color: 'var(--df-green)' }}>#2 / 8</span></div>
            <div className="stat-bar"><div className="fill"></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= 06 CONTENT ASSET MATRIX =============
const Sec06Assets = () => {
  const tiers = ['HERO ASSETS · 阶段主资产','GAMEPLAY EXPLAINERS · 玩法说明','SOCIAL SHORTS · 短视频爆点','COMMUNITY ASSETS · 社区运营','PLATFORM ASSETS · 商店素材','CREATOR KITS · KOL工具包','REWARD ASSETS · 奖励展示','PERSONALIZED ASSETS · 社交货币'];
  const matrix = [[2,2,2,1,2,1],[1,2,2,2,1,1],[2,2,2,2,2,2],[1,2,2,2,2,1],[1,2,2,1,1,1],[2,2,2,2,2,1],[0,1,2,1,2,0],[0,0,1,1,2,2]];
  const wall = [
    { tag: 'P0 / TEASER', name: 'SIGNAL DETECTED TEASER', meta: [['格式','15s · 9:16+1:1'],['渠道','X · TikTok'],['责任','Brand'],['截止','T-12']] },
    { tag: 'P1 / HERO',   name: 'REVEAL TRAILER',         meta: [['格式','90s · 4K'],['渠道','YouTube · Steam'],['责任','Brand'],['截止','T-5']] },
    { tag: 'P1 / MAP',    name: 'GLOBAL SIGNAL MAP FILM', meta: [['格式','60s'],['渠道','YouTube · 官网'],['责任','Brand'],['截止','T-4']] },
    { tag: 'P2A / LAUNCH',name: 'LAUNCH TRAILER',         meta: [['格式','75s'],['渠道','YT · Store'],['责任','Brand'],['截止','T-1']] },
    { tag: 'P2A / EXPLN', name: 'GAMEPLAY EXPLAINERS ×3', meta: [['格式','60s each'],['渠道','YouTube · Steam'],['责任','Live Ops'],['截止','T+2']] },
    { tag: 'P2B / WEEKLY',name: 'WEEKLY SIGNAL REPORT',   meta: [['格式','图文长帖'],['渠道','官网 · Reddit · DC'],['责任','Community'],['截止','每周']] },
    { tag: 'P3 / PEAK',   name: 'FINAL EXTRACTION FILM',  meta: [['格式','120s'],['渠道','全渠道'],['责任','Brand'],['截止','T+18']] },
    { tag: 'P4 / RECAP',  name: 'AFTER ACTION REPORT',    meta: [['格式','官网+60s'],['渠道','官网 · 社媒'],['责任','Brand+Data'],['截止','T+24']] },
    { tag: 'P4 / PERS',   name: 'PERSONAL INTEL FILE',    meta: [['格式','1:1分享卡'],['渠道','X · IG · DC'],['责任','Live Ops'],['截止','T+22']] },
  ];
  return (
    <section id="gtm-06" className="section">
      <div className="container">
        <GTMMark n="06" k="CONTENT ASSET MATRIX" sub=" / 素材矩阵与内容排产 · PRODUCTION GRID" />
        <SectionHeader num="06" name="CONTENT ASSET MATRIX"
          title={<>8层素材<br/>× 6个阶段</>}
          kicker="每一格代表那个阶段需要排产的素材组合。空白 = 不投入，ACTIVE = 主战场，SUPPORT = 辅助投入。下方资产墙列出关键Hero文件，含格式 / 渠道 / 责任方 / 截止时间。"
          accent="var(--df-amber)" />

        <div className="asset-matrix gv d1" style={{ marginTop: 0 }}>
          {['素材层级','P0 信号','P1 招募','P2A 上线','P2B Relay战','P3 终局','P4 战报'].map(h => <div key={h} className="ah">{h}</div>)}
          {tiers.map((t, i) => (
            <React.Fragment key={t}>
              <div className="ar">{t}</div>
              {matrix[i].map((v, j) => (
                <div key={j} className={`ac ${v === 2 ? 'on' : ''}`}>
                  {v === 2 && <span className="dot">ACTIVE</span>}
                  {v === 1 && <span style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em' }}>SUPPORT</span>}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

// ============= 07 PLATFORM ACTIVATION =============
const Sec07Platforms = () => {
  const plats = [
    { lg: 'ST', name: 'STEAM',       role: 'PC转化承接',   pct: 84, actions: ['Major Update活动页上线','免费奖励解锁 + Drops','Trailer + 玩法说明视频'], bar: 'WISHLIST → INSTALL' },
    { lg: 'EP', name: 'EPIC',        role: '免费下载承接',  pct: 62, actions: ['Featured Banner占位','上线Trailer + Bundle SKU','免费下载落地页'], bar: 'STORE → DOWNLOAD' },
    { lg: 'PS', name: 'PLAYSTATION', role: '主机拉新',      pct: 71, actions: ['Store活动页 + 版位','免费奖励兑换码','联动Banner占位'], bar: 'STORE → INSTALL' },
    { lg: 'XB', name: 'XBOX',        role: '主机拉新',      pct: 68, actions: ['MS Store活动页','免费奖励兑换','成就系统联动'], bar: 'STORE → INSTALL' },
    { lg: 'TW', name: 'TWITCH',      role: '直播参与',      pct: 92, actions: ['Drops Campaign（3阶梯）','Relay Captain共播池','每周Drops重置'], bar: 'WATCH → RETURN' },
    { lg: 'DC', name: 'DISCORD',     role: '行动组织',      pct: 78, actions: ['按城市建立Relay频道','Discord Quests集成','Role奖励 + Cipher频道'], bar: 'JOIN → ENGAGE' },
    { lg: 'YT', name: 'YOUTUBE',     role: '电影感认知',    pct: 88, actions: ['Trailer首发Premiere','Creator长视频部署','Community Posts'], bar: 'WATCH → CTR' },
    { lg: 'TK', name: 'TIKTOK',      role: '高光破圈',      pct: 81, actions: ['品牌话题 #FUSELIT','Spark Ads打爆Creator切片','TikTok One合作方'], bar: 'PLAY → SHARE' },
  ];
  return (
    <section id="gtm-07" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <GTMMark n="07" k="PLATFORM ACTIVATION" sub=" / 平台活动 · CONVERSION SYSTEMS" />
        <SectionHeader num="07" name="PLATFORM ACTIVATION"
          title={<>平台是<br/>转化系统</>}
          kicker="Steam / Epic / PS / Xbox / Twitch / Discord / YouTube / TikTok——每个平台承担一次转化任务，不是顺手发一下。进度条代表预估目标完成度，上线期间实时追踪。"
          accent="var(--df-amber)" />

        <div className="plat-grid gv d1" style={{ marginTop: 0 }}>
          {plats.map((p) => (
            <div key={p.name} className="plat-card" style={{ '--p': `${p.pct}%` }}>
              <div className="plat-head">
                <div className="plat-logo">{p.lg}</div>
                <div><div className="plat-name">{p.name}</div><div className="plat-role">{p.role}</div></div>
              </div>
              <ul className="plat-actions">{p.actions.map(a => <li key={a}>{a}</li>)}</ul>
              <div className="plat-bar">
                <div className="blbl"><span>{p.bar}</span><span className="v">{p.pct}%</span></div>
                <div className="btrack"><div className="bfill"></div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="reward-chain gv d2">
          {['WATCH','JOIN','PLAY','SHARE','RETURN'].map((w, i) => (
            <div key={w} className="rc-step">
              <div className="rc-n">STEP {String(i+1).padStart(2,'0')}</div>
              <div className="rc-w">{w}</div>
              <div className="rc-d">{['直播 / Trailer','Discord / Relay','任务运营','个人档案','回流循环'][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 08 PAID MEDIA =============
const Sec08PaidMedia = () => {
  const funnel = [
    { n: '01', pct: '$3.4M', name: 'AWARENESS · 认知',     aud: 'FPS玩家 · 动作片用户 · 暑期观影人群', asset: '15s/30s TRAILER + 6s BUMPERS', cls: 's1' },
    { n: '02', pct: '$3.0M', name: 'CONSIDERATION · 考量', aud: 'COD · BF · Tarkov · R6玩家 + 流失DF用户', asset: 'GAMEPLAY EXPLAINER + CREATOR剪辑', cls: 's2' },
    { n: '03', pct: '$3.4M', name: 'ACTIVATION · 转化',    aud: '已安装 · 关注 · Wishlist · 流失玩家', asset: 'LAUNCH CTA · DROPS · FREE REWARDS', cls: 's3' },
    { n: '04', pct: '$1.6M', name: 'ENGAGEMENT · 参与',    aud: '活跃活动玩家 · Discord成员 · Relay报名', asset: 'WEEKLY REPORT · CITY RELAY · CIPHER', cls: 's4' },
    { n: '05', pct: '$1.0M', name: 'SOCIAL SHARE · 扩散',  aud: '已参与玩家 · Creator · 超级粉丝', asset: 'PERSONAL INTEL FILE + 高光切片', cls: 's5' },
  ];
  const specs = [
    ['6s',   '异常信号出现',      '9:16 BUMPER'],
    ['15s',  '你的Relay已暴露',    '9:16 付费切片'],
    ['30s',  '一支小队·无援可求',  '16:9 TRAILER CUT'],
    ['9:16', '5秒变脸',            'SHORT / TIKTOK'],
    ['1:1',  '城市Relay战况板',    'FEED / IG'],
    ['16:9', '公布 · 上线 · 终局', 'STORE / YOUTUBE'],
  ];
  const retarget = [
    ['预告片观看者','Gameplay Explainer'],
    ['Store访问者', 'Launch CTA + 免费奖励'],
    ['Discord成员', 'Relay任务推送'],
    ['活动玩家',    'Personal Intel File分享'],
  ];
  return (
    <section id="gtm-08" className="section">
      <div className="container">
        <GTMMark n="08" k="PAID MEDIA SYSTEM" sub=" / 付费投放结构 · $12.4M FUNNEL" />
        <SectionHeader num="08" name="PAID MEDIA SYSTEM"
          title={<>五层<br/>付费漏斗</>}
          kicker="不同素材对应不同漏斗层级：上层追求Reach，中层引导考量，下层关闭转化与回流。Social Share层把已参与玩家变成自传播节点——这才是GTM的最终目的地。"
          accent="var(--df-amber)" />

        <div className="funnel-wrap gv d1" style={{ marginTop: 0 }}>
          <div className="funnel">
            {funnel.map(f => (
              <div key={f.n} className={`fnl-step ${f.cls}`}>
                <div className="fnl-h">
                  <span className="fnl-n">LAYER {f.n} · {f.pct}</span>
                  <span className="fnl-pct"></span>
                </div>
                <h4 className="fnl-name">{f.name}</h4>
                <div className="fnl-aud">{f.aud}</div>
                <div className="fnl-asset"><strong>素材类型</strong>{f.asset}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--df-amber)', textTransform: 'uppercase', marginBottom: 14 }}>[ 广告规格清单 · AD UNIT SPEC SHEET ]</div>
            <div className="spec-stack">
              {specs.map(([r, line, use], i) => (
                <div key={i} className="spec-card">
                  <div className="spec-r">{r}</div>
                  <div className="spec-line">{line}</div>
                  <div className="spec-use">{use}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--df-amber)', textTransform: 'uppercase', marginBottom: 14 }}>[ 再营销逻辑 · RETARGETING LOGIC ]</div>
              <div className="retarget-row">
                {retarget.map(([from, to], i) => (
                  <div key={i} className="rr"><strong>{from}</strong><span className="arrow">→</span>{to}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= 09 SOCIAL & COMMUNITY =============
const Sec09Social = () => {
  const pillars = [
    ['01','SIGNAL BRIEFING · 任务感',  '每日Relay战况、紧急简报、任务计时器。'],
    ['02','HERO MOMENT · 高光时刻',    '短视频爆点：5秒变脸、最后一秒撤离、卫星扫描。'],
    ['03','CITY RIVALRY · 城市竞争',   'Thames vs Liberty vs Aurora贡献排行对抗。'],
    ['04','CIPHER HUNT · 解谜参与',    '乱码线索、坐标拼图、失真信号破解。'],
    ['05','CREATOR OPS · KOL带动',     'Relay Captain直播预告、Drops提醒、联合直播。'],
    ['06','PLAYER INTEL FILE · 社交货币','玩家个人特工档案可分享卡片，Campaign收尾。'],
  ];
  const matrix = [
    { plat: 'X / TWITTER',       style: '快速战况节奏',  focus: 'Relay状态 · 倒计时 · 战报碎片' },
    { plat: 'INSTAGRAM',         style: '视觉卡片',      focus: '个人档案 · 城市卡 · 奖励展示' },
    { plat: 'TIKTOK / SHORTS',   style: '高光与二创',    focus: '变脸失败 · 最后一秒撤离 · 卫星扫描' },
    { plat: 'REDDIT',            style: '深度讨论',      focus: '机制拆解 · 战报长帖 · 开发者说明' },
    { plat: 'DISCORD',           style: '实时行动组织',  focus: 'Daily Briefing · 城市任务 · Cipher协作' },
    { plat: 'YOUTUBE COMMUNITY', style: '长视频承接',    focus: 'Trailer · 战报 · Creator合集' },
  ];
  const posts = [
    { plat: 'X · 紧急简报', tag: 'P2B · ESCALATION', body: <>ROGUE SIGNAL DETECTED.<br/>Haavk has corrupted the relay chain.<br/><em>THAMES RELAY EXPOSED.</em><br/>检测到 Rogue Signal。哈夫克已污染中继链路。撤离前，请确认你的情报来源。</>, foot: 'CTA · #FUSELIT · 附城市地图' },
    { plat: 'TIKTOK · 短片', tag: 'P3 · PEAK',        body: <>五秒钟。<br/>一次变装。<br/><em>无援可求。</em></>, foot: 'CTA · DOWNLOAD · #FUSELIT' },
    { plat: 'REDDIT · 周报', tag: 'P2B · ESCALATION', body: <>周信号报告 <em>#02</em><br/>AURORA RELAY 已陷落。<br/>Cipher破解进度 · <em>61%</em></>, foot: 'CTA · 前往 r/DeltaForce 讨论' },
  ];
  return (
    <section id="gtm-09" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="图片素材/Warfare信号塔争夺图.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 100%)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
          <GTMMark n="09" k="SOCIAL & COMMUNITY" sub=" / 社媒社区打法 · SIX PILLARS" />
          <SectionHeader num="09" name="SOCIAL & COMMUNITY"
            title={<>六个<br/>内容支柱</>}
            kicker="把社媒拆成六个内容支柱，每个支柱对应一种玩家心理状态。平台只是发布渠道，内容逻辑先行。"
            accent="var(--df-amber)" />
        </div>
      </div>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="pillar-row gv d1" style={{ marginTop: 0 }}>
          {pillars.map(([n, name, desc]) => (
            <div key={n} className="pillar">
              <div className="pn">PILLAR {n}</div>
              <div className="pl">{name}</div>
              <div className="pd">{desc}</div>
            </div>
          ))}
        </div>

        <div className="platform-matrix gv d2">
          <div className="pmh">平台</div><div className="pmh">内容风格</div><div className="pmh">发布重点</div>
          {matrix.map((m, i) => (
            <React.Fragment key={i}>
              <div className="pmr">{m.plat}</div>
              <div className="pmc">{m.style}</div>
              <div className="pmc">{m.focus}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="posts-grid gv d3">
          {posts.map((p, i) => (
            <div key={i} className="post-card">
              <div className="post-head">
                <span className="post-plat">{p.plat}</span>
                <span className="post-tag">{p.tag}</span>
              </div>
              <div className="post-body">{p.body}</div>
              <div className="post-foot">{p.foot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 10 PR & PARTNERSHIP =============
const Sec10PR = () => {
  const angles = [
    { angle: 'IP联动',            quote: 'Delta Force × Mission: Impossible：6周暑期特别行动。', ch: '游戏 · 娱乐媒体' },
    { angle: '可玩的间谍行动',    quote: '不是皮肤——是一场可以玩的全球情报战，有变装机制和实时赌注。', ch: '核心游戏媒体' },
    { angle: '社区实时运营',      quote: '游戏内外反馈循环：城市Relay贡献与全球信号地图实时关联。', ch: '行业媒体' },
    { angle: 'ARG / 密码猎人',    quote: '一场跨越城市、语言与时区的夏季协作解谜活动。', ch: '文化 · ARG社区' },
    { angle: 'Creator任务挑战',   quote: '现实版Mission Briefing Box空降全球8位锚点Creator。', ch: '泛娱乐 · Creator经济' },
    { angle: '无付费才能赢',      quote: '联动外观明确不影响竞技公平性。', ch: 'FPS核心玩家社区' },
  ];
  const files = [
    ['新闻稿','PDF · 4页'],['事实清单','PDF · 2页'],['Trailer链接','YT · MP4'],['Key Art包','TIFF · 12文件'],
    ['游戏截图','PNG · 24文件'],['信号地图截图','PNG · 6文件'],['Creator计划','PDF · 6页'],
    ['无P2W声明','PDF · 1页'],['FAQ','PDF · 8页'],['Embargo备忘','PDF · 1页'],
  ];
  const touchpoints = [
    ['院线PRE-ROLL','T-12 · 60s'],['大厅海报','T-9 · QR'],
    ['任务箱投放','T-7 · 50城市'],['社媒联合','T-3 · 上线'],['PARAMOUNT','T-2 · 同步'],
  ];
  return (
    <section id="gtm-10" className="section">
      <div className="container">
        <GTMMark n="10" k="PR & PARTNERSHIP" sub=" / 媒体合作与IP协同 · NARRATIVE OPS" />
        <SectionHeader num="10" name="PR & PARTNERSHIP"
          title={<>六个PR角度<br/>一份新闻包</>}
          kicker="每个PR Angle对应不同的媒体目标群体。新闻包一次发布，按Angle切片按时间序列释放，避免同一稿件重复投送。"
          accent="var(--df-amber)" />

        <div className="pr-wrap gv d1" style={{ marginTop: 0 }}>
          <div className="pr-list">
            <h6>[ PR ANGLE GRID · 媒体角度表 ]</h6>
            {angles.map(a => (
              <div key={a.angle} className="pr-row">
                <div><div className="pr-angle">{a.angle}</div><div className="pr-quote">{a.quote}</div></div>
                <div className="pr-channel">{a.ch}</div>
              </div>
            ))}
          </div>
          <div className="press-kit">
            <h6><span>[ PRESS KIT v1.0 · 新闻包 ]</span><span className="pk-size">PKG · 2.1 GB</span></h6>
            <div className="pk-files">
              {files.map(([n, s]) => (
                <div key={n} className="pk-file">
                  <div className="pkf-icon"><span>FILE</span></div>
                  <div className="pkf-name">{n}<span>{s}</span></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                <img src="图片素材/主视觉kv.png" alt="Key Art" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="partner-line gv d2">
          <h6>[ 院线 & IP PARTNERSHIP 接触点时间线 ]</h6>
          <div className="partner-touchpoints">
            {touchpoints.map(([l, s]) => (
              <div key={l} className="ptp">
                <div className="ptp-dot"></div>
                <div className="ptp-l">{l}</div>
                <div className="ptp-s">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= 11 KPI DASHBOARD =============
const Sec11KPI = () => {
  const headline = [
    { n: '01', name: '认知 AWARENESS',     v: '110M', u: 'REACH · NA+EU',      trend: '+38% vs LY' },
    { n: '02', name: '拉新 ACQUISITION',   v: '1.9M', u: '新增 + 回流激活',    trend: '+24% vs baseline' },
    { n: '03', name: '参与 ENGAGEMENT',    v: '4.6M', u: 'TWITCH WATCH HOURS', trend: '+62% 峰值周' },
    { n: '04', name: '社交动能 MOMENTUM',  v: '480M', u: 'SHORTS · #FUSELIT',  trend: 'Top 3 游戏话题' },
  ];
  const kpiDimensions = [
    { cat: '认知', en: 'AWARENESS',     items: ['Trailer播放量 · 完播率','媒体报道篇数','品牌相关搜索量','Teaser互动数'] },
    { cat: '拉新', en: 'ACQUISITION',   items: ['新下载量','Store活动页访问','Wishlist / Follow增量','首局完成率'] },
    { cat: '回流', en: 'RE-ENGAGEMENT', items: ['流失玩家回流数','老玩家登录','活动期内日活变化','Drops领取率'] },
    { cat: 'Creator', en: 'CREATOR',    items: ['Creator视频总播放','直播观看时长','Drops领取总量','Creator引导下载'] },
    { cat: '社群', en: 'COMMUNITY',     items: ['Discord新增成员','城市频道活跃度','Reddit讨论帖数','Cipher参与人数'] },
    { cat: '社交', en: 'SOCIAL',        items: ['Shorts总播放','UGC投稿数','个人档案分享数','话题互动量'] },
  ];
  const phaseKpi = [
    ['P0','SIGNAL DETECTED',  ['Teaser互动','倒计时页访问','社区猜测热度','Cipher报名']],
    ['P1','MISSION ACCEPTED', ['Reveal播放量','官网访问','Relay选择数','Wishlist增量']],
    ['P2A','GLOBAL LAUNCH',   ['下载量','回流玩家','Drops领取','首局完成']],
    ['P2B','RELAY WAR',       ['城市贡献','周报打开率','Discord活跃','Reddit帖数']],
    ['P3','COMPROMISED',      ['Final Extraction参与','Creator挑战播放','破译进度','Twitch峰值CCU']],
    ['P4','AFTER ACTION',     ['档案分享数','战报阅读','情绪净值','品牌关键词增量']],
  ];
  const keywords = [
    ['CINEMATIC',36,'var(--df-green)'],['TACTICAL',44,'var(--text-primary)'],['EXTRACTION',32,'var(--df-green)'],
    ['SQUAD',28,'var(--text-secondary)'],['NO PAY-TO-WIN',22,'var(--df-green)'],['SIGNAL',30,'var(--text-primary)'],
    ['DISGUISE',22,'var(--text-secondary)'],['RELAY',26,'var(--df-green)'],['CIPHER',20,'var(--text-secondary)'],
    ['ROGUE',34,'var(--mi-red)'],['MISSION',28,'var(--text-primary)'],['BACKUP',18,'var(--text-secondary)'],
  ];
  return (
    <section id="gtm-11" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <GTMMark n="11" k="KPI DASHBOARD" sub=" / 市场指标体系 · TARGETS BY PHASE" />
        <SectionHeader num="11" name="KPI DASHBOARD"
          title={<>每周<br/>追踪什么</>}
          kicker="市场口径，不重复In-Game / Off-Game的Telemetry。6个维度 · 26项指标，按阶段拆解，最后是品牌情绪词云。"
          accent="var(--df-amber)" />

        <div className="kpi-headline gv d1" style={{ marginTop: 0 }}>
          {headline.map(k => (
            <div key={k.n} className="kpi-card">
              <div className="kn">维度 {k.n}</div>
              <div className="knm">{k.name}</div>
              <div className="kv">{k.v}</div>
              <div className="ku">{k.u}</div>
              <div className="ktrend"><span>VS PLAN</span><span className="up">{k.trend}</span></div>
            </div>
          ))}
        </div>

        <div className="gv d2" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {kpiDimensions.map((dim) => (
            <div key={dim.cat} style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', padding: '18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.2em', marginBottom: 6 }}>{dim.cat} · {dim.en}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {dim.items.map(item => (
                  <li key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-secondary)', letterSpacing: '0.08em', padding: '5px 0', borderTop: '1px dashed var(--line)' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="phase-kpi-row gv d3">
          {phaseKpi.map(([n, name, items]) => (
            <div key={n} className="pkpi">
              <div className="pkp-n">PHASE {n}</div>
              <div className="pkp-name">{name}</div>
              <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="kw-cloud gv d4">
          <h6>[ 品牌情绪关键词 · BRAND SENTIMENT · WEEK 4 ]</h6>
          {keywords.map(([w, sz, c], i) => (
            <span key={w} className={`kw k${i+1}`} style={{ fontSize: `${sz}px`, color: c }}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 12 LAUNCH WAR ROOM =============
const Sec12WarRoom = () => {
  const [tick, setTick] = useStateM(() => new Date());
  useEffectM(() => {
    const t = setInterval(() => setTick(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const utc = tick.toISOString().slice(11, 19) + ' UTC';

  const [active, setActive] = useStateM(new Set());
  useEffectM(() => {
    let i = 0;
    const t = setInterval(() => {
      setActive(prev => {
        const next = new Set(prev);
        const idx = i % 7;
        if (next.has(idx)) next.delete(idx); else next.add(idx);
        i++;
        return next;
      });
    }, 1100);
    return () => clearInterval(t);
  }, []);

  const teams = [
    ['01','MARKETING LEAD',  '阶段节奏与跨团队决策'],
    ['02','COMMUNITY',       'Discord · Reddit · 社媒反馈监控'],
    ['03','CREATOR OPS',     'KOL直播 · Drops · 任务箱执行'],
    ['04','PRODUCT · LIVE',  '游戏内活动状态与热修响应'],
    ['05','WEB / CRM',       '官网 · Signal Map · 邮件/Push'],
    ['06','PR',              '媒体沟通 · 危机回应协议'],
    ['07','DATA',            '实时Dashboard与KPI追踪'],
  ];
  const escalations = [
    { trig: 'IF · Drops领取异常',        name: 'Drops Recovery',   resp: 'Twitch + 平台团队接手；社媒30分钟内推送FAQ帖。', owner: '负责方 · Creator Ops' },
    { trig: 'IF · Disguise负面反馈集中', name: '机制调优',          resp: '社区团队收集案例；Product在下次重置窗口评估热修。', owner: '负责方 · Product LiveOps' },
    { trig: 'IF · Cipher超48小时卡死',  name: 'Signal Hint Drop', resp: '发布Signal Report提供渐进线索；置顶到Discord频道。', owner: '负责方 · Community' },
    { trig: 'IF · 城市贡献差距过大',    name: 'Relay增援',         resp: '12小时内安排Creator支援弱势Relay直播。', owner: '负责方 · Creator Ops' },
  ];

  const points = Array.from({ length: 40 }).map((_, i) => {
    const x = (i / 39) * 100;
    const base = 50 - Math.sin(i / 4) * 15 - i * 0.6;
    return `${x.toFixed(2)},${Math.max(8, base + (Math.random() * 6 - 3)).toFixed(2)}`;
  }).join(' ');

  return (
    <section id="gtm-12" className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <GTMMark n="12" k="LAUNCH WAR ROOM" sub=" / 上线作战室 · LIVE MONITORING" />
        <SectionHeader num="12" name="LAUNCH WAR ROOM"
          title={<>方案已激活<br/>各席位就位</>}
          kicker="这不是静态方案——上线后7个作战席位全程值守，每2小时战情同步一次。指标异常或玩家反馈集中时，按升级流程触发响应。"
          accent="var(--df-amber)" />

        <div className="warroom gv d1" style={{ marginTop: 0 }}>
          <div className="team-board">
            <h6>
              <span>[ COMMAND DECK · 7 STATIONS · 指挥台 ]</span>
              <span className="clock">{utc}</span>
            </h6>
            <div className="team-grid">
              {teams.map(([n, name, job], i) => (
                <div key={n} className={`team-cell ${active.has(i) ? 'on' : ''}`}>
                  <div className="tcdot"></div>
                  <div className="tcn">STATION {n}</div>
                  <div className="tcname">{name}</div>
                  <div className="tcjob">{job}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="monitor-panel">
            <h6>
              <span>[ 实时监控 · LIVE TELEMETRY ]</span>
              <span style={{ color: 'var(--df-green)' }}>● STREAMING</span>
            </h6>
            <div className="mon-graph">
              <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                <polyline className="mline" points={points} />
                <line x1="0" y1="48" x2="100" y2="48" stroke="rgba(224,24,26,0.3)" strokeWidth="0.4" strokeDasharray="1 1" />
                <text x="2" y="46" fontSize="3" fill="rgba(224,24,26,0.6)" fontFamily="JetBrains Mono">SLA FLOOR</text>
              </svg>
            </div>
            <div className="mon-stats">
              <div className="mon-stat"><div className="ms-l">CCU</div><div className="ms-v">218K</div></div>
              <div className="mon-stat"><div className="ms-l">DROPS / HR</div><div className="ms-v">94K</div></div>
              <div className="mon-stat alert"><div className="ms-l">情绪值</div><div className="ms-v">+0.62</div></div>
            </div>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              节奏 · 每2H战情同步 / 每日复盘 / 72H后 Post-Mortem
            </div>
          </div>
        </div>

        <div className="escalation gv d2">
          {escalations.map((e, i) => (
            <div key={i} className="esc-card">
              <div className="esc-trig">{e.trig}</div>
              <h4 className="esc-name">{e.name}</h4>
              <div className="esc-resp">{e.resp}</div>
              <div className="esc-owner">{e.owner}</div>
            </div>
          ))}
        </div>

        <div className="gtm-cta gv d3">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--df-amber)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>// 方案已批准 · 等待最终部署指令</div>
            <h3>一支小队。<br/>一次任务。<br/><span style={{ color: 'var(--df-amber)', fontStyle: 'italic' }}>NO BACKUP.</span></h3>
            <p>GTM框架已完成。Phase 0起爆条件就位——等待最终 sign-off。</p>
          </div>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => document.getElementById('gtm-01')?.scrollIntoView({ behavior: 'smooth' })}>
              回到总览 REVIEW BRIEF
              <Icon.arrow width="12" height="12" />
            </button>
            <button className="btn btn-mi" onClick={() => window.location.hash = 'plan'}>
              返回作战计划
              <Icon.back width="12" height="12" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============= MAIN PAGE =============
const MarketingPage = ({ navigate }) => {
  useRevealGTM();
  return (
    <div className="page-enter">
      <GTMIndex />
      <Sec01Brief navigate={navigate} />
      <Sec02Strategy />
      <Sec03Channels />
      <Sec04Phased />
      <Sec05Creators />
      <Sec06Assets />
      <Sec07Platforms />
      <Sec08PaidMedia />
      <Sec09Social />
      <Sec10PR />
      <Sec11KPI />
      <Sec12WarRoom />
    </div>
  );
};

window.MarketingPage = MarketingPage;
