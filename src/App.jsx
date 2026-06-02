import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { meshCanvas } from './mesh.js'
import analystImg from './assets/hero-analyst.jpg'

/* ─── NAV ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a className="logo" href="#" aria-label="SechPoint home"><Logo /></a>
        <nav className="nav-links">
          <a href="#platform">Platform <svg viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          <a href="#security">Solutions <svg viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          <a href="#security">Security</a>
          <a href="#platform">Resources</a>
          <a href="#">Company</a>
        </nav>
        <div className="nav-right">
          <a href="#" className="btn btn-grad">Request a demo</a>
        </div>
      </div>
    </header>
  )
}

/* ─── DPI PANEL ───────────────────────────────────────────── */
function DpiPanel() {
  const lanesRef = useRef(null)
  const [packets, setPackets] = useState(Math.floor(184273918))
  const [throughput, setThroughput] = useState(412.0)
  const [threats, setThreats] = useState(2841)
  const [sparkBars, setSparkBars] = useState(() => Array.from({ length: 14 }, () => 20 + Math.random() * 80))

  // live counters
  useEffect(() => {
    const t1 = setInterval(() => setPackets(p => p + Math.floor(40000 + Math.random() * 90000)), 120)
    const t2 = setInterval(() => setThroughput(v => {
      const next = v + (Math.random() - 0.48) * 14
      return Math.max(360, Math.min(486, next))
    }), 700)
    const t3 = setInterval(() => setThreats(v => v + (Math.random() > 0.6 ? 1 : 0)), 900)
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3) }
  }, [])

  // sparkline
  useEffect(() => {
    const t = setInterval(() => {
      setSparkBars(bars => {
        const next = [...bars.slice(1), 20 + Math.random() * 80]
        return next
      })
    }, 700)
    return () => clearInterval(t)
  }, [])

  // packet flow
  useEffect(() => {
    const wrap = lanesRef.current
    if (!wrap) return
    const lanes = [...wrap.querySelectorAll('.lane')]
    const colors = [
      '#06c8c8', '#3b82f6', '#6e56f7', '#06c8c8', '#ff5c7a'
    ]
    function spawn() {
      const lane = lanes[Math.floor(Math.random() * lanes.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const pk = document.createElement('span')
      pk.className = 'packet'
      const wpx = 14 + Math.random() * 26
      pk.style.width = wpx + 'px'
      pk.style.background = color
      pk.style.color = color
      pk.style.left = '6%'
      lane.appendChild(pk)
      const dur = 2200 + Math.random() * 1400
      const anim = pk.animate(
        [
          { left: '4%', opacity: 0, offset: 0 },
          { opacity: 1, offset: 0.08 },
          { offset: 0.48 },
          { transform: 'translateY(-50%) scaleY(1.5)', offset: 0.5 },
          { transform: 'translateY(-50%) scaleY(1)', offset: 0.54 },
          { opacity: 1, offset: 0.9 },
          { left: '94%', opacity: 0, offset: 1 }
        ],
        { duration: dur, easing: 'linear' }
      )
      anim.onfinish = () => pk.remove()
    }
    const timer = setInterval(spawn, 360)
    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="dpi">
      <div className="dpi-head">
        <span className="dpi-dot"></span>
        <span className="dpi-title">SechPoint DPI Engine · <b>aig-core-01</b></span>
        <span className="dpi-live"><i></i> LIVE</span>
      </div>
      <div className="dpi-lanes" ref={lanesRef}>
        <div className="dpi-engine"></div>
        <div className="lane"><span className="lane-tag">HTTPS</span><span className="lane-port">:443</span></div>
        <div className="lane"><span className="lane-tag">QUIC</span><span className="lane-port">:443</span></div>
        <div className="lane"><span className="lane-tag">RTP · VoIP</span><span className="lane-port">:5004</span></div>
        <div className="lane"><span className="lane-tag">DNS</span><span className="lane-port">:53</span></div>
        <div className="lane"><span className="lane-tag">TLS 1.3</span><span className="lane-port">:8443</span></div>
      </div>
      <div className="dpi-foot">
        <div className="dpi-cell">
          <div className="k">THROUGHPUT</div>
          <div className="v cy">{throughput.toFixed(1)} <span style={{ fontSize: 12, color: 'var(--on-dark-3)' }}>Gbps</span></div>
        </div>
        <div className="dpi-cell">
          <div className="k">PACKETS INSPECTED</div>
          <div className="v">{packets.toLocaleString('en-US')}</div>
          <div className="dpi-spark">
            {sparkBars.map((h, i) => <i key={i} style={{ height: h + '%' }} />)}
          </div>
        </div>
        <div className="dpi-cell">
          <div className="k">THREATS BLOCKED</div>
          <div className="v al">{threats.toLocaleString('en-US')}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  const canvasRef = useRef(null)
  useEffect(() => meshCanvas(canvasRef.current), [])
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <canvas ref={canvasRef} id="mesh"></canvas>
        <div className="hero-glow g1"></div>
        <div className="hero-glow g2"></div>
      </div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow on-dark reveal"><span className="dot"></span> Sovereign Network Intelligence</span>
          <h1 className="reveal d1">Built to secure and optimize <span className="grad-text">national-scale networks</span></h1>
          <p className="hero-sub reveal d2">SechPoint helps telecoms, ISPs, and national cyber teams gain real-time visibility, control encrypted traffic, strengthen cyber defense, and improve subscriber experience through DPI-powered intelligence.</p>
          <ul className="hero-proof reveal d3" style={{ listStyle: 'none', padding: 0 }}>
            {['High-speed AI/ML-powered DPI', 'Cybersecurity and IP/URL intelligence', 'Subscriber analytics and traffic orchestration'].map(t => (
              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="proof-ic" style={{ flexShrink: 0 }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="hero-cta reveal d4">
            <a href="#" className="btn btn-grad">Request a demo <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            <a href="#platform" className="btn btn-ghost-d">Explore platform</a>
          </div>
          <div className="hero-stats reveal d4">
            <div className="hero-stat"><div className="num">400G<span>+</span></div><div className="lbl">Line-rate inspection</div></div>
            <div className="hero-stat"><div className="num">6,000<span>+</span></div><div className="lbl">Apps &amp; protocols ID'd</div></div>
            <div className="hero-stat"><div className="num">&lt;50<span>µs</span></div><div className="lbl">Added latency</div></div>
          </div>
        </div>
        <div className="hero-visual reveal d2">
          <DpiPanel />
          <div className="dpi-badge badge-threat">
            <span className="bi"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <div>C2 beacon blocked<small>91.214.x.x · high risk</small></div>
          </div>
          <div className="dpi-badge badge-class">
            <span className="bi"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
            <div>Classified · Layer 7<small>video · streaming</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TRUST ───────────────────────────────────────────────── */
function Trust() {
  const logos = [
    { icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6"/></svg>, name: 'NovaTel' },
    { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M6 18V6l6 5 6-5v12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>, name: 'Meridian ISP' },
    { icon: <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>, name: 'StateGrid Cyber' },
    { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 4l7 4v5c0 4-3 6.5-7 7.5C8 19.5 5 17 5 13V8l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>, name: 'SentinelCERT' },
    { icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>, name: 'LinkCore' },
  ]
  return (
    <section className="trust">
      <div className="wrap">
        <p className="trust-intro reveal">Built for telecom, ISP, and sovereign cyber environments.</p>
        <div className="trust-row reveal d1">
          {logos.map(l => (
            <div className="trust-logo" key={l.name}>
              <span className="glyph">{l.icon}</span><span>{l.name}</span>
            </div>
          ))}
        </div>
        <div className="trust-markers reveal d2">
          <span className="trust-marker"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg> Founded by ex-Cisco veterans</span>
          <span className="trust-marker"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> 24/7 support availability</span>
          <span className="trust-marker"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h6l2-4 2 8 2-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> Inline &amp; out-of-path deployment</span>
        </div>
      </div>
    </section>
  )
}

/* ─── BROAD VALUE ─────────────────────────────────────────── */
function BroadValue() {
  return (
    <section className="light section">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2>Never lose sight of <span className="grad-text">your network</span></h2>
          <p className="lead">From application visibility and encrypted traffic analysis to threat correlation, subscriber mapping, and policy enforcement, SechPoint turns operator networks into real-time intelligence and control platforms.</p>
        </div>
        <div className="value-labels reveal d1">
          <span className="value-chip"><span className="vc-ic"><svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8"/><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Network Intelligence</span>
          <span className="value-chip"><span className="vc-ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg></span> Cyber Defense</span>
          <span className="value-chip"><span className="vc-ic"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Subscriber Visibility</span>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURE 1 — VISIBILITY ──────────────────────────────── */
const BAR_DEFS = [
  { nm: 'Video',      base: 74, color: '#0055ff', color2: '#06c8c8', icon: '▶' },
  { nm: 'Web / TLS',  base: 58, color: '#1b8af0', color2: '#06c8c8', icon: '🔒' },
  { nm: 'VoIP / RTP', base: 41, color: '#6e56f7', color2: '#a78bfa', icon: '🎙' },
  { nm: 'Gaming',     base: 33, color: '#0055ff', color2: '#38bdf8', icon: '🎮' },
  { nm: 'Messaging',  base: 27, color: '#06c8c8', color2: '#2bd17e', icon: '💬' },
  { nm: 'P2P / VPN',  base: 18, color: '#6e56f7', color2: '#0055ff', icon: '🔗' },
]

function VisibilityBars() {
  const vizRef = useRef(null)
  const [widths, setWidths] = useState(BAR_DEFS.map(() => 0))
  const [pcts, setPcts]     = useState(BAR_DEFS.map(b => b.base))
  const [active, setActive] = useState(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = vizRef.current
    if (!el) return
    const obs = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || animated.current) return
      animated.current = true
      obs.disconnect()

      // stagger bars in one by one
      BAR_DEFS.forEach((b, i) => {
        setTimeout(() => {
          setWidths(prev => { const n=[...prev]; n[i]=b.base; return n })
        }, i * 120)
      })

      // live wiggle
      const t = setInterval(() => {
        const idx = Math.floor(Math.random() * BAR_DEFS.length)
        setActive(idx)
        setTimeout(() => setActive(null), 600)

        setWidths(prev => prev.map((v, i) => {
          const base = BAR_DEFS[i].base
          return Math.max(8, Math.min(96, base + (Math.random() - 0.5) * 10))
        }))
        setPcts(prev => prev.map((v, i) => {
          const base = BAR_DEFS[i].base
          return Math.round(Math.max(8, Math.min(96, base + (Math.random() - 0.5) * 10)))
        }))
      }, 1600)
      return () => clearInterval(t)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={vizRef} style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      background: 'linear-gradient(160deg,#0c1730,#0a1020)',
      border: '1px solid rgba(255,255,255,.08)',
      boxShadow: '0 40px 80px -44px rgba(12,23,48,.6)',
    }}>
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
        backgroundSize: '34px 34px',
      }} />

      {/* scanning sweep line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: 2,
        background: 'linear-gradient(var(--cyan),transparent)',
        opacity: .18,
        animation: 'sweep 3s ease-in-out infinite',
      }} />

      {/* title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '14px 18px', fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11, color: 'var(--on-dark-2)', position: 'relative', zIndex: 2,
        borderBottom: '1px solid rgba(255,255,255,.05)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        &nbsp;&nbsp;layer7_classifier.live
        <span style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5,
          color: 'var(--cyan)', fontSize: 10,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', animation: 'blink 1.4s infinite', display: 'inline-block' }} />
          LIVE
        </span>
      </div>

      {/* bars */}
      <div style={{ padding: '20px 22px 24px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {BAR_DEFS.map((b, i) => {
          const isActive = active === i
          const grad = `linear-gradient(90deg, ${b.color}, ${b.color2})`
          return (
            <div key={b.nm} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* label */}
              <span style={{
                width: 96, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5,
                color: isActive ? '#fff' : 'var(--on-dark)',
                transition: 'color .3s',
                flexShrink: 0,
              }}>{b.nm}</span>

              {/* track */}
              <div style={{
                flex: 1, height: 10, background: 'rgba(255,255,255,.06)',
                borderRadius: 6, overflow: 'visible', position: 'relative',
              }}>
                {/* filled bar */}
                <div style={{
                  height: '100%', borderRadius: 6,
                  background: grad,
                  width: widths[i] + '%',
                  transition: 'width 1s cubic-bezier(.22,.61,.36,1)',
                  position: 'relative',
                  boxShadow: isActive ? `0 0 12px ${b.color2}` : 'none',
                }}>
                  {/* leading glow dot */}
                  <div style={{
                    position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)',
                    width: 8, height: 8, borderRadius: '50%',
                    background: b.color2,
                    boxShadow: `0 0 ${isActive ? 12 : 6}px ${b.color2}`,
                    transition: 'box-shadow .3s',
                    opacity: widths[i] > 0 ? 1 : 0,
                  }} />
                </div>
              </div>

              {/* pct */}
              <span style={{
                width: 38, textAlign: 'right',
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5,
                color: isActive ? b.color2 : 'var(--on-dark-2)',
                fontWeight: isActive ? 700 : 400,
                transition: 'color .3s',
              }}>{pcts[i]}%</span>
            </div>
          )
        })}
      </div>

      {/* bottom total bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.05)',
        padding: '12px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5,
        color: 'var(--on-dark-3)', position: 'relative', zIndex: 2,
      }}>
        <span>6,000+ protocols identified</span>
        <span style={{ color: 'var(--cyan)' }}>↑ 2.3% vs last hour</span>
      </div>

      <style>{`
        @keyframes sweep {
          0%   { left: -2px; opacity: 0; }
          10%  { opacity: .18; }
          90%  { opacity: .18; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function FeatureVisibility() {
  return (
    <section className="light alt section" id="platform">
      <div className="wrap">
        <div className="feature">
          <div className="feat-copy reveal">
            <span className="eyebrow on-light"><span className="dot"></span> Visibility</span>
            <h3>Turn raw traffic into real-time network and application intelligence</h3>
            <p className="body">SechPoint classifies traffic up to Layer 7 and beyond, helping operators understand applications, protocols, service types, behavior patterns, and network performance in real time.</p>
            <ul className="feat-bullets">
              <li><span className="bi" style={{ background: 'rgba(0,85,255,.1)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0055ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Real-time protocol and application classification</li>
              <li><span className="bi" style={{ background: 'rgba(6,200,200,.12)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#06c8c8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Encrypted traffic intelligence for modern networks</li>
              <li><span className="bi" style={{ background: 'rgba(0,85,255,.1)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0055ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> High-throughput data visibility and orchestration</li>
            </ul>
            <a href="#" className="feat-link">Learn more <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
          <div className="feat-visual reveal d2"><VisibilityBars /></div>
        </div>
      </div>
    </section>
  )
}

/* ─── ANIMATED GLOBE ──────────────────────────────────────── */
function AnimatedGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const SIZE = 300
    canvas.width  = SIZE * dpr
    canvas.height = SIZE * dpr
    canvas.style.width  = SIZE + 'px'
    canvas.style.height = SIZE + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const cx = SIZE / 2, cy = SIZE / 2, R = 118
    let spin = 0, raf

    // Project a lat/lon (radians) onto canvas, accounting for globe spin
    function project(lat, lon) {
      const l = lon + spin
      const x = cx + R * Math.cos(lat) * Math.sin(l)
      const y = cy - R * Math.sin(lat)
      const z = Math.cos(lat) * Math.cos(l)   // depth: >0 = front
      return { x, y, z }
    }

    // Draw a latitude circle
    function drawLatitude(lat, dashed) {
      const steps = 120
      let started = false
      ctx.beginPath()
      ctx.setLineDash(dashed ? [3, 5] : [])
      for (let i = 0; i <= steps; i++) {
        const lon = (i / steps) * Math.PI * 2
        const p = project(lat, lon)
        if (p.z < -0.02) { started = false; continue }
        started ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), started = true)
      }
      ctx.strokeStyle = lat === 0 ? 'rgba(6,200,200,.35)' : 'rgba(6,200,200,.15)'
      ctx.lineWidth = lat === 0 ? 1.3 : 0.8
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw a longitude arc (meridian)
    function drawMeridian(lon) {
      const steps = 100
      let started = false
      ctx.beginPath()
      ctx.setLineDash([3, 5])
      for (let i = 0; i <= steps; i++) {
        const lat = -Math.PI / 2 + (i / steps) * Math.PI
        const p = project(lat, lon)
        if (p.z < -0.02) { started = false; continue }
        started ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), started = true)
      }
      ctx.strokeStyle = 'rgba(6,200,200,.14)'
      ctx.lineWidth = 0.7
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Threat arc: lat/lon start & end, lifted above surface
    const threatArcs = [
      { lat1:  0.6, lon1: -1.8, lat2:  0.5, lon2:  0.4, color: '#ff5c7a', t: 0.0, spd: 0.006 },
      { lat1: -0.4, lon1: -0.6, lat2: -0.3, lon2:  1.2, color: '#6e56f7', t: 0.4, spd: 0.005 },
      { lat1:  0.8, lon1:  0.2, lat2: -0.5, lon2:  0.9, color: '#06c8c8', t: 0.7, spd: 0.0045 },
    ]

    function lerpLatLon(a, b, t) {
      // Slerp-ish: interpolate lat/lon + lift arc above surface
      const lat = a.lat + (b.lat - a.lat) * t
      const lon = a.lon + (b.lon - a.lon) * t
      // lift factor: arc peaks at t=0.5
      const lift = 1 + 0.22 * Math.sin(t * Math.PI)
      return { lat, lon, lift }
    }

    function drawThreatArc(arc) {
      const steps = 60
      const a = { lat: arc.lat1, lon: arc.lon1 }
      const b = { lat: arc.lat2, lon: arc.lon2 }

      // faint full path
      ctx.beginPath()
      let started = false
      for (let i = 0; i <= steps; i++) {
        const { lat, lon, lift } = lerpLatLon(a, b, i / steps)
        const l = lon + spin
        const px = cx + R * lift * Math.cos(lat) * Math.sin(l)
        const py = cy - R * lift * Math.sin(lat)
        const z  = Math.cos(lat) * Math.cos(l)
        if (z < 0) { started = false; continue }
        started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true)
      }
      ctx.strokeStyle = arc.color + '40'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // bright travelled portion
      ctx.beginPath()
      started = false
      for (let i = 0; i <= steps; i++) {
        const frac = i / steps
        if (frac > arc.t) break
        const { lat, lon, lift } = lerpLatLon(a, b, frac)
        const l = lon + spin
        const px = cx + R * lift * Math.cos(lat) * Math.sin(l)
        const py = cy - R * lift * Math.sin(lat)
        const z  = Math.cos(lat) * Math.cos(l)
        if (z < 0) { started = false; continue }
        started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true)
      }
      ctx.strokeStyle = arc.color
      ctx.lineWidth = 2
      ctx.shadowColor = arc.color
      ctx.shadowBlur = 6
      ctx.stroke()
      ctx.shadowBlur = 0

      // endpoint origin dot
      const p1 = project(arc.lat1, arc.lon1)
      if (p1.z > 0) {
        const pulse = 0.6 + 0.4 * Math.sin(Date.now() * 0.003)
        ctx.beginPath(); ctx.arc(p1.x, p1.y, 4, 0, Math.PI*2)
        ctx.fillStyle = arc.color
        ctx.shadowColor = arc.color; ctx.shadowBlur = 10 * pulse
        ctx.fill(); ctx.shadowBlur = 0
      }

      // traveling dot
      const { lat: tl, lon: tlon, lift: tlift } = lerpLatLon(a, b, arc.t)
      const tl2 = tlon + spin
      const tx = cx + R * tlift * Math.cos(tl) * Math.sin(tl2)
      const ty = cy - R * tlift * Math.sin(tl)
      const tz = Math.cos(tl) * Math.cos(tl2)
      if (tz > 0) {
        ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI*2)
        ctx.fillStyle = '#fff'
        ctx.shadowColor = arc.color; ctx.shadowBlur = 18
        ctx.fill(); ctx.shadowBlur = 0
      }

      arc.t = (arc.t + arc.spd) % 1
    }

    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE)
      spin += 0.004

      // outer sphere circle
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6,200,200,.3)'
      ctx.lineWidth = 1.4
      ctx.setLineDash([])
      ctx.stroke()

      // latitude lines
      ;[-0.52, -0.26, 0, 0.26, 0.52].forEach((lat, i) => drawLatitude(lat, i !== 2))

      // meridians (4 evenly spaced)
      ;[0, Math.PI/4, Math.PI/2, 3*Math.PI/4].forEach(lon => drawMeridian(lon))

      // threat arcs
      threatArcs.forEach(drawThreatArc)

      // center glow dot
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003)
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#0070fd'
      ctx.shadowColor = '#0070fd'; ctx.shadowBlur = 20 + 12 * pulse
      ctx.fill(); ctx.shadowBlur = 0

      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
  )
}

/* ─── FEATURE 2 — SECURITY ────────────────────────────────── */
function ThreatFeed() {
  const samples = [
    ['#ff5c7a', 'C2 beacon', 'RU'], ['#ffb547', 'Phishing URL', 'CN'],
    ['#ff5c7a', 'Botnet node', 'IR'], ['#06c8c8', 'Reputation hit', 'BR'],
    ['#ffb547', 'Suspicious ASN', 'KP'], ['#ff5c7a', 'Ransomware C2', 'VN']
  ]
  const [items, setItems] = useState([
    { color: '#ff5c7a', label: 'C2 beacon', country: 'RU · 45.x.x.x', key: 0 },
    { color: '#ffb547', label: 'Phishing URL', country: 'CN · 118.x.x.x', key: 1 },
    { color: '#ff5c7a', label: 'Botnet node', country: 'IR · 184.x.x.x', key: 2 },
  ])
  useEffect(() => {
    let idx = 0
    const t = setInterval(() => {
      const s = samples[Math.floor(Math.random() * samples.length)]
      setItems(prev => {
        const next = [...prev]
        const pos = idx % 3
        next[pos] = { color: s[0], label: s[1], country: `${s[2]} · ${Math.floor(Math.random() * 254) + 1}.x.x.x`, key: Date.now() + pos }
        return next
      })
      idx++
    }, 1400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="viz" style={{ aspectRatio: '4 / 3.6' }}>
      <div className="viz-grid"></div>
      <div className="viz-head">
        <span className="vd" style={{ background: '#ff5f57' }}></span>
        <span className="vd" style={{ background: '#febc2e' }}></span>
        <span className="vd" style={{ background: '#28c840' }}></span>
        &nbsp;&nbsp;threat_intel.geo
      </div>
      {/* globe fills the left ~60% */}
      <div style={{ position: 'absolute', inset: 0, top: 40, display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '0 0 62%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatedGlobe />
        </div>
        {/* threat feed right side */}
        <div style={{ flex: 1, paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it) => (
            <div key={it.key} style={{
              background: 'rgba(11,18,36,.86)', border: '1px solid var(--line-d)',
              borderRadius: 12, padding: '10px 12px',
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
              color: 'var(--on-dark)',
              transition: 'opacity .4s, transform .4s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: it.color, boxShadow: `0 0 8px ${it.color}`,
                }} />
                <span style={{ fontWeight: 600, color: '#fff', fontSize: 11.5 }}>{it.label}</span>
              </div>
              <div style={{ color: 'var(--on-dark-3)', fontSize: 10.5, paddingLeft: 16 }}>{it.country}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureSecurity() {
  return (
    <section className="light section" id="security">
      <div className="wrap">
        <div className="feature flip">
          <div className="feat-copy reveal d2">
            <span className="eyebrow on-light"><span className="dot"></span> Security</span>
            <h3>Strengthen cyber defense with inline threat intelligence and IP reputation</h3>
            <p className="body">SechPoint enriches network traffic with IP reputation, URL intelligence, geo-location, and risk scoring to help detect phishing, ransomware, botnets, command-and-control activity, and suspicious infrastructure.</p>
            <ul className="feat-bullets">
              <li><span className="bi" style={{ background: 'rgba(255,92,122,.12)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#ff5c7a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Threat detection across IP, URL, and behavioral signals</li>
              <li><span className="bi" style={{ background: 'rgba(110,86,247,.12)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#6e56f7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Geo-spatial threat visibility and country-of-origin analysis</li>
              <li><span className="bi" style={{ background: 'rgba(0,85,255,.1)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0055ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Built for SOC, CERT, and national cyber monitoring</li>
            </ul>
            <a href="#" className="feat-link">Explore cyber intelligence <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
          <div className="feat-visual reveal"><ThreatFeed /></div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURE 3 — CONTROL ─────────────────────────────────── */
function FeatureControl() {
  const subs = [
    { av: 'A4', grad: 'linear-gradient(135deg,#0055ff,#06c8c8)', id: 'IMSI ·310-410-…2841', ap: 'Streaming · 48 Mbps', rate: 'FULL RATE', cls: 'ok' },
    { av: 'B1', grad: 'linear-gradient(135deg,#6e56f7,#0070fd)', id: 'IMSI ·310-260-…7193', ap: 'P2P · 120 Mbps', rate: 'SHAPED', cls: 'lim' },
    { av: 'C7', grad: 'linear-gradient(135deg,#06c8c8,#2bd17e)', id: 'IMSI ·310-150-…0042', ap: 'VoIP · priority', rate: 'QoE +', cls: 'ok' },
    { av: 'D2', grad: 'linear-gradient(135deg,#0070fd,#003399)', id: 'IMSI ·310-410-…9981', ap: 'Video · 36 Mbps', rate: 'FULL RATE', cls: 'ok' },
  ]
  return (
    <section className="light alt section">
      <div className="wrap">
        <div className="feature">
          <div className="feat-copy reveal">
            <span className="eyebrow on-light"><span className="dot"></span> Control</span>
            <h3>Improve subscriber experience with policy control, analytics, and smart care</h3>
            <p className="body">SechPoint helps operators map traffic to subscribers, apply rate limits and policy controls, monitor QoE, and create better service outcomes across devices, locations, and usage profiles.</p>
            <ul className="feat-bullets">
              <li><span className="bi" style={{ background: 'rgba(0,85,255,.1)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0055ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Subscriber mapping using IMSI, IMEI, and MSISDN data</li>
              <li><span className="bi" style={{ background: 'rgba(6,200,200,.12)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#06c8c8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Application-based rate limiting and traffic orchestration</li>
              <li><span className="bi" style={{ background: 'rgba(0,85,255,.1)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0055ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Profile-driven controls for compliance and service management</li>
            </ul>
            <a href="#" className="feat-link">See operator use cases <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
          <div className="feat-visual reveal d2">
            <div className="viz">
              <div className="viz-grid"></div>
              <div className="viz-head"><span className="vd" style={{ background: '#ff5f57' }}></span><span className="vd" style={{ background: '#febc2e' }}></span><span className="vd" style={{ background: '#28c840' }}></span>&nbsp;&nbsp;subscriber_policy.map</div>
              <div className="subs">
                {subs.map(s => (
                  <div className="sub-row" key={s.id}>
                    <span className="sub-av" style={{ background: s.grad }}>{s.av}</span>
                    <span className="sub-meta"><span className="id">{s.id}</span><span className="ap">{s.ap}</span></span>
                    <span className={`sub-rate ${s.cls}`}>{s.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PROOF BAND ──────────────────────────────────────────── */
function ProofBand() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 620 }}>
      {/* full-bleed photo */}
      <img
        src={analystImg}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: '72% center',
        }}
      />
      {/* dark overlay — heavy on right so text stays readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(4,8,20,.92) 0%, rgba(4,8,20,.82) 42%, rgba(4,8,20,.18) 100%)',
      }} />
      {/* subtle blue glow behind the quote */}
      <div style={{
        position: 'absolute', left: '-80px', top: '50%', transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,85,255,.28), transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="wrap reveal" style={{ position: 'relative', zIndex: 2, padding: '110px 32px' }}>
        <div style={{ maxWidth: 680 }}>
          {/* eyebrow */}
          <span className="eyebrow on-dark" style={{ marginBottom: 32, display: 'inline-flex' }}>
            <span className="dot"></span> Customer story
          </span>

          {/* opening mark */}
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 0,
            color: 'var(--cyan)', opacity: .5, height: 36, marginBottom: 28,
          }}>&ldquo;</div>

          {/* quote */}
          <p style={{
            fontSize: 'clamp(24px, 2.8vw, 36px)', color: '#fff', fontWeight: 600,
            lineHeight: 1.32, letterSpacing: '-.02em', fontFamily: 'var(--font-display)',
            textWrap: 'balance', margin: 0,
          }}>
            SechPoint gave us the visibility and control we needed across high-volume traffic,
            while strengthening our ability to{' '}
            <span style={{ color: 'var(--cyan)' }}>detect threats</span>, manage policy,
            and improve subscriber-level intelligence at scale.
          </p>

          {/* divider */}
          <div style={{ width: 48, height: 2, background: 'var(--grad)', margin: '32px 0 24px', borderRadius: 2 }} />

          {/* attribution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--grad)', display: 'grid', placeItems: 'center',
              flexShrink: 0, boxShadow: '0 0 20px rgba(0,85,255,.5)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }}>
                <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Name Surname</div>
              <div style={{ color: 'var(--on-dark-2)', fontSize: 13.5, marginTop: 2 }}>
                Head of Network Security &mdash; Tier-1 National Telecom Operator
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PLATFORM CARD ───────────────────────────────────────── */
function PlatformCard() {
  const nodeTransforms = [
    'translate(-50%,-50%) rotate(0deg) translateY(-150px) rotate(0deg)',
    'translate(-50%,-50%) rotate(60deg) translateY(-150px) rotate(-60deg)',
    'translate(-50%,-50%) rotate(120deg) translateY(-150px) rotate(-120deg)',
    'translate(-50%,-50%) rotate(180deg) translateY(-150px) rotate(-180deg)',
    'translate(-50%,-50%) rotate(240deg) translateY(-150px) rotate(-240deg)',
    'translate(-50%,-50%) rotate(300deg) translateY(-150px) rotate(-300deg)',
  ]
  const nodeIcons = [
    <svg key="n1" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.6"/><rect x="4" y="14" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.6"/></svg>,
    <svg key="n2" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
    <svg key="n3" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M6 19c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    <svg key="n4" viewBox="0 0 24 24" fill="none"><path d="M4 12h6l2-4 2 8 2-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="n5" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
    <svg key="n6" viewBox="0 0 24 24" fill="none"><path d="M6 9l6-4 6 4v6l-6 4-6-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  ]
  const caps = ['AIG Appliances', 'DPI Engine', 'Command Center', 'Subscriber Analytics', 'Threat Intelligence', 'Policy Control', 'Compliance Filtering']
  return (
    <section className="light section platform">
      <div className="wrap reveal">
        <div className="platform-card">
          <div className="pc-glow"></div>
          <div className="pc-grid"></div>
          <div className="pc-inner">
            <div className="pc-copy">
              <span className="eyebrow on-dark"><span className="dot"></span> Unified Platform</span>
              <h2>Implementing network intelligence at scale</h2>
              <p className="body">Explore how AIG hardware, Centralized Command Center, DPI analytics, and Aleria-driven intelligence work together across telecom and sovereign cyber environments.</p>
              <a href="#" className="btn btn-grad">Explore platform <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              <div className="pc-caps" style={{ marginTop: 30 }}>
                {caps.map(c => <span key={c} className="pc-cap">{c}</span>)}
              </div>
            </div>
            <div className="pc-visual">
              <style>{`
                @keyframes orbit-spin {
                  from { transform: translate(-50%, -50%) rotate(0deg); }
                  to   { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes node-counter {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(-360deg); }
                }
                .orbit-ring {
                  position: absolute;
                  left: 50%; top: 50%;
                  transform: translate(-50%, -50%);
                  animation: orbit-spin 18s linear infinite;
                  width: 100%; height: 100%;
                }
                .orbit-node-wrap {
                  position: absolute;
                  left: 50%; top: 50%;
                  width: 50px; height: 50px;
                  margin: -25px;
                }
                .orbit-node-icon {
                  width: 100%; height: 100%;
                  border-radius: 14px;
                  background: rgba(15,26,48,.95);
                  border: 1px solid var(--line-d);
                  display: grid; place-items: center;
                  box-shadow: 0 12px 30px -12px rgba(0,0,0,.6);
                  animation: node-counter 18s linear infinite;
                }
                .orbit-node-icon svg { width: 22px; height: 22px; stroke: var(--cyan); }
                .orbit-ring:hover { animation-play-state: paused; }
                .orbit-ring:hover .orbit-node-icon { animation-play-state: paused; }
              `}</style>
              <div className="pc-orbit">
                <div className="pc-ringline" style={{ width: '78%', height: '78%' }}></div>
                <div className="pc-ringline" style={{ width: '50%', height: '50%' }}></div>
                <div className="pc-core">
                  <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="7" stroke="#fff" strokeWidth="2"/><path d="M18 24h12M24 18v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                {/* rotating ring — all nodes orbit together */}
                <div className="orbit-ring">
                  {nodeTransforms.map((t, i) => (
                    <div key={i} className="orbit-node-wrap" style={{ transform: t.replace('translate(-50%,-50%) ', '') }}>
                      <div className="orbit-node-icon">{nodeIcons[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── COMPLIANCE ──────────────────────────────────────────── */
function Compliance() {
  const cards = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="8" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.8"/><circle cx="15" cy="16" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.8"/></svg>,
      title: 'Inline and out-of-path deployment',
      body: 'Flexible deployment models for different network environments and operational needs.', delay: 'd1'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      title: '24/7 support and SLA-driven response',
      body: 'Support-led implementation and response built for critical infrastructure teams.', delay: 'd2'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v10M12 13l-3-3M12 13l3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 16v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      title: 'Weekly signature updates',
      body: 'Updated intelligence to support ongoing cyber threat detection and policy control.', delay: 'd3'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg>,
      title: 'Role-based access and centralized reporting',
      body: 'Controlled visibility, reporting, and governance from a centralized platform.', delay: 'd4'
    },
  ]
  return (
    <section className="light alt section">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2>Security, control, and compliance <span className="grad-text">by design</span></h2>
          <p className="lead">SechPoint is built for environments that demand visibility, regulatory alignment, traffic control, cyber resilience, and operational continuity across large-scale networks.</p>
          <div style={{ marginTop: 26 }}><a href="#" className="btn btn-dark">Learn more</a></div>
        </div>
        <div className="trust-cards">
          {cards.map(c => (
            <div key={c.title} className={`tcard reveal ${c.delay}`}>
              <span className="tc-bar"></span>
              <div className="tc-ic">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL CTA ───────────────────────────────────────────── */
function FinalCta() {
  const canvasRef = useRef(null)
  useEffect(() => meshCanvas(canvasRef.current), [])
  return (
    <section className="final">
      <canvas ref={canvasRef} id="cta-mesh"></canvas>
      <div className="hero-glow f1"></div>
      <div className="hero-grid"></div>
      <div className="wrap reveal">
        <h2>More visibility. More control.<br/><span className="grad-text">More resilience.</span></h2>
        <p>See how SechPoint can help secure, optimize, and operationalize your network intelligence stack.</p>
        <div className="final-cta">
          <a href="#" className="btn btn-grad">Talk to sales <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          <a href="#" className="btn btn-ghost-d">Request a demo</a>
        </div>
        <div className="cta-people reveal d2">
          <div className="avatars">
            {[1,2,3,4].map(n => (
              <div key={n} style={{ width: 46, height: 46, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${n*60},70%,40%), hsl(${n*60+40},80%,55%))`, marginLeft: n === 1 ? 0 : -12, border: '3px solid var(--bg-1)', boxSizing: 'content-box', flexShrink: 0 }} />
            ))}
          </div>
          <span className="cta-people-text">Backed by a 24/7 support &amp; SOC team — <b>talk to a real engineer.</b></span>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="logo" href="#"><Logo /></a>
            <p className="footer-blurb">Sovereign network intelligence for telecoms, ISPs, and national cyber teams — DPI-powered visibility, defense, and control at national scale.</p>
          </div>
          <div className="footer-col"><h5>Platform</h5><a href="#">DPI Engine</a><a href="#">AIG Appliances</a><a href="#">Command Center</a><a href="#">Subscriber Analytics</a></div>
          <div className="footer-col"><h5>Solutions</h5><a href="#">Telecom &amp; ISP</a><a href="#">National Cyber</a><a href="#">SOC &amp; CERT</a><a href="#">Compliance</a></div>
          <div className="footer-col"><h5>Company</h5><a href="#">About</a><a href="#">Support</a><a href="#">Careers</a><a href="#">Contact</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SechPoint. All rights reserved.</span>
          <span className="mono">Built for high-throughput, encrypted, regulated networks.</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── REVEAL OBSERVER ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.16 })
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => io.observe(el))
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in')
      })
    })
    return () => io.disconnect()
  }, [])
}

/* ─── APP ─────────────────────────────────────────────────── */
export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <Hero />
      <Trust />
      <BroadValue />
      <FeatureVisibility />
      <FeatureSecurity />
      <FeatureControl />
      <ProofBand />
      <PlatformCard />
      <Compliance />
      <FinalCta />
      <Footer />
    </>
  )
}
