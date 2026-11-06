// ==========================================================
// ANO NO FOOTER
// ==========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================================
// MENU MOBILE
// ==========================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================================
// HEADER: sombra sutil ao rolar + botão voltar ao topo
// ==========================================================
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 40;
  nav.style.boxShadow = scrolled ? "0 8px 24px rgba(0,0,0,0.25)" : "none";
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================================
// RENDERIZA O POST a partir do ?slug= na URL (BLOG_POSTS vem de blog-posts.js)
// ==========================================================
const slug = new URLSearchParams(window.location.search).get("slug");
const post = BLOG_POSTS.find((p) => p.slug === slug);
const postContent = document.getElementById("postContent");

if (!post) {
  postContent.innerHTML = `
    <p class="section__eyebrow">Ops</p>
    <h1 class="section__title">Post não encontrado</h1>
    <p class="section__subtitle">O link pode estar errado ou o post foi removido.</p>
    <a href="blog.html" class="btn btn--primary">Ver todos os posts →</a>
  `;
} else {
  document.title = `${post.titulo} — Ivone Antunes`;
  document.getElementById("postPageTitle").textContent = `${post.titulo} — Ivone Antunes`;
  document.getElementById("postPageDescription").setAttribute("content", post.resumo);

  const mediaInterna = post.cover
    ? `<img loading="lazy" decoding="async" src="${post.cover}" alt="${post.titulo}" class="post-detail__img">`
    : `<div class="post-card__placeholder post-card__placeholder--${post.categoria} post-detail__placeholder"><span>${BLOG_CATEGORIA_ICONE[post.categoria] || "📝"}</span></div>`;

  postContent.innerHTML = `
    <div class="post-detail__media">${mediaInterna}</div>
    <div class="post-detail__top">
      <span class="blog-card__type blog-card__type--${post.categoria}">${post.tipoLabel}</span>
      <span class="post-card__date post-detail__date">${post.data}</span>
    </div>
    <h1 class="post-detail__title">${post.titulo}</h1>
    <p class="post-detail__meta">${post.meta}</p>
    <p class="post-detail__text">${post.texto}</p>
    <button type="button" class="post-card__icon post-detail__share" data-share="${post.slug}" title="Compartilhar" aria-label="Compartilhar post">🔗</button>
  `;

  ligarBotoesCompartilhar(postContent);
}
