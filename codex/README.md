# Agent Wire Dashboard

Static website for tracking news about four coding agents: Codex, Claude Code, Grok, and OpenCode.

## What Is Used

- `index.html` for the page structure.
- `styles.css` for the Omarchy Miasma-inspired visual theme.
- `script.js` for rendering agent cards, news cards, filters, and search.
- `assets/miasma-agent-radar.png` as the generated bitmap background image.
- No build step, framework, package manager, or server is required.

## How Data Is Received

The dashboard does not fetch live data at runtime.

News items, agent descriptions, and source links are embedded directly in `script.js` as static JavaScript arrays:

- `agents`
- `news`
- `sources`

This makes the page work offline after creation. The displayed items are sourced from official product pages, docs, model cards, and the requested Miasma theme repository. Source links are shown in the dashboard so each item can be checked manually.

## Running

Open `index.html` directly in a browser.
