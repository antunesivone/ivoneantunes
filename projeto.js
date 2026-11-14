/*
 * projeto.js
 * ----------
 * Renderiza a página individual de um projeto (projeto.html?slug=...)
 * a partir de PROJETOS (projetos-data.js). O carrossel reaproveita
 * exatamente as classes/CSS de .project-card já usadas na grade leve
 * do index.html — só que aqui mostrando a galeria completa.
 */
const slugParam = new URLSearchParams(window.location.search).get("slug");
const projeto = PROJETOS.find((p) => p.slug === slugParam);
const projetoContent = document.getElementById("projetoContent");

function escaparHtmlProjeto(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto ?? "");
  return div.innerHTML;
}

if (!projeto) {
  projetoContent.innerHTML = `
    <p class="section__eyebrow">Ops</p>
    <h1 class="section__title">Projeto não encontrado</h1>
    <p class="section__subtitle">O link pode estar errado ou o projeto foi renomeado.</p>
    <a href="index.html#projects" class="btn btn--primary">Ver todo o portfólio →</a>
  `;
} else {
  const BASE_URL = "https://antunesivone.github.io/ivoneantunes/";
  const pageUrl = BASE_URL + "projeto.html?slug=" + encodeURIComponent(projeto.slug);
  const pageImage = BASE_URL + projeto.cover.src;
  const pageTitle = `${projeto.titulo} — Portfólio Ivone Antunes`;
  const resumo = projeto.desc.replace(/<[^>]+>/g, "").slice(0, 155);

  document.title = pageTitle;
  document.getElementById("projPageTitle").textContent = pageTitle;
  document.getElementById("projPageDescription").setAttribute("content", resumo);
  document.getElementById("projPageCanonical").setAttribute("href", pageUrl);
  document.getElementById("projPageOgTitle").setAttribute("content", pageTitle);
  document.getElementById("projPageOgDescription").setAttribute("content", resumo);
  document.getElementById("projPageOgUrl").setAttribute("content", pageUrl);
  document.getElementById("projPageOgImage").setAttribute("content", pageImage);
  document.getElementById("projPageTwitterTitle").setAttribute("content", pageTitle);
  document.getElementById("projPageTwitterDescription").setAttribute("content", resumo);
  document.getElementById("projPageTwitterImage").setAttribute("content", pageImage);

  const jsonLd = document.createElement("script");
  jsonLd.type = "application/ld+json";
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projeto.titulo,
    description: resumo,
    image: pageImage,
    url: pageUrl,
    creator: { "@type": "Person", name: "Ivone Antunes", url: BASE_URL + "index.html" },
    keywords: projeto.techs.join(", "),
  });
  document.head.appendChild(jsonLd);

  const slidesHTML = projeto.images
    .map(
      (img, i) =>
        `<img loading="lazy" decoding="async" ${i === 0 ? "src" : "data-src"}="${escaparHtmlProjeto(img.src)}" alt="${escaparHtmlProjeto(img.alt)}">`
    )
    .join("\n");

  const techsHTML = projeto.techs.map((t) => `<li>${escaparHtmlProjeto(t)}</li>`).join("");

  projetoContent.innerHTML = `
    <article class="project-card project-card--detail">
      <div class="project-card__image">
        <div class="project-card__slides" data-carousel>
          ${slidesHTML}
        </div>
        <button type="button" class="project-card__nav project-card__nav--prev" aria-label="Imagem anterior">‹</button>
        <button type="button" class="project-card__nav project-card__nav--next" aria-label="Próxima imagem">›</button>
        <div class="project-card__dots"></div>
      </div>
      <div class="project-card__body">
        <span class="project-card__tag">${escaparHtmlProjeto(projeto.tag)}</span>
        <h1 class="project-card__title">${escaparHtmlProjeto(projeto.titulo)}</h1>
        <p class="project-card__desc">${projeto.desc}</p>
        <ul class="tag-list tag-list--mono">${techsHTML}</ul>
        <div class="project-card__links">
          <a href="${projeto.githubUrl}" target="_blank" rel="noopener" class="link-arrow">Ver código-fonte no GitHub →</a>
        </div>
      </div>
    </article>
  `;

  // Mesma lógica de carrossel do script.js (dots, prev/next, hidratação sob demanda
  // dos vizinhos) — aqui só roda uma vez, pro único carrossel da página.
  function iniciarCarrossel(slides) {
    const images = Array.from(slides.querySelectorAll("img"));
    const wrapper = slides.closest(".project-card__image");
    const prevBtn = wrapper.querySelector(".project-card__nav--prev");
    const nextBtn = wrapper.querySelector(".project-card__nav--next");
    const dotsEl = wrapper.querySelector(".project-card__dots");
    let current = 0;

    if (images.length <= 1) {
      prevBtn.classList.add("is-hidden");
      nextBtn.classList.add("is-hidden");
      if (images[0]) images[0].classList.add("is-active");
      return;
    }

    const dots = images.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "project-card__dot";
      dot.setAttribute("aria-label", `Ir para imagem ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
      return dot;
    });

    function hydrate(img) {
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
    }

    function goTo(index) {
      images[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (index + images.length) % images.length;
      hydrate(images[current]);
      images[current].classList.add("is-active");
      dots[current].classList.add("is-active");
      hydrate(images[(current + 1) % images.length]);
      hydrate(images[(current - 1 + images.length) % images.length]);
    }

    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));
    goTo(0);
  }

  iniciarCarrossel(projetoContent.querySelector(".project-card__slides[data-carousel]"));
}
