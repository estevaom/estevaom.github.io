// The Starry Night theme: a sky painted once with flow-field brushstrokes, a few hundred strokes
// that keep drifting along it, and the land (hills and cypress) that sinks as you scroll into the sky.
// Framework-free on purpose: startStarryNight() returns one stop() that tears all of it down.

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[(Math.random() * list.length) | 0];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const PALETTE = {
  deep: ["#0a1a4f", "#0f2462", "#132c73", "#0c1f58", "#182f7a"],
  mid: ["#1f4a9c", "#2757ad", "#2f64b8", "#1c4290", "#3a6fbe"],
  light: ["#6a9bd4", "#8bb3e0", "#adc9e8", "#cfdff0", "#5a88c6"],
  teal: ["#2f6f86", "#3f8190", "#4d8f8a"],
  gold: ["#f7d65a", "#f2c232", "#fbe39a", "#fff3c4", "#e9b420"],
  moon: ["#f5b82e", "#f7c948", "#f0a020", "#fbd774", "#e8901a"],
};

// Size a canvas to its CSS box, capping the pixel ratio: a painting doesn't need retina-sharp strokes.
function fit(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, W, H, dpr };
}

const isPortrait = () => matchMedia("(orientation: portrait), (max-width: 760px)").matches;

// What a canvas was last painted for. Mobile browsers nudge the height as the URL bar slides, so small
// height changes are ignored; a new width, a real height change or a portrait/landscape flip repaints.
const paintedFor = (canvas) => ({ w: canvas.clientWidth, h: canvas.clientHeight, portrait: isPortrait() });
const needsRepaint = (canvas, painted) =>
  canvas.clientWidth !== painted.w || Math.abs(canvas.clientHeight - painted.h) > 140 || isPortrait() !== painted.portrait;

// ---------------------------------------------------------------- the sky

// Where things sit, as fractions of the viewport. Radii scale with the short side.
// `calm` is the patch of sky behind the text: same strokes, lower contrast, no stars.
function layout(W, H) {
  const S = Math.min(W, H), portrait = isPortrait();
  const at = (u, v) => ({ x: u * W, y: v * H });
  const stars = (portrait ? [
    [0.2, 0.07, 0.02], [0.56, 0.09, 0.02], [0.95, 0.2, 0.022], [0.93, 0.42, 0.026],
    [0.45, 0.7, 0.024],
  ] : [
    [0.21, 0.055, 0.02], [0.31, 0.065, 0.022], [0.45, 0.07, 0.024], [0.61, 0.13, 0.028],
    [0.76, 0.28, 0.03], [0.95, 0.37, 0.026], [0.68, 0.63, 0.024], [0.84, 0.57, 0.032],
    [0.96, 0.67, 0.022],
  ]).map(([u, v, r]) => ({ ...at(u, v), R: r * S, phase: rand(0, TAU), speed: rand(0.6, 1.4) }));
  const moon = { ...at(portrait ? 0.8 : 0.88, portrait ? 0.6 : 0.15), R: (portrait ? 0.07 : 0.062) * S };
  // The shadow disc sits up and to the left; the lit crescent's middle is the opposite way
  moon.shadow = { x: -0.42 * moon.R, y: -0.22 * moon.R };
  moon.lit = { x: moon.x + 0.49 * moon.R, y: moon.y + 0.26 * moon.R };
  const swirls = portrait ? [
    { ...at(0.52, 0.64), r: 0.42 * S, k: 2.2, dir: 1, inward: 0.25 },
    { ...at(0.25, 0.38), r: 0.22 * S, k: 1.4, dir: -1, inward: 0.2 },
  ] : [
    { ...at(0.64, 0.44), r: 0.3 * S, k: 2.4, dir: 1, inward: 0.25 }, // the great whirl
    { ...at(0.47, 0.3), r: 0.16 * S, k: 1.8, dir: -1, inward: 0.2 }, // its counter-curl
    { ...at(0.9, 0.5), r: 0.12 * S, k: 1.0, dir: 1, inward: 0.15 },
  ];
  const calm = portrait
    ? { x: 0.45 * W, y: 0.34 * H, rx: 0.75 * W, ry: 0.3 * H, depth: 0.5 }
    : { x: 0.37 * W, y: 0.4 * H, rx: 0.27 * W, ry: 0.34 * H, depth: 0.75 };
  return { W, H, S, stars, moon, swirls, calm };
}

// How deep inside the calm patch (x, y) is, 0..depth
function calmAt(L, x, y) {
  const c = L.calm, dx = (x - c.x) / c.rx, dy = (y - c.y) / c.ry;
  return c.depth * Math.exp(-(dx * dx + dy * dy) * 1.6);
}

// The flow field: a rolling left-to-right wind, bent into vortices by the whirl, the stars and the moon.
// Returns the stroke angle at (x, y); t drifts the wind slowly so the sky breathes.
function makeField(L) {
  const vortices = [
    ...L.swirls,
    ...L.stars.map((s) => ({ x: s.x, y: s.y, r: s.R * 2.6, k: 3.2, dir: 1, inward: 0 })),
    { x: L.moon.x, y: L.moon.y, r: L.moon.R * 2.6, k: 3.2, dir: -1, inward: 0 },
  ];
  return (x, y, t) => {
    const a = Math.sin(y * 0.0075 + x * 0.0021 + t * 0.07) * 0.45 + Math.sin(x * 0.0043 - y * 0.0031 - t * 0.05) * 0.3;
    let vx = Math.cos(a), vy = Math.sin(a);
    for (let i = 0; i < vortices.length; i++) {
      const v = vortices[i];
      const dx = x - v.x, dy = y - v.y;
      const q = (dx * dx + dy * dy) / (v.r * v.r);
      if (q > 9) continue;
      const d = Math.sqrt(dx * dx + dy * dy) + 1e-3;
      const f = v.k * 2.33 * Math.sqrt(q) * Math.exp(-q); // zero at the eye, strongest at r/√2
      vx += f * ((-dy / d) * v.dir - (dx / d) * v.inward);
      vy += f * ((dx / d) * v.dir - (dy / d) * v.inward);
    }
    return Math.atan2(vy, vx);
  };
}

// How much star or moon light reaches (x, y), 0..1
function glowAt(L, x, y) {
  let g = 0;
  for (const s of L.stars) {
    const dx = x - s.x, dy = y - s.y;
    g = Math.max(g, Math.exp(-(dx * dx + dy * dy) / (s.R * s.R * 7)));
  }
  const dx = x - L.moon.x, dy = y - L.moon.y;
  return Math.max(g, Math.exp(-(dx * dx + dy * dy) / (L.moon.R * L.moon.R * 5)));
}

// How strongly (x, y) sits on a bright arm of a whirl, 0..1
function bandAt(L, x, y) {
  let b = 0;
  for (const w of L.swirls) {
    const dx = x - w.x, dy = y - w.y, d = Math.hypot(dx, dy);
    if (d > w.r * 1.3) continue;
    const phase = (d / w.r) * 9 - Math.atan2(dy, dx) * w.dir;
    const envelope = Math.exp(-((d / w.r - 0.6) ** 2) / 0.18);
    b = Math.max(b, (0.5 + 0.5 * Math.sin(phase)) * envelope);
  }
  return b;
}

function skyColor(L, x, y, pass) {
  const glow = glowAt(L, x, y), band = bandAt(L, x, y), r = Math.random();
  if (pass === "under") return glow > 0.5 ? pick(PALETTE.mid) : pick(PALETTE.deep);
  const calm = calmAt(L, x, y);
  if (calm > 0.05 && Math.random() < calm) return Math.random() < 0.7 ? pick(PALETTE.deep) : pick(PALETTE.mid);
  if (glow > 0.3 && r < glow) return pick(PALETTE.gold);
  if (band > 0.5 && r < band) return pick(PALETTE.light);
  if (pass === "accent") return r < 0.15 ? pick(PALETTE.teal) : r < 0.6 ? pick(PALETTE.light) : pick(PALETTE.mid);
  return r < 0.08 ? pick(PALETTE.teal) : r < 0.7 ? pick(PALETTE.mid) : pick(PALETTE.deep);
}

// One brushstroke that bends along the field
function brush(ctx, field, x, y, len, width, color, alpha) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(x, y);
  const seg = len / 3;
  for (let i = 0; i < 3; i++) {
    const a = field(x, y, 0);
    x += Math.cos(a) * seg;
    y += Math.sin(a) * seg;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Short arcs laid around a circle: how Van Gogh paints halos
function ring(ctx, cx, cy, r, colors, width, alpha) {
  const n = Math.max(8, Math.round((TAU * r) / 9));
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU + rand(-0.05, 0.05);
    ctx.strokeStyle = pick(colors);
    ctx.lineWidth = width * rand(0.8, 1.2);
    ctx.globalAlpha = alpha * rand(0.75, 1);
    ctx.beginPath();
    ctx.arc(cx, cy, r + rand(-1.5, 1.5), a0, a0 + (rand(0.6, 1.1) * TAU) / n);
    ctx.stroke();
  }
}

function paintStar(ctx, s) {
  const R = s.R;
  const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, R * 3);
  g.addColorStop(0, "rgba(255,240,190,0.55)");
  g.addColorStop(0.35, "rgba(240,210,120,0.18)");
  g.addColorStop(1, "rgba(240,210,120,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(s.x, s.y, R * 3, 0, TAU);
  ctx.fill();
  ring(ctx, s.x, s.y, R * 2.4, PALETTE.light, 2.5, 0.55);
  ring(ctx, s.x, s.y, R * 1.95, PALETTE.gold, 3, 0.8);
  ring(ctx, s.x, s.y, R * 1.55, ["#fbe7a8", "#f4f0da", "#cfe0f0"], 3, 0.9);
  ring(ctx, s.x, s.y, R * 1.15, PALETTE.gold, 3.5, 0.95);
  ring(ctx, s.x, s.y, R * 0.8, ["#fff6d8", "#fdeeb0", "#ffffff"], 3.5, 1);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fff8e2";
  ctx.beginPath();
  ctx.arc(s.x, s.y, R * 0.55, 0, TAU);
  ctx.fill();
}

// The crescent is painted on its own small canvas, then the shadow disc is cut out of it
function paintMoon(ctx, m, dpr) {
  const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.R * 3.4);
  g.addColorStop(0, "rgba(255,205,100,0.55)");
  g.addColorStop(0.4, "rgba(245,180,60,0.16)");
  g.addColorStop(1, "rgba(245,180,60,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(m.x, m.y, m.R * 3.4, 0, TAU);
  ctx.fill();
  ring(ctx, m.x, m.y, m.R * 2.6, PALETTE.light, 2.5, 0.45);
  ring(ctx, m.x, m.y, m.R * 2.15, PALETTE.moon, 3.5, 0.75);
  ring(ctx, m.x, m.y, m.R * 1.7, PALETTE.gold, 3.5, 0.85);
  ring(ctx, m.x, m.y, m.R * 1.3, ["#fbe39a", "#f7d65a", "#fff3c4"], 3.5, 0.9);

  // The unlit part of the disc is night sky, painted over the halo so no glow shows through it
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#0f2466";
  ctx.beginPath();
  ctx.arc(m.x, m.y, m.R * 1.04, 0, TAU);
  ctx.fill();
  ctx.save();
  ctx.clip();
  for (let r = m.R * 1.04; r > 2; r -= 3.4) ring(ctx, m.x, m.y, r, [...PALETTE.deep, ...PALETTE.mid.slice(0, 2)], 3.6, 1);
  ctx.restore();

  const size = Math.ceil(m.R * 2 + 8);
  const c = document.createElement("canvas");
  c.width = c.height = Math.ceil(size * dpr);
  const o = c.getContext("2d");
  o.setTransform(dpr, 0, 0, dpr, 0, 0);
  o.lineCap = "round";
  const cx = size / 2, cy = size / 2;
  o.fillStyle = "#f3b233";
  o.beginPath();
  o.arc(cx, cy, m.R, 0, TAU);
  o.fill();
  o.save();
  o.clip();
  for (let r = m.R; r > 2; r -= 3.2) ring(o, cx, cy, r, PALETTE.moon, 3.6, 1);
  o.restore();
  o.globalCompositeOperation = "destination-out";
  o.globalAlpha = 1;
  o.beginPath();
  o.arc(cx + m.shadow.x, cy + m.shadow.y, m.R * 0.86, 0, TAU);
  o.fill();
  ctx.globalAlpha = 1;
  ctx.drawImage(c, m.x - size / 2, m.y - size / 2, size, size);
}

function paintSky(ctx, L, field, dpr) {
  const { W, H } = L;
  const wash = ctx.createLinearGradient(0, 0, 0, H);
  wash.addColorStop(0, "#0a1a4f");
  wash.addColorStop(0.55, "#16307a");
  wash.addColorStop(1, "#23488f");
  ctx.globalAlpha = 1;
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, W, H);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // Three passes, like underpainting: broad dark strokes, the body of the sky, then light accents
  const passes = [
    ["under", 900, 6, 10, 18, 34, 0.9],
    ["body", 420, 3.5, 6, 12, 26, 0.95],
    ["accent", 1400, 2.5, 4.5, 10, 20, 0.9],
  ];
  for (const [pass, density, w0, w1, l0, l1, alpha] of passes) {
    const n = Math.round((W * H) / density);
    for (let i = 0; i < n; i++) {
      const x = rand(-20, W + 20), y = rand(-20, H + 20);
      brush(ctx, field, x, y, rand(l0, l1), rand(w0, w1), skyColor(L, x, y, pass), alpha * rand(0.8, 1));
    }
  }
  for (const s of L.stars) paintStar(ctx, s);
  paintMoon(ctx, L.moon, dpr);
}

// A soft light to pulse over a star (white-hot core) or the moon (warm, no core)
function makeGlowSprite(stops) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (const [at, color] of stops) gr.addColorStop(at, color);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  return c;
}

// Paints the still sky once, then animates a few hundred strokes that drift along the same field.
// Returns stop(): the only thing a theme switch has to call.
function startSky(canvas, hudEl) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const starGlow = makeGlowSprite([[0, "rgba(255,250,225,1)"], [0.18, "rgba(255,236,170,0.55)"], [0.5, "rgba(245,205,110,0.12)"], [1, "rgba(245,205,110,0)"]]);
  const moonGlow = makeGlowSprite([[0, "rgba(255,200,95,0.7)"], [0.3, "rgba(245,175,60,0.28)"], [0.65, "rgba(240,160,50,0.06)"], [1, "rgba(240,160,50,0)"]]);
  let ctx, W, H, dpr, L, field, base, particles = [];
  let raf = 0, last = 0, comet = null, nextComet = 0, resizeTimer = 0, painted = null;
  let fps = 0, frameMs = 0, paintMs = 0;

  function spawn(p) {
    p.x = rand(-20, W + 20);
    p.y = rand(-20, H + 20);
    p.age = 0;
    p.life = rand(90, 260);
    p.speed = rand(0.35, 1.0) * clamp(L.S / 900 + 0.4, 0.8, 1.6);
    p.len = rand(10, 24);
    p.w = rand(2.2, 4.2);
    p.alpha = rand(0.55, 0.9) * (1 - 0.8 * calmAt(L, p.x, p.y));
    const glowHere = glowAt(L, p.x, p.y), r = Math.random();
    p.col = glowHere > 0.3 && r < glowHere ? pick(PALETTE.gold) : r < 0.6 ? pick(PALETTE.light) : r < 0.85 ? pick(PALETTE.mid) : "#e9eef3";
  }

  function build() {
    const t0 = performance.now();
    ({ ctx, W, H, dpr } = fit(canvas));
    painted = paintedFor(canvas);
    L = layout(W, H);
    field = makeField(L);
    base = document.createElement("canvas");
    base.width = canvas.width;
    base.height = canvas.height;
    const b = base.getContext("2d");
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintSky(b, L, field, dpr);
    particles = Array.from({ length: Math.round((W * H) / 1800) }, () => {
      const p = {};
      spawn(p);
      p.age = rand(0, p.life);
      return p;
    });
    paintMs = performance.now() - t0;
  }

  function drawComet(t) {
    if (!nextComet) nextComet = t + 4;
    if (!comet) {
      if (t > nextComet) comet = { t0: t, x: rand(W * 0.35, W * 0.95), y: rand(-20, H * 0.25), ang: rand(2.4, 2.75), dist: Math.max(W, H) * 1.1 };
      return;
    }
    const k = (t - comet.t0) / 1.2;
    if (k >= 1) {
      comet = null;
      nextComet = t + rand(10, 22);
      return;
    }
    const hx = comet.x + Math.cos(comet.ang) * comet.dist * k, hy = comet.y + Math.sin(comet.ang) * comet.dist * k;
    const tx = hx - Math.cos(comet.ang) * 170, ty = hy - Math.sin(comet.ang) * 170;
    const g = ctx.createLinearGradient(hx, hy, tx, ty);
    g.addColorStop(0, "rgba(255,248,220,0.95)");
    g.addColorStop(0.3, "rgba(255,226,140,0.5)");
    g.addColorStop(1, "rgba(255,226,140,0)");
    ctx.globalAlpha = Math.sin(Math.PI * k);
    ctx.strokeStyle = g;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
  }

  function draw(t, dt) {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(base, 0, 0, W, H);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const p of particles) {
      const a = field(p.x, p.y, t), ca = Math.cos(a), sa = Math.sin(a);
      p.x += ca * p.speed * dt;
      p.y += sa * p.speed * dt;
      p.age += dt;
      if (p.age >= p.life || p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) {
        spawn(p);
        continue;
      }
      const ddx = p.x - L.moon.x, ddy = p.y - L.moon.y;
      if (ddx * ddx + ddy * ddy < L.moon.R * L.moon.R * 1.3) continue;
      const half = p.len / 2, mx = p.x - ca * half, my = p.y - sa * half;
      const a1 = field(mx, my, t);
      ctx.globalAlpha = Math.sin((Math.PI * p.age) / p.life) * p.alpha;
      ctx.strokeStyle = p.col;
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mx, my);
      ctx.lineTo(mx - Math.cos(a1) * half, my - Math.sin(a1) * half);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "lighter";
    for (const s of L.stars) {
      const r = s.R * 3.2;
      ctx.globalAlpha = 0.28 + 0.22 * Math.sin(t * s.speed * 1.7 + s.phase);
      ctx.drawImage(starGlow, s.x - r, s.y - r, r * 2, r * 2);
    }
    const m = L.moon, mr = m.R * 1.9;
    ctx.globalAlpha = 0.3 + 0.08 * Math.sin(t * 0.6);
    ctx.drawImage(moonGlow, m.lit.x - mr, m.lit.y - mr, mr * 2, mr * 2);
    if (!reduce) drawComet(t);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 16.67, 3) : 1;
    if (last) fps = fps * 0.9 + (1000 / (now - last)) * 0.1;
    last = now;
    const t0 = performance.now();
    draw(now / 1000, dt);
    frameMs = frameMs * 0.9 + (performance.now() - t0) * 0.1;
    if (hudEl) hudEl.textContent = `${fps.toFixed(0)} fps  ${frameMs.toFixed(2)} ms/frame\n${particles.length} live strokes\nsky painted in ${paintMs.toFixed(0)} ms`;
  }

  function run() {
    if (reduce) {
      draw(0, 0);
      return;
    }
    if (!raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }

  function pause() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const onVisibility = () => (document.hidden ? pause() : run());
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (needsRepaint(canvas, painted)) {
        build();
        if (reduce) draw(0, 0);
      }
    }, 180);
  };

  build();
  run();
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);

  return function stop() {
    pause();
    clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };
}

// ---------------------------------------------------------- the foreground

// A band of land: filled, then stroked along its own contour until the fill barely shows
function paintBand(ctx, W, H, top, bottom, fill, colors, u) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(0, H + 2);
  for (let x = 0; x <= W + 8; x += 8) ctx.lineTo(x, top(x));
  ctx.lineTo(W, H + 2);
  ctx.closePath();
  ctx.fill();
  let thickness = 0;
  for (let x = 0; x <= W; x += W / 20) thickness += ((bottom ? bottom(x) : H) - top(x)) / 21;
  const n = Math.round((W * thickness) / (70 * u * u));
  for (let i = 0; i < n; i++) {
    const x = rand(-10, W + 10), y0 = top(x), y1 = bottom ? bottom(x) : H;
    const y = rand(y0 + 2 * u, Math.max(y0 + 4 * u, y1 + 4 * u));
    const slope = Math.atan2(top(x + 6) - top(x - 6), 12) * (1 - (y - y0) / Math.max(1, y1 - y0) * 0.5) + rand(-0.12, 0.12);
    const len = rand(14, 32) * u;
    ctx.strokeStyle = pick(colors);
    ctx.lineWidth = rand(2.5, 5) * u;
    ctx.globalAlpha = rand(0.7, 1);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + (Math.cos(slope) * len) / 2, y + (Math.sin(slope) * len) / 2 - 2 * u, x + Math.cos(slope) * len, y + Math.sin(slope) * len);
    ctx.stroke();
  }
}

// The cypress: a dark flame. Each side has its own rhythm, and strokes run past the
// silhouette so the edge licks upward instead of looking turned on a lathe.
function cypress(ctx, cx, baseY, topY, maxW) {
  const height = baseY - topY, s = maxW / 150;
  const taper = (t) => (maxW / 2) * Math.pow(1 - t, 0.6);
  const left = (t) => taper(t) * (0.7 + 0.3 * Math.sin(t * 19 + 0.3) + 0.08 * Math.sin(t * 53));
  const right = (t) => taper(t) * (0.7 + 0.3 * Math.sin(t * 23 + 2.1) + 0.08 * Math.sin(t * 47 + 1));
  const spine = (t) => cx + Math.sin(t * 4.2 + 0.4) * maxW * 0.12 + Math.sin(t * 11) * maxW * 0.04;
  const yAt = (t) => baseY - t * height;
  ctx.beginPath();
  for (let i = 0; i <= 120; i++) ctx.lineTo(spine(i / 120) - left(i / 120), yAt(i / 120));
  for (let i = 120; i >= 0; i--) ctx.lineTo(spine(i / 120) + right(i / 120), yAt(i / 120));
  ctx.closePath();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#0b1510";
  ctx.fill();
  const body = ["#0f1f15", "#152a1a", "#1b3520", "#223f24", "#2d4a2a", "#3b5a30", "#1a2a3a"];
  const n = Math.round((maxW * height) / 70);
  for (let i = 0; i < n; i++) {
    const t = Math.random();
    if (Math.random() > taper(t) / (maxW / 2)) continue; // keep density even as the tree narrows
    const off = rand(-1, 1), x = spine(t) + off * (off < 0 ? left(t) : right(t)), y = yAt(t);
    const ang = -Math.PI / 2 - off * 0.35 + rand(-0.3, 0.3);
    const len = rand(16, 40) * s, bend = len * rand(0.15, 0.35) * (Math.random() < 0.5 ? -1 : 1);
    const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len;
    ctx.strokeStyle = Math.random() < 0.04 ? "#5a4a26" : pick(body);
    ctx.lineWidth = rand(3, 7) * s;
    ctx.globalAlpha = rand(0.75, 1);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo((x + ex) / 2 + Math.sin(ang) * bend, (y + ey) / 2 - Math.cos(ang) * bend, ex, ey);
    ctx.stroke();
  }
  // Flame licks along both edges
  for (const side of [-1, 1]) {
    for (let t = 0.02; t < 0.97; t += rand(0.012, 0.024)) {
      const w = side < 0 ? left(t) : right(t), x = spine(t) + side * w * rand(0.85, 1.05), y = yAt(t);
      const len = rand(20, 44) * s * (1 - t * 0.5);
      ctx.strokeStyle = pick(["#08110b", "#0b1812", "#10201a"]);
      ctx.lineWidth = rand(3, 6) * s;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + side * len * 0.35, y - len * 0.45, x + side * len * 0.1, y - len);
      ctx.stroke();
    }
  }
}

function paintLand(canvas) {
  const { ctx, W, H } = fit(canvas);
  const portrait = isPortrait();
  const u = clamp(W / 1440, 0.62, 1.25);
  ctx.clearRect(0, 0, W, H);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const horizon = H * (portrait ? 0.76 : 0.74);
  const hills = (x) => horizon - (x / W) * H * 0.05 + Math.sin((x / W) * Math.PI * 1.3 + 0.6) * H * 0.028 + Math.sin((x / W) * Math.PI * 4.3) * H * 0.01;
  const ground = (x) => hills(x) + H * (portrait ? 0.07 : 0.1) + Math.sin((x / W) * Math.PI * 2.2) * H * 0.012;
  const front = (x) => ground(x) + H * (portrait ? 0.08 : 0.1) + Math.sin((x / W) * Math.PI * 1.7 + 1) * H * 0.015;
  paintBand(ctx, W, H, hills, ground, "#1a326f", ["#27488f", "#325a9f", "#1f3c80", "#4468a8", "#2c4f91", "#1c3778"], u);
  paintBand(ctx, W, H, ground, front, "#101d49", ["#172a5e", "#1b3266", "#213a5c", "#152652", "#24406e"], u);
  paintBand(ctx, W, H, front, null, "#0a1433", ["#0f2232", "#122740", "#182c2a", "#0c1a2c", "#1a2f3a"], u);
  const maxW = portrait ? clamp(W * 0.2, 56, 110) : clamp(W * 0.105, 90, 200);
  cypress(ctx, W * (portrait ? 0.12 : 0.075), H + 10, H * (portrait ? 0.56 : 0.1), maxW);
}

// The land sinks as you scroll up into the sky, and rises again as you reach the end of the page.
// Only a transform changes, so scrolling never repaints the canvas.
function startLand(canvas) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let painted = null, queued = false;
  const place = () => {
    queued = false;
    const vh = window.innerHeight, y = window.scrollY;
    const rest = document.documentElement.scrollHeight - vh - y;
    // Reduced motion: no parallax, the land simply scrolls with the page at both ends
    const off = reduce
      ? (y <= rest ? -Math.min(y, vh) : Math.min(rest, vh))
      : Math.min(Math.min(y, rest) * 0.6, vh);
    canvas.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(place);
    }
  };
  const onResize = () => {
    if (!painted || needsRepaint(canvas, painted)) {
      painted = paintedFor(canvas);
      paintLand(canvas);
    }
    place();
  };
  onResize();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  return function stop() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}

// Starts both layers. `hud` is an optional element for the frame-rate readout (?hud in the URL).
/** @param {{ sky: HTMLCanvasElement, land: HTMLCanvasElement, hud?: HTMLElement | null }} layers */
export function startStarryNight({ sky, land, hud = null }) {
  const stopSky = startSky(sky, hud);
  const stopLand = startLand(land);
  return function stop() {
    stopSky();
    stopLand();
    land.style.transform = "";
  };
}
