# &lt;Ivone Antunes /&gt; — Portfólio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/Framework-Vanilla-6fa8a6?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-e8a33d?style=for-the-badge)

---

## Visão Geral e Proposta de Valor

Portfólio pessoal de **Ivone Antunes**, desenvolvedora web com mais de 3 anos de vivência em ambientes corporativos e institucionais (Raízen e Diretoria Regional de Saúde). O site não é apenas uma vitrine estática: ele estrutura uma narrativa de carreira não-linear — de empreendedorismo (Aromaterapia Inaie) a estágios em TI corporativa, até o desenvolvimento front-end — e converte a visita em contato qualificado.

**Por que importa:** em vez de um currículo em PDF, o projeto entrega uma experiência navegável (Sobre, Serviços, Projetos, Skills, Qualificações, Curiosidades, Contato) com uma peça de engenharia real de ponta a ponta — sem frameworks, sem build step, 100% HTML/CSS/JS nativos — funcionando como prova de código na própria candidatura.

---

## Visão de Negócio: um portfólio como vitrine de serviços

Este não é só um site de "sobre mim" — é estruturado como um **funil comercial**, o mesmo raciocínio de conversão aplicado ao e-commerce em [Lady Ella](../ladyEllaCatalago), só que adaptado para um produto diferente: a própria Ivone como prestadora de serviço.

- **A seção Serviços não é uma lista de skills, é um catálogo de oferta.** Em vez de simplesmente listar "JavaScript, Node.js, PostgreSQL", os cards de `#services` são organizados por *o que o cliente contrata* — Desenvolvimento Web, Backend & APIs, Integração de Sistemas, UI/UX, Gestão Ágil, Interpretação de Regras de Negócio. É a diferença entre "sei programar" e "eu resolvo este tipo de problema para você", uma escolha deliberada de posicionamento comercial, não apenas técnica.
- **Skills e Qualificações existem para reduzir a objeção de confiança.** Depois que o visitante entende a oferta (Serviços), ele precisa de evidência de competência antes de agir — é o papel das seções de Skills e das abas Educação/Experiência em `#qualifications`. É o mesmo mecanismo de prova social do checkout de e-commerce (estrelas, depoimentos), só que aqui a "prova" é trajetória profissional verificável em vez de avaliação de terceiros.
- **O formulário de contato é um CTA de baixa fricção, não um `mailto:`.** O JS em `script.js` monta a mensagem e abre `https://wa.me/<numero>?text=...` diretamente, pulando qualquer etapa de backend, autenticação de e-mail ou espera por retorno assíncrono. É a mesma lógica de negócio usada em Lady Ella para simplificar checkout: cada passo a mais entre a intenção do usuário e a ação é conversão perdida — aqui o "checkout" é o primeiro contato com um cliente em potencial.
- **O funil completo do site segue essa ordem intencional:** Hero (apresentação) → Serviços (oferta) → Projetos/Skills/Qualificações (prova de competência) → Contato (conversão). O botão "Entre em contato" já aparece embutido dentro da própria seção de Serviços (`cta-banner`), reforçando a ação assim que a oferta é compreendida, sem esperar o usuário rolar até o fim da página.

Em resumo: o código demonstra não apenas "sei fazer scroll reveal com `IntersectionObserver`", mas a leitura de que um portfólio de freelancer/prestadora de serviço é, estruturalmente, uma página de vendas — e foi projetado como tal.

---

## Possíveis Aplicações para Negócio e Expansões Futuras

O funil atual (Hero → Serviços → Prova → Contato) já cobre o essencial de uma vitrine de serviços, mas há espaço concreto para evoluir tanto a captação de leads quanto a capacidade de atender projetos maiores:

- **Parcerias com outras profissionais complementares:** a seção Serviços cobre um leque amplo (Dev Web, Backend, UI/UX, Gestão Ágil), mas projetos reais frequentemente exigem competências fora desse escopo — design gráfico, copywriting, tráfego pago, fotografia de produto. Formalizar uma rede de parceiras para indicação cruzada permite que Ivone recuse menos projetos por incompletude de escopo e feche pacotes maiores em conjunto, sem precisar internalizar cada especialidade.
- **Depoimentos reais de clientes na seção de prova social:** hoje a "prova" em Qualificações é inteiramente trajetória verificável (educação/experiência), sem nenhum feedback de terceiros. Adicionar depoimentos — mesmo que 2 ou 3 iniciais, com nome e contexto do projeto — fecha a lacuna de prova social do tipo "outros confiaram e aprovaram", que é um gatilho de decisão distinto de "ela tem currículo bom" e reduz a percepção de risco de quem nunca contratou uma freelancer antes.
- **Pacotes de serviço com escopo e faixa de preço definidos:** atualmente os cards de `#services` comunicam *o que* é oferecido, mas não *quanto custa* nem *o que está incluso*. Estruturar 2-3 pacotes por tipo de serviço (ex.: "Landing Page — do briefing ao deploy, R$X–Y, prazo Z") reduz a fricção do primeiro contato via WhatsApp, que hoje começa sem nenhuma âncora de orçamento e obriga cada lead a perguntar preço do zero.
- **Formulário de briefing antes do WhatsApp:** substituir (ou preceder) o clique direto para `wa.me` por um formulário curto — tipo de projeto, prazo desejado, orçamento aproximado — permite qualificar o lead antes da conversa. Isso evita que Ivone gaste tempo respondendo mensagens genéricas ("oi, quanto custa um site?") e chega ao WhatsApp já com contexto suficiente para uma proposta objetiva, economizando tempo dos dois lados sem adicionar uma etapa de backend pesada (pode ser resolvido com um serviço de formulário estático como Formspree ou Netlify Forms, mantendo a filosofia "sem build step" do projeto).

---

## Seção Visual

> **[Inserir aqui um GIF ou screenshot da aplicação em execução]**
> Sugestão: capturar o scroll pela Hero (efeito de digitação no terminal), a transição de abas em *Qualificações* e o preenchimento do formulário de contato até a abertura do WhatsApp.
>
> `img/demo.gif` ou `img/screenshot-hero.png`

---

## Arquitetura e Decisões Técnicas

- **Stack enxuta e sem dependências de build**: HTML5 + CSS3 + JavaScript vanilla (ES6+), sem bundler, sem framework de UI. Escolha deliberada para manter o deploy trivial (qualquer host estático) e o código 100% legível como amostra técnica.
- **Design tokens em CSS custom properties** (`:root` em `style.css`): cores, tipografia (`Space Grotesk`, `Inter`, `JetBrains Mono` via Google Fonts com `preconnect`), raio de borda e transições centralizados em variáveis — troca de tema/paleta sem tocar em regras espalhadas pelo arquivo.
- **Semântica e acessibilidade**: `nav`/`main`/`section`/`article` usados por função, `aria-expanded`/`aria-selected` no menu mobile e nas abas, `:focus-visible` customizado, e respeito a `prefers-reduced-motion` (zera durações de animação para quem ativou a preferência no SO).
- **Organização por seções autocontidas**: cada bloco (`hero`, `about`, `services`, `projects`, `skills`, `qualifications`, `fun-facts`, `contact`) tem CSS isolado por prefixo BEM-like (`.quali-card`, `.funfact-card`, `.project-card`), facilitando manutenção incremental.
- **JavaScript orientado a eventos e Observers**, sem polling nem timers desnecessários rodando em segundo plano.

---

## O Desafio Técnico

**Problema:** o Hero tem um efeito de "terminal digitando" código caractere a caractere, e várias seções usam animações de entrada (fade + slide-up). Implementado de forma ingênua, isso significaria disparar todas as animações no `load` da página — incluindo conteúdo fora da viewport, o que desperdiça ciclos de CPU, quebra a ilusão de "digitação ao vivo" quando o usuário chega àquele ponto por scroll, e pode reprocessar elementos já animados repetidamente durante o scroll.

**Solução:** o desafio foi resolvido com **`IntersectionObserver`** em duas camadas distintas de responsabilidade:

```js
// Efeito de digitação só começa quando o hero entra em viewport
const heroObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      typeEffect(codeLines, typedEl);
      obs.disconnect(); // dispara uma única vez
    }
  });
}, { threshold: 0.3 });
```

```js
// Scroll reveal: anima e depois desconecta cada elemento individualmente
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target); // evita custo de observação contínua
    }
  });
}, { threshold: 0.15 });
```

O primeiro observer garante que o efeito de digitação (recursivo, via `setTimeout` caractere a caractere) só é iniciado quando o usuário efetivamente vê o terminal — e nunca mais de uma vez (`obs.disconnect()`). O segundo aplica a mesma lógica de "dispara e some" a dezenas de elementos (`cards`, `project-card`, `quali-card`, `funfact-card`, `stat`) sem manter observadores ociosos depois que a animação já ocorreu. O resultado é uma UI que parece reativa e "viva" no scroll, sem custo de performance nem re-renderizações desnecessárias — resolvido sem nenhuma biblioteca de animação externa.

---

## Funcionalidades

- [x] Navegação responsiva com menu hambúrguer mobile e fechamento automático ao clicar em um link
- [x] Efeito de digitação no terminal da Hero, iniciado sob demanda via `IntersectionObserver`
- [x] Scroll reveal (fade + slide-up) aplicado dinamicamente a cards, estatísticas e blocos de seção
- [x] Abas interativas em Qualificações (Educação / Experiência) controladas por `data-tab` / `data-panel`
- [x] Formulário de contato que monta e abre um link pré-preenchido do WhatsApp — captação de lead sem backend
- [x] Header com sombra dinâmica ao rolar, botão "voltar ao topo" e suporte a `prefers-reduced-motion`

---

## Como Executar o Projeto

Site 100% estático — **sem dependências, sem `npm install`, sem etapa de build.**

**Pré-requisitos:** apenas um navegador moderno.

```bash
# Opção 1 — abrir diretamente
# Basta abrir o arquivo index.html no navegador

# Opção 2 — servir localmente (recomendado para evitar restrições de CORS/paths)
npx serve .
# ou
python -m http.server 5500
```

Depois, acesse `http://localhost:5500` (ou a porta indicada pelo servidor escolhido).
