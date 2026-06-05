/* ============================================================
   app.js — renders the Miasma Coding Agent Arena from window.NEWS
   Vanilla JS, no build step. Filter + search + sort.
   ============================================================ */
(function () {
  "use strict";

  var DATA = (window.NEWS && window.NEWS.agents) ? window.NEWS : { agents: {}, generatedAt: null };
  var AGENTS = DATA.agents;
  var ORDER = Object.keys(AGENTS); // codex, claude, grok, opencode

  var state = { filter: "all", query: "" };

  var el = {
    arena: document.getElementById("arena"),
    filters: document.getElementById("filters"),
    search: document.getElementById("search"),
    feed: document.getElementById("feed"),
    empty: document.getElementById("empty"),
    updated: document.getElementById("updated")
  };

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtDate(iso) {
    var d = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  }

  function fmtUpdated(iso) {
    if (!iso) return "updated —";
    var d = new Date(iso);
    if (isNaN(d)) return "updated —";
    return "updated " + d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  // Flatten all items into a single dated stream, carrying agent identity.
  function allItems() {
    var out = [];
    ORDER.forEach(function (key) {
      var a = AGENTS[key];
      (a.items || []).forEach(function (it) {
        out.push({
          agent: key,
          agentName: a.name,
          color: a.color,
          date: it.date,
          tag: it.tag,
          title: it.title,
          summary: it.summary,
          url: it.url,
          source: it.source
        });
      });
    });
    out.sort(function (x, y) { return (y.date || "").localeCompare(x.date || ""); });
    return out;
  }

  function matches(item) {
    if (state.filter !== "all" && item.agent !== state.filter) return false;
    if (!state.query) return true;
    var q = state.query.toLowerCase();
    return (
      (item.title || "").toLowerCase().indexOf(q) > -1 ||
      (item.summary || "").toLowerCase().indexOf(q) > -1 ||
      (item.tag || "").toLowerCase().indexOf(q) > -1 ||
      (item.agentName || "").toLowerCase().indexOf(q) > -1 ||
      (item.source || "").toLowerCase().indexOf(q) > -1
    );
  }

  // ---------- arena tiles ----------
  function renderArena() {
    el.arena.innerHTML = ORDER.map(function (key) {
      var a = AGENTS[key];
      var stats = (a.stats || []).map(function (s) {
        return '<div class="stat"><span class="stat__label">' + esc(s.label) +
          '</span><span class="stat__value">' + esc(s.value) + "</span></div>";
      }).join("");
      var count = (a.items || []).length;
      return (
        '<button class="tile" data-agent="' + key + '" style="--agent:' + a.color + '" ' +
        'title="Filter to ' + esc(a.name) + '">' +
          '<div class="tile__head">' +
            '<span class="tile__name">' + esc(a.name) + "</span>" +
            '<span class="tile__vendor">' + esc(a.vendor) + "</span>" +
          "</div>" +
          '<p class="tile__tag">' + esc(a.tagline || "") + "</p>" +
          '<div class="tile__stats">' + stats + "</div>" +
          '<div class="tile__count"><span>dispatches</span><b>' + count + "</b></div>" +
        "</button>"
      );
    }).join("");

    Array.prototype.forEach.call(el.arena.querySelectorAll(".tile"), function (t) {
      t.addEventListener("click", function () {
        var key = t.getAttribute("data-agent");
        state.filter = (state.filter === key) ? "all" : key;
        syncFilters();
        renderFeed();
      });
    });
  }

  // ---------- filter chips ----------
  function renderFilters() {
    var chips = ['<button class="chip" data-filter="all" aria-selected="true">' +
      '<span class="dot" style="--chip:var(--fg-dim)"></span>all</button>'];
    ORDER.forEach(function (key) {
      var a = AGENTS[key];
      chips.push(
        '<button class="chip" data-filter="' + key + '" aria-selected="false" style="--chip:' + a.color + '">' +
        '<span class="dot"></span>' + esc(a.name) + "</button>"
      );
    });
    el.filters.innerHTML = chips.join("");
    Array.prototype.forEach.call(el.filters.querySelectorAll(".chip"), function (c) {
      c.addEventListener("click", function () {
        state.filter = c.getAttribute("data-filter");
        syncFilters();
        renderFeed();
      });
    });
  }

  function syncFilters() {
    Array.prototype.forEach.call(el.filters.querySelectorAll(".chip"), function (c) {
      c.setAttribute("aria-selected", c.getAttribute("data-filter") === state.filter ? "true" : "false");
    });
  }

  // ---------- feed ----------
  var linkSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M10 14L21 3M21 3h-6M21 3v6M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>';

  function renderFeed() {
    var items = allItems().filter(matches);
    if (!items.length) {
      el.feed.innerHTML = "";
      el.empty.hidden = false;
      return;
    }
    el.empty.hidden = true;
    el.feed.innerHTML = items.map(function (it, i) {
      return (
        '<article class="card" style="--agent:' + it.color + ';animation-delay:' + Math.min(i * 28, 400) + 'ms">' +
          '<div class="card__top">' +
            '<span class="badge">' + esc(it.agentName) + "</span>" +
            (it.tag ? '<span class="tag">' + esc(it.tag) + "</span>" : "") +
            '<time class="card__date">' + fmtDate(it.date) + "</time>" +
          "</div>" +
          '<h3 class="card__title">' + esc(it.title) + "</h3>" +
          '<p class="card__summary">' + esc(it.summary) + "</p>" +
          (it.url
            ? '<a class="card__src" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
              linkSvg + esc(it.source || "source") + "</a>"
            : "") +
        "</article>"
      );
    }).join("");
  }

  // ---------- search (debounced) ----------
  var t;
  function onSearch(e) {
    clearTimeout(t);
    var v = e.target.value;
    t = setTimeout(function () { state.query = v.trim(); renderFeed(); }, 90);
  }

  // ---------- boot ----------
  function init() {
    if (!ORDER.length) {
      el.feed.innerHTML = "";
      el.empty.hidden = false;
      el.empty.textContent = "No data loaded — is data.js present?";
      return;
    }
    el.updated.innerHTML = "<strong>" + esc(fmtUpdated(DATA.generatedAt)) + "</strong>";
    renderArena();
    renderFilters();
    renderFeed();
    el.search.addEventListener("input", onSearch);

    // keyboard: "/" focuses search, Esc clears
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== el.search) { e.preventDefault(); el.search.focus(); }
      if (e.key === "Escape" && document.activeElement === el.search) { el.search.value = ""; state.query = ""; renderFeed(); el.search.blur(); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
