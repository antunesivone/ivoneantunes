/*
 * blog-render.js
 * --------------
 * Monta o HTML de um card de post (usado na prévia da home e na grade do
 * blog.html) e cuida do botão de compartilhar — tudo num lugar só pra não
 * duplicar essa lógica em cada página que mostra posts.
 */

const BLOG_CATEGORIA_ICONE = { livro: "📚", filme: "🎬", profissional: "📝" };

function escaparHtmlBlog(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto ?? "");
  return div.innerHTML;
}

function urlDoPost(slug) {
  return `post.html?slug=${encodeURIComponent(slug)}`;
}

/** Monta o card interativo: capa (ou fundo degradê por categoria) com badge de data
 * e, ao passar o mouse, ícones de ler/compartilhar — título, resumo e "Leia mais". */
function criarCardPostHTML(post) {
  const mediaInterna = post.cover
    ? `<img loading="lazy" decoding="async" src="${escaparHtmlBlog(post.cover)}" alt="${escaparHtmlBlog(post.titulo)}" class="post-card__img">`
    : `<div class="post-card__placeholder post-card__placeholder--${post.categoria}"><span>${BLOG_CATEGORIA_ICONE[post.categoria] || "📝"}</span></div>`;

  return `
    <article class="post-card" data-category="${post.categoria}" data-slug="${post.slug}">
      <a href="${urlDoPost(post.slug)}" class="post-card__media" aria-label="Ler: ${escaparHtmlBlog(post.titulo)}">
        ${mediaInterna}
        <span class="post-card__date">${escaparHtmlBlog(post.data)}</span>
        <div class="post-card__overlay">
          <span class="post-card__icon post-card__icon--view" title="Ler post">🔍</span>
          <button type="button" class="post-card__icon post-card__icon--share" data-share="${post.slug}" title="Compartilhar" aria-label="Compartilhar post">🔗</button>
        </div>
      </a>
      <div class="post-card__body">
        <span class="blog-card__type blog-card__type--${post.categoria}">${post.tipoLabel}</span>
        <h3 class="post-card__title"><a href="${urlDoPost(post.slug)}">${escaparHtmlBlog(post.titulo)}</a></h3>
        <p class="post-card__meta">${escaparHtmlBlog(post.meta)}</p>
        <p class="post-card__desc">${escaparHtmlBlog(post.resumo)}</p>
        <div class="post-card__footer">
          <a href="${urlDoPost(post.slug)}" class="post-card__readmore">Leia mais →</a>
        </div>
      </div>
    </article>`;
}

/** Web Share API quando disponível; senão copia o link pro clipboard e avisa visualmente. */
async function compartilharPost(slug, titulo, botao) {
  const url = new URL(urlDoPost(slug), window.location.href).href;

  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, url });
      return;
    } catch (erro) {
      if (erro.name === "AbortError") return; // usuária cancelou o share nativo
    }
  }

  try {
    await navigator.clipboard.writeText(url);
  } catch (erro) {
    window.prompt("Copie o link do post:", url);
    return;
  }

  if (botao) {
    const original = botao.textContent;
    botao.textContent = "✅";
    botao.classList.add("post-card__icon--copiado");
    setTimeout(() => {
      botao.textContent = original;
      botao.classList.remove("post-card__icon--copiado");
    }, 1600);
  }
}

/** Delega o clique nos botões de compartilhar de um container de cards. */
function ligarBotoesCompartilhar(container) {
  container.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-share]");
    if (!botao) return;
    evento.preventDefault();
    const slug = botao.dataset.share;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    compartilharPost(slug, post ? post.titulo : document.title, botao);
  });
}
