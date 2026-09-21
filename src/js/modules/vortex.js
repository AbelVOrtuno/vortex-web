/**
 * vortex.js
 * Realistic spiral-arm vortex (accretion-disk style) rendered on a
 * <canvas>. Tuned for performance: capped pixel ratio, no shadowBlur,
 * cached gradients, and fewer strands on touch/low-power devices.
 */

export function initVortex(canvasId = 'vortex-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, coreR, maxR, DPR;
  let mouseX = 0, mouseY = 0;
  let time = 0;
  let coreGrad, rimGrad, vignetteGrad;

  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const isSmall = window.innerWidth < 900;
  const LOW_POWER = isTouch || isSmall;

  // Small ambient star field behind the vortex
  const stars = [];
  function buildStars() {
    stars.length = 0;
    const n = LOW_POWER ? 35 : 90;
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.2
      });
    }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, LOW_POWER ? 1 : 1.5);
    W = canvas.width = canvas.offsetWidth * DPR;
    H = canvas.height = canvas.offsetHeight * DPR;
    cx = W * 0.68; cy = H * 0.5;
    coreR = Math.min(W, H) * 0.075;
    maxR = Math.max(W, H) * 0.82; // bigger, fills most of the hero
    buildStars();

    // Cache gradients here instead of rebuilding every frame (expensive).
    rimGrad = ctx.createRadialGradient(cx, cy, coreR * 0.7, cx, cy, coreR * 1.5);
    rimGrad.addColorStop(0, 'rgba(255,255,255,0)');
    rimGrad.addColorStop(0.6, 'rgba(255,255,255,0.10)');
    rimGrad.addColorStop(1, 'rgba(255,255,255,0)');

    coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, 'rgba(0,0,0,1)');
    coreGrad.addColorStop(0.85, 'rgba(0,0,0,1)');
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    vignetteGrad = ctx.createRadialGradient(cx, cy, maxR * 0.35, cx, cy, maxR * 1.05);
    vignetteGrad.addColorStop(0, 'rgba(7,7,11,0)');
    vignetteGrad.addColorStop(1, 'rgba(7,7,11,0.9)');
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 26;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 26;
  });

  // Cyclic palette: red -> magenta -> violet -> blue -> back to red
  const stops = [
    [239, 68, 68],
    [230, 41, 122],
    [139, 92, 246],
    [59, 130, 246],
    [239, 68, 68]
  ];
  function paletteColor(t) {
    t = ((t % 1) + 1) % 1;
    const seg = t * (stops.length - 1);
    const i = Math.floor(seg);
    const f = seg - i;
    const a = stops[i], b = stops[Math.min(i + 1, stops.length - 1)];
    const r = Math.round(a[0] + (b[0] - a[0]) * f);
    const g = Math.round(a[1] + (b[1] - a[1]) * f);
    const bl = Math.round(a[2] + (b[2] - a[2]) * f);
    return [r, g, bl];
  }
  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

  const ARMS = LOW_POWER ? 4 : 5;
  const STRANDS_PER_ARM = LOW_POWER ? 2 : 3;
  const strands = [];
  for (let a = 0; a < ARMS; a++) {
    for (let s = 0; s < STRANDS_PER_ARM; s++) {
      strands.push({
        baseAngle: (Math.PI * 2 / ARMS) * a + s * 0.09,
        colorT: a / ARMS + s * 0.02,
        wobbleFreq: 2.5 + Math.random() * 2.5,
        wobbleAmp: 0.06 + Math.random() * 0.10,
        wobblePhase: Math.random() * Math.PI * 2,
        widthMul: 0.6 + Math.random() * 0.8
      });
    }
  }

  const STEPS = LOW_POWER ? 40 : 70;
  const CHUNK = LOW_POWER ? 3 : 5;

  function drawStrand(strand) {
    const pointsPerChunk = STEPS / CHUNK;
    const pts = [];

    for (let i = 0; i <= STEPS; i++) {
      const tt = i / STEPS; // 0 near core -> 1 at outer edge
      const r = coreR + (maxR - coreR) * Math.pow(tt, 0.92);
      // logarithmic spiral winding
      const wind = 3.1 * Math.log(r / coreR);
      // differential rotation: inner sections sweep faster (Keplerian feel)
      const diffRotation = (1.4 / Math.sqrt(tt + 0.06)) * (time * 0.12);
      // organic wobble so arms look like turbulent filaments, not perfect curves
      const wobble = Math.sin(tt * strand.wobbleFreq * Math.PI + strand.wobblePhase + time * 0.4) * strand.wobbleAmp * (1 - tt * 0.6);
      const theta = strand.baseAngle + wind + diffRotation + wobble;

      const squash = 0.82; // slight ellipse for perspective
      const x = cx + Math.cos(theta) * r + mouseX * DPR * tt;
      const y = cy + Math.sin(theta) * r * squash + mouseY * DPR * tt;
      pts.push({ x, y, tt });
    }

    // Cheap glow: one soft wide pass + one crisp bright pass, no shadowBlur
    // (that's the expensive part on tablets/GPUs).
    for (let c = 0; c < CHUNK; c++) {
      const start = Math.floor(c * pointsPerChunk);
      const end = Math.min(STEPS, Math.floor((c + 1) * pointsPerChunk) + 1);
      const midT = (pts[start].tt + pts[end - 1].tt) / 2;
      const color = paletteColor(strand.colorT + midT * 0.35);
      const baseWidth = (0.8 + midT * 3.4) * strand.widthMul * DPR;
      const alpha = 0.16 + midT * 0.55;

      ctx.beginPath();
      ctx.moveTo(pts[start].x, pts[start].y);
      for (let i = start + 1; i < end; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (!LOW_POWER) {
        ctx.strokeStyle = rgba(color, alpha * 0.35);
        ctx.lineWidth = baseWidth * 2.4;
        ctx.stroke();
      }
      ctx.strokeStyle = rgba(color, alpha);
      ctx.lineWidth = baseWidth;
      ctx.stroke();
    }
  }

  const FRAME_INTERVAL = LOW_POWER ? 1000 / 30 : 0; // cap to 30fps on touch/small screens
  let lastFrame = 0;

  function draw(now) {
    requestAnimationFrame(draw);
    if (FRAME_INTERVAL && now - lastFrame < FRAME_INTERVAL) return;
    lastFrame = now;

    time += 0.016;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // background stars
    stars.forEach(s => {
      const tw = 0.4 + Math.abs(Math.sin(time * s.speed + s.phase)) * 0.6;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r * DPR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.25 * tw})`;
      ctx.fill();
    });

    strands.forEach(drawStrand);

    ctx.globalCompositeOperation = 'source-over';

    // event horizon rim + solid core + vignette, all pre-built in resize()
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = vignetteGrad;
    ctx.fillRect(0, 0, W, H);
  }

  requestAnimationFrame(draw);
}
