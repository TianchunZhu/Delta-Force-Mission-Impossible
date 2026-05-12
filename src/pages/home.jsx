/* global React, Icon, HeroVignette, DossierArt, LabelRow, SectionHeader */

const HomePage = ({ navigate }) => {
  return (
    <div className="page-enter">
      {/* === HERO === */}
      <section className="hero">
        <div className="hero-bg">
          <img src="图片素材/主kv%20hero页-无%20logo.png" alt="" className="hero-kv-img" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-meta">
                <span className="stamp" style={{ color: 'var(--mi-red)' }}>● CLASSIFIED</span>
                <span className="stamp" style={{ color: 'var(--df-amber)' }}>OP-CODE ROGUE-SIGNAL</span>
                <span className="stamp" style={{ color: 'var(--text-mute)' }}>SUMMER 2026 · NA + EU</span>
              </div>
              <p className="hero-eyebrow">三角洲行动 × 碟中谍 联动Campaign</p>
              <h1 className="hero-title">
                <span className="l-zh">幽灵信号行动</span>
              </h1>
              <p className="hero-tagline">一支小队，一个任务，没有支援。</p>
              <p className="hero-sub">
                一场横跨游戏内外的全球情报防卫行动。<br />
                玩家将在撤离模式中夺取加密情报，在全面战场中争夺信号塔，<br />
                并通过每一局战斗推动现实城市信号节点的防卫进度。
              </p>
              <div className="hero-cta-row">
                <button className="btn btn-primary" onClick={() => navigate('plan')}>
                  <span>查看完整方案</span><Icon.arrow className="arrow" width="16" height="16" />
                </button>
                <button className="btn" onClick={() => navigate('ingame')}>
                  <span>守住你的信号节点</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-bar">
          <div><Icon.reticle width="14" height="14" /> ROGUE SIGNAL · ACTIVE</div>
          <div>SIGNAL: 96%</div>
          <div>OPERATOR ID: GHOST-UNIT-01</div>
          <div>IMF PROTOCOL: ONLINE</div>
          <div>SCROLL ↓</div>
        </div>
      </section>

      {/* === MARQUEE === */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              <span className="dot"></span> OPERATION ROGUE SIGNAL
              <span className="dot"></span> 6 WEEKS
              <span className="dot"></span> 3 GAMEPLAY LOOPS
              <span className="dot"></span> 14 CREATORS
              <span className="dot"></span> 1 IMPOSSIBLE CIPHER
              <span className="dot"></span> IMF FIELD UNIT DEPLOYED
              <span className="dot"></span> THE SIGNAL IS LIVE
              <span className="dot"></span>
            </span>
          ))}
        </div>
      </div>

      {/* === CAMPAIGN SNAPSHOT === */}
      <section className="snapshot-section">
        <div className="snapshot-inner">
          {/* Left: Global Signal Map */}
          <div className="snapshot-map-wrap">
            <img src="图片素材/全球信号防卫地图.png" alt="" className="snapshot-map-img" />
            {[
              { id: 'LIBERTY',  x: '23%', y: '37%', state: 'stable' },
              { id: 'PACIFIC',  x: '13%', y: '41%', state: 'stable' },
              { id: 'ATLANTIC', x: '29%', y: '33%', state: 'stable' },
              { id: 'THAMES',   x: '46%', y: '27%', state: 'exposed' },
              { id: 'SEINE',    x: '48%', y: '30%', state: 'stable' },
              { id: 'RHINE',    x: '51%', y: '26%', state: 'stable' },
              { id: 'AURORA',   x: '53%', y: '21%', state: 'compromised' },
              { id: 'IBERIA',   x: '45%', y: '34%', state: 'stable' },
            ].map((n) => (
              <div key={n.id} className={`relay-node relay-${n.state}`} style={{ left: n.x, top: n.y }}>
                <span className="relay-ping"></span>
                <span className="relay-dot"></span>
                <span className="relay-label">{n.id}</span>
              </div>
            ))}
          </div>

          {/* Right: Text + Cards */}
          <div className="snapshot-content">
            <p className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 16 }}>
              // GLOBAL SIGNAL DEFENSE · MECHANISM BRIEF
            </p>
            <h2 className="snapshot-title">
              这不是一次皮肤联动，<br />
              而是一场全球信号战。
            </h2>
            <p className="snapshot-desc">
              玩家在 Operations 中夺取实体加密硬盘，<br />
              在 Warfare 中争夺信号塔，<br />
              并将每一局战斗转化为城市 Relay 节点的防卫进度。
            </p>
            <div className="snapshot-cards">
              {[
                { num: '01', title: '情报渗透', desc: '在撤离模式中下载、携带并成功带出加密情报。', color: 'var(--df-green)' },
                { num: '02', title: '信号争夺', desc: '在全面战场中占领中继塔，争夺上传带宽。', color: 'var(--df-amber)' },
                { num: '03', title: '城市防卫', desc: '为现实映射城市贡献信号防卫值，解锁社区战报与奖励。', color: 'var(--mi-red)' },
                { num: '04', title: '全服破译', desc: '玩家、社区与Creator共同破解幽灵信号，解锁最终反攻任务。', color: 'var(--df-green)' },
              ].map((c) => (
                <div key={c.num} className="snap-card">
                  <div className="snap-card-num" style={{ color: c.color }}>{c.num}</div>
                  <div className="snap-card-body">
                    <div className="snap-card-title">{c.title}</div>
                    <div className="snap-card-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === IP HIGHLIGHTS === */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num="01"
            name="IP RATIONALE"
            title={<>为什么是<span style={{ color: 'var(--mi-red)' }}>碟中谍</span>？</>}
            kicker="这个 IP 的核心不是超能力，而是潜入、情报、伪装、撤离和团队协作。它能带来暑期大片感，但不会破坏三角洲行动的现代军事调性。"
          />
          <p className="ip-intro">
            这个 IP 能带来暑期大片感，但不会破坏三角洲行动的现代军事调性。<br />
            Mission: Impossible 官方类型是 Action / Adventure / Thriller，这使其更适合被转译成「潜入、情报、极限任务、团队协作」，而不是超能力幻想。
          </p>
          <div className="ip-grid ip-grid-4">
            {[
              { code: 'IP-01', eyebrow: 'IP RATIONALE', tagline: 'TACTICAL FPS',
                img: '图片素材/ip合理性视觉图.png',
                title: '战术，而不是幻想',
                desc: '碟中谍的核心是潜入、情报、伪装、撤离和团队协作，不会破坏三角洲行动的现代军事调性。' },
              { code: 'IP-02', eyebrow: 'IMF TECH', tagline: 'DISGUISE PROTOCOL',
                img: '图片素材/换脸.png',
                title: '五秒变脸，潜入敌后',
                desc: '身份伪装是碟中谍最具辨识度的特工幻想。联动中将其转译为短时战术欺骗，而不是超能力。' },
              { code: 'IP-03', eyebrow: 'OPERATIONS', tagline: 'INTEL EXTRACT',
                img: '图片素材/Operations情报渗透图.png',
                title: '让撤离更有目的',
                desc: 'Operations 不再只是为了搜刮物资，而是为了阻止情报泄露、守住城市信号节点。' },
              { code: 'IP-04', eyebrow: 'WARFARE', tagline: 'SIGNAL TOWER',
                img: '图片素材/Warfare信号塔争夺图.png',
                title: '让大战场更有归属感',
                desc: 'Warfare 中的占点行为被包装成信号塔争夺，每一次胜利都能贡献全球防卫进度。' },
            ].map((c) => (
              <article key={c.code} className="ip-card">
                <div className="ip-card-art">
                  <img src={c.img} alt="" className="ip-card-img" />
                  <div className="dossier-corner tr">{c.tagline}</div>
                </div>
                <div className="ip-card-body">
                  <div className="ip-card-eyebrow">
                    <span>// {c.eyebrow}</span>
                  </div>
                  <h3 className="ip-card-title">{c.title}</h3>
                  <p className="ip-card-desc">{c.desc}</p>
                </div>
                <div className="ip-card-foot">
                  <span>FILE — {c.code}</span>
                  <span className="arrow">↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === FEEDBACK LOOP === */}
      <section className="feedback-section">
        <img src="图片素材/信号干扰背景纹理.png" alt="" className="feedback-bg" />
        <div className="feedback-overlay"></div>
        <div className="feedback-img-left">
          <img src="图片素材/实体加密硬盘特写.png" alt="" />
        </div>
        <div className="feedback-img-right">
          <img src="图片素材/背景图2.png" alt="" />
        </div>
        <div className="container feedback-content">
          <div className="feedback-header">
            <p className="ticker" style={{ color: 'var(--mi-red)', marginBottom: 12 }}>// CORE MECHANISM · CAMPAIGN ENGINE</p>
            <h2 className="feedback-title">游戏内外反馈循环</h2>
            <p className="feedback-subtitle">每一次撤离都会贡献进度，每一个城市状态都会改变战局。</p>
          </div>
          <div className="feedback-flow">
            {[
              { step: '01', text: '游戏内完成任务',             sub: 'Operations / Warfare' },
              { step: '02', text: '获得情报与密码碎片',         sub: 'Drive + Cipher Fragment' },
              { step: '03', text: '贡献信号防卫值',             sub: 'Signal Defense Value +' },
              { step: '04', text: '城市 Relay 状态变化',        sub: 'Node Status Update' },
              { step: '05', text: '官方发布紧急增援',           sub: 'Emergency Briefing' },
              { step: '06', text: '社区与 Creator 破解线索',    sub: 'Cipher Hunter Deploy' },
              { step: '07', text: '玩家回到游戏完成反攻',       sub: 'Final Extraction ↺' },
            ].map((s, i, arr) => (
              <div key={s.step} className="flow-step">
                <div className="flow-node">
                  <div className="flow-dot"></div>
                  {i < arr.length - 1 && <div className="flow-line"></div>}
                </div>
                <div className="flow-text">
                  <span className="flow-num">{s.step}</span>
                  <span className="flow-label">{s.text}</span>
                  <span className="flow-sub">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="feedback-desc">
            <p>当某个城市 Relay 防卫值降低，游戏内会触发更强的信号干扰、AI 警戒提升或限时代币加成。</p>
            <p>当全服破解足够多的密码碎片，官网将解锁隐藏坐标，并开启最终反攻任务。</p>
            <p>玩家不再只是刷活动，而是在共同守住一个与现实城市绑定的情报节点，并一步步破译幽灵信号的源头。</p>
          </div>
        </div>
      </section>

      {/* === IN-GAME EVENT PREVIEW === */}
      <section className="section ingame-preview-section">
        <div className="container">
          <SectionHeader
            num="03"
            name="IN-GAME EVENTS"
            title={<>游戏内<span style={{color:'var(--mi-red)'}}>事件预览</span></>}
            kicker="把三角洲行动的两大核心模式，重新包装成一场碟中谍式全球情报战。"
          />
          <div className="ingame-preview-grid">

            {/* Left card — Operations */}
            <article className="ingame-card">
              <div className="ingame-card-img-wrap">
                <img src="图片素材/情报包掉落-全图围猎.png" alt="Operations 情报渗透" className="ingame-card-img" />
                <div className="ingame-card-img-overlay">
                  <span className="ingame-card-mode">Operations</span>
                  <h3 className="ingame-card-img-title">夺取实体情报硬盘</h3>
                </div>
              </div>
              <div className="ingame-card-body">
                <p className="ingame-card-desc">在撤离模式中，玩家需要潜入 IMF 标记的机密机房，完成加密情报下载，并携带实体硬盘成功撤离。一旦携带者被击败，硬盘掉落并暴露模糊信号，全图玩家都将卷入情报围猎。</p>
                <button className="btn btn-primary ingame-card-btn" onClick={() => navigate('ingame')}>查看撤离模式设计</button>
              </div>
            </article>

            {/* Middle card — Disguise Protocol */}
            <article className="ingame-card">
              <div className="ingame-card-img-wrap">
                <img src="图片素材/五秒变脸.png" alt="Disguise Protocol 身份伪装" className="ingame-card-img" />
                <div className="ingame-card-img-overlay">
                  <span className="ingame-card-mode">Disguise Protocol</span>
                  <h3 className="ingame-card-img-title">五秒变脸，潜入敌后</h3>
                </div>
              </div>
              <div className="ingame-card-body">
                <p className="ingame-card-desc">在联动任务中，玩家可拾取 IMF 身份伪装装置，短时变成敌方干员或 AI 单位，用于绕过巡逻、接近机密机房或制造战术误导。伪装仅持续 5 秒，开火、扫描或近距离识别都会立刻暴露身份。</p>
                <button className="btn btn-primary ingame-card-btn" onClick={() => navigate('ingame')}>查看伪装协议设计</button>
              </div>
            </article>

            {/* Right card — Warfare */}
            <article className="ingame-card">
              <div className="ingame-card-img-wrap">
                <img src="图片素材/信号塔争夺.png" alt="Warfare 信号塔争夺" className="ingame-card-img" />
                <div className="ingame-card-img-overlay">
                  <span className="ingame-card-mode">Warfare</span>
                  <h3 className="ingame-card-img-title">争夺战场信号塔</h3>
                </div>
              </div>
              <div className="ingame-card-body">
                <p className="ingame-card-desc">在全面战场模式中，地图上的信号中继塔成为战略核心。占领并守住信号塔，你的小队可向全服广播情报、触发地图事件，并为阵营积累幽灵信号防卫值。</p>
                <button className="btn btn-primary ingame-card-btn" onClick={() => navigate('ingame')}>查看全面战场设计</button>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* === RELAY NODES === */}
      <section className="relay-nodes-section">
        <img src="图片素材/全球信号地图背景.png" alt="" className="relay-nodes-bg" />
        <div className="relay-nodes-overlay"></div>
        <div className="container relay-nodes-content">
          <SectionHeader
            num="04"
            name="GLOBAL RELAY NETWORK"
            title={<>守住你的<span style={{color:'var(--df-green)'}}>信号节点</span></>}
            kicker="选择一个城市Relay，完成任务，推动全球信号防卫进度。"
          />
          <div className="relay-city-grid">
            {[
              { relay: 'THAMES RELAY',   zh: '泰晤士节点',   img: '泰晤士节点卡.png',  status: '暴露中', type: 'exposed',  defense: 72, cipher: '3 / 7' },
              { relay: 'LIBERTY RELAY', zh: '自由节点',    img: '自由节点卡.png',    status: '已稳固', type: 'secured',  defense: 89, cipher: '5 / 7' },
              { relay: 'PACIFIC RELAY', zh: '太平洋节点',  img: '太平洋节点卡.png',  status: '被入侵', type: 'breached', defense: 41, cipher: '2 / 7' },
              { relay: 'RHINE RELAY',   zh: '莱茵节点',    img: '莱茵节点卡.png',    status: '已稳固', type: 'secured',  defense: 95, cipher: '6 / 7' },
              { relay: 'SEINE RELAY',   zh: '塞纳节点',    img: '塞纳节点卡.png',    status: '暴露中', type: 'exposed',  defense: 63, cipher: '4 / 7' },
              { relay: 'AURORA RELAY',  zh: '极光节点',    img: '极光节点.png',      status: '被入侵', type: 'breached', defense: 28, cipher: '1 / 7' },
              { relay: 'IBERIA RELAY',  zh: '伊比利亚节点', img: '伊比利亚节点.png', status: '暴露中', type: 'exposed',  defense: 56, cipher: '3 / 7' },
              { relay: 'ATLANTIC RELAY',zh: '大西洋节点',  img: '大西洋节点.png',    status: '已稳固', type: 'secured',  defense: 81, cipher: '5 / 7' },
            ].map(city => {
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
                          <div className="relay-stat-bar" style={{width:`${city.defense}%`, background: barColor}}></div>
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

      {/* === THE IMPOSSIBLE CIPHER === */}
      <section className="cipher-section">
        <img src="图片素材/The Impossible Cipher 主视觉.png" alt="" className="cipher-bg" />
        <div className="cipher-overlay"></div>
        <div className="container cipher-content">
          <SectionHeader
            num="05"
            name="THE IMPOSSIBLE CIPHER"
            title={<>Impossible <span style={{color:'var(--mi-red)'}}>Cipher</span></>}
            kicker="全服玩家、Discord社区与Creator共同破解幽灵信号，解锁最终反攻任务。"
          />

          <div className="cipher-body">
            <div className="cipher-text">
              <p>IMF 截获的幽灵信号并不完整。密码碎片分散在游戏内任务、官网信号地图、Discord 城市频道、城市 OOH 二维码和 Creator 任务箱中。</p>
              <p>玩家需要共同破译坐标，找到中央幽灵中继站的位置。当全服破解进度达到 100%，最终撤离任务将被解锁。</p>

              {/* Global progress bar */}
              <div className="cipher-progress-wrap">
                <div className="cipher-progress-header">
                  <span className="cipher-progress-label">全服破解进度</span>
                  <span className="cipher-progress-val">67%</span>
                </div>
                <div className="cipher-progress-track">
                  <div className="cipher-progress-fill" style={{width:'67%'}}></div>
                </div>
                <div className="cipher-progress-note">// FINAL EXTRACTION UNLOCKS AT 100%</div>
              </div>
            </div>

            <div className="cipher-cards">
              {[
                {
                  num: '01', title: '游戏内碎片', eyebrow: 'IN-GAME',
                  desc: '完成 Operations 和 Warfare 联动任务，获得 Cipher Fragment。',
                  img: null,
                },
                {
                  num: '02', title: '社区协作', eyebrow: 'DISCORD',
                  desc: '不同城市 Relay 频道掌握不同线索，玩家需要跨频道交换情报。',
                  img: null,
                },
                {
                  num: '03', title: '现实挑战', eyebrow: 'IRL · CREATOR',
                  desc: 'Creator 收到 Mission Briefing 任务箱，带领粉丝在线下寻找隐藏坐标。',
                  img: 'Creator任务箱.png',
                },
              ].map(card => (
                <div key={card.num} className="cipher-card">
                  <div className="cipher-card-inner">
                    <div className="cipher-card-top">
                      <span className="cipher-card-eyebrow">{card.eyebrow}</span>
                      <span className="cipher-card-num">{card.num}</span>
                    </div>
                    <h4 className="cipher-card-title">{card.title}</h4>
                    <p className="cipher-card-desc">{card.desc}</p>
                  </div>
                  {card.img && (
                    <div className="cipher-card-img-wrap">
                      <img src={`图片素材/${card.img}`} alt={card.title} className="cipher-card-img" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === CAMPAIGN CADENCE === */}
      <section className="cadence-section">
        <img src="图片素材/时间线背景图.png" alt="" className="cadence-bg" />
        <div className="cadence-overlay"></div>
        <div className="container cadence-content">
          <SectionHeader
            num="06"
            name="CAMPAIGN CADENCE"
            title={<>传播<span style={{color:'var(--df-amber)'}}>节奏</span></>}
            kicker="一套完整的市场Campaign，从预热悬念到终局收割，每个阶段都有独立的传播钩子和玩家行动。"
          />
          <div className="cadence-phases">
            {[
              {
                num: '01', label: '阶段1', title: '信号侦测',
                desc: '社媒释放异常信号、加密坐标和任务倒计时。部分 Creator 收到锁定任务箱，城市 OOH 中埋入第一批二维码线索。',
              },
              {
                num: '02', label: '阶段2', title: '任务接受',
                desc: '正式公布三角洲行动 × 碟中谍联动，上线全球信号地图，开放城市 Relay 选择，并同步公布 The Impossible Cipher 全服解谜事件。',
              },
              {
                num: '03', label: '阶段3', title: '全球防卫',
                desc: 'Operations 硬盘撤离、Disguise Protocol 身份伪装、Warfare 信号塔争夺同步上线。Creator 城市队长开播，Discord 城市频道和社区战报同步启动。',
              },
              {
                num: '04', label: '阶段4', title: '最终撤离',
                desc: '触发城市节点告急和限时反攻，全服破解中央幽灵中继站坐标，解锁最终撤离任务，并公布城市排名、贡献小队和全服战报。',
              },
            ].map((phase, i) => (
              <div key={phase.num} className="cadence-phase">
                {/* connector line between phases */}
                {i < 3 && <div className="cadence-connector"></div>}
                <div className="cadence-node">
                  <div className="cadence-dot">
                    <span className="cadence-dot-inner"></span>
                  </div>
                  <div className="cadence-phase-num">{phase.num}</div>
                </div>
                <div className="cadence-card">
                  <div className="cadence-card-eyebrow">{phase.label}</div>
                  <h3 className="cadence-card-title">{phase.title}</h3>
                  <p className="cadence-card-desc">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === REWARDS & BUNDLE === */}
      <section className="section rewards-section">
        <div className="container">
          <SectionHeader
            num="05"
            name="REWARDS & BUNDLES"
            title={<>战术奖励，只卖外观，<span style={{color:'var(--df-green)'}}>不卖优势</span></>}
            kicker="玩家可以通过活动解锁任务名片、城市守卫者徽章、加密硬盘挂件和幽灵信号喷漆。付费礼包仅包含干员外观、武器蓝图、处决动作和战术语音，不提供任何属性优势。"
          />

          {/* Tab labels */}
          <div className="rewards-tabs">
            <span className="rewards-tab active">免费奖励</span>
            <span className="rewards-tab">城市贡献奖励</span>
            <span className="rewards-tab">高级战术礼包</span>
          </div>

          {/* Main layout: bundle big image left + 3 small cards + disclaimer right */}
          <div className="rewards-layout">

            {/* Left: bundle hero image */}
            <div className="rewards-bundle-wrap">
              <img src="图片素材/IMF Tactical Bundle礼包图.png" alt="IMF Tactical Bundle" className="rewards-bundle-img" />
              <div className="rewards-bundle-label">
                <span className="rewards-bundle-tag">LIMITED BUNDLE</span>
                <span className="rewards-bundle-name">IMF Tactical Bundle</span>
              </div>
            </div>

            {/* Right: 3 small reward cards + no-p2w bar */}
            <div className="rewards-right">
              <div className="rewards-small-grid">
                {[
                  { img: '城市守卫者徽章.png',    name: '城市守卫者徽章',   type: '活动奖励',   color: 'var(--df-green)' },
                  { img: '加密硬盘武器挂件.png',  name: '加密硬盘武器挂件', type: '任务奖励',   color: 'var(--df-amber)' },
                  { img: 'Covert Ops AR武器蓝图.png', name: 'Covert Ops AR 武器蓝图', type: '高级礼包',  color: 'var(--mi-red)' },
                ].map(r => (
                  <div key={r.name} className="reward-small-card">
                    <div className="reward-small-img-wrap">
                      <img src={`图片素材/${r.img}`} alt={r.name} className="reward-small-img" />
                    </div>
                    <div className="reward-small-info">
                      <span className="reward-small-type" style={{color: r.color}}>{r.type}</span>
                      <span className="reward-small-name">{r.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* No P2W disclaimer bar */}
              <div className="rewards-disclaimer">
                <span className="rewards-disclaimer-icon">✦</span>
                <p>付费礼包<strong>仅包含干员外观、武器蓝图、处决动作和战术语音</strong>，不提供任何属性优势。外观不影响战斗结果。</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === FOOTER CTA === */}
      <section className="footer-cta-section">
        <img src="图片素材/烟雾探照灯背景.png" alt="" className="footer-cta-bg" />
        <div className="footer-cta-overlay"></div>
        <div className="footer-cta-inner">
          <div className="footer-cta-copy">
            <p className="footer-cta-line1">你的城市节点已经暴露。</p>
            <p className="footer-cta-line2">你的小队只有一个任务：<br/>伪装，破译，撤离。</p>
            <p className="footer-cta-line3">没有支援。</p>
          </div>
          <div className="footer-cta-btns">
            <button className="btn btn-primary footer-cta-btn" onClick={() => navigate('plan')}>
              查看完整Campaign方案
            </button>
            <button className="btn footer-cta-btn" onClick={() => navigate('ingame')}>
              进入游戏内事件设计
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.HomePage = HomePage;
