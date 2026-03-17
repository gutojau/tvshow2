// ============================================================
//  ODONTOLOGIA BERRO — Mídia Indoor v2.0
//  Edite este arquivo para personalizar o sistema
// ============================================================

const CONFIG = {

  // ── YouTube ──────────────────────────────────────────────────
  // Cole aqui o ID da playlist do YouTube
  // Ex: se a URL for youtube.com/playlist?list=PLxxx, o ID é PLxxx
  youtubePlaylistId: "PLjpxZx8rM_9C08WxhvMd3Capyx6ikMrkS",

  // Parâmetros extras do player YouTube (não alterar sem necessidade)
  // autoplay=1, loop=1, controls=0 = sem controles, rel=0 = sem vídeos relacionados
  youtubeParams: "autoplay=1&loop=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0",

  // ── Localização para o clima ──────────────────────────────────
  location: {
    name: "Jaú, SP",
    lat:  -22.2956,
    lon:  -48.5583,
  },

  // ── Notícias ──────────────────────────────────────────────────
  // Fontes RSS carregadas do feeds.json (edite feeds.json no GitHub)
  newsRefresh:    15 * 60 * 1000,  // atualiza a cada 15 minutos
  newsInterval:   10 * 1000,       // troca notícia a cada 10 segundos
  newsPerFeed:    5,                // notícias por fonte RSS

};
