# Website Backend / Content Editor — Summary

A complete admin backend for the portfolio website: **every section and every
text on the site can now be edited from a browser — no coding needed.**

- **Repository:** `rahuljaiswal1k-lgtm/desktop-tutorial`
- **Branch:** `claude/website-backend-editor-hut63n`
- **Pull Request:** [#3](https://github.com/rahuljaiswal1k-lgtm/desktop-tutorial/pull/3)
- **Admin panel (after merging to `main`):**
  `https://rahuljaiswal1k-lgtm.github.io/desktop-tutorial/admin.html`
- **Setup & usage guide:** [`ADMIN_GUIDE.md`](ADMIN_GUIDE.md)

---

## 1. How the backend works

The site is hosted free on GitHub Pages, so there is no server. The admin
panel (`admin.html`) acts as the backend:

1. You unlock it once with a **GitHub access token** (steps in `ADMIN_GUIDE.md`).
2. It loads all content from **`assets/data/portfolio.json`** — the single
   source of truth for the whole website.
3. Every edit you make is saved back to GitHub as a normal commit when you
   click **💾 Save & publish**. The live site updates in ~1 minute.
4. Images, PDFs and video clips upload straight into the repo's `assets/`
   folders (or paste YouTube/Vimeo links for videos).

No monthly cost, full version history (every save is a Git commit), and a
**⬇ Backup JSON** button for extra safety.

---

## 2. What you can edit — everything

### Content tabs (lists of items)

| Tab | What it manages |
|---|---|
| **Profile** | Name, logo initials, rotating job titles, tagline, email, phone, location, social links |
| **Stats** | The animated counters (200+ Designs, 500+ Posts, …) |
| **Skills** | 18 skill cards with level bars and descriptions |
| **Experience** | Timeline roles, organisations, dates, tags |
| **Brands** | Featured brand cards (name, colour, initials, link) |
| **Projects** | Website/campaign projects with images, clients, years, links |
| **Social** | Social media portfolio posts (platform, format, image, link) |
| **Campaigns** | Campaign cards |
| **Videos** | Video cards — YouTube/Vimeo links or uploaded clips, pop-up player |
| **SEO** | SEO focus-area timeline |
| **Gallery** | Graphic design masonry tiles (category, aspect ratio, image) |
| **Brochures** | PDF brochures with cover images |
| **Events** | Event photo masonry |
| **Testimonials** | Quote slider |
| **Photo & Résumé** | Profile photo and resume PDF used across the site |

### 📄 Page tabs (all fixed text on the site) — NEW

| Tab | What it edits |
|---|---|
| **📄 Home Page** | Hero headline (both lines), eyebrow, typing-line prefix, buttons, floating badges, scroll hint, marquee words, about section (lead, paragraphs, pills, button), 4 mini-cards, every section heading, resume banner, contact banner |
| **📄 About Page** | Page hero, biography heading/lead/paragraphs, 20 skill pills, Mission/Vision/Approach/Impact cards, section headings, resume banner |
| **📄 Projects Page** | Page hero + every section heading and lead line + bottom banner |
| **📄 Gallery Page** | Page hero, section headings, search-box placeholder |
| **📄 Contact Page** | Page hero, get-in-touch texts, contact row labels, map box text, every form label/placeholder/button |
| **📄 Footer & Menu** | Navigation labels, footer description, column titles, quick links, copyright and credit lines |

Each page tab also includes that page's **Google title and description**
(SEO meta tags).

---

## 3. Smart behaviours

- **Filters build themselves** — filter chips on the social portfolio,
  design gallery and events sections are generated from the categories on
  your items. Type a new category on any item → its filter button appears
  automatically. No code edits ever.
- **Paragraph editing** — biography/about paragraphs are edited in one box:
  one paragraph per block, blank line between paragraphs, and
  `**double asterisks**` for **bold**.
- **Name & initials everywhere** — the logo, loading screen, footer and
  hero portrait fallback all follow the Profile tab.
- **Correct contact links** — email opens the mail app (`mailto:`), phone
  dials (`tel:`), and the visible email/phone text updates from Profile.
- **Safe fallbacks** — if a text is ever missing from the JSON, the page
  keeps its built-in default instead of showing a blank.

---

## 4. Technical notes

- `assets/data/portfolio.json` gained a `content` key holding all page copy,
  plus `profile.initials`.
- `assets/js/modules/render.js` gained a generic hydrator: any element with
  `data-content="path.in.content"` gets its text from the JSON. Variants:
  `data-content-placeholder`, `data-content-pills`, `data-content-paras`
  (supports `**bold**`), `data-content-marquee`, and `data-filters-for`
  (auto-generated filter bars). Page meta is applied via
  `<body data-page="…">`.
- `admin.html` gained six page-editor tabs driven by the same schema system,
  with nested-path editing (`content.home.hero.…`), grouped gold headings
  and a new paragraphs field type.
- All five pages carry `data-content` bindings; their original text remains
  in the HTML as the fallback.

## 5. Verification done

- ✅ `portfolio.json` validates; all 5 pages + admin return HTTP 200.
- ✅ Headless Chromium: zero script errors on every page; titles, headings,
  marquee (12 spans), pills (8 + 20), paragraphs with bold, and mini-cards
  all hydrate from JSON.
- ✅ Auto-generated filters verified: 13 gallery chips, 8 event chips,
  6 social chips — and clicking a chip filters tiles correctly.
- ✅ Admin panel: 21 tabs render; nested paths, paragraph splitting and
  comma-list fields all save to the right place in the JSON.

---

## 6. Next steps

1. **Merge [PR #3](https://github.com/rahuljaiswal1k-lgtm/desktop-tutorial/pull/3)**
   into `main` — the admin saves to `main`, so the new tabs work fully once
   merged.
2. Open `admin.html` on the live site and do the one-time token setup
   (see `ADMIN_GUIDE.md`).
3. Edit anything → **Save & publish** → live in ~1 minute.

---

_Everything is handcrafted HTML, CSS & vanilla JavaScript — no frameworks,
no server, no monthly cost. © Rahul Jaiswal._
