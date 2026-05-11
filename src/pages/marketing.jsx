/* global React, Icon, DossierArt, LabelRow, SectionHeader, Breadcrumb */

const MarketingPage = ({ navigate }) => {
  // UA channel donut data
  const channels = [
    { name: 'YOUTUBE',         pct: 28, color: '#ff7a1a', spend: '$3.47M' },
    { name: 'TIKTOK',          pct: 22, color: '#e0181a', spend: '$2.73M' },
    { name: 'META (IG/FB)',    pct: 16, color: '#5af6c6', spend: '$1.98M' },
    { name: 'STEAM / PC HUBS', pct: 11, color: '#f6c445', spend: '$1.36M' },
    { name: 'TWITCH / KICK',   pct:  9, color: '#9d6dff', spend: '$1.12M' },
    { name: 'REDDIT / ENDEMIC',pct:  7, color: '#3aa9ff', spend: '$0.87M' },
    { name: 'PROGRAMMATIC',    pct:  7, color: '#88a18a', spend: '$0.87M' },
  ];

  // Donut SVG
  const Donut = () => {
    const r = 70, c = 2 * Math.PI * r;
    let acc = 0;
    return (
      <svg viewBox="0 0 200 200" width="200" height="200" style={{ flexShrink: 0 }}>
        <circle cx="100" cy="100" r={r} fill="none" stroke="#1a1f22" strokeWidth="22" />
        {channels.map((ch, i) => {
          const len = (ch.pct / 100) * c;
          const off = -acc;
          acc += len;
          return (
            <circle key={ch.name}
              cx="100" cy="100" r={r}
              fill="none" stroke={ch.color} strokeWidth="22"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={off}
              transform="rotate(-90 100 100)"
            />
          );
        })}
        <text x="100" y="96" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6b7672" letterSpacing="2">UA SPLIT</text>
        <text x="100" y="115" textAnchor="middle" fontFamily="Saira Condensed" fontWeight="800" fontSize="26" fill="#ff7a1a">$12.4M</text>
      </svg>
    );
  };

  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: 40, paddingBottom: 32 }}>
        <Breadcrumb trail={[
          { id: 'home', label: 'OVERVIEW' },
          { id: 'marketing', label: '03 / MARKETING & GTM' },
        ]} navigate={navigate} />

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <LabelRow>FILE 03 · GO-TO-MARKET / FIRING PLAN</LabelRow>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '14px 0 0', lineHeight: 0.92 }}>
              FIRING<br/>
              <span style={{ background: 'linear-gradient(120deg, var(--df-green), var(--df-green-deep))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>PLAN</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16.5, lineHeight: 1.6, maxWidth: 640, marginTop: 22 }}>
              Five marketing pillars drive the 42-day window. Total marketing spend $18.6M USD, forecast revenue $74M,
              forecast ROAS 4.8×. Every dollar maps to a pillar; every pillar maps to a stage of the funnel.
            </p>
          </div>
          <div className="stats-bar" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <div className="stat"><div className="lbl">UA SPEND</div><div className="val">$12.4M</div></div>
            <div className="stat"><div className="lbl">EARNED REACH</div><div className="val">120M+</div></div>
            <div className="stat"><div className="lbl">FORECAST CPI</div><div className="val">$3.20</div></div>
            <div className="stat"><div className="lbl">ROAS TARGET</div><div className="val">4.8×</div></div>
          </div>
        </div>

        {/* PILLARS */}
        <div className="divider-bar"><span className="marker"></span><span>FIVE PILLARS · ONE COORDINATED CAMPAIGN</span></div>
        <div className="grid-3" style={{ marginBottom: 64 }}>
          {[
            { n: '01', name: 'PAID UA', desc: 'Performance media across YouTube, TikTok, Meta, Steam. Always-on plus three burst windows.', a: '$12.4M', b: '4.8× ROAS' },
            { n: '02', name: 'COMMUNITY', desc: 'Discord, Reddit, Steam Hubs. Daily story drops, weekly playtest sessions, faction lore.', a: '180K MAU', b: '12% CTR' },
            { n: '03', name: 'SOCIAL CONTENT', desc: 'Daily TikTok, weekly YouTube longform, in-engine cinematic shorts. Native to each surface.', a: '210 ASSETS', b: '120M REACH' },
            { n: '04', name: 'KOL / INFL.', desc: '14 partner streamers + 60 micro-creators. S/A/B tier. Aligned to phase beats.', a: '14 + 60', b: '$0.42 CPM' },
            { n: '05', name: 'IRL / EARNED', desc: 'Theatrical tie-in, geo-cache, merch drop, press tour. Pure earned-media flywheel.', a: '4 CITIES', b: '$2.1M PR' },
          ].map((p) => (
            <div key={p.n} className="pillar-card">
              <span className="pn">{p.n}</span>
              <div className="ticker" style={{ color: 'var(--df-amber)', position: 'relative', zIndex: 2 }}>// PILLAR {p.n}</div>
              <h3 className="pname">{p.name}</h3>
              <p className="pdesc">{p.desc}</p>
              <div className="pmetrics">
                <div className="m"><div className="lb">SCALE</div><div className="vl">{p.a}</div></div>
                <div className="m"><div className="lb">EFFICIENCY</div><div className="vl">{p.b}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UA CHANNEL DONUT */}
      <section className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader num="03.A" name="UA CHANNEL MIX"
            title={<>WHERE THE<br/>$12.4M LANDS</>}
            kicker="60-15-15-10 funnel mix. YouTube + TikTok lead awareness; Meta and Steam handle consideration and conversion." />
          <div className="grid-2" style={{ gap: 32, alignItems: 'center' }}>
            <div className="donut-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
              <Donut />
            </div>
            <div className="donut-legend">
              {channels.map((ch) => (
                <div key={ch.name} className="row">
                  <span className="sw" style={{ background: ch.color }}></span>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{ch.name}</span>
                  <span className="bdg">{ch.spend}</span>
                  <span className="pct">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL CADENCE */}
      <section className="section">
        <div className="container">
          <SectionHeader num="03.B" name="SOCIAL CADENCE"
            title={<>CONTENT<br/>FIRING SCHEDULE</>}
            kicker="Each platform plays its part. Native rhythm, native format, native voice." />
          <table className="df-table">
            <thead>
              <tr>
                <th>PLATFORM</th>
                <th>FORMAT</th>
                <th>CADENCE</th>
                <th>VOICE</th>
                <th>WEEKLY OUTPUT</th>
                <th>FORECAST IMP.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>YouTube</strong></td><td>3-7 min cinematic + dev diary</td><td>2× / week</td><td>Authoritative, story-led</td><td className="amber">14 ASSETS</td><td>22M</td></tr>
              <tr><td><strong>TikTok</strong></td><td>15-30s gameplay POV + trends</td><td>Daily</td><td>Ironic, lo-fi, in-jokes</td><td className="amber">42 ASSETS</td><td>48M</td></tr>
              <tr><td><strong>Instagram</strong></td><td>Reels + carousels + stories</td><td>5× / week</td><td>Visual, polished, high-fidelity</td><td className="amber">35 ASSETS</td><td>18M</td></tr>
              <tr><td><strong>Twitter / X</strong></td><td>Cut-downs · live-tweet ops</td><td>Daily</td><td>Sharp, ops-room tone</td><td className="amber">28 POSTS</td><td>9M</td></tr>
              <tr><td><strong>Reddit</strong></td><td>Dev AMAs · long-form posts</td><td>2× / week</td><td>Transparent, technical</td><td className="amber">14 POSTS</td><td>4M</td></tr>
              <tr><td><strong>Discord</strong></td><td>Drops, leaks, faction polls</td><td>Daily</td><td>Insider, conspiratorial</td><td className="amber">CONT.</td><td>12M</td></tr>
              <tr><td><strong>Steam</strong></td><td>Event hub · banners · sales</td><td>Phase-aligned</td><td>Direct, transactional</td><td className="amber">9 ASSETS</td><td>7M</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SPEND BY PHASE — bar chart */}
      <section className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <SectionHeader num="03.C" name="SPEND PACING"
            title={<>BUDGET<br/>BY PHASE</>}
            kicker="Front-load awareness in T-14 to T+7. Hold mid-campaign for activation. Spike again at finale." />
          <div className="grid-2" style={{ gap: 32, alignItems: 'flex-start' }}>
            <div className="card" style={{ padding: 28 }}>
              <div className="ticker" style={{ color: 'var(--df-amber)' }}>// SPEND BY WEEK · $M</div>
              <div className="bar-chart" style={{ marginTop: 18 }}>
                {[
                  { w: 'T-14 (TEASE)', v: 2.4, p: 70 },
                  { w: 'WK 01 (LAUNCH)', v: 3.8, p: 100 },
                  { w: 'WK 02', v: 1.9, p: 52 },
                  { w: 'WK 03 (MID)', v: 3.1, p: 84 },
                  { w: 'WK 04', v: 1.6, p: 44 },
                  { w: 'WK 05 (THEATR.)', v: 2.7, p: 73 },
                  { w: 'WK 06 (FINALE)', v: 3.1, p: 84 },
                ].map((b) => (
                  <div key={b.w} className="bar-row">
                    <span className="lbl">{b.w}</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${b.p}%` }}></div></div>
                    <span className="num">${b.v}M</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <div className="ticker" style={{ color: 'var(--df-amber)' }}>// FUNNEL CONVERSION FORECAST</div>
              <h4 className="display" style={{ fontSize: 22, margin: '8px 0 18px' }}>FROM IMPRESSION TO ARPU</h4>
              {[
                { l: 'IMPRESSIONS',  v: '120M', p: 100, c: 'var(--df-amber)' },
                { l: 'CLICKS',       v: '8.4M', p: 70,  c: 'var(--df-amber)' },
                { l: 'INSTALLS',     v: '3.9M', p: 33,  c: 'var(--df-amber-hot)' },
                { l: 'D7 RETAINED',  v: '1.6M', p: 14,  c: 'var(--mi-red)' },
                { l: 'PASS BUYERS',  v: '494K', p: 4.1, c: 'var(--mi-red)' },
                { l: 'WHALES (>$50)', v: '36K',  p: 0.3, c: 'var(--hud-cyan)' },
              ].map((row) => (
                <div key={row.l} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 80px', gap: 14, alignItems: 'center', padding: '10px 0', borderTop: '1px dashed var(--line)' }}>
                  <span className="ticker" style={{ color: 'var(--text-secondary)' }}>{row.l}</span>
                  <div style={{ height: 16, background: 'var(--bg-elev)', border: '1px solid var(--line)', position: 'relative' }}>
                    <div style={{ height: '100%', width: `${row.p}%`, background: row.c }}></div>
                  </div>
                  <span className="ticker" style={{ color: row.c, textAlign: 'right' }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* P&L SUMMARY */}
      <section className="section">
        <div className="container">
          <SectionHeader num="03.D" name="P&L FORECAST"
            title={<>THE BOTTOM<br/>LINE</>}
            kicker="Three scenarios. P75 case is our planning assumption. Profit margin holds at 56% even in P25 downside." />
          <table className="df-table">
            <thead>
              <tr>
                <th>LINE ITEM</th>
                <th>P25 (DOWNSIDE)</th>
                <th>P50 (BASE)</th>
                <th>P75 (TARGET)</th>
                <th>P90 (UPSIDE)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Battle Pass revenue</strong></td><td>$22.0M</td><td>$32.5M</td><td className="amber">$44.0M</td><td>$58.0M</td></tr>
              <tr><td><strong>Bundles & store</strong></td><td>$8.4M</td><td>$13.2M</td><td className="amber">$19.6M</td><td>$26.4M</td></tr>
              <tr><td><strong>IRL merch</strong></td><td>$1.6M</td><td>$3.2M</td><td className="amber">$5.4M</td><td>$8.1M</td></tr>
              <tr><td><strong>Sponsorship offset</strong></td><td>$3.0M</td><td>$4.2M</td><td className="amber">$5.0M</td><td>$6.2M</td></tr>
              <tr style={{ background: 'var(--bg-elev)' }}><td><strong>GROSS REVENUE</strong></td><td>$35.0M</td><td>$53.1M</td><td className="amber">$74.0M</td><td>$98.7M</td></tr>
              <tr><td>Marketing spend</td><td>($14.6M)</td><td>($16.8M)</td><td>($18.6M)</td><td>($21.0M)</td></tr>
              <tr><td>IP royalty (Paramount)</td><td>($5.6M)</td><td>($8.5M)</td><td>($11.8M)</td><td>($15.8M)</td></tr>
              <tr><td>Production / dev cost</td><td>($4.2M)</td><td>($4.2M)</td><td>($4.2M)</td><td>($4.2M)</td></tr>
              <tr style={{ background: 'rgba(255,122,26,0.06)' }}>
                <td><strong>NET CONTRIBUTION</strong></td>
                <td className="amber">$10.6M</td>
                <td className="amber">$23.6M</td>
                <td className="amber">$39.4M</td>
                <td className="amber">$57.7M</td>
              </tr>
              <tr>
                <td>ROAS</td>
                <td>2.4×</td>
                <td>3.2×</td>
                <td className="amber">4.8×</td>
                <td>5.9×</td>
              </tr>
            </tbody>
          </table>
          <p className="ticker" style={{ color: 'var(--text-mute)', marginTop: 14 }}>
            * Assumes 18M unique exposed users, 3.9M new installs, 13% pass attach. Revenue net of platform fees.
          </p>
        </div>
      </section>

      {/* RISK & CALL TO DECIDE */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 20 }}>
            <div className="card" style={{ padding: 28, position: 'relative' }}>
              <span className="dossier-corner tl">// RISK REGISTER</span>
              <div style={{ paddingTop: 28 }}>
                <h3 className="display" style={{ fontSize: 26, margin: '0 0 14px' }}>KNOWN OBSTACLES</h3>
                {[
                  { r: 'M:I theatrical slips', m: 'Ride trailer cycle independent of release', sev: 'M' },
                  { r: 'KOL pull-out (Tier S)', m: 'Two contracted Tier-S backups', sev: 'L' },
                  { r: 'Paramount approval delays', m: 'Pre-approved 90% of assets at Wave 0', sev: 'L' },
                  { r: 'Server load spike on launch', m: '+30% server capacity in NA / EU', sev: 'M' },
                  { r: 'Competing AAA launch', m: 'Tease move-up by 7 days if needed', sev: 'M' },
                ].map((x, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: 16, padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 13.5, alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{x.r}</span>
                    <span style={{ color: 'var(--text-mute)' }}>{x.m}</span>
                    <span className={`tag ${x.sev === 'M' ? 'amber' : 'cyan'}`} style={{ textAlign: 'center' }}>{x.sev === 'L' ? 'LOW' : 'MED'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 28, background: 'linear-gradient(180deg, #1a0c08, var(--bg-card))', position: 'relative' }}>
              <span className="dossier-corner tl" style={{ color: 'var(--mi-red)' }}>// DECISION GATE</span>
              <span className="dossier-corner tr">FILE 03 · CLOSE</span>
              <div style={{ paddingTop: 32 }}>
                <h3 className="display" style={{ fontSize: 32, margin: '0 0 14px' }}>SHOULD WE<br/><span style={{ color: 'var(--df-green)' }}>ACCEPT IT?</span></h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.6 }}>
                  Approve and we light the fuse on Jun 19. The summer window is non-recoverable; M:I theatrical
                  is locked. Three approval gates remain — IP final, ad assets, BP rewards.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary"><span>APPROVE & DEPLOY</span><Icon.arrow className="arrow" width="14" height="14" /></button>
                  <button className="btn btn-mi"><span>REQUEST DEEP-DIVE</span></button>
                </div>
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--line)', display: 'flex', gap: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-mute)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  <span>OWNER · J. KIM (DF)</span>
                  <span>SECONDARY · L. PARK (PARAMOUNT)</span>
                  <span>SLA · 5 BUS. DAYS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

window.MarketingPage = MarketingPage;
