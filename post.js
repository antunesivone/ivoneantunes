// Ano no footer, menu mobile e scroll do header/back-to-top agora vivem em
// common.js (carregado antes deste arquivo em post.html).

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
  const BASE_URL = "https://antunesivone.github.io/ivoneantunes/";
  const postUrl = BASE_URL + "post.html?slug=" + encodeURIComponent(post.slug);
  const postImage = BASE_URL + (post.cover || "img/eudev.webp");
  const pageTitle = `${post.titulo} — Ivone Antunes`;

  document.title = pageTitle;
  document.getElementById("postPageTitle").textContent = pageTitle;
  document.getElementById("postPageDescription").setAttribute("content", post.resumo);
  document.getElementById("postPageCanonical").setAttribute("href", postUrl);
  document.getElementById("postPageOgTitle").setAttribute("content", pageTitle);
  document.getElementById("postPageOgDescription").setAttribute("content", post.resumo);
  document.getElementById("postPageOgUrl").setAttribute("content", postUrl);
  document.getElementById("postPageOgImage").setAttribute("content", postImage);
  document.getElementById("postPageTwitterTitle").setAttribute("content", pageTitle);
  document.getElementById("postPageTwitterDescription").setAttribute("content", post.resumo);
  document.getElementById("postPageTwitterImage").setAttribute("content", postImage);

  const jsonLd = document.createElement("script");
  jsonLd.type = "application/ld+json";
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    image: postImage,
    url: postUrl,
    author: { "@type": "Person", name: "Ivone Antunes", url: BASE_URL + "index.html" },
  });
  document.head.appendChild(jsonLd);

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
    ${criarAutorBylineHTML(post)}
    <div class="post-detail__text">${post.texto}</div>
    <button type="button" class="post-card__icon post-detail__share" data-share="${post.slug}" title="Compartilhar" aria-label="Compartilhar post">🔗</button>
    ${criarProximaLeituraHTML(post)}
  `;

  ligarBotoesCompartilhar(postContent);
}
