/*
 * blog-posts.js
 * -------------
 * Fonte única dos posts do blog — usada pela prévia na home (index.html),
 * pela grade completa (blog.html) e pela página de post individual
 * (post.html). Para adicionar um post novo, basta duplicar um objeto aqui;
 * nenhuma outra página precisa ser tocada.
 *
 * Campos:
 *   slug      — identificador único na URL (post.html?slug=...)
 *   categoria — "livro" | "filme" | "profissional"
 *   tipoLabel — texto do badge (emoji + rótulo)
 *   titulo, meta, data — exibidos no card e no post
 *   cover     — caminho da imagem de capa, ou null (usa um fundo
 *               degradê com ícone, gerado em CSS, por categoria)
 *   resumo    — texto curto (aparece no card)
 *   texto     — texto completo (aparece na página do post). Quando não
 *               há conteúdo adicional além do resumo, repete o mesmo texto.
 */
const BLOG_POSTS = [
  {
    slug: "qa-urnas-vs-qa-software",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "QA de urnas eletrônicas vs. QA de software",
    meta: "Reflexão · Carreira",
    data: "Publicado em 2026",
    cover: null,
    resumo:
      'Testar hardware e software sob protocolo do TSE me fez perceber o quanto um checklist bem desenhado previne retrabalho — hoje levo essa mesma disciplina de rastreabilidade para testes de funcionalidades de software, em vez de confiar só no "parece que funciona".',
    texto:
      'Testar hardware e software sob protocolo do TSE me fez perceber o quanto um checklist bem desenhado previne retrabalho — hoje levo essa mesma disciplina de rastreabilidade para testes de funcionalidades de software, em vez de confiar só no "parece que funciona".',
  },
  {
    slug: "titulo-do-livro",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Título do livro",
    meta: "Autor(a) · Ano",
    data: "Lido em mês/ano",
    cover: "img/lifeLearners.webp",
    resumo: "Seu comentário sobre o livro: o que te marcou e como se conecta com sua forma de pensar produto, código ou carreira.",
    texto: "Seu comentário sobre o livro: o que te marcou e como se conecta com sua forma de pensar produto, código ou carreira.",
  },
  {
    slug: "titulo-do-filme",
    categoria: "filme",
    tipoLabel: "🎬 Filme",
    titulo: "Título do filme",
    meta: "Diretor(a) · Ano",
    data: "Assistido em mês/ano",
    cover: null,
    resumo: "Seu comentário sobre o filme: o que achou, o que ficou e por que vale a pena assistir.",
    texto: "Seu comentário sobre o filme: o que achou, o que ficou e por que vale a pena assistir.",
  },
  {
    slug: "agro-saude-logistica-requisitos",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "O que agro, saúde e logística me ensinaram sobre requisitos",
    meta: "Reflexão · Carreira",
    data: "Publicado em 2025",
    cover: null,
    resumo:
      "Passar por setores tão diferentes me mostrou que a regra de negócio nunca está só no documento — está na safra atrasada, no paciente esperando e na carga que não pode parar. Programar para esses contextos exige ouvir antes de codificar.",
    texto:
      "Passar por setores tão diferentes me mostrou que a regra de negócio nunca está só no documento — está na safra atrasada, no paciente esperando e na carga que não pode parar. Programar para esses contextos exige ouvir antes de codificar.",
  },
];
