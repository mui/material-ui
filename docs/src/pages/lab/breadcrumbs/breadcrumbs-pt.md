---
title: Componente React Breadcrumbs
components: Breadcrumbs, Link, Typography
---
# Breadcrumbs

<p class="description">Breadcrumbs permitem aos usuários fazer seleções em uma gama de valores.</p>

## Breadcrumbs simples

{{"demo": "pages/lab/breadcrumbs/SimpleBreadcrumbs.js"}}

## Separador personalizado

No exemplo a seguir, nós usamos duas strings separadoras, e um ícone SVG.

{{"demo": "pages/lab/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs com ícones

{{"demo": "pages/lab/breadcrumbs/IconBreadcrumbs.js"}}

## Breadcrumbs colapsado

{{"demo": "pages/lab/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Breadcrumbs personalizado

Se você leu a [página de abertura da documentação](/customization/overrides/) mas não está confiante de cair dentro, aqui está um exemplo de como você pode alterar o link de desenho do breadcrumb.

{{"demo": "pages/lab/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Accessibility

Esteja certo de adicionar uma descrição `aria-label` no componente `Breadcrumbs`.

A acessibilidade neste componente conta:

- O conjunto dos links são estruturados usando uma lista ordenada (elemento `<ol>`).
- Para prevenir que os leitores de tela pronunciem os separadores visuais entre os links, eles são escondidos com `aria-hidden`.
- Um elemento nav rotulado com `aria-label` identifica a estrutura como uma trilha breadcrumb e faz dela uma referência de navegação para facilitar a localização.

## Integração com react-router

{{"demo": "pages/lab/breadcrumbs/RouterBreadcrumbs.js"}}