# How it works

Short notes on **what's used** and **how data is received**.

## What's being used

| Layer | Choice | Why |
|-------|--------|-----|
| Markup | Plain HTML5 | One static page, no framework needed |
| Styling | Hand-written CSS (`styles.css`) | Exact Miasma palette, fog + grain effects, custom properties |
| Logic | Vanilla JS (`app.js`) | Render, filter, search — no build step, no dependencies |
| Data | JS object + JSON (`data.js` / `news.json`) | Loads on `file://` with no server or CORS |
| Refresher | Node.js ESM (`refresh.mjs`) | Built-in `fetch` only — zero npm dependencies (Node 18+) |
| Fonts | Cormorant Garamond + JetBrains Mono (Google Fonts) | Degrade to system serif/mono offline |

No bundler, no package.json, no install. Open the file or serve the folder.

## How data is received

There are **two sources**, and the dashboard always reads from the same local file.

```
                 (1) curated seed                 (2) live refresh
                 ───────────────                  ───────────────
  web reporting ──► data.js / news.json ◄── node refresh.mjs ──► GitHub
   (one-time,        (canonical store)      (on demand)        releases.atom
    hand-checked)            │                                 per-agent feed
                             ▼
                          app.js  ──reads window.NEWS──►  index.html (browser)
```

1. **Seed (already in place).** The initial 20 dispatches were gathered from
   public reporting on 2026-06-05 and written into `data.js` (and mirrored to
   `news.json`). Every item carries its `url` + `source`, so the page links back
   to the original.

2. **Live refresh (on demand).** Running `node refresh.mjs`:
   - reads `news.json` as the canonical store,
   - for each agent with a `repo`, fetches `https://github.com/<repo>/releases.atom`,
   - parses the Atom XML (regex, no parser dep) into `{date, title, summary, url}`,
   - merges live releases with the curated seed, dedupes by URL/title, sorts
     newest-first, caps per agent,
   - rewrites `news.json` **and** regenerates `data.js`.

   Agents without a public repo feed (Grok) keep their curated items. If a feed
   fails, that agent is left untouched — the page never breaks.

3. **The browser** only ever loads `data.js`, which sets `window.NEWS`. `app.js`
   reads that object, flattens all agents into one dated stream, and renders the
   arena tiles + feed. No network calls happen at page load (besides fonts).

### Feed endpoints used by the refresher

| Agent | Source |
|-------|--------|
| Codex | `github.com/openai/codex/releases.atom` |
| Claude | `github.com/anthropics/claude-code/releases.atom` |
| Grok | *(no public repo — curated only)* |
| OpenCode | `github.com/anomalyco/opencode/releases.atom` |
