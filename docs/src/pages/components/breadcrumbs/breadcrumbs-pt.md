---
title: Componente React para Breadcrumbs
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs

<p class="description">Breadcrumbs permitem aos usuários fazer seleções em uma gama de valores.</p>

## Breadcrumbs simples

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Separador personalizado

No exemplo a seguir, nós usamos duas strings separadoras, e um ícone SVG.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs com ícones

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Breadcrumbs colapsado

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Breadcrumbs personalizado

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
- Um elemento `nav` rotulado com `aria-label` identifica a estrutura como uma trilha breadcrumb e faz uma marcação na navegação para facilitar a localização.