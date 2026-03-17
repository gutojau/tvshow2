# tvshow2
MIDIA INDOOR - 2.0
🦷 Odontologia Berro — Mídia Indoor v2.0
Sistema de mídia indoor para exibição em Smart TV, hospedado no GitHub Pages.
Exibe vídeos do YouTube, clima em tempo real e notícias RSS no rodapé.

📁 Estrutura do Repositório
📁 repositório/
├── index.html            ← página principal
├── style.css             ← todo o visual / layout
├── app.js                ← lógica: clock, clima, YouTube, notícias
├── config.js             ← configurações gerais (edite aqui)
├── feeds.json            ← fontes RSS das notícias (edite aqui)
├── odontologia-berro.png ← logomarca
└── README.md             ← este arquivo

⚙️ Configuração
1. Playlist do YouTube
Abra o config.js e cole o ID da sua playlist:
jsyoutubePlaylistId: "PLxxxxxxxxxxxxxxx",
O ID está na URL da playlist:
https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxx

A playlist deve estar configurada como Pública ou Não listada no YouTube Studio.


2. Fontes de Notícias
Edite o arquivo feeds.json diretamente no GitHub.
Adicione, remova ou altere fontes RSS conforme necessário:
json{
  "feeds": [
    {
      "url": "https://feeds.bbci.co.uk/portuguese/rss.xml",
      "source": "BBC Brasil",
      "category": "Mundo"
    },
    {
      "url": "https://g1.globo.com/rss/g1/",
      "source": "G1",
      "category": "Brasil"
    }
  ]
}
Fontes configuradas atualmente:
FonteCategoriaFeedBBC BrasilMundofeeds.bbci.co.uk/portugueseG1Brasilg1.globo.com/rss/g1CanaltechTecnologiacanaltech.com.br/rssJornal USPCiênciajornal.usp.br/feed

3. Localização do Clima
No config.js, ajuste as coordenadas:
jslocation: {
  name: "Jaú, SP",
  lat:  -22.2956,
  lon:  -48.5583,
},
Use o Google Maps para encontrar lat/lon de qualquer cidade.
O clima é fornecido pela API Open-Meteo — gratuita, sem cadastro.

🚀 Publicação no GitHub Pages

Faça o upload de todos os arquivos para um repositório público
Vá em Settings → Pages
Em Source, selecione Deploy from a branch
Escolha a branch main e pasta / (root)
Clique em Save
Aguarde ~5 minutos e acesse:
https://seuusuario.github.io/nome-do-repositorio/


📺 Como Usar na Smart TV

Abra o navegador da TV
Acesse o link https://seuusuario.github.io/nome-do-repositorio/
Aparecerá a tela "Toque para iniciar" — pressione OK no controle
Os vídeos da playlist começarão a reproduzir com áudio
As notícias aparecem no rodapé e trocam a cada 10 segundos


Dica: Adicione a página aos favoritos da TV para acesso rápido.


🔧 Ajustes Finos (config.js)
ParâmetroPadrãoDescriçãoyoutubePlaylistId—ID da playlist do YouTubelocation.lat/lonJaú, SPCoordenadas para o climanewsRefresh15 minIntervalo de atualização do RSSnewsInterval10 segTempo entre cada notícia no rodapénewsPerFeed5Notícias buscadas por fonte

🌐 Dependências Externas
ServiçoUsoCustoYouTube EmbedPlayer de vídeoGratuitoGoogle FontsTipografia (Montserrat, Syne, DM Sans)GratuitoOpen-MeteoDados de climaGratuito, sem API keyrss2json.comConversão RSS → JSON (sem CORS)Gratuito (até 10k req/dia)GitHub PagesHospedagemGratuito

❗ Observações Importantes
YouTube e autoplay:
Browsers modernos bloqueiam autoplay com som sem interação do usuário.
Por isso existe a tela "Toque para iniciar" — após um clique/toque, o vídeo roda normalmente.
YouTube em Smart TVs Samsung (Tizen):
Alguns firmwares mais antigos podem bloquear o embed do YouTube.
Nesse caso, abra o link direto no navegador nativo da TV.
Notícias offline:
Se a TV não tiver internet, o rodapé exibirá "Carregando notícias…" mas os vídeos do YouTube também dependerão de conexão.
Limite do rss2json:
O plano gratuito suporta até 10.000 requisições/dia — mais que suficiente para uso contínuo.

📝 Atualizando Conteúdo
O que atualizarOnde editarTrocar playlist de vídeosconfig.js → youtubePlaylistIdAdicionar/remover fonte de notíciasfeeds.jsonMudar cidade do climaconfig.js → locationAlterar velocidade das notíciasconfig.js → newsIntervalMudar logoSubstituir odontologia-berro.png
Após qualquer edição no GitHub, aguarde ~2 minutos para o GitHub Pages atualizar.
Na TV, pressione F5 ou recarregue a página para ver as mudanças.

Odontologia Berro — Mídia Indoor v2.0
