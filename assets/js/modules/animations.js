/* =============================================================
   animations.js — handcrafted scroll effects:
   scroll-reveal, number counters, skill bars, 3D tilt,
   magnetic buttons, parallax, and skill-card cursor glow.
   ============================================================= */
import { $$, prefersReducedMotion } from "./util.js";

/* ---------- Scroll reveal ---------- */
export function initReveal() {
  const els = $$(".reveal");
  if (!els.length) return;
  if (prefersReducedMotion()) { els.forEach((e) => e.classList.add("in")); return; }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Number counters ---------- */
export function initCounters() {
  const nums = $$("[data-count]");
  if (!nums.length) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion()) { el.textContent = target + suffix; return; }
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Skill bars fill on view ---------- */
export function initSkillBars() {
  const bars = $$(".skill-card__bar span");
  if (!bars.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = (entry.target.dataset.level || 0) + "%";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach((b) => io.observe(b));
}

/* ---------- 3D tilt on cards ---------- */
export function initTilt() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const els = $$(".tilt");
  els.forEach((el) => {
    const strength = 10;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-6px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ---------- Skill card cursor glow (updates --mx/--my) ---------- */
export function initCardGlow() {
  if (prefersReducedMotion()) return;
  $$(".skill-card").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Magnetic buttons ---------- */
export function initMagnetic() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  $$(".magnetic").forEach((el) => {
    const strength = 0.35;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ---------- Parallax elements ([data-parallax] = speed) ---------- */
export function initParallax() {
  if (prefersReducedMotion()) return;
  const els = $$("[data-parallax]");
  if (!els.length) return;
  const onScroll = () => {
    const y = window.scrollY;
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Re-run interaction bindings after dynamic content renders */
export function bindDynamicFX() {
  initTilt();
  initMagnetic();
  initCounters();
  initSkillBars();
  initCardGlow();
}
