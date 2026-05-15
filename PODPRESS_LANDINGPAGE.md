# PodPress — System Documentation

This document describes **what PodPress is**, **what this repository contains**, **how the marketing site works**, **user and content workflows**, and **business / product logic** as reflected across the project (landing pages, feature pages, and supporting assets).

---

## 1. Document Scope

| Layer | What this MD covers |
|--------|---------------------|
| **This repository** | Static HTML/CSS/JS marketing site, local dev server, shared UI patterns, theme and navigation behavior. |
| **PodPress product** | End-to-end podcast-to-newsletter platform as described on pages and in internal gap/feature docs; aligns with the live app at `https://app.podpress.so` (not all backend code lives in this repo). |

If you need **API-level backend documentation**, that belongs in the application and API repositories referenced elsewhere (e.g. Visiata PodPress backend docs). This file stays accurate to **this project folder**.

---

## 2. Project Purpose

### 2.1 Product vision (PodPress)

**PodPress** is a **podcast-to-newsletter operating system**: it helps creators turn spoken audio (episodes, YouTube, RSS-fed shows) into **structured, branded content**—especially **newsletters**—and optionally **send campaigns** or **publish to connected platforms**, without rebuilding the same pipeline in five separate tools.

**Primary outcomes**

- Reduce time from episode release to subscriber-ready email and derivative content.
- Ground AI output in an **editable transcript** so content stays faithful and trustworthy.
- Support **multiple output formats** (brief, detailed, highlights, FAQ, insights, custom prompts, etc.).
- Support **email branding** and **bulk sending** plus **third-party integrations** (Beehiiv, Mailchimp, Medium, Discord, Telegram, X).

**Target users**

- Solo podcasters and newsletter-first creators.
- Agencies and producers managing multiple shows.
- Brands and in-house teams consolidating audio into email, blog, and social copy.

### 2.2 Purpose of *this* repository

This folder is primarily the **public marketing and SEO surface** for PodPress:

- **Main landing page** (`index.html`): full narrative, bento features, pricing, FAQ, CTA, integrations story, workflow sections (transcript, repurposing, branding, campaigns, YouTube, etc.).
- **Feature and resource pages** (`transcript-to-newsletter.html`, `youtube-to-newsletter.html`, `rss-to-newsletter.html`, `podcast-to-blog.html`, `podcast-to-faq.html`, `podcast-to-insights.html`, `content-repurposing.html`, `content-automation.html`, `ai-newsletter-generator.html`, `newsletter-software.html`, `transcript-generator.html`, `podcast-newsletter-guide.html`, `what-is-a-newsletter.html`, `integrations.html`, `email-branding.html`, `email-campaigns.html`, etc.).
- **Legal** (`privacy.html`, `terms.html`).
- **Shared design system** (`pages.css`), **global navbar** (`navbar.js`), **theme** (`theme.js`), **premium interactions** (`premium.js` — cursor, scroll reveals).
- **Local static server** (`serve.py`) for development preview.

**Business role of this repo**: acquisition, education, SEO, and trust—driving signups to `app.podpress.so` and supporting content marketing.

---

## 3. Technical Architecture (This Repository)

### 3.1 Stack

| Component | Technology |
|-----------|------------|
| Pages | Static HTML5 |
| Styling | Embedded `<style>` per page + shared `pages.css` |
| Typography | Google Fonts: Newsreader (display), Inter (body) — as linked in pages |
| Scripts | Vanilla JS: `navbar.js`, `theme.js`, `premium.js` (where included) |
| Hosting model | Any static host or local `python serve.py` |

### 3.2 Entry points

- **`index.html`** — Primary landing experience.
- **`serve.py`** — Serves the project directory over HTTP (default port `3000`, overridable via `PORT` env var) using Python’s `SimpleHTTPRequestHandler`.

### 3.3 Key assets

- Logos: `logo-dark.png`, `logo-light.png` (switched by theme via `data-logo` on `<img>`).
- No build step required for the static site; edit HTML/CSS/JS directly.

### 3.4 Cross-cutting UI behavior

| Concern | Implementation |
|---------|----------------|
| **Theme** | `theme.js`: `data-theme="dark"` on `<html>`, `localStorage` key `podpress-theme`, toggles on `.theme-toggle`, logo swap via `img[data-logo]`. |
| **Navbar (secondary pages)** | `navbar.js`: injects same structure as main site; desktop Features mega-menu; mobile drawer; scroll state on `#navbar`. |
| **Design tokens** | CSS variables in `pages.css` / `index.html`: `--ink`, `--porcelain`, `--slate`, `--ampersand`, `--cornflower`, `--surface`, `--border`, `--text-muted`, etc.; dark overrides under `[data-theme="dark"]`. |
| **Premium feel** | `premium.js`: custom cursor (non-touch), scroll-reveal helpers, optional shimmer classes. |
| **Outbound product links** | CTAs point to `https://app.podpress.so/signup` and login URLs. |

---

## 4. Information Architecture (Site Map)

### 4.1 Core pages

- **Home**: `index.html`
- **Feature / SEO pages**: transcript, YouTube, RSS, blog, FAQ, insights, repurposing, automation, AI newsletter generator, newsletter software, transcript generator, podcast newsletter guide, what is a newsletter, integrations, email branding, email campaigns
- **Legal**: `privacy.html`, `terms.html`

### 4.2 Typical visitor flow (user flow)

```text
Organic / paid / referral
    → Landing (index.html) or long-tail feature page
    → Scroll sections (value → workflow → proof → price)
    → FAQ / objections
    → CTA: Sign up free / trial (app.podpress.so)
```

**Secondary-page flow**

```text
SEO landing (e.g. youtube-to-newsletter.html)
    → Read hero + sections
    → Navbar: Features mega-menu → other pages or index anchors
    → CTA → app
```

---

## 5. Product Workflows (Conceptual — As Presented on Site)

These workflows describe **how PodPress is positioned to work** for a creator. They align with landing copy and with the gap-analysis / feature-page specs used in the project.

### 5.1 End-to-end content pipeline (canonical story)

```text
INPUT
  ├─ Audio upload (MP3/WAV)
  ├─ RSS feed (episodes sync)
  └─ YouTube URL (extract → transcribe)

TRANSCRIPT (source of truth)
  ├─ Timestamps, speakers
  ├─ Edit inline
  └─ Export TXT / SRT

AI & TEMPLATES
  ├─ Newsletter formats (brief, detailed, summary, highlights, …)
  └─ Repurposing (FAQ, insights, blog angles, custom prompts)

OUTPUT & BRAND
  ├─ Email design presets
  ├─ Branding (logo, colors, sections)
  └─ Preview before send

DISTRIBUTION
  ├─ Bulk email campaigns (lists, CSV, send, analytics) — in-app story
  └─ Integrations (Beehiiv, Mailchimp, Medium, Discord, Telegram, X)

MEASUREMENT
  └─ Campaign analytics (opens, clicks, bounces, etc.) — as described on pricing / campaign pages
```

### 5.2 “How it works” (3-step mental model on site)

1. **Add input** — RSS, file, or YouTube episode.
2. **AI structures content** — From transcript toward newsletter sections and derivatives.
3. **Export and send** — Either send in-app (campaigns) or push to connected platforms.

### 5.3 Integration workflow (distribution)

1. User connects a provider (Telegram, Discord, Medium, Beehiiv, X, Mailchimp — as listed on site).
2. User generates or selects a newsletter.
3. User publishes or posts to the chosen channel (exact UI lives in the app; marketing pages describe outcomes).

### 5.4 Email campaign workflow (as documented in project specs)

1. Build or import contact lists (CSV with standard columns).
2. Select newsletter + email design / branding.
3. Prepare send (dedupe, validation).
4. Send in batches; track delivery and engagement.

### 5.5 Email branding workflow

1. Choose a design preset.
2. Set logo (upload or URL), brand name, section colors (header, body, CTA, footer).
3. Preview desktop/mobile; save profile for future sends.

---

## 6. Business Logic (Positioning & Rules)

This section is **business and product logic** as encoded in marketing and docs—not server code in this repo.

### 6.1 Value proposition hierarchy

1. **Speed** — Draft in minutes, not hours.
2. **Trust** — Transcript-first generation.
3. **Breadth** — One episode → many assets.
4. **Ownership** — Branding and direct sends, not only exports.
5. **Reach** — Integrations for where audiences already are.

### 6.2 Pricing narrative (from landing page)

- Tiers: Starter (free), Creator, Creator Pro, Business — differentiated by episode limits, AI depth, exports, branding, RSS sync, analytics, support, team features.
- **Business logic implied**: freemium → paid expansion as usage and professionalism increase.

### 6.3 Differentiation vs “plain AI writer”

- Podcast-specific inputs (RSS, audio, YouTube).
- Operational loop: transcript → templates → brand → send → analytics.
- Distribution connectors, not only a text editor.

### 6.4 Compliance and trust (site layer)

- Legal pages (`privacy.html`, `terms.html`) support compliance narrative.
- Marketing claims should stay aligned with actual app capabilities (see gap analysis doc in repo).

---

## 7. Landing Page Structure (index.html) — Logical Order

The recommended narrative order (also reflected in `LANDING_PAGE_SECTION_ORDER.md` when applied) is:

1. Navbar + hero + marquee  
2. Why PodPress (promise / stats)  
3. How it works (3 steps)  
4. Deep dives: Transcript → Repurposing → Email branding → Bulk campaigns → YouTube  
5. Supported integrations  
6. Features bento grid  
7. Scalability / use cases  
8. Testimonials  
9. Pricing  
10. FAQ  
11. CTA  
12. Footer  

**Anchors** used for in-page navigation: `#features`, `#how-it-works`, `#pricing`, `#faq`, plus section IDs such as `#transcript`, `#templates`, `#branding`, `#campaigns`, `#youtube`, `#supported-integrations`, `#testimonials`.

---

## 8. Design System (Summary)

**Core tokens (light)** — see `pages.css` / `index.html` `:root`:

- `--ink` `#111111` — primary text  
- `--porcelain` `#F7F5F2` — warm background  
- `--slate` `#2B2F36` — secondary / UI chrome  
- `--ampersand` `#FF5A1F` — primary CTA / accent orange  
- `--cornflower` `#3A67FF` — secondary accent blue  
- `--surface` `#FFFFFF` — cards / panels  
- `--border` `#DDD9D3` — borders  
- `--text-muted` `#6B6560` — supporting text  

**Dark mode** — `[data-theme="dark"]` flips surfaces, borders, and text for low-light contrast.

**Components**: buttons (`.btn`, `.btn-primary`, `.btn-ghost`), cards, bento grid, FAQ accordion, pricing cards, mega-menu for Features.

---

## 9. Operational Notes for Maintainers

### 9.1 Run locally

```bash
python serve.py
```

Then open the served URL (default `http://localhost:3000`).

### 9.2 Consistency checklist when adding a page

- Include `pages.css`, `theme.js`, and usually `navbar.js` + `premium.js` to match siblings.
- Use the same CSS variables for colors.
- Point primary CTAs to `https://app.podpress.so/signup` (or current production URLs).
- Keep `data-logo` on logo images for dark mode.

### 9.3 Related documentation in repo

- `LANDING_PAGE_FEATURE_GAP_ANALYSIS.md` — Landing vs app feature coverage and priorities.
- `LANDING_PAGE_SECTION_ORDER.md` (if present under Visiata path) — Recommended section ordering for conversion.

---

## 10. Glossary

| Term | Meaning |
|------|---------|
| **Transcript studio** | Editable transcript as source for downstream AI content. |
| **Repurposing / templates** | Multiple structured outputs from one episode. |
| **Bulk campaigns** | In-app email sends to lists, with analytics story. |
| **Integrations** | Push content to external platforms with connected credentials (as described on site). |
| **Bento** | Marketing grid of secondary capabilities (AI summary, RSS sync, languages, etc.). |

---

## 11. One-Line Summary

**PodPress** turns podcast episodes into **transcript-grounded, multi-format, brandable content** and helps creators **send or publish** it—**this repository** delivers the **public story, SEO pages, and design system** that drive users to the **live application**.

---

*Generated from the PodPress-Project workspace structure, shared styles/scripts, and in-repo marketing and gap-analysis documentation. Update this file when major sections, URLs, or product claims change.*
