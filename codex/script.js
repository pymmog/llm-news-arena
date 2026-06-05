const agents = [
  {
    name: "Codex",
    glyph: "cx",
    accent: "#c9a554",
    status: "Cloud + app command center",
    brief:
      "OpenAI's Codex has moved from cloud coding tasks into a multi-agent app with local tooling, IDE, browser, and broader workflow support.",
    source: "https://openai.com/index/codex-for-almost-everything/",
  },
  {
    name: "Claude",
    glyph: "cc",
    accent: "#b36d43",
    status: "Claude Code dynamic workflows",
    brief:
      "Anthropic is pushing Claude Code with stronger Opus releases, dynamic workflows, checkpoints, IDE work, and larger autonomous coding surfaces.",
    source: "https://www.anthropic.com/news/claude-opus-4-8",
  },
  {
    name: "Grok",
    glyph: "gx",
    accent: "#c2c2b0",
    status: "Code Fast model lane",
    brief:
      "xAI's code story centers on Grok Code Fast and broader Grok model cards describing reasoning, coding, multimodal, and multi-agent capabilities.",
    source: "https://data.x.ai/2025-08-26-grok-code-fast-1-model-card.pdf",
  },
  {
    name: "OpenCode",
    glyph: "oc",
    accent: "#78824b",
    status: "Open source terminal agent",
    brief:
      "OpenCode presents itself as an open-source coding agent for terminal, IDE, and desktop use, with multi-session work and broad model-provider support.",
    source: "https://opencode.ai/",
  },
];

const news = [
  {
    agent: "Claude",
    date: "May 28, 2026",
    title: "Claude Opus 4.8 adds dynamic workflows to Claude Code",
    body:
      "Anthropic says Claude Code gained dynamic workflows for very large-scale problems alongside the Opus 4.8 release and lower-cost fast mode.",
    tags: ["model", "workflow", "coding"],
    source: "https://www.anthropic.com/news/claude-opus-4-8",
  },
  {
    agent: "Codex",
    date: "April 16, 2026",
    title: "Codex expands beyond coding into a broader workbench",
    body:
      "OpenAI describes Codex as operating across the software lifecycle with computer use, app integrations, image generation, memory, SSH devboxes, file and terminal views, and an in-app browser.",
    tags: ["app", "computer-use", "workflow"],
    source: "https://openai.com/index/codex-for-almost-everything/",
  },
  {
    agent: "Grok",
    date: "April 7, 2026",
    title: "Grok 4.20 model card highlights reasoning and coding coverage",
    body:
      "xAI's Grok 4.20 system card describes advanced reasoning, multi-agent capabilities, and support for use cases including coding and multimodal reasoning.",
    tags: ["model-card", "reasoning", "coding"],
    source: "https://data.x.ai/2026-04-07-grok-4-20-model-card.pdf",
  },
  {
    agent: "OpenCode",
    date: "June 2026",
    title: "OpenCode promotes desktop beta and Zen model access",
    body:
      "The OpenCode site currently advertises a desktop beta for macOS, Windows, and Linux, plus Zen access to coding-agent-tested models.",
    tags: ["desktop", "open-source", "models"],
    source: "https://opencode.ai/",
  },
  {
    agent: "Codex",
    date: "March 4, 2026",
    title: "Codex app availability expands to Windows",
    body:
      "OpenAI's Codex app announcement notes a Windows availability update after the initial macOS launch, emphasizing multi-agent management and isolated work copies.",
    tags: ["desktop", "multi-agent", "windows"],
    source: "https://openai.com/index/introducing-the-codex-app/",
  },
  {
    agent: "Claude",
    date: "February 20, 2026",
    title: "Claude Code Security enters limited research preview",
    body:
      "Anthropic introduced Claude Code Security on the web to scan codebases for vulnerabilities and suggest targeted patches for human review.",
    tags: ["security", "web", "patches"],
    source: "https://www.anthropic.com/news/claude-code-security",
  },
  {
    agent: "Grok",
    date: "August 26, 2025",
    title: "Grok Code Fast 1 targets coding applications",
    body:
      "xAI's model card describes Grok Code Fast 1 as a fast reasoning model designed for coding applications and trained with a coding-focused mixture.",
    tags: ["code-model", "speed", "reasoning"],
    source: "https://data.x.ai/2025-08-26-grok-code-fast-1-model-card.pdf",
  },
  {
    agent: "OpenCode",
    date: "June 2026",
    title: "OpenCode emphasizes LSP, multi-session, and provider choice",
    body:
      "OpenCode's product page highlights automatic LSP loading, multiple parallel agents on the same project, share links, and support for many model providers.",
    tags: ["terminal", "lsp", "multi-session"],
    source: "https://opencode.ai/",
  },
];

const sources = [
  {
    name: "Miasma Theme",
    url: "https://github.com/OldJobobo/omarchy-miasma-theme",
    note: "The requested Omarchy Miasma theme reference used for the dark terminal palette.",
  },
  {
    name: "OpenAI Codex",
    url: "https://openai.com/index/codex-for-almost-everything/",
    note: "Codex product updates and capability notes.",
  },
  {
    name: "Anthropic Claude Code",
    url: "https://www.anthropic.com/news/claude-opus-4-8",
    note: "Claude Code and Opus release coverage.",
  },
  {
    name: "xAI model cards",
    url: "https://data.x.ai/2025-08-26-grok-code-fast-1-model-card.pdf",
    note: "Grok Code Fast and Grok model capability references.",
  },
  {
    name: "OpenCode",
    url: "https://opencode.ai/",
    note: "OpenCode product, installation, desktop beta, and feature claims.",
  },
];

const agentByName = Object.fromEntries(agents.map((agent) => [agent.name, agent]));
const agentGrid = document.querySelector("#agentGrid");
const timeline = document.querySelector("#timeline");
const sourceGrid = document.querySelector("#sourceGrid");
const chips = document.querySelectorAll(".chip");
const searchInput = document.querySelector("#searchInput");
let activeFilter = "all";

function renderAgents() {
  agentGrid.innerHTML = agents
    .map(
      (agent) => `
        <article class="agent-card" style="--accent: ${agent.accent}">
          <div class="agent-meta">
            <span>${agent.status}</span>
            <span class="agent-glyph">${agent.glyph}</span>
          </div>
          <h3>${agent.name}</h3>
          <p>${agent.brief}</p>
          <a class="agent-link" href="${agent.source}" target="_blank" rel="noreferrer">open source -></a>
        </article>
      `,
    )
    .join("");
}

function matchesSearch(item, query) {
  if (!query) return true;
  const haystack = `${item.agent} ${item.title} ${item.body} ${item.tags.join(" ")}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderNews() {
  const query = searchInput.value.trim();
  const filtered = news.filter((item) => {
    const filterMatch = activeFilter === "all" || item.agent === activeFilter;
    return filterMatch && matchesSearch(item, query);
  });

  timeline.innerHTML =
    filtered
      .map((item) => {
        const agent = agentByName[item.agent];
        return `
          <article class="news-card" style="--accent: ${agent.accent}">
            <div class="date-block">
              <span>${item.date}</span>
              <span class="agent-pill">${item.agent}</span>
            </div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
              <div class="tag-row">
                ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              </div>
              <a class="news-link" href="${item.source}" target="_blank" rel="noreferrer">Read source</a>
            </div>
          </article>
        `;
      })
      .join("") || `<div class="empty">No matching signal. Clear filters or search again.</div>`;
}

function renderSources() {
  sourceGrid.innerHTML = sources
    .map(
      (source) => `
        <article class="source-card">
          <a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>
          <p>${source.note}</p>
        </article>
      `,
    )
    .join("");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle("is-active", item === chip));
    renderNews();
  });
});

searchInput.addEventListener("input", renderNews);

renderAgents();
renderNews();
renderSources();
