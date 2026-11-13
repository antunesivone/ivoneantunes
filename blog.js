// Ano no footer, menu mobile e scroll do header/back-to-top agora vivem em
// common.js (carregado antes deste arquivo em blog.html).

// ==========================================================
// RENDERIZA DESTAQUES + LIVROS (lista) + ARTIGOS/FILMES (grid)
// a partir de BLOG_POSTS (blog-posts.js)
// ==========================================================
const SLUGS_DESTAQUES = [
  "do-prompt-ao-prototipo-rumo",
  "design-de-prompt-vs-engenharia-de-prompt",
  "qa-urnas-vs-qa-software",
];
const postsDestaque = SLUGS_DESTAQUES.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(Boolean);
document.getElementById("blogDestaques").innerHTML = postsDestaque.map(criarDestaqueHTML).join("");

const livros = BLOG_POSTS.filter((p) => p.categoria === "livro");
const outros = BLOG_POSTS.filter((p) => p.categoria !== "livro");

const blogLivros = document.getElementById("blogLivros");
const blogGrid = document.getElementById("blogGrid");
blogLivros.innerHTML = livros.map(criarLivroRowHTML).join("");
blogGrid.innerHTML = outros.map(criarCardPostHTML).join("");
ligarBotoesCompartilhar(blogLivros);
ligarBotoesCompartilhar(blogGrid);

// ==========================================================
// SCROLL REVEAL (fade + slide-up ao entrar na tela)
// ==========================================================
const revealTargets = document.querySelectorAll(
  ".section > *:not(.section__eyebrow), .destaque-card, .book-row, .post-card"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ==========================================================
// FILTRO DO BLOG (Livros / Filmes / Artigos)
// Livros vive numa lista própria (#blogLivros); Filmes e Artigos
// dividem a grade de cards (#blogGrid). Destaques some fora do "Tudo".
// ==========================================================
const blogFilters = document.querySelectorAll(".blog-filter");
const blogDestaquesWrap = document.getElementById("blogDestaquesWrap");
const gridCards = document.querySelectorAll("#blogGrid .post-card");
const livroRows = document.querySelectorAll("#blogLivros .book-row");

blogFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const target = filter.dataset.filter;

    blogFilters.forEach((f) => {
      f.classList.remove("is-active");
      f.setAttribute("aria-selected", "false");
    });
    filter.classList.add("is-active");
    filter.setAttribute("aria-selected", "true");

    blogDestaquesWrap.classList.toggle("is-hidden", target !== "all");
    livroRows.forEach((row) => row.classList.toggle("is-hidden", !(target === "all" || target === "livro")));
    blogGrid.classList.toggle("is-hidden", target === "livro");
    gridCards.forEach((card) => {
      const show = target === "all" || card.dataset.category === target;
      card.classList.toggle("is-hidden", !show);
    });
  });
});
