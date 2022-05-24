---
product: material-ui
title: Componente React para Navegação estrutural
components: Breadcrumbs, Link, Typography
githubLabel: 'component: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
---

# Navegação estrutural

<p class="description">Breadcrumbs consist of a list of links that help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Navegação estrutural simples

{{"demo": "BasicBreadcrumbs.js"}}

## Último caminho ativo

Mantendo o último caminho de navegação interativo.

{{"demo": "ActiveLastBreadcrumb.js"}}

## Separador customizado

Nos exemplos a seguir, nós estamos usando dois separadores de string e um ícone SVG.

{{"demo": "CustomSeparator.js"}}

## Navegação estrutural com ícones

{{"demo": "IconBreadcrumbs.js"}}

## Navegação estrutural retraída

{{"demo": "CollapsedBreadcrumbs.js"}}

## Navegação estrutural customizada

Aqui está um exemplo de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBreadcrumbs.js"}}

## Integração com react-router

{{"demo": "RouterBreadcrumbs.js", "bg": true}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Certifique-se de adcionar uma descrição `aria-label` no componente `Breadcrumbs`.

A acessibilidade neste componente conta com:

- O conjunto de links são estruturados usando uma lista ordenada (elemento `<ol>`).
- Para prevenir que os leitores de tela pronunciem os separadores visuais entre os links, eles são escondidos com `aria-hidden`.
- Um elemento `nav` rotulado com `aria-label` identifica a estrutura como uma trilha de navegação estrutural e faz uma marcação na navegação para facilitar a localização.
