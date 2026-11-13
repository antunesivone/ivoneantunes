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

/** Linha de livro no estilo lista editorial (capa à esquerda, sem corte, + resenha à direita). */
function criarLivroRowHTML(post) {
  const mediaInterna = post.cover
    ? `<img loading="lazy" decoding="async" src="${escaparHtmlBlog(post.cover)}" alt="Capa do livro ${escaparHtmlBlog(post.titulo)}" class="book-row__img">`
    : `<div class="book-row__placeholder"><span>📚</span></div>`;

  return `
    <article class="book-row" data-category="livro" data-slug="${post.slug}">
      <a href="${urlDoPost(post.slug)}" class="book-row__cover" aria-label="Ler resenha: ${escaparHtmlBlog(post.titulo)}">${mediaInterna}</a>
      <div class="book-row__body">
        <h3 class="book-row__title"><a href="${urlDoPost(post.slug)}">${escaparHtmlBlog(post.titulo)}</a></h3>
        <p class="book-row__meta">— ${escaparHtmlBlog(post.meta)}</p>
        <p class="book-row__desc">${escaparHtmlBlog(post.resumo)}</p>
        ${criarAutorBylineHTML(post)}
        <div class="book-row__footer">
          <a href="${urlDoPost(post.slug)}" class="post-card__readmore">Leia mais →</a>
          <button type="button" class="post-card__icon post-card__icon--share book-row__share" data-share="${post.slug}" title="Compartilhar" aria-label="Compartilhar post">🔗</button>
        </div>
      </div>
    </article>`;
}

/** Card de destaque (editorial, maior) usado na faixa "Destaques" no topo do blog. */
function criarDestaqueHTML(post) {
  const mediaInterna = post.cover
    ? `<img loading="lazy" decoding="async" src="${escaparHtmlBlog(post.cover)}" alt="${escaparHtmlBlog(post.titulo)}" class="destaque-card__img">`
    : `<div class="destaque-card__placeholder post-card__placeholder--${post.categoria}"><span>${BLOG_CATEGORIA_ICONE[post.categoria] || "📝"}</span></div>`;

  return `
    <a href="${urlDoPost(post.slug)}" class="destaque-card" aria-label="Ler: ${escaparHtmlBlog(post.titulo)}">
      <div class="destaque-card__media">${mediaInterna}</div>
      <div class="destaque-card__body">
        <span class="blog-card__type blog-card__type--${post.categoria}">${post.tipoLabel}</span>
        <h3 class="destaque-card__title">${escaparHtmlBlog(post.titulo)}</h3>
      </div>
    </a>`;
}

/** Bloco de autoria (avatar + nome + data) — mostra quem escreveu o post, sem citar fonte externa. */
function criarAutorBylineHTML(post) {
  return `
    <div class="post-author">
      <img src="img/eudev.webp" alt="Ivone Antunes" class="post-author__avatar" loading="lazy" decoding="async">
      <p class="post-author__text"><strong>por Ivone Antunes</strong>, ${escaparHtmlBlog(post.data)}</p>
    </div>`;
}

/** Escolhe a próxima leitura ao final do post: prioriza o próximo post da
 * mesma categoria (ordem do array, com volta ao início); se a categoria só
 * tiver esse post, cai pra qualquer outro post do blog (também com volta ao início). */
function escolherProximaLeitura(post) {
  const mesmaCategoria = BLOG_POSTS.filter((p) => p.categoria === post.categoria);
  const listaBase = mesmaCategoria.length > 1 ? mesmaCategoria : BLOG_POSTS;
  const indiceAtual = listaBase.findIndex((p) => p.slug === post.slug);
  if (indiceAtual === -1 || listaBase.length <= 1) return null;
  return listaBase[(indiceAtual + 1) % listaBase.length];
}

/** Bloco "Próxima leitura" ao final de todo post — livro, filme ou artigo. */
function criarProximaLeituraHTML(post) {
  const proximo = escolherProximaLeitura(post);
  if (!proximo) return "";

  const mediaInterna = proximo.cover
    ? `<img loading="lazy" decoding="async" src="${escaparHtmlBlog(proximo.cover)}" alt="${escaparHtmlBlog(proximo.titulo)}" class="next-read__img">`
    : `<div class="next-read__placeholder post-card__placeholder--${proximo.categoria}"><span>${BLOG_CATEGORIA_ICONE[proximo.categoria] || "📝"}</span></div>`;

  return `
    <div class="next-read">
      <p class="section__eyebrow">Próxima leitura</p>
      <a href="${urlDoPost(proximo.slug)}" class="next-read__card">
        <div class="next-read__media">${mediaInterna}</div>
        <div class="next-read__body">
          <span class="blog-card__type blog-card__type--${proximo.categoria}">${proximo.tipoLabel}</span>
          <h3 class="next-read__title">${escaparHtmlBlog(proximo.titulo)}</h3>
          <p class="next-read__desc">${escaparHtmlBlog(proximo.resumo)}</p>
        </div>
      </a>
    </div>`;
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
