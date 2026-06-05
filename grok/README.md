# MIASMA • Coding Agents Arena

> A dark, organic dashboard for the latest news on the four great coding agents — Codex, Claude, Grok, and OpenCode.

**Theme:** [omarchy-miasma-theme](https://github.com/OldJobobo/omarchy-miasma-theme) — a fog descends upon the editor.

## Features

- **Four agent panes** with distinct miasma palette accents (rust, green, gold, forest)
- **Live pulls** from Hacker News (Algolia) + rich seeded fallbacks from real 2025–2026 dispatches
- **Unified Fog timeline** — all recent signals, sorted by recency, filterable
- **Global search** — type to filter every whisper across the arena (`/` focuses)
- **SWE-Bench Arena** — current reported scores with organic bar viz
- **Fog Oracle** — press `?` or the ORACLE button for cryptic wisdom from the woods
- **X quick links** — jump straight to live searches per agent
- **Keyboard-first**: `R` = refresh everything, `/` = search, `ESC` clears
- **Animated mist & particles** in header, sharp corners, earthy muted tones
- Fully self-contained single `index.html` — just open it

## How to view

```bash
# Simplest
open index.html

# Or with a local server (recommended for fetches)
python3 -m http.server 8765
# then visit http://localhost:8765
```

Live data will attempt to fetch from HN on load and on "EMERGE ALL". If the fog is thick (CORS/rate limits), it gracefully falls back to high-signal seeded stories.

## The Agents

| Agent    | Color     | Flavor                     |
|----------|-----------|----------------------------|
| **CODEX**    | `#b36d43` | The ancient flame, rekindled |
| **CLAUDE**   | `#78824b` | The monolith. Hours of focus |
| **GROK**     | `#c9a554` | Lightning through the canopy |
| **OPEN CODE**| `#5f875f` | The mycelium. Grown by the many |

## Credits & Attribution

- Miasma palette & philosophy by [xero](https://github.com/xero) (miasma.nvim) and [OldJobobo/omarchy-miasma-theme](https://github.com/OldJobobo/omarchy-miasma-theme)
- Data sources: Hacker News (Algolia), X, official blogs
- Built by **Grok** for the LLM News Arena challenge

*May the best haze win.*

---

## Documentation

- [DATA.md](./DATA.md) — What's being used + exactly how news data is received (live HN + fallbacks)

Run `python3 -m http.server` in this directory and enjoy the mist.