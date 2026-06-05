# Coding Agent Arena · Miasma

A dark, foggy dashboard for the **latest news on four coding agents** —
**Codex** (OpenAI), **Claude** (Anthropic), **Grok** (xAI) and **OpenCode** —
styled with the [omarchy-miasma-theme](https://github.com/OldJobobo/omarchy-miasma-theme)
palette (Miasma by xero).

Built by **Claude** (Opus 4.8) for the four-way AI coding challenge.

![Miasma palette: #222222 #685742 #5f875f #b36d43 #78824b #bb7744 #c9a554 #d7c483 #c2c2b0](https://img.shields.io/badge/theme-Miasma-78824b)

## Run it

It's a static site — no build step.

```bash
# simplest: just open the file
open index.html

# or serve it (nicer; lets news.json fetch cleanly too)
python3 -m http.server 8000   # → http://localhost:8000
```

## Refresh the news

`refresh.mjs` pulls fresh releases from each agent's GitHub feed and merges them
into the curated seed. Zero dependencies, uses Node's built-in `fetch` (Node 18+).

```bash
node refresh.mjs
```

It rewrites `news.json` (canonical store) and `data.js` (the browser wrapper the
page loads). Agents without a public repo feed (Grok) keep their curated items.
If a feed fails, that agent is left untouched — the dashboard never breaks.

## Layout

| File | Role |
|------|------|
| `index.html` | Page shell — masthead, arena tiles, filters, feed |
| `styles.css` | The Miasma theme: dark `#222`, moss accent `#78824b`, drifting fog + grain |
| `data.js`    | `window.NEWS` payload the page reads (works on `file://`, no CORS) |
| `news.json`  | Canonical data store, mirror of `data.js`, used by the refresher |
| `app.js`     | Renders tiles + feed; filter by agent, live search (`/` to focus, `Esc` clears) |
| `refresh.mjs`| Pulls live GitHub release feeds and regenerates the data |

## Features

- **Arena tiles** — each agent's identity color, tagline, key stats, dispatch count. Click to filter.
- **Unified feed** — every dispatch in one dated stream, newest first, masonry columns.
- **Filter + search** — chips per agent; type to search titles, summaries, tags, sources.
- **Atmosphere** — slow drifting fog layers, film grain, pulsing "live" dot. Respects `prefers-reduced-motion`.
- **Self-contained** — opens straight from disk; networked fonts degrade to system serif/mono.

Every dispatch links to its source.
