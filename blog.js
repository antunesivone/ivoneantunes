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
// RENDERIZA OS CARDS A PARTIR DE BLOG_POSTS (blog-posts.js)
// ==========================================================
const blogGrid = document.getElementById("blogGrid");
blogGrid.innerHTML = BLOG_POSTS.map(criarCardPostHTML).join("");
ligarBotoesCompartilhar(blogGrid);

// ==========================================================
// SCROLL REVEAL (fade + slide-up ao entrar na tela)
// ==========================================================
const revealTargets = document.querySelectorAll(".section > *:not(.section__eyebrow), .post-card");
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
// ==========================================================
const blogFilters = document.querySelectorAll(".blog-filter");
const postCards = document.querySelectorAll(".post-card");

blogFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const target = filter.dataset.filter;

    blogFilters.forEach((f) => {
      f.classList.remove("is-active");
      f.setAttribute("aria-selected", "false");
    });
    filter.classList.add("is-active");
    filter.setAttribute("aria-selected", "true");

    postCards.forEach((card) => {
      const show = target === "all" || card.dataset.category === target;
      card.classList.toggle("is-hidden", !show);
    });
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
