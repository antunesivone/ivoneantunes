/*
 * blog-posts.js
 * -------------
 * Fonte única dos posts do blog — usada pela prévia na home (index.html),
 * pela grade completa (blog.html) e pela página de post individual
 * (post.html). Para adicionar um post novo, basta duplicar um objeto aqui;
 * nenhuma outra página precisa ser tocada.
 *
 * Campos:
 *   slug      — identificador único na URL (post.html?slug=...)
 *   categoria — "livro" | "filme" | "profissional"
 *   tipoLabel — texto do badge (emoji + rótulo)
 *   titulo, meta, data — exibidos no card e no post
 *   cover     — caminho da imagem de capa, ou null (usa um fundo
 *               degradê com ícone, gerado em CSS, por categoria)
 *   resumo    — texto curto (aparece no card)
 *   texto     — texto completo (aparece na página do post). Quando não
 *               há conteúdo adicional além do resumo, repete o mesmo texto.
 */
const BLOG_POSTS = [
  {
    slug: "qa-urnas-vs-qa-software",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "QA de urnas eletrônicas vs. QA de software",
    meta: "Reflexão · Carreira",
    data: "Publicado em 2026",
    cover: null,
    resumo:
      'Testar hardware e software sob protocolo do TSE me fez perceber o quanto um checklist bem desenhado previne retrabalho — hoje levo essa mesma disciplina de rastreabilidade para testes de funcionalidades de software, em vez de confiar só no "parece que funciona".',
    texto:
      'Testar hardware e software sob protocolo do TSE me fez perceber o quanto um checklist bem desenhado previne retrabalho — hoje levo essa mesma disciplina de rastreabilidade para testes de funcionalidades de software, em vez de confiar só no "parece que funciona".',
  },
  {
    slug: "titulo-do-livro",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Título do livro",
    meta: "Autor(a) · Ano",
    data: "Lido em mês/ano",
    cover: "img/lifeLearners.webp",
    resumo: "Seu comentário sobre o livro: o que te marcou e como se conecta com sua forma de pensar produto, código ou carreira.",
    texto: "Seu comentário sobre o livro: o que te marcou e como se conecta com sua forma de pensar produto, código ou carreira.",
  },
  {
    slug: "titulo-do-filme",
    categoria: "filme",
    tipoLabel: "🎬 Filme",
    titulo: "Título do filme",
    meta: "Diretor(a) · Ano",
    data: "Assistido em mês/ano",
    cover: null,
    resumo: "Seu comentário sobre o filme: o que achou, o que ficou e por que vale a pena assistir.",
    texto: "Seu comentário sobre o filme: o que achou, o que ficou e por que vale a pena assistir.",
  },
  {
    slug: "agro-saude-logistica-requisitos",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "O que agro, saúde e logística me ensinaram sobre requisitos",
    meta: "Reflexão · Carreira",
    data: "Publicado em 2025",
    cover: null,
    resumo:
      "Passar por setores tão diferentes me mostrou que a regra de negócio nunca está só no documento — está na safra atrasada, no paciente esperando e na carga que não pode parar. Programar para esses contextos exige ouvir antes de codificar.",
    texto:
      "Passar por setores tão diferentes me mostrou que a regra de negócio nunca está só no documento — está na safra atrasada, no paciente esperando e na carga que não pode parar. Programar para esses contextos exige ouvir antes de codificar.",
  },
  {
    slug: "do-prompt-ao-prototipo-rumo",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "Do prompt ao protótipo: como o Rumo foi criado",
    meta: "Tutorial · Para quem está aprendendo a programar",
    data: "Publicado em 2026",
    cover: "img/rumo-tutorial-01-deck.webp",
    resumo:
      "O processo inteiro de criação do Rumo (protótipo de matching de cursos por swipe) — do briefing que gera um bom prompt até o código de verdade rodando, pensado pra quem está aprendendo a programar.",
    texto: `
<p><em>Este post explica o processo inteiro de criação do <a href="https://github.com/antunesivone/portfolio-docs/tree/main/rumo" target="_blank" rel="noopener">Rumo</a> — desde a ideia até o código rodando — pensado pra quem está aprendendo a programar. Se você já manja de back-end/front-end, pode pular direto pra seção "Da tela ao código".</em></p>

<h2>1. De onde veio a ideia</h2>
<p>A ideia nasceu num workshop sobre usar IA para gerar protótipos no Figma. O aprendizado principal não foi a ferramenta de IA em si — foi perceber que <strong>o prompt que gera um bom protótipo não nasce pronto: ele nasce de um briefing bem feito.</strong></p>
<p>Antes de escrever qualquer prompt, o grupo organizou três camadas de informação:</p>
<ol>
  <li><strong>Concorrentes</strong> — quem já tenta resolver o mesmo problema, e como.</li>
  <li><strong>Personas</strong> — pessoas reais (ou realistas) com dores específicas, não um "usuário genérico".</li>
  <li><strong>Funcionalidades</strong> — uma lista de recursos que respondem, um a um, às dores dessas personas.</li>
</ol>
<p>Só depois dessas três camadas prontas é que o briefing vira prompt. É a diferença entre pedir pra IA "crie uma plataforma de cursos" (gera algo genérico) e pedir pra resolver um problema específico de uma pessoa específica (gera algo com intenção).</p>
<p><strong>Se você está aprendendo a programar:</strong> isso vale mesmo sem IA nenhuma. Antes de abrir o editor de código, vale a pena responder: <em>quem</em> vai usar isso, <em>qual problema exato</em> essa pessoa tem, e <em>o que</em> na tela resolve esse problema. Programar sem essas respostas é decorar sintaxe sem saber pra que serve.</p>

<h2>2. O problema escolhido</h2>
<p>A persona imaginada: alguém que terminou uma faculdade (ex.: Publicidade) e quer migrar pra tecnologia, mas trava diante de um catálogo gigante de cursos (Design, Produto, Dados, Marketing...) sem saber por onde começar. Essa "paralisia por excesso de escolha" é a dor central.</p>
<p>A resposta de produto: em vez de um formulário longo perguntando "quais são seus objetivos", a pessoa só reage — curte ou pula cursos, como num app de relacionamento — e o sistema aprende com isso.</p>
<figure>
  <img loading="lazy" decoding="async" src="img/rumo-tutorial-01-deck.webp" alt="Tela inicial do Rumo: card de curso com badge de trilha e afinidade">
  <figcaption>A pessoa vê um card por vez: trilha (Design, Produto...), afinidade (quanto esse curso combina com ela agora) e um selo de empregabilidade.</figcaption>
</figure>

<h2>3. Da ideia ao protótipo visual</h2>
<p>Com o briefing pronto, o próximo passo foi um protótipo <strong>sem nenhum código de verdade</strong> — só HTML/CSS/JavaScript simulando a interação, pra testar se a ideia "parecia certa" antes de construir o back-end. Isso é uma prática comum: validar a interface antes de investir tempo no banco de dados e nas regras de negócio.</p>
<figure>
  <img loading="lazy" decoding="async" src="img/rumo-tutorial-02-arrastando.webp" alt="Arrastando um card para curtir, com o selo CURTI em destaque">
  <figcaption>Arrastar o card pra direita mostra o selo "CURTI" — feedback visual imediato de que a ação foi reconhecida.</figcaption>
</figure>

<h2>4. Da tela ao código</h2>
<p>Depois que a interação "parecia certa", veio a pergunta que todo projeto de verdade precisa responder: <strong>o que esse protótipo precisa saber, e onde isso fica guardado?</strong></p>
<h3>Front-end vs. back-end (pra quem está começando)</h3>
<ul>
  <li><strong>Front-end</strong> é tudo que roda no navegador da pessoa: o HTML (estrutura da página), o CSS (aparência) e o JavaScript que reage a cliques e arrastões. O front-end do Rumo não guarda nenhum dado — ele só <em>pergunta</em> pro back-end e <em>mostra</em> a resposta.</li>
  <li><strong>Back-end</strong> é o programa que roda no servidor (aqui, um processo Node.js), que guarda os dados de verdade e decide as regras. O Rumo usa <a href="https://expressjs.com/" target="_blank" rel="noopener">Express</a> pra isso — uma biblioteca que facilita responder pedidos HTTP (tipo "me dá a lista de cursos") com código JavaScript.</li>
  <li>Os dois conversam por uma <strong>API</strong>: um conjunto de endereços que o front-end chama (ex.: <code>GET /api/deck</code> = "me dá o baralho de cursos") e o back-end responde em JSON (um formato de texto que representa listas e objetos).</li>
</ul>
<h3>Por que um banco de dados SQL</h3>
<p>Sem banco de dados, cada vez que a página recarrega, o sistema "esquece" tudo. O Rumo guarda em <a href="https://www.sqlite.org/" target="_blank" rel="noopener">SQLite</a> (através de uma biblioteca chamada <code>sql.js</code>, que roda sem precisar instalar nada no sistema operacional) duas tabelas:</p>
<pre><code>-- o catálogo de cursos (fixo)
CREATE TABLE cursos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  trilha TEXT NOT NULL,
  afinidade_base INTEGER NOT NULL
  -- ...
);

-- cada decisão da pessoa (cresce com o uso)
CREATE TABLE swipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  curso_id INTEGER NOT NULL,
  decisao TEXT NOT NULL CHECK (decisao IN ('like', 'pass')),
  criado_em TEXT NOT NULL
);</code></pre>
<p><code>cursos</code> é o catálogo — não muda sozinho. <code>swipes</code> é o histórico — uma linha nova cada vez que alguém curte ou pula um curso. É esse histórico que torna o sistema "inteligente" sem nenhuma IA de verdade rodando: é só uma consulta SQL bem pensada.</p>

<h2>5. A regra de negócio: afinidade que reage</h2>
<p>Aqui está o coração do projeto. A afinidade de um curso <strong>não é um número fixo guardado no banco</strong> — ela é calculada toda vez que o baralho é pedido, somando um bônus por curtida já dada na mesma trilha:</p>
<pre><code>function calcularAfinidade(curso, curtidasPorTrilha) {
  const curtidas = curtidasPorTrilha[curso.trilha] || 0;
  const bonus = Math.min(curtidas * 9, 35); // cada curtida na trilha soma 9%, até um teto
  return Math.min(curso.afinidade_base + bonus, 97);
}</code></pre>
<p>Na prática: curtir um curso de Design faz o <em>próximo</em> curso de Design aparecer com afinidade mais alta. A tela não muda — o número que ela mostra é recalculado no servidor a cada chamada.</p>
<figure>
  <img loading="lazy" decoding="async" src="img/rumo-tutorial-03-afinidade.webp" alt="Afinidade mais alta no próximo card depois de uma curtida na mesma trilha">
  <figcaption>Depois de curtir um curso de Design, o badge de afinidade do card seguinte da mesma trilha já reflete isso.</figcaption>
</figure>
<p><strong>Por que isso importa pra quem está aprendendo:</strong> é fácil confundir "parece inteligente" com "é inteligente". Aqui não tem machine learning, não tem IA rodando em produção — é uma soma com um teto, guardada numa tabela SQL. Programas simples, bem pensados pra regra certa, já resolvem a maior parte dos problemas reais.</p>

<h2>6. O resultado final</h2>
<p>No fim do baralho, o back-end escolhe a recomendação final olhando pra qual trilha a pessoa mais curtiu, e monta uma frase explicando o porquê — nunca "porque sim".</p>
<figure>
  <img loading="lazy" decoding="async" src="img/rumo-tutorial-04-match.webp" alt="Tela de match com a trilha recomendada e a justificativa">
  <figcaption>"Você curtiu a trilha de Design" é montado dinamicamente, não é um texto fixo — o servidor sabe disso porque consultou a tabela <code>swipes</code>.</figcaption>
</figure>

<h2>7. Resumo do caminho</h2>
<pre><code>briefing (concorrentes + personas + dores)
  → prompt pra gerar a interface
  → protótipo visual (sem banco, só pra validar a interação)
  → decisão de arquitetura (front-end + back-end + API)
  → banco de dados (o que precisa ser lembrado?)
  → regra de negócio (o que faz o sistema parecer "esperto"?)
  → protótipo funcionando de ponta a ponta</code></pre>
<p>Nenhum desses passos exige saber tudo de uma vez. O código completo está no <a href="https://github.com/antunesivone/portfolio-docs/tree/main/rumo" target="_blank" rel="noopener">repositório do Rumo</a> — dá pra ler o <code>server/regras-negocio.js</code> de verdade e comparar com a explicação acima.</p>
`,
  },
  {
    slug: "como-falar-em-publico-dale-carnegie",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Como Falar em Público e Encantar as Pessoas",
    meta: "Dale Carnegie · Sextante, 2020",
    data: "Lido em 2026",
    cover: "img/livro-como-falar-em-publico.webp",
    resumo:
      "Um método prático pra virar um orador melhor: paixão genuína pelo tema, histórias reais em vez de dados soltos, e a descoberta de que ansiedade e entusiasmo são a mesma sensação física — a diferença está no rótulo mental que a gente dá a ela.",
    texto: `
<p>Dale Carnegie apresenta um método prático para qualquer pessoa se tornar um orador eficaz, baseado em três décadas ensinando milhares de profissionais. A premissa central: o medo de falar em público é uma habilidade que pode ser aprendida, não um dom natural.</p>

<h3>Os sete princípios fundamentais</h3>
<p>Carnegie estrutura seu ensino em sete pilares: falar com paixão genuína sobre temas que importam; usar narrativas reais, que o cérebro retém muito melhor do que dados abstratos; preparar-se intensamente antes de qualquer apresentação; manter contato visual autêntico com a plateia; dominar o uso do silêncio como ferramenta de impacto; finalizar com um chamado à ação; e praticar consistentemente até desenvolver instinto natural.</p>

<h3>Vencendo o medo</h3>
<p>Uma descoberta central do livro: ansiedade e entusiasmo produzem sensações físicas idênticas — a diferença está no rótulo mental que damos a elas. Carnegie recomenda transformar o nervosismo em animação visível, concentrando-se no bem-estar da audiência em vez de em si mesmo.</p>

<h3>Estrutura de um discurso memorável</h3>
<p>A abertura deve impactar nos primeiros segundos através de histórias, perguntas provocadoras ou dados surpreendentes. O desenvolvimento se estrutura em no máximo três pontos principais conectados naturalmente. O fechamento, cuidadosamente preparado, é o que permanece na memória da plateia.</p>

<h3>Aplicação prática</h3>
<p>Carnegie prescrevia exercícios imediatos: discursos de dois minutos sem interrupção, narrativas diárias, participação em oportunidades de fala, autogravação para feedback, e leitura em voz alta diária. Como ele resume: "Falar bem não é dom, é hábito desenvolvido através da prática consistente."</p>

`,
  },
  {
    slug: "inteligencia-emocional-no-trabalho-weisinger",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Inteligência Emocional no Trabalho",
    meta: "Hendrie Weisinger, PhD · Objetiva, 1997",
    data: "Lido em 2026",
    cover: "img/livro-inteligencia-emocional-trabalho.webp",
    resumo:
      "Antes de Goleman virar mainstream, Weisinger já propunha aplicar inteligência emocional dentro das organizações: autopercepção, autorregulação, motivação, empatia e habilidade social como competências treináveis, não traços de personalidade fixos.",
    texto: `
<p>Publicado originalmente em 1997, este livro aplica o conceito de Inteligência Emocional (IE), então recém-popularizado por Daniel Goleman, especificamente ao ambiente corporativo. A proposta central, descrita na própria capa, é "aplicar os conceitos revolucionários da I.E. nas relações profissionais, reduzindo o stress e aumentando a satisfação, eficiência e competitividade".</p>

<h3>As cinco competências</h3>
<p>Weisinger organiza a IE em cinco competências emocionais e sociais básicas: <strong>autopercepção</strong> (compreender e administrar as próprias emoções de forma consciente), <strong>autorregulação</strong> (autocontrole para sustentar um bom desempenho mesmo sob pressão), <strong>motivação</strong> (direcionar as próprias emoções a serviço de um objetivo), <strong>empatia</strong> (perceber os sentimentos dos outros para construir sintonia) e <strong>habilidade social</strong> (desenvoltura em relacionamentos interpessoais).</p>

<h3>Por que isso importa para quem lidera</h3>
<p>O argumento central é que habilidades técnicas resolvem problemas, mas são as habilidades emocionais que determinam se um gestor consegue manter uma equipe funcionando sob pressão, feedback difícil ou mudança constante. Ignorar o lado emocional do comportamento organizacional — tratando pessoas como se decidissem de forma puramente racional — é, segundo o livro, um dos erros mais comuns de liderança.</p>

<h3>Da teoria à prática</h3>
<p>O diferencial do livro em relação a obras mais teóricas sobre IE é o foco em técnicas aplicáveis: como aplicar autoconsciência numa reunião tensa, como se motivar diante de uma meta distante, e como usar a própria inteligência emocional nas relações com colegas, subordinados e superiores — não apenas entender o conceito, mas treiná-lo no dia a dia de trabalho.</p>
`,
  },
  {
    slug: "carreira-e-acao-luciano-santos",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Carreira é Ação",
    meta: "Luciano Santos (organizador) · Gente Autoridade, 2026",
    data: "Lido em 2026",
    cover: "img/livro-carreira-e-acao.webp",
    resumo:
      "23 profissionais contam, sem filtro, os erros e mudanças de rota que construíram carreiras que pareciam improváveis. A mensagem que amarra tudo: carreira não trava por falta de talento técnico — trava quando a gente terceiriza a própria agência, esperando um sinal que nunca vem sozinho.",
    texto: `
<p>Organizado por Luciano Santos, o livro reúne 23 profissionais para compartilharem as histórias e aprendizados por trás de carreiras que o organizador considera excepcionais. Em vez de trajetórias contadas só pelas conquistas, a obra reúne relatos sobre erros, inseguranças, mudanças de rota e decisões difíceis.</p>

<h3>Tema central</h3>
<p>A mensagem que conecta os 23 relatos: construir uma carreira não depende apenas de sorte, reconhecimento externo ou de um caminho previamente definido. Escolhas, experimentação, posicionamento, construção de relações e capacidade de mudar de rota aparecem como os elementos que de fato transformam uma trajetória profissional — daí o "risco" no título original, "Carreira é Ação (não sorte)".</p>

<h3>Protagonismo, não espera</h3>
<p>Um dos fios condutores mais fortes do livro: a maioria dos profissionais não trava por falta de talento técnico. Trava porque terceiriza a própria agência, esperando um "sinal" — o chefe que enxerga, a reestruturação que favorece, o momento de coragem que nunca chega sozinho. O livro nasce exatamente dessa fresta entre a intenção e a execução.</p>
`,
  },
  {
    slug: "mulheres-ousadas-chegam-mais-longe",
    categoria: "livro",
    tipoLabel: "📚 Livro",
    titulo: "Mulheres Ousadas Chegam Mais Longe",
    meta: "Lois P. Frankel, PhD · Editora Gente, 13ª edição",
    data: "Lido em 2026",
    cover: "img/livro-mulheres-ousadas.webp",
    resumo:
      "101 erros inconscientes que atrapalham a carreira de mulheres, da coach executiva Lois Frankel — do excesso de trabalho sem limite até pedir desculpas por tudo. A ideia central: o ambiente de trabalho é um jogo com regras próprias, e fingir que não é um jogo é, em si, um dos erros.",
    texto: `
<p>Lois P. Frankel, coach executiva de renome internacional, reúne 101 comportamentos inconscientes — muitos deles socializados desde a infância — que atrapalham a carreira de mulheres no ambiente corporativo.</p>

<h3>Mentalidade e estratégia</h3>
<p>A obra parte da ideia de que "o ambiente de trabalho é um jogo" com regras específicas a serem aprendidas e dominadas. Frankel trata a política corporativa como ferramenta legítima, não como algo a evitar, e recomenda desenvolver relacionamentos estratégicos deliberadamente, em vez de confiar que o bom trabalho "fala por si".</p>

<h3>Gestão de tempo e energia</h3>
<p>Um erro comum apontado pelo livro: trabalhar excessivamente, sem limite, achando que isso por si só gera reconhecimento. A autora recomenda estabelecer limites claros de horário, fazer pausas regulares, e principalmente não fazer o trabalho alheio — porque promoções tendem a ir para quem apresenta resultados visíveis, não necessariamente para quem mais executa nos bastidores.</p>

<h3>Marca pessoal e visibilidade</h3>
<p>"Fora da vista, fora da mente, fora do mercado" resume outro eixo do livro: a necessidade de construir e comunicar a própria marca pessoal de forma consciente, identificando o que diferencia cada profissional, e articulando conquistas de forma estruturada — por exemplo, pelo modelo <strong>PAR</strong> (Problema, Ação, Resultado), em vez de deixar o trabalho "falar sozinho".</p>

<h3>Autonomia e assertividade</h3>
<p>A segurança financeira é tratada como pré-requisito para decisões profissionais verdadeiramente livres — daí a recomendação de pesquisar salários competitivos e negociar aumentos proativamente, em vez de esperar que sejam oferecidos. O livro também alerta contra um padrão recorrente: confundir ajudar colegas com ser explorada, e pedir desculpas por coisas que não exigem desculpa.</p>

<p><em>Resumo baseado em análise do livro disponível em <a href="https://www.franmateus.ia.br/2026/06/licoes-mulheres-ousadas-chegam-mais-longe.html" target="_blank" rel="noopener">franmateus.ia.br</a>.</em></p>
`,
  },
  {
    slug: "design-de-prompt-vs-engenharia-de-prompt",
    categoria: "profissional",
    tipoLabel: "📝 Artigo",
    titulo: "Design de Prompt e Engenharia de Prompt: uma distinção conceitual",
    meta: "Artigo · Prompt Engineering",
    data: "Publicado em 2026",
    cover: null,
    resumo:
      "Design de Prompt e Engenharia de Prompt são confundidos com frequência por quem começa a estudar IA generativa. A partir da análise de um material de referência sobre o tema, este artigo separa as duas competências e aplica a distinção a um estudo de caso real.",
    texto: `
<p>Este artigo propõe uma distinção conceitual entre Design de Prompt e Engenharia de Prompt, duas competências frequentemente confundidas por quem inicia o estudo da interação com sistemas de inteligência artificial generativa. A partir da análise crítica do material "Engenharia de Prompt 2.0" (PINHEIRO, 2025), demonstra-se que a maior parte do conteúdo examinado corresponde, na prática, a Design de Prompt — a formulação pontual de uma instrução eficaz para uma única interação —, ao passo que a Engenharia de Prompt manifesta-se apenas nos momentos em que essa instrução é transformada em estrutura reutilizável, a exemplo de templates, scripts de multiagentes e configurações persistentes (Custom Instructions). Examinam-se, ainda, recursos nativos de plataformas de inteligência artificial que reforçam a camada de Design, mas que podem adquirir caráter de Engenharia quando configurados de modo persistente. Por fim, aplica-se a distinção a um estudo de caso: a concepção da tela inicial de um site de mentoria para profissionais de marketing digital.</p>

<h2>1. Introdução</h2>
<p>Ao iniciar o estudo da interação com sistemas de inteligência artificial generativa, é comum supor que exista uma única competência relevante: a escrita de um bom prompt, isto é, do comando fornecido ao sistema. Verifica-se, contudo, a existência de duas competências distintas — o Design de Prompt e a Engenharia de Prompt —, cuja confusão constitui um dos equívocos mais recorrentes entre iniciantes.</p>
<p><strong>Design de Prompt</strong> corresponde à formulação de uma instrução eficaz, destinada a uma única interação. Consiste em selecionar os termos adequados para que, em uma conversa específica, o sistema compreenda exatamente o que se solicita; encerra-se no momento em que a resposta é obtida.</p>
<p><strong>Engenharia de Prompt</strong>, por sua vez, refere-se à construção de estruturas. Consiste em transformar uma instrução eficaz em um mecanismo reutilizável, capaz de operar de modo autônomo e repetido, para múltiplos usuários, sem que seja necessário reescrevê-la a cada novo uso.</p>
<p>A título de ilustração: redigir uma mensagem eficaz em um aplicativo de mensagens instantâneas constitui Design de Prompt; já a criação de um sistema de atendimento automatizado, capaz de enviar mensagens adequadas de forma contínua a milhares de usuários, constitui Engenharia de Prompt.</p>

<h2>2. Design de Prompt: exemplo extraído do material de referência</h2>
<p>O material de referência (PINHEIRO, 2025) apresenta dez elementos que uma instrução eficaz deveria reunir: o emissor (Persona), a solicitação (Tarefa), a intensidade pretendida (Efeito), a regra delimitadora (Limite), o formato de saída (Forma), a origem da informação (Fonte), a extensão desejada (Tamanho), a explicitação do raciocínio (Análise) e o espaço reservado à originalidade (Originalidade). Tais elementos correspondem integralmente ao Design de Prompt, visto que se destinam ao aprimoramento de uma única instrução.</p>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 1 — Exemplo de Design de Prompt: roteiro de viagem</div>
  <div class="post-quadro__body">"Como um guia turístico especializado no nordeste do Brasil, forneça um roteiro de 5 dias saindo de Recife em 15 de janeiro e voltando em 20 de janeiro, passando por João Pessoa e Natal de carro, sendo uma viagem para aproveitar o máximo as praias, para 2 adultos e 2 crianças, organizando o roteiro por dia e localidade, buscando as informações em guias de turismo, sendo o mais específico possível, explicando as etapas do processo, e outras informações relevantes para melhorar as férias."</div>
  <div class="post-quadro__source">Fonte: Pinheiro (2025, slide 45).</div>
</div>
<p>Observa-se tratar-se de uma mensagem única, concebida para um único usuário, em uma única interação. Caso outro usuário deseje um roteiro distinto, torna-se necessário reescrever ou adaptar manualmente toda a instrução.</p>

<h2>3. Engenharia de Prompt: exemplos extraídos do material de referência</h2>
<p>A Engenharia de Prompt manifesta-se precisamente nos momentos em que o material deixa de tratar da formulação de uma instrução isolada e passa a abordar a construção de mecanismos autossustentáveis. Identificam-se três exemplos no material analisado.</p>

<h3>3.1 Template com variáveis</h3>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 2 — Biblioteca de Prompts: modelo "Despacho"</div>
  <div class="post-quadro__body">"Como um [servidor público] com personalidade [formal], tom [respeitoso], numa linguagem [governamental]... analisar os documentos anexados para gerar um despacho usando como referência o padrão do governo de Pernambuco, atendendo a [solicitação realizada]."</div>
  <div class="post-quadro__source">Fonte: Pinheiro (2025, slide 72).</div>
</div>
<p>As expressões entre colchetes correspondem a variáveis que qualquer usuário pode substituir conforme sua necessidade, sem reescrever a instrução integralmente. Trata-se de um <em>template</em> — base de qualquer sistema voltado à automatização de tarefas recorrentes.</p>

<h3>3.2 Processo multiagente em etapas fixas</h3>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 3 — Script de multiagentes aplicado ao roteiro de viagem</div>
  <div class="post-quadro__body">"Usando multiagentes com {Agente1}: fornecendo sua solução inicial... {Agente2}... {Agente3}... Ler as soluções de todos e cada agente revisar considerando as outras, repetindo por 4 rodadas."</div>
  <div class="post-quadro__source">Fonte: Pinheiro (2025, slide 85).</div>
</div>
<p>Não se trata de aprimorar a redação da instrução, mas de constituir um processo: três agentes fixos revisam-se mutuamente, ao longo de um número determinado de rodadas. Distingue-se, assim, solicitar um parecer a um único interlocutor de organizar uma reunião regida por regras quanto à ordem, à frequência e à forma de manifestação de cada participante.</p>

<h3>3.3 Configuração persistente</h3>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 4 — Custom Instructions: personalização do ChatGPT</div>
  <div class="post-quadro__body">"Sou professor de inteligência artificial" e "Deve ser mais informal, com respostas precisas, me chamando de Professor Álvaro, me dando opiniões."</div>
  <div class="post-quadro__source">Fonte: Pinheiro (2025, slide 91).</div>
</div>
<p>Essa configuração não é inserida novamente a cada nova pergunta: uma vez definida, aplica-se automaticamente a todas as conversas subsequentes. Trata-se, precisamente, da distinção entre redigir uma instrução e armazená-la de modo a que opere de forma autônoma.</p>

<h2>4. Quadro-síntese comparativo</h2>
<table>
  <tr><th>Parte do material</th><th>Função na prática</th><th>Classificação</th></tr>
  <tr><td>Os dez elementos (Persona, Tarefa, Efeito...)</td><td>Aprimoram uma única instrução</td><td>Design</td></tr>
  <tr><td>Os seis aspectos (Tom, Linguagem, Estilo...)</td><td>Ajustam o registro de uma instrução isolada</td><td>Design</td></tr>
  <tr><td>Biblioteca de Prompts com variáveis entre colchetes</td><td>Cria um molde reaproveitável por qualquer usuário</td><td>Engenharia</td></tr>
  <tr><td>Script de multiagentes</td><td>Constitui um processo de etapas fixas</td><td>Engenharia</td></tr>
  <tr><td>GPTs especializados (Prompt Engineer, Python...)</td><td>Empacotam um comportamento pronto e reutilizável</td><td>Engenharia</td></tr>
  <tr><td>Custom Instructions</td><td>Armazenam uma configuração permanente</td><td>Engenharia</td></tr>
  <tr><td>Uso via API</td><td>Conecta a instrução diretamente a uma aplicação</td><td>Engenharia</td></tr>
</table>

<h2>5. Implicações pedagógicas</h2>
<p>Em primeiro lugar, quanto ao diagnóstico de falhas: quando a resposta obtida é inadequada em uma única ocasião, o problema tende a situar-se no Design — a instrução carece de algum elemento. Quando a falha se repete sistematicamente, o problema costuma residir na Engenharia — falta um molde mais adequado ou uma regra mais precisa.</p>
<p>Em segundo lugar, quanto à ordem de aprendizagem: o Design de Prompt é adquirido rapidamente, mediante a experimentação de formulações distintas. A Engenharia de Prompt demanda mais tempo, por envolver decisões de maior permanência — onde o molde é armazenado, quem detém autorização para modificá-lo, e quais as consequências de uma alteração de versão do sistema.</p>
<p>Em terceiro lugar, quanto à expectativa de domínio: quem redige uma instrução eficaz já demonstrou competência em Design. A construção de um sistema constitui etapa subsequente, não simultânea.</p>
<blockquote>Formular uma instrução eficaz resolve uma única demanda; construir um sistema resolve a mesma demanda sempre que ela se repetir, sem exigir nova redação.</blockquote>

<h2>6. Recursos nativos de plataformas de IA como camada de apoio ao prompt</h2>
<p>Plataformas como Claude e ChatGPT disponibilizam, diretamente na interface de conversação, recursos que reforçam a camada de Design sem exigir nenhuma automação: anexação de imagens, documentos, planilhas, apresentações e PDFs; distinção entre material enviado e material gerado; busca na web; Projetos/Workspaces; análise de dados e execução de código; geração de imagens.</p>
<p>Tais recursos reforçam, predominantemente, a camada de Design. Entretanto, quando configurados uma única vez no âmbito de um Projeto/Workspace — passando a vigorar automaticamente para toda interação futura associada a esse grupo —, adquirem caráter de Engenharia, pela mesma razão aplicável às Custom Instructions: a configuração persiste, em lugar de ser repetida a cada nova instrução.</p>

<h2>7. Estudo de caso aplicado: plataforma de mentoria em marketing digital</h2>
<p>A distinção proposta pode ser aplicada a um caso concreto: a concepção de um site de mentoria destinado a profissionais de marketing digital, a partir de um briefing estruturado em três camadas — concorrentes, personas e funcionalidades.</p>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 7 — Design de Prompt aplicado: briefing de site de mentoria</div>
  <div class="post-quadro__body">"Como um designer de produto especializado em plataformas de mentoria profissional, crie o conceito da tela inicial de um site de mentoria para profissionais de marketing digital, servindo ao mesmo tempo o mentor (quer compartilhar conhecimento e ganhar renda extra) e o mentorado (júnior ou pleno, perdido entre cursos genéricos), destacando a proposta em uma frase única, organizando a tela em: lista de especialidades (SEO, tráfego pago, redes sociais, growth), um cartão de exemplo de mentor com foto, especialidade e nota de avaliação, e um botão de ação único "Encontrar meu mentor", buscando inspiração em plataformas como Growth Mentor e RD University, sendo o mais específico possível na descrição visual de cada seção, explicando o motivo de cada escolha de layout, e sugerindo outros elementos que ajudem a gerar confiança na primeira visita."</div>
  <div class="post-quadro__source">Fonte: elaborado pela autora.</div>
</div>
<p>Trata-se, ainda, de Design de Prompt: a instrução resolve a concepção de uma tela, para um site específico, em uma única interação.</p>
<div class="post-quadro">
  <div class="post-quadro__title">QUADRO 8 — Engenharia de Prompt aplicada: mesmo briefing convertido em molde reutilizável</div>
  <div class="post-quadro__body">"Como um designer de produto especializado em plataformas de mentoria profissional, crie o conceito da tela inicial de um site de mentoria para profissionais de [área de atuação], servindo ao mesmo tempo [persona do mentor] e [persona do mentorado], organizando a tela em: lista de especialidades ([especialidade 1], [especialidade 2]...), um cartão de exemplo de mentor com [critério de confiança], e um botão de ação único, buscando inspiração em [concorrentes do nicho], sendo o mais específico possível, explicando o motivo de cada escolha."</div>
  <div class="post-quadro__source">Fonte: elaborado pela autora.</div>
</div>
<p>Com as variáveis devidamente posicionadas, o mesmo molde permite gerar a concepção da tela inicial de uma plataforma de mentoria em marketing digital, em design, em finanças ou em qualquer outra área de atuação, bastando a substituição do conteúdo entre colchetes. É essa conversão que transforma uma instrução bem redigida (Design) em um artefato de Engenharia.</p>

<h2>8. Considerações finais</h2>
<p>O material "Engenharia de Prompt 2.0" (PINHEIRO, 2025) trata, em sua maior parte, de Design de Prompt, e o faz de modo consistente. A Engenharia de Prompt manifesta-se apenas nos momentos em que o conteúdo ultrapassa a instrução isolada e passa a tratar do molde reutilizável: templates com variáveis, scripts de multiagentes, agentes especializados armazenados e Custom Instructions. Reconhecer em qual das duas dimensões se está operando evita a confusão entre "redigir uma boa instrução" e "construir um sistema autônomo".</p>

<h2>Referências</h2>
<ul class="post-refs">
  <li>PINHEIRO, Álvaro. <em>Engenharia de Prompt 2.0</em>. Apresentação (slides). Recife: Procuradoria Geral do Estado de Pernambuco (PGE/PE); Universidade de Pernambuco (UPE), jan. 2025. 112 slides.
  <span class="post-ref__note">Material-base deste artigo: todos os exemplos de instrução citados foram extraídos diretamente deste documento.</span></li>
  <li>MCCULLOCH, Warren S.; PITTS, Walter. A logical calculus of the ideas immanent in nervous activity. <em>Bulletin of Mathematical Biophysics</em>, v. 5, 1943.</li>
  <li>TURING, Alan M. Computing Machinery and Intelligence. <em>Mind</em>, v. 49, p. 433-460, 1950.</li>
  <li>VASWANI, Ashish et al. Attention Is All You Need. <em>Google Brain / Google Research</em>, 2017.</li>
  <li>IANA ESCOLA. <em>IDI — Design de Prompts</em>. Publicações relevantes: Engenharia de Prompts. São Paulo: Iana Escola, [s.d.].</li>
  <li>DAXUS. <em>Certificado de participação: Imersão Claude na Prática</em>. Carga horária de 8 horas. [S.l.]: Daxus, 8 nov. 2026.
  <span class="post-ref__note">Certificado de participação da autora em formação prática sobre o uso de Claude.</span></li>
  <li>EBAC — ESCOLA BRITÂNICA DE ARTES CRIATIVAS &amp; TECNOLOGIA. <em>Declaração de participação: Figma na Prática — Crie seu Primeiro Protótipo do Zero Com IA</em>. Carga horária de 4 horas. São Paulo: EBAC Ensino à Distância Ltda, 8-9 set. 2026.
  <span class="post-ref__note">Certificado de participação da autora em workshop complementar sobre uso prático de IA aplicada a design e prototipação.</span></li>
</ul>
`,
  },
];
