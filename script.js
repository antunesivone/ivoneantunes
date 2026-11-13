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
// CARROSSEL DE IMAGENS NOS CARDS DO PORTFÓLIO
// ==========================================================
// A inicialização (goTo(0)) só roda quando o card entra perto da tela —
// antes disso, até o pré-carregamento dos vizinhos do carrossel disparava
// ~2 downloads de imagem por card, pra TODOS os cards, na carga da
// página inteira (muitos ainda fora de tela). É o maior peso da home.
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
    // pré-carrega os vizinhos pra próxima/anterior já saírem na hora
    hydrate(images[(current + 1) % images.length]);
    hydrate(images[(current - 1 + images.length) % images.length]);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  goTo(0);
}

const carouselObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        iniciarCarrossel(entry.target);
        carouselObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "400px 0px" }
);
document.querySelectorAll(".project-card__slides[data-carousel]").forEach((slides) => {
  carouselObserver.observe(slides);
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
