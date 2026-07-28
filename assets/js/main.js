/* =============================================================
   main.js — application entry point.
   Loads the CMS data, renders content, then boots every
   interaction module. Everything is handcrafted vanilla JS —
   no external libraries.
   ============================================================= */
import { loadData } from "./modules/util.js";
import { initLoader } from "./modules/loader.js";
import { initNav } from "./modules/nav.js";
import { initCursor } from "./modules/cursor.js";
import { initTheme } from "./modules/theme.js";
import { initTyping, initHeroFX } from "./modules/hero.js";
import { renderAll } from "./modules/render.js";
import { initContactForm } from "./modules/contact.js";
import {
  initReveal, initParallax, bindDynamicFX,
} from "./modules/animations.js";

/* Static UI can boot immediately */
initLoader();
initTheme();
initNav();
initCursor();
initHeroFX();

/* Data-driven content, then the effects that depend on it */
(async () => {
  const data = await loadData();

  if (data?.profile?.titles) initTyping(data.profile.titles);

  if (data) {
    renderAll(data);
    initContactForm(data.profile);
  }

  // Effects — run after DOM (dynamic + static) is in place
  initReveal();
  initParallax();
  bindDynamicFX();
})();

/* Year in footers */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
