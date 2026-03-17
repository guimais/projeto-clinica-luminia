# Clínica Luminia — Landing Page

> Um estudo de caso de como eu desenvolveria uma landing page para uma clínica médica moderna, do zero até a entrega.

---

## Sobre o Projeto

Este projeto representa minha abordagem para criar uma landing page profissional para uma clínica médica. O objetivo foi desenvolver uma página que transmita **confiança, sofisticação e acolhimento** — valores essenciais no setor da saúde — sem abrir mão de uma experiência de usuário moderna e responsiva.

A **Clínica Luminia** é um nome fictício criado exclusivamente para fins de demonstração.

---

## O que a página inclui

- **Hero com imagem de fundo** — apresentação da clínica com chamadas para ação
- **Barra de estatísticas animada** — contadores que animam ao entrar na viewport (+15k pacientes, 20+ especialistas, etc.)
- **Seção Sobre** — história e missão da clínica com badge de fundação
- **Especialidades** — cards com ícones SVG para cada área médica
- **Equipe** — cards com foto e bio revelada no hover
- **Depoimentos** — carrossel no mobile, grid no desktop
- **FAQ** — acordeão com as dúvidas mais frequentes
- **Formulário de Agendamento** — com máscara de telefone, validação e feedback ao usuário
- **Rodapé** com links de navegação e informações legais

---

## Decisões Técnicas

### Design
- Paleta sóbria em tons de bege, verde-escuro e marrom — transmite seriedade e cuidado
- Tipografia mista: **Cormorant Garamond** (display/títulos) + **DM Sans** (corpo) — equilíbrio entre elegância e legibilidade
- Layout minimalista com muito espaço em branco — sem poluição visual

### Código
- **HTML semântico** com roles e atributos `aria-*` para acessibilidade
- **CSS puro** com variáveis (custom properties) — sem frameworks, total controle
- **JavaScript vanilla** — sem dependências externas
- **JSON-LD** separado em `data/schema.json` para dados estruturados (SEO)
- Scroll reveal com `IntersectionObserver` — animações apenas quando o elemento entra na tela
- `font-display: swap` via Google Fonts — evita flash de texto invisível

### UX & Performance
- Imagens externas via Unsplash com `loading="lazy"` e dimensões declaradas
- `fetchpriority="high"` na imagem do hero para carregamento prioritário
- Barra de progresso de leitura no topo da página
- Botão "voltar ao topo" que aparece após 40% de scroll
- Formulário com máscara de telefone em tempo real e validação antes do envio
- Responsivo para mobile, tablet e desktop

---

## Estrutura de Arquivos

```
projeto-clinica-luminia/
├── index.html          # Estrutura da página
├── css/
│   └── style.css       # Todos os estilos
├── js/
│   └── main.js         # Interatividade e lógica
├── data/
│   └── schema.json     # JSON-LD para SEO (Schema.org)
└── images/             # Imagens locais (se houver)
```

---

## Como visualizar

Basta abrir o arquivo `index.html` diretamente no navegador. Nenhuma dependência ou build necessário.

```bash
# Ou com um servidor local simples
npx serve .
```

---

## Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

*Projeto desenvolvido como portfólio — demonstração de como construiria uma landing page real para o setor de saúde.*
