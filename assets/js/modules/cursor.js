/* =============================================================
   cursor.js — animated custom cursor (dot + trailing ring)
   Skips touch devices and reduced-motion users.
   ============================================================= */
import { $, $$, prefersReducedMotion } from "./util.js";

export function initCursor() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }, { passive: true });

  /* Ring trails with easing */
  const raf = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  };
  raf();

  /* Grow ring over interactive elements */
  const hoverables = "a, button, .card, .skill-card, .masonry__item, input, textarea, .filter-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) ring.classList.add("hovering");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) ring.classList.remove("hovering");
  });

  document.addEventListener("mouseleave", () => { dot.style.opacity = ring.style.opacity = 0; });
  document.addEventListener("mouseenter", () => { dot.style.opacity = ring.style.opacity = 1; });
}
