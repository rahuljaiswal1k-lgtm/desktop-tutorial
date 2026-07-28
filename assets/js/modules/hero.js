/* =============================================================
   hero.js — floating particles (canvas), mouse glow,
   and the cycling typing animation.
   ============================================================= */
import { $, prefersReducedMotion } from "./util.js";

/* ---------- Typing animation ---------- */
export function initTyping(words = []) {
  const el = $(".hero__typed");
  if (!el || !words.length) return;

  if (prefersReducedMotion()) { el.textContent = words[0]; return; }

  let wi = 0, ci = 0, deleting = false;
  const type = () => {
    const word = words[wi];
    ci += deleting ? -1 : 1;
    el.textContent = word.slice(0, ci);

    let delay = deleting ? 45 : 95;
    if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
    setTimeout(type, delay);
  };
  type();
}

/* ---------- Particles + mouse glow ---------- */
export function initHeroFX() {
  const hero = $(".hero");
  if (!hero) return;

  /* Mouse glow follows cursor within hero */
  const glow = $(".hero__glow", hero);
  if (glow && !prefersReducedMotion()) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.left = e.clientX - r.left + "px";
      glow.style.top = e.clientY - r.top + "px";
      glow.style.opacity = "0.5";
    });
    hero.addEventListener("mouseleave", () => (glow.style.opacity = "0.28"));
  }

  /* Floating particles on canvas */
  const canvas = $(".hero__particles", hero);
  if (!canvas || prefersReducedMotion()) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];

  const resize = () => {
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
    const count = Math.min(70, Math.floor((w * h) / 26000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));
  };
  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 196, 0, ${p.a})`;
      ctx.fill();
    }
    /* Link nearby particles */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255, 196, 0, ${0.06 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}
