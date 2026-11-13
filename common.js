/*
 * common.js
 * ---------
 * Comportamento compartilhado por index.html, blog.html e post.html:
 * ano no footer, menu mobile, e a sombra do header + botão "voltar ao
 * topo" ao rolar. Antes esse último bloco era duplicado em script.js,
 * blog.js e post.js, cada um com seu próprio listener de scroll sem
 * throttle — rodava em TODO tick de scroll, nas 3 páginas. Centralizado
 * aqui e com requestAnimationFrame pra não recalcular estilo a cada
 * pixel rolado (principal causa de jank de scroll no site).
 */

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
// (throttled com rAF — só 1 leitura/escrita de layout por frame)
// ==========================================================
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");
let scrollTicking = false;

function atualizarScrollUI() {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(atualizarScrollUI);
  },
  { passive: true }
);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
