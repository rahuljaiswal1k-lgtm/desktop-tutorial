/* =============================================================
   nav.js — sticky nav blur on scroll, mobile drawer,
   active-link highlighting, scroll progress bar
   ============================================================= */
import { $, $$ } from "./util.js";

export function initNav() {
  const nav = $(".nav");
  const hamburger = $(".hamburger");
  const menu = $(".mobile-menu");
  const progress = $(".scroll-progress");

  /* Blur nav + progress bar on scroll */
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile drawer */
  const toggleMenu = (open) => {
    const next = open ?? !menu.classList.contains("open");
    hamburger?.classList.toggle("open", next);
    menu?.classList.toggle("open", next);
    hamburger?.setAttribute("aria-expanded", String(next));
    document.body.style.overflow = next ? "hidden" : "";
  };
  hamburger?.addEventListener("click", () => toggleMenu());
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  /* Highlight active section link on the home page (scroll spy) */
  const sections = $$("section[id]");
  const links = $$(".nav__link");
  if (sections.length && links.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }
}
