/* global React, Icon, LabelRow, SectionHeader, Breadcrumb */
const { useState: useStateG, useEffect: useEffectG, useRef: useRefG } = React;

const useRevealG = () => {
  const ref = useRefG(null);
  const [shown, setShown] = useStateG(false);
  useEffectG(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown];
};

const RevealG = ({ children, className = '', delay = 0, dir = 'up', as: As = 'div', ...rest }) => {
  const [ref, shown] = useRevealG();
  const dirCls = dir === 'left' ? 'reveal-l' : dir === 'right' ? 'reveal-r' : '';
  const dl = delay ? `delay-${delay}` : '';
  return (
    <As ref={ref} className={`reveal ${dirCls} ${dl} ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </As>
  );
};

const IG_SECTIONS = [
  { id: 'ig-01', n: '01', label: 'FIELD BRIEF' },
  { id: 'ig-02', n: '02', label: 'STRUCTURE' },
  { id: 'ig-03', n: '03', label: 'JOURNEY' },
  { id: 'ig-04', n: '04', label: 'RELAY STATE' },
  { id: 'ig-05', n: '05', label: 'OPERATIONS' },
  { id: 'ig-06', n: '06', label: 'DISGUISE' },
  { id: 'ig-07', n: '07', label: 'GADGET KIT' },
  { id: 'ig-08', n: '08', label: 'WARFARE' },
  { id: 'ig-09', n: '09', label: 'FINAL EXFIL' },
  { id: 'ig-10', n: '10', label: 'CONTRACTS' },
  { id: 'ig-11', n: '11', label: 'REWARDS' },
  { id: 'ig-12', n: '12', label: 'FAIRNESS' },
  { id: 'ig-13', n: '13', label: 'TELEMETRY' },
];

const IGIndex = () => {
  const [active, setActive] = useStateG('ig-01');
  useEffectG(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px' });
    IG_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="plan-index">
      {IG_SECTIONS.map((s) => (
        <a key={s.id} className={active === s.id ? 'active' : ''}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <span className="bar"></span><span>{s.n}</span><span className="lbl">/ {s.label}</span>
        </a>
      ))}
    </nav>
  );
};

const IGMark = ({ n, k, sub }) => (
  <RevealG className="chapter-mark">
    <span className="cn">{n}</span>
    <span className="ck"><strong>{k}</strong>{sub}</span>
  </RevealG>
);

const IGDivider = ({ label }) => (
  <div className="divider-bar" style={{ margin: '32px 0 20px' }}>
    <span className="marker"></span><span>{label}</span>
  </div>
);

// ============= 01 FIELD BRIEF =============
const IGSec01 = ({ navigate }) => {
  const [typed, setTyped] = useStateG('');
  const target = 'ROGUE SIGNAL FIELD OPERATIONS';
  useEffectG(() => {
    let i = 0;
    const t = setInterval(() => { i++; setTyped(target.slice(0, i)); if (i >= target.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="ig-01" className="plan-hero" style={{ backgroundImage: 'url("图片素材/ingame首屏背景.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,7,7,0.65) 30%, rgba(5,7,7,0.25) 100%)', zIndex: 1 }} />
      <div className="scan-line"></div>
      <div className="container">
        <Breadcrumb trail={[
          { id: 'home', label: 'OVERVIEW' },
          { id: 'plan', label: '02 / CAMPAIGN PLAN' },
          { id: 'ingame', label: '02.1 / IN-GAME OPS' },
        ]} navigate={navigate} />
        <div style={{ marginTop: 24 }}>
          <LabelRow color="var(--df-green)">[IN-GAME OPS] · 02.1 / ROGUE SIGNAL FIELD OPERATIONS</LabelRow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'flex-end', marginTop: 28 }}>
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(52px, 8vw, 110px)', margin: 0, lineHeight: 0.86, letterSpacing: '-0.005em' }}>
              IN-GAME<br/>
              <span style={{ background: 'linear-gradient(120deg, var(--df-green), var(--df-green-deep))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>OPS</span>
            </h1>
            <div style={{ marginTop: 10, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--text-secondary)' }}>游戏内行动方案</div>
            <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--df-green)', letterSpacing: '0.16em', minHeight: 20 }}>{'>'} {typed}<span className="cursor"></span></div>
            <div style={{ marginTop: 18, maxWidth: 640, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: 'var(--text-primary)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>失联IMF特工留下的情报被拆分为多个 Physical Drive / 实体情报硬盘。</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>玩家将在Operations中回收实体情报硬盘，在Disguise Protocol中完成短时伪装潜入，在Warfare中争夺信号塔，并共同推进Final Extraction终局撤离任务。</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>核心不是<span style={{ color: 'var(--df-amber)', fontWeight: 600 }}>「买联动外观」</span>，而是让每一局对战都进入同一条情报战任务链。</p>
            </div>
          </div>
          <RevealG dir="right" className="card" style={{ padding: 22, background: 'var(--bg-card-2)' }}>
            <div className="ticker" style={{ color: 'var(--df-green)' }}>// EVENT PARAMETERS</div>
            <table style={{ width: '100%', marginTop: 10, fontSize: 13, borderCollapse: 'collapse' }}>
              <tbody>
                {[{ k: 'Event Type', v: '限时战术行动' }, { k: 'Core Modes', v: 'Operations · Warfare' }].map(({ k, v }) => (
                  <tr key={k} style={{ borderBottom: '1px dashed var(--line)' }}>
                    <td style={{ padding: '8px 12px 8px 0', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{k}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{v}</td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '1px dashed var(--line)' }}>
                  <td style={{ padding: '8px 12px 8px 0', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Signature</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
                    {['Physical Drive', 'Disguise Protocol', 'Signal Tower', 'Final Extraction'].map((m) => <div key={m}>{m}</div>)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px 8px 0', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', verticalAlign: 'top', whiteSpace: 'nowrap' }}>Fairness</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    <div style={{ color: 'var(--df-green)' }}>Cosmetic Only</div>
                    <div style={{ color: 'var(--df-green)' }}>No Gameplay Advantage</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </RevealG>
        </div>
        <RevealG delay={3} style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="ticker" style={{ marginBottom: 14 }}>// 11 SECTIONS · SCROLL OR JUMP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px 24px' }}>
            {IG_SECTIONS.map((s) => (
              <a key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 0', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--df-green)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <span style={{ color: 'var(--df-green)' }}>{s.n}</span><span>{s.label}</span>
              </a>
            ))}
          </div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 02 EVENT STRUCTURE =============
const IGSec02 = () => {
  const lanes = [
    { n: '01', en: 'OPERATIONS', zh: '回收实体情报硬盘', color: 'var(--df-green)', desc: '负责提供高压撤离、情报围猎和小队 Hero Moment。撤离成功的瞬间是整个活动最高密度的内容产出节点。', contrib: 'Signal Defense Value + Cipher Fragment' },
    { n: '02', en: 'DISGUISE PROTOCOL', zh: '短时身份伪装', color: 'var(--df-amber)', desc: '负责提供碟中谍辨识度最高的潜入体验，但只作为活动内限时战术工具，不进入核心排位，不卖优势。', contrib: '不直接产出贡献倍率；仅通过帮助完成情报任务，间接提升任务成功率' },
    { n: '03', en: 'WARFARE', zh: '争夺信号塔', color: 'var(--hud-cyan)', desc: '负责让大战场玩家也能参与全服信号防卫，而不是被排除在撤离玩法之外。', contrib: 'Signal Defense Value + 城市节点进度' },
  ];
  const table = [
    { lane: 'Operations', problem: '让撤离玩法有明确任务目标', exp: '下载、携带、被围猎、撤离', contrib: '高额 Signal Defense Value + Cipher Fragment' },
    { lane: 'Disguise Protocol', problem: '强化碟中谍IP辨识度', exp: '5秒伪装、潜入、暴露风险', contrib: '提高情报任务完成效率，不直接加贡献倍率' },
    { lane: 'Warfare', problem: '让大战场玩家参与活动', exp: '占塔、推线、触发扫描', contrib: '稳定 Signal Defense Value + 城市节点进度' },
  ];
  return (
    <section id="ig-02" className="section" style={{ backgroundImage: 'url("图片素材/Event Structure.png")', backgroundSize: 'cover', backgroundPosition: 'center', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.55)', zIndex: 0 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <IGMark n="02" k="EVENT STRUCTURE" sub=" / 三条玩法线，共同推进 Rogue Signal" />
        <SectionHeader num="02" name="EVENT STRUCTURE"
          title={<>三条玩法线<br/>一个全服事件</>}
          kicker="这次游戏内活动不是一个独立新模式，而是三条玩法线共同推进同一个全服进度。每条线有各自的体验核心，共同推进 Signal Defense Value 和 Impossible Cipher 破解进度。" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {lanes.map((l, i) => (
            <RevealG key={l.n} delay={i + 1} className="card" style={{ padding: '24px 22px', borderTop: `3px solid ${l.color}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: l.color, letterSpacing: '0.18em', marginBottom: 8 }}>{l.n} / LANE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>{l.en}</div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 13, color: l.color, marginBottom: 12 }}>{l.zh}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, margin: '0 0 14px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{l.desc}</p>
              <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 12 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', marginBottom: 4 }}>// 全服贡献</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: l.color }}>{l.contrib}</div>
              </div>
            </RevealG>
          ))}
        </div>
        <RevealG delay={4} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// 功能分工对照表</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['玩法线', '解决的问题', '玩家体验', '全服贡献'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((r, i) => (
                  <tr key={r.lane} style={{ borderBottom: i < table.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: lanes[i].color, whiteSpace: 'nowrap' }}>{r.lane}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.problem}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.exp}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.contrib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 03 PLAYER JOURNEY =============
const IGSec03 = () => {
  const steps = [
    { n: '01', title: '进入活动页', body: '玩家在大厅看到 Rogue Signal 任务简报，选择今日任务线：Operations、Warfare 或 Cipher Contract。', color: 'var(--df-green)' },
    { n: '02', title: '选择贡献对象', body: '玩家选择一个城市 Relay 作为默认贡献节点。选择不影响匹配，不影响战斗力，只影响贡献归属和城市奖励。', color: 'var(--df-green)' },
    { n: '03', title: '完成局内目标', body: '通过回收实体情报硬盘、使用伪装协议、占领信号塔等方式获得行动贡献。每局都有明确的联动任务钩子。', color: 'var(--df-amber)' },
    { n: '04', title: '获得双进度', body: 'Signal Defense Value 推动城市 Relay 防卫；Cipher Fragment 推动全服破解不可能密码。两条进度并行。', color: 'var(--df-amber)' },
    { n: '05', title: '解锁 Final Extraction', body: '当全服进度达到阈值，终局任务开启，玩家进入最终撤离窗口。限时 72 小时开放，并在结束后进入 After Action Report 结算阶段。', color: 'var(--mi-red)' },
    { n: '06', title: '结算荣誉', body: '玩家获得个人战报、城市战报、任务奖励和最终贡献记录。高贡献玩家进入官网城市排行榜展示。', color: 'var(--hud-cyan)' },
  ];
  return (
    <section id="ig-03" className="section" style={{ backgroundImage: 'url("图片素材/Event Structure.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.55)', zIndex: 0 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <IGMark n="03" k="PLAYER JOURNEY" sub=" / 从进入游戏到完成终局任务" />
        <SectionHeader num="03" name="PLAYER JOURNEY"
          title={<>六步路径，<br/>一条任务链</>}
          kicker="让页面从功能列表变成玩家实际怎么玩。每一步都有明确的输入和输出，没有模糊环节。" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {steps.map((s, i) => (
            <RevealG key={s.n} delay={i + 1} className="card" style={{ padding: '20px 22px', borderLeft: `3px solid ${s.color}`, position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 8, right: 14, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 52, color: s.color, opacity: 0.07, lineHeight: 1 }}>{s.n}</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color, letterSpacing: '0.18em', marginBottom: 8 }}>STEP {s.n}</div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}>{s.body}</p>
            </RevealG>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 04 RELAY STATE EFFECTS =============
const IGSec04 = () => {
  const states = [
    {
      code: 'STABLE', zh: '稳定', color: 'var(--df-green)',
      desc: '基础任务规则，无额外干扰',
      action: '正常完成任务',
    },
    {
      code: 'EXPOSED', zh: '暴露', color: 'var(--df-amber)',
      desc: '局内出现轻微信号噪点，机密点位刷新率提升',
      action: '鼓励玩家增援该节点',
    },
    {
      code: 'COMPROMISED', zh: '被入侵', color: 'var(--mi-red)',
      desc: 'AI警戒提高，下载警报更快触发，Warfare中Jammer频率提升',
      action: '限时反攻，完成任务获额外奖励加成',
    },
    {
      code: 'SECURED', zh: '已守住', color: 'var(--hud-cyan)',
      desc: '解锁城市奖励，开放后续剧情线索',
      action: '领取奖励，转向其他节点',
    },
  ];
  const exampleEffects = [
    { cat: 'VISUAL', text: '对应活动地图出现信号干扰视觉叠加' },
    { cat: 'OPERATIONS', text: 'Operations中情报下载警报更快触发' },
    { cat: 'AI', text: 'AI巡逻响应速度提升，侦察范围扩大' },
    { cat: 'WARFARE', text: 'Warfare中敌方 Jammer Site 刷新频率提升' },
    { cat: 'REWARD', text: '完成 Thames Relay 相关任务获得额外联动代币' },
    { cat: 'ARG', text: '该节点相关 Cipher 线索开放隐藏提示' },
  ];
  return (
    <section id="ig-04" className="section" style={{ backgroundImage: 'url("图片素材/Relay State Effects 模块背景.png")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.55)', zIndex: 0 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <IGMark n="04" k="RELAY STATE EFFECTS" sub=" / 城市Relay状态如何影响局内" />
        <SectionHeader num="04" name="RELAY STATE EFFECTS"
          title={<>全服战况，<br/>改变你的这一局</>}
          kicker="城市Relay不只是官网上的进度条。当某个Relay进入不同状态时，游戏内任务会出现对应变化，让玩家感到「全服战况正在改变我的这一局」。这些变化只影响联动活动任务，不进入核心排位规则。" />

        {/* State table */}
        <RevealG className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// Relay 状态表</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['Relay状态', '游戏内表现', '玩家行动'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {states.map((s, i) => (
                  <tr key={s.code} style={{ borderBottom: i < states.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0, boxShadow: `0 0 6px ${s.color}` }}></span>
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color, letterSpacing: '0.1em' }}>{s.code}</div>
                          <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>{s.zh}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.desc}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: s.color, lineHeight: 1.55 }}>{s.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>

        {/* Example: Thames Relay < 20% */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <RevealG dir="left" className="card" style={{ padding: '22px 26px', borderLeft: '3px solid var(--mi-red)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mi-red)', letterSpacing: '0.14em', border: '1px solid var(--mi-red)', padding: '2px 8px' }}>COMPROMISED</span>
              <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>示例</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--mi-red)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 4 }}>Thames Relay {'<'} 20%</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)', lineHeight: 1.6, margin: '0 0 16px' }}>
              接下来 24 小时，对应地图进入 COMPROMISED 状态：
            </p>
            {exampleEffects.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--mi-red)', letterSpacing: '0.12em', flexShrink: 0, paddingTop: 3, minWidth: 70 }}>{e.cat}</span>
                <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e.text}</span>
              </div>
            ))}
          </RevealG>

          <RevealG dir="right" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ padding: '18px 22px', borderTop: '3px solid var(--df-green)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-green)', letterSpacing: '0.14em', marginBottom: 10 }}>STABLE → EXPOSED → COMPROMISED → SECURED</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {[['STABLE', 'var(--df-green)', 60], ['EXPOSED', 'var(--df-amber)', 20], ['COMPROMISED', 'var(--mi-red)', 10], ['SECURED', 'var(--hud-cyan)', 10]].map(([label, color, pct]) => (
                  <div key={label} style={{ flex: pct, height: 6, background: color, borderRadius: 2, opacity: 0.8 }} title={label}></div>
                ))}
              </div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.6 }}>
                Relay 状态由全服玩家的集体贡献决定，每 24 小时更新一次战报。
              </div>
            </div>
            <div className="card" style={{ padding: '18px 22px' }}>
              <div className="ticker" style={{ marginBottom: 10 }}>// 设计边界</div>
              {['状态变化只影响联动活动任务，不进入核心排位', '不因 Relay 状态为付费玩家提供额外优势', 'COMPROMISED 状态下的难度提升配套更高奖励', 'SECURED 状态下剧情线索为免费内容'].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--df-green)', flexShrink: 0 }}>—</span><span>{r}</span>
                </div>
              ))}
            </div>
          </RevealG>
        </div>
      </div>
    </section>
  );
};

// ============= 05 OPERATIONS =============
const IGSec05 = () => {
  const flowSteps = ['定位机密点位', '启动情报下载', '生成 Physical Drive', '围猎压力上升', '特殊撤离窗口'];
  return (
    <section id="ig-05" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <IGMark n="05" k="OPERATIONS" sub=" / Rogue Signal Extraction · 实体情报硬盘撤离" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', marginBottom: 40 }}>
          <SectionHeader num="05" name="OPERATIONS"
            title={<>情报围猎，<br/>极限撤离</>}
            kicker="在Operations中，玩家不再只是搜刮资源，而是要进入IMF标记的机密点位，下载情报、生成实体情报硬盘，并在全图围猎压力下成功撤离。" />
          <RevealG dir="right">
            <img src="图片素材/Operations主视觉.png" alt="Operations" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </RevealG>
        </div>

        {/* Flow */}
        <RevealG className="card" style={{ padding: '20px 28px', marginBottom: 24, display: 'flex', gap: 0, alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' }}>
          {flowSteps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ textAlign: 'center', flexShrink: 0, minWidth: 100 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--df-green)', letterSpacing: '0.16em', marginBottom: 6 }}>0{i + 1}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 12, color: 'var(--text-primary)' }}>{s}</div>
              </div>
              {i < flowSteps.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--df-green)', opacity: 0.3, margin: '0 8px' }} />}
            </React.Fragment>
          ))}
        </RevealG>
        <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 8 }}>
          <img src="图片素材/加密硬盘武器挂件.png" alt="Physical Drive" style={{ height: 80, width: 'auto', display: 'inline-block' }} />
        </div>

        {/* 4.2 Spawn Rules */}
        <IGDivider label="5.2 · 机密点位刷新规则" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12 }}>// 点位类型</div>
            {[['Black Site Server Room', '黑站服务器室'], ['Mobile Relay Van', '移动中继车'], ['Underground Data Cache', '地下数据缓存点']].map(([en, zh]) => (
              <div key={en} style={{ padding: '9px 0', borderTop: '1px dashed var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)' }}>{en}</span>
                <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)' }}>{zh}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12 }}>// 刷新逻辑</div>
            {['每局随机刷新 2–3 个机密点位', '分布在中高风险区域，不刷新在出生点附近', '每个点位同一局只能完成一次情报下载', '点位开启后发出弱信号提示，不在全图直接标记'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-green)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>—</span>
                <span>{r}</span>
              </div>
            ))}
          </RevealG>
        </div>

        {/* 4.3 Download Rules */}
        <IGDivider label="5.3 · 下载规则" />
        <RevealG className="card" style={{ padding: '20px 24px', marginBottom: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 12 }}>// 下载时长</div>
              {[['单人下载', '45 秒'], ['双人协同', '35 秒'], ['三人协同', '35 秒（不继续降低）']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px dashed var(--line)' }}>
                  <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: '8px 10px', background: 'rgba(255,122,26,0.06)', borderLeft: '2px solid var(--df-amber)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.14em' }}>// DESIGN VALUE · TUNABLE</span>
              </div>
            </div>
            <div>
              <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12 }}>// 下载风险</div>
              {['启动后点位触发警报灯和局部音效', 'AI巡逻队向点位靠近', '附近玩家收到「Rogue Signal Detected」模糊提示', '中断后进度保留 10 秒，超时回退到上一节点'].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--mi-red)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>!</span><span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealG>

        {/* 4.4 Physical Drive */}
        <IGDivider label="5.4 · Physical Drive 规则" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px', borderLeft: '3px solid var(--df-green)' }}>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12 }}>// 携带限制</div>
            {['占用 1 个背包格', '携带者无法使用 Disguise Protocol', '无法进行部分高速机动交互（特殊滑索等）', '移动速度影响 ≤ 5%，避免体感惩罚过重'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-green)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>—</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 24px', borderLeft: '3px solid var(--hud-cyan)' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 12 }}>// 撤离成功收益</div>
            {['高额联动代币', '城市 Relay 贡献', 'Cipher Fragment 掉落机会', '个人战报记录'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--hud-cyan)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>✓</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
        </div>

        {/* 4.5 Hunt + 4.6 Extraction */}
        <IGDivider label="5.5 · Rogue Signal Hunt / 5.6 · 撤离规则" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 12 }}>// 全图情报围猎</div>
            {['携带者不被精确标点，只显示动态模糊信号圈', '信号圈每 30 秒刷新，范围随携带时间逐步缩小', '进入建筑或地下时信号圈变大，避免变成精确透视', '携带者被击败后 Physical Drive 掉落并短暂强信号', '任何小队均可拾取继续撤离'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-amber)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>—</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 12 }}>// 特殊 Cinematic Extraction</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)', lineHeight: 1.6, margin: '0 0 12px' }}>当城市 Relay 进入特定状态，解锁以下特殊撤离方式：</p>
            {[['天台绳索撤离', 'Rooftop Rope Extraction'], ['低空飞机回收', 'Low-Pass Aircraft Pickup'], ['黑站升降井撤离', 'Black Site Elevator Extraction']].map(([zh, en]) => (
              <div key={en} style={{ padding: '9px 0', borderTop: '1px dashed var(--line)' }}>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{zh}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)' }}>{en}</div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '8px 10px', background: 'rgba(90,246,198,0.05)', borderLeft: '2px solid var(--hud-cyan)' }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--hud-cyan)' }}>不提供更高安全性，只提供更高戏剧性和额外奖励</p>
            </div>
          </RevealG>
        </div>

        {/* 4.7 Failure Compensation */}
        <IGDivider label="5.7 · 失败补偿机制" />
        <RevealG className="card" style={{ padding: '20px 24px' }}>
          <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 14 }}>// 失败也要有价值 — 减少挫败感，鼓励中途争夺</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { cond: '下载完成但未撤离', reward: '少量联动代币', color: 'var(--df-amber)' },
              { cond: '携带实体情报硬盘超时后失败', reward: '「情报拖延」贡献', color: 'var(--df-amber)' },
              { cond: '击败实体情报硬盘携带者', reward: '拦截贡献', color: 'var(--hud-cyan)' },
              { cond: '抢回掉落的实体情报硬盘并撤离', reward: '额外 Counter-Intel 奖励', color: 'var(--df-green)' },
            ].map((c) => (
              <div key={c.cond} style={{ padding: '14px 16px', background: 'var(--bg-elev)', borderLeft: `2px solid ${c.color}` }}>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)', marginBottom: 6 }}>{c.cond}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: c.color }}>{c.reward}</div>
              </div>
            ))}
          </div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 06 DISGUISE PROTOCOL =============
const IGSec06 = () => (
  <section id="ig-06" className="section">
    <div className="container">
      <IGMark n="06" k="DISGUISE PROTOCOL" sub=" / IMF身份伪装协议 · 五秒变脸" />
      <SectionHeader num="06" name="DISGUISE PROTOCOL"
        title={<>潜入工具，<br/>不是PVP优势</>}
        kicker="Disguise Protocol 是让玩家体验碟中谍变脸瞬间的核心机制，但它的设计边界非常清晰：它服务于渗透和任务推进，不服务于PVP击杀。所有争议点都有明确反制。" />

      {/* Main 3-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 20, alignItems: 'stretch', marginBottom: 24 }}>

        {/* LEFT: image + fantasy info */}
        <RevealG dir="left" className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <img src="图片素材/Disguise模块主图.png" alt="Disguise Protocol" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '20px 22px' }}>
            <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 14 }}>// 碟中谍式幻想</div>
            {[
              ['获得方式', '机密点位附近拾取，Operations限定，每局1次'],
              ['启动方式', '手动激活，0.8秒启动动作，不可瞬发'],
              ['伪装对象', 'AI单位 / 敌方干员基础轮廓，不复制皮肤和昵称'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '9px 0', borderTop: '1px dashed var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{v}</div>
              </div>
            ))}
          </div>
        </RevealG>

        {/* CENTER: countdown */}
        <RevealG className="card" style={{ padding: '24px 12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, height: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--df-amber)', letterSpacing: '0.18em', marginBottom: 16 }}>DISGUISE<br/>WINDOW</div>
          {[['05', 0.28], ['04', 0.44], ['03', 0.60], ['02', 0.76], ['01', 0.92]].map(([n, op]) => (
            <div key={n} style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 40, lineHeight: 1.1, color: `rgba(255,176,0,${op})`, letterSpacing: '0.04em' }}>{n}</div>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--mi-red)', opacity: 0.5, margin: '6px auto' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--mi-red)', fontStyle: 'italic', letterSpacing: '0.06em' }}>EXPOSED</div>
        </RevealG>

        {/* RIGHT: fairness boundary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'flex-end' }}>
          <RevealG dir="right" className="card" style={{ padding: '18px 20px' }}>
            <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12 }}>// 立即破除条件</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
              {['开火', '投掷爆炸物', '近战攻击', '交互 Physical Drive', '被侦察设备扫描', '被近距离瞄准识别', '受到伤害', '进入撤离倒计时区域'].map((r) => (
                <div key={r} style={{ display: 'flex', gap: 6, padding: '5px 0', borderTop: '1px dashed var(--line)', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-secondary)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--mi-red)', flexShrink: 0, fontSize: 10 }}>✕</span><span>{r}</span>
                </div>
              ))}
            </div>
          </RevealG>
          <RevealG dir="right" delay={1} className="card" style={{ padding: '18px 20px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 12 }}>// 玩家反制方式</div>
            {['侦察设备可识别伪装状态', 'Relay Jammer 可干扰伪装稳定度', '近距离观察可识别（轮廓噪点）', '瞄准时出现「Signal Mismatch」提示'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--hud-cyan)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>✓</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" delay={2} className="card" style={{ padding: '18px 20px' }}>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 10 }}>// 不可付费增强</div>
            {['不复制昵称 / 完整皮肤', '不提供隐身 / 无敌 / 加速', '不进入排位', '不与付费内容绑定', '不允许携带实体情报硬盘时使用'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>
                <span style={{ color: 'var(--df-green)', flexShrink: 0 }}>—</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
        </div>
      </div>
    </div>
  </section>
);

// ============= 07 TACTICAL GADGET KIT =============
const IGSec07 = () => {
  const gadgets = [
    {
      n: '01', en: 'IMF Hummingbird Drone', zh: 'IMF蜂鸟侦察机',
      role: '侦察类 · 联动视觉替换',
      img: '图片素材/IMF蜂鸟侦察机.png',
      functions: ['保留原本侦察逻辑，仅替换为微型仿生侦察机视觉', '扫描表现从普通雷达波改为红点低噪扫描', '不增加扫描范围，不增加持续时间，不增强识别能力'],
      limits: ['不改变任何扫描参数', '纯视觉替换，不提供任何额外信息'],
      color: 'var(--df-green)',
    },
    {
      n: '02', en: 'Relay Jammer', zh: '中继干扰器',
      role: '局部战术干扰装置',
      img: '图片素材/中继干扰器.png',
      functions: ['短时间干扰敌方小地图信息', '制造1-2个虚假信号点', '延迟敌方扫描刷新', '对AI产生短暂通讯混乱'],
      limits: ['不造成大范围沉默', '不关闭敌方HUD', '不阻止玩家开火或操作', '效果范围和持续时间可调'],
      color: 'var(--hud-cyan)',
    },
    {
      n: '03', en: 'Active Camo Module', zh: '光流迷彩',
      role: '低可见度限时战术工具',
      img: '图片素材/光流迷彩模块.png',
      functions: ['短时削弱轮廓可见度', '降低AI远距离识别概率', '适合潜入任务和PvE高压区域'],
      limits: ['不做完全隐身', '移动、开火、受伤、被扫描都会破除效果', '不进入排位', '不与付费内容绑定'],
      color: 'var(--df-amber)',
    },
    {
      n: '04', en: 'Voice Spoof / Signal Decoy', zh: '变声与虚假信号',
      role: '欺骗类战术诱导装置',
      img: '图片素材/变声与虚假信号装置.png',
      functions: ['生成假脚步声', '制造假无人机扫描点', '让敌方雷达短暂出现错误方向提示', '诱导AI巡逻路线'],
      limits: ['不改变玩家真实语音', '不复制真人玩家身份', '只制造短时误导，不提供硬控制'],
      color: 'var(--mi-red)',
    },
  ];
  return (
    <section id="ig-07" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <IGMark n="07" k="TACTICAL GADGET KIT" sub=" / IMF欺骗战术套件" />
        <SectionHeader num="07" name="TACTICAL GADGET KIT"
          title={<>不做超能力，<br/>只做特工逻辑</>}
          kicker="Disguise Protocol 是本次联动最具辨识度的核心机制；围绕它，活动还会对部分侦察、干扰和诱导类战术道具进行「碟中谍化」视觉与规则包装。不做强控制，只做短时误导。不进入核心排位，不提供付费优势。" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {gadgets.map((g, gi) => (
            <RevealG key={g.n} delay={gi + 1} className="card" style={{ padding: '22px 24px', borderTop: `3px solid ${g.color}`, backgroundImage: `url("${g.img}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.48)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', marginBottom: 4 }}>{g.n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: g.color, letterSpacing: '0.06em', marginBottom: 3 }}>{g.en}</div>
                    <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{g.zh}</div>
                  </div>
                  <span style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 10, color: g.color, border: `1px solid ${g.color}`, padding: '3px 8px', letterSpacing: '0.06em', flexShrink: 0, marginTop: 4 }}>{g.role}</span>
                </div>
                <div className="ticker" style={{ marginBottom: 8, color: 'var(--df-green)', fontSize: 10 }}>// 功能</div>
                {g.functions.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <span style={{ color: g.color, flexShrink: 0 }}>+</span><span>{f}</span>
                  </div>
                ))}
                <div className="ticker" style={{ marginTop: 12, marginBottom: 8, color: 'var(--mi-red)', fontSize: 10 }}>// 限制</div>
                {g.limits.map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--mi-red)', flexShrink: 0 }}>—</span><span>{l}</span>
                  </div>
                ))}
              </div>
            </RevealG>
          ))}
        </div>

        <RevealG className="card" style={{ padding: '20px 28px', borderLeft: '3px solid var(--df-amber)' }}>
          <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 10 }}>// IMF Deception Kit · 欺骗战术套件总成</div>
          <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 10px' }}>
            Face Swap、Voice Spoof、Signal Decoy、Relay Jammer 共同构成 <span style={{ color: 'var(--df-amber)', fontWeight: 600 }}>IMF Deception Kit</span>。
          </p>
          <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
            它们的目标不是让玩家「变强」，而是让玩家在联动任务中拥有更多潜入、误导和反侦察选择。
          </p>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 08 WARFARE =============
const IGSec08 = () => {
  const points = [
    { type: 'Signal Tower', zh: '信号塔', effect: '占领后持续产生带宽分', contrib: '稳定增加城市Relay防卫值', color: 'var(--df-green)' },
    { type: 'Data Uplink', zh: '数据上传站', effect: '完成上传后给小队任务分', contrib: '小概率获得Cipher Fragment', color: 'var(--hud-cyan)' },
    { type: 'Jammer Site', zh: '干扰站', effect: '降低敌方扫描频率', contrib: '减少敌方贡献效率', color: 'var(--df-amber)' },
    { type: 'Relay Hub', zh: '中继核心', effect: '控制后开启团队支援窗口', contrib: '触发大额城市贡献 + Satellite Sweep', color: 'var(--mi-red)' },
  ];
  const contracts = ['占领一次 Signal Tower', '护送工程单位接近 Data Uplink', '摧毁敌方 Jammer Site', '防守 Relay Hub 90 秒'];
  const scanAllowed = ['敌方载具轮廓', '大型火力来源位置', '敌方 Jammer Site 大致方向', '敌方推进热区'];
  const scanBlocked = ['步兵精确坐标', '玩家昵称', '玩家朝向', '室内实时位置', '复活点位置'];
  const counterplay = [
    { n: '01', action: '夺回 Signal Tower', effect: '中断触发链，阻止下次 Sweep' },
    { n: '02', action: '摧毁或占领 Jammer Site', effect: '削弱扫描持续收益' },
    { n: '03', action: '进入室内或地下空间', effect: '步兵信号从热区进一步模糊' },
    { n: '04', action: '使用 Relay Jammer', effect: '制造虚假信号点，干扰敌方判断' },
    { n: '05', action: '分散载具集结', effect: '避免重火力集中点被一次扫描暴露' },
  ];
  const tacValue = [
    { role: '进攻方', desc: '判断敌方载具和重火力位置，选择下一条推进路线' },
    { role: '防守方', desc: '识别敌方干扰源和载具集结方向，组织反打' },
    { role: '小队协作', desc: '为 Squad Uplink Contract 提供短时情报窗口，提升团队协作价值' },
    { role: '全服事件', desc: '每次成功触发都为所选城市 Relay 贡献额外 Signal Defense Value' },
  ];
  const fairness = [
    '不显示步兵精确位置',
    '不持续追踪单个玩家',
    '不显示室内单位实时点位',
    '不绕过烟雾、掩体和建筑完整透视',
    '不进入核心排位',
    '不可通过付费内容获得额外触发次数',
  ];
  const matrix = [
    { action: '占领 Signal Tower', en: 'Capture', output: '稳定产出 Signal Defense Value', note: '持续占领期间持续计入', color: 'var(--df-green)' },
    { action: '完成 Data Uplink', en: 'Upload', output: '小概率掉落 Cipher Fragment', note: '任务目标触发，非击杀刷取', color: 'var(--hud-cyan)' },
    { action: '摧毁 Jammer Site', en: 'Jamming', output: '降低敌方贡献效率', note: '干扰敌方城市Relay增速', color: 'var(--df-amber)' },
    { action: '控制 Relay Hub', en: 'Relay', output: '触发大额城市 Relay 贡献', note: '单局上限封顶，不可刷', color: 'var(--mi-red)' },
    { action: '触发 Satellite Sweep', en: 'Sweep', output: '产生 Signal Intelligence Upload', note: '计入所选城市 Relay', color: 'var(--df-amber)' },
    { action: '比赛胜利', en: 'Victory', output: '全项目获得额外贡献加成', note: '胜方加成，败方不归零', color: 'var(--df-green)' },
    { action: 'Squad Uplink Contract', en: 'Contract', output: '无论胜败获得基础城市贡献', note: '保障休闲玩家参与感', color: 'var(--hud-cyan)' },
  ];

  return (
    <section id="ig-08" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ position: 'relative', backgroundImage: 'url("图片素材/Warfare模块主图.png")', backgroundSize: 'cover', backgroundPosition: 'center', margin: '0 -40px', padding: '0 40px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.52)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <IGMark n="08" k="WARFARE" sub=" / Relay Jamming Warfare · 信号塔争夺" />
            <SectionHeader num="08" name="WARFARE"
              title={<>大战场，<br/>中继干扰战</>}
              kicker="将Warfare中的关键目标点包装成信号塔、数据上传站、干扰站和中继核心。玩家不是在单纯占点，而是在争夺城市Relay的上传带宽。不改变大战场基本爽点，只增加联动任务钩子。" />

            {/* 8.2 Point Types */}
            <IGDivider label="8.2 · Signal Tower Point Types · 点位类型" />
            <RevealG className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// 点位类型 × 功能</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['点位类型', '叙事包装', '局内效果', '全服贡献'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {points.map((p, i) => (
                  <tr key={p.type} style={{ borderBottom: i < points.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.color }}>{p.type}</div>
                      <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>{p.zh}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{p.zh}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{p.effect}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{p.contrib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>
          </div>
        </div>

        {/* 7.3 SATELLITE SWEEP — signature moment */}
        <IGDivider label="8.3 · SATELLITE SWEEP · 卫星扫描" />

        {/* Badge + Intro */}
        <RevealG className="card" style={{ padding: '28px 32px', marginBottom: 16, borderTop: '3px solid var(--df-amber)', position: 'relative', overflow: 'hidden', backgroundImage: 'url("图片素材/Satellite Sweep重点模块.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.50)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--df-amber)', letterSpacing: '0.18em', opacity: 0.6 }}>WARFARE SIGNATURE MOMENT</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, letterSpacing: '0.04em', color: 'var(--df-amber)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 6 }}>SATELLITE SWEEP</div>
            <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-mute)', letterSpacing: '0.08em', marginBottom: 18 }}>卫星扫描</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 10px', maxWidth: 680 }}>
              Satellite Sweep 是 Warfare 线的核心局内高光。当一方成功控制关键中继链路后，系统触发一次 20 秒的<span style={{ color: 'var(--df-amber)', fontWeight: 600 }}>战术级卫星情报支援</span>。
            </p>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-mute)', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>
              它不是透视大招，而是一次克制的信息窗口：帮助团队判断敌方载具、重火力和干扰源位置，但不会暴露步兵精确坐标，也不会持续追踪单个玩家。
            </p>
          </div>
        </RevealG>

        {/* Trigger Formula */}
        <RevealG className="card" style={{ padding: '24px 28px', marginBottom: 16 }}>
          <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 18 }}>// 触发条件</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            {[
              { label: '2 ×', sub: 'SIGNAL TOWER', color: 'var(--df-green)' },
              { label: '+', sub: null, color: 'var(--text-mute)' },
              { label: '1 ×', sub: 'RELAY HUB', color: 'var(--mi-red)' },
              { label: '+', sub: null, color: 'var(--text-mute)' },
              { label: '60 SEC', sub: 'HOLD', color: 'var(--hud-cyan)' },
              { label: '=', sub: null, color: 'var(--text-mute)' },
              { label: 'SATELLITE', sub: 'SWEEP', color: 'var(--df-amber)' },
            ].map((item, i) => item.sub ? (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: item.color, letterSpacing: '0.04em' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: item.color, letterSpacing: '0.14em', marginTop: 2 }}>{item.sub}</div>
              </div>
            ) : (
              <div key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: item.color }}>{item.label}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['持续时间', '20 秒', 'var(--df-amber)'], ['阵营冷却', '180 秒', 'var(--hud-cyan)'], ['触发归属', '团队占点奖励，非个人技能', 'var(--text-secondary)']].map(([k, v, c]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.12em' }}>{k}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: c, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </RevealG>

        {/* SCAN ALLOWED vs BLOCKED */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px', borderTop: '3px solid var(--df-green)' }}>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12, fontSize: 11 }}>// SCAN ALLOWED · 允许显示</div>
            {scanAllowed.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-green)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11 }}>✓</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 24px', borderTop: '3px solid var(--mi-red)' }}>
            <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12, fontSize: 11 }}>// SCAN BLOCKED · 禁止显示</div>
            {scanBlocked.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)' }}>
                <span style={{ color: 'var(--mi-red)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11 }}>✕</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
        </div>

        {/* Tactical Value */}
        <RevealG className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// 战术价值</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {tacValue.map((t, i) => (
              <div key={t.role} style={{ padding: '16px 20px', borderBottom: i < 2 ? '1px dashed var(--line)' : 'none', borderRight: i % 2 === 0 ? '1px dashed var(--line)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-amber)', letterSpacing: '0.14em', marginBottom: 6 }}>{t.role}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </RevealG>

        {/* Fairness + Counterplay */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 12 }}>// 公平性边界</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.6, margin: '0 0 12px' }}>Satellite Sweep 定位是"战术信息窗口"，不是强透视。</p>
            {fairness.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-amber)', flexShrink: 0 }}>—</span><span>{f}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 12 }}>// 反制方式 · Counterplay</div>
            {counterplay.map((c, i) => (
              <div key={c.n} style={{ display: 'flex', gap: 12, padding: '9px 0', borderTop: i ? '1px dashed var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--hud-cyan)', flexShrink: 0, paddingTop: 2 }}>{c.n}</span>
                <div>
                  <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-primary)', marginBottom: 2 }}>{c.action}</div>
                  <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)', lineHeight: 1.5 }}>{c.effect}</div>
                </div>
              </div>
            ))}
          </RevealG>
        </div>

        {/* 7.4 Squad Uplink Contract */}
        <IGDivider label="8.4 · Squad Uplink Contract · 小队合约" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <RevealG dir="left" className="card" style={{ padding: '20px 24px' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 12 }}>// 合约内容</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)', lineHeight: 1.6, margin: '0 0 14px' }}>
              Warfare中每个小队动态获得联动合约，完成后获得任务分、联动代币和城市贡献：
            </p>
            {contracts.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: '1px dashed var(--line)', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--hud-cyan)', fontFamily: 'var(--font-mono)', fontSize: 10, flexShrink: 0, paddingTop: 2 }}>0{i + 1}</span><span>{c}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" className="card" style={{ padding: '20px 28px', borderLeft: '3px solid var(--hud-cyan)' }}>
            <div className="ticker" style={{ color: 'var(--hud-cyan)', marginBottom: 10 }}>// 败方基础贡献 · Defeat Still Counts</div>
            <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              即使队伍输掉比赛，只要在局内完成 <span style={{ color: 'var(--hud-cyan)', fontWeight: 600 }}>Squad Uplink Contract</span>，也能获得基础城市贡献。
              胜利方获得额外加成，但败方任务贡献完整有效。
              <span style={{ color: 'var(--text-mute)', display: 'block', marginTop: 6, fontSize: 13 }}>这确保活动不只服务高胜率队伍，让休闲 Warfare 玩家也能持续推进全服进度。</span>
            </p>
          </RevealG>
        </div>

        {/* 7.5 Global Contribution */}
        <IGDivider label="8.5 · 全服进度贡献 · Global Event Contribution" />
        <p style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          Warfare 玩家每一局都能参与 Rogue Signal 全服事件。以下为贡献来源矩阵——每项行动产出不同资源，共同推进全服进度。
        </p>
        <RevealG className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// 贡献来源矩阵</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['行动', '类型', '产出', '备注'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((m, i) => (
                  <tr key={m.en} style={{ borderBottom: i < matrix.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{m.action}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: m.color, border: `1px solid ${m.color}`, padding: '2px 7px', letterSpacing: '0.1em' }}>{m.en}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: m.color }}>{m.output}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)' }}>{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>
        <RevealG className="card" style={{ padding: '16px 24px', borderLeft: '3px solid var(--text-mute)' }}>
          <div className="ticker" style={{ marginBottom: 10 }}>// 贡献原则</div>
          {['胜方贡献更多，但败方完成任务不归零', '点位贡献有单局上限，避免刷分', 'Cipher Fragment 只通过任务或点位目标掉落，不通过击杀刷取'].map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderTop: i > 0 ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--hud-cyan)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 10, paddingTop: 3 }}>0{i + 1}</span>
              <span>{p}</span>
            </div>
          ))}
        </RevealG>
      </div>
    </section>
  );
};

// ============= 09 FINAL EXTRACTION =============
const IGSec09 = () => {
  const scenarios = [
    { n: '01', en: 'Rooftop Rope Extraction', zh: '天台绳索撤离', map: '城市地图 / 高层建筑区', risk: '须控制天台等待直升机回收，最后 30 秒压力骤升', highlight: '直升机拉升镜头，最高戏剧密度', color: 'var(--df-green)', img: '图片素材/天台绳索撤离.png' },
    { n: '02', en: 'Low-Pass Aircraft Pickup', zh: '低空飞机回收', map: '开放区域', risk: '撤离窗口短，路线暴露度高', highlight: '最后一秒跳机接驾，适合直播高光剪辑', color: 'var(--df-amber)', img: '图片素材/低空飞机回收.png' },
    { n: '03', en: 'Black Site Elevator Extraction', zh: '黑站升降井撤离', map: '室内 CQB', risk: '需激活电梯井电源并在防守倒计时中存活', highlight: '战术小队推进，最后扣押阵地感', color: 'var(--mi-red)', img: '图片素材/黑站升降井撤离.png' },
  ];
  return (
    <section id="ig-09" className="section">
      <div className="container">
        <div style={{ position: 'relative', backgroundImage: 'url("图片素材/Final Extraction模块主图.png")', backgroundSize: 'cover', backgroundPosition: 'center', margin: '0 -40px', padding: '0 40px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.52)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <IGMark n="09" k="FINAL EXTRACTION" sub=" / 终局游戏内事件" />
            <SectionHeader num="09" name="FINAL EXTRACTION"
              title={<>Campaign高潮，<br/>72小时终局窗口</>}
              kicker="Final Extraction 不是奖励领取页面，而是最后一周的高压游戏内事件。它在全服达到阈值后开放，是整个活动的集中爆发点。" />
          </div>
        </div>

        {/* Unlock conditions */}
        <RevealG className="card" style={{ padding: '20px 28px', marginBottom: 24, borderLeft: '3px solid var(--mi-red)' }}>
          <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12 }}>// 解锁条件（三项全部达成）</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {['全服 Signal Defense Value 达到阈值', 'Impossible Cipher 破解进度达到 100%', '至少 1 个 Compromised 城市 Relay 完成反攻'].map((c, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '14px 12px', background: 'rgba(225,28,26,0.05)', borderTop: '2px solid var(--mi-red)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 900, color: 'var(--mi-red)', marginBottom: 8 }}>0{i + 1}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{c}</div>
              </div>
            ))}
          </div>
        </RevealG>

        {/* Scenario cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {scenarios.map((s, i) => (
            <RevealG key={s.n} delay={i + 1} className="card" style={{ padding: 0, borderTop: `3px solid ${s.color}`, backgroundImage: `url("${s.img}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,7,0.48)' }} />
              <div style={{ position: 'relative', zIndex: 1, padding: '22px 20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: s.color, letterSpacing: '0.18em', marginBottom: 8 }}>EXTRACTION {s.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>{s.en}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: s.color, marginBottom: 14 }}>{s.zh}</div>
                {[['适用地图', s.map], ['风险', s.risk], ['高光点', s.highlight]].map(([k, v]) => (
                  <div key={k} style={{ padding: '8px 0', borderTop: '1px dashed var(--line)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.12em', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{v}</div>
                  </div>
                ))}
              </div>
            </RevealG>
          ))}
        </div>

        {/* Rewards */}
        <RevealG delay={4} className="card" style={{ padding: '20px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12 }}>// 完成 Final Extraction</div>
            {['Final Signal 名片', '城市 Relay 终局贡献', '个人 After Action Report', '进入官网最终战报候选展示'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-green)', flexShrink: 0 }}>✓</span><span>{r}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="ticker" style={{ color: 'var(--text-mute)', marginBottom: 12 }}>// 参与但失败</div>
            {['参与纪念奖励', '保留部分联动代币', '记录任务阶段进度'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-mute)', flexShrink: 0 }}>—</span><span>{r}</span>
              </div>
            ))}
          </div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 10 MISSION CONTRACTS =============
const IGSec10 = () => {
  const categories = [
    { code: 'DAILY', zh: '每日任务', color: 'var(--text-secondary)', desc: '低门槛，用于日常登录和轻度参与，30-45分钟可完成' },
    { code: 'MODE', zh: '模式任务', color: 'var(--df-green)', desc: '引导玩家分别体验Operations、Disguise和Warfare' },
    { code: 'CITY', zh: '城市任务', color: 'var(--hud-cyan)', desc: '与玩家选择的城市Relay绑定，推动城市贡献' },
    { code: 'CIPHER', zh: '破译任务', color: 'var(--df-amber)', desc: '产出Cipher Fragment，连接Off-Game解谜ARG' },
    { code: 'FINAL', zh: '终局任务', color: 'var(--mi-red)', desc: 'Final Extraction期间开放，引导终局参与' },
  ];
  const samples = [
    { type: 'Daily', task: '完成1局联动任务', purpose: '保底参与', color: 'var(--text-secondary)' },
    { type: 'Operations', task: '下载1次加密情报', purpose: '引导进入机密点位', color: 'var(--df-green)' },
    { type: 'Operations', task: '成功撤离Physical Drive', purpose: '制造高风险目标', color: 'var(--df-green)' },
    { type: 'Disguise', task: '使用伪装协议通过AI巡逻区', purpose: '教会机制', color: 'var(--df-amber)' },
    { type: 'Disguise', task: '伪装状态下接近机密点位', purpose: '产生碟中谍体验', color: 'var(--df-amber)' },
    { type: 'Warfare', task: '占领2次Signal Tower', purpose: '引导大战场玩家参与', color: 'var(--hud-cyan)' },
    { type: 'Warfare', task: '完成1次Squad Uplink Contract', purpose: '形成小队目标', color: 'var(--hud-cyan)' },
    { type: 'City', task: '为所选Relay贡献100点防卫值', purpose: '绑定城市归属', color: 'var(--hud-cyan)' },
    { type: 'Cipher', task: '收集3个Cipher Fragment', purpose: '连接全服破译', color: 'var(--df-amber)' },
    { type: 'Final', task: '完成一次Final Extraction尝试', purpose: '引导终局参与', color: 'var(--mi-red)' },
  ];
  return (
    <section id="ig-10" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <IGMark n="10" k="MISSION CONTRACTS" sub=" / 任务合约系统" />
        <SectionHeader num="10" name="MISSION CONTRACTS"
          title={<>分周运营，<br/>五类合约</>}
          kicker="Mission Contracts 是让活动可运营、可分周、可控节奏的核心。没有任务合约，前面机制会显得散。五类合约覆盖不同玩家类型和参与深度。" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
          {categories.map((c, i) => (
            <RevealG key={c.code} delay={i + 1} className="card" style={{ padding: '18px 16px', borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: c.color, letterSpacing: '0.16em', marginBottom: 6 }}>{c.code}</div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 8 }}>{c.zh}</div>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.55 }}>{c.desc}</p>
            </RevealG>
          ))}
        </div>

        <RevealG delay={6} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ticker">// 样例任务</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)' }}>10 SAMPLE CONTRACTS</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['合约类型', '样例任务', '设计目的'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {samples.map((s, i) => (
                  <tr key={i} style={{ borderBottom: i < samples.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color, whiteSpace: 'nowrap' }}>{s.type}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{s.task}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)' }}>{s.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 11 REWARDS =============
const IGSec11 = () => {
  const freeItems = ['Rogue Signal 喷漆', 'No Backup 称号', 'Physical Drive 武器挂件', 'Disguise Protocol 徽章', 'Cipher Hunter 头像框', '城市 Relay 名片背景', 'Final Signal 名片'];
  const paidItems = ['IMF Tactical Bundle', 'Covert Ops 武器蓝图', '战术处决动作', '电台语音包', '干员外观', '黑金任务档案 UI 皮肤'];
  const forbidden = ['额外变脸次数', '更高贡献倍率', '更快下载速度', '更安全撤离窗口', '更强 Satellite Sweep', '更多 Cipher 提示', '任务跳过券'];
  const rewardTypes = [
    { type: 'Participation', zh: '参与奖励', how: '完成每日任务', example: '喷漆、头像框、代币', purpose: '让轻度玩家有收获', color: 'var(--text-secondary)' },
    { type: 'Mission', zh: '任务奖励', how: '完成模式任务', example: 'Physical Drive 挂件、伪装徽章', purpose: '鼓励体验核心机制', color: 'var(--df-green)' },
    { type: 'City', zh: '城市奖励', how: '城市Relay贡献', example: '城市名片、守卫者徽章', purpose: '强化归属感', color: 'var(--hud-cyan)' },
    { type: 'Cipher', zh: '破译奖励', how: '收集/提交碎片', example: 'Cipher Hunter 称号', purpose: '连接解谜ARG', color: 'var(--df-amber)' },
    { type: 'Final', zh: '终局奖励', how: '完成终局任务', example: 'Final Signal 名片', purpose: '制造荣誉感', color: 'var(--mi-red)' },
    { type: 'Premium', zh: '付费内容', how: '商城购买', example: '外观、蓝图、处决、语音', purpose: '商业化', color: 'var(--df-amber)' },
  ];
  return (
    <section id="ig-11" className="section">
      <div className="container">
        <IGMark n="11" k="REWARDS" sub=" / 奖励与商业化边界" />
        <SectionHeader num="11" name="REWARDS"
          title={<>免费可达，<br/>付费只买外观</>}
          kicker="奖励结构区分免费奖励、任务奖励、城市奖励、终局奖励、付费内容、禁止售卖。每一类有明确归属，不存在模糊地带。" />

        <RevealG className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)' }}>
            <span className="ticker">// 奖励结构总览</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['奖励类型', '获取方式', '奖励例子', '目的'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rewardTypes.map((r, i) => (
                  <tr key={r.type} style={{ borderBottom: i < rewardTypes.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: r.color }}>{r.type}</div>
                      <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: 'var(--text-mute)' }}>{r.zh}</div>
                    </td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.how}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.example}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--text-mute)' }}>{r.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <RevealG dir="left" delay={1} className="card" style={{ padding: '20px 20px', borderTop: '3px solid var(--df-green)' }}>
            <div className="ticker" style={{ color: 'var(--df-green)', marginBottom: 12 }}>// 免费奖励池</div>
            {freeItems.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-green)', flexShrink: 0 }}>✓</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG delay={2} className="card" style={{ padding: '20px 20px', borderTop: '3px solid var(--df-amber)' }}>
            <div className="ticker" style={{ color: 'var(--df-amber)', marginBottom: 12 }}>// 付费内容池</div>
            {paidItems.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--df-amber)', flexShrink: 0 }}>$</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
          <RevealG dir="right" delay={3} className="card" style={{ padding: '20px 20px', borderTop: '3px solid var(--mi-red)' }}>
            <div className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12 }}>// 禁止售卖清单</div>
            {forbidden.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--mi-red)', flexShrink: 0 }}>✕</span><span>{r}</span>
              </div>
            ))}
          </RevealG>
        </div>

        <RevealG delay={4} style={{ marginTop: 20, padding: '20px 28px', background: 'var(--bg-card-2)', border: '1px solid var(--line)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '0.06em', color: 'var(--df-green)' }}>COSMETIC ONLY</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mute)', letterSpacing: '0.18em', marginTop: 4 }}>NO GAMEPLAY ADVANTAGE</div>
        </RevealG>
      </div>
    </section>
  );
};

// ============= 12 FAIRNESS & BALANCE =============
const IGSec12 = () => {
  const risks = [
    { issue: '变脸太强', risk: '玩家认为被欺骗、不公平', fix: '5秒、可识别、可扫描、不可开火维持', rColor: 'var(--mi-red)', fColor: 'var(--df-green)' },
    { issue: '卫星扫描太强', risk: '变成透视', fix: '只显示载具/热区/干扰源，不显示步兵精确点', rColor: 'var(--mi-red)', fColor: 'var(--df-green)' },
    { issue: '实体情报硬盘围猎太压迫', risk: '携带者无反制', fix: '只显示模糊圈，不给实时精确位置', rColor: 'var(--mi-red)', fColor: 'var(--df-green)' },
    { issue: '付费影响玩法', risk: '核心玩家反感', fix: '不卖次数、不卖倍率、不卖任务优势', rColor: 'var(--mi-red)', fColor: 'var(--df-green)' },
    { issue: '活动太肝', risk: '轻度玩家流失', fix: '每日任务30-45分钟可完成，失败也给部分进度', rColor: 'var(--df-amber)', fColor: 'var(--df-green)' },
    { issue: '只服务撤离玩家', risk: 'Warfare玩家缺席', fix: 'Warfare单独有信号塔和小队上传合约', rColor: 'var(--df-amber)', fColor: 'var(--df-green)' },
  ];
  const principles = [
    { n: '01', title: '活动限定', body: '争议机制不进入核心排位。所有特殊玩法只在联动活动期间开放。' },
    { n: '02', title: '模糊信息', body: '任何情报类能力都不提供强透视。只提供方向感和热区，不提供精确坐标。' },
    { n: '03', title: '可反制', body: '所有特殊机制都有识别和破除方式。没有不可对抗的能力。' },
    { n: '04', title: '不卖优势', body: '付费内容不影响局内结果。商城只卖外观，不卖机制、次数或倍率。' },
  ];
  return (
    <section id="ig-12" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <IGMark n="12" k="FAIRNESS & BALANCE" sub=" / 公平性与反争议设计" />
        <SectionHeader num="12" name="FAIRNESS"
          title={<>核心争议，<br/>逐条解决</>}
          kicker="这是 In-Game Ops 必须有的一块。它证明设计团队真正考虑过核心FPS玩家会质疑什么，以及如何在设计层面预防，而不是等上线后灭火。" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {risks.map((r, i) => (
            <RevealG key={i} delay={i + 1} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderLeft: `3px solid ${r.rColor}`, background: 'rgba(225,28,26,0.04)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: r.rColor, letterSpacing: '0.14em', marginBottom: 4 }}>// RISK</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{r.issue}</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: r.rColor }}>{r.risk}</div>
              </div>
              <div style={{ padding: '12px 16px', borderLeft: `3px solid ${r.fColor}`, background: 'rgba(63,214,106,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: r.fColor, letterSpacing: '0.14em', marginBottom: 4 }}>// CONTROL</div>
                <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{r.fix}</div>
              </div>
            </RevealG>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {principles.map((p, i) => (
            <RevealG key={p.n} delay={i + 7} className="card" style={{ padding: '18px 18px', borderTop: '3px solid var(--df-green)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--df-green)', letterSpacing: '0.16em', marginBottom: 8 }}>原则 {p.n}</div>
              <div style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 8 }}>{p.title}</div>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.body}</p>
            </RevealG>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= 13 TELEMETRY =============
const IGSec13 = () => {
  const groups = [
    { label: 'OPERATIONS', color: 'var(--df-green)', metrics: ['机密点位触发次数', '情报下载开始次数', '情报下载完成率', 'Physical Drive 生成数', 'Physical Drive 成功撤离率', '实体情报硬盘掉落后再拾取率', '实体情报硬盘携带平均存活时间', '围猎阶段平均交战次数', '特殊撤离点触发次数'] },
    { label: 'DISGUISE', color: 'var(--df-amber)', metrics: ['身份伪装装置拾取率', '身份伪装使用率', '伪装成功通过AI巡逻次数', '伪装期间被AI识别次数', '伪装期间被玩家识别次数', '伪装后30秒任务推进率', '伪装导致击杀占比 ⚠'] },
    { label: 'WARFARE', color: 'var(--hud-cyan)', metrics: ['Signal Tower 占领次数', 'Data Uplink 完成次数', 'Jammer Site 争夺时长', 'Satellite Sweep 触发次数', 'Satellite Sweep 后击杀变化', 'Warfare 联动任务参与率', 'Warfare 玩家城市贡献占比'] },
    { label: 'PROGRESSION', color: 'var(--mi-red)', metrics: ['Signal Defense Value 总贡献', '各城市 Relay 贡献分布', 'Cipher Fragment 掉落数', 'Cipher Fragment 提交率', 'Final Extraction 解锁时间', 'Final Extraction 参与率', '免费奖励领取率', '回流玩家完成率'] },
  ];
  const triggers = [
    { obs: '实体情报硬盘撤离率过低', cause: '围猎压力过大', fix: '放大模糊圈、降低AI压力、提高失败补偿' },
    { obs: '实体情报硬盘撤离率过高', cause: '风险不足', fix: '缩短信号圈刷新间隔、提高点位风险' },
    { obs: '伪装击杀占比过高', cause: '机制变成PVP优势', fix: '缩短持续时间、增强识别提示、限制武器切换' },
    { obs: 'Warfare贡献过低', cause: '大战场玩家参与不足', fix: '提高小队合约奖励、增加信号塔任务' },
    { obs: 'Cipher掉落过慢', cause: '全服进度卡死', fix: '提高每日任务碎片产出' },
    { obs: '日常完成率过低', cause: '任务太肝', fix: '降低每日任务要求' },
  ];
  return (
    <section id="ig-13" className="section">
      <div className="container">
        <IGMark n="13" k="TELEMETRY" sub=" / 游戏内数据指标与调参机制" />
        <SectionHeader num="13" name="TELEMETRY"
          title={<>数据收口，<br/>上线后可控可调</>}
          kicker="用数据指标说明上线后怎么判断玩法是否成功、是否需要调参。每个核心机制都有对应的监控指标和调整触发条件。" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {groups.map((g, gi) => (
            <RevealG key={g.label} delay={gi + 1} className="card" style={{ padding: '18px 16px', borderTop: `3px solid ${g.color}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: g.color, letterSpacing: '0.18em', marginBottom: 12 }}>{g.label}</div>
              {g.metrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--line)' : 'none', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 11, color: m.includes('⚠') ? g.color : 'var(--text-secondary)', alignItems: 'flex-start' }}>
                  <span style={{ color: g.color, flexShrink: 0, paddingTop: 1 }}>—</span><span>{m}</span>
                </div>
              ))}
            </RevealG>
          ))}
        </div>

        <RevealG delay={5} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', background: 'var(--bg-elev)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ticker">// 调参触发条件</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)' }}>6 TRIGGER CONDITIONS</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-elev)' }}>
                  {['观察结果', '可能问题', '调整方向'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.14em', fontWeight: 600, borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {triggers.map((t, i) => (
                  <tr key={i} style={{ borderBottom: i < triggers.length - 1 ? '1px dashed var(--line)' : 'none' }}>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--df-amber)' }}>{t.obs}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--mi-red)' }}>{t.cause}</td>
                    <td style={{ padding: '10px 16px', fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontSize: 13, color: 'var(--df-green)' }}>{t.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealG>

        <RevealG delay={6} style={{ marginTop: 24, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 0', borderTop: '1px solid var(--line)' }}>
          // END OF FILE 02.1 · IN-GAME OPERATIONS DOSSIER
        </RevealG>
      </div>
    </section>
  );
};

// ============= ROOT =============
const InGamePage = ({ navigate }) => {
  useEffectG(() => {
    const handler = (e) => navigate(e.detail);
    window.addEventListener('ingame-nav', handler);
    return () => window.removeEventListener('ingame-nav', handler);
  }, [navigate]);

  return (
    <div className="page-enter">
      <IGIndex />
      <IGSec01 navigate={navigate} />
      <IGSec02 />
      <IGSec03 />
      <IGSec04 />
      <IGSec05 />
      <IGSec06 />
      <IGSec07 />
      <IGSec08 />
      <IGSec09 />
      <IGSec10 />
      <IGSec11 />
      <IGSec12 />
      <IGSec13 />
    </div>
  );
};

window.InGamePage = InGamePage;
