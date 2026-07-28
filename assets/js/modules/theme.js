/* =============================================================
   theme.js — dark (default) / light toggle, persisted
   ============================================================= */
import { $ } from "./util.js";

const KEY = "rj-theme";

export function initTheme() {
  const root = document.documentElement;
  const btn = $(".theme-toggle");

  const saved = localStorage.getItem(KEY);
  if (saved === "light") root.setAttribute("data-theme", "light");

  btn?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem(KEY, "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem(KEY, "light");
    }
  });
}
