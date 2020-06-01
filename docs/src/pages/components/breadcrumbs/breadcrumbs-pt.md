---
title: Componente React para Navegação estrutural
components: Breadcrumbs, Link, Typography
---

# Navegação estrutural

<p class="description">Navegação estrutural permite aos usuários fazer seleções em um intervalo de caminhos.</p>

## Navegação estrutural simples

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Último caminho ativo

Mantendo o último caminho de navegação interativo.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Separador customizado

No exemplo a seguir, nós usamos duas strings separadoras, e um ícone SVG.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Navegação estrutural com ícones

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Navegação estrutural retraída

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Navegação estrutural customizada

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integração com react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Certifique-se de adcionar uma descrição `aria-label` no componente `Breadcrumbs`.

A acessibilidade neste componente conta com:

- O conjunto de links são estruturados usando uma lista ordenada (elemento `<ol>`).
- Para prevenir que os leitores de tela pronunciem os separadores visuais entre os links, eles são escondidos com `aria-hidden`.
- Um elemento `nav` rotulado com `aria-label` identifica a estrutura como uma trilha de navegação estrutural e faz uma marcação na navegação para facilitar a localização.