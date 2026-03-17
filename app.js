// ============================================================
//  ODONTOLOGIA BERRO — Mídia Indoor v2.0 — app.js
// ============================================================

// ── RELÓGIO ──────────────────────────────────────────────────
(function Clock() {
  const clk  = document.getElementById("clock");
  const date = document.getElementById("date-display");
  function tick() {
    const n  = new Date();
    const hh = String(n.getHours()).padStart(2,"0");
    const mm = String(n.getMinutes()).padStart(2,"0");
    const ss = String(n.getSeconds()).padStart(2,"0");
    clk.textContent  = hh+":"+mm+":"+ss;
    date.textContent = n.toLocaleDateString("pt-BR",{
      weekday:"short",day:"2-digit",month:"short",year:"numeric"});
  }
  tick();
  setInterval(tick, 1000);
})();

// ── CLIMA ────────────────────────────────────────────────────
(function Weather() {
  const WMO = {
    0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",48:"🌫",
    51:"🌦",53:"🌦",55:"🌧",61:"🌧",63:"🌧",65:"🌧",
    71:"🌨",73:"🌨",75:"🌨",80:"🌦",81:"🌧",82:"⛈",
    95:"⛈",96:"⛈",99:"⛈"
  };
  async function load() {
    try {
      const { lat, lon } = CONFIG.location;
      const r = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude="+lat+
        "&longitude="+lon+"&current_weather=true&hourly=relativehumidity_2m"+
        "&timezone=auto&forecast_days=1"
      );
      const d = await r.json();
      const h = new Date().getHours();
      document.getElementById("wx-temp").textContent =
        Math.round(d.current_weather.temperature)+"°C";
      document.getElementById("wx-hum").textContent =
        (d.hourly?.relativehumidity_2m?.[h] ?? "—")+"%";
      document.getElementById("wx-emoji").textContent =
        WMO[d.current_weather.weathercode] || "🌡";
    } catch(e) {}
  }
  load();
  setInterval(load, 10 * 60 * 1000);
})();

// ── YOUTUBE PLAYER ────────────────────────────────────────────
(function YouTubePlayer() {
  const splash  = document.getElementById("splash");
  const noVideo = document.getElementById("no-video");
  const player  = document.getElementById("yt-player");

  const pid = CONFIG.youtubePlaylistId;

  // Valida playlist ID
  if (!pid || pid.startsWith("PLxxx")) {
    player.style.display  = "none";
    noVideo.style.display = "flex";
    splash.classList.add("off");
    return;
  }

  // Monta URL do embed com playlist
  // listType=playlist&list=ID faz o YouTube carregar e loopar a playlist
  const params = CONFIG.youtubeParams +
    "&listType=playlist&list=" + pid;
  player.src = "https://www.youtube.com/embed/videoseries?" + params;

  // Splash: exige interação para autoplay com som
  function start() {
    splash.classList.add("off");
    // Recarrega o src adicionando autoplay após interação do usuário
    player.src = "https://www.youtube.com/embed/videoseries?" + params;
  }
  splash.addEventListener("click",     start);
  splash.addEventListener("touchstart", start, { passive: true });
})();

// ── BREAKING NEWS ─────────────────────────────────────────────
(function BreakingNews() {
  const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
  const box = document.getElementById("breaking-content");
  let pool = [];
  let idx  = 0;

  function esc(s) {
    return String(s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function decodeEntities(str) {
    const el = document.createElement("textarea");
    el.innerHTML = str;
    return el.value;
  }

  function cleanTitle(raw) {
    if (!raw) return "";
    let s = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
    s = decodeEntities(s);
    s = s.replace(/�/g, "").replace(/\s+/g, " ").trim();
    return s;
  }

  // Busca feeds.json e depois cada RSS via rss2json
  async function fetchAll() {
    let feedList = [];
    try {
      const r = await fetch("feeds.json?t=" + Date.now());
      const d = await r.json();
      feedList = d.feeds || [];
    } catch(e) {
      console.warn("[News] feeds.json não encontrado:", e.message);
      return [];
    }

    const results = await Promise.allSettled(feedList.map(async f => {
      try {
        const r = await fetch(RSS2JSON + encodeURIComponent(f.url), {
          signal: AbortSignal.timeout(8000)
        });
        if (!r.ok) return [];
        const data = await r.json();
        if (data.status !== "ok" || !data.items) return [];
        return data.items.slice(0, CONFIG.newsPerFeed).map(it => ({
          title:    cleanTitle(it.title || ""),
          category: f.category,
          source:   f.source,
        })).filter(n => n.title);
      } catch(e) {
        console.warn("[News] falhou:", f.source, e.message);
        return [];
      }
    }));

    const all = results.flatMap(r => r.status === "fulfilled" ? r.value : []);
    console.log("[News] pool:", all.length, "notícias");

    // Embaralha
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  function showCurrent() {
    if (!pool.length) return;
    const n = pool[idx % pool.length];
    idx++;
    box.classList.remove("entering");
    void box.offsetWidth;
    box.classList.add("entering");
    box.innerHTML = [
      '<span class="breaking-category">'+esc(n.category)+'</span>',
      '<span class="breaking-title">'+esc(n.title)+'</span>',
      '<span class="breaking-source">'+esc(n.source)+'</span>'
    ].join('');
  }

  async function init() {
    const items = await fetchAll();
    if (items.length) { pool = items; idx = 0; }
    showCurrent();
    setInterval(showCurrent, CONFIG.newsInterval);
    // Refresca pool em background
    setInterval(async () => {
      const fresh = await fetchAll();
      if (fresh.length) pool = fresh;
    }, CONFIG.newsRefresh);
  }

  init();
})();
