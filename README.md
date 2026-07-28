# Rahul Jaiswal — Portfolio

A premium, handcrafted personal portfolio for **Rahul Jaiswal** — Marketing
Manager, Brand Strategist, SEO Specialist & Creative Designer.

Built with **pure HTML5, CSS3 and vanilla JavaScript** — no frameworks, no
Bootstrap, no jQuery, no Tailwind, and **zero external JS libraries**. Every
animation (smooth reveal, particles, custom cursor, typing, counters, 3D tilt,
magnetic buttons, parallax, lightbox) is written by hand. It's fully
responsive, SEO-optimised, accessible, GitHub-Pages-ready and CMS-driven from a
single JSON file.

> **Design note:** The original brief mentioned GSAP / AOS / Lenis. Those are
> external dependencies. To honour the stronger, repeated requirement —
> *"everything handcrafted, vanilla JS, no frameworks"* — all animations are
> reimplemented natively. This gives the best Lighthouse score, works offline,
> and adds no network requests.

---

## ✨ Features

- **5 pages** — Home, About, Projects/Portfolio, Gallery, Contact
- **CMS-driven** — all content lives in `assets/data/portfolio.json`
- **Dark theme by default** + a persisted light-mode toggle
- **Premium animations** — loader, custom cursor, floating particles, mouse
  glow, typing headline, scroll reveals, number counters, 3D tilt, magnetic
  buttons, parallax, marquee, testimonials slider, masonry lightbox
- **Smart placeholders** — every card shows a branded gradient until you drop
  in a real image, so it never looks broken
- **Filters, search & sort** on the gallery; platform/format filters on social
- **Full SEO** — meta tags, Open Graph, Twitter cards, JSON-LD schema,
  `robots.txt`, `sitemap.xml`, canonical URLs, semantic HTML, alt text
- **Accessible** — keyboard support, focus styles, reduced-motion support,
  ARIA labels
- **Contact form** with validation (opens a pre-filled email; no backend
  needed — swap in Formspree/Getform in one line if you want)

---

## 📁 Folder structure

```
desktop-tutorial/               ← repo root (served by GitHub Pages)
├── index.html                  ← Home
├── about.html                  ← About
├── projects.html               ← Projects + Portfolio (brands, websites, campaigns, videos, SEO, social)
├── gallery.html                ← Gallery (graphic design, brochures, events)
├── contact.html                ← Contact
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── .nojekyll                   ← tells GitHub Pages to serve files as-is
├── README.md
└── assets/
    ├── css/style.css           ← the entire design system (one file, no duplication)
    ├── js/
    │   ├── main.js             ← entry point
    │   └── modules/            ← loader, nav, cursor, theme, hero, animations, render, contact, util
    ├── data/portfolio.json     ← 🔴 EDIT THIS to change all content
    ├── images/                 ← drop-in image folders (social, events, websites, campaigns, gallery, …)
    ├── brochures/  events/  videos/  icons/  fonts/
    └── Rahul-Jaiswal-Resume.pdf ← replace the placeholder with your real PDF
```

---

## 🚀 Running locally

Because the site loads content from a JSON file via `fetch()` and uses ES
modules, you need a tiny local web server (opening `index.html` directly with
`file://` will block those requests). Any of these work:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install)
npx serve .

# VS Code
Use the "Live Server" extension → "Go Live"
```

Then open <http://localhost:8080>.

---

## 🌐 GitHub Pages deployment

This repo is already structured for GitHub Pages.

1. Push your changes to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
5. Your site goes live at
   `https://<username>.github.io/<repo>/` — for this repo:
   `https://rahuljaiswal1k-lgtm.github.io/desktop-tutorial/`

The `.nojekyll` file ensures GitHub serves the `assets/` folder untouched.

> If you deploy under a **different URL**, update the absolute URLs in the
> `<link rel="canonical">` / Open Graph / Twitter meta tags, `sitemap.xml` and
> `robots.txt`. A quick find-and-replace of the base URL does it.

---

## ➕ Adding projects (the CMS)

Everything renders from **`assets/data/portfolio.json`**. To add work, add an
object to the relevant array — no HTML editing required.

**Example — add a website:**
```json
{
  "title": "New Client Website",
  "category": "website",
  "type": "Website",
  "description": "One-line summary of the project.",
  "image": "assets/images/websites/new-client.jpg",
  "client": "Client Name",
  "year": 2025,
  "skills": ["WordPress", "SEO"],
  "tags": ["Website"],
  "role": "Marketing Manager",
  "website": "https://example.com",
  "featured": true
}
```

The arrays you can edit: `profile`, `stats`, `skills`, `experience`, `brands`,
`projects`, `social`, `campaigns`, `videos`, `seo`, `gallery`, `brochures`,
`events`, `testimonials`. Each renders wherever the matching
`data-render="…"` container appears in the HTML.

---

## 🖼️ Adding images

1. Drop your file into the matching folder (each has a short README):
   - `assets/images/social/` — social creatives
   - `assets/images/events/` (or `assets/events/`) — event photos
   - `assets/images/brochures/` (or `assets/brochures/`) — brochure covers
   - `assets/images/websites/` — website screenshots
   - `assets/images/videos/` — video thumbnails
   - `assets/images/campaigns/` — campaign creatives
   - `assets/images/gallery/` — graphic design pieces
2. Point the entry's `"image"` field in `portfolio.json` at that path.

Until a real image exists, a branded gradient placeholder is shown
automatically. Recommended: optimised `.jpg`/`.webp`, ~1600px wide.

**Profile photo:** save it as `assets/images/rahul-jaiswal.jpg` (referenced by
the hero section).

---

## 🎨 Changing colours

All colours are CSS custom properties at the top of `assets/css/style.css`
(section `01. Design Tokens`):

```css
:root {
  --accent: #FFC400;   /* brand accent  */
  --bg:     #080808;   /* background    */
  --text:   #ffffff;   /* primary text  */
}
```

Change `--accent` once and it updates buttons, highlights, glow, particles and
more. Light-theme values live in the `:root[data-theme="light"]` block.

---

## 🔖 Replacing the logo

- **Wordmark:** the text `Rahul Jaiswal` + the `RJ` monogram appears in the nav
  and footer of each page — edit those inline, or the `.logo__mark` text.
- **Favicon / share image:** replace `assets/icons/favicon.svg` and
  `assets/icons/og-image.svg` (keep the filenames, or update the references).

---

## ✍️ Editing text

- **Name, titles, tagline, email, phone, socials** → `profile` block in
  `portfolio.json` (auto-injected via `data-profile` / `data-social`).
- **Section copy** (headings, intros, bio) → edit directly in the relevant
  `.html` file — it's clearly labelled with comments.
- **Typing headline words** → `profile.titles` array in the JSON.

---

## 🔍 SEO customisation

- Per-page `<title>` and `<meta name="description">` live in each HTML `<head>`.
- Update Open Graph / Twitter tags and the JSON-LD `Person` schema on
  `index.html` with your real socials and image.
- Keep `sitemap.xml` in sync when you add pages, and update the base URL in
  `robots.txt`.

---

## 📄 Adding new pages

1. Duplicate an existing page (e.g. `about.html`) as your starting shell — it
   already includes the nav, footer, loader, cursor and script tag.
2. Update the `<head>` (title, description, canonical).
3. Add your sections. To render JSON-driven content, give a container a
   `data-render="<key>"` attribute matching an array in `portfolio.json`.
4. Add the page to the nav (in every page) and to `sitemap.xml`.

---

## 🛠️ Tech & performance

- Semantic HTML5, one modular CSS file, ES-module JavaScript.
- Lazy-loaded images, `IntersectionObserver`-based reveals & counters (cheap),
  `prefers-reduced-motion` respected, print styles included.
- No render-blocking libraries → targets a Lighthouse score of 95+.

---

## 📬 Wiring up the contact form (optional)

By default the form validates and opens the visitor's email client
(`mailto:`), which works on GitHub Pages with no server. To collect
submissions instead, sign up for a free endpoint (e.g.
[Formspree](https://formspree.io) or [Getform](https://getform.io)) and, in
`assets/js/modules/contact.js`, replace the `mailto:` block with a `fetch()`
POST to your endpoint.

---

© Rahul Jaiswal. Handcrafted with HTML, CSS & JavaScript.
