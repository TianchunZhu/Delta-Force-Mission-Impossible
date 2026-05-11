/* global React, Icon, DossierArt, LabelRow, SectionHeader, Breadcrumb */
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

// ============= REVEAL HOOK =============
const useReveal = () => {
  const ref = useRefP(null);
  const [shown, setShown] = useStateP(false);
  useEffectP(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
};

// Section wrapper with reveal
const RevealBlock = ({ children, className = '', delay = 0, dir = 'up', as: As = 'div', ...rest }) => {
  const [ref, shown] = useReveal();
  const dirCls = dir === 'left' ? 'reveal-l' : dir === 'right' ? 'reveal-r' : '';
  const dl = delay ? `delay-${delay}` : '';
  return (
    <As ref={ref} className={`reveal ${dirCls} ${dl} ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </As>
  );
};

// Animated counter
const Counter = ({ to, duration = 1500, prefix = '', suffix = '', decimals = 0 }) => {
  const [val, setVal] = useStateP(0);
  const [ref, shown] = useReveal();
  useEffectP(() => {
    if (!shown) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
};

// Animated ring (svg circle with stroke-dashoffset)
const Ring = ({ pct = 70, color = 'var(--df-green)', label }) => {
  const [ref, shown] = useReveal();
  const r = 38;
  const c = 2 * Math.PI * r;
  const dash = shown ? c * (1 - pct / 100) : c;
  return (
    <div className="ring" ref={ref}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={c} strokeDashoffset={dash}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.2,0.8,0.2,1)' }} />
      </svg>
      <div className="center">{label}</div>
    </div>
  );
};

// ============================================================
// SECTION DEFINITIONS — referenced by index strip
// ============================================================
const SECTIONS = [
  { id: 'sec-01', n: '01', label: 'HERO' },
  { id: 'sec-02', n: '02', label: 'OBJECTIVES' },
  { id: 'sec-03', n: '03', label: 'MARKET' },
  { id: 'sec-04', n: '04', label: 'AUDIENCE' },
  { id: 'sec-05', n: '05', label: 'IP LOGIC' },
  { id: 'sec-06', n: '06', label: 'CREATIVE' },
  { id: 'sec-07', n: '07', label: 'SLOGAN' },
  { id: 'sec-08', n: '08', label: 'PILLARS' },
  { id: 'sec-09', n: '09', label: 'ARCHITECTURE' },
  { id: 'sec-10', n: '10', label: 'PHASING' },
];

const PlanIndex = () => {
  const [active, setActive] = useStateP('sec-01');
  useEffectP(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="plan-index">
      {SECTIONS.map((s) => (
        <a key={s.id} className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <span className="bar"></span>
          <span>{s.n}</span>
          <span className="lbl">/ {s.label}</span>
        </a>
      ))}
    </nav>
  );
};

// ============= 01 HERO =============
const Sec01Hero = () => {
  const [typed, setTyped] = useStateP('');
  const target = 'STRATEGIC BRIEF';
  useEffectP(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="sec-01" className="plan-hero">
      <img src="图片素材/Campaign Plan Hero背景.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,7,7,0.42) 35%, rgba(5,7,7,0.08) 100%)', zIndex: 1 }} />
      <div className="scan-line"></div>
      <div className="container">
        <Breadcrumb trail={[
          { id: 'home', label: 'OVERVIEW' },
          { id: 'plan', label: '02 / CAMPAIGN PLAN' },
        ]} navigate={(id) => window.dispatchEvent(new CustomEvent('plan-nav', { detail: id }))} />

        <div style={{ marginTop: 24 }}>
          <LabelRow color="var(--df-green)">[CAMPAIGN PLAN] · STRATEGIC BRIEF</LabelRow>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'flex-end', marginTop: 28 }}>
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', margin: 0, lineHeight: 0.86, letterSpacing: '-0.005em' }}>
              OPERATION<br/>
              <span style={{ background: 'linear-gradient(120deg, var(--df-green), var(--df-green-deep))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>ROGUE SIGNAL</span>
            </h1>
            <div style={{ marginTop: 26, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--df-green)', letterSpacing: '0.16em', textTransform: 'uppercase', minHeight: 22 }}>
              {'>'} {typed}<span className="cursor"></span>
            </div>
            <div style={{ marginTop: 22, maxWidth: 640, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: 'var(--text-primary)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                本次Campaign希望借助《碟中谍》的全球谍战叙事，把三角洲行动从"又一款现代军事FPS"进一步包装成<span style={{ color: 'var(--df-green)', fontWeight: 600 }}>「可参与的暑期战术大片」</span>。
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                《碟中谍》的核心并不是超能力，而是潜入、伪装、情报争夺、极限任务和团队协作；这些元素可以自然转译为三角洲行动中的小队行动、撤离压力、信号争夺和全服协作。尤其《Mission: Impossible – The Final Reckoning》的故事围绕IMF追踪渗透全球情报体系的AI威胁展开，这与<span style={{ color: 'var(--df-amber)' }}>「幽灵信号」「全球Relay节点」「不可能密码」</span>的Campaign设定高度契合。
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                因此，这次联动的目标不是简单引入一个知名IP，也不是做一次皮肤售卖，而是用"全球情报战"的外壳强化三角洲行动的差异化心智：它既有现代大战场的规模，也有撤离玩法的紧张感，更有小队协作和电影化任务执行的沉浸感。最终让欧美FPS用户形成一个清晰判断——<span style={{ color: 'var(--df-green)', fontWeight: 600 }}>三角洲行动是这个夏天最具电影感的小队战术FPS。</span>
              </p>
            </div>
          </div>
          <RevealBlock dir="right" className="card" style={{ padding: 22, background: 'var(--bg-card-2)' }}>
            <div className="ticker" style={{ color: 'var(--df-green)' }}>// MISSION PARAMETERS</div>
            <table style={{ width: '100%', marginTop: 10, fontSize: 13 }}>
              <tbody>
                {[
                  ['Code-name', 'ROGUE SIGNAL'],
                  ['Window', 'JUL 03 — AUG 14, 2026'],
                  ['Theatre', 'NA · EU · UK · ANZ'],
                  ['IP Partner', 'PARAMOUNT — M:I'],
                  ['Lead Studio', 'TIMI / DELTA FORCE EN'],
                  ['Classification', 'INTERNAL / NDA'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px dashed var(--line)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{k}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RevealBlock>
        </div>

        {/* Judgment cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 56 }}>
          {[
            {
              n: '01',
              title: '内容很强，但需要一个更清晰的入口',
              body: 'Delta Force 拥有大战场、撤离和战役内容，但欧美用户需要一个更直接的传播钩子。',
            },
            {
              n: '02',
              title: '市场很拥挤，不能只说"免费FPS"',
              body: 'COD、Battlefield、Tarkov、R6 已经占据成熟心智，Delta Force 必须形成自己的差异化表达。',
            },
            {
              n: '03',
              title: '暑期需要事件，而不是一次普通版本更新',
              body: '欧美FPS用户会被"事件感"驱动：挑战、直播、高光、社区协作、限时任务，而不只是版本公告。',
            },
          ].map((c, i) => (
            <RevealBlock key={c.n} delay={i + 2} className="card" style={{ padding: '22px 24px', borderLeft: '2px solid var(--df-green)', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-green)', letterSpacing: '0.2em', marginBottom: 10 }}>// JUDGEMENT {c.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10 }}>{c.title}</div>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
            </RevealBlock>
          ))}
        </div>

        {/* Page index strip */}
        <RevealBlock delay={3} style={{ marginTop: 56, padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="ticker" style={{ marginBottom: 14 }}>// 10 CHAPTERS · SCROLL OR JUMP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px 24px' }}>
            {SECTIONS.map((s, i) => (
              <a key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 0', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--df-green)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <span style={{ color: 'var(--df-green)' }}>{s.n}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

// ============= GENERIC CHAPTER MARK =============
const ChapterMark = ({ n, k, sub }) => (
  <RevealBlock className="chapter-mark">
    <span className="cn">{n}</span>
    <span className="ck"><strong>{k}</strong>{sub}</span>
  </RevealBlock>
);

// ============= 02 OBJECTIVES =============
const Sec02Objectives = () => {
  const objs = [
    { n: '01', t: 'ACQUISITION', sub: '拉新', body: '吸引 COD、Battlefield、Tarkov / DMZ、战术射击和动作电影用户进入三角洲行动。', kpi: '18M+ UNIQUES', tone: 'var(--df-green)' },
    { n: '02', t: 'RE-ENGAGEMENT', sub: '回流', body: '通过限时任务、全服进度、城市 Relay 和解谜事件，召回已下载但流失的 PC / 主机玩家。', kpi: 'RETURNING OPS', tone: 'var(--df-amber)' },
    { n: '03', t: 'BRAND POSITIONING', sub: '心智', body: '让用户不再把三角洲行动看作"又一个 F2P FPS"，而是"电影感小队战术 FPS"。', kpi: '+22PT BRAND LIFT', tone: 'var(--mi-red)' },
    { n: '04', t: 'CULTURAL MOMENTUM', sub: '传播', body: '通过 Creator 挑战、城市节点、全服破译和短视频高光，形成暑期社群讨论事件。', kpi: '120M+ REACH', tone: 'var(--warn-yellow)' },
  ];
  return (
    <section id="sec-02" className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 32 }}>
          <div>
            <ChapterMark n="02" k="CAMPAIGN OBJECTIVE" sub=" / WHY WE'RE DOING THIS CAMPAIGN" />
            <SectionHeader num="01" name="CAMPAIGN OBJECTIVE"
              title={<>Campaign<span style={{ color: 'var(--mi-red)' }}>目标</span></>}
              kicker="本次联动不是一次单纯内容更新，也不是一次皮肤销售活动。它的目标是借助碟中谍的全球动作谍战认知，把三角洲行动在欧美市场重新包装为「暑期最有电影感的小队战术FPS」。" />
          </div>
          <RevealBlock dir="right" style={{ overflow: 'hidden', borderRadius: 2 }}>
            <img src="图片素材/欧美FPS市场定位图背景.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: 320 }} />
          </RevealBlock>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {objs.map((o, i) => (
            <RevealBlock key={o.n} delay={i + 1} className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 18, right: 18, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 64, color: o.tone, opacity: 0.15, lineHeight: 1 }}>{o.n}</span>
              <div className="ticker" style={{ color: o.tone }}>// OBJECTIVE {o.n}</div>
              <h3 className="display" style={{ fontSize: 28, margin: '14px 0 4px', textTransform: 'uppercase' }}>{o.t}</h3>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 15, color: o.tone, marginBottom: 10 }}>{o.sub}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65, margin: '0 0 18px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{o.body}</p>
              <div style={{ paddingTop: 14, borderTop: '1px dashed var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="ticker">// TARGET</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: o.tone }}>{o.kpi}</span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 03 MARKET =============


const Sec03Market = () => {
  const competitors = [
    { name: 'CALL OF DUTY / WARZONE', share: 31, color: '#f59e0b', note: 'Cinematic, mainstream, fatigue rising' },
    { name: 'BATTLEFIELD 6 / 2042 / REDSEC', share: 13, color: '#3aa9ff', note: 'Resurgent, focus on milsim spectacle' },
    { name: 'TARKOV / DMZ', share: 12, color: '#a78bfa', note: 'Hardcore extraction niche' },
    { name: 'R6 / READY OR NOT', share: 10, color: '#e879f9', note: 'Tactical cooperation, close-quarters' },
    { name: 'DELTA FORCE', share: 10, color: 'var(--df-green)', note: 'Rising — undefined positioning in West' },
    { name: 'OTHER FPS / SHOOTERS', share: 26, color: '#6b7672', note: 'Apex, Valorant, Marvel Rivals, etc.' },
  ];
  return (
    <section id="sec-03" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <ChapterMark n="03" k="MARKET OPPORTUNITY" sub=" / 欧美FPS市场中的 Delta Force 定位" />
        <SectionHeader num="03" name="MARKET OPPORTUNITY"
          title={<>欧美FPS<br/>市场机会</>}
          kicker="欧美FPS市场已经被多个成熟心智占据：COD代表快节奏爽感，Battlefield代表大战场规模，Tarkov / DMZ代表高风险撤离，Rainbow Six / Ready or Not代表战术协作。三角洲行动的机会，不是复制其中任何一个，而是整合出自己的差异化：大战场规模 + 撤离紧张感 + 小队协作 + 现代军事电影感。" />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'stretch' }}>
          <RevealBlock dir="left" className="card" style={{ padding: 28 }}>
            <div className="ticker">// WESTERN FPS — ESTIMATED ENGAGED MAU SHARE, FY 2025</div>
            <div style={{ marginTop: 18 }}>
              {competitors.map((c, i) => (
                <RevealBlock key={c.name} delay={i + 1}>
                  <div className="match-bar" style={{ display: 'block' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', color: c.color }}>{c.name}</span>
                      <span className="mpct" style={{ color: c.color }}>{c.share}%</span>
                    </div>
                    <div className="mtrack">
                      <div className="mfill" style={{ background: c.color, width: `${c.share * 2}%`, transitionDelay: `${i * 0.1}s` }}></div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 4, marginBottom: 14 }}>{c.note}</div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock dir="right" className="card" style={{ padding: 28, background: 'var(--bg-card-2)' }}>
            <span className="dossier-corner tl">// THE OPENING</span>
            <span className="dossier-corner tr">FILE 03.A</span>
            <div style={{ paddingTop: 24 }}>
              <h3 className="display" style={{ fontSize: 26, margin: '0 0 2px', textTransform: 'uppercase' }}>THREE STRUCTURAL GAPS</h3>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)', marginBottom: 14, letterSpacing: '0.06em' }}>三个结构性市场空缺</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
                {[
                  {
                    t: '联动疲劳',
                    b: '欧美FPS玩家不再满足于"影视IP + 商城皮肤"的浅层合作。他们需要更符合游戏世界观、更有参与感的Live-Ops事件，而不是一次性 cosmetic drop。',
                    opp: '把碟中谍联动做成一场可玩的全球情报行动，而不是一组可购买外观。',
                  },
                  {
                    t: '撤离空缺',
                    b: 'Tarkov证明了撤离玩法的吸引力，但其硬核门槛限制了更大范围的欧美FPS用户进入。市场仍缺少一款更易进入、更具电影感、更适合直播传播的战术撤离体验。',
                    opp: '让 Delta Force 成为「更大众可进入的电影化撤离战术FPS」。',
                  },
                  {
                    t: '文化延展空缺',
                    b: '《Final Reckoning》带来强烈的系列终章情绪，但电影热度在档期之后需要新的互动载体延续。观众不只想回看任务，更希望继续参与任务。',
                    opp: '让 Delta Force 成为碟中谍在游戏世界里的数字延展：玩家不是观看 Ethan Hunt 完成任务，而是亲自执行下一场不可能任务。',
                  },
                ].map((item, i) => (
                  <li key={i} style={{ padding: '14px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
                      <span style={{ color: 'var(--df-green)', fontFamily: 'var(--font-mono)', fontSize: 12, flexShrink: 0 }}>0{i + 1}</span>
                      <strong style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.02em' }}>{item.t}</strong>
                    </div>
                    <p style={{ margin: '0 0 8px 22px', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65 }}>{item.b}</p>
                    <div style={{ margin: '0 0 0 22px', padding: '8px 12px', borderLeft: '2px solid var(--df-green)', background: 'rgba(63,214,106,0.05)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-green)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>// 机会</span>
                      <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--df-green)', lineHeight: 1.6 }}>{item.opp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
};

// ============= 04 IP LOGIC =============
const Sec04IPLogic = () => {
  const criteria = [
    { n: '01', q: '调性是否匹配？', body: '需要现代军事、谍战、战术行动的语境，而不是超能力幻想或卡通风格。M:I 的整体基调是写实动作谍战，与三角洲行动的产品气质高度一致。', verdict: 'MATCHED', pass: true },
    { n: '02', q: '能否转译成玩法？', body: '核心玩法元素需要能被IP自然承接：潜入渗透、伪装变脸、情报争夺、极限撤离、破解加密信号——这些在碟中谍叙事中均有直接原型。', verdict: 'MATCHED', pass: true },
    { n: '03', q: '能否吸引欧美FPS玩家？', body: '目标受众需要对IP有足够认知。M:I 在欧美动作片受众、18-45岁男性、战术内容观众中均有强覆盖，且《Final Reckoning》于2025年5月上映，热度窗口与Campaign时间吻合。', verdict: 'MATCHED', pass: true },
    { n: '04', q: '是否会破坏产品定位？', body: '联动不能让核心玩家感到"世界观被稀释"。M:I 属于写实谍战动作类型，不存在幻想元素入侵的风险；执行上需确保IP作为任务包装层，而非游戏核心机制的替代。', verdict: 'CONTROLLED', pass: false },
    { n: '05', q: '是否适合暑期事件？', body: '需要具备大片感、话题感、可直播、可短视频的传播特质。M:I 的悬疑解谜、极限任务和高燃时刻天然适合社交高光剪辑，ARG解密链路也可驱动社区持续参与。', verdict: 'MATCHED', pass: true },
  ];
  return (
    <section id="sec-05" className="section">
      <div className="container">
        <ChapterMark n="05" k="WHY MISSION: IMPOSSIBLE" sub=" / 为什么是碟中谍？" />
        <SectionHeader num="05" name="IP SELECTION"
          title={<>为什么是<br/><span style={{ color: 'var(--mi-red)', fontStyle: 'italic' }}>碟中谍？</span></>}
          kicker="这次联动需要的不是「热闹IP」，而是一个能把 Delta Force 核心玩法合理包装起来的叙事外壳。我们用五条标准对候选IP进行筛选——Mission: Impossible 在调性、玩法转译、受众认知和暑期传播上全部达标，同时不会把三角洲行动推向娱乐大乱斗方向。" />

        {/* Screening matrix */}
        <RevealBlock className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '14px 24px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ticker">// IP筛选矩阵 — MISSION: IMPOSSIBLE SCREENING</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--df-green)', letterSpacing: '0.14em' }}>5 / 5 CRITERIA EVALUATED</span>
          </div>
          {criteria.map((c, i) => (
            <RevealBlock key={c.n} delay={i + 1} style={{
              padding: '20px 24px',
              borderBottom: i < criteria.length - 1 ? '1px solid var(--line)' : 'none',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 32,
              alignItems: 'center',
            }}>
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.18em', flexShrink: 0 }}>// 标准 {c.n}</span>
                  <strong style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{c.q}</strong>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{c.body}</p>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: c.pass ? 'var(--df-green)' : 'var(--df-amber)',
                border: `1px solid ${c.pass ? 'var(--df-green)' : 'var(--df-amber)'}`,
                padding: '6px 16px',
                whiteSpace: 'nowrap',
                background: c.pass ? 'rgba(63,214,106,0.06)' : 'rgba(255,122,26,0.06)',
              }}>
                {c.pass ? '✓' : '△'} {c.verdict}
              </div>
            </RevealBlock>
          ))}
        </RevealBlock>

        {/* Conclusion */}
        <RevealBlock delay={6} className="card" style={{ padding: '28px 32px', borderLeft: '3px solid var(--df-green)', background: 'var(--bg-card-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <p style={{ margin: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1.6, color: 'var(--text-primary)' }}>
            结论：Mission: Impossible 是「能扩圈但不跑偏」的IP。
          </p>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.18em', marginBottom: 4 }}>// OVERALL</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28, color: 'var(--df-green)', letterSpacing: '0.02em' }}>IP FIT: HIGH</div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

// ============= 04B AUDIENCE LADDER =============
const Sec04Audience = () => {
  const layers = [
    {
      id: 'CORE', en: 'CORE USERS', zh: '核心用户',
      sub: 'Extraction / Tactical FPS', color: 'var(--df-green)',
      who: 'Tarkov/DMZ、R6/RoN、战术FPS核心用户。熟悉撤离压力、情报任务和小队协作，判断力强。',
      need: '他们要的是真正的玩法价值——高压决策、撤离成就感、战术博弈，不是"皮肤好看"。',
      risk: '联动只上商城无玩法 / IP元素破坏军事沉浸感 / 付费道具影响公平（尤其是伪装类机制）',
    },
    {
      id: 'MID', en: 'MID-CORE USERS', zh: '次核心用户',
      sub: 'Mainstream FPS / Big Battle', color: 'var(--df-amber)',
      who: 'COD/BF/Apex用户、FPS直播观众。熟悉快节奏交战、小队开黑和高光时刻。',
      need: '快速理解爽点——要能在5分钟内判断"今晚和朋友玩什么"，看重节奏感和可看性。',
      risk: '撤离机制太硬核 / Campaign世界观太抽象 / 缺少明确的社交入口',
    },
    {
      id: 'EXP', en: 'EXPANSION USERS', zh: '泛用户',
      sub: 'Action Film / ARG / Creator', color: 'var(--hud-cyan)',
      who: 'M:I影迷、ARG社区、TikTok观众、被大型Creator带入的轻度玩家。不一定是重度FPS用户。',
      need: '低门槛入口——不需要懂配装和地图，故事感、挑战感和社交话题足够驱动参与。',
      risk: 'FPS术语听不懂 / 传统游戏广告无吸引力 / 没有故事或社交钩子就只会旁观',
    },
  ];
  return (
    <section id="sec-04" className="section">
      <div className="container">
        <ChapterMark n="04" k="TARGET AUDIENCE LADDER" sub=" / 目标用户阶梯" />
        <SectionHeader num="04" name="AUDIENCE LADDER"
          title={<>优先打谁，<br/>再扩圈谁？</>}
          kicker="Campaign从核心FPS用户建立可信度，再向更广人群扩散。Newzoo 2025：PC/主机软件收入预计852亿美元；ESA 2025：美国2.051亿人定期游戏。规模足够大，关键是次序和钩子。" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {layers.map((l, i) => (
            <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, alignItems: 'stretch' }}>
              {/* Left pyramid segment — centered for symmetric inverted triangle */}
              <RevealBlock dir="left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: `${100 - i * 20}%`,
                  padding: '16px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--line)',
                  borderLeft: `3px solid ${l.color}`,
                  borderRight: `3px solid ${l.color}`,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: l.color, letterSpacing: '0.16em', marginBottom: 4 }}>{l.en}</div>
                  <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', var(--font-display)", fontWeight: 800, fontSize: 17 }}>{l.zh}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', marginTop: 4, letterSpacing: '0.1em' }}>{l.sub}</div>
                </div>
              </RevealBlock>
              {/* Right description card */}
              <RevealBlock delay={i + 1} className="card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: l.color, letterSpacing: '0.16em' }}>{l.en}</span>
                  <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: l.color }}>{l.zh}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  {[
                    { label: '// 用户是谁', text: l.who, c: 'var(--text-mute)' },
                    { label: '// 真实需求', text: l.need, c: 'var(--text-mute)' },
                    { label: '// 主要顾虑', text: l.risk, c: 'var(--mi-red)' },
                  ].map((col) => (
                    <div key={col.label}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: col.c, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>{col.label}</div>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{col.text}</p>
                    </div>
                  ))}
                </div>
              </RevealBlock>
            </div>
          ))}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', textAlign: 'center', width: `${100 / 3}%` }}>↑ PRIORITY · CREDIBILITY FIRST</div>
        </div>
      </div>
    </section>
  );
};

// ============= 05 CREATIVE =============
const Sec05Creative = () => (
  <section id="sec-06" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 32 }}>
        <div>
          <ChapterMark n="06" k="CORE CREATIVE" sub=" / OPERATION ROGUE SIGNAL — THE 60-SECOND PITCH" />
          <SectionHeader num="06" name="核心创意 / 60秒故事提案"
            title={<>"AN IMF AGENT<br/>HAS GONE DARK."</>}
            kicker="一条统一的故事主线，贯穿游戏内任务、现实城市节点和社媒ARG。同一个开局，在三个地方兑现：Trailer、Mission Contract、Social Cipher。" />
        </div>
        <RevealBlock dir="right" style={{ overflow: 'hidden', borderRadius: 2 }}>
          <img src="图片素材/失联IMF特工.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: 320 }} />
        </RevealBlock>
      </div>

      {/* 60-sec Pitch + Story Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 20, marginBottom: 32 }}>

        {/* Left: Classified Brief */}
        <RevealBlock dir="left" className="card" style={{ padding: 32, position: 'relative' }}>
          <span className="dossier-corner tl">// CLASSIFIED BRIEF</span>
          <span className="dossier-corner tr">60-SECOND PITCH</span>
          <div style={{ paddingTop: 28, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '0 0 12px' }}>一名IMF特工在追踪"Rogue Signal"时失联。</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '0 0 12px' }}>他最后一次上传的情报显示：一个跨国军火网络正在复制"Entity"的攻击逻辑，利用幽灵中继站 Ghost Relay 入侵全球情报链路、PMC行动路线、城市数据中心和撤离通道。</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '0 0 12px' }}>IMF无法公开介入，也无法确认这名特工是否叛变、被俘，或正在执行更深层的卧底任务。</p>
            <p style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.8, margin: '0 0 16px', fontWeight: 600 }}>Delta Force被临时纳入联合行动。</p>
            <div style={{ padding: '14px 16px', background: 'var(--bg-elev)', borderLeft: '2px solid var(--df-green)', marginBottom: 16 }}>
              <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 8 }}>// 任务很简单，也几乎不可能</div>
              {['找到失联特工留下的加密硬盘。', '破解他散落在全球Relay节点中的密码碎片。', '在敌方完全接管信号网络前，夺回Rogue Signal的源头。'].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontSize: 13.5, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--df-green)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>0{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: 1.5 }}>
              潜入。伪装。破译。撤离。<span style={{ color: 'var(--mi-red)' }}>没有支援。</span>
            </div>
          </div>
        </RevealBlock>

        {/* Right: 3 Story Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: '01', en: 'THE AGENT', zh: '一名IMF特工失联', body: '他留下了一段不完整的幽灵信号。身份未知，立场未知，坐标未知。', color: 'var(--df-amber)' },
            { n: '02', en: 'THE SIGNAL', zh: '幽灵中继站正在扩散', body: 'Ghost Relay开始入侵城市Relay节点，每一个节点都可能成为下一次情报泄露的入口。', color: 'var(--mi-red)' },
            { n: '03', en: 'THE MISSION', zh: 'Delta Force接管行动', body: '玩家必须夺取硬盘、伪装潜入、破解密码，并在最终撤离窗口关闭前锁定Rogue Signal源头。', color: 'var(--df-green)' },
          ].map((s, i) => (
            <RevealBlock key={s.n} delay={i + 1} className="card" style={{ padding: '20px 24px', borderLeft: `2px solid ${s.color}`, flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color, letterSpacing: '0.18em' }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{s.en}</span>
              </div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: s.color, marginBottom: 8 }}>{s.zh}</div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.65, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{s.body}</p>
            </RevealBlock>
          ))}
        </div>
      </div>

      {/* ONE SETUP. THREE PAYOFFS. */}
      <div className="divider-bar" style={{ marginBottom: 20 }}><span className="marker"></span><span>ONE SETUP · THREE PAYOFFS — 一个开局，三次兑现</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {[
          { code: 'PAYOFF 01', label: 'TRAILER', zh: '预告片兑现', color: 'var(--df-amber)', body: '用"IMF特工失联"的开局制造悬念：黑屏录音、残缺坐标、失控信号、天台撤离，最后一句："Your squad has been selected."' },
          { code: 'PAYOFF 02', label: 'MISSION CONTRACT', zh: '游戏内任务兑现', color: 'var(--df-green)', body: '游戏内任务不再只是"去某地拿物资"，而是承接失联特工留下的任务链：回收硬盘、伪装潜入、夺取信号、撤离并上传情报。' },
          { code: 'PAYOFF 03', label: 'SOCIAL ARG', zh: '社媒解谜兑现', color: 'var(--hud-cyan)', body: '失联特工留下的密码碎片散落在官网、Discord、城市OOH和Creator任务箱中。玩家与社区共同破译，逐步还原他的最后坐标。' },
        ].map((p, i) => (
          <RevealBlock key={p.code} delay={i + 1} className="card" style={{ padding: 24 }}>
            <div className="ticker" style={{ color: p.color, marginBottom: 8 }}>{p.code}</div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, textTransform: 'uppercase', margin: '0 0 4px', letterSpacing: '0.02em' }}>{p.label}</h4>
            <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 600, fontSize: 13, color: p.color, marginBottom: 12 }}>{p.zh}</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.65, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{p.body}</p>
          </RevealBlock>
        ))}
      </div>

      {/* Main Mission Thread */}
      <div className="divider-bar" style={{ marginBottom: 20 }}><span className="marker"></span><span>MAIN MISSION THREAD — 主任务线 · 6 MISSIONS</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { n: 'M01', en: 'Trace the Last Upload', zh: '追踪最后上传', body: '玩家从失联IMF特工留下的残缺信号出发，定位第一批Ghost Relay节点。建立悬念入口，开启城市Relay选择和全服战况页。' },
          { n: 'M02', en: 'Recover the Physical Drive', zh: '回收实体硬盘', body: '失联特工的情报被拆分成多个实体硬盘，散落在高危战区。把Operations撤离目标包装成情报回收行动。' },
          { n: 'M03', en: 'Assume the Cover', zh: '接管伪装身份', body: '玩家获得IMF身份伪装协议，短时伪装成敌方干员或AI单位进入机密区域。让碟中谍最有辨识度的"伪装"机制融入玩法。' },
          { n: 'M04', en: 'Secure the Relay Chain', zh: '稳固中继链路', body: 'Warfare中的信号塔和数据上传站成为城市Relay的带宽来源。让大战场占点行为接入同一条全球叙事链路。' },
          { n: 'M05', en: 'Break the Impossible Cipher', zh: '破解不可能密码', body: '玩家、Discord社区和Creator共同破解失联特工留下的密码碎片。Campaign从游戏内延伸到社交ARG和现实挑战。' },
          { n: 'M06', en: 'Final Extraction', zh: '最终撤离', body: '中央Ghost Relay坐标被破解后，玩家开启最终反攻，在撤离窗口关闭前夺回Rogue Signal源头，形成Campaign终局传播高潮。' },
        ].map((m, i) => (
          <RevealBlock key={m.n} delay={i + 1} className="card" style={{ padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 10, right: 14, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 44, color: 'var(--df-green)', opacity: 0.08, lineHeight: 1 }}>{m.n}</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-green)', letterSpacing: '0.2em', marginBottom: 6 }}>{m.n}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>{m.en}</div>
            <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--df-green)', marginBottom: 10 }}>{m.zh}</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{m.body}</p>
          </RevealBlock>
        ))}
      </div>
    </div>
  </section>
);

// ============= 06 SLOGAN =============
const Sec06Slogan = () => {
  const [ref, shown] = useReveal();
  const zhWords = ['一支小队，', '一个任务，', '没有支援。'];
  const enWords = ['ONE', 'SQUAD.', 'ONE', 'MISSION.', 'NO', 'BACKUP.'];
  return (
    <section id="sec-07" ref={ref} className="slogan">
      <div className="container">
        <ChapterMark n="07" k="COMMUNICATION PLATFORM" sub=" / 传播命题" />

        {/* English main slogan — big */}
        {shown && (
          <h2 className="slogan-line" style={{ marginBottom: 10 }}>
            <span className="slogan-words">
              {enWords.map((w, i) => (
                <span key={i}>
                  {i === 4 && <br/>}
                  <span className="w" style={{
                    animationDelay: `${i * 0.18}s`,
                    color: i === 1 ? 'var(--df-green)' : i === 3 ? 'var(--mi-red)' : 'inherit',
                    fontStyle: i === 5 ? 'italic' : 'normal',
                    marginRight: '0.3em',
                  }}>{w}</span>
                </span>
              ))}
            </span>
          </h2>
        )}

        {/* Chinese sub slogan — small */}
        {shown && (
          <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 2vw, 26px)', letterSpacing: '0.06em', marginBottom: 20, opacity: 0, animation: 'word-rise 0.7s ease 0.8s both' }}>
            {zhWords.map((w, i) => (
              <span key={i} style={{
                marginRight: '0.1em',
                color: i === 0 ? 'var(--df-green)' : i === 2 ? 'var(--mi-red)' : 'var(--text-secondary)',
              }}>{w}</span>
            ))}
          </div>
        )}

        {/* Why this works */}
        <div className="slogan-sub" style={{ marginBottom: 48 }}>
          {shown && (
            <span style={{ animation: 'word-rise 0.8s ease 1.2s both', display: 'inline-block', opacity: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, letterSpacing: '0.05em', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              它同时命中三角洲行动和碟中谍的共同核心：小队、任务、高压、信任、撤离。
            </span>
          )}
        </div>

        {/* Audience messages + Do/Don't */}
        <RevealBlock delay={4} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20, textAlign: 'left' }}>
          {/* Three audience messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { seg: '对核心FPS玩家', color: 'var(--df-green)', msg: '这不是一次普通对局，而是一场会暴露你位置的高压撤离。' },
              { seg: '对大战场玩家', color: 'var(--df-amber)', msg: '你占下的每一座信号塔，都会改变城市Relay的战况。' },
              { seg: '对社区和Creator', color: 'var(--hud-cyan)', msg: '你破解的每一段信号，都会推动全服接近最终任务。' },
            ].map((a, i) => (
              <div key={i} style={{ padding: '16px 20px', borderLeft: `2px solid ${a.color}`, background: 'var(--bg-card)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: a.color, letterSpacing: '0.14em', whiteSpace: 'nowrap', paddingTop: 2 }}>// {a.seg}</span>
                <p style={{ margin: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.65 }}>{a.msg}</p>
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="card" style={{ padding: 20 }}>
            <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 14 }}>// 不建议方向</div>
            {['主打"明星脸"', '主打"搞怪皮肤"', '主打超能力幻想', '主打"买Bundle变强"'].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mi-red)', flexShrink: 0, marginTop: 1 }}>✕</span>
                <span>不{d}</span>
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

// ============= 07 PILLARS =============
const Sec07Pillars = () => {
  const pillars = [
    {
      key: 'PLAY', code: '07.A', name: 'PLAY',
      tag: '让联动可玩',
      icn: <Icon.reticle width="28" height="28" />,
      desc: '负责把碟中谍的特工幻想转译成游戏内目标。核心问题：玩家进入游戏后，能不能真的感到自己在执行"不可能任务"？',
      bullets: ['游戏内任务合约', '身份伪装机制', '联动外观体系', '后续展开：In-Game Ops'],
    },
    {
      key: 'CONNECT', code: '07.B', name: 'CONNECT',
      tag: '让玩家有归属',
      icn: <Icon.helix width="28" height="28" />,
      desc: '负责把单局战斗连接到城市Relay与全服进度。核心问题：玩家打完一局后，能不能感到自己推进了一个更大的行动？',
      bullets: ['Global Signal Map', '城市Relay系统', 'Impossible Cipher解谜链路', '后续展开：Off-Game Ops'],
    },
    {
      key: 'AMPLIFY', code: '07.C', name: 'AMPLIFY',
      tag: '让事件被看见',
      icn: <Icon.speaker width="28" height="28" />,
      desc: '负责把高光、谜题、Creator、城市线索转化为传播内容。核心问题：不玩游戏的人，能不能通过视频、直播和社交话题理解这场行动？',
      bullets: ['电影感预告片', 'Creator分层机制', '平台与社媒放大', '后续展开：GTM / Marketing'],
    },
  ];
  return (
    <section id="sec-08" className="section">
      <div className="container">
        <ChapterMark n="08" k="CAMPAIGN ARCHITECTURE" sub=" / 三条策略线" />
        <SectionHeader num="08" name="CAMPAIGN ARCHITECTURE"
          title={<>三条策略线<br/>分工协作</>}
          kicker="Play / Connect / Amplify 三条线各司其职：让联动可玩、让玩家有归属、让事件被看见。所有执行动作都归属其中一条，没有归属的不上线。" />

        <div className="pillar3">
          {pillars.map((p, i) => (
            <RevealBlock key={p.key} delay={i + 1} className="pillar3-card">
              <div className="icn" style={{ color: 'var(--df-green)' }}>{p.icn}</div>
              <div className="pmono">{p.code} · {p.tag}</div>
              <h3 className="pname-l">{p.name}</h3>
              <p className="pdesc-l">{p.desc}</p>
              <ul className="pbullets">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 09 ARCHITECTURE =============
const Sec09Architecture = () => {
  const [ref, shown] = useReveal();
  return (
    <section id="sec-09" className="section">
      <div className="container">
        <ChapterMark n="09" k="CAMPAIGN 架构" sub=" / 游戏内 × 游戏外 · 闭环联动" />
        <SectionHeader num="09" name="CAMPAIGN 架构"
          title={<>双轨并行，<br/>闭环驱动。</>}
          kicker="游戏内与游戏外并不是平行关系——它们互相驱动。ARG谜题解锁游戏内任务合约；游戏内发现触发现实落地动作。这个闭环本身，就是Campaign。" />

        <RevealBlock className="card" style={{ padding: 32 }}>
          <div ref={ref} className="arch-loop">
            <svg viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--df-green)" />
                </marker>
                <marker id="arrR" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--mi-red)" />
                </marker>
              </defs>
              {/* In-game (left) */}
              <g opacity={shown ? 1 : 0} style={{ transition: 'opacity 0.6s 0.1s' }}>
                <rect x="60" y="80" width="320" height="320" fill="none" stroke="var(--df-green)" strokeWidth="1.5" />
                <text x="80" y="110" fill="var(--df-green)" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="3">// 游戏内行动</text>
                <text x="80" y="160" fill="var(--text-primary)" fontFamily="var(--font-display)" fontSize="32" fontWeight="800">PLAY</text>
                {['MISSION CHAIN', 'INFILTRATION MODE', 'BATTLE PASS S04', 'OPERATOR SKINS', 'CIPHER CONTRACTS'].map((t, i) => (
                  <g key={t}>
                    <rect x="80" y={200 + i * 36} width="280" height="28" fill="var(--bg-elev)" stroke="var(--line)" />
                    <text x="96" y={219 + i * 36} fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">{t}</text>
                    <circle cx="346" cy={214 + i * 36} r="3" fill="var(--df-green)" />
                  </g>
                ))}
              </g>
              {/* Off-game (right) */}
              <g opacity={shown ? 1 : 0} style={{ transition: 'opacity 0.6s 0.3s' }}>
                <rect x="620" y="80" width="320" height="320" fill="none" stroke="var(--mi-red)" strokeWidth="1.5" />
                <text x="640" y="110" fill="var(--mi-red)" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="3">// 游戏外行动</text>
                <text x="640" y="160" fill="var(--text-primary)" fontFamily="var(--font-display)" fontSize="32" fontWeight="800">CONNECT</text>
                {['ARG / CIPHER HUNT', 'KOL ONSLAUGHT', 'IRL GEO-CACHE', 'M:I 8 PRE-ROLL', 'CREATOR PROGRAM'].map((t, i) => (
                  <g key={t}>
                    <rect x="640" y={200 + i * 36} width="280" height="28" fill="var(--bg-elev)" stroke="var(--line)" />
                    <text x="656" y={219 + i * 36} fill="var(--text-secondary)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">{t}</text>
                    <circle cx="906" cy={214 + i * 36} r="3" fill="var(--mi-red)" />
                  </g>
                ))}
              </g>
              {/* Center hub */}
              <g opacity={shown ? 1 : 0} style={{ transition: 'opacity 0.6s 0.5s' }}>
                <circle cx="500" cy="240" r="80" fill="var(--bg-card-2)" stroke="var(--df-green)" strokeWidth="2" />
                <circle cx="500" cy="240" r="60" fill="none" stroke="var(--df-green)" strokeWidth="1" strokeDasharray="2 4">
                  <animateTransform attributeName="transform" type="rotate" from="0 500 240" to="360 500 240" dur="20s" repeatCount="indefinite" />
                </circle>
                <text x="500" y="232" textAnchor="middle" fill="var(--df-green)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="3">// 闭环</text>
                <text x="500" y="258" textAnchor="middle" fill="var(--text-primary)" fontFamily="var(--font-display)" fontSize="22" fontWeight="900">FUSE</text>
              </g>
              {/* Flow arrows */}
              {shown && (
                <g>
                  <path d="M380 200 Q450 180 420 240" fill="none" stroke="var(--df-green)" strokeWidth="2" markerEnd="url(#arr)" className="flow-line" />
                  <path d="M580 240 Q550 180 620 200" fill="none" stroke="var(--mi-red)" strokeWidth="2" markerEnd="url(#arrR)" className="flow-line" />
                  <path d="M620 320 Q550 320 580 260" fill="none" stroke="var(--mi-red)" strokeWidth="2" markerEnd="url(#arrR)" className="flow-line" />
                  <path d="M420 260 Q450 320 380 320" fill="none" stroke="var(--df-green)" strokeWidth="2" markerEnd="url(#arr)" className="flow-line" />

                  <text x="450" y="170" textAnchor="middle" fill="var(--df-green)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">解锁</text>
                  <text x="550" y="170" textAnchor="middle" fill="var(--mi-red)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">触发</text>
                  <text x="450" y="345" textAnchor="middle" fill="var(--df-green)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">奖励反馈</text>
                  <text x="550" y="345" textAnchor="middle" fill="var(--mi-red)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">驱动</text>
                </g>
              )}
              {/* Bottom amplify bar */}
              <g opacity={shown ? 1 : 0} style={{ transition: 'opacity 0.6s 0.7s' }}>
                <rect x="60" y="430" width="880" height="40" fill="var(--bg-elev)" stroke="var(--line-strong)" />
                <text x="80" y="456" fill="var(--warn-yellow)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3">// 放大层 · 付费+自然媒体 — 预告片 · KOL · M:I 8 院线联动 · 28个市场</text>
              </g>
            </svg>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

// ============= 10 PHASING =============
const Sec10Phasing = () => {
  const [ref, shown] = useReveal();
  const phases = [
    { wk: 'WK -2', name: 'TEASE', sub: 'CIPHER LEAK', x: 5 },
    { wk: 'WK 1', name: 'IGNITE', sub: 'TRAILER + LAUNCH', x: 22 },
    { wk: 'WK 2', name: 'INFILTRATE', sub: 'MISSION CHAIN OPENS', x: 38 },
    { wk: 'WK 3-4', name: 'PEAK', sub: 'IRL EVENTS + ARG', x: 56 },
    { wk: 'WK 5', name: 'CLIMAX', sub: 'FINAL CIPHER + REVEAL', x: 76 },
    { wk: 'WK 6', name: 'EXTRACT', sub: 'REWARDS + S04 BRIDGE', x: 93 },
  ];
  return (
    <section id="sec-10" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <ChapterMark n="10" k="PHASE NODES" sub=" / 6-WEEK CAMPAIGN BEAT MAP" />
        <SectionHeader num="10" name="TIMING & RHYTHM"
          title={<>SIX WEEKS.<br/>SIX BEATS.</>}
          kicker="From the cipher leak (T-2 weeks) to the rewards drop (T+6), every week has a single dominant beat. No content overlaps." />

        <RevealBlock>
          <div ref={ref} className={`phase-track ${shown ? 'in' : ''}`}>
            <div className="axis">
              <div className="axis-fill"></div>
              {phases.map((p, i) => (
                <div key={p.name} style={{ left: `${p.x}%`, position: 'absolute', top: 0 }}>
                  <div className="pmark" style={{ left: 0, transitionDelay: `${i * 0.18}s` }}></div>
                  <div className="plabel-top" style={{ left: 0 }}>
                    <span className="wk">{p.wk}</span>
                    {p.name}
                  </div>
                  <div className="plabel-bot" style={{ left: 0 }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* CAMPAIGN ROADMAP */}
        <RevealBlock delay={3} style={{ marginTop: 56 }}>
          <div className="divider-bar" style={{ marginBottom: 20 }}><span className="marker"></span><span>CAMPAIGN ROADMAP — 6周Campaign作战路线图</span></div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 960, display: 'grid', gridTemplateColumns: '150px repeat(6, 1fr)', border: '1px solid var(--line)', borderRight: 'none', borderBottom: 'none' }}>
              {/* Header label corner */}
              <div style={{ padding: '12px 14px', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-elev)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', display: 'flex', alignItems: 'center' }}>// 模块</div>
              {/* Phase header columns */}
              {[
                { range: 'T-14 ~ T-10', label: 'PHASE 0', sub: '信号侦测', color: 'var(--text-mute)' },
                { range: 'T-9 ~ T-5', label: 'PHASE 1', sub: '任务接受', color: 'var(--df-amber)' },
                { range: 'T0 ~ T+7', label: 'PHASE 2A', sub: '全球防卫升启', color: 'var(--df-green)' },
                { range: 'T+8 ~ T+14', label: 'PHASE 2B', sub: '节点战升级', color: 'var(--df-green)' },
                { range: 'T+15 ~ T+21', label: 'PHASE 3', sub: '节点告急周', color: 'var(--mi-red)' },
                { range: 'T+22 ~ T+28', label: 'PHASE 4', sub: '战后报告', color: 'var(--hud-cyan)' },
              ].map((p) => (
                <div key={p.label} style={{ padding: '12px 14px', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-elev)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: p.color, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 2 }}>{p.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', letterSpacing: '0.06em', marginBottom: 3 }}>{p.range}</div>
                  <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: p.color, fontWeight: 700 }}>{p.sub}</div>
                </div>
              ))}
              {/* Content rows */}
              {[
                { label: '叙事主线', color: 'var(--df-green)', cells: ['异常信号预热；官网倒计时开启', 'Reveal Trailer发布；Relay选择开启', '联动活动正式上线；Launch Trailer', 'Relay排行榜与Weekly Report上线', 'Final Extraction解锁；节点告急', '全球战报发布；After Action Report'] },
                { label: '玩家行动', color: 'var(--hud-cyan)', cells: ['猜测IP与信号来源', '选择城市Relay；加入城市频道', '分享撤离、变脸、信号塔高光', '跨城市交换Cipher线索', '集中破解最终坐标；组织反攻', '复盘最快破译与最佳城市'] },
                { label: '官网 / 产品触点', color: 'var(--df-amber)', cells: ['倒计时页；大厅埋异常信号视觉', 'Global Signal Map；Relay选择；Cipher进度条', '个人贡献值；任务入口；Drops入口；Operations上线', 'Relay排行榜；每日简报；Cipher进度；局内环境变化', 'Final Extraction倒计时；告急节点页', 'After Action Report页；奖励结算'] },
                { label: '社媒 / 社区', color: 'var(--mi-red)', cells: ['社媒发布乱码信号；Discord第一条坐标', '官方公布联动；Reddit开线索主帖', '每日城市战况；短视频玩法高光', 'Weekly Signal Report；城市排名讨论', '节点告急警报；全服破译倒计时', '全球贡献数据；城市排名；解谜复盘'] },
                { label: 'Creator / KOL', color: 'var(--warn-yellow)', cells: ['Mission Briefing任务箱寄送', 'Relay Captain / Cipher Hunter公布', 'FPS Creator直播No Backup Extraction', '城市队长冲榜；解谜Creator带线索', '大型KOL现实任务箱挑战', 'Creator复盘视频与高光合集'] },
                { label: '内容资产', color: 'var(--text-secondary)', cells: ['异常信号Teaser；加密坐标图；任务箱短片', 'Reveal Trailer；Global Signal Map Trailer；Relay卡', 'Launch Trailer；玩法解释视频；Drops图', '城市战报模板；Cipher线索图；排行榜图', 'Final Extraction Trailer；Compromised警报图', 'After Action Report长图；高光混剪'] },
                { label: '阶段目标', color: 'var(--df-green)', isGoal: true, cells: ['制造悬念', '建立参与入口', '形成首波参与', '推动持续贡献', '制造Campaign高潮', '沉淀品牌资产'] },
              ].map((r) => (
                <React.Fragment key={r.label}>
                  <div style={{ padding: '12px 14px', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', borderLeft: `2px solid ${r.color}`, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 12, color: r.color }}>{r.label}</div>
                  {r.cells.map((c, ci) => (
                    <div key={ci} style={{ padding: '12px 14px', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', fontSize: 12, lineHeight: 1.6, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", color: r.isGoal ? 'var(--df-green)' : 'var(--text-secondary)', background: r.isGoal ? 'rgba(63,214,106,0.05)' : 'transparent', fontWeight: r.isGoal ? 700 : 400, textAlign: r.isGoal ? 'center' : 'left' }}>{c}</div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

// ============= ROOT =============
const PlanPage = ({ navigate }) => {
  useEffectP(() => {
    const handler = (e) => navigate(e.detail);
    window.addEventListener('plan-nav', handler);
    return () => window.removeEventListener('plan-nav', handler);
  }, [navigate]);

  return (
    <div className="page-enter">
      <PlanIndex />
      <Sec01Hero />
      <Sec02Objectives />
      <Sec03Market />
      <Sec04Audience />
      <Sec04IPLogic />
      <Sec05Creative />
      <Sec06Slogan />
      <Sec07Pillars />
      <Sec09Architecture />
      <Sec10Phasing />
    </div>
  );
};

window.PlanPage = PlanPage;
