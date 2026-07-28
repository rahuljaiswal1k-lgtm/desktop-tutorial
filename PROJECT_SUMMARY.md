# Rahul Jaiswal Portfolio — Project Summary

A complete, premium, handcrafted personal portfolio website.
This document summarizes **everything built so far**.

- **Repository:** `rahuljaiswal1k-lgtm/desktop-tutorial`
- **Branch:** `claude/rahul-jaiswal-portfolio-b36wq1`
- **Pull Request:** [#1](https://github.com/rahuljaiswal1k-lgtm/desktop-tutorial/pull/1)
- **Live URL (after enabling Pages):** `https://rahuljaiswal1k-lgtm.github.io/desktop-tutorial/`

---

## 1. Overview

A production-ready portfolio for **Rahul Jaiswal** — Marketing Manager,
Digital Marketing Strategist, Brand Designer & SEO Specialist.

Built with **pure HTML5, CSS3 and vanilla JavaScript (ES modules)** — no
Bootstrap, no jQuery, no Tailwind, no frameworks, and **zero external JS
libraries**. Every animation is handcrafted.

> **Design decision:** The brief mentioned GSAP / AOS / Lenis but also insisted
> on "everything handcrafted, vanilla JS, no frameworks." The stronger, repeated
> constraint won — all animations are reimplemented natively. Result: best
> Lighthouse score, works offline, zero network requests for scripts.

**Theme:** Dark by default (`#080808` bg, white text, `#FFC400` accent) with a
persisted light-mode toggle. Style: premium, minimal, luxury, glassmorphism,
large typography, Apple/Framer-inspired.

---

## 2. Pages (5)

| Page | File | Contents |
|------|------|----------|
| **Home** | `index.html` | Hero (typing headline, particles, mouse glow, portrait), marquee, about preview, skills, experience timeline, featured brands, stats counters, testimonials slider, resume CTA, contact CTA |
| **About** | `about.html` | Full biography, mission/vision/approach/impact cards, skill list (20 pills), skills grid, experience timeline, stats, resume CTA |
| **Projects / Portfolio** | `projects.html` | Featured brands, websites portfolio, campaign portfolio, filterable social media portfolio, video portfolio, SEO projects timeline |
| **Gallery** | `gallery.html` | Graphic design masonry (search + sort + 12 category filters + lightbox), brochure portfolio, event portfolio (masonry + filters) |
| **Contact** | `contact.html` | Contact details (LinkedIn, Instagram, email, phone, GitHub), validated contact form, map placeholder |

---

## 3. Full file structure

```
desktop-tutorial/                 ← repo root (served by GitHub Pages)
├── index.html                    ← Home
├── about.html                    ← About
├── projects.html                 ← Projects + Portfolio
├── gallery.html                  ← Gallery
├── contact.html                  ← Contact
├── robots.txt                    ← SEO crawl rules + sitemap ref
├── sitemap.xml                   ← 5 URLs
├── site.webmanifest              ← PWA manifest
├── .nojekyll                     ← serve assets/ untouched on Pages
├── .gitignore
├── README.md                     ← full usage & customization guide
├── PROJECT_SUMMARY.md            ← this file
└── assets/
    ├── css/
    │   └── style.css             ← entire design system, one file (25 sections)
    ├── js/
    │   ├── main.js               ← entry point (wires modules)
    │   └── modules/
    │       ├── util.js           ← helpers, JSON loader, placeholder generator
    │       ├── loader.js         ← loading screen + progress
    │       ├── nav.js            ← sticky/blur nav, mobile drawer, scroll spy, progress bar
    │       ├── cursor.js         ← custom cursor (dot + trailing ring)
    │       ├── theme.js          ← dark/light toggle (persisted)
    │       ├── hero.js           ← typing animation, particle canvas, mouse glow
    │       ├── animations.js     ← reveal, counters, skill bars, tilt, magnetic, parallax
    │       ├── render.js         ← the CMS engine (renders every section + filters + lightbox)
    │       └── contact.js        ← form validation + mailto delivery
    ├── data/
    │   └── portfolio.json        ← 🔴 SINGLE SOURCE OF CONTENT
    ├── icons/
    │   ├── favicon.svg           ← RJ monogram favicon
    │   ├── og-image.svg          ← 1200×630 social share image
    │   └── README.md
    ├── fonts/README.md           ← how to self-host fonts (optional)
    ├── Rahul-Jaiswal-Resume.pdf.txt  ← placeholder; replace with real PDF
    ├── images/                   ← drop-in image folders (each has a README)
    │   ├── social/  events/  brochures/  websites/
    │   ├── videos/  campaigns/  gallery/  brands/  general/
    ├── brochures/                ← brochure PDFs + covers
    ├── events/                   ← event gallery images
    └── videos/                   ← video files
```

---

## 4. Features implemented

### CMS (JSON-driven)
- All content renders from `assets/data/portfolio.json`.
- HTML containers use `data-render="<key>"`; the engine fills them.
- Keys: `profile`, `stats`, `skills`, `experience`, `brands`, `projects`,
  `social`, `campaigns`, `videos`, `seo`, `gallery`, `brochures`, `events`,
  `testimonials`.
- Adding a project = add one JSON object. No HTML editing needed.

### Handcrafted animations (no libraries)
Loading screen · custom animated cursor · floating particle canvas + particle
links · mouse glow · cycling typing headline · scroll reveal · number counters ·
animated skill bars · 3D tilt cards · magnetic buttons · parallax · infinite
marquee · testimonials slider (autoplay) · masonry lightbox with keyboard nav.

### Smart placeholders
Every card shows a unique, deterministic **branded gradient** with a label
until a real image is dropped in — so the site looks fully designed from day one
and never shows broken images.

### Gallery tools
Live **search**, **sort** (A–Z / Z–A), and **category filters**; **lightbox**
with prev/next + keyboard (←/→/Esc). Social portfolio has platform/format
filters (LinkedIn, Instagram, Video, Carousel, Static).

### SEO
Per-page `<title>` + meta description · Open Graph · Twitter cards ·
JSON-LD (`Person` + `ContactPage`) · canonical URLs · `robots.txt` ·
`sitemap.xml` · semantic HTML · alt text · SVG favicon + OG image · manifest.

### Accessibility & performance
Focus-visible styles · ARIA labels · `prefers-reduced-motion` support · print
styles · lazy-loaded images · IntersectionObserver (cheap) · targets Lighthouse
95+ · no render-blocking libraries.

### Responsive
Desktop / tablet / mobile breakpoints; mobile hamburger drawer; fluid type
scale (`clamp()`); masonry collapses 3→2→1 columns.

### Theme
Dark default + light toggle persisted in `localStorage`; both themes fully
styled via CSS custom properties.

### Contact form
Client-side validation with inline messages; delivers via pre-filled `mailto:`
(works on GitHub Pages, no backend). One-line swap to Formspree/Getform noted
in `contact.js`.

---

## 5. Data currently in `portfolio.json`

- **Profile:** name, 5 rotating titles, tagline, email, phone (placeholder),
  socials (placeholders).
- **Stats:** 200+ Designs, 500+ Social Posts, 50+ Campaigns, 100+ Videos,
  20+ Brochures.
- **Skills:** 18 skills with levels & descriptions.
- **Experience:** Envision Next, RERA Easy, Life at Envision Next.
- **Brands:** Envision Next, RERA Easy, Life at Envision Next, Aspace Estella.
- **Projects/Websites:** 5 (RERA Easy, Envision Next, Aspace Estella, SEO
  Knowledge Pages, Wireframes/UI).
- **Social:** 8 sample posts. **Campaigns:** 8. **Videos:** 4.
- **SEO:** 7 focus areas. **Gallery:** 15 pieces across 12 categories.
- **Brochures:** 5. **Events:** 8. **Testimonials:** 3 (placeholder).

---

## 6. Verification done

- ✅ All 5 pages return HTTP 200 via local server.
- ✅ `portfolio.json`, `site.webmanifest`, `sitemap.xml`, both SVGs validated.
- ✅ Headless Chromium: **no runtime console errors** on any page.
- ✅ Content confirmed rendering: 18 skill cards, 29 project cards, 23 masonry
  tiles, 3 testimonials, typing headline active.
- ✅ Screenshots reviewed (desktop + mobile) — premium look confirmed.

---

## 7. How to run & deploy (quick)

**Run locally** (a server is required — the site fetches JSON):
```bash
python3 -m http.server 8080     # then open http://localhost:8080
# or:  npx serve .
```

**Deploy on GitHub Pages:**
Settings → Pages → Deploy from branch → pick branch + `/ (root)` → Save.
Live at `https://rahuljaiswal1k-lgtm.github.io/desktop-tutorial/`.

Full instructions (adding projects/images, changing colors, replacing logo,
editing text, SEO, new pages) are in **`README.md`**.

---

## 8. Suggested next steps (optional)

- Replace placeholder **phone number** and **social URLs** in `portfolio.json`.
- Add your **profile photo** at `assets/images/rahul-jaiswal.jpg`.
- Add your **resume** at `assets/Rahul-Jaiswal-Resume.pdf`.
- Drop real **images** into `assets/images/<category>/` and update the JSON.
- Replace placeholder **testimonials** with real quotes.
- (Optional) Wire the contact form to a Formspree/Getform endpoint.

---

_Handcrafted with HTML, CSS & JavaScript. © Rahul Jaiswal._
