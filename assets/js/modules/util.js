/* =============================================================
   util.js — small shared helpers used across modules
   ============================================================= */

/** querySelector shorthand */
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
/** querySelectorAll -> array */
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Escape user/JSON text before injecting as HTML */
export function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Deterministic hash from a string (for stable gradient placeholders) */
export function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

/** Build a subtle brand-tinted gradient from a seed string */
export function gradientFrom(seed = "") {
  const h = hash(seed);
  const a = h % 360;
  const b = (a + 40 + (h % 60)) % 360;
  return `linear-gradient(135deg, hsl(${a} 70% 22% / 0.9), hsl(${b} 60% 12% / 0.95))`;
}

/**
 * Media block that shows the image if it exists, otherwise a branded
 * gradient placeholder with a label. Keeps the site looking premium
 * even before real assets are dropped in.
 */
export function mediaHTML(src, label, extraClass = "") {
  const grad = gradientFrom(label || src || "");
  const safeLabel = esc(label || "");
  const safeSrc = esc(src || "");
  return `
    <div class="card__media ${extraClass}" style="background:${grad}">
      <div class="ph">${safeLabel}</div>
      ${safeSrc ? `<img loading="lazy" decoding="async" alt="${safeLabel}" src="${safeSrc}"
        onload="this.style.opacity=1" style="opacity:0;transition:opacity .5s"
        onerror="this.remove()">` : ""}
    </div>`;
}

/** Fetch the CMS JSON. Works over http(s); local file:// needs a dev server. */
export async function loadData(path = "assets/data/portfolio.json") {
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.warn("[portfolio] Could not load data (run a local server for file://):", err);
    return null;
  }
}

/** Debounce */
export function debounce(fn, wait = 120) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/** Respect reduced-motion preference */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
