# AI Coding Agents Dashboard

## Stack

- **Single-file HTML** — no frameworks, no build step, no dependencies
- **Google Fonts** — JetBrains Mono (display + body)
- **Inline CSS** — custom properties, CSS grid, animations/transitions
- **Vanilla JS** — rendering, date display, scanning effect

## Theme

**Omarchy Miasma** by OldJobobo — a dark, organic palette built for Hyprland/Omarchy.

| Token | Hex |
|-------|-----|
| Background | `#222222` |
| Foreground | `#c2c2b0` |
| Accent | `#78824b` |
| Gold | `#c9a554` |
| Rust | `#685742` |
| Copper | `#bb7744` |
| Green | `#5f875f` |

Effects: scan-line overlay, SVG noise texture, glitch hover, pulsing cursor, radial vignette glow.

## Data Pipeline

1. **Web search** queries for each agent (`opencode codex latest news 2026`, etc.) via websearch tool
2. Top ~5 results per agent collected → deduplicated → ranked by recency
3. Titles, dates, snippets, and URLs extracted from search result excerpts
4. Hardcoded into JS data array — no runtime API calls, no CORS issues
5. Each agent card renders 4 news items with date, title, snippet, and external link

## Agents Tracked

| Agent | Provider | Latest Model |
|-------|----------|-------------|
| Codex | OpenAI | GPT-5.5 / GPT-5.3-Codex |
| Claude | Anthropic | Opus 4.8 / Sonnet 4.6 |
| Grok | xAI | Grok 4.3 / Grok Build 0.1 |
| OpenCode | Open Source (MIT) | Multi-provider (75+ models) |
