export function meshCanvas(canvas) {
  if (!canvas) return () => {}
  const ctx = canvas.getContext('2d')
  let w, h, dpr, nodes = [], raf
  const COUNT = () => Math.min(64, Math.round((w * h) / 24000))
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = canvas.offsetWidth; h = canvas.offsetHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const n = COUNT()
    nodes = []
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
        c: Math.random() > 0.5 ? '6,200,200' : '64,140,255'
      })
    }
  }
  function frame() {
    ctx.clearRect(0, 0, w, h)
    const LINK = 132
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i]
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      for (let j = i + 1; j < nodes.length; j++) {
        const q = nodes[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy)
        if (d < LINK) {
          const a = (1 - d / LINK) * 0.32
          ctx.strokeStyle = `rgba(${p.c},${a})`
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
        }
      }
    }
    for (const p of nodes) {
      ctx.fillStyle = `rgba(${p.c},.9)`
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill()
    }
    raf = requestAnimationFrame(frame)
  }
  resize()
  window.addEventListener('resize', resize)
  frame()
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
}
