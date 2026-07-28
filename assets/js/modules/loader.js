/* =============================================================
   loader.js — premium loading screen with progress
   ============================================================= */
import { $, prefersReducedMotion } from "./util.js";

export function initLoader() {
  const loader = $(".loader");
  if (!loader) return;
  const bar = $(".loader__bar span", loader);
  const pct = $(".loader__pct", loader);

  const finish = () => {
    loader.classList.add("done");
    document.body.style.overflow = "";
    window.setTimeout(() => loader.remove(), 700);
  };

  if (prefersReducedMotion()) { finish(); return; }

  document.body.style.overflow = "hidden";
  let p = 0;
  const tick = () => {
    p += Math.random() * 18 + 6;
    if (p >= 100) p = 100;
    if (bar) bar.style.width = p + "%";
    if (pct) pct.textContent = Math.floor(p) + "%";
    if (p < 100) window.setTimeout(tick, 130);
    else window.setTimeout(finish, 350);
  };
  window.setTimeout(tick, 200);

  // Safety: never trap the user if something stalls
  window.addEventListener("load", () => window.setTimeout(finish, 2500));
}
