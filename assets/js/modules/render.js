/* =============================================================
   render.js — the CMS engine.
   Reads portfolio.json and renders every data-driven section into
   whatever containers exist on the current page. Adding a project
   anywhere only requires editing the JSON.
   ============================================================= */
import { $, $$, esc, mediaHTML, gradientFrom } from "./util.js";

/* ---------- Profile-bound text (name, contact, socials) ---------- */
function renderProfile(p) {
  if (!p) return;
  $$("[data-profile]").forEach((el) => {
    const key = el.dataset.profile;
    const val = key.split(".").reduce((o, k) => o?.[k], p);
    if (val == null) return;
    if (el.tagName === "A") el.href = val;
    else el.textContent = val;
  });
  // Social links by data-social="linkedin"
  $$("[data-social]").forEach((el) => {
    const url = p.socials?.[el.dataset.social];
    if (url) el.href = url;
  });
}

/* ---------- Stats ---------- */
function renderStats(list, el) {
  el.innerHTML = list.map((s) => `
    <div class="stat reveal">
      <div class="stat__num" data-count="${s.value}" data-suffix="${esc(s.suffix || "")}">0</div>
      <div class="stat__label">${esc(s.label)}</div>
    </div>`).join("");
}

/* ---------- Skills ---------- */
function renderSkills(list, el) {
  el.innerHTML = list.map((s, i) => `
    <div class="skill-card reveal" data-delay="${i % 4}">
      <div class="skill-card__icon">${esc(s.name.charAt(0))}</div>
      <h4>${esc(s.name)}</h4>
      <p>${esc(s.desc || "")}</p>
      <div class="skill-card__bar"><span data-level="${s.level || 80}"></span></div>
    </div>`).join("");
}

/* ---------- Experience timeline ---------- */
function renderExperience(list, el) {
  el.innerHTML = list.map((x) => `
    <div class="timeline__item reveal">
      <div class="timeline__date">${esc(x.date)}</div>
      <h3 class="timeline__role">${esc(x.role)}</h3>
      <div class="timeline__org">${esc(x.org)}</div>
      <p>${esc(x.summary || "")}</p>
      <div class="timeline__tags">
        ${(x.tags || []).map((t) => `<span class="pill">${esc(t)}</span>`).join("")}
      </div>
    </div>`).join("");
}

/* ---------- Brand cards ---------- */
function renderBrands(list, el) {
  el.innerHTML = list.map((b, i) => `
    <article class="card brand-card tilt reveal" data-delay="${i % 4}">
      <div class="brand-card__logo" style="background:${esc(b.color || "#FFC400")}">${esc(b.initials || "")}</div>
      <h3>${esc(b.name)}</h3>
      <p class="card__desc">${esc(b.desc || "")}</p>
      <a class="btn btn--ghost btn--sm magnetic" href="${esc(b.website || "#")}" target="_blank" rel="noopener">
        Visit <span class="btn__arrow">→</span>
      </a>
    </article>`).join("");
}

/* ---------- Generic project/website cards ---------- */
function renderProjects(list, el) {
  el.innerHTML = list.map((pr, i) => `
    <article class="card tilt reveal" data-delay="${i % 3}">
      ${mediaHTML(pr.image, pr.title)}
      <span class="card__tag">${esc(pr.type || pr.category || "")}</span>
      <div class="card__body">
        <h3 class="card__title">${esc(pr.title)}</h3>
        <div class="card__meta">${esc(pr.client || "")}${pr.year ? " · " + esc(pr.year) : ""}</div>
        <p class="card__desc">${esc(pr.description || "")}</p>
        <div class="card__tags">
          ${(pr.skills || pr.tags || []).slice(0, 4).map((t) => `<span class="pill">${esc(t)}</span>`).join("")}
        </div>
        <div class="card__foot">
          <small class="card__meta">${esc(pr.role || "")}</small>
          <a class="btn btn--ghost btn--sm magnetic" href="${esc(pr.website || "#")}" target="_blank" rel="noopener">Visit <span class="btn__arrow">→</span></a>
        </div>
      </div>
    </article>`).join("") || emptyNote();
}

/* ---------- Social media cards (filterable) ---------- */
function renderSocial(list, el) {
  el.innerHTML = list.map((s, i) => `
    <article class="card tilt reveal" data-delay="${i % 3}"
      data-cat="${esc(s.platform)}|${esc(s.type)}">
      ${mediaHTML(s.image, s.title)}
      <span class="card__tag">${esc(s.platform)}</span>
      <div class="card__body">
        <h3 class="card__title">${esc(s.title)}</h3>
        <div class="card__meta">${esc(s.campaign)} · ${esc(s.type)}</div>
        <div class="card__foot">
          <a class="btn btn--ghost btn--sm magnetic" href="${esc(s.link || "#")}" target="_blank" rel="noopener">Open <span class="btn__arrow">→</span></a>
        </div>
      </div>
    </article>`).join("") || emptyNote();
}

/* ---------- Campaign cards ---------- */
function renderCampaigns(list, el) {
  el.innerHTML = list.map((c, i) => `
    <article class="card tilt reveal" data-delay="${i % 3}">
      ${mediaHTML(c.image, c.title)}
      <span class="card__tag">${esc(c.type)}</span>
      <div class="card__body">
        <h3 class="card__title">${esc(c.title)}</h3>
        <p class="card__desc">${esc(c.description || "")}</p>
      </div>
    </article>`).join("") || emptyNote();
}

/* ---------- Video cards ---------- */
function renderVideos(list, el) {
  el.innerHTML = list.map((v, i) => `
    <article class="card tilt reveal" data-delay="${i % 3}">
      <div class="card__media" style="background:${gradientFrom(v.title)}">
        <div class="ph">${esc(v.title)}</div>
        ${v.image ? `<img loading="lazy" decoding="async" alt="${esc(v.title)}" src="${esc(v.image)}" style="opacity:0;transition:opacity .5s" onload="this.style.opacity=1" onerror="this.remove()">` : ""}
        <button class="play-btn" aria-label="Play ${esc(v.title)}" style="position:absolute;inset:0;margin:auto;width:64px;height:64px;border-radius:50%;background:var(--accent);color:#0a0a0a;display:grid;place-items:center;box-shadow:0 10px 30px rgba(255,196,0,.4)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <span class="doc-badge">${esc(v.duration || "")}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${esc(v.title)}</h3>
        <div class="card__meta">${esc(v.category || "")}</div>
        <p class="card__desc">${esc(v.description || "")}</p>
      </div>
    </article>`).join("") || emptyNote();
}

/* ---------- SEO timeline ---------- */
function renderSEO(list, el) {
  el.innerHTML = list.map((s) => `
    <div class="timeline__item reveal">
      <h3 class="timeline__role">${esc(s.title)}</h3>
      <p>${esc(s.desc || "")}</p>
    </div>`).join("");
}

/* ---------- Brochure / PDF cards ---------- */
function renderBrochures(list, el) {
  el.innerHTML = list.map((b, i) => `
    <article class="card brochure-card tilt reveal" data-delay="${i % 3}">
      <div class="card__media" style="background:${gradientFrom(b.title)}">
        <div class="ph">${esc(b.title)}</div>
        ${b.image ? `<img loading="lazy" decoding="async" alt="${esc(b.title)}" src="${esc(b.image)}" style="opacity:0;transition:opacity .5s" onload="this.style.opacity=1" onerror="this.remove()">` : ""}
        <span class="doc-badge">PDF · ${esc(b.pages || "")}p</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${esc(b.title)}</h3>
        <div class="card__meta">${esc(b.category || "")}</div>
        <div class="card__foot">
          <a class="btn btn--ghost btn--sm magnetic" href="${esc(b.file || "#")}" target="_blank" rel="noopener">Preview</a>
          <a class="btn btn--primary btn--sm magnetic" href="${esc(b.file || "#")}" download>Download</a>
        </div>
      </div>
    </article>`).join("") || emptyNote();
}

/* ---------- Masonry gallery (graphic design / events) ---------- */
function renderMasonry(list, el) {
  el.innerHTML = list.map((g, i) => `
    <figure class="masonry__item reveal" data-cat="${esc(g.category)}"
      data-title="${esc(g.title)}" data-index="${i}" style="--ar:${esc(g.ar || 1)}">
      <div class="masonry__ph" style="background:${gradientFrom(g.title)}">${esc(g.title)}</div>
      ${g.image ? `<img loading="lazy" decoding="async" alt="${esc(g.title)}" src="${esc(g.image)}" style="opacity:0;transition:opacity .5s" onload="this.style.opacity=1;this.previousElementSibling.style.display='none'" onerror="this.remove()">` : ""}
      <figcaption class="masonry__overlay">
        <h4>${esc(g.title)}</h4>
        <span>${esc(g.category)}</span>
      </figcaption>
    </figure>`).join("") || emptyNote();
}

/* ---------- Testimonials slider ---------- */
function renderTestimonials(list, wrap) {
  const track = $(".testi__track", wrap);
  const dots = $(".testi__dots", wrap);
  if (!track) return;
  track.innerHTML = list.map((t) => `
    <div class="testi__card">
      <p class="testi__quote">${esc(t.quote)}</p>
      <div class="testi__author">
        <div class="testi__avatar">${esc((t.name || "?").charAt(0))}</div>
        <div>
          <div class="testi__name">${esc(t.name)}</div>
          <div class="testi__role">${esc(t.role || "")}</div>
        </div>
      </div>
    </div>`).join("");
  if (dots) dots.innerHTML = list.map((_, i) => `<button class="testi__dot ${i === 0 ? "active" : ""}" data-i="${i}" aria-label="Testimonial ${i + 1}"></button>`).join("");

  let idx = 0;
  const go = (i) => {
    idx = (i + list.length) % list.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    $$(".testi__dot", wrap).forEach((d, di) => d.classList.toggle("active", di === idx));
  };
  $$(".testi__dot", wrap).forEach((d) => d.addEventListener("click", () => go(+d.dataset.i)));
  wrap._auto = setInterval(() => go(idx + 1), 5500);
  wrap.addEventListener("mouseenter", () => clearInterval(wrap._auto));
}

/* ---------- Filters (generic, works for social + gallery) ---------- */
function initFilters() {
  $$("[data-filter-group]").forEach((group) => {
    const targetSel = group.dataset.filterGroup;
    const items = $$(`${targetSel} [data-cat]`);
    group.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", group).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((it) => {
        const cats = it.dataset.cat || "";
        it.classList.toggle("hidden", f !== "all" && !cats.split("|").includes(f));
      });
    });
  });
}

/* ---------- Gallery search + sort ---------- */
function initGalleryTools() {
  const search = $("#gallery-search");
  const sort = $("#gallery-sort");
  const grid = $("[data-render='gallery']");
  if (!grid) return;
  const apply = () => {
    const q = (search?.value || "").toLowerCase().trim();
    let items = $$(".masonry__item", grid);
    items.forEach((it) => {
      const hit = (it.dataset.title + " " + it.dataset.cat).toLowerCase().includes(q);
      it.classList.toggle("hidden", !hit);
    });
    if (sort?.value && sort.value !== "default") {
      const sorted = items.sort((a, b) => {
        const A = a.dataset.title.toLowerCase(), B = b.dataset.title.toLowerCase();
        return sort.value === "az" ? A.localeCompare(B) : B.localeCompare(A);
      });
      sorted.forEach((el) => grid.appendChild(el));
    }
  };
  search?.addEventListener("input", apply);
  sort?.addEventListener("change", apply);
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const box = $(".lightbox");
  if (!box) return;
  const content = $(".lightbox__content", box);
  let items = [], cur = 0;

  const collect = () => ($$(".masonry__item").filter((i) => !i.classList.contains("hidden")));

  const show = (i) => {
    items = collect();
    cur = (i + items.length) % items.length;
    const it = items[cur];
    const img = it.querySelector("img");
    const title = it.dataset.title || "";
    const cat = it.dataset.cat || "";
    content.querySelector(".lightbox__stage").innerHTML = img
      ? `<img src="${img.src}" alt="${esc(title)}">`
      : `<div class="lightbox__ph">${esc(title)}</div>`;
    content.querySelector(".lightbox__caption").innerHTML = `<strong>${esc(title)}</strong> — ${esc(cat)}`;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => { box.classList.remove("open"); document.body.style.overflow = ""; };

  document.addEventListener("click", (e) => {
    const item = e.target.closest(".masonry__item");
    if (item) show(collect().indexOf(item));
  });
  $(".lightbox__close", box)?.addEventListener("click", close);
  $(".lightbox__nav.prev", box)?.addEventListener("click", () => show(cur - 1));
  $(".lightbox__nav.next", box)?.addEventListener("click", () => show(cur + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
}

function emptyNote() {
  return `<div class="empty-note">Nothing here yet — drop images in the matching <code>assets/</code> folder and add an entry in <code>portfolio.json</code>.</div>`;
}

/* ---------- Dispatcher ---------- */
export function renderAll(data) {
  if (!data) return;
  renderProfile(data.profile);

  const map = {
    stats: renderStats,
    skills: renderSkills,
    experience: renderExperience,
    brands: renderBrands,
    projects: renderProjects,
    websites: renderProjects,
    social: renderSocial,
    campaigns: renderCampaigns,
    videos: renderVideos,
    seo: renderSEO,
    brochures: renderBrochures,
    gallery: renderMasonry,
    events: renderMasonry,
  };

  $$("[data-render]").forEach((el) => {
    const key = el.dataset.render;
    const fn = map[key];
    let list = data[key];
    // websites = projects filtered to website category
    if (key === "websites") list = (data.projects || []).filter((p) => p.category === "website");
    if (fn && list) fn(list, el);
  });

  // Testimonials (special wrapper)
  const testi = $("[data-testimonials]");
  if (testi && data.testimonials) renderTestimonials(data.testimonials, testi);

  initFilters();
  initGalleryTools();
  initLightbox();
}
