# FinegirlDami — personal website

Personal site for **Oluwadamilola Olaniyan** (FinegirlDami) — Web3 writer, content
strategist and digital storyteller.

Static, no build step, no dependencies. Just HTML, CSS and a little vanilla JS.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content and structure |
| `styles.css` | Design system and layout (purple / white / black) |
| `script.js` | Mobile nav, sticky header, scroll reveals, FAQ accordion |
| `assets/favicon.svg` | Favicon |

## Run it locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before going live

- **Add the portrait.** The hero has a framed slot for it. Commit the image as
  `assets/dami.jpg` (`.png`, `.jpeg` and `.webp` also work — the page tries each in
  turn). Until a file is present the frame shows an "FD" monogram, so the page is
  never broken. Square images look best; the source is displayed at 380px.
- **Optional: set `og:image`.** Point it at the same file for richer link previews
  on X and LinkedIn.

## Sections

Hero → stats → positioning quote → work → services → testimonials → writing →
FAQ → contact → footer.

Copy is drawn from the existing Notion portfolio, so the voice matches what's
already published.

## Deploying

Live at **https://dvo1111.github.io/finegirldami/**, published by
`.github/workflows/deploy-pages.yml` on every push to the default branch.

Any other static host works too.

**GitHub Pages** — repo *Settings → Pages*, source: deploy from branch, pick the
branch and `/ (root)`.

**Netlify / Vercel / Cloudflare Pages** — connect the repo, leave the build command
empty and set the publish directory to the repo root.

## Design

- **Palette:** near-black `#0B0910`, white `#FFFFFF`, violet `#8B5CF6` → `#6D28D9`
- **Type:** Fraunces (display) + Inter (body), loaded from Google Fonts
- Responsive down to ~320px, keyboard accessible, honours `prefers-reduced-motion`
