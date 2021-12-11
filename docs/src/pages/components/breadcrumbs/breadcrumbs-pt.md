---
title: Componente React para Navegação estrutural
components: Breadcrumbs, Link, Typography
githubLabel: 'component: Breadcrumbs'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#breadcrumb'
---

# Navegação estrutural

<p class="description">Navegação estrutural permite aos usuários fazer seleções em um intervalo de caminhos.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Navegação estrutural simples

{{"demo": "pages/components/breadcrumbs/BasicBreadcrumbs.js"}}

## Último caminho ativo

Mantendo o último caminho de navegação interativo.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Separador customizado

Nos exemplos a seguir, nós estamos usando dois separadores de string e um ícone SVG.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Navegação estrutural com ícones

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Navegação estrutural retraída

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customization

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Integração com react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Certifique-se de adcionar uma descrição `aria-label` no componente `Breadcrumbs`.

A acessibilidade neste componente conta com:

- O conjunto de links são estruturados usando uma lista ordenada (elemento `<ol>`).
- Para prevenir que os leitores de tela pronunciem os separadores visuais entre os links, eles são escondidos com `aria-hidden`.
- Um elemento `nav` rotulado com `aria-label` identifica a estrutura como uma trilha de navegação estrutural e faz uma marcação na navegação para facilitar a localização.
