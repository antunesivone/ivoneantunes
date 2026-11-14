// Ano no footer, menu mobile e scroll do header/back-to-top agora vivem em
// common.js (carregado antes deste arquivo em index.html).

// ==========================================================
// EFEITO "DIGITANDO" NO TERMINAL DO HERO
// ==========================================================
const codeLines = [
  "const dev = {",
  "  nome: 'Ivone Antunes',",
  "  cargo: 'Dev Software',",
  "  stack: [ 'HTML5', 'CSS3', 'SASS', 'JavaScript', 'Bootstrap', 'Node.js', 'Express', 'Python', 'PostgreSQL', 'MySQL' ],",
  "  ferramentas: [ 'Git', 'WordPress', 'ServiceNow', 'SAP/ERP', 'DATASUS', 'Power BI' ],",
  "  setores: [ 'Varejo (E-commerce)', 'Logística & Mobilidade', 'Agronegócio', 'Saúde Pública' ],",
  "  localizacao: 'Piracicaba - SP',",
  "  paixao: 'café ☕ + código limpo',",
  "  disponivel: true,",
  "};",
  "",
  "dev.iniciarProjeto();",
];

const typedEl = document.getElementById("typedCode");

function typeEffect(lines, el, speed = 26, lineDelay = 180) {
  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      el.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      el.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, lineDelay);
    }
  }

  typeChar();
}

// Só inicia quando o hero entra em viewport (evita rodar fora de tela)
const heroObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeEffect(codeLines, typedEl);
        obs.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);
heroObserver.observe(document.getElementById("hero"));

// ==========================================================
// PRÉVIA DO BLOG (3 posts) — mesma fonte de dados e o mesmo card
// interativo do blog.html (blog-posts.js + blog-render.js)
// ==========================================================
const homeBlogGrid = document.getElementById("homeBlogGrid");
if (homeBlogGrid) {
  const SLUGS_PREVIA_HOME = ["qa-urnas-vs-qa-software", "como-falar-em-publico-dale-carnegie", "do-prompt-ao-prototipo-rumo"];
  const postsPrevia = SLUGS_PREVIA_HOME.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(Boolean);
  homeBlogGrid.innerHTML = postsPrevia.map(criarCardPostHTML).join("");
  ligarBotoesCompartilhar(homeBlogGrid);
}

// ==========================================================
// GRADE LEVE DE PROJETOS (1 capa + título + link) — a partir de
// PROJETOS (projetos-data.js). A galeria completa de cada projeto
// (todas as imagens, descrição, carrossel) só carrega na página
// individual (projeto.html?slug=...), igual ao padrão do blog.
// ==========================================================
const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projectsGrid.innerHTML = PROJETOS.map(
    (p) => `
    <article class="project-card project-card--light" data-category="${p.categoria}">
      <a href="projeto.html?slug=${encodeURIComponent(p.slug)}" class="project-card__image" aria-label="Ver projeto: ${escaparHtmlBlog(p.titulo)}">
        <img loading="lazy" decoding="async" src="${escaparHtmlBlog(p.cover.src)}" alt="${escaparHtmlBlog(p.cover.alt)}">
      </a>
      <div class="project-card__body">
        <span class="project-card__tag">${escaparHtmlBlog(p.tag)}</span>
        <h3 class="project-card__title"><a href="projeto.html?slug=${encodeURIComponent(p.slug)}">${escaparHtmlBlog(p.titulo)}</a></h3>
        <div class="project-card__links">
          <a href="projeto.html?slug=${encodeURIComponent(p.slug)}" class="link-arrow">Ver projeto →</a>
        </div>
      </div>
    </article>`
  ).join("");
}

// ==========================================================
// SCROLL REVEAL (fade + slide-up ao entrar na tela)
// ==========================================================
const revealTargets = document.querySelectorAll(
  ".section > *:not(.section__eyebrow), .card, .project-card, .quali-card, .funfact-card, .post-card, .stat"
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
// ABAS DE QUALIFICAÇÕES (Educação / Experiência)
// ==========================================================
const qualiTabs = document.querySelectorAll(".quali-tab");
const qualiPanels = document.querySelectorAll(".quali-panel");

qualiTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    qualiTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    qualiPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
  });
});

// Chegando de um link "Voltar para Experiência Profissional" (projeto.html,
// post.html) via index.html?tab=experience#qualifications — abre direto na
// aba Experiência em vez de ficar na aba padrão (Educação).
const tabParam = new URLSearchParams(window.location.search).get("tab");
if (tabParam) {
  const tabAlvo = document.querySelector(`.quali-tab[data-tab="${tabParam}"]`);
  if (tabAlvo) tabAlvo.click();
}

// ==========================================================
// FILTRO DE PROJETOS (E-commerce / Logística / Empresas / IA)
// ==========================================================
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const target = filter.dataset.filter;

    projectFilters.forEach((f) => {
      f.classList.remove("is-active");
      f.setAttribute("aria-selected", "false");
    });
    filter.classList.add("is-active");
    filter.setAttribute("aria-selected", "true");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const show = target === "all" || categories.includes(target);
      card.classList.toggle("is-hidden", !show);
    });
  });
});

// ==========================================================
// CURIOSIDADES: pausa a animação infinita do carrossel quando a seção
// não está visível (ela rodava o tempo todo, mesmo fora de tela).
// ==========================================================
const funfactsCarousel = document.querySelector(".funfacts-carousel");
if (funfactsCarousel) {
  const funfactsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      funfactsCarousel.classList.toggle("is-paused", !entry.isIntersecting);
    });
  });
  funfactsObserver.observe(funfactsCarousel);
}

// ==========================================================
// FORMULÁRIO DE CONTATO — redireciona para o WhatsApp
// ==========================================================
const WHATSAPP_NUMBER = "5519971383626";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.elements["name"].value.trim();
  const message = contactForm.elements["message"].value.trim();

  const text = `Olá, Ivone! Meu nome é ${name}.\n\n${message}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  formNote.textContent = "Abrindo o WhatsApp...";
  window.open(whatsappUrl, "_blank");
  contactForm.reset();
});
