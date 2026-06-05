# MIASMA Dashboard — Tech & Data

Short reference for what's used and how news data flows.

## Stack (all client-side, zero install)

- **Single-file website**: `index.html` (HTML + inline CSS + vanilla JS)
- **Styling**: Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- **Icons**: Font Awesome 6.5.1 via CDN
- **Fonts**: Google Fonts (IBM Plex Mono + Space Grotesk) via `@import`
- **Theme**: Miasma palette taken from [omarchy-miasma-theme](https://github.com/OldJobobo/omarchy-miasma-theme)
  - Core colors: `#222222` (bg), `#c2c2b0` (fg), `#78824b` (accent green), `#c9a554` (gold), `#b36d43` (rust), `#5f875f` (forest), etc.
- **Animations**: Pure CSS (fog drift, mist, particle drift)
- **No frameworks, no build, no backend, no runtime deps**

## How Data Is Received

### Live Data (primary)
- **Source**: Hacker News Algolia search API (public, CORS-enabled, no key)
- **Endpoint**:
  ```
  https://hn.algolia.com/api/v1/search_by_date
    ?query=...&tags=story&hitsPerPage=5
  ```
- **Per-agent queries** (tuned for relevance):
  - Codex: `codex (openai OR coding OR agent OR "swe-bench")`
  - Claude: `("claude code" OR "claude opus" OR "opus 4" OR "claude 4") (coding OR agent OR swe)`
  - Grok: `("grok build" OR "grok-code-fast" OR "grok code") (coding OR agent OR swe)`
  - OpenCode: `opencode (agent OR "coding agent" OR cli OR tui)`
- **Flow**:
  1. On load: immediately render using built-in fallbacks.
  2. ~400ms later: background `fetchForAgent()` calls for all 4 agents.
  3. Successful live results replace the agent's feed + unified timeline is re-rendered.
  4. Manual triggers: "EMERGE ALL" button or per-pane "PULL" button.

### Fallback / Seeded Data
- Hard-coded `FALLBACKS` object in the JS.
- Contains high-signal recent items (official announcements, major HN stories, SWE-bench results, etc.) from 2025–2026.
- Used when:
  - Page first loads (instant UI)
  - Live fetch fails / is blocked / returns nothing useful
  - To guarantee good content even offline or under rate limits

### Other "Data" Sources (not fetched)
- **X (Twitter)**: Constructed live search URLs only (`https://x.com/search?q=...&f=live`). No direct API calls.
- **Official dispatches**: Static links per agent (Anthropic blog, x.ai, opencode.ai, OpenAI, etc.).
- **SWE-Bench Arena**: Static reported scores + visual bars (sourced from public leaderboards + announcements at build time).
- **Fog Oracle**: Static array of flavor text (purely cosmetic).

### Client-side Behavior
- All filtering (global search, "FOCUS" per agent) is done in the browser on the current in-memory items.
- `allNews` object holds the live/fallback items per agent.
- `unifiedItems` is derived and re-sorted on every update.
- No persistence (except browser cache of the HTML itself).
- Stats (per-agent counts + total whispers) are computed from whatever is currently loaded.

### Error Handling
- Every live fetch is wrapped in `try/catch`.
- Failures are silent — the pane simply keeps its fallback content.
- Console only gets a friendly note on first load.

## Summary
Everything is static + public web APIs.  
The page is instantly usable from fallbacks, then "wakes up" with fresher HN stories in the background.  
No keys, no server, no tracking, works great when opened directly as a file or served locally.

---

Built for the LLM News Arena challenge using the Miasma aesthetic.