# 🛠️ Content Manager — How to update your portfolio

Your site now has a built‑in admin panel. You can **edit all text, upload photos,
PDFs and videos, and add links** — and everything saves straight to GitHub, so
your live site updates automatically. **No server, no monthly cost.**

- **Admin panel:** `admin.html`
  - Local test: `http://localhost:8080/admin.html`
  - Live (after GitHub Pages is on): `https://rahuljaiswal1k-lgtm.github.io/desktop-tutorial/admin.html`
- **How it works:** the panel reads and writes one file — `assets/data/portfolio.json` —
  and uploads media into `assets/…`. When you click **Save & publish**, it makes a
  single commit to your repository and GitHub Pages rebuilds the site (~1 minute).

---

## 1. One‑time setup — create your access token

The panel needs permission to save changes to your repo. You do this once.

1. Go to **GitHub → Settings → Developer settings → Fine‑grained tokens →
   [Generate new token](https://github.com/settings/personal-access-tokens/new)**.
2. **Token name:** anything (e.g. `Portfolio admin`). **Expiration:** your choice
   (e.g. 90 days — you'll just generate a new one when it expires).
3. **Repository access →** “Only select repositories” **→** choose
   **`desktop-tutorial`**.
4. **Permissions → Repository permissions → Contents →** set to
   **Read and write**. (Leave everything else as “No access”.)
5. Click **Generate token** and **copy it** (it starts with `github_pat_…`).
6. Open `admin.html`, paste the token, and click **Unlock admin**.

> The token is stored **only in your browser**. It is never shared or committed.
> On a shared/public computer, click **Log out** when done.

---

## 2. Editing content

- Use the **tabs** (Profile, Projects, Videos, Gallery, Brochures, …) to pick a
  section.
- Each item is a card. Change any field and it updates instantly in memory.
- **+ Add** creates a new item · **↑ ↓** reorder · **Delete** removes one.
- Click **💾 Save & publish** (bottom bar) to push everything live.
- **↻ Reload** discards unsaved edits and re‑pulls the latest from GitHub.
- **⬇ Backup JSON** downloads a copy of your content as a safety net.

### Uploading images / photos
On any image field, click **⬆ Upload** and pick a file. It's queued (you'll see a
banner) and uploaded when you hit **Save & publish**. The file lands in the right
`assets/` folder automatically.

### Videos — links **or** uploads
On a Video item, the **Video** field accepts either:
- a **YouTube / Vimeo link** (recommended — paste the normal URL), **or**
- an **uploaded clip** (click ⬆ Upload) — best for short clips.

On the live site the video plays in a pop‑up player. Add an optional **thumbnail
image** too. (No link/upload = the card just shows, with no play button.)

### PDFs (Brochures)
The **PDF file** field lets you upload a PDF (or paste a link). Add an optional
**cover image**.

### Profile photo & résumé
The **Photo & Résumé** tab replaces two fixed files used across the site:
- Profile photo → shown in the home hero
- Résumé PDF → used by every “Download Resume” button

Upload, then **Save & publish**.

---

## 3. Good to know / limits

- **File size:** keep uploads under **~25 MB** each (GitHub API limit for this
  method). For anything bigger — especially long videos — use a **YouTube/Vimeo
  link** instead. That's faster and free.
- **Where uploads go:** images → `assets/images/<section>/`, event photos →
  `assets/events/`, brochures/PDFs → `assets/brochures/`, uploaded video clips →
  `assets/videos/`.
- **The live update takes ~1 minute** (GitHub Pages rebuild). Refresh the page.
- **Which branch?** The panel saves to the branch GitHub Pages serves — set to
  `main` by default. If your Pages is served from a different branch, open
  **Advanced → repository settings** on the login screen and change it.
- **Backups:** every save is a normal Git commit, so your full history is on
  GitHub. You can also keep local copies with **⬇ Backup JSON**.
- **Security:** `admin.html` is excluded from search engines (`robots.txt` +
  `noindex`). Anyone can open the page, but **nothing can be changed without a
  valid token** that has write access to your repo.

---

## 4. Troubleshooting

| Problem | Fix |
|---|---|
| “Token rejected” | Re‑copy the token; make sure **Contents = Read and write**. |
| “can't see this repo” | On the token, set **Repository access** to include `desktop-tutorial`. |
| Changes not live | Wait ~1 min and hard‑refresh (Ctrl/Cmd+Shift+R). Confirm GitHub Pages is enabled. |
| Big video won't upload | Use a YouTube/Vimeo link instead of a file. |
| Token expired | Generate a new fine‑grained token and paste it again. |

---

_Everything is committed to `rahuljaiswal1k-lgtm/desktop-tutorial`. The admin panel
is a single self‑contained file — no build step, no dependencies._
